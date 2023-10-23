export const parseDate = (date: string | undefined) => {
    if (date) {
        const year = date.substring(0, 4)
        const month = date.substring(5, 7)
        const day = date.substring(8, 10)

        return day + "/" + month + "/" + year
    }
    return "-"

}

export const parseRuntime = (runtime: number): string => {
    let hour = 0
    while (runtime > 60) {
        runtime = runtime - 60
        hour++
    }
    if (hour === 0) return runtime + "m"
    return hour + "h " + runtime + "m"
}

export const parseMoney = (amount: number): string => {
    if (amount === 0) return "-"

    let str = amount + ""
    let result = ""
    while (str.length >= 1) {
        let comma = ""
        if (result.length !== 0) comma = ","
        result = str.substring(str.length - 3, str.length) + comma + result
        str = str.substring(0, str.length - 3)

    }
    result = "$" + str + result + ".00"

    return result
}