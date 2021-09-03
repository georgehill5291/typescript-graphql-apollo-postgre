import { Flex } from "@chakra-ui/layout";
import { Alert, AlertIcon, AlertTitle, Button, Spinner } from "@chakra-ui/react";
import Layout from "components/Shared/Layout";
import { useRouter } from "next/router";
import React from "react";
import { useMeQuery, usePostQuery, useUpdatePostMutation } from "generated/graphql";
import NextLink from "next/link";
import { Form, Formik } from "formik";
import InputField from "components/CustomComponent/InputField";
import { UpdatePostInput } from "./../../../../../server/src/types/UpdatePostInput";

const PostEdit = () => {
    const router = useRouter();

    const { data: meData, loading: meLoading } = useMeQuery();

    const [updatePost, _] = useUpdatePostMutation();

    const {
        data: postData,
        loading: postLoading,
        error,
    } = usePostQuery({
        variables: {
            id: router.query.id as string,
        },
    });

    if (meLoading || postLoading) {
        <Flex justifyContent="center" alignItems="center" minH="100vh">
            <Spinner></Spinner>
        </Flex>;
    }

    if (!postData?.post)
        return (
            <Layout>
                <Alert status="error">
                    <AlertIcon />
                    <AlertTitle>Post not found</AlertTitle>
                </Alert>
                <NextLink href="/">
                    <Button mt={2}>Back to homepage</Button>
                </NextLink>
            </Layout>
        );

    if (!meLoading && !postLoading && meData?.me?.id !== postData?.post?.userId.toString()) {
        return (
            <Layout>
                <Alert status="error">
                    <AlertIcon />
                    <AlertTitle>Unauthorized</AlertTitle>
                </Alert>
                <NextLink href="/">
                    <Button mt={2}>Back to homepage</Button>
                </NextLink>
            </Layout>
        );
    }

    const initialValues = { title: postData.post.title, text: postData.post.text };

    const onUpdatePostSubmit = async (values: Omit<UpdatePostInput, "id">) => {
        await updatePost({
            variables: {
                updatePostInput: {
                    id: router.query.id as string,
                    ...values,
                },
            },
        });

        router.back();
    };

    return (
        <Layout>
            <Formik initialValues={initialValues} onSubmit={onUpdatePostSubmit}>
                {({ isSubmitting }) => (
                    <Form>
                        <InputField name="title" placeholder="Title" label="Title" type="text" />

                        <InputField
                            name="text"
                            placeholder="Text"
                            label="Text"
                            type="text"
                            textarea
                        />

                        <Flex mt={2}>
                            <Button type="submit" colorScheme="teal" isLoading={isSubmitting}>
                                Update Post
                            </Button>
                            <NextLink href="/login">
                                <Button ml="auto">Go back homepage</Button>
                            </NextLink>
                        </Flex>
                    </Form>
                )}
            </Formik>
        </Layout>
    );
};

export default PostEdit;
