import { gql, Reference } from "@apollo/client";
import { Box, Button, Flex, Heading, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { MeDocument, MeQuery, useLogoutMutation, useMeQuery } from "./../../generated/graphql";

const Navbar = () => {
    const { data, loading: useMeQueryLoading } = useMeQuery();
    const [logout, { loading: useLogoutMutationLoading }] = useLogoutMutation();
    const router = useRouter();

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
                    {router.asPath.includes("/film") ? (
                        <NextLink href="/film/create">
                            <Button mr={4}>Create Film</Button>
                        </NextLink>
                    ) : (
                        <NextLink href="/create-post">
                            <Button mr={4}>Create Post</Button>
                        </NextLink>
                    )}

                    <Box>
                        <Button onClick={logoutUser} isLoading={useLogoutMutationLoading}>
                            Logout
                        </Button>
                    </Box>
                </Flex>
            </>
        );
    }

    console.log(router.asPath);

    return (
        <Box bg="tan" p={4}>
            <Flex maxW={800} justifyContent="space-between" m="auto" align="center">
                <Flex>
                    <NextLink href="/">
                        <Heading>George NextJS</Heading>
                    </NextLink>

                    <Box my="auto" ml={2}>
                        <NextLink href="/film-listing">
                            <Link>Films</Link>
                        </NextLink>
                    </Box>
                </Flex>

                {body}
            </Flex>
        </Box>
    );
};

export default Navbar;
