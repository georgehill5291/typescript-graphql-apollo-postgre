import { Button, Flex, Spinner } from "@chakra-ui/react";
import InputField from "components/CustomComponent/InputField";
import { Form, Formik } from "formik";
import { CreatePostInput, useCreatePostMutation } from "generated/graphql";
import NextLink from "next/link";
import router from "next/router";
import React from "react";
import { useCheckAuth } from "utils/useCheckAuth";
import Layout from "./../components/Shared/Layout";

const CreatePost = () => {
    const { data: authData, loading: authLoading } = useCheckAuth();
    const initialValues = {
        title: "",
        text: "",
    };

    const [createPost, _] = useCreatePostMutation();

    const onCreatePostSummit = async (values: CreatePostInput) => {
        await createPost({
            variables: {
                createPostInput: values,
            },
            //update cache Apollo
            update(cache, { data }) {
                cache.modify({
                    //over apolloclient root
                    fields: {
                        posts(existing) {
                            console.log("existing", existing);

                            if (data?.createPost.success && data?.createPost.post) {
                                const newPostRef = cache.identify(data.createPost.post);

                                const newPostsAfterCreation = {
                                    ...existing,
                                    totalCount: existing.totalCount + 1,
                                    paginatedPosts: [
                                        { __ref: newPostRef },
                                        ...existing.paginatedPosts, // [{__ref: 'post 1"}, {__ref: 'post 2"}]
                                    ],
                                };

                                return newPostsAfterCreation;
                            }
                        },
                    },
                });
            },
        });

        router.push("/");
    };

    if (authLoading || (!authLoading && !authData?.me)) {
        return (
            <Flex justifyContent="center" alignItems="center" minH="100vh">
                <Spinner></Spinner>
            </Flex>
        );
    } else {
        return (
            <Layout>
                <Formik initialValues={initialValues} onSubmit={onCreatePostSummit}>
                    {({ isSubmitting }) => (
                        <Form>
                            <InputField
                                name="title"
                                placeholder="Title"
                                label="Title"
                                type="text"
                            />

                            <InputField
                                name="text"
                                placeholder="Text"
                                label="Text"
                                type="text"
                                textarea
                            />

                            <Flex mt={2}>
                                <Button type="submit" colorScheme="teal" isLoading={isSubmitting}>
                                    Create Post
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
    }
};

export default CreatePost;
