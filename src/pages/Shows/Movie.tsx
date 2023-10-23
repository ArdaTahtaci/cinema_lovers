import React, { useEffect, useRef, useState } from 'react'
import "./styles.css"

import { IMovie, IMovieDetails, IMovieKeywords, IMovieTrailer } from '../../api/interfaces'
import { useNavigate, useParams } from 'react-router-dom'
import { getMovieDetails, getMovieKeywords, getMovieRecommendations, getMovieVideos } from '../../api/movieAPI'
import Heading from './Heading'
import { getOneTrailer } from '../../utils/getOneTrailer'
import Video from './Video'
import Actors from './Actors'
import InfoSection from './InfoSection'
import { Col, Container } from 'react-bootstrap'
import Reviews from '../../components/Reviews'
import Typography from '../../styles/Typography'
import Cards from '../../components/Cards'
import { setMovieUrl } from '../../utils/setPathUrl'
import { useMyContext } from '../../context/DarkModeContext'
import { useWindowContext } from '../../context/WindowSize'

export default function Movie() {

    const { id } = useParams()
    const navigate = useNavigate()

    const { mode, setMode } = useMyContext()
    const { mobile, mid } = useWindowContext()

    const scrollRef = useRef<HTMLDivElement>(null)

    const [movie, setMovie] = useState<IMovieDetails | undefined>(undefined)
    const [trailer, setTrailer] = useState<IMovieTrailer | undefined>(undefined)
    const [showVideo, setShowVideo] = useState<boolean>(false)
    const [recommendations, setRecommendations] = useState<IMovie[] | undefined>()
    const [skeletonArray, setSkeletonArray] = useState<React.ReactNode>()
    const [videoSize, setVideoSize] = useState<{ width: string, height: string }>()


    useEffect(() => {
        let temp = []
        for (var i = 0; i < 10; i++) temp.push(<Cards key={i} type='actor' />)
        setSkeletonArray(temp)
        fetchMovieDetails(id!)
        fethMovieTrailer(id!)
        fetchRecommendations(id!)
        if (mid) setVideoSize({ width: "600", height: "300" })
        else if (mobile) setVideoSize({ width: "300", height: "150" })
        else setVideoSize({ width: "1000", height: "550" })
        if (mode === undefined) setMode(true)
    }, [])

    useEffect(() => {
        if (!mode) {
            scrollRef.current?.classList.add("dark-mode")
            scrollRef.current?.classList.remove("movie-carousel")

        }
        else {
            scrollRef.current?.classList.remove("dark-mode")
            scrollRef.current?.classList.add("movie-carousel")
        }
    }, [mode])

    useEffect(() => {
        if (mid) setVideoSize({ width: "600", height: "300" })
        else if (mobile) setVideoSize({ width: "300", height: "150" })
        else setVideoSize({ width: "1000", height: "550" })
    }, [mid, mobile])

    const fetchMovieDetails = async (id: string) => {
        const movieDetails = await getMovieDetails(id)
        setMovie(movieDetails)
    }

    const fethMovieTrailer = async (id: string) => {
        const movieVideos = await getMovieVideos(id)
        setTrailer(getOneTrailer(movieVideos))
    }

    const fetchRecommendations = async (id: string) => {
        const results = await getMovieRecommendations(id)
        setRecommendations(results)
    }

    const goToRecommendation = (title: string, id: number) => {
        navigate(setMovieUrl(title, id))
    }


    return (
        <div>
            {movie && (
                <div>
                    <Heading movie={movie} trailer={trailer} openVideo={() => setShowVideo(true)} />
                    {(showVideo && videoSize) && <Video closeVideo={() => setShowVideo(false)} videoSize={videoSize!} videoId={trailer!.key} />}
                    <Container style={{ display: (mid || mobile) ? "" : "flex" }}>
                        <div className='col-lg-8' style={{ width: (mid || mobile) ? "100%" : "66%" }}>
                            <Actors type='movie' />
                            <div className='my-4 mx-auto' style={{ borderTop: "1px solid #aaa", width: "80%" }} />
                            <Reviews id={id!} type='movie' mode={mode!} />
                            <div className='my-4'>
                                <Typography className='mt-4 mb-3 ms-3' color={!mode ? "white" : "black"} variant='subtitle1'>Recommendations</Typography>


                                <div className='movie-carousel d-flex' ref={scrollRef} style={{ backgroundColor: mode ? "rgba(51,51,51,0.5)" : "#666", height: (recommendations && recommendations.length > 0) ? "300px" : "0px", backgroundImage: (recommendations && recommendations.length > 0) ? "" : "none" }}>
                                    {recommendations ? recommendations.map((movie, index) => {

                                        return (
                                            <div className='mx-2' >
                                                <Cards key={index} goToMovie={goToRecommendation} isWhite={true} movie={movie} type='show' showType='movie' />
                                            </div>
                                        )

                                    }) : (skeletonArray)}

                                </div>
                                {(recommendations && recommendations.length === 0) && (
                                    <div>
                                        <Typography className='mx-3' variant='text' color={mode ? "black" : "white"}>No Recommendation</Typography>
                                    </div>
                                )}

                            </div>
                        </div>
                        <div className='col-lg-4'>
                            <InfoSection movie={movie} />
                        </div>
                    </Container>
                </div>
            )}
        </div>
    )
}
