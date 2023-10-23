import React, { useEffect, useState } from 'react'
import ContentLoader from 'react-content-loader'

interface PersonInfoProps {
    width: number | undefined
}

export default function PersonInfoLoader(props: PersonInfoProps) {

    const [width, setWidth] = useState<number>(500)
    const [height, setHeight] = useState<number>(750)

    useEffect(() => {
        if (props.width) {
            setWidth(props.width)
            setHeight((props.width * 3 / 2))
        }
    }, [props.width])


    return (
        <ContentLoader
            speed={2}
            viewBox={"0 0 " + width + " 300"}
            foregroundColor='#bbb'
            backgroundColor='#ddd'
        >
            <rect x="0" y="30" rx="2" ry="2" width={width} height="15" />
            <rect x="0" y="50" rx="2" ry="2" width={width} height="15" />
            <rect x="0" y="70" rx="2" ry="2" width={width} height="15" />
            <rect x="0" y="90" rx="2" ry="2" width={width} height="15" />
            <rect x="0" y="110" rx="2" ry="2" width={width} height="15" />
            <rect x="0" y="130" rx="2" ry="2" width={width} height="15" />
            <rect x="0" y="150" rx="2" ry="2" width={width} height="15" />
            <rect x="0" y="170" rx="2" ry="2" width={width} height="15" />


        </ContentLoader>

    )
}
