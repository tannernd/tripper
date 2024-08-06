import React, { useState } from 'react';

function Avatar(props) {
  const {avatarImg, username} = props;
  const [imageExists, setImageExists] = useState(true);
  console.log(username);
  const firstLetter = username?.substr(0,1) || ''; 
  const handleImageError = () => {
    setImageExists(false);
  };
  if (avatarImg !== '') {
    return (
      <img onError={handleImageError}
        alt={`avatar - ${username}`}
        className="h-8 w-8 rounded-full"
        src={`/user_images/${avatarImg}`}/>
    )
  } else {
    return (
      <div className="h-8 w-8 flex items-center justify-center rounded-full border border-slate-200 text-lg text-slate-100 bg-slate-400 font-bold ">{firstLetter.toUpperCase()}</div>
    )
  }
}

export default Avatar