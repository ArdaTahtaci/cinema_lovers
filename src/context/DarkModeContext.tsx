import React, { createContext, useContext, useEffect, useState } from 'react'

interface IProps {
    children: React.ReactNode
}

export type GlobalContext = {
    mode: boolean | undefined
    setMode: (v: boolean) => void
}

export const DarkContext = createContext<GlobalContext>({
    mode: undefined,
    setMode: (_value: boolean) => { }
})

const DarkContextProvider = (props: IProps) => {
    const [mode, setMode] = useState<boolean | undefined>(undefined)

    useEffect(() => {
        const storedData = localStorage.getItem('myContextData');
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setMode(parsedData.mode)
        }
        console.log(storedData)
    }, []);

    useEffect(() => {
        if (mode !== undefined) {
            const dataToStore = JSON.stringify({ mode, setMode });
            localStorage.setItem('myContextData', dataToStore);
        }
    }, [mode]);

    return (
        <DarkContext.Provider value={{ mode, setMode }}>
            {props.children}
        </DarkContext.Provider>
    );


}

const useMyContext = () => useContext(DarkContext)

export { DarkContextProvider, useMyContext }
