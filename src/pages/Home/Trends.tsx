import React, { useEffect, useRef, useState } from 'react'
import Typography from '../../styles/Typography'
import Cards from '../../components/Cards';
import { IMovie, ITv } from '../../api/interfaces';
import { useNavigate } from 'react-router-dom';
import { setMovieUrl, setTvUrl } from '../../utils/setPathUrl';
import SwitchComponent from '../../components/SwitchComponent';
import { useMyContext } from '../../context/DarkModeContext';
import { useWindowContext } from '../../context/WindowSize';

interface TrendingProps {
    movies?: IMovie[] | undefined,
    series?: ITv[] | undefined,
    handleOnSwitch: () => void
}

export default function Trends(props: TrendingProps) {


    const navigate = useNavigate()

    const { mode } = useMyContext()
    const { mobile } = useWindowContext()

    const scrollRef = useRef<HTMLDivElement>(null)

    const [skeletonArray, setSkeletonArray] = useState<React.ReactNode>()
    const [showLoad, setShowLoad] = useState<boolean>(true)

    useEffect(() => {
        let temp = []
        for (var i = 0; i < 10; i++) temp.push(<Cards key={i} type='actor' />)
        setSkeletonArray(temp)
    }, [])

    useEffect(() => {
        if (!mode) {
            scrollRef.current?.classList.add("dark-mode")
            scrollRef.current?.classList.remove("trends-card-carousel")

        }
        else {
            scrollRef.current?.classList.remove("dark-mode")
            scrollRef.current?.classList.add("trends-card-carousel")
        }
    }, [mode])



    const handleScroll = (event: React.WheelEvent<HTMLDivElement>) => {
        const container = event.currentTarget;
        const scrollAmount = event.deltaY;
        container.scrollTo({
            top: 0,
            left: container.scrollLeft + scrollAmount,
            behavior: 'smooth'
        });
    };

    const goToMovie = (title: string, id: number) => {
        navigate(setMovieUrl(title, id))
    }
    const goToTv = (name: string, id: number) => {
        navigate(setTvUrl(name, id))
    }

    return (
        <div className='trends-container mb-4'>
            <div className='trends-header pt-4 mx-4 pb-3'>
                <Typography className='my-auto' color={!mode ? "white" : "black"} variant='subtitle2' fontSize="18px">
                    Trending {props.movies ? "Movies" : "Tv Shows"}
                </Typography>
                <div className='mt-1'>
                    <SwitchComponent
                        val1='Today'
                        val2='This Week'
                        onSwitch={props.handleOnSwitch}
                    />

                </div>
            </div>
            <div className='trends-card-carousel' ref={scrollRef} onWheel={handleScroll} style={{ backgroundColor: mode ? "rgba(256, 256, 256, 0.90)" : "#333" }}>
                <div className='card-container d-flex' >
                    {(showLoad && props.movies) && props.movies.map((movie, index) => {
                        return (
                            <div className='mx-2' key={index}>
                                <Cards isWhite={mode ? false : true} key={index} movie={movie} type='show' showType='movie' goToMovie={goToMovie} />
                            </div>
                        )
                    })}
                    {(showLoad && props.series) && props.series.map((serie, index) => {
                        return (
                            <div className='mx-2' key={index}>
                                <Cards isWhite={mode ? false : true} key={index} serie={serie} type='show' showType='tv' goToTv={goToTv} />

                            </div>
                        )
                    })}
                    {((!props.series && !props.movies) || !showLoad) && (skeletonArray)}
                </div>

            </div>
        </div>
    )
}
