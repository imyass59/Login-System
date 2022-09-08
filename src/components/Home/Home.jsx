import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/Featues/userSlice';
import Cookies from 'js-cookie';
import axios from 'axios';
import getCookie from '../Hookes/Cookies/getCookie';

export default function Home() {
  const [data,setData] = useState({});
  const [error,setError] = useState({});
  const selector = useSelector(selectUser);
  useEffect(()=>
  {
    const fetchData = async () =>{
      try {
        //const {data: response} = await axios.get('https://api.publicapis.org/entries');
        if(getCookie('jwt-token')!=null){
          axios.defaults.withCredentials= true;
          const response = await axios.get('http://localhost:5000/user/info')
          setData(response.data);
        }
        else{
          return;
        }
      } catch (error) {
        setError(error.message);
      }
    }

    fetchData()
  });
  return (
    <>
        <div className="bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl m-3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute">
            <div>
                <span className="inline-flex items-center justify-center p-2 bg-indigo-500 rounded-md shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" fill="white" className="bi bi-award-fill" viewBox="0 0 16 16">
                  <path d="m8 0 1.669.864 1.858.282.842 1.68 1.337 1.32L13.4 6l.306 1.854-1.337 1.32-.842 1.68-1.858.282L8 12l-1.669-.864-1.858-.282-.842-1.68-1.337-1.32L2.6 6l-.306-1.854 1.337-1.32.842-1.68L6.331.864 8 0z"/>
                  <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1 4 11.794z"/>
                </svg>
                </span>
            </div>
            <h3 className="text-slate-900 dark:text-white mt-5 text-3xl font-medium tracking-tight">Welcome<br /> <span className="text-indigo-600">{(selector) ? selector.email : ''}</span></h3>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
                The Zero Gravity Pen can be used to write in any orientation, including upside-down. It even works in outer space.
            </p>
        </div>
    </>
  )
}
