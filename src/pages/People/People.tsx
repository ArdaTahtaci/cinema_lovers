import React, { useEffect, useRef, useState } from 'react'
import "./styles.css"
import { useNavigate, useParams } from 'react-router-dom'
import { getPerson, getPersonsMovies } from '../../api/peopleAPI'
import { IMovie, IPersonDetail } from '../../api/interfaces'
import Typography from '../../styles/Typography'
import { parseDate } from '../../utils/parse'
import Cards from '../../components/Cards'
import { setMovieUrl } from '../../utils/setPathUrl'
import PersonImgLoader from '../../components/Loaders/PersonImgLoader'
import PersonInfoLoader from '../../components/Loaders/PersonInfoLoader'
import { useMyContext } from '../../context/DarkModeContext'
import { useWindowContext } from '../../context/WindowSize'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css';


export default function People() {

    const { id } = useParams()
    const navigate = useNavigate()

    const { mode } = useMyContext()
    const { mid, mobile } = useWindowContext()

    const imgContainerRef = useRef<HTMLDivElement>(null)
    const infoContainerRef = useRef<HTMLDivElement>(null)

    const [person, setPerson] = useState<IPersonDetail | undefined>(undefined)
    const [movies, setMovies] = useState<IMovie[] | undefined>(undefined)
    const [showText, setShowText] = useState<boolean>(false)

    const [imgContainerWidth, setImageContainerWidth] = useState<number>()
    const [personInfoWidth, setPersonInfOWidth] = useState<number>()

    useEffect(() => {
        setImageContainerWidth(imgContainerRef.current?.offsetWidth)
    }, [imgContainerRef.current?.offsetWidth])

    useEffect(() => {
        setPersonInfOWidth(infoContainerRef.current?.offsetWidth)
    }, [infoContainerRef.current?.offsetWidth])

    useEffect(() => {
        fetchPerson()
        fetchMovies()
    }, [])

    const fetchMovies = async () => {
        const movies = await getPersonsMovies(id!)

        setMovies(movies)
    }
    const fetchPerson = async () => {
        const person = await getPerson(id!)
        setPerson(person!)
    }

    const expandText = () => {
        setShowText(true)
    }

    const goToMovie = (title: string, id: number) => {
        navigate(setMovieUrl(title, id))
    }

    return (
        <div className='my-4 px-0' style={{ display: (mobile) ? "" : "flex", marginRight: (mid || mobile) ? "4%" : "16%", marginLeft: (mid || mobile) ? "4%" : "16%" }}>
            <div className='mx-auto' style={{ width: mobile ? "50%" : "30%" }} ref={imgContainerRef}>
                {person ? (
                    <div style={{ backgroundColor: mode ? "#fff" : "#111" }}>
                        {mobile ? (<div className='mx-auto'>
                            <LazyLoadImage
                                className='person-img mx-auto my-4'
                                effect='blur'
                                src={'https://image.tmdb.org/t/p/original/' + person?.profile_path}
                                width="100%"
                            />
                            <Typography className='mb-4' color={mode ? "black" : "white"} variant='caption1' fontSize="32px">{person?.name}</Typography>

                        </div>) : (<div>
                            <img className='person-img mx-auto my-4' width="100%" src={'https://image.tmdb.org/t/p/original/' + person?.profile_path} />

                        </div>)}
                        <Typography color={mode ? "black" : "white"} variant='subtitle1' fontWeight={500}>Personal Info</Typography>
                        <Typography color={mode ? "black" : "white"} className='mt-3' variant='subtitle2'>Known For</Typography>
                        <Typography color={mode ? "black" : "white"} variant='text'>{person?.known_for_department}</Typography>
                        <Typography color={mode ? "black" : "white"} className='mt-3' variant='subtitle2'>Gender</Typography>
                        <Typography color={mode ? "black" : "white"} variant='text'>{person?.gender === 2 && "Male"}{person?.gender === 1 && "Female"}{person?.gender === 3 && "Non-binary"}</Typography>
                        <Typography color={mode ? "black" : "white"} className='mt-3' variant='subtitle2'>Birthday</Typography>
                        <Typography color={mode ? "black" : "white"} variant='text'>{parseDate(person?.birthday)}</Typography>
                        <Typography color={mode ? "black" : "white"} className='mt-3' variant='subtitle2'>Place Of Birth</Typography>
                        <Typography color={mode ? "black" : "white"} variant='text'>{person?.place_of_birth}</Typography>
                    </div>
                ) : (<PersonImgLoader width={imgContainerWidth} />)}

            </div>
            <div className='detail-col mb-4 mx-auto' style={{ width: mobile ? "100%" : "70%", paddingLeft: mobile ? "0" : "40px" }} ref={infoContainerRef}>
                {(!mobile) && <Typography className='mb-4' color={mode ? "black" : "white"} variant='caption1' fontSize="32px">{person?.name}</Typography>}
                <Typography className='mt-4' color={mode ? "black" : "white"} variant='caption2' fontWeight={500}>Biography</Typography>
                {person ? (
                    <>
                        <p className='my-1' style={{ color: mode ? "black" : "white", maxHeight: showText ? "fit-content" : "16ch" }}>{person?.biography}</p>
                        <div style={{ display: showText ? "none" : "" }} onClick={expandText}>
                            <Typography className='expand ms-auto' color='blue' variant='text'>Read More...</Typography>
                        </div>
                    </>
                ) : (<PersonInfoLoader width={personInfoWidth} />)}


                <div className='my-4'>
                    <Typography className='mt-4 mb-3' color={mode ? "black" : "white"} variant='subtitle2'>Known For</Typography>
                    <div className='movie-carousel d-flex' style={{ backgroundColor: mode ? "rgba(51,51,51,0.5)" : "#666" }}>
                        {movies && movies.map((movie, index) => {
                            return (
                                <div key={index} className='mx-2'>
                                    <Cards goToMovie={goToMovie} isWhite movie={movie} type='show' showType='movie' />
                                </div>
                            )
                        })}
                    </div>

                </div>
            </div>
        </div>
    )
}
