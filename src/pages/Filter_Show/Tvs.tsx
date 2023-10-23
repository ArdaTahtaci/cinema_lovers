import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ITv } from '../../api/interfaces'
import { getMultipleTvs } from '../../api/tvAPI'
import { setTvUrl } from '../../utils/setPathUrl'
import { Col, Container, Row } from 'react-bootstrap'
import Typography from '../../styles/Typography'
import Cards from '../../components/Cards'
import LoadMoreButton from '../../components/LoadMoreButton'
import { useMyContext } from '../../context/DarkModeContext'

export default function Tv() {

    const navigate = useNavigate()
    const path = useLocation()

    const { mode } = useMyContext()

    const [pageLoaded, setPageLoaded] = useState(true)
    const [lastPage, setLastPage] = useState<number>(1)
    const [popularTvs, setPopularTvs] = useState<ITv[]>()
    const [pageType, setPageType] = useState<"popular" | "top-rated" | "airing_today" | "on_the_air" | string>()
    const [skeletonArray, setSkeletonArray] = useState<React.ReactNode>()


    useEffect(() => {
        let temp = []
        for (var i = 0; i < 20; i++) temp.push(<Col><Cards key={i} type='actor' /></Col>)
        setSkeletonArray(temp)
        fetchPopularTvs(1)
        const currentPath = path.pathname.replace("/tv/", "")

        setPageType(currentPath)
    }, [])

    useEffect(() => {
        if (lastPage !== 1)
            fetchNextPage()
    }, [lastPage])


    const fetchPopularTvs = async (page: number) => {
        const res = await getMultipleTvs(path.pathname.replace("/tv/", "").replaceAll("-", "_"), page)

        setPopularTvs(res!.results)
    }

    const fetchNextPage = async () => {
        setPageLoaded(false)

        const res = await getMultipleTvs(path.pathname.replace("/tv/", "").replaceAll("-", "_"), lastPage)
        let allTvs: ITv[] = popularTvs!

        res?.results.forEach((movie) => allTvs.push(movie))

        setPopularTvs(allTvs)

        setPageLoaded(true)
    }

    const goToTv = (title: string, id: number) => {
        navigate(setTvUrl(title, id))
    }

    const updatePage = () => {
        setLastPage(lastPage + 1)
    }


    return (
        <Container>
            <Typography className='my-4' color={mode ? "black" : "white"} variant='caption2'>{pageType && pageType.substring(0, 1).toLocaleUpperCase() + pageType.substring(1, pageType.length) + " Tv Shows"}</Typography>
            <Row>

                {popularTvs ? popularTvs.map((tv, index) => {
                    return (
                        <Col key={index}>
                            <Cards isWhite={mode ? false : true} type='show' showType='tv' serie={tv} goToTv={goToTv}></Cards>
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
