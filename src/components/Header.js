import { Link } from "react-router-dom";
import Buscador from "./Buscador";

function Header({ favorites }) {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            JdvFlix
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                {" "}
                <Link className="nav-link" to="/">
                  Home
                </Link>{" "}
              </li>
              <li className="nav-item">
                {" "}
                <Link className="nav-link" to="/listado">
                  Listado
                </Link>{" "}
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/favoritos">
                  Favoritos
                </Link>
              </li>
              <li className="nav-item d-flex align-items-center">
                <span className="text-success d-flex ">
                  {favorites.length > 0 && (
                    <>Películas en Favoritos: {favorites.length}</>
                  )}
                </span>
              </li>
            </ul>
          </div>
          <Buscador />
        </div>
      </nav>
    </header>
  );
}

export default Header;
