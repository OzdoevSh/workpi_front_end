import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import { observer } from "mobx-react-lite";
import { Context } from "./index";
import { useContext, useEffect } from "react";
import { isAuth } from "./http/userApi";

import Account from "./pages/Account";
import MainPage from "./pages/MainPage";



const App = observer(() => {


  const { user } = useContext(Context)

  useEffect(() => {
    isAuth().then(() => {
      user.setUser(true)
      user.setIsAuth(true)
    })
  }, [user])


  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/signup" element={<Registration />} />
          <Route path="/signin" element={<Login />} />
          <Route path={'/account/:id'} element={<Account/>} />
        </Routes>
      </Router>
    </div>
  );
})

export default App;
