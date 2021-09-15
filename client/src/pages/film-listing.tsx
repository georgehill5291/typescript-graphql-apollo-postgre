import { IconButton } from "@chakra-ui/button";
import { EditIcon, ViewIcon } from "@chakra-ui/icons";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Link, Text } from "@chakra-ui/layout";
import { FilmsDocument, useFilmsQuery } from "generated/graphql";
import { addApolloState, initializeApollo } from "lib/apolloClient";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React from "react";
import Layout from "./../components/Shared/Layout";

const FilmListing = () => {
    const { data } = useFilmsQuery({
        variables: {
            start: 0,
            limit: 10,
        },
    });

    return (
        <>
            <Layout>
                {data?.films?.paginatedFilms.map((film) => (
                    <Flex key={film.id} shadow="md" borderWidth="1px" p={5}>
                        <Image
                            borderRadius="lg"
                            width={{ md: 40 }}
                            mr={3}
                            src={film.imageBanner}
                            alt={film.title}
                        />
                        <Box flex={1}>
                            <Text fontSize="3xl" fontWeight="bold">
                                {film.title}
                            </Text>
                            <Text>{film.description}</Text>
                        </Box>
                        <Box my="auto">
                            <Link href={film.url} target="_blank">
                                <IconButton icon={<ViewIcon />} aria-label="view" mr={2} />
                            </Link>
                            <Link href={`/film/edit/${film.id}`} target="_blank">
                                <IconButton icon={<EditIcon />} aria-label="edit" />
                            </Link>
                        </Box>
                    </Flex>
                ))}
            </Layout>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    const apolloClient = initializeApollo({ headers: context.req.headers });

    await apolloClient.query({
        query: FilmsDocument,
        variables: {
            start: 0,
            limit: 10,
        },
    });

    return addApolloState(apolloClient, {
        props: {},
    });
};

export default FilmListing;
