import { Arg, ID, Int, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { Film } from "../entities/Film";
import { FilmMutationResponse } from "../types/Film/FilmMutationReponse";
import { PaginatedFilms } from "./../types/Film/PaginationFilms";
import { CheckAuth } from "./../middleware/checkAuth";
import { CreateFilmInput } from "../types/Film/CreateFilmInput";
import { UpdateFilmInput } from "../types/Film/UpdateFilmInput";

@Resolver((_of) => Film)
export class FilmResolver {
    @Query((_return) => PaginatedFilms, { nullable: true })
    async films(
        @Arg("limit", (_type) => Int) limit: number,
        @Arg("start", (_type) => Int) start: number
    ): Promise<PaginatedFilms | null> {
        try {
            const totalCount = await Film.count();
            const findOptions: { [key: string]: any } = {
                order: {
                    createdAt: "DESC",
                },
                start: start,
                take: limit,
            };

            // let lastPost: Film[] = [];
            const films = await Film.find(findOptions);

            return {
                totalCount: totalCount,
                paginatedFilms: films,
            };
        } catch (error) {
            return null;
        }
    }

    @Query((_return) => Film, { nullable: true })
    async film(@Arg("id", (_type) => ID) id: number): Promise<Film | undefined | null> {
        try {
            const film = await Film.findOne({ id });
            return film;
        } catch (error) {
            return null;
        }
    }

    @Mutation((_return) => FilmMutationResponse)
    @UseMiddleware(CheckAuth)
    async createFilm(
        @Arg("createFilmInput") { title, description, url, imageBanner }: CreateFilmInput
    ): Promise<FilmMutationResponse | null> {
        try {
            const newFilm = Film.create({ title, description, url, imageBanner });
            await newFilm.save();

            return {
                code: 200,
                success: true,
                message: "create film success",
                film: newFilm,
            };
        } catch (error) {
            return {
                code: 500,
                success: true,
                message: "Internal Error",
            };
        }
    }

    @Mutation((_return) => FilmMutationResponse)
    @UseMiddleware(CheckAuth)
    async updateFilm(
        @Arg("updateFilmInput") { id, title, description, url, imageBanner }: UpdateFilmInput
    ): Promise<FilmMutationResponse | null> {
        try {
            const existingFilm = await Film.findOne(id);
            if (!existingFilm) {
                return {
                    code: 400,
                    success: false,
                    message: "Film not found",
                };
            }

            existingFilm.title = title;
            existingFilm.description = description;
            existingFilm.url = url;
            existingFilm.imageBanner = imageBanner;
            await existingFilm.save();

            return {
                code: 200,
                success: true,
                message: "update film success",
                film: existingFilm,
            };
        } catch (error) {
            return {
                code: 500,
                success: true,
                message: "Internal Error",
            };
        }
    }

    @Mutation((_return) => FilmMutationResponse)
    @UseMiddleware(CheckAuth)
    async deleteFilm(@Arg("id", (_type) => ID) id: number): Promise<FilmMutationResponse | null> {
        try {
            const existingFilm = await Film.findOne(id);
            if (!existingFilm) {
                return {
                    code: 400,
                    success: false,
                    message: "Film not found",
                };
            }

            await Film.delete(id);

            return {
                code: 200,
                success: true,
                message: "update film success",
                film: existingFilm,
            };
        } catch (error) {
            return {
                code: 500,
                success: true,
                message: "Internal Error",
            };
        }
    }
}
