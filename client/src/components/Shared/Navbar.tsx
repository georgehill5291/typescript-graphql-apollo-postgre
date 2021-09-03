import { Box, Button, Flex, Heading, Link } from "@chakra-ui/react";
import { initializeApollo } from "lib/apolloClient";
import NextLink from "next/link";
import { MeDocument, MeQuery, useLogoutMutation, useMeQuery } from "./../../generated/graphql";
import { Reference, gql } from "@apollo/client";

const Navbar = () => {
    const { data, loading: useMeQueryLoading } = useMeQuery();
    const [logout, { loading: useLogoutMutationLoading }] = useLogoutMutation();

    const logoutUser = async () => {
        await logout({
            update(cache, { data }) {
                if (data?.logout) {
                    cache.writeQuery<MeQuery>({
                        query: MeDocument,
                        data: { me: null },
                    });

                    //update voteType field to default value 0
                    cache.modify({
                        fields: {
                            posts(existing) {
                                existing.paginatedPosts.forEach((post: Reference) => {
                                    cache.writeFragment({
                                        id: post.__ref,
                                        fragment: gql`
                                            fragment VoteType on Post {
                                                voteType
                                            }
                                        `,
                                        data: {
                                            voteType: 0,
                                        },
                                    });
                                });

                                return existing;
                            },
                        },
                    });
                }
            },
        });

        // const apolloClient = initializeApollo();
        // apolloClient.resetStore();
    };
    let body;

    if (useMeQueryLoading) {
        body = null;
    } else if (!data?.me) {
        body = (
            <>
                <Box>
                    <NextLink href="/login">
                        <Link mr={2}>Login</Link>
                    </NextLink>

                    <NextLink href="/register">
                        <Link>Register</Link>
                    </NextLink>
                </Box>
            </>
        );
    } else {
        body = (
            <>
                <Flex>
                    <NextLink href="/create-post">
                        <Button mr={4}>Create Post</Button>
                    </NextLink>

                    <Box>
                        <Button onClick={logoutUser} isLoading={useLogoutMutationLoading}>
                            Logout
                        </Button>
                    </Box>
                </Flex>
            </>
        );
    }

    return (
        <Box bg="tan" p={4}>
            <Flex maxW={800} justifyContent="space-between" m="auto" align="center">
                <NextLink href="/">
                    <Heading>George NextJS</Heading>
                </NextLink>

                {body}
            </Flex>
        </Box>
    );
};

export default Navbar;
