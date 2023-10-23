import React, { useEffect, useRef, useState } from 'react'
import YouTube, { YouTubeProps } from 'react-youtube'
import Typography from '../../styles/Typography';
import useWindowSize from '../../utils/useWindowSize';

interface VideoProps {
    videoId: string,
    closeVideo: () => void,
    videoSize: {
        width: string,
        height: string
    }
}

export default function Video(props: VideoProps) {

    const [vidSize, setVidSize] = useState<{ width: string, height: string }>(props.videoSize)

    useEffect(() => {
        setVidSize(props.videoSize)
    }, [props.videoSize])

    const opts: YouTubeProps['opts'] = {
        height: vidSize.height,
        width: vidSize.width,
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };

    const onPlayerReady: YouTubeProps['onReady'] = (event) => {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }

    const size = useWindowSize()

    useEffect(() => {
        if (playerRef) {
            const space = size[0] - parseInt(vidSize.width)
            const left = space / 2
            playerRef.current!.style.left = left + "px"
        }

    }, [size])

    const playerRef = useRef<HTMLDivElement>(null)
    const width = playerRef.current?.offsetWidth

    const close = () => props.closeVideo()

    return (
        <div className='video-player' ref={playerRef} style={{ width: vidSize.width, top: (props.videoSize.width === "300") ? "8%" : "2%" }}>
            <div className='d-flex video-player-bar' style={{ width: width + "- 10px" }}>
                <Typography className='ms-3 my-auto' variant='subtitle1' color='white'>Play Trailer</Typography>
                <div className='ms-auto my-auto' onClick={close}>
                    <Typography className='me-2' variant='faded' color='faded2'>
                        <i style={{ cursor: "pointer" }} className="fa-solid fa-xmark" />
                    </Typography>
                </div>
            </div>
            <YouTube videoId={props.videoId} opts={opts} onReady={onPlayerReady} />
        </div>
    )
}
