import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

function Listado({addOrRemoveFromFavs}) {
  const navigate = useNavigate();



  let token = sessionStorage.getItem("token");

  const [moviesList, setMovieList] = useState([]);

  useEffect(() => {
    const endPoint =
      "https://api.themoviedb.org/3/discover/movie?api_key=19945063ac9fd96f2b581bba14921b0d&language=es-ES&sort_by=popularity.desc&include_adult=false&include_video=false&page=1";
    axios
      .get(endPoint)
      .then((res) => {
        const apiData = res.data;
        setMovieList(apiData.results);
      })
      .catch((err) => Swal.fire("Hubo errores, intenta más tarde"));
  }, [setMovieList]);
  return (
    <>
      {!token && navigate("/")}
      <div className="row">
        {/* estructura base */}
        {moviesList.map((oneMovie, idx) => {
          return (
            <div className="col-3" key={idx}>
              <div className="card my-4">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`}
                  className="card-img-top"
                  alt="..."
                />
                <button 
                className="favourite-btn" 
                onClick={addOrRemoveFromFavs}
                data-movie-id={oneMovie.id}
                >🖤</button>
                <div className="card-body">
                  <h5 className="card-title">
                    {oneMovie.title.substring(0, 30)}
                  </h5>
                  <p className="card-text">
                    {" "}
                    {oneMovie.overview.substring(0, 100)}...{" "}
                  </p>
                  <Link
                    to={`/detalle?movieID=${oneMovie.id}`}
                    className="btn btn-primary"
                  >
                    View detail
                  </Link>
                  <div className="card-footer">
                    Popularity: {oneMovie.popularity}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Listado;
