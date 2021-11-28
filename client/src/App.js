import React from 'react';
import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import "./App.css"
import About from './pages/About/About';
import Manage from './pages/Manage/Manage';
import Classroom from './pages/Classroom/Classroom';
import Discussion from './pages/Discussion/Discussion';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/footer/footer';
import FingerBtn from './Components/fingerBtn/fingerBtn';
import ClassInIt from './pages/Classroom/ClassInIT/ClassInIt'
import PrivateRoute from './Protected.routes'
import Login from './Components/login/login';
import Register from './Components/register/register'
import Auth from './auth';
const App = () => {
  
  return (
    <Router>
      <Navbar />
      <main className="paddingMainTop">
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <PrivateRoute path="/about" exact component={About} />
          <PrivateRoute path="/" exact component={Classroom}/>
          <PrivateRoute path="/discussion" exact component={Discussion} />
          <PrivateRoute path="/manage" exact component={Manage} />
          <PrivateRoute path="/Class" exact component={ClassInIt} />
  
          <Redirect to="/" />
        </Switch>
      </main>
      
      <FingerBtn />
      <Footer />
    </Router>
  );
};
export default App;
