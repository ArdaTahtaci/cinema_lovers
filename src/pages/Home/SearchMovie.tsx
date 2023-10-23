import React, { useEffect, useRef, useState } from 'react'
import { getRandomImage } from '../../api/movieAPI'
import Typography from '../../styles/Typography'
import { Button, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import HomeHeadingLoader from '../../components/Loaders/HomeHeadingLoader'
import { useMyContext } from '../../context/DarkModeContext'
import { useWindowContext } from '../../context/WindowSize'

export default function SearchMovie() {

    const navigate = useNavigate()


    const { mode } = useMyContext()
    const { mobile } = useWindowContext()

    const [imgUrl, setImgUrl] = useState<string>()
    const [searchQuery, setSearchQuery] = useState<string>("")
    const parentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const getImgUrl = async () => {
            const url = await getRandomImage()
            setImgUrl(url)
        }
        getImgUrl()
    }, [])

    const goToSearchPage = () => {
        navigate("search/" + searchQuery)
    }

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value)
    }

    return (
        <div ref={parentRef}>
            {imgUrl ? (
                <div className='search-area' style={{ backgroundSize: mobile ? "150% 100%" : "100% 150%", backgroundImage: `url(${"https://image.tmdb.org/t/p/original" + imgUrl})`, backgroundColor: mode ? "rgba(34, 34, 34, 1)" : "rgba(156,156,156,0.7)" }}>
                    <Container className='search-container '>
                        <Row className='mb-2' >
                            <Typography variant='caption1' color='white' fontSize="44px">
                                Welcome
                            </Typography>
                        </Row>
                        <Row>
                            <p className='heading-subtitle'  >
                                Millions of movies, TV shows and people to discover. Explore now.
                            </p>
                        </Row>
                        <Row className='search-bar d-flex'>
                            <form onSubmit={goToSearchPage}>
                                <input onChange={handleSearchChange} placeholder='Search for a movie, tv show, person...' type='text' className='mx-auto my-auto ps-3' />
                                <Button className='search-area-button'>
                                    <Typography className='mx-auto' variant='subtitle2' fontSize="16px" color='white'>
                                        Search
                                    </Typography>
                                </Button>
                            </form>

                        </Row>
                    </Container>

                </div>
            ) : (
                <HomeHeadingLoader
                    parentWidth={parentRef.current?.offsetWidth}
                />
            )}
        </div>
    )
}
