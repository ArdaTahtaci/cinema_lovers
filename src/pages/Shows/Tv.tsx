import React, { useEffect, useRef, useState } from 'react'
import { ITv, ITvDetails, ITvTrailer } from '../../api/interfaces'
import { useNavigate, useParams } from 'react-router-dom'
import { getTvDetails, getTvRecommendations, getTvVideos } from '../../api/tvAPI'
import Heading from './Heading'
import { Col, Container, Row } from 'react-bootstrap'
import Actors from './Actors'
import InfoSection from './InfoSection'
import SeasonInfo from './SeasonInfo'
import Typography from '../../styles/Typography'
import Reviews from '../../components/Reviews'
import Cards from '../../components/Cards'
import { setTvUrl } from '../../utils/setPathUrl'
import { getOneTrailer } from '../../utils/getOneTrailer'
import Video from './Video'
import { useMyContext } from '../../context/DarkModeContext'
import { useWindowContext } from '../../context/WindowSize'

export default function Tv() {

    const { id } = useParams()
    const navigate = useNavigate()

    const { mode, setMode } = useMyContext()
    const { mobile, mid } = useWindowContext()

    const scrollRef = useRef<HTMLDivElement>(null)

    const [tv, setTv] = useState<ITvDetails | undefined>()
    const [trailer, setTrailer] = useState<ITvTrailer | undefined>(undefined)
    const [showVideo, setShowVideo] = useState<boolean>(false)
    const [recommendations, setRecommendations] = useState<ITv[] | undefined>()
    const [videoSize, setVideoSize] = useState<{ width: string, height: string }>()

    useEffect(() => {
        fetchMovieDetails(id!)
        fethMovieTrailer(id!)
        fetchRecommendations(id!)
        if (mid) setVideoSize({ width: "700", height: "350" })
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
        if (mid) setVideoSize({ width: "700", height: "350" })
        else if (mobile) setVideoSize({ width: "300", height: "150" })
        else setVideoSize({ width: "1000", height: "550" })
    }, [mid, mobile])

    const fetchMovieDetails = async (id: string) => {
        const tvDetails = await getTvDetails(id)
        setTv(tvDetails)
    }

    const fethMovieTrailer = async (id: string) => {
        const movieVideos = await getTvVideos(id)
        setTrailer(getOneTrailer(movieVideos))
    }

    const fetchRecommendations = async (id: string) => {
        const results = await getTvRecommendations(id)
        setRecommendations(results)
    }

    const goToRecommendation = (name: string, id: number) => {
        navigate(setTvUrl(name, id), { replace: true })
        window.location.reload()

    }


    return (
        <div>
            {tv &&
                <div>
                    <Heading serie={tv} openVideo={() => setShowVideo(true)} />
                    {(showVideo && videoSize) && <Video videoSize={videoSize} closeVideo={() => setShowVideo(false)} videoId={trailer!.key} />}
                    <Container >
                        <Row style={{ display: (mobile || mid) ? "" : "flex" }}>
                            <Col className='col-8' style={{ width: (mid || mobile) ? "100%" : "66%" }}>
                                <Actors type='tv' />
                                <div className='my-4 mx-auto' style={{ borderTop: "1px solid #aaa", width: "80%" }} />

                            </Col>
                            <Col className='col-4'>
                                <InfoSection serie={tv} />
                            </Col>
                        </Row>

                        <div>
                            <div>
                                <Typography className='my-4' variant='subtitle1'>Seasons</Typography>
                                <SeasonInfo tvId={id!} seasons={tv.seasons} backdrop_path={tv.backdrop_path} />
                            </div>
                            <Reviews id={id!} type='tv' mode={mode!} />
                            <div className='my-4'>
                                <Typography className='mt-4 mb-3 ms-3' color={mode ? "black" : "white"} variant='subtitle1'>Recommendations</Typography>
                                <div className='movie-carousel d-flex' ref={scrollRef} style={{ backgroundColor: !mode ? "rgba(51,51,51,0.5)" : "#666" }}>
                                    {recommendations && recommendations.map((tv, index) => {
                                        return (
                                            <div className='mx-2'>
                                                <Cards key={index} isWhite goToTv={goToRecommendation} serie={tv} type='show' showType='tv' />
                                            </div>
                                        )
                                    })}
                                </div>

                            </div>
                        </div>

                    </Container>
                </div>
            }
        </div>
    )
}
