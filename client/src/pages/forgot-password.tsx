import Wrapper from "components/CustomComponent/Wrapper";
import React from "react";
import { Form, Formik } from "formik";
import InputField from "components/CustomComponent/InputField";
import { Box, Button, Flex, Link, Spinner } from "@chakra-ui/react";
import { ForgotPasswordInput, useForgotPasswordMutation } from "generated/graphql";
import { useCheckAuth } from "utils/useCheckAuth";
import NextLink from "next/link";
import { useRouter } from "next/router";

const ForgotPassword = () => {
    const initialValues = { email: "" };
    const { data: authData, loading: authLoading } = useCheckAuth();

    var router = useRouter();

    const [forgotPassword, { loading, data }] = useForgotPasswordMutation();

    const onForgotPasswordSubmit = async (values: ForgotPasswordInput) => {
        await forgotPassword({
            variables: {
                forgotPasswordInput: values,
            },
        });

        router.push("/");
    };

    if (authLoading || (!authLoading && authData?.me)) {
        return (
            <Flex justifyContent="center" alignItems="center" minH="100vh">
                <Spinner></Spinner>
            </Flex>
        );
    }

    return (
        <Wrapper size="small">
            <Formik initialValues={initialValues} onSubmit={onForgotPasswordSubmit}>
                {({ isSubmitting }) =>
                    !loading && data ? (
                        <Box>Please check your inbox</Box>
                    ) : (
                        <Form>
                            <InputField
                                name="email"
                                placeholder="Email"
                                label="Email"
                                type="email"
                            />

                            <Flex mt={2}>
                                <NextLink href="/login">
                                    <Link ml="auto">Back to Login</Link>
                                </NextLink>
                            </Flex>
                            <Button
                                type="submit"
                                colorScheme="teal"
                                mt={4}
                                isLoading={isSubmitting}
                            >
                                Send Reset Password via Email
                            </Button>
                        </Form>
                    )
                }
            </Formik>
        </Wrapper>
    );
};

export default ForgotPassword;
