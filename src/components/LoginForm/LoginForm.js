import './LoginForm.css'
import { observer } from 'mobx-react-lite';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { useContext, useState } from 'react';
import { Context } from '../..';
import { login } from '../../http/userApi';
import { useNavigate } from 'react-router-dom';
import { useForm} from "react-hook-form";

import { ErrorMessage } from '@hookform/error-message';

const LoginForm = observer(() => {
  const { register, handleSubmit, formState: { errors }, } = useForm();
  const {user} = useContext(Context)
  let navigate = useNavigate()

  const initialState = {
    email: '',
    password: '',
    showPassword: false
  }

  const [values, setValues] = useState(initialState)
  const [errMessage, setErrMessage] = useState('')
  const [clicked, setClicked] = useState(false)

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSignIn = async () => {
    try {
      const res = await login(values.email, values.password)
      user.setUser(user)
      user.setIsAuth(true)
      user.setId(res.id)
      navigate(`/account/${user.Id}`, { state: { id: user.Id } })
    } catch (error) {
      setClicked(true)
      setErrMessage(error.response.data.message)
    }
   
  }

  return (
    <div className='loginForm'>
      <div className='loginFormHeader'>
        <Typography
          variant="h5"
          style={{fontWeight: 'bold'}}
        >
          Login
        </Typography>
      </div>
      
      <FormControl style={{width: '20vw'}}>
        <InputLabel>Email</InputLabel>
        <Input
          name="email"
          value={values.email}
          {...register('email', {
            required: 'Requirеd',
          })}
          onChange={handleChange('email')}
        />
        <ErrorMessage
          errors={errors}
          name="email"
          render={({ message }) => <Typography style={{ color: 'red', fontSize: '12px' }}>{message}</Typography>}
        />
      </FormControl>
      <FormControl style={{width: '20vw'}}>
        <InputLabel>Password</InputLabel>
        <Input
          name="password"
          value={values.password}
          {...register('password', {
            required: 'Requirеd',
          })}
          onChange={handleChange('password')}
        />
        <ErrorMessage
          errors={errors}
          name="password"
          render={({ message }) => <Typography style={{ color: 'red', fontSize: '12px' }}>{message}</Typography>}
        />
      </FormControl>
    
      {clicked ? <Typography style={{ color: 'red', fontSize: '12px' }}>{errMessage || "Incorrect email or password"}</Typography>: null}
      
      <FormControl style={{ width: "20vw", fontSize: '5px' }}>
        <Button
          variant="contained"
          onClick={handleSubmit(handleSignIn)}
          style={{
            height: "40px",
            marginTop: "20px",
            marginBottom: "20px",
            color: "white",
            fontSize: "17px",
            textTransform: "none",
            fontWeight: "bold",
            background: "black"
          }}
        >
          Sign In
        </Button>
      </FormControl>
    </div>
  )
})

export default LoginForm