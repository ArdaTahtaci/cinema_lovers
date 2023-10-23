import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Typography from '../../styles/Typography'
import { useNavigate } from 'react-router-dom'
import { getPopularPeople } from '../../api/peopleAPI'
import Cards from '../../components/Cards'
import { IPerson } from '../../api/interfaces'
import LoadMoreButton from '../../components/LoadMoreButton'
import { useMyContext } from '../../context/DarkModeContext'

export default function PopularPeople() {

    const navigate = useNavigate()

    const { mode } = useMyContext()

    const [popularPeople, setPopularPeople] = useState<IPerson[]>()
    const [pageLoaded, setPageLoaded] = useState(true)
    const [lastPage, setLastPage] = useState<number>(1)
    const [skeletonArray, setSkeletonArray] = useState<React.ReactNode>()

    useEffect(() => {
        let temp = []
        for (var i = 0; i < 20; i++) temp.push(<Col><Cards key={i} type='actor' /></Col>)
        setSkeletonArray(temp)
        fetchPopularMovies()

    }, [])

    useEffect(() => {
        if (lastPage !== 1)
            fetchNextPage()
    }, [lastPage])


    const fetchPopularMovies = async () => {
        const res = await getPopularPeople(1)

        setPopularPeople(res!)
    }

    const fetchNextPage = async () => {
        setPageLoaded(false)

        const res = await getPopularPeople(lastPage)
        let allPeople: IPerson[] = popularPeople!

        res?.forEach((person) => allPeople.push(person))

        setPopularPeople(allPeople)

        setPageLoaded(true)
    }

    const updatePage = () => {
        setLastPage(lastPage + 1)
    }

    const goToActor = (creditId: string, name: string) => {
        navigate("/person/" + creditId + "/" + name)
    }

    return (
        <Container>
            <Typography className='my-4' color={mode ? "black" : "white"} variant='caption2'>{"Popular People"}</Typography>
            <Row>

                {popularPeople ? popularPeople.map((person, index) => {
                    return (
                        <Col key={index}>
                            <div className='mx-auto mb-4'>
                                <Cards isWhite={true} type="actor" actor={person} goToActor={goToActor}></Cards>

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
