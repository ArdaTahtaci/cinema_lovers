import React, { useEffect, useState } from 'react'
import Typography from '../../styles/Typography'
import { Container } from 'react-bootstrap'
import { IMovieDetails, IMovieKeywords, ITvDetails, ITvKeywords } from '../../api/interfaces'
import { parseMoney } from '../../utils/parse'
import Keyword from '../../components/Keyword'
import { getMovieKeywords } from '../../api/movieAPI'
import { useParams } from 'react-router-dom'
import { getTvKeywords } from '../../api/tvAPI'
import { useMyContext } from '../../context/DarkModeContext'

interface InfoProps {
    movie?: IMovieDetails
    serie?: ITvDetails
}

export default function InfoSection(props: InfoProps) {

    const { id } = useParams()

    const { mode } = useMyContext()

    const [keywords, setKeywords] = useState<IMovieKeywords | ITvKeywords | undefined>(undefined)

    useEffect(() => {
        fetchKeywords()
    }, [])

    const fetchKeywords = async () => {
        let keywords

        if (props.movie) keywords = await getMovieKeywords(id!)
        else await getTvKeywords(id!)

        setKeywords(keywords)
    }

    return (
        <div className='info-container my-4'>
            <Container>
                <div className='links' >
                    <Typography className='link' color={!mode ? "white" : "black"} title='Visit Homepage' variant='subtitle1'><i className="fa-solid fa-link"></i></Typography>
                </div>
                <div className='my-3'>
                    <Typography color={!mode ? "white" : "black"} variant='subtitle2' fontWeight={500}>Status</Typography>
                    <Typography color={!mode ? "white" : "black"} variant='text'>{props.movie ? props.movie.status : props.serie?.status}</Typography>
                </div>
                <div className='my-3'>
                    <Typography color={!mode ? "white" : "black"} variant='subtitle2' fontWeight={500}>Original Language</Typography>
                    <Typography color={!mode ? "white" : "black"} variant='text'>{props.movie ? props.movie.spoken_languages[0].english_name : props.serie?.spoken_languages[0].english_name}</Typography>
                </div>
                {props.movie && (
                    <>
                        <div className='my-3'>
                            <Typography color={!mode ? "white" : "black"} variant='subtitle2' fontWeight={500}>Budget</Typography>
                            <Typography color={!mode ? "white" : "black"} variant='text'>{parseMoney(props.movie.budget)}</Typography>
                        </div>
                        <div className='my-3'>
                            <Typography color={!mode ? "white" : "black"} variant='subtitle2' fontWeight={500}>Revenue</Typography>
                            <Typography color={!mode ? "white" : "black"} variant='text'>{parseMoney(props.movie.revenue)}</Typography>
                        </div>
                    </>

                )}

                <div className='keywords my-4 pb-3'>
                    <Typography className='mb-2' color={!mode ? "white" : "black"} variant='subtitle2'>Keywords</Typography>
                    {keywords ? (keywords.keywords.map((keyword, index) => {
                        return (
                            <Keyword key={index} keywordId={keyword.id}>{keyword.name}</Keyword>
                        )
                    })
                    ) : (
                        <Typography color={mode ? "black" : "white"} variant='text'>No keyword has been added.</Typography>
                    )}
                </div>
            </Container>

        </div>
    )
}
