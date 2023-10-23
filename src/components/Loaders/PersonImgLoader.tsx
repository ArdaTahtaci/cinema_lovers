import React, { useEffect, useState } from 'react'
import ContentLoader from "react-content-loader"

interface PersonImageLoaderProps {
    width: number | undefined
}

export default function PersonImgLoader(props: PersonImageLoaderProps) {

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
            viewBox={"0 0 " + width + " " + (height + 320)}
            foregroundColor='#bbb'
            backgroundColor='#ddd'
        >
            <rect x="0" y="10" rx="20" ry="20" width={width} height={(height)} />
            <rect x="0" y={height + 30} rx="2" ry="2" width="100" height="25" />
            <rect x="0" y={height + 70} rx="2" ry="2" width="120" height="20" />
            <rect x="0" y={height + 95} rx="2" ry="2" width="40" height="20" />
            <rect x="0" y={height + 135} rx="2" ry="2" width="60" height="20" />
            <rect x="0" y={height + 160} rx="2" ry="2" width="100" height="20" />
            <rect x="0" y={height + 200} rx="2" ry="2" width="80" height="20" />
            <rect x="0" y={height + 225} rx="2" ry="2" width="60" height="20" />
            <rect x="0" y={height + 255} rx="2" ry="2" width="80" height="20" />
            <rect x="0" y={height + 280} rx="2" ry="2" width="60" height="20" />

        </ContentLoader>
    )
}
