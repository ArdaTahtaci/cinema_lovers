import { IMovieTrailer, ITvTrailer } from "../api/interfaces";

export const getOneTrailer = (videos: IMovieTrailer[] | ITvTrailer[] | undefined): (IMovieTrailer | ITvTrailer | undefined) => {
    let trailers

    if (videos !== undefined) trailers = videos.filter((video) => video.type === "Trailer")
    if (trailers) return trailers[0]
    return
}