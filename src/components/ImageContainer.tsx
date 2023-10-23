import React from 'react'

interface ImageProps {
    width: string,
    height?: string,
    path: string,
    className?: string
}

export default function ImageContainer(props: ImageProps) {
    return (
        <div>
            {props.path ? (
                <img className={props.className} width={props.width} height={props.height} src={"https://image.tmdb.org/t/p/original" + props.path} />
            ) : (
                <img className={props.className} width={props.width} height={props.height} src='https://www.ncenet.com/wp-content/uploads/2020/04/No-image-found.jpg' />
            )}
        </div>
    )
}
