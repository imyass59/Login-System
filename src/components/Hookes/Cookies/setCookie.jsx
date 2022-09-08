import Cookies from 'js-cookie';

const setCookie = (key,value) =>
{
    Cookies.set(key,value,{
        expires:1,
        secure : true,
        path : '/',
        sameSite : 'strict'
    })
}

export default setCookie;