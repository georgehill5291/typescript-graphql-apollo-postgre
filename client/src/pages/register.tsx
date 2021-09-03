import { Button, Flex, Spinner, useToast } from "@chakra-ui/react";
import { Form, Formik, FormikHelpers } from "formik";
import {
    FieldError,
    MeDocument,
    MeQuery,
    RegisterInput,
    useRegisterMutation,
} from "generated/graphql";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { useCheckAuth } from "utils/useCheckAuth";
import InputField from "../components/CustomComponent/InputField";
import Wrapper from "../components/CustomComponent/Wrapper";
import { mapFieldErrors } from "../helper/mapFieldErrors";

const initialValues: RegisterInput = {
    email: "",
    username: "",
    password: "",
};

const Register = () => {
    const [registerUser, { data, error, loading: _registerUserLoading }] = useRegisterMutation();

    const { data: authData, loading: authLoading } = useCheckAuth();
    const toast = useToast();

    var router = useRouter();

    const onRegisterSubmit = async (
        values: RegisterInput,
        { setErrors }: FormikHelpers<RegisterInput>
    ) => {
        const response = await registerUser({
            variables: {
                registerInput: values,
            },

            //update cache Apollo
            update(cache, { data }) {
                // const meData = cache.readQuery({ query: MeDocument });
                if (data?.register?.success) {
                    cache.writeQuery<MeQuery>({
                        query: MeDocument,
                        data: { me: data.register.user },
                    });
                }
            },
        });

        // console.log(response);
        console.log(response.data?.register?.error);
        if (response.data?.register?.error) {
            setErrors(mapFieldErrors(response.data.register.error as FieldError[]));
        } else if (response.data?.register?.user) {
            toast({
                title: `Welcome`,
                description: `Welcome ${response.data.register.user?.username}`,
                status: "success",
                duration: 5000,
                isClosable: true,
            });

            router.push("/");
        }
    };

    return (
        <>
            {authLoading || (!authLoading && authData?.me) ? (
                <Flex justifyContent="center" alignItems="center" minH="100vh">
                    <Spinner></Spinner>
                </Flex>
            ) : (
                <Wrapper size="small">
                    {error && <p>Fail to register</p>}
                    {data && data.register?.success ? (
                        <p>Register suscess {JSON.stringify(data)}</p>
                    ) : (
                        ""
                    )}
                    <Formik initialValues={initialValues} onSubmit={onRegisterSubmit}>
                        {({ isSubmitting }) => (
                            <Form>
                                <InputField
                                    name="username"
                                    placeholder="Username"
                                    label="Username"
                                    type="text"
                                />
                                <InputField
                                    name="email"
                                    placeholder="Email"
                                    label="Email"
                                    type="text"
                                />
                                <InputField
                                    name="password"
                                    placeholder="Password"
                                    label="Password"
                                    type="password"
                                />
                                <Button
                                    type="submit"
                                    colorScheme="teal"
                                    mt={4}
                                    isLoading={isSubmitting}
                                >
                                    Register
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Wrapper>
            )}
        </>
    );
};

export default Register;
