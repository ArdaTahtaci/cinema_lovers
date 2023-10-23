import { api } from "./configs/axiosConfigs"
import { IReview } from "./interfaces"

export const getReviews = async (id: string, type: string): Promise<IReview[] | undefined> => {
    const options = {
        method: 'GET',
        url: "/" + type + "/" + id + "/reviews",
        params: { language: 'en-US' },
    }
    try {
        const res = await api.request(options)
        const reviews: IReview[] = res.data.results
        return reviews
    } catch (error) {
        console.log(error)
    }
}