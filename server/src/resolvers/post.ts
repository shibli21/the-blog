import { MyContext } from "src/types/MyContext";
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
import { Post } from "./../entities/post";
import { User } from "./../entities/user";
import { isAuth } from "./../middleware/isAuth";
import { FieldError } from "./../utils/FieldErrorsType";

@InputType()
class PostInputType {
    @Field()
    title!: string;

    @Field()
    body!: string;
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
    posts() {
        return Post.find({
            order: {
                createdAt: "DESC",
            },
            relations: ['user']
        });
    }

    @Query(() => GetPostResponse)
    async getPost(
        @Arg("input") input: GetPostInputType
    ): Promise<GetPostResponse> {
        const post = await Post.findOne({
            where: {
                identifier: input.identifier,
                slug: input.slug,
            },
            relations: [
                "user",
            ],
            order: {
                createdAt: "DESC",
            },
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
