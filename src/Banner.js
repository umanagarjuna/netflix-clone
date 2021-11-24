import React, { useState, useEffect } from 'react';
import axios from './axios';
import requests from './requests';
import "./Banner.css";

const base_url = "https://image.tmdb.org/t/p/original/";

function Banner() {
    const [movie, setMovie] = useState([]);
    /**Everytime random movie gets selected for Banner page. 
    to do this get Movies from NetFlix originals, in that movie array we need to select randomly one movie.
    assign to setMovie function.*/

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals);
            setMovie(
                request.data.results[Math.floor(Math.random() * request.data.results.length - 1)]
            );
            return request;
        }
        fetchData();
    }, []);

    console.log(movie);

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    /** 
       1. Background Image
       2. title
       3. div > 2 buttons
       4. description
    */
    return (
        <header className="banner" style={{
            backgroundSize: "cover",
            backgroundImage: `url("${base_url}/${movie?.backdrop_path}")`,
            backgroundPosition: "center center",
        }}
        >

            <div className="banner__contents">
                <h1 className="banner__title">
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>
                <div clasName="banner__buttons">
                    <button className="banner__button">Play</button>
                    <button className="banner__button">My List</button>
                </div>
                <h1 className="banner__description">{truncate(movie?.overview, 150)}</h1>
                {/**<div className="banner--fadeBottom"></div>*/}
            </div>

        </header>
    )
}

export default Banner
