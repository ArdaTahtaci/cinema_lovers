import React, { useEffect } from 'react'
import { IMovieDetails, IMovieTrailer, ITvDetails } from '../../api/interfaces'
import { Col, Container, Row } from 'react-bootstrap'
import Typography from '../../styles/Typography'
import { parseDate, parseRuntime } from '../../utils/parse'
import PercentageCircle from '../../components/PercentageCircle'
import { useMyContext } from '../../context/DarkModeContext'
import { useWindowContext } from '../../context/WindowSize'

interface HeadingProps {
    serie?: ITvDetails
    movie?: IMovieDetails
    trailer?: IMovieTrailer | undefined
    openVideo?: () => void
}

export default function Heading(props: HeadingProps) {

    const { mode } = useMyContext()
    const { mobile, mid } = useWindowContext()

    const playTrailer = () => props.openVideo!()
    const genres = props.movie ? props.movie.genres : props.serie?.genres

    const container_background_image = (mobile ? "" : ((props.movie) ? (`url(${"https://image.tmdb.org/t/p/original" + props.movie!.backdrop_path})`) : (`url(${"https://image.tmdb.org/t/p/original" + props.serie!.backdrop_path})`)))
    const img_background_image = (!mobile ? "none" : ((props.movie) ? (`url(${"https://image.tmdb.org/t/p/original" + props.movie!.backdrop_path})`) : (`url(${"https://image.tmdb.org/t/p/original" + props.serie!.backdrop_path})`)))

    return (
        <div className='heading' style={{ backgroundImage: container_background_image, backgroundColor: mode ? "rgba(34, 34, 34, 1)" : "rgba(75,75,75,8)", backgroundSize: mid ? "160%" : "100%" }}>
            <div className='heading-container' style={{ marginLeft: (mobile || mid) ? "0" : "16%", marginRight: (mobile || mid) ? "0" : "16%" }}>
                <Row className='row-container' style={{ paddingTop: mobile ? "0" : "30px", }}>
                    <Col className='img-col col-4 mb-4' style={{ backgroundImage: img_background_image, width: mobile ? "97%" : "320px", backgroundSize: "150%", backgroundColor: mobile ? (mode ? "rgba(34, 34, 34, 1)" : "rgba(75,75,75,8)") : "rgba(0,0,0,0)" }}>
                        <img className='movie-im my-3' style={{ width: ((mobile || mid) && (mobile)) ? "100px" : "230px", height: mobile ? "200px" : "400px" }} src={props.movie ? ("https://image.tmdb.org/t/p/original" + props.movie!.poster_path) : ("https://image.tmdb.org/t/p/original" + props.serie!.poster_path)} />
                    </Col>
                    <Col className='detail-col mx-2'>
                        <div className='d-flex'>
                            <p className='movie-name'>
                                {props.movie ? props.movie!.title : props.serie?.name}
                            </p>
                            <Typography className='my-auto mx-3' fontSize={"28px"} color='faded1' variant='faded'>{props.movie ? ("(" + props.movie!.release_date.substring(0, 4) + ")") : ("(" + props.serie!.first_air_date.substring(0, 4) + ")")}</Typography>

                        </div>
                        <div className='date-genre'>
                            <Typography className='my-auto' variant='subtitle2' fontWeight={400} color='white'>{props.movie ? parseDate(props.movie!.release_date) : parseDate(props.serie!.first_air_date)}</Typography>
                            <Typography className='mx-2' variant='subtitle2' fontSize="28px" color="white" fontWeight={800} >·</Typography>

                            {genres!.map((genre, index) => {
                                let comma = ""
                                if (genres!.length - 1 !== index) comma = ","

                                return (
                                    (index < 3) && <Typography className='mx-1 my-auto' key={index} variant='subtitle2' color='white' fontWeight={400}>{genre.name}{comma} </Typography>
                                )
                            })}

                        </div>
                        {props.movie && (
                            <div className='d-flex'>
                                <Typography className='mt-2' variant='subtitle2' color='white' fontWeight={400}>Runtime:{" " + parseRuntime(props.movie!.runtime)}</Typography>
                            </div>
                        )}
                        <div>
                            {props.serie && <Typography className='my-auto' variant='subtitle2' color='white' fontWeight={400}>{props.serie.number_of_seasons + " Season, " + props.serie.number_of_episodes + " Episode"}</Typography>}
                        </div>
                        <div className='my-3 d-flex'>
                            <Typography variant='subtitle2' color='white' fontSize="14px" className='me-2 my-auto'>
                                User Score:
                            </Typography>
                            <div style={{ width: "60px", }}>
                                <PercentageCircle value={props.movie ? Math.floor(props.movie!.vote_average * 10) : Math.floor(props.serie!.vote_average * 10)}>
                                    <Typography variant='faded' color='white' fontSize="14px">{props.movie ? Math.floor(props.movie!.vote_average * 10) : Math.floor(props.serie!.vote_average * 10)}%</Typography>
                                </PercentageCircle>
                            </div>
                            <div className='my-auto ms-4' onClick={playTrailer} style={{ cursor: "pointer" }}>
                                <Typography variant='subtitle2' color='white' ><i className="fa-solid fa-play me-2" />Play Trailer</Typography>
                            </div>
                        </div>
                        <Typography variant='faded' color='faded1' fontSize="14px">
                            {props.movie ? props.movie!.tagline : props.serie?.tagline}
                        </Typography>
                        <Typography className='mt-3 mb-1' variant='subtitle1' color='white'>
                            Overview
                        </Typography>
                        <div style={{ width: "100%" }}>
                            <p style={{
                                color: "#fff",
                                fontFamily: "'Open Sans', sans-serif",
                                fontSize: "14px",
                                textAlign: "left"
                            }}>{props.movie ? props.movie!.overview : props.serie?.overview}</p>
                        </div>

                    </Col>
                </Row>

            </div>
        </div>
    )
}

// 
