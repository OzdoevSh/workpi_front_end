import './Login.css'
import Link from '@mui/material/Link';
import LoginForm from "../../components/LoginForm"

const Login = () => {
  return(
    <div className='loginContainer'>
      <LoginForm/>
      <Link href='/signup' 
        sx={{ 
          typography: 'body2',
          '& > :not(style) + :not(style)': {
            ml: 2,
          },
        }}
        style={{
          marginTop: "10px"
        }}
      >
        If you have not an account yet please sign up
      </Link>
    </div>
    
  )
}

export default Login;