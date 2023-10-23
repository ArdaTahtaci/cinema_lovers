import React, { useEffect, useState } from 'react'
import ContentLoader from 'react-content-loader'

interface SeasonLoaderProps {
    width: number | undefined
}


export default function SeasonLoader(props: SeasonLoaderProps) {

    const [width, setWidth] = useState<number>(700)

    useEffect(() => {
        if (props.width) {
            setWidth(props.width)
        }
    }, [props.width])

    return (
        <div style={{ backgroundColor: "#fff" }}>
            <ContentLoader
                speed={2}
                viewBox={"0 0 " + width + " 700"}
                foregroundColor='#bbb'
                backgroundColor='#ddd'
                width={width}
                height={700}
            >

                <rect x="0" y="0" rx="2" ry="2" width={width} height="50" />
                <rect x="0" y="60" rx="2" ry="2" width={width} height="590" />

            </ContentLoader>
        </div>

    )
}
