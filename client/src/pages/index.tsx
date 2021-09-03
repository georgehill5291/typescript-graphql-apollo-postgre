import { NetworkStatus } from "@apollo/client";
import { Box, Button, Flex, Heading, Link, Spinner, Stack, Text } from "@chakra-ui/react";
import ActionsButton from "components/Shared/ActionsButton";
import UpvoteSection from "components/Shared/UpvoteSection";
import { PostsDocument, useMeQuery, usePostsQuery } from "generated/graphql";
import { addApolloState, initializeApollo } from "lib/apolloClient";
import {
    GetServerSideProps,
    GetServerSidePropsContext,
    GetStaticProps,
    GetStaticPropsContext,
} from "next";
import NextLink from "next/link";
import React from "react";
import Layout from "./../components/Shared/Layout";

const limit = 3;

const Index = () => {
    const { data: meData } = useMeQuery();

    const { data, loading, error, fetchMore, networkStatus } = usePostsQuery({
        variables: {
            limit,
        },

        //component nao render boi cai Posts query, se rerender khi networkStatus change
        notifyOnNetworkStatusChange: true,
    });

    const loadingMorePosts = networkStatus === NetworkStatus.fetchMore;

    const loadMorePosts = () =>
        fetchMore({
            variables: {
                cursor: data?.posts?.cursor,
            },
        });

    return (
        <Layout>
            {loading && !loadingMorePosts ? (
                <Flex justifyContent="center" alignItems="center" minH="100vh">
                    <Spinner></Spinner>
                </Flex>
            ) : (
                <Stack spacing={8}>
                    {data?.posts?.paginatedPosts.map((post) => (
                        <Flex key={post.id} p={5} shadow="md" borderWidth="1px">
                            <UpvoteSection post={post} />
                            <Box flex={1}>
                                <NextLink href={`/post/${post.id}`}>
                                    <Link>
                                        <Heading>{post.title}</Heading>
                                    </Link>
                                </NextLink>
                                <Text>post by {post.user.username}</Text>
                                <Flex align="center">
                                    <Text mt={4}>{post.textSnippet}</Text>
                                    <Box ml="auto">
                                        {meData?.me?.id === post.user.id && (
                                            <ActionsButton
                                                postId={post.id}
                                                postUserId={post.user.id}
                                            ></ActionsButton>
                                        )}
                                    </Box>
                                </Flex>
                            </Box>
                        </Flex>
                    ))}
                </Stack>
            )}
            {data?.posts?.hasMore && (
                <Flex>
                    <Button m="auto" my={8} isLoading={loadingMorePosts} onClick={loadMorePosts}>
                        {loadingMorePosts ? "Loading" : "Show more"}
                    </Button>
                </Flex>
            )}
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    const apolloClient = initializeApollo({ headers: context.req.headers });

    await apolloClient.query({
        query: PostsDocument,
        variables: {
            limit: limit,
        },
    });

    return addApolloState(apolloClient, {
        props: {},
    });
};

export default Index;
