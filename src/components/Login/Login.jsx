import {React,useEffect,useState} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { selectUser, _login } from '../redux/Featues/userSlice';
import axios from 'axios';
import setCookie from '../Hookes/Cookies/setCookie';
import getCookie from '../Hookes/Cookies/getCookie';

export default function Login() {
    const [isOpen,setIsOpen] = useState(false);
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [loading,setLoading] = useState(false);


    let navigate = useNavigate();
    const selector = useSelector(selectUser);
    const dispatch = useDispatch() 

    useEffect(() =>
    {
        if(getCookie("jwt-token")){navigate('/')}else{return;}
    },[])

    const handleOnSubmit = (e) =>
    {
        e.preventDefault();
        const LoginApi = async () =>{
            setLoading(true);
            const url = "http://localhost:5000"
            try {
                const user = { email : `${email.toString()}` , pass : `${password.toString()}`};
                //var bodyFormData = new FormData();
                //bodyFormData.append('email',email);
                //bodyFormData.append('pass',password);
                //axios.defaults.withCredentials = true;
                const response = await axios.post(`http://localhost:5000/user/login`, user);
                setCookie("jwt-token",response.data);
                navigate('/');
                window.location.reload();
            } catch (error) {
                setIsOpen(true);
                setLoading(false);
                //console.error(error.message);
            }
          }
        
        LoginApi();
    }
  return (
    <>
    <div className='flex flex-col top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute justify-center items-center gap-2'>
        {
            (!loading)
            ?
            (
                <>
                    <div className={`p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800 ${(isOpen)?'flex':'hidden'} flex-row justify-between items-center w-full`} role="alert">
                        <p><span className="font-medium">Warning </span> Check email and password</p>
                        <button className="font-medium text-lg flex flex-row justify-center items-center" type="button" onClick={()=>setIsOpen(false)}>
                            x
                        </button>
                    </div>
                    <form onSubmit={(e)=>handleOnSubmit(e)}>
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-96 ">
                        <div className="mb-4">
                            <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="username">
                                Username
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="email" type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                        </div>
                        <div className="mb-6">
                            <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" id="password" type="password" placeholder="******************" value={password} onChange={(e)=>setPassword(e.target.value)} />
                        </div>
                        <div className="flex flex-row-reverse items-center justify-between">
                        <button className="hover:bg-blue-dark text-white font-bold py-2 px-4 rounded bg-indigo-700" type="submit">
                            Login
                        </button>
                            <a className="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker" href="#">
                                Forgot Password?
                            </a>
                        </div>
                    </div>
                </form>
                </>
            )
            :
            (
                <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                    <div role="status">
                        <svg aria-hidden="true" className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                    </div>
                </div> 
            )
        }
    </div>
    </>
  )
}
