import Cookies from 'js-cookie';

const getCookie = (key) =>
{
    return Cookies.get(key);
}

export default getCookie;