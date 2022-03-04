import './RegistrationForm.css'
import { observer } from 'mobx-react-lite';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { useContext, useState } from 'react';
import { Context } from '../..';

import { registration } from '../../http/userApi';
import { useNavigate } from 'react-router-dom';

import { useForm} from "react-hook-form";

import { ErrorMessage } from '@hookform/error-message';

const RegistrationForm = observer(() => {
  const { register, handleSubmit, formState: { errors }, } = useForm();
  const {user} = useContext(Context)
  let navigate = useNavigate()

  const initialState = {
    email: '',
    password: '',
    confirmed_password: '',
    first_name: '',
    last_name: '',
    showPassword: false
  }

  const [values, setValues] = useState(initialState)
  const [errMessage, setErrMessage] = useState('')
  const [clicked, setClicked] = useState(false)

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSignUp = async () => {
    try {
      const res = await registration(values.email, values.password, values.first_name, values.last_name)
      user.setUser(user)
      user.setIsAuth(true)
      user.setId(res.id)
      navigate(`/account/${user.Id}`, { state: { id: user.Id } })
    } catch (error) {
      setClicked(true)
      setErrMessage(error.response.data.message)
    }
    
  }

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  return (
    <div className='regForm'>
      <div className='regFormHeader'>
        <Typography
          variant="h4"
          style={{fontWeight: 'bold'}}
        >
          Registration
        </Typography>
      </div>
      
      <FormControl style={{width: '60%'}}>
        <InputLabel>Enter your email</InputLabel>
        <Input
          name="email"
          value={values.email}
          {...register('email', {
            required: 'Requirеd',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Incorrect email"
            },

          })}
          onChange={handleChange('email')}
        />
        <ErrorMessage
          errors={errors}
          name="email"
          render={({ message }) => <Typography style={{ color: 'red', fontSize: '12px' }}>{message}</Typography>}
        />
        {clicked ?<Typography style={{ color: 'red', fontSize: '12px' }}>{errMessage || "User with entered email already exists"}</Typography>: null}
      </FormControl>
      
      <FormControl style={{width: '60%'}}>
        <InputLabel>Create password</InputLabel>
        <Input
          type={values.showPassword ? 'text' : 'password'}
          name="password"
          value={values.password}
          {...register('password', {
            required: 'Required',
            minLength: {
              value: 8,
              message: "Too short (minimum 8 symbols)"
            },
          })}
          onChange={handleChange('password')}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
              >
                {values.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        <ErrorMessage
          errors={errors}
          name="password"
          render={({ message }) => <Typography style={{ color: 'red', fontSize: '12px' }}>{message}</Typography>}
        />
      </FormControl>
      <FormControl style={{width: '60%'}}>
        <InputLabel>Confirm password</InputLabel>
        <Input
          type={values.showPassword ? 'text' : 'password'}
          name="confirmed_password"
          value={values.confirmedPassword}
          {...register('confirmed_password', {
            required: 'Required',
            minLength: {
              value: 8,
              message: "Too short (minimum 8 symbols)"
            },
            validate: value => value === values.password || 'The password does not match the one entered above'
          })}
          onChange={handleChange('confirmed_password')}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
              >
                {values.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        <ErrorMessage
          errors={errors}
          name="confirmed_password"
          render={({ message }) => <Typography style={{ color: 'red', fontSize: '12px' }}>{message}</Typography>}
        />
      </FormControl>
      <FormControl style={{width: '60%'}}>
        <InputLabel>Enter your first name</InputLabel>
        <Input
          name="first_name"
          value={values.first_name}
          {...register('first_name', {
            required: 'Required',
          })}
          onChange={handleChange('first_name')}
          
        />
        <ErrorMessage
          errors={errors}
          name="first_name"
          render={({ message }) => <Typography style={{ color: 'red', fontSize: '12px' }}>{message}</Typography>}
        />
      </FormControl>
      <FormControl style={{width: '60%'}}>
        <InputLabel>Enter your last name</InputLabel>
        <Input
          name="last_name"
          value={values.last_name}
          {...register('last_name', {
            required: 'Required',
          })}
          onChange={handleChange('last_name')}
        />
        <ErrorMessage
          errors={errors}
          name="last_name"
          render={({ message }) => <Typography style={{ color: 'red', fontSize: '12px' }}>{message}</Typography>}
        />
      </FormControl>

      <FormControl style={{ width: "60%", fontSize: '5px' }}>
        <Button
          variant="contained"
          onClick={handleSubmit(handleSignUp)}
          style={{
            height: "45px",
            marginTop: "20px",
            marginBottom: "20px",
            color: "white",
            fontSize: "17px",
            textTransform: "none",
            fontWeight: "bold",
            background: "black"
          }}
        >
          Sign Up
        </Button>
      </FormControl>
    </div>
  )
})

export default RegistrationForm