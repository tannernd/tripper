import Avatar from "./Avatar";
import { Link } from "react-router-dom";
import { useState } from "react";
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { GET_USER} from '../utils/queries';

export default function ProfileComp(props) {
  const { username, bio, user, setShowForm, avatarImg } = props;
  let loggedInUsername = user.data?.username || "";

  

  return (
    <div className="flex flex-col items-center">
      <div className="pl-5 mt-10 w-full max-w-2xl">
        <div className="flex items-center">
          <div className="text-md text-slate-600 font-bold">@{username}</div>
        </div>
      </div>

      <div className="pl-5 border-t border-slate-00 mt-6 w-full max-w-2xl">
        <p className="mt-3 text-sm leading-6 text-slate-600">{bio}</p>
      </div>

      <div className="mt-6 w-full max-w-2xl">
        <div className="mt-2 flex items-center justify-center">
          <Avatar
            size="40"
            className="h-12 w-12 text-gray-300"
            aria-hidden="true"
            avatarImg={avatarImg || ''}
            username={username || ''}
          />
        </div>
      </div>
      <div className="mt-6">
        <Link to="/checkout" className="text-indigo-600 hover:text-indigo-500">
          Upgrade to Pro
        </Link>
      </div>
      <div className="flex flex-row justify-end pl-5 mt-10 w-full max-w-2xl">
        {loggedInUsername === username && (
          <div className=" justify-center mr-3">
            <button
              className="rounded-md bg-slate-600 mt-10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => setShowForm(true)}
            >
              Edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
