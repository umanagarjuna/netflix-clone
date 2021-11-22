import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import axios from "./axios";
import "./Row.css";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    //We need snippet of code which runs based on a specific condition/variable
    useEffect(() => {

        async function fetchdata() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            console.log(movies);
            return request;
        }

        fetchdata();

    }, [fetchUrl]);
    //if[], run once when the Row loads, and don't run again; if[fetchUrl], dependent on the fetchUrl, it will run everytime fetchUrl changes

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            //https://developer.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };

    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl(''); //if trailerUrl already set, we will set to empty. so trailer will disappear
            console.log(trailerUrl);
        } else {
            movieTrailer(movie?.name || "")
                .then((url) => {
                    //https://www.youtube.com/watch?v=XtMThy8QKqU&t=635s
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get('v'));
                }).catch((error) => console.log(error));
            console.log(trailerUrl);
        }
    }

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row__posters">
                {
                    movies.map(movie => (
                        <img
                            key={movie.id}
                            onClick={() => handleClick(movie)}
                            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                            /**Everything will get a original row__poster class but if its a LargeRow,
                             then it will get an additional row__posterLarge class in css */
                            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                            alt={movie.name}
                        />
                    ))
                }
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
            {/**If I have trailerUrl, then show youtube video*/}
        </div>
        //"movie.poster_path gives "/apbrbWs8M9lyJYU5WXrpFBKL1z.jpg"
    )
}

export default Row;