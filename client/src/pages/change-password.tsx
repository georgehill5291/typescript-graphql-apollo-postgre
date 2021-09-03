import { Box, Button, Flex, Link, Spinner } from "@chakra-ui/react";
import InputField from "components/CustomComponent/InputField";
import Wrapper from "components/CustomComponent/Wrapper";
import { Form, Formik, FormikHelpers } from "formik";
import { MeDocument, MeQuery, useChangePasswordMutation } from "generated/graphql";
import router, { useRouter } from "next/router";
import React, { useState } from "react";
import { ChangePasswordInput } from "./../../../server/src/types/ChangePasswordInput";
import { mapFieldErrors } from "./../helper/mapFieldErrors";
import NextLink from "next/link";
import { useCheckAuth } from "utils/useCheckAuth";

const ChangePassword = () => {
    const initialValues = { newPassword: "" };
    const { data: authData, loading: authLoading } = useCheckAuth();
    const { query } = useRouter();

    const [changePassword] = useChangePasswordMutation();
    const [tokenError, setTokenError] = useState("");

    const onChangePasswordSubmit = async (
        values: ChangePasswordInput,
        { setErrors }: FormikHelpers<ChangePasswordInput>
    ) => {
        if (query.userId && query.token) {
            const respsone = await changePassword({
                variables: {
                    userId: query.userId as string,
                    token: query.token as string,
                    changePasswordInput: values,
                },
                //update cache Apollo
                update(cache, { data }) {
                    if (data?.changePassword.success) {
                        cache.writeQuery<MeQuery>({
                            query: MeDocument,
                            data: { me: data.changePassword.user },
                        });
                    }
                },
            });

            if (respsone.data?.changePassword.error) {
                const fieldErrors = mapFieldErrors(respsone.data.changePassword.error);

                if ("token" in fieldErrors) {
                    setTokenError(fieldErrors.token);
                }

                setErrors(fieldErrors);
            } else if (respsone.data?.changePassword.user) {
                router.push("/");
            }
        }
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
            <Formik initialValues={initialValues} onSubmit={onChangePasswordSubmit}>
                {({ isSubmitting }) => (
                    <Form>
                        <InputField
                            name="newPassword"
                            placeholder="New Password"
                            label="New Password"
                            type="password"
                        />
                        {tokenError && (
                            <Flex>
                                <Box color="red" mr={2}>
                                    {tokenError}
                                </Box>
                                <NextLink href="/forgot-password">
                                    <Link>Go back to forgot passwor</Link>
                                </NextLink>
                            </Flex>
                        )}
                        <Button type="submit" colorScheme="teal" mt={4} isLoading={isSubmitting}>
                            Change password
                        </Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
};

export default ChangePassword;
