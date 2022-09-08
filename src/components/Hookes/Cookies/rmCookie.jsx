import Cookies from 'js-cookie';

const rmCookie = (key) =>
{
    Cookies.remove(key);
}

export default rmCookie;