import {
    Arg,
    Ctx,
    Field,
    InputType,
    Mutation, Resolver,
    UseMiddleware
} from "type-graphql";
import { Post } from "./../entities/post";
import { User } from "./../entities/user";
import { Vote } from './../entities/Vote';
import { isAuth } from "./../middleware/isAuth";
import { MyContext } from "./../types/MyContext";

@InputType()
class VoteOnPostInputType {
    @Field()
    slug!: string;

    @Field()
    identifier!: string;
}


@Resolver()
export class VoteResolver {
    @UseMiddleware(isAuth)
    @Mutation(() => Boolean)
    async voteOnPost(
        @Arg("input") input: VoteOnPostInputType,
        @Ctx() { req }: MyContext
    ): Promise<Boolean> {
        const user = await User.findOne({
            where: {
                id: req.userId,
            },
        });

        const post = await Post.findOneOrFail({
            where: {
                identifier: input.identifier,
                slug: input.slug,
            },
        });


        const voteExists = await Vote.findOne({
            where: {
                user: user,
                post: post
            },
            relations: ['user', 'post']
        });

        if (!voteExists) {
            await Vote.create({
                user: user,
                post: post,
                value: 1
            }).save();

        } else {
            await Vote.delete({
                post: post,
                user: user
            });
        }

        return true
    }

}
