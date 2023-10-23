import React, { useEffect, useRef } from 'react'
import "./styles.css"
import { ISearchResults } from '../../api/interfaces'
import Typography from '../../styles/Typography'
import { parseDate } from '../../utils/parse'
import ImageContainer from '../../components/ImageContainer'
import { useNavigate } from 'react-router-dom'
import { setMovieUrl, setTvUrl } from '../../utils/setPathUrl'
import { useMyContext } from '../../context/DarkModeContext'
import { useWindowContext } from '../../context/WindowSize'

interface MovieResultProps {
    movieResult: ISearchResults
}

export default function MovieResults(props: MovieResultProps) {

    const navigate = useNavigate()
    const { mode } = useMyContext()
    const { mobile } = useWindowContext()

    const titleRef = useRef<HTMLParagraphElement>(null)

    const handleClick = () => {
        if (props.movieResult.media_type === "movie")
            navigate(setMovieUrl(props.movieResult.title, props.movieResult.id))
        else navigate(setTvUrl(props.movieResult.name, props.movieResult.id))
    }
    return (
        <div className='result-container my-3' style={{ backgroundColor: mode ? "" : "#333" }} >
            <div className='res-img-container d-flex'>
                <div onClick={handleClick} style={{ cursor: "pointer" }}>
                    <ImageContainer className='res-img' width='100px' height='100%' path={props.movieResult.poster_path} />
                </div>
                <div className='res-info'>
                    <div onClick={handleClick}>
                        <p ref={titleRef} className='result-title' style={{ color: mode ? "black" : "white" }} >{props.movieResult.title}</p>
                    </div>
                    <Typography className='mb-1' variant='faded' color={mode ? "faded2" : "faded1"} fontSize="14px">{parseDate(props.movieResult.release_date)}</Typography>
                    <p className='result-overview me-3' style={{ color: mode ? "black" : "white", maxHeight: (titleRef.current && titleRef.current!.offsetHeight < 25) ? "8ch" : "5ch" }}>{props.movieResult.overview.substring(0, 460)}...</p>
                </div>
            </div>

        </div>
    )
}
