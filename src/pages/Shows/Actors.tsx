import React, { useEffect, useRef, useState } from 'react'
import Typography from '../../styles/Typography'
import { ICredit } from '../../api/interfaces';
import { getMovieCredits } from '../../api/movieAPI';
import { useNavigate, useParams } from 'react-router-dom';
import Cards from '../../components/Cards';
import { filterActors } from '../../utils/filterActors';
import { Container } from 'react-bootstrap';
import { getTvCredits } from '../../api/tvAPI';
import { useMyContext } from '../../context/DarkModeContext';

interface ActorsProps {
    type: "movie" | "tv"
}
export default function Actors(props: ActorsProps) {

    const { id } = useParams()
    const navigate = useNavigate()

    const { mode } = useMyContext()

    const scrollRef = useRef<HTMLDivElement>(null)

    const [actors, setActors] = useState<ICredit[] | undefined>(undefined)
    const [skeletonArray, setSkeletonArray] = useState<React.ReactNode>()

    const goToActor = (creditId: string, name: string) => {
        navigate("/person/" + creditId + "/" + name)
    }

    useEffect(() => {
        let temp = []
        for (var i = 0; i < 10; i++) temp.push(
            <div className='mx-2'>
                <Cards key={i} type='actor' />
            </div>
        )
        setSkeletonArray(temp)
        fetchCredits()

    }, [])

    useEffect(() => {
        if (!mode) {
            scrollRef.current?.classList.add("dark-mode")
            scrollRef.current?.classList.remove("actors-card-carousel")

        }
        else {
            scrollRef.current?.classList.remove("dark-mode")
            scrollRef.current?.classList.add("actors-card-carousel")
        }
    }, [mode])


    const fetchCredits = async () => {
        let actors

        if (props.type === "movie") actors = await getMovieCredits(id!)
        else actors = await getTvCredits(id!)

        setActors(filterActors(actors!))
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

    return (
        <div className='actors-container my-4'>
            <Container>
                <Typography color={!mode ? "white" : "black"} variant='subtitle1'>Actors</Typography>

            </Container>
            <div className='actors-card-carousel' ref={scrollRef} style={{ height: (actors && actors!.length > 0) ? "360px" : "40px" }} onWheel={handleScroll}>
                <div className='card-container d-flex' >
                    {actors ? actors?.map((actor, index) => {

                        return (
                            <div className='mx-2' key={index}>
                                <Cards key={index} type='actor' actor={actor} goToActor={goToActor} />
                            </div>
                        )


                    }) : skeletonArray}

                </div>
            </div>
        </div>
    )
}
