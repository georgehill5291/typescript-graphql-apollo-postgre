import React, { useState } from "react";
import { Flex, IconButton } from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { PostFragmentFragment, useVoteMutation, VoteType } from "generated/graphql";
import { useRouter } from "next/router";

interface IProps {
    post: PostFragmentFragment;
}

enum VoteTypeValue {
    Upvote = 1,
    Downvote = -1,
}

const UpvoteSection = ({ post }: IProps) => {
    const [vote, { loading }] = useVoteMutation();

    const router = useRouter();

    const [loadingState, setLoadingState] = useState<
        "upvote-loading" | "downvote-loading" | "not-loading"
    >("not-loading");

    const upvote = async (postId: string) => {
        setLoadingState("upvote-loading");
        const response = await vote({
            variables: {
                inputVoteValue: VoteType.Upvote,
                postId: parseInt(postId),
            },
        });
        setLoadingState("not-loading");
    };

    const downvote = async (postId: string) => {
        setLoadingState("downvote-loading");
        await vote({
            variables: {
                inputVoteValue: VoteType.Downvote,
                postId: parseInt(postId),
            },
        });
        setLoadingState("not-loading");
    };

    return (
        <Flex direction="column" alignItems="center" mr={4}>
            <IconButton
                icon={<ChevronUpIcon />}
                aria-label="upvote"
                onClick={
                    post.voteType === VoteTypeValue.Upvote ? undefined : upvote.bind(this, post.id)
                }
                isLoading={loading && loadingState === "upvote-loading"}
                colorScheme={post.voteType === VoteTypeValue.Upvote ? "green" : undefined}
            ></IconButton>
            {post.point}
            <IconButton
                icon={<ChevronDownIcon />}
                aria-label="downvote"
                onClick={
                    post.voteType === VoteTypeValue.Downvote
                        ? undefined
                        : downvote.bind(this, post.id)
                }
                isLoading={loading && loadingState === "downvote-loading"}
                colorScheme={post.voteType === VoteTypeValue.Downvote ? "red" : undefined}
            ></IconButton>
        </Flex>
    );
};

export default UpvoteSection;
