import { MyContext } from "../types/MyContext";
import {
    Arg,
    Ctx,
    Field,
    InputType,
    Mutation,
    ObjectType,
    Query,
    Resolver,
    UseMiddleware
} from "type-graphql";
import { getConnection } from "typeorm";
import { Post } from "./../entities/post";
import { User } from "./../entities/user";
import { isAuth } from "./../middleware/isAuth";
import { FieldError } from "./../utils/FieldErrorsType";

@InputType()
class PostsFilterType {
    @Field()
    offset: number;

    @Field()
    limit: number;
}
@InputType()
class PostInputType {
    @Field()
    title!: string;

    @Field()
    body!: string;
}

@InputType()
class PostEditInputType {
    @Field()
    title!: string;

    @Field()
    body!: string;

    @Field()
    slug: string;

    @Field()
    identifier: string;
}

@InputType()
class GetPostInputType {
    @Field()
    slug: string;

    @Field()
    identifier: string;
}

@ObjectType()
class GetPostResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field(() => Post, { nullable: true })
    post?: Post;
}

@Resolver()
export class PostResolver {
    @Query(() => [Post])
    async posts(
        @Arg("input") input: PostsFilterType,
        @Ctx() { req }: MyContext
    ) {
        const posts = await Post.find({
            order: {
                createdAt: "DESC",
            },
            take: input.limit,
            skip: input.offset,
            relations: ["user", "comments", "comments.user", "votes"]
        })

        const user = await User.findOne({
            where: {
                id: req.userId,
            },
        });

        if (user) {
            posts.forEach((p) => p.setUserVote(user))
        }


        return posts;
    }

    @UseMiddleware(isAuth)
    @Query(() => [Post])
    async userPosts(
        @Arg("input") input: PostsFilterType,
        @Ctx() { req }: MyContext
    ) {

        const user = await User.findOne({
            where: {
                id: req.userId,
            },
        });

        const posts = await Post.find({
            where: {
                user: user
            },
            order: {
                createdAt: "DESC",
            },
            take: input.limit,
            skip: input.offset,
            relations: ["user", "comments", "comments.user", "votes"]
        })



        if (user) {
            posts.forEach((p) => p.setUserVote(user))
        }

        return posts;
    }

    @Query(() => GetPostResponse)
    async getPost(
        @Arg("input") input: GetPostInputType,
        @Ctx() { req }: MyContext
    ): Promise<GetPostResponse> {
        const post = await Post.findOne({
            where: {
                identifier: input.identifier,
                slug: input.slug,
            },
            relations: ["user", "comments", "comments.user", "votes"],
        });


        if (!post) {
            return {
                errors: [
                    {
                        field: "post",
                        message: "something went wrong",
                    },
                ],
            };
        }

        const user = await User.findOne({
            where: {
                id: req.userId,
            },
        });

        if (user) {
            post.setUserVote(user)
        }

        return { post };
    }

    @UseMiddleware(isAuth)
    @Mutation(() => Post)
    async createPost(
        @Arg("input") input: PostInputType,
        @Ctx() { req }: MyContext
    ): Promise<Post | null> {
        const user = await User.findOne({
            where: {
                id: req.userId,
            },
        });
        let post;
        try {
            post = await Post.create({
                body: input.body,
                title: input.title,
                user: user,
            }).save();
        } catch (error) { }

        if (!post) {
            return null;
        }
        return post;
    }


    @Mutation(() => Post, { nullable: true })
    async updatePost(
        @Arg("input") input: PostEditInputType,
        @Ctx() { req }: MyContext
    ): Promise<Post | null> {

        const postExists = await Post.findOne({
            where: {
                user: {
                    id: req.userId
                }
            },
            relations: ['user']
        })
        if (postExists) {
            const post = await getConnection()
                .createQueryBuilder()
                .update(Post)
                .set({ body: input.body, title: input.title })
                .where('slug  = :slug and identifier = :identifier', {
                    slug: input.slug,
                    identifier: input.identifier,
                })

                .returning("*")
                .execute();
            return post.raw[0];
        } else {
            return null
        }

    }


    @UseMiddleware(isAuth)
    @Mutation(() => Boolean)
    async deletePost(
        @Arg("identifier") identifier: string,
        @Ctx() { req }: MyContext
    ): Promise<Boolean> {
        const user = await User.findOne({
            where: {
                id: req.userId,
            },
        });

        await Post.delete({
            identifier: identifier,
            user: user
        });

        return true
    }
}
