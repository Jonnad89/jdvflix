import axios from "axios";
import Swal from "sweetalert2";
import {  useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const regexEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email === "" || password === "") {
      Swal.fire("Los campos no pueden estar vacios");

      return;
    }
    if (email !== "" && !regexEmail.test(email)) {
      Swal.fire("Debes escribir una dirección de correo electrónico válida");
      return;
    }

    if (email !== "challenge@alkemy.org" || password !== "react") {
      Swal.fire("Credenciales inválidas");
      return;
    }
    axios
      .post("http://challenge-react.alkemy.org", { email, password })
      .then((res) => {
        Swal.fire("Ok, ingresaste correctamente", "veamos que pasa", "success");
        // console.log(res.data);
        const tokenRecibido = res.data.token;
        sessionStorage.setItem("token", tokenRecibido);
        navigate('/listado')
      });
  };
  let token = sessionStorage.getItem('token');

  return (
    <>
    { token && navigate('/listado')}
    <div className="row">
      <div className="col-6 offset-3">
      <h2>Formulario de Login</h2>
      <form onSubmit={submitHandler} >
        <label className="form-label d-block mt-2">
          <span>Correo Electónico:</span> <br />
          <input className="form-control" type="email" name="email" />
        </label>
        <br />
        <label className="form-label d-block mt-2">
          <span>Contraseña:</span> <br />
          <input className="form-control" type="password" name="password" />
        </label>
        <br />
        <button className="btn btn-success mt-2" type="submit" >Ingresar</button>
      </form>
      </div>
    </div>
    </>
  );
}

export default Login;
