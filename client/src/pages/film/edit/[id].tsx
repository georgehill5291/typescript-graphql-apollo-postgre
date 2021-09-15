import { Flex } from "@chakra-ui/layout";
import { Alert, AlertIcon, AlertTitle, Button, Spinner } from "@chakra-ui/react";
import InputField from "components/CustomComponent/InputField";
import Layout from "components/Shared/Layout";
import { Form, Formik } from "formik";
import { UpdateFilmInput, useFilmQuery, useMeQuery } from "generated/graphql";
import { useRouter } from "next/router";
import React from "react";
import { useUpdateFilmMutation } from "./../../../generated/graphql";
import NextLink from "next/link";

const EditFilm = () => {
    const router = useRouter();

    const { data: meData, loading: meLoading } = useMeQuery();

    const { data: filmData, loading: filmLoading } = useFilmQuery({
        variables: {
            id: router.query.id as string,
        },
    });

    const [updateFilm, _] = useUpdateFilmMutation();

    if (meLoading || filmLoading) {
        <Flex justifyContent="center" alignItems="center" minH="100vh">
            <Spinner></Spinner>
        </Flex>;
    }

    if (!filmData) {
        return (
            <Flex justifyContent="center" alignItems="center" minH="100vh">
                Film not found
            </Flex>
        );
    }

    if (!meData?.me?.id) {
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

    const initialValues = {
        title: filmData.film?.title,
        description: filmData.film?.description,
        url: filmData.film?.url,
        imageBanner: filmData.film?.imageBanner,
    } as UpdateFilmInput;

    const onUpdateFilmSubmit = async (values: Omit<UpdateFilmInput, "id">) => {
        await updateFilm({
            variables: {
                updateFilmInput: {
                    id: router.query.id as string,
                    ...values,
                },
            },
        });

        router.push("/film-listing");
    };

    return (
        <>
            <Layout>
                <Formik initialValues={initialValues} onSubmit={onUpdateFilmSubmit}>
                    {({ isSubmitting }) => (
                        <Form>
                            <InputField
                                name="title"
                                placeholder="Title"
                                label="Title"
                                type="text"
                            />

                            <InputField
                                name="description"
                                placeholder="Text"
                                label="Description"
                                type="text"
                                textarea
                            />

                            <InputField name="url" placeholder="Url" label="Url" type="text" />

                            <InputField
                                name="imageBanner"
                                placeholder="Image Banner"
                                label="Image Banner"
                                type="text"
                            />

                            <Flex mt={2}>
                                <Button type="submit" colorScheme="teal" isLoading={isSubmitting}>
                                    Update Film
                                </Button>
                                <NextLink href="/film-listing">
                                    <Button ml="auto">Go back homepage</Button>
                                </NextLink>
                            </Flex>
                        </Form>
                    )}
                </Formik>
            </Layout>{" "}
        </>
    );
};

export default EditFilm;
