import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useParams, useSearchParams } from 'react-router-dom'
import { getSearchResults } from '../../api/searchApi'
import { ISearchResults } from '../../api/interfaces'
import Results from './Results'
import Typography from '../../styles/Typography'
import SwitchComponent from '../../components/SwitchComponent'
import { useWindowContext } from '../../context/WindowSize'
import { useMyContext } from '../../context/DarkModeContext'

export default function SearchPage() {

    const { query } = useParams()

    const { mode } = useMyContext()
    const { mobile } = useWindowContext()

    const [results, setResults] = useState<ISearchResults[] | undefined>()
    const [showMedia, setShowMedia] = useState<"movie" | "tv" | "all">("all")

    useEffect(() => {
        fetchSearchResults()
        console.log(results)
    }, [query])


    const fetchSearchResults = async () => {
        const results = await getSearchResults(query)
        setResults(results)
    }

    const changeShowType = (mediaType?: boolean) => {
        if (mediaType) setShowMedia("movie")
        else setShowMedia("tv")
    }

    return (
        <div className='search-page'>
            <Container>
                <div className='search-res-heading my-4 d-flex'>
                    <Typography className='mt-2' color={mode ? "black" : "white"} fontSize={mobile ? "16px" : "22px"} variant='subtitle2'>Search Results:</Typography>
                    <SwitchComponent val1='Movie' val2='Tv Show' onSwitch={changeShowType} styles={{ top: "5px" }} />
                </div>
                {results?.map((res, index) => {
                    let show
                    if (showMedia === "all") show = true
                    else {
                        if (showMedia === res.media_type) show = true
                        else show = false
                    }
                    return ((show) && (
                        <Results key={index} movieResult={res}></Results>
                    ))
                })}
            </Container>
        </div>
    )
}
