import { Fragment, useState } from 'react';
import { Link } from "react-router-dom";
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useQuery } from '@apollo/client';
import { GET_USER} from '../utils/queries';
import Avatar from './Avatar';
import Auth from '../utils/auth';


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const currentURL = window.location.pathname.split('/');

export default function Navbar() {  
  const [current, setCurrent] = useState(currentURL[1]);
  const token = Auth.loggedIn() ? Auth.getToken() : null;
  let user = {};
  let userInfo;
  if (token) {
    user = Auth.getProfile();
    userInfo = useQuery(GET_USER, {
      variables: {
        username:user.data.username
      }
    })
    };
  return (
    <Disclosure as="nav" className="bg-slate-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-slate-400 hover:bg-slate-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                <svg style={{"color":"white"}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>

                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                      <Link to={`/`} className={classNames(
                          current === '' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={current === '' ? 'page' : undefined}>
                        Home
                      </Link>
                      {!Auth.loggedIn() ? (
                        <div className="flex space-x-4">
                      <Link                        
                        to="/login" 
                        className={classNames(
                          current === 'login' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={current === 'login' ? 'page' : undefined}
                      >
                        Login
                      </Link>
                      <Link                        
                        to="/signup"
                        className={classNames(
                          current === 'signup' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={current === 'signup' ? 'page' : undefined}
                      >
                        Sign Up
                      </Link>
                      </div>
                      ): ''}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {Auth.loggedIn() ? (
                  <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <Avatar 
                        avatarImg={userInfo.data?.getUser.avatarImg || ''}
                        username={userInfo.data?.getUser.username || ''}/>
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
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to={`/profile/${user.data.username}`}
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Your Profile
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="#"
                            onClick={Auth.logout}
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Sign out
                          </Link>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                  </Menu>
                ) : ''}
              
                {/* Profile dropdown */}
                
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
          {Auth.loggedIn() ? (
            <div className="space-y-1 px-2 pb-3 pt-2">              
                <Disclosure.Button
                  as="a"
                  href="/"
                  className={classNames(
                    current === 'Home' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={current === 'Home' ? 'page' : undefined}
                >
                  Home
                </Disclosure.Button>
            </div>): (
              <div className="space-y-1 px-2 pb-3 pt-2">              
              <Disclosure.Button
                as="a"
                href="/"
                className={classNames(
                  current === 'Home' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'block rounded-md px-3 py-2 text-base font-medium'
                )}
                aria-current={current === 'Home' ? 'page' : undefined}
              >
                Home
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="/login"
                className={classNames(
                  current === 'login' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'block rounded-md px-3 py-2 text-base font-medium'
                )}
                aria-current={current === 'login' ? 'page' : undefined}
              >
                Login
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="/signup"
                className={classNames(
                  current === 'signup' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'block rounded-md px-3 py-2 text-base font-medium'
                )}
                aria-current={current === 'signup' ? 'page' : undefined}
              >
                Sign Up
              </Disclosure.Button>
          </div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}