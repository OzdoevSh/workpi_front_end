import './MainPage.css'
import { Link, Typography } from "@mui/material";

const MainPage = () => {
  return (
    <div className="mainPageContainer">
      <Typography variant="h1" align="center">Hello! You are welcoming to the best ...registration app?!</Typography>
      <Link href='/signup' sx={{ 
        typography: 'h4',
        '& > :not(style) + :not(style)': {
          ml: 2,
        },
      }}>
        Lets get started!
      </Link>
    </div>
    
  )
}

export default MainPage;