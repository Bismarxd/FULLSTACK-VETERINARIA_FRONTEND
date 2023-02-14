import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";
import backgroundImage from '../../public/perrito.jpg'


const Login = () => {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [alerta, setAlerta] = useState({});

  const {setAuth} = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes('')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      });
      return;
    }

    try {
      const {data} =await clienteAxios.post('/veterinarios/login', {email, password});
     
      localStorage.setItem('token', data.token);
      
      setAuth(data);
      navigate('/admin');
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      });
    }
  };

  const styles = {

    container: {
      display: 'flex',
      alignItems: 'flex-end',
      height: '100vh',
    },

    backgroundImage: {
      backgroundImage: `url(${backgroundImage})`,
      height: '30vh',
      width: '30vh',
      
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPositionX: 'center',
      transform: 'translate(50%, 10%)',
      
      borderRadius: '25%',
      
     

    },
  };

 

  const {msg} = alerta
  

  return (
    <>
        <div >
          <div >
            
            <img src="" alt="" />
            <h1 className="text-teal-500 font-black text-5xl">Inicia Sesión y Administra tus <span className="text-teal-700 text-6xl">Pacientes</span></h1>
            <h2 className="font-bold uppercase text-teal-900 text-7xl my-5">VETERINARIA KUKA</h2>
            <img src={backgroundImage} alt="Image" style={styles.backgroundImage} />
          </div>
        </div>
        
          

          <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">

            {
              msg && <Alerta
              alerta = {alerta}
            />}

            <form onSubmit={handleSubmit}>

              <div className="my-5">
                <label className="uppercase text-gray-600 block text-xl font-bold">
                  Email
                </label>

                <input 
                  type="email" 
                  placeholder="Email de Registro"
                  className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="uppercase text-gray-600 block text-xl font-bold">
                  Password
                </label>

                <input 
                  type="password" 
                  placeholder="Tu Password"
                  className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>

              <input 
                type="submit" 
                value="Iniciar Sesión"
                className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
              />
              

            </form>

            <nav className="mt-10 lg:flex lg:justify-between ">
              <Link 
                className="block text-center my-5  text-gray-500"
                to="/registrar">¿No tienes una cuenta? Regístrate</Link>

              <Link 
                className="block text-center my-5  text-gray-500"
                to="/olvide-password">Olvide mi Password</Link>
            </nav>
          </div>

          
        
    </>
  )
}

export default Login;