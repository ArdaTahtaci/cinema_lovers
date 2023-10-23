import React, { useEffect, useState } from 'react'
import { Card, Container } from 'react-bootstrap'
import Typography from '../styles/Typography'
import { ICredit, IMovie, IPerson, ITv } from '../api/interfaces'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import CardLoader from './Loaders/CardLoader';
import { useMyContext } from '../context/DarkModeContext';

interface CardProps {
    type: "show" | "actor",
    showType?: "movie" | "tv",
    movie?: IMovie,
    serie?: ITv,
    goToMovie?: (title: string, id: number) => void,
    goToTv?: (name: string, id: number) => void,
    goToActor?: (id: string, name: string) => void,
    actor?: ICredit | IPerson,
    isWhite?: boolean
}

export default function Cards(props: CardProps) {

    const [isPopularPage, setIsPopularPage] = useState<boolean>()

    const { mode } = useMyContext()

    useEffect(() => {
        if (props.actor && "character" in props.actor) setIsPopularPage(false)
        else setIsPopularPage(true)
    }, [])


    return (
        <div className='custom-card mx-auto mt-3'>
            {(props.type === "show" && (props.movie || props.serie)) && (
                <>
                    <Card style={{ borderRadius: "10px" }} onClick={() => props.showType === "movie" ? props.goToMovie!(props.movie!.title, props.movie!.id) : props.goToTv!(props.serie!.name, props.serie!.id)}>
                        <LazyLoadImage
                            effect='blur'
                            className='custom-card-img card-img'
                            src={(props.showType === "movie") ? ("https://image.tmdb.org/t/p/original" + props.movie!.poster_path) : ("https://image.tmdb.org/t/p/original" + props.serie?.poster_path)} />
                    </Card>
                    <Container style={{ display: 'contents' }}>
                        <p className='card-title' style={{ color: (props.isWhite) ? "#fff" : "#333" }} onClick={() => props.showType === "movie" ? props.goToMovie!(props.movie!.title, props.movie!.id) : props.goToTv!(props.serie!.name, props.serie!.id)}>{props.showType === "movie" ? props.movie!.title : props.serie?.name}</p>
                        <Typography color={(props.isWhite ? "faded1" : "faded2")} variant='faded' fontSize="14px">{props.showType === "movie" ? props.movie!.release_date.substring(0, 4) : props.serie?.first_air_date.substring(0, 4)}</Typography>
                    </Container>
                </>
            )}
            {(props.type === "actor" && props.actor) && (
                <>
                    <Card style={{ borderRadius: "10px", minHeight: (isPopularPage ? "250px" : "290px"), backgroundColor: mode ? "#fff" : "#333" }} onClick={() => props.goToActor!(props.actor!.id, props.actor!.name)}>

                        <LazyLoadImage
                            className='custom-card-img' height="213px"
                            effect='blur'
                            src={props.actor!.noImg ? (props.actor!.profile_path) : ("https://image.tmdb.org/t/p/original" + props.actor!.profile_path)}
                        />
                        <Card.Text className='mt-1'>
                            <Container>
                                <Typography className='card-title' lineHeight='10px' variant='subtitle2' color={mode ? "black" : "white"} fontSize={"14px"} wrap='true'>{props.actor!.name}</Typography>
                                <br />
                                {"character" in props.actor! && (
                                    <Typography className='card-title' wrap='true' variant='faded' color={mode ? "faded2" : "faded1"} fontSize="14px">{props.actor!.character}</Typography>

                                )}
                            </Container>
                        </Card.Text>
                    </Card>
                </>
            )}
            {(!props.movie && !props.actor && !props.serie) && (
                <CardLoader />
            )}

        </div>
    )
}
