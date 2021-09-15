import { Flex } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import InputField from "components/CustomComponent/InputField";
import Layout from "components/Shared/Layout";
import { Form, Formik } from "formik";
import { CreateFilmInput } from "generated/graphql";
import NextLink from "next/link";
import React from "react";
import { useCreateFilmMutation } from "./../../generated/graphql";

const CreateFilm = () => {
    // const { data: authData, loading: authLoading } = useCheckAuth();
    const initialValues = {
        title: "",
        description: "",
        url: "",
        imageBanner: "",
    } as CreateFilmInput;

    const [createFilm, _] = useCreateFilmMutation();

    const onCreateFilmSummit = async (values: CreateFilmInput) => {
        await createFilm({
            variables: {
                createFilmInput: values,
            },
        });
    };

    return (
        <div>
            <Layout>
                <Formik initialValues={initialValues} onSubmit={onCreateFilmSummit}>
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
                                    Create Film
                                </Button>
                                <NextLink href="/film-listing">
                                    <Button ml="auto">Go back homepage</Button>
                                </NextLink>
                            </Flex>
                        </Form>
                    )}
                </Formik>
            </Layout>
        </div>
    );
};

export default CreateFilm;
