import './Registration.css'
import Link from '@mui/material/Link';
import RegistrationForm from "../../components/RegistrationForm";

const Registration = () => {
  return(
    <div className='regContainer'>
      <RegistrationForm />
      <Link 
        href='/signin' 
        sx={{ 
          marginTop: '10px', 
          typography: 'body2',
          '& > :not(style) + :not(style)': {
            ml: 2,
          },
        }}
        style={{
          marginTop: "10px"
        }}
      >
        If you already have an account please sign in
      </Link>
    </div>
  )
}

export default Registration;