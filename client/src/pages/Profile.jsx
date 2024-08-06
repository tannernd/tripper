import { useState } from 'react';
import { useParams } from "react-router-dom";

import Auth from "../utils/auth";
import ProfileComp from '../components/ProfileComp';
import ProfileForm from '../components/ProfileForm';
import Loading from '../components/Loading';

import { GET_USER } from '../utils/queries';
import { useQuery } from '@apollo/client';

const Profile = () => {

    const {username} = useParams('username');
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    let user = {};
    let loggedIn = false;
    if (token) {
      user = Auth.getProfile();
      loggedIn = true;
      };
    const [showForm, setShowForm] = useState(false);
    const {loading:loadingPageUser, data:dataPageUser} = useQuery(GET_USER, {
      variables:{username:username}
    });
    const pageUser = dataPageUser?.getUser || [];
    if (loadingPageUser) {
      return (
        <Loading/>
        )
    }
    return (
    <>
    {showForm ? (
      <ProfileForm 
      username={pageUser.username}
      bio={pageUser.bio}
      user={user}
      setShowForm={setShowForm}
      />
    ): ( 
      <ProfileComp
      avatarImg={pageUser.avatarImg} 
      username={pageUser.username}
      bio={pageUser.bio}
      user={user}
      setShowForm={setShowForm}
     />)}
    
    </>
)
}

export default Profile;