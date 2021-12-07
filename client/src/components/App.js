import React, { useEffect, useState } from "react";
import firebase from "./Firebase/firebase";
import Signup from "./Firebase/Signup";
import './App.css'
import { AuthProvider } from "../context/AuthContext";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Dashboard from "./Dashboard/Dashboard";
import Login from "./Firebase/Login";
import PrivateRoute from "./Firebase/PrivateRoute";
import ForgotPassword from "./Firebase/ForgotPassword";
import UserPicks from "./User-Picks/UserPicks";
import Expert from "./Expert-Picks/Expert";
import UpdateProfile from "./Firebase/UpdateProfile";
import { useAuth } from "../context/AuthContext";
import Chat from "./Chat/Chat";
import styled, {ThemeProvider} from 'styled-components'
import {lightTheme, darkTheme, GlobalStyles} from './Themes.js'
import NewNav from "./Navbar/NewNav";
import NFL from "./Gamebar/Nfl";
export default function App() {

  const [theme, setTheme] = useState('light');
  const StyledApp = styled.div``

  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  }

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
    <GlobalStyles />
    <StyledApp className='app'>
   
      <Router>
      
        <AuthProvider>
          <NFL />
          <NewNav />
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <PrivateRoute exact path='/picks' component={UserPicks} />
            <Route path='/signup' component={Signup} />
            <Route path='/login' component={Login} />
            <Route path='/expert-picks' component={Expert} />
            <Route path='/chat' component={Chat} />d
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route path="/update-profile" component={UpdateProfile} />
          </Switch>
        </AuthProvider>
      </Router>
    </StyledApp>
    </ThemeProvider>
  );
}
