import { RefObject } from "react";

export const calculate = (switchButton: RefObject<HTMLDivElement>, switchContainer: RefObject<HTMLDivElement>, isLight?: boolean) => {

    const startWidth = switchButton.current!.offsetWidth
    let endWidth
    let translateEnd
    let translateStart

    if (isLight === undefined) {
        if (startWidth === 70) {
            endWidth = "95px"
            translateStart = "translate(0)"
            translateEnd = "translate(75px)"
        }
        else {
            translateStart = "translate(80px)"
            translateEnd = "translate(0)"
            endWidth = "70px"
        }
    }
    else {
        if (isLight) {
            endWidth = "40px"
            translateStart = "translate(0)"
            translateEnd = "translate(40px)"
        }
        else {
            endWidth = "40px"

            translateStart = "translate(40px)"
            translateEnd = "translate(0)"

        }
    }


    switchButton.current?.animate([
        {
            transform: translateStart,
            width: startWidth + "px",

        },
        {
            width: endWidth,
            transform: translateEnd
        }
    ], {
        duration: 200,
        fill: 'forwards',
    })

}
