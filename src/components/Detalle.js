import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Detalle() {
  const token = sessionStorage.getItem("token");

  let query = new URLSearchParams(window.location.search);

  let movieID = query.get("movieID");

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const endPoint = `https://api.themoviedb.org/3/movie/${movieID}?api_key=19945063ac9fd96f2b581bba14921b0d&language=es-ES`;
    axios
      .get(endPoint)
      .then((res) => {
        const movieData = res.data;
        setMovie(movieData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [movieID]);

  return (
    <>
      {!token && <Link to="/" />}
      {!movie && <p>Cargando...</p>}
      {movie && (
        <>
          <h2>Titulo:{movie.title}</h2>
          <div className="wor">
            <div className="col-4">
            <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  className="img-fluid"
                  alt="movie poster"
                />
              </div>
            <div className="col-8">
              <h5>Fecha de estreno: {movie.release_date}</h5>
              <h5>Rating: {movie.vote_average}</h5>
              <h5>Generos:</h5>
              <h5>reseña:</h5>
              <p>{movie.overview}</p>
              <ul>
               {movie.genres.map(oneGenre => <li key={oneGenre.id}>{oneGenre.name}</li>)}
            
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Detalle;
