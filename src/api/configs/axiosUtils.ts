interface RandomReturnObject {
    page: number,
    index: number
}

export const getRand = (): RandomReturnObject => {
    const page = Math.floor(Math.random() * 40 + 1)
    const index = Math.floor(Math.random() * 20)

    return {
        page: page,
        index: index
    }
}

