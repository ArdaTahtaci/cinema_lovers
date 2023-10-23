import React, { CSSProperties, useEffect, useRef, useState } from 'react'
import Typography from '../styles/Typography';
import { calculate } from '../utils/switchChange';
import { useMyContext } from '../context/DarkModeContext';

interface SwitchProps {
    onSwitch: (prop?: boolean) => void
    switchValue?: boolean,
    val1?: string,
    val2?: string,
    styles?: {},
    isLight?: boolean

}

export default function SwitchComponent(props: SwitchProps) {

    const { mode } = useMyContext()

    const switchButton = useRef<HTMLDivElement>(null);
    const switchContainer = useRef<HTMLDivElement>(null);

    const [switchValue, setSwitchValue] = useState<boolean>(true)
    const [styles, setStyles] = useState<CSSProperties>({})


    useEffect(() => {

        setStyles({
            marginLeft: "auto",
            marginRight: "auto"
        })

        props.onSwitch(switchValue)

    }, [switchValue])

    const animate = () => {
        calculate(switchButton, switchContainer)
        setTimeout(() => {
            setSwitchValue(!switchValue)
        }, 150);
    }

    return (
        <div ref={switchContainer} className='custom-switch-button mx-3' style={props.styles}>
            <div ref={switchButton} onClick={animate} className='switch-button'></div>
            <div className='my-auto' onClick={animate} style={{ ...styles, cursor: "pointer", position: "relative" }}>
                <Typography className='mx-auto' color={switchValue ? "white" : (mode ? "black" : "white")} variant='text' fontWeight={switchValue ? 800 : 400} style={{ fontWeight: "500" }}>{props.val1 ? (props.val1) : (<i className="fa-solid fa-sun mt-2" ></i>)}</Typography>

            </div>
            <div className='my-auto' onClick={animate} style={{ ...styles, cursor: "pointer", right: "0", position: "relative", marginLeft: "auto", }}>
                <Typography className='mx-auto' color={switchValue ? (mode ? "black" : "white") : "white"} variant='text' fontWeight={switchValue ? 400 : 800}>{props.val2 ? (props.val2) : (<i className="fa-sharp fa-solid fa-moon mt-2"></i>)}</Typography>
            </div>
        </div>
    )
}
