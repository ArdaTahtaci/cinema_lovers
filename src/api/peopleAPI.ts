import { IRequestCreator, api, requestCreator } from "./configs/axiosConfigs"
import { IMovie, IPerson, IPersonDetail } from "./interfaces"

export const getPerson = async (id: string): Promise<IPersonDetail | undefined> => {

    const params: IRequestCreator = {
        urlParam1: id,
        type: "person"
    }
    return await requestCreator<IPersonDetail>(params)
}

export const getPersonsMovies = async (id: string): Promise<IMovie[] | undefined> => {

    const params: IRequestCreator = {
        urlParam1: id,
        urlParam2: "movie_credits",
        dataPath: "cast",
        type: "person"
    }
    return await requestCreator<IMovie[]>(params)

}

export const getPopularPeople = async (page: number): Promise<IPerson[] | undefined> => {

    const params: IRequestCreator = {
        params: { page: page },
        urlParam1: "popular",
        dataPath: "results",
        type: "person"
    }

    return await requestCreator<IPerson[]>(params)
}