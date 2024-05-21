import React from "react";
import { Link } from "react-router-dom";

function UserThumb({ user }) {
    return (
        <div className="flex flex-col justify-center items-center gap-3">
            <Link to={`/profile/${user.url}`} className="relative flex flex-col justify-center items-center group h-28 w-28 overflow-hidden rounded-full">
                <img src={`${import.meta.env.VITE_API_URL}users/${user.url}/profilePicture`} alt="User profile" className="w-full h-full rounded-full group-hover:scale-125 scale-110 transition-all duration-300" />
            </Link>
            <Link to={`/profile/${user.url}`} className="font-dmsans text-lg font-semibold text-black text-opacity-75 hover:text-secondary hover:text-opacity-100 transition-colors duration">{user.username}</Link>
        </div>
    );
}

export default UserThumb;
