import React, {useState, useEffect} from 'react';
import axios from './axios';

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({title, fetchUrl}) {
    const [movies, setMovies] = useState([]);

    //We need snippet of code which runs based on a specific condition/variable
    useEffect(()=>{

        async function fetchdata(){
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            console.log(movies);
            return request;
        }

        fetchdata();

        }, [fetchUrl]); 
    //if[], run once when the Row loads, and don't run again; if[fetchUrl], dependent on the fetchUrl, it will run everytime fetchUrl changes

    return (
        <div className="row">
            <h2>{title}</h2>    
            <div className="row__posters"> 
                {
                movies.map(movie => (
                    <img src={`${base_url}${movie.poster_path}`} alt={movie.name}/>
                    ))
                }      
            </div>
        </div>
        //"movie.poster_path gives "/apbrbWs8M9lyJYU5WXrpFBKL1z.jpg"
    )
}

export default Row;