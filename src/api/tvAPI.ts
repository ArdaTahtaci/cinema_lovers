import { IRequestCreator, api, requestCreator } from "./configs/axiosConfigs"
import { ICredit, IPopularTvs, ITv, ITvDetails, ITvKeywords, ITvSeasonDetails, ITvTrailer } from "./interfaces"


export const getTrendingSeries = async (switchOption: string): Promise<ITv[] | undefined> => {
    const params: IRequestCreator = {
        prevUrl: "/trending",
        urlParam1: switchOption,
        dataPath: "results",
        type: "tv"
    }

    return await requestCreator<ITv[]>(params)
}

export const getTvCredits = async (id: string): Promise<ICredit[] | undefined> => {

    const params: IRequestCreator = {
        urlParam1: id,
        urlParam2: "credits",
        dataPath: "cast",
        type: "tv"
    }
    return await requestCreator<ICredit[]>(params)

}

export const getTvDetails = async (id: string): Promise<ITvDetails | undefined> => {

    const params: IRequestCreator = {
        urlParam1: id,
        type: "tv"
    }
    return await requestCreator<ITvDetails>(params)
}

export const getTvSeason = async (id: string, season: string): Promise<ITvSeasonDetails | undefined> => {

    const params: IRequestCreator = {
        urlParam1: id,
        urlParam2: "season",
        urlParam3: season,
        type: "tv"
    }
    return await requestCreator<ITvSeasonDetails>(params)

}


export const getTvRecommendations = async (id: string): Promise<ITv[] | undefined> => {

    const params: IRequestCreator = {
        urlParam1: id,
        urlParam2: "recommendations",
        dataPath: "results",
        type: "tv"
    }
    return await requestCreator<ITv[]>(params)

}

export const getTvKeywords = async (id: string): Promise<ITvKeywords | undefined> => {

    const params: IRequestCreator = {
        urlParam1: id,
        urlParam2: "keywords",
        type: "tv"
    }
    return await requestCreator<ITvKeywords>(params)

}

export const getMultipleTvs = async (type: string, page: number): Promise<IPopularTvs | undefined> => {

    const params: IRequestCreator = {
        params: { page: page },
        urlParam1: type,
        type: "tv"
    }

    return await requestCreator<IPopularTvs>(params)
}

export const getTvVideos = async (id: string): Promise<ITvTrailer[] | undefined> => {

    const params: IRequestCreator = {
        urlParam1: id,
        urlParam2: "videos",
        dataPath: "results",
        type: "tv"
    }

    return requestCreator<ITvTrailer[]>(params)
}