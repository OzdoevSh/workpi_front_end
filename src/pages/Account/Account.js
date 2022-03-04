import './Account.css'
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserData, isAuth } from "../../http/userApi";
import EmailIcon from '@mui/icons-material/Email';

const Account = () => {


  const [userData, setUserData] = useState('')
  const { id } = useParams()

  useEffect(() => {
    async function fetchData() {
      const res = await isAuth()
      if (id == res.id) {
        const data = await getUserData(res.id)
        setUserData(data)
      }
    }
   fetchData()

  }, [id])



  return (
    userData.id 
    ? <div className="accountContainer">
        <Typography variant="h1">Your Account</Typography>
        <Typography variant="h3">{userData.first_name} {userData.last_name}</Typography>
        <div className="emailBlock"><EmailIcon /><Typography>{userData.email}</Typography></div>
      </div> 
    : <Typography variant="h1">This page does not exist... for you :)</Typography>

  )
}

export default Account;