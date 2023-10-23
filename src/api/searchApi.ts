import { api } from "./configs/axiosConfigs"
import { ISearchResults } from "./interfaces"

export const getSearchResults = async (query: string | undefined): Promise<ISearchResults[] | undefined> => {

    if (!query) return undefined

    const options = {
        method: 'GET',
        url: "search/multi",
        params: { query: query, include_adult: 'false', language: 'en-US', page: '1' },
    }
    try {
        const res = await api.request(options)
        console.log(res)
        const sResults: ISearchResults[] = res.data.results
        return sResults

    } catch (error) {
        console.log(error)
    }
}