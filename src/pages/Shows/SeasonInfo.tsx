import React, { useEffect, useRef, useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import { ITvSeason, ITvSeasonDetails } from '../../api/interfaces'
import Typography from '../../styles/Typography'
import { getTvSeason } from '../../api/tvAPI'
import { parseDate, parseRuntime } from '../../utils/parse'
import SeasonLoader from '../../components/Loaders/SeasonLoader'
import { useMyContext } from '../../context/DarkModeContext'
import { useWindowContext } from '../../context/WindowSize'

interface SeasonProps {
    tvId: string,
    seasons: ITvSeason[],
    backdrop_path: string
}

export default function SeasonInfo(props: SeasonProps) {

    const { mode } = useMyContext()
    const { mobile } = useWindowContext()

    const [prevSeasonIndex, setPrevSeasonIndex] = useState<number>(-1)
    const [currentSeasonIndex, setCurrentSesonIndex] = useState<number>(-1)
    const [showEpisodeDetailIndex, setShowEpisodeDetilIndex] = useState<number>(-1)
    const [seasons, setSeasons] = useState<ITvSeasonDetails[] | undefined>()
    const [seasonDivWidth, setSeasonDivWidth] = useState<number>()

    const seasonRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        fetchAllSeasons()
    }, [])

    useEffect(() => {
        document.getElementById("season-" + prevSeasonIndex)?.classList.remove("season-border-bottom")
        document.getElementById("season-" + currentSeasonIndex)?.classList.add("season-border-bottom")
    }, [currentSeasonIndex])

    useEffect(() => {
        setSeasonDivWidth(seasonRef.current?.offsetWidth)
    }, [seasonRef.current?.offsetWidth])

    const fetchAllSeasons = async () => {
        let allSeasons = []
        for (var i = 1; i < props.seasons.length + 1; i++) {
            const season = await getTvSeason(props.tvId, i + "")
            if (season) allSeasons.push(season)
        }
        setCurrentSesonIndex(currentSeasonIndex + 1)
        setSeasons(allSeasons)
    }

    const handleSeasonClick = (num: number) => {
        setPrevSeasonIndex(currentSeasonIndex)
        setCurrentSesonIndex(num + 1)

    }

    const handleScroll = (event: React.WheelEvent<HTMLDivElement>) => {
        const container = event.currentTarget;
        const scrollAmount = event.deltaY;
        container.scrollTo({
            top: 0,
            left: container.scrollLeft + scrollAmount,
            behavior: 'smooth'
        });
    }

    const openEpisodeDetail = (episodeNum: number) => {
        if (showEpisodeDetailIndex === episodeNum) setShowEpisodeDetilIndex(-1)
        else setShowEpisodeDetilIndex(episodeNum)
    }

    return (
        <div className='season-info-container' ref={seasonRef} style={{ backgroundSize: mobile ? "230% 100%" : "150% 200%", backgroundColor: mode ? "rgba(34, 34, 34, 1)" : "rgba(156,156,156,0.4)", backgroundImage: (seasons && (`url(${"https://image.tmdb.org/t/p/original" + props.backdrop_path})`)) }}>
            {seasons ? (
                <>
                    <Container className='seasons d-flex pt-3' onWheel={handleScroll}>

                        {seasons && seasons.map((season, index) => {
                            if (season.name.includes("Season") || season.name.includes("Miniseries"))
                                return (
                                    <div id={"season-" + index} onClick={() => handleSeasonClick(index - 1)} className='season-num' key={index}>
                                        <Typography className='mx-2 mt-1' color='white' variant='subtitle2' fontWeight={400}>{season.season_number + ". Season"}</Typography>
                                    </div>
                                )
                        }
                        )}
                    </Container>
                    <div>
                        {seasons && seasons[currentSeasonIndex]?.episodes.map((episode, index) => {
                            const episodeNum = episode.episode_number
                            const seasonNum = seasons[currentSeasonIndex].season_number
                            const episodeImgUrl = "https://image.tmdb.org/t/p/original" + episode.still_path
                            return (
                                <div className='episode py-2' key={index}>
                                    <div className='d-flex mt-1 mx-3' onClick={() => openEpisodeDetail(episodeNum)}>
                                        <Typography className='my-auto mb-2' color='white' variant='text'>{seasonNum + ".Season " + episodeNum + ". Episode"}</Typography>
                                        <Typography className='ms-auto me-3' variant='text'></Typography>
                                        <Typography className="my-auto  ms-auto" color='white' variant='text'>{parseDate(episode.air_date)}</Typography>
                                        <Typography className='my-auto ms-2' fontSize="15px" variant='text' color='white'>{(showEpisodeDetailIndex === episodeNum) ? (<i className="fa-solid fa-caret-down fa-rotate-90" />) : (<i className="fa-solid fa-caret-down" />)}</Typography>
                                    </div>
                                    {(showEpisodeDetailIndex === episodeNum) && (episodeImgUrl) && (
                                        <div className='episode-detail mx-auto d-flex'>
                                            <div className='episode-img' style={{ backgroundSize: mobile ? "230%" : "150%", backgroundImage: ("url('" + episodeImgUrl + "')") }} />
                                            <Container>
                                                <Row className='mt-2 d-flex'>
                                                    <div className='d-flex'>
                                                        <Typography className='mx-2' variant='subtitle2'>Name:</Typography>
                                                        <div style={{ marginTop: "2px" }}>
                                                            <Typography variant='text'>{episode.name}</Typography>
                                                        </div>
                                                    </div>

                                                </Row>
                                                <Row className='mt-0'>
                                                    <div className='d-flex'>
                                                        <Typography className='mx-2 mt-2' variant='subtitle2'>Overview:</Typography>
                                                        <p className='ms-1 mt-2' style={{ marginTop: "0", marginBottom: "0", maxHeight: "13ch" }}>{episode.overview}</p>
                                                    </div>
                                                </Row>
                                                <Row>
                                                    <div className='d-flex mt-1'>
                                                        <Typography className='mx-2' variant='subtitle2'>Runtime:</Typography>
                                                        <div style={{ marginTop: "2px" }}>
                                                            <Typography variant='text'>{parseRuntime(episode.runtime)}</Typography>

                                                        </div>
                                                    </div>
                                                </Row>

                                            </Container>
                                        </div>
                                    )}
                                </div>
                            )

                        })}

                    </div>
                </>

            ) : (
                <SeasonLoader width={seasonDivWidth} />
            )}

        </div>
    )
}
