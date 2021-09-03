import { Reference } from "@apollo/client";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, IconButton } from "@chakra-ui/react";
import { PaginatedPosts, useDeletePostMutation, useMeQuery } from "generated/graphql";
import NextLink from "next/link";
import router from "next/router";
import React from "react";

interface IProps {
    postId: string;
    postUserId: string;
}

const ActionsButton = ({ postId, postUserId }: IProps) => {
    const [deletePost, _] = useDeletePostMutation();

    const { data: meData, loading: meLoading } = useMeQuery();

    const onPostDelete = async (postId: string) => {
        await deletePost({
            variables: {
                id: postId,
            },
            update(cache, { data }) {
                if (data?.deletePost.success) {
                    cache.modify({
                        fields: {
                            posts(
                                existing: Pick<
                                    PaginatedPosts,
                                    "__typename" | "cursor" | "hasMore" | "totalCount"
                                > & { paginatedPosts: Reference[] }
                            ) {
                                const newPostsDeletion = {
                                    ...existing,
                                    totalCount: existing.totalCount - 1,
                                    paginatedPosts: existing.paginatedPosts.filter(
                                        (postRef) => postRef.__ref !== `Post:${postId}`
                                    ),
                                };

                                return newPostsDeletion;
                            },
                        },
                    });
                }
            },
        });

        router.push("/");
    };

    if (meData?.me?.id != postUserId) return null;

    return (
        <Box>
            <NextLink href={`/post/edit/${postId}`}>
                <IconButton icon={<EditIcon />} aria-label="edit" mr={4}></IconButton>
            </NextLink>
            <IconButton
                icon={<DeleteIcon />}
                aria-label="delete"
                mr={4}
                colorScheme="red"
                onClick={onPostDelete.bind(this, postId)}
            ></IconButton>
        </Box>
    );
};

export default ActionsButton;
