import { api, requestCreator } from "./configs/axiosConfigs";
import { getRand } from "./configs/axiosUtils";
import { ICredit, IMovie, IMovieDetails, IMovieKeywords, IMovieTrailer, IPopularMovies } from "./interfaces";
import { IRequestCreator } from "./configs/axiosConfigs"

export const getTrendingMovies = async (switchOption: string): Promise<IMovie[] | undefined> => {

    const params: IRequestCreator = {
        prevUrl: "/trending",
        urlParam1: switchOption,
        dataPath: "results",
        type: "movie"
    }

    return await requestCreator<IMovie[]>(params)
}

export const getMovieDetails = async (id: string): Promise<IMovieDetails | undefined> => {

    const params: IRequestCreator = {
        urlParam1: id,
        type: "movie"
    }
    return await requestCreator<IMovieDetails>(params)

}

export const getMovieVideos = async (id: string): Promise<IMovieTrailer[] | undefined> => {

    const params: IRequestCreator = {
        urlParam1: id,
        urlParam2: "videos",
        dataPath: "results",
        type: "movie"
    }

    return requestCreator<IMovieTrailer[]>(params)
}

export const getMovieCredits = async (id: string): Promise<ICredit[] | undefined> => {

    const params: IRequestCreator = {
        urlParam1: id,
        urlParam2: "credits",
        dataPath: "cast",
        type: "movie"
    }
    return await requestCreator<ICredit[]>(params)
}

export const getMovieKeywords = async (id: string): Promise<IMovieKeywords | undefined> => {

    const params: IRequestCreator = {
        urlParam1: id,
        urlParam2: "keywords",
        type: "movie"
    }

    return await requestCreator<IMovieKeywords>(params)

}

export const getMovieRecommendations = async (id: string): Promise<IMovie[] | undefined> => {

    const params: IRequestCreator = {
        urlParam1: id,
        urlParam2: "recommendations",
        dataPath: "results",
        type: "movie"
    }

    return await requestCreator<IMovie[]>(params)
}

export const getMultipleMovies = async (type: string, page: number): Promise<IPopularMovies | undefined> => {

    const params: IRequestCreator = {
        params: { page: page },
        urlParam1: type,

        type: "movie"
    }

    return await requestCreator<IPopularMovies>(params)
}


export const getRandomImage = async (): Promise<string | undefined> => {

    const params: IRequestCreator = {
        prevUrl: "discover",
        params: { sort_by: "popularity.desc", page: getRand().page },
        dataPath: "results",
        type: "movie"
    }
    const res = await requestCreator<IMovie[]>(params)
    if (res)
        return res[getRand().index].backdrop_path
    else return ""

}
