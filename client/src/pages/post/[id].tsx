import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/alert";
import { Button } from "@chakra-ui/button";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import ActionsButton from "components/Shared/ActionsButton";
import Layout from "components/Shared/Layout";
import {
    PostDocument,
    PostIdsQuery,
    PostQuery,
    PostsDocument,
    usePostQuery,
} from "generated/graphql";
import { addApolloState, initializeApollo } from "lib/apolloClient";
import { GetStaticPaths, GetStaticProps } from "next";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Post = () => {
    const router = useRouter();

    const { data, loading, error } = usePostQuery({
        variables: {
            id: router.query.id as string,
        },
    });

    if (loading) {
        <Flex justifyContent="center" alignItems="center" minH="100vh">
            <Spinner></Spinner>
        </Flex>;
    }

    if (error || !data?.post) {
        return (
            <Layout>
                <Alert status="error">
                    <AlertIcon />
                    <AlertTitle>{error ? error.message : "Post not found"}</AlertTitle>
                </Alert>
                <NextLink href="/">
                    <Button mt={2}>Back to homepage</Button>
                </NextLink>
            </Layout>
        );
    }

    return (
        <Layout>
            <>
                <Heading mb={4}>{data.post.title}</Heading>
                <Box mb={4}>{data.post.text}</Box>
                <Flex mt={4} justifyContent="space-between" alignItems="center">
                    <ActionsButton postId={data.post.id} postUserId={data.post.userId.toString()} />
                    <NextLink href="/">
                        <Button>Back to homepage</Button>
                    </NextLink>
                </Flex>
            </>
        </Layout>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const apolloClient = initializeApollo();

    const { data } = await apolloClient.query<PostIdsQuery>({
        query: PostsDocument,
        variables: {
            limit: 3,
        },
    });

    return {
        paths: data.posts!.paginatedPosts.map((post) => ({ params: { id: `${post.id}` } })),
        fallback: "blocking",
    };
};

export const getStaticProps: GetStaticProps<{ [key: string]: any }, { id: string }> = async ({
    params,
}) => {
    const apolloClient = initializeApollo();

    await apolloClient.query<PostQuery>({
        query: PostDocument,
        variables: {
            id: params?.id,
        },
    });

    return addApolloState(apolloClient, {
        props: {},
    });
};

export default Post;
