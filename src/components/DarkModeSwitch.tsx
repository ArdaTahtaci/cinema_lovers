import React, { CSSProperties, useEffect, useRef, useState } from 'react'
import { calculate } from '../utils/switchChange';
import Typography from '../styles/Typography';
import { useWindowContext } from '../context/WindowSize';
import { useMyContext } from '../context/DarkModeContext';


interface SwitchProps {
    onSwitch: (prop?: boolean) => void
    switchValue?: boolean,
    styles?: {},
    isLight?: boolean,
    setIsLight: (v: boolean) => void

}

export default function DarkModeSwitch(props: SwitchProps) {

    const switchButton = useRef<HTMLDivElement>(null);
    const switchContainer = useRef<HTMLDivElement>(null);

    const { mobile, mid } = useWindowContext()
    const { mode } = useMyContext()

    const [switchValue, setSwitchValue] = useState<boolean>(false)
    const [styles, setStyles] = useState<CSSProperties>({})
    const [firstRender, setFirstRender] = useState(false)



    useEffect(() => {

        setStyles({

            width: "60px",
            height: "30px",
            marginLeft: "auto",
            marginRight: "auto"


        })
        props.onSwitch(switchValue)

    }, [switchValue])

    useEffect(() => {
        if (switchContainer.current) {
            const swContainer = switchContainer.current
            if (mid || mobile) {
                swContainer.classList.add("me-auto")
                swContainer.classList.remove("ms-auto")
            }
            else {
                swContainer.classList.remove("me-auto")
                swContainer.classList.add("ms-auto")
            }

        }
    }, [mobile, mid])



    const animate = () => {
        const swBtn = switchButton.current
        swBtn!.style.left = "0px"
        setFirstRender(true)
        calculate(switchButton, switchContainer, props.isLight)
        setTimeout(() => {
            setSwitchValue(!switchValue)
        }, 150);
    }

    return (
        <div ref={switchContainer} className='custom-switch-button ms-auto me-4' style={props.styles}>
            <div ref={switchButton} onClick={animate} className='switch-button-dark' style={{ width: "40px", left: (!firstRender && !mode) ? "40px" : "0" }}></div>
            <div className='my-auto' onClick={animate} style={{ ...styles, cursor: "pointer", position: "relative" }}>
                <Typography className='mx-auto' color={"white"} variant='text' fontWeight={switchValue ? 800 : 400} style={{ fontWeight: "500" }}><i className="fa-solid fa-sun mt-2" ></i></Typography>

            </div>
            <div className='my-auto' onClick={animate} style={{ ...styles, cursor: "pointer", right: "0", position: "relative", marginLeft: "auto", }}>
                <Typography className='mx-auto' color={"white"} variant='text' fontWeight={switchValue ? 400 : 800}><i className="fa-sharp fa-solid fa-moon mt-2"></i></Typography>
            </div>
        </div>
    )
}
