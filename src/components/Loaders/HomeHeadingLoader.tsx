import React from 'react'
import ContentLoader from "react-content-loader"
import "./styles.css"
import { useWindowContext } from '../../context/WindowSize'

interface HeadingLoaderProps {
    parentWidth: number | undefined,
}

export default function HomeHeadingLoader(props: HeadingLoaderProps) {

    const { mobile } = useWindowContext()

    return (
        <div className='header'>
            {props.parentWidth && (
                <ContentLoader
                    speed={2}
                    height={"350px"}
                    viewBox={"0 0 " + props.parentWidth + " 350"}
                    foregroundColor='#aaa'
                    backgroundColor='#ccc'
                >
                    {mobile ? (
                        <>
                            <rect x="40" y="60" rx="2" ry="2" width="200" height="40" />
                            <rect x="40" y="120" rx="2" ry="2" width="300" height="25" />
                            <rect x="40" y="210" rx="20" ry="50" width={(props.parentWidth! * 8) / 10} height="40" />

                        </>) : (
                        <>
                            <rect x="100" y="100" rx="2" ry="2" width="180" height="30" />
                            <rect x="100" y="160" rx="2" ry="2" width="300" height="30" />
                            <rect x="100" y="240" rx="20" ry="50" width={(props.parentWidth! * 8) / 10} height="40" />

                        </>
                    )}


                    {/* <rect x="0" y="0" rx="2" ry="2" width={props.parentWidth} height="350" /> */}
                </ContentLoader>
            )}

        </div>


    )
}
