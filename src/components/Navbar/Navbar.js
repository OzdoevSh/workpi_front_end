import './Navbar.css'
import { useNavigate } from "react-router-dom";
import { Typography } from '@material-ui/core';
import { useContext } from 'react';
import { Context } from '../..';

const Navbar = () => {
  const { user } = useContext(Context)
  console.log(user)
  let navigate = useNavigate();


  const handleSubmit = (prop) => {
    navigate(prop)
  }

  const logOut = () => {
    user.setUser({})
    user.setIsAuth(false)
    localStorage.clear()
    navigate('/')
  }

  return (

    <div>
      {user.isAuth 
      ? <div className="navbarAuth">
          <div>
            <Typography style={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={logOut}>Sign Out</Typography>
          </div>
        </div> 
      : <div className="navbarNotAuth">
          <div className="mainPageBlock" >
            <Typography style={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={() => handleSubmit('/')}>Main page</Typography>
          </div>
          <div className="auth">
            <Typography style={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={() => handleSubmit('/signup')}>Registration</Typography>
            <Typography style={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={() => handleSubmit('/signin')}>Login</Typography>
          </div>
        </div>}
    </div>

  )
}

export default Navbar;