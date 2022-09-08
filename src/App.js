import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { useEffect } from 'react';
import NavBar from './components/NavBar/NavBar';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, _login } from './components/redux/Featues/userSlice';
import getCookie from './components/Hookes/Cookies/getCookie';
import setCookie from './components/Hookes/Cookies/setCookie';
import rmCookie from './components/Hookes/Cookies/rmCookie';
import NotFound from './components/NotFound/NotFound';
import Profile from './components/User/Profile';
import Settings from './components/User/Settings';


function App() {

  const selector = useSelector(selectUser);
  const dispatch = useDispatch() 
  useEffect(() =>
  {
    if(getCookie('jwt-token')==null){return;}else{dispatch(_login({
      Token : getCookie('jwt-token'),
      IsLogin : true
    }))};
  },[])
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='*' element={<NotFound/>} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='/settings' element={<Settings/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
