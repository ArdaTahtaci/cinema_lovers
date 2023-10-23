import axios from "axios"

export interface IRequestCreator {
    prevUrl?: string,
    urlParam1?: string,
    urlParam2?: string,
    urlParam3?: string,
    params?: Object,
    dataPath?: "results" | "cast",
    type: "movie" | "tv" | "person"
}


export const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    method: "get",
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + process.env.REACT_APP_ACCESS_TOKEN
    },

})


export const requestCreator = async<T>(request: IRequestCreator): Promise<T | undefined> => {


    let url1, url2, url3 = ""

    if (request.urlParam1) url1 = "/" + request.urlParam1
    else url1 = ""
    if (request.urlParam2) {
        url1 = url1! + "/"
        url2 = request.urlParam2
    }
    else url2 = ""
    if (request.urlParam3) {
        url2 = request.urlParam2 + "/"
        url3 = request.urlParam3
    }
    else url3 = ""
    if (!request.prevUrl) request.prevUrl = ""

    let urlParams
    if (request.params) urlParams = Object.assign({ language: 'en-US' }, request.params)
    else urlParams = { language: 'en-US' }


    const options = {
        url: request.prevUrl + "/" + request.type + url1 + url2 + url3,
        params: urlParams,
    }

    try {
        const res = await api.request(options)
        const response = res.data

        if (request.dataPath === "results") return response.results as T
        else if (request.dataPath === "cast") return response.cast as T
        return response as T

    } catch (error) {
        console.log(error)
    }


}
