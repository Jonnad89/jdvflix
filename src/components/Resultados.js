import { useEffect, useState } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
function Resultados() {
  let query = new URLSearchParams(window.location.search);

  let keyword = query.get("keyword");

  const [moviesResults, setMoviesResults] = useState([]);


  useEffect(()=>{
    const endPoint = `https://api.themoviedb.org/3/search/movie?api_key=19945063ac9fd96f2b581bba14921b0d&language=es-ES&query=${keyword}`;
    axios
      .get(endPoint).then(res => {
        const moviesArray = res.data.results;

        if(moviesArray === 0){
          Swal.fire('Tu búsqueda no arrojó resultados')
        }
        setMoviesResults(moviesArray)
      })
      .catch((err) => console.log(err));
  },[keyword])

  return (
    <>
      <h2>Buscaste: <em>{keyword}</em> </h2>
   {moviesResults.length === 0 && <h3>No hay resultados</h3>}
      <div className="row">
        {moviesResults.map((oneMovie, idx) => {
          return ( 
            <div className="col-4" key={idx}>
              <div className="card my-4">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`}
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">{oneMovie.title.substring(0,30)}</h5>
                  <Link to={`/detalle?movieID=${oneMovie.id}`} className="btn btn-primary">
                    View detail
                  </Link> 
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Resultados;
