import { UserInputError } from "apollo-server-errors";
import {
    Arg,
    Ctx,
    FieldResolver,
    ID,
    Int,
    Mutation,
    Query,
    registerEnumType,
    Resolver,
    Root,
    UseMiddleware,
} from "type-graphql";
import { LessThan } from "typeorm";
import { User } from "../entities/User";
import { CheckAuth } from "../middleware/checkAuth";
import { CreatePostInput } from "../types/CreatePostInput";
import { CustomContext } from "../types/CustomContext";
import { PaginatedPosts } from "../types/PaginatedPosts";
import { PostMutationResponse } from "../types/PostMutationResponse";
import { UpdatePostInput } from "../types/UpdatePostInput";
import { VoteType } from "../types/VoteType";
import { Post } from "./../entities/Post";
import { Upvote } from "./../entities/Upvote";

registerEnumType(VoteType, {
    name: "VoteType",
});

@Resolver((_of) => Post)
export class PostResolver {
    @FieldResolver((_return) => String)
    textSnippet(@Root() root: Post) {
        return root.text.slice(0, 50);
    }

    @FieldResolver((_return) => User)
    async user(@Root() root: Post, @Ctx() { dataLoaders: { userLoader } }: CustomContext) {
        return await userLoader.load(root.userId);
    }

    @FieldResolver((_return) => Int)
    async voteType(
        @Root() root: Post,
        @Ctx() { req, dataLoaders: { voteTypeLoader } }: CustomContext
    ) {
        if (!req.session.userId) {
            return 0;
        }
        // const existingVote = await Upvote.findOne({ postId: root.id, userId: req.session.userId });
        const existingVote = await voteTypeLoader.load({
            postId: root.id,
            userId: req.session.userId,
        });

        return existingVote ? existingVote.value : 0;
    }

    @Mutation((_return) => PostMutationResponse)
    @UseMiddleware(CheckAuth)
    async createPost(
        @Arg("createPostInput") { title, text }: CreatePostInput,
        @Ctx() { req }: CustomContext
    ): Promise<PostMutationResponse> {
        try {
            const newPost = Post.create({ title, text, userId: req.session.userId });
            await newPost.save();

            return {
                code: 200,
                success: true,
                message: "create post success",
                post: newPost,
            };
        } catch (error) {
            return {
                code: 500,
                success: true,
                message: "Internal error",
            };
        }
    }

    @Query((_return) => PaginatedPosts, { nullable: true })
    async posts(
        @Arg("limit", (_type) => Int) limit: number,
        @Arg("cursor", { nullable: true }) cursor?: string
    ): Promise<PaginatedPosts | null> {
        try {
            const totalCount = await Post.count();
            const realLimit = Math.min(10, limit);

            const findOptions: { [key: string]: any } = {
                order: {
                    createdAt: "DESC",
                },
                take: realLimit,
            };

            let lastPost: Post[] = [];
            if (cursor) {
                findOptions.where = {
                    createdAt: LessThan(cursor),
                };

                lastPost = await Post.find({
                    order: {
                        createdAt: "ASC",
                    },
                    take: 1,
                });
            }

            const posts = await Post.find(findOptions);

            return {
                cursor: posts[posts.length - 1].createdAt,
                totalCount: totalCount,
                hasMore: cursor
                    ? posts[posts.length - 1].createdAt.toString() !==
                      lastPost[0].createdAt.toString()
                    : posts.length !== totalCount,
                paginatedPosts: posts,
            };
        } catch (error) {
            return null;
        }
    }

    @Query((_return) => Post, { nullable: true })
    async post(@Arg("id", (_type) => ID) id: number): Promise<Post | undefined> {
        const post = await Post.findOne({ id });
        return post;
    }

    @Mutation((_return) => PostMutationResponse)
    @UseMiddleware(CheckAuth)
    async updatePost(
        @Arg("updatePostInput") { id, title, text }: UpdatePostInput,
        @Ctx() { req }: CustomContext
    ): Promise<PostMutationResponse> {
        try {
            const existingPost = await Post.findOne(id);
            if (!existingPost) {
                return {
                    code: 400,
                    success: false,
                    message: "Post not found",
                };
            }

            if (existingPost.userId !== req.session.userId) {
                return {
                    code: 401,
                    success: false,
                    message: "Unauthorized",
                };
            }

            existingPost.title = title;
            existingPost.text = text;

            await existingPost.save();

            return {
                code: 200,
                success: true,
                message: "update post success",
                post: existingPost,
            };
        } catch (error) {
            return {
                code: 500,
                success: true,
                message: "Internal error",
            };
        }
    }

    @Mutation((_return) => PostMutationResponse)
    @UseMiddleware(CheckAuth)
    async deletePost(
        @Arg("id", (_type) => ID) id: number,
        @Ctx() { req }: CustomContext
    ): Promise<PostMutationResponse> {
        const existingPost = await Post.findOne(id);
        if (!existingPost) {
            return {
                code: 400,
                success: false,
                message: "Post not found",
            };
        }

        if (existingPost.userId !== req.session.userId) {
            return {
                code: 401,
                success: false,
                message: "Unauthorized",
            };
        }

        await Post.delete({ id });

        return {
            code: 200,
            success: true,
            message: "delete post success",
            post: existingPost,
        };
    }

    @Mutation((_return) => PostMutationResponse)
    @UseMiddleware(CheckAuth)
    async vote(
        @Arg("postId", (_type) => Int) postId: number,
        @Arg("inputVoteValue", (_type) => VoteType) inputVoteValue: VoteType,
        @Ctx()
        {
            req: {
                session: { userId },
            },
            connection,
        }: CustomContext
    ): Promise<PostMutationResponse> {
        return await connection.transaction(async (transactionEntityManager) => {
            // check if post exists
            let post = await transactionEntityManager.findOne(Post, postId);
            if (!post) {
                throw new UserInputError("Post not found");
            }

            // check if that user has voted or not
            const existingVote = await transactionEntityManager.findOne(Upvote, { postId, userId });

            if (existingVote && existingVote.value !== inputVoteValue) {
                await transactionEntityManager.save(Upvote, {
                    ...existingVote,
                    value: inputVoteValue,
                });

                post = await transactionEntityManager.save(Post, {
                    ...post,
                    point: post.point + 2 * inputVoteValue,
                });
            }

            if (!existingVote) {
                const newVote = transactionEntityManager.create(Upvote, {
                    userId,
                    postId,
                    value: inputVoteValue,
                });
                await transactionEntityManager.save(newVote);

                post.point = post.point + inputVoteValue;
                post = await transactionEntityManager.save(post);
            }

            return {
                code: 200,
                success: true,
                message: "delete post success",
                post: post,
            };
        });
    }
}
