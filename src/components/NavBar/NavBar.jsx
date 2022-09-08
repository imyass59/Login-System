import {React,useState} from 'react'
import { NavLink,useNavigate } from 'react-router-dom';
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { useSelector,useDispatch } from 'react-redux';
import { selectUser, _logout } from '../redux/Featues/userSlice';
import rmCookie from '../Hookes/Cookies/rmCookie';

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const ActiveNavLink = 'text-gray-300 px-3 py-2 rounded-md text-sm font-medium bg-gray-700 text-white';
    const NotActiveNavLink = 'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium';

    const navigate = useNavigate();
    const selector = useSelector(selectUser);

    const dispatch = useDispatch();
    const handleLogout = (e) =>
    {
      e.preventDefault();
      rmCookie("jwt-token");
      dispatch(_logout());
      navigate('/')
      window.location.reload();
    }
    return (
      <>
        <nav className="bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                 <a href='/'>
                  <img
                      className="h-8 w-8"
                      src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                    />
                 </a>
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4 space-x-reverse">
                  <ul className='flex justify-center gap-5'>
                    <NavLink className={({ isActive }) => isActive ? ActiveNavLink : NotActiveNavLink} to=""><li>Home</li></NavLink>
                    <NavLink className={({ isActive }) => isActive ? ActiveNavLink : NotActiveNavLink} to="Service"><li>Service</li></NavLink>
                  </ul>
                  </div>
                </div>
              </div>
              <div className='flex flex-row justify-center items-center gap-5'>
                <div className="flex flex-cols justify-center items-center text-white text-sm font-medium">
                  <div className="ml-10  space-x-4 space-x-reverse gap-4 flex flex-row justify-center items-center">
                    {
                      (!selector)
                      ?
                      (
                        <>
                        <NavLink to="register">
                          <button type="button" className="text-gray-900 bg-white border-gray-300 focus:outline-none hover:bg-gray-100  font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                            Register
                          </button>
                        </NavLink>
                        <NavLink to="login">
                          <button type="button" className="focus:outline-none text-white bg-indigo-700 hover:bg-indigo-800  font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-900">
                            Login
                          </button>
                        </NavLink>
                        </>
                      )
                      :

                        <>
                        <Menu as="div" className="relative flex flex-row justify-center items-center z-10">
                          <div>
                            <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                              <span className="sr-only">Open user menu</span>
                              <img
                                className="h-8 w-8 rounded-full"
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                              />
                            </Menu.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="top-16 -left-20 origin-top-right absolute right-0 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                              <Menu.Item>
                                  <NavLink
                                    to="/profile"
                                    className={'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 cursor-pointer'}
                                  >
                                    Your Profile
                                  </NavLink>
                              </Menu.Item>
                              <Menu.Item>
                                  <NavLink
                                    to="/settings"
                                    className={'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 cursor-pointer'}
                                  >
                                    Settings
                                  </NavLink>
                              </Menu.Item>
                              <Menu.Item>
                                  <NavLink
                                    to=""
                                    className={'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 cursor-pointer'}
                                    onClick={(e)=>handleLogout(e)}
                                  >
                                    Sign out
                                  </NavLink>
                              </Menu.Item>
                            </Menu.Items>
                          </Transition>
                        </Menu>
                        </>
                    }
                  </div>
                </div>
              <div className="-mr-2 flex md:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  type="button"
                  className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                >
                  {!isOpen ? (
                    <svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                </button>
              </div>
              </div>
            </div>
          </div>
  
          <Transition
            show={isOpen}
            enter="transition ease-out duration-100 transform"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-75 transform"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            {(ref) => (
              <div className="md:hidden" id="mobile-menu">
                <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  <ul className='flex justify-center flex-col gap-2'>
                    <NavLink className={({ isActive }) => isActive ? ActiveNavLink : NotActiveNavLink} to=""><li>Home</li></NavLink>
                    <NavLink className={({ isActive }) => isActive ? ActiveNavLink : NotActiveNavLink} to="Service"><li>Service</li></NavLink>
                  </ul>
                </div>
              </div>
            )}
          </Transition>
        </nav>
        </>
    )
}
