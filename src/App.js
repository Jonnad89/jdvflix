//Libraries
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
//components
import Login from "./components/Login";
import Listado from "./components/Listado";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Detalle from './components/Detalle'
import Resultados from "./components/Resultados";
import Favoritos from "./components/Favoritos";

//styles
import './css/app.css'
import "./css/bootstrap.min.css";

function App() {

  const [favorites, setFavorites] = useState ([])

  useEffect(()=>{

    const favsInLocal = localStorage.getItem('favs')

    if(favsInLocal !== null){
        const favsArray = JSON.parse(favsInLocal)
        setFavorites(favsArray)
    }
  },[])




  const favMovies = localStorage.getItem('favs')

  let tempMoviesInFavs;

  if(favMovies === null){
      tempMoviesInFavs= []
  }else{
    tempMoviesInFavs = JSON.parse(favMovies)
  }

  console.log(tempMoviesInFavs)

  const addOrRemoveFromFavs = e =>{
    const btn = e.currentTarget;
    const parent = btn.parentElement;
    const imgURL = parent.querySelector('img').getAttribute('src')
    const title = parent.querySelector('h5').innerText
    const overview = parent.querySelector('p').innerText
    
    const movieData = {
      imgURL, title, overview,
       id:btn.dataset['movieId']
    }
    let movieIsInTheArray = tempMoviesInFavs.find(oneMovie =>{
      return oneMovie.id === movieData.id
    })
    if(!movieIsInTheArray){
      tempMoviesInFavs.push(movieData);
      localStorage.setItem('favs', JSON.stringify(tempMoviesInFavs))
      setFavorites(tempMoviesInFavs)
      console.log('Se agregó la película')
    }else {
     let moviesLeft = tempMoviesInFavs.filter(oneMovie =>{
      return oneMovie.id !== movieData.id
     })    
     localStorage.setItem('favs', JSON.stringify(moviesLeft))
     setFavorites(moviesLeft)
     console.log('Se eliminó')
    }    
  }
  return (
    <>
      <Header favorites={favorites}/>

      <div className="container mt-3">
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/listado" element={<Listado addOrRemoveFromFavs={addOrRemoveFromFavs}/>} />
          <Route path="/detalle" element={<Detalle />} />
          <Route path="/resultados" element={<Resultados />} />
          <Route path="/favoritos" element={<Favoritos addOrRemoveFromFavs={addOrRemoveFromFavs} favorites={favorites}/>} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
