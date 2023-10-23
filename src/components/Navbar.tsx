import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Container, Dropdown } from 'react-bootstrap'
import { Outlet, useNavigate } from 'react-router-dom'
import Typography from '../styles/Typography'
import "./styles.css"
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle'
import Footer from './Footer'
import DarkModeSwitch from './DarkModeSwitch'
import { useMyContext } from '../context/DarkModeContext'
import { useWindowContext } from '../context/WindowSize'
import useWindowSize from '../utils/useWindowSize'

export default function Navbar() {

    const navigate = useNavigate()

    const { mode, setMode } = useMyContext()
    const { mobile, mid } = useWindowContext()

    const ref1 = useRef<HTMLDivElement>(null)
    const ref2 = useRef<HTMLDivElement>(null)


    const [showDropdown, setShowDropdown] = useState<string>("")
    const [searchQuery, setSearchQuery] = useState<string>("")
    const [showSearch, setShowSearch] = useState<boolean>(false)
    const [isLight, setIsLight] = useState<boolean>(false)
    const [outletLoaded, setOutletLoaded] = useState(false)
    const [firstRender, setFirstRender] = useState(false)
    const [width, setWidth] = useState<number>(1300)

    const size = useWindowSize()

    useEffect(() => {

        setTimeout(() => {
            setOutletLoaded(true)
            setFirstRender(true)
        }, 2000);
        if (ref1.current && ref2.current) {
            const s1 = ref1.current!.style
            const s2 = ref2.current!.style
            s1.display = "flex"
            s2.display = "flex"
        }
        setWidth(size[0])

    }, [])

    useEffect(() => {
        setWidth(size[0])
    }, [size])

    useEffect(() => {
        setMode(isLight)
    }, [isLight])

    useEffect(() => {
        if (ref1.current && ref2.current) {
            const s1 = ref1.current!
            const s2 = ref2.current!
            if (mid || mobile) {

                s1.style.display = "block"
                s2.style.display = "block"
            }
            else {
                s1.style.display = "flex"
                s2.style.display = "flex"
            }
        }

    }, [mid, mobile])

    const handleMouseEnter = (eventKey: string) => {
        setShowDropdown(eventKey)
    }

    const handleMouseOut = () => {
        setShowDropdown("")
    }

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value)
    }

    const goToSearchPage = () => {
        setShowSearch(false)
        navigate("search/" + searchQuery)
    }

    const handleSwitch = () => {
        if (firstRender) {
            setIsLight(!isLight)
        }
    }

    return (
        <div>
            <div className='navbar navbar-expand-lg' style={{ backgroundColor: mode ? "#222" : "#000" }}>
                <div className='container-fluid' style={{ marginRight: (mid || mobile) ? "4%" : "16%", marginLeft: (mid || mobile) ? "4%" : "16%", width: "100%" }}>
                    <Col lg={width > 1250 ? 3 : 4} md={4} sm={3}>
                        <div onClick={() => navigate("/")}>
                            <Typography className='me-3 logo' variant='caption1' color='white'>Cinema Lovers</Typography>
                        </div>
                    </Col>
                    <button className="navbar-toggler" type="button" style={{ backgroundColor: "#555" }} data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <Col lg={width > 1250 ? 6 : 5} md={4} sm={7} ref={ref1} onMouseLeave={handleMouseOut}>

                            <Dropdown className='my-3 mx-3' show={showDropdown === "movie"}>
                                <DropdownToggle as={"span"} onMouseEnter={() => handleMouseEnter("movie")} >
                                    <Typography variant='subtitle2' color="white" fontWeight={600} fontSize='15px'>
                                        Movies
                                    </Typography>
                                </DropdownToggle>

                                <Dropdown.Menu onMouseLeave={handleMouseOut}>
                                    <Dropdown.Item href="/movie/popular">Popular</Dropdown.Item>
                                    <Dropdown.Item href="/movie/now-playing">Now Playing</Dropdown.Item>
                                    <Dropdown.Item href="/movie/upcoming">Upcoming</Dropdown.Item>
                                    <Dropdown.Item href="/movie/top-rated">Top Rated</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                            <Dropdown className='my-3 mx-3' show={showDropdown === "tvShow"}>
                                <DropdownToggle as={"span"} onMouseEnter={() => handleMouseEnter("tvShow")} >
                                    <Typography variant='subtitle2' color="white" fontWeight={600} fontSize='15px'>
                                        TV Shows
                                    </Typography>
                                </DropdownToggle>

                                <Dropdown.Menu onMouseLeave={handleMouseOut}>
                                    <Dropdown.Item href="/tv/popular">Popular</Dropdown.Item>
                                    <Dropdown.Item href="/tv/top-rated">Top Rated</Dropdown.Item>
                                    <Dropdown.Item href="/tv/airing-today">Airing Today</Dropdown.Item>
                                    <Dropdown.Item href="/tv/on-the-air">On The Air</Dropdown.Item>


                                </Dropdown.Menu>
                            </Dropdown>

                            <Dropdown className='my-3 mx-3' show={showDropdown === "people"}>
                                <DropdownToggle as={"span"} onMouseEnter={() => handleMouseEnter("people")}>
                                    <Typography variant='subtitle2' color="white" fontWeight={600} fontSize='15px'>
                                        People
                                    </Typography>
                                </DropdownToggle>

                                <Dropdown.Menu onMouseLeave={handleMouseOut}>
                                    <Dropdown.Item href="/person">Popular People</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                        </Col>
                        <Col lg={4} md={1} sm={1} className='col-sm-1' style={{ position: "relative" }}>
                            <div className="my-search-button" ref={ref2}>
                                <div className='ms-3 my-3' style={{ width: "100%" }}>
                                    <DarkModeSwitch
                                        onSwitch={handleSwitch}
                                        styles={{ top: "auto", bottom: "auto", left: "0px", width: "80px", borderRadius: "15px" }}
                                        isLight={isLight}
                                        setIsLight={setIsLight}
                                    />
                                </div>
                                <div className='my-3 ms-3 me-auto' style={{ width: "40px" }}>
                                    <i onClick={() => setShowSearch(!showSearch)} className="fa-solid fa-magnifying-glass fa-fade fa-lg icon my-auto"></i>

                                </div>
                            </div>
                        </Col>

                    </div>

                </div>
            </div>
            {showSearch && (
                <div className='search-input-container'>
                    <Container className='search-input-container pt-2 d-flex'>
                        <i className="fa-solid fa-magnifying-glass fa-flip fa-lg pt-3 me-2"></i>
                        <form className='d-flex' style={{ width: "95%" }} onSubmit={goToSearchPage}>
                            <input className='search-input' placeholder='Search for a movie, tv show, person...' onChange={handleSearchChange} />
                            <Button className='search-button' onClick={goToSearchPage}>
                                <Typography className='mx-auto' variant='subtitle2' fontSize="14px" color='white'>
                                    Search
                                </Typography>
                            </Button>
                        </form>
                    </Container>
                </div>
            )}

            <div style={{ alignContent: "center", position: "relative", justifyContent: "center" }}>
                <Outlet />

            </div>
            {outletLoaded && <Footer />}


        </div>
    )
}
