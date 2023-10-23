import React, { createContext, useContext, useEffect, useState } from 'react'
import useWindowSize from '../utils/useWindowSize'


interface IProps {
    children: React.ReactNode
}

export type GlobalContext = {
    mobile: boolean
    mid: boolean
    setMobile: (v: boolean) => void
}

export const WindowSizeContext = createContext<GlobalContext>({
    mobile: false,
    mid: false,
    setMobile: (_value: boolean) => { }
})

const WindowSizeProvider = (props: IProps) => {
    const [mobile, setMobile] = useState<boolean>(false)
    const [mid, setMid] = useState<boolean>(false)

    const [width] = useWindowSize()

    useEffect(() => {
        if (width <= 980 && width > 650) setMid(true)
        else if (width <= 650) {
            setMobile(true)
            setMid(false)
        }
        else {
            setMobile(false)
            setMid(false)
        }
    }, [width])
    return (
        <WindowSizeContext.Provider value={{ mid, mobile, setMobile }}>
            {props.children}
        </WindowSizeContext.Provider>
    )
}

const useWindowContext = () => useContext(WindowSizeContext)

export { useWindowContext, WindowSizeProvider }