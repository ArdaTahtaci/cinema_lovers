export interface IMovie {
    adult: boolean,
    id: number,
    title: string,
    original_language: string,
    original_title: string,
    poster_path: string
    backdrop_path: string
    release_date: string
}

export interface IMovieDetails {
    backdrop_path: string,
    title: string,
    budget: number,
    genres: [{
        id: number,
        name: string
    }],
    homepage: string,
    status: string,
    original_language: string,
    spoken_languages: [{
        name: string,
        english_name: string
    }]
    id: number,
    overview: string,
    poster_path: string,
    release_date: string,
    revenue: number,
    runtime: number,
    tagline: string,
    vote_average: number,
    voto_count: number
}

export interface IMovieTrailer {
    name: string
    key: string,
    size: number,
    type: string,
    id: string
}

export interface ITvTrailer {
    name: string
    key: string,
    size: number,
    type: string,
    id: string
}



export interface IMovieKeywords {
    id: number,
    keywords: [{
        id: number,
        name: string
    }]
}
export interface ITvKeywords {
    id: number,
    keywords: [{
        id: number,
        name: string
    }]
}

export interface IPersonDetail {
    name: string,
    biography: string,
    birthday: string,
    gender: number,
    known_for_department: string,
    profile_path: string,
    place_of_birth: string
}

export interface ISearchResults {
    backdrop_path: string,
    title: string,
    name: string,
    overview: string,
    poster_path: string,
    release_date: string
    media_type: "movie" | "tv",
    id: string,
}

export interface IReview {
    author: string,
    author_details: {
        name: string,
        username: string,
        avatar_path: string,
        ratng: string,
    }
    content: string,
    created_at: String,
}

export interface ITv {
    adult: boolean,
    id: number,
    name: string,
    original_language: string,
    original_title: string,
    poster_path: string
    backdrop_path: string
    first_air_date: string
}

export interface ITvDetails {
    backdrop_path: string,
    name: string,
    genres: [{
        id: number,
        name: string
    }],
    homepage: string,
    status: string,
    original_language: string,
    spoken_languages: [{
        name: string,
        english_name: string
    }]
    id: number,
    overview: string,
    poster_path: string,
    first_air_date: string,
    last_air_date: string,
    created_by: [
        {
            id: number,
            name: string,
            gender: number,
            profile_path: string
        }
    ],
    episode_run_time: [
        number
    ],
    number_of_episodes: number,
    number_of_seasons: number,
    seasons: [ITvSeason],
    vote_average: number,
    voto_count: number,
    tagline: string,
}

export interface ITvSeason {
    air_date: string,
    episode_count: number,
    id: number,
    name: string,
    overview: string,
    poster_path: string,
    season_number: number
}

export interface ITvSeasonDetails {
    episodes: [ITvEpisode],
    air_date: string,
    season_number: number,
    vote_average: number,
    name: string

}

export interface ITvEpisode {
    air_date: string,
    episode_number: number,
    id: number,
    name: string,
    overview: string,
    still_path: string,
    runtime: number
}

export interface IPopularMovies {
    results: IMovie[],
    total_pages: number
}

export interface IPopularTvs {
    results: ITv[],
    total_pages: number
}

export interface IPerson {
    id: string,
    profile_path: string,
    noImg?: boolean,
    name: string,
}

export interface ICredit {
    name: string,
    profile_path: string,
    character: string,
    id: string,
    noImg?: boolean
}



