import Swal from "sweetalert2";
import {useNavigate} from 'react-router-dom'
function Buscador() {

  const navigate = useNavigate();
  const submitHandler = e =>{
    e.preventDefault()
    const keyword = e.currentTarget.keyword.value.trim()
    if(keyword.length === 0){
      Swal.fire('Tienes que escribir una palabra clave')
    }else if(keyword.length < 4){
      Swal.fire('Tienes que escribir 4 ó más caracteres')
    }else{
      e.currentTarget.keyword.value = '';
      navigate(`/resultados?keyword=${keyword}`)
    }
  }
  return(
    <form className="d-flex align-items-center" onSubmit={submitHandler}>
        <label className="form-label mb-0 mx-2">
          <input className="form-control" type="text" name="keyword" placeholder="Escribe una palabra clave..."/>
        </label>
        <button className="btn btn-success" type="submit" >Busca</button>
      </form>
  )
}

export default Buscador;