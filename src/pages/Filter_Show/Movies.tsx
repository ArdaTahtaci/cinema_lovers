import React, { useEffect, useState } from 'react'
import "./styles.css"
import { getMultipleMovies } from '../../api/movieAPI'
import { IMovie } from '../../api/interfaces'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import Typography from '../../styles/Typography'
import { Col, Container, Row } from 'react-bootstrap'
import Cards from '../../components/Cards'
import { setMovieUrl } from '../../utils/setPathUrl'
import LoadMoreButton from '../../components/LoadMoreButton'
import { useMyContext } from '../../context/DarkModeContext'


export default function Movies() {

    const navigate = useNavigate()
    const path = useLocation()

    const { mode } = useMyContext()

    const [popularMovies, setPopularMovies] = useState<IMovie[]>()
    const [pageType, setPageType] = useState<"popular" | "top-rated" | "upcoming" | "now-playing" | string>()
    const [pageLoaded, setPageLoaded] = useState(true)
    const [lastPage, setLastPage] = useState<number>(1)
    const [skeletonArray, setSkeletonArray] = useState<React.ReactNode>()

    useEffect(() => {
        let temp = []
        for (var i = 0; i < 20; i++) temp.push(<Col><Cards key={i} type='actor' /></Col>)
        setSkeletonArray(temp)
        fetchPopularMovies(1)
        const currentPath = path.pathname.replace("/movie/", "")
        setPageType(currentPath)
    }, [])

    useEffect(() => {
        if (lastPage !== 1)
            fetchNextPage()
    }, [lastPage])


    const fetchPopularMovies = async (page: number) => {
        const res = await getMultipleMovies(path.pathname.replace("/movie/", "").replace("-", "_"), page)
        if (res) setPageLoaded(true)

        setPopularMovies(res!.results)
    }

    const fetchNextPage = async () => {
        setPageLoaded(false)

        const res = await getMultipleMovies(path.pathname.replace("/movie/", "").replace("-", "_"), lastPage)
        let allMovies: IMovie[] = popularMovies!

        res?.results.forEach((movie) => allMovies.push(movie))

        setPopularMovies(allMovies)

        setPageLoaded(true)
    }

    const updatePage = () => {
        setLastPage(lastPage + 1)
    }

    const goToMovie = (title: string, id: number) => {
        navigate(setMovieUrl(title, id))
    }


    return (
        <Container>
            <Typography className='my-4' color={mode ? "black" : "white"} variant='caption2'>{pageType && pageType.substring(0, 1).toLocaleUpperCase() + pageType.substring(1, pageType.length) + " Movies"}</Typography>
            <Row>

                {popularMovies ? popularMovies.map((movie, index) => {
                    return (
                        <Col key={index}>
                            <div className='mx-auto'>
                                <Cards isWhite={mode ? false : true} type='show' showType='movie' movie={movie} goToMovie={goToMovie}></Cards>

                            </div>
                        </Col>
                    )
                }) : skeletonArray}

                <div className='mx-auto my-4'>
                    <LoadMoreButton updatePage={updatePage} isLoaded={pageLoaded} />
                </div>

            </Row>
        </Container>
    )
}
