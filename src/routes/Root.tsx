import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from '../pages/Home/HomePage';
import Navbar from '../components/Navbar';
import SearchPage from '../pages/Search/SearchPage';
import Movie from '../pages/Shows/Movie';
import Movies from "../pages/Filter_Show/Movies"
import Tvs from "../pages/Filter_Show/Tvs"
import People from '../pages/People/People';
import Tv from '../pages/Shows/Tv';
import PopularPeople from '../pages/Filter_Show/People';
import { useWindowContext } from '../context/WindowSize';
import { useMyContext } from '../context/DarkModeContext';


export default function Root() {

    const { mobile, mid } = useWindowContext()
    const { mode } = useMyContext()

    return (
        <div style={{ backgroundColor: mode ? "#fff" : "#111" }}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navbar />}>
                        <Route path='' element={
                            <div style={{ marginRight: (mid || mobile) ? "0" : "16%", marginLeft: (mid || mobile) ? "0" : "16%" }}>
                                <Home />
                            </div>
                        } />
                        <Route path='search' element={<SearchPage />} />
                        <Route path='/person' element={<PopularPeople />} />
                        <Route path='/person/:id/:name' element={<People />} />
                        <Route path='/movie'>
                            <Route path='popular' element={<Movies />} />
                            <Route path='now-playing' element={<Movies />} />
                            <Route path='upcoming' element={<Movies />} />
                            <Route path='top-rated' element={<Movies />} />
                            <Route path=':id/:title' element={<Movie />} />
                        </Route>
                        <Route path='/tv'>
                            <Route path='popular' element={<Tvs />} />
                            <Route path='on-the-air' element={<Tvs />} />
                            <Route path='top-rated' element={<Tvs />} />
                            <Route path='airing-today' element={<Tvs />} />
                            <Route path='/tv/:id/:title' element={<Tv />} />
                        </Route>

                        <Route path='search/:query' element={<SearchPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}
