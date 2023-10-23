import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import "./styles.css"
import SearchMovie from './SearchMovie'
import Trends from './Trends'
import { IMovie, ITv } from '../../api/interfaces'
import { getTrendingMovies } from '../../api/movieAPI'
import { getTrendingSeries } from '../../api/tvAPI'


export default function Home() {


    const [trendingMovies, setTrendingMovies] = useState<IMovie[] | undefined>()
    const [trendingTv, setTrendingTv] = useState<ITv[] | undefined>()

    useEffect(() => {
        fetchMovies(true)
        fetchSeries(true)
    }, [])

    const fetchMovies = async (switchValue?: boolean) => {
        let movies
        if (switchValue)
            movies = await getTrendingMovies("day")
        else
            movies = await getTrendingMovies("week")
        setTrendingMovies(movies)
    }

    const fetchSeries = async (switchValue?: boolean) => {

        let series
        if (switchValue)
            series = await getTrendingSeries("day")
        else
            series = await getTrendingSeries("week")
        setTrendingTv(series)
    }


    return (
        <div className='home-container' style={{ marginRight: "0px" }}>
            <SearchMovie />
            {(trendingMovies && trendingTv) &&
                <div className='pb-4'>
                    <Trends movies={trendingMovies} handleOnSwitch={fetchMovies} />

                    <div className='mx-auto' style={{ marginBottom: "15px", paddingTop: "15px", borderBottom: "1px solid #aaa", width: "80%" }} />
                    <Trends series={trendingTv} handleOnSwitch={fetchSeries} />
                </div>
            }
        </div>
    )
}
