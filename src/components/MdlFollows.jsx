import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import notFollowing from "../assets/icons/follow.svg";
import following from "../assets/icons/check.svg";
import { followUser, unfollowUser } from "../services";

function MdlFollows({ onClose, user, type, setUser, sameUser }) {
    const [follows, setFollows] = useState(type === 'followers' ? user.followersUrl : user.followingUrl);

    useEffect(() => {
        setFollows(type === 'followers' ? user.followersUrl : user.followingUrl);
    }, [user, type]);

    const followFromModal = async (followedUser) => {
        const res = await followUser(localStorage.getItem('token'), followedUser, user.url);
        if (res.code === 201) {
            await setUser({ ...user, followingUrl: [...user.followingUrl, followedUser], following: user.following + 1 });
            if (type === 'following') {
                setFollows(user.followingUrl);
            }
        }
    };

    const unfollowFromModal = async (followedUser) => {
        const res = await unfollowUser(localStorage.getItem('token'), followedUser, user.url);
        if (res.code === 200) {
            await setUser({ ...user, followingUrl: user.followingUrl.filter(f => f !== followedUser), following: user.following - 1 });
            if (type === 'following') {
                setFollows(user.followingUrl);
            }
        }
    }

    return (
        <Modal onClose={onClose}>
            <div className="flex flex-col gap-4" style={{ maxHeight: '60vh', width: `${window.innerWidth < 1080 ? '30vh' : '25vw'}` }}>
                <div className="flex flex-col gap-1 h-full w-full overflow-y-auto">
                    <h2 className="text-4xl font-dmsans font-bold text-black">{type}</h2>
                    <div className="flex flex-col gap-3.5 pt-5 pb-3.5 h-full w-full">
                        {follows && follows.map((follow) => {
                            return (
                                <div key={follow} className="flex justify-between items-center h-16 mx-0.5 pl-3.5 rounded-lg bg-white/40 overflow-hidden backdrop-blur-xl shadow-md hover:shadow-none transition-all duration-700">
                                    <Link to={`/profile/${follow}`} className="w-full text-md font-montserrat font-medium text-black flex flex-row items-center gap-2">
                                        <div className="w-9 h-9 lg:w-14 lg:h-14 rounded-full overflow-hidden flex justify-center items-center bg-gradient-to-r from-primary to-secondary shadow-sm">
                                            <img src={`${import.meta.env.VITE_API_URL}users/${follow}/profilePicture`} alt={follow + ' avatar'} className="h-full w-full" />
                                        </div>
                                        <p className="">@{follow.length > 9 ? `${follow.slice(0, 9)}...` : follow}</p>
                                    </Link>
                                    {sameUser && (
                                        user && user.followingUrl.includes(follow) ? (
                                            <button onClick={() => unfollowFromModal(follow)} className="lg:px-10 h-full focus:border-none focus:outline-none flex gap-3 justify-center items-center w-16 lg:w-36 bg-gradient-to-r opacity-70 from-primary to-secondary text-white font-semibold font-dmsans shadow hover:opacity-100 transition-all duration-200">
                                                {window.innerWidth < 680 ? '' : 'following'}<img className="w-6" src={following} alt="following" />
                                            </button>
                                        ) : (
                                            <button onClick={() => followFromModal(follow)} className="lg:px-12 h-full focus:border-none focus:outline-none flex gap-3 justify-center items-center w-16 lg:w-36 bg-gray-300 hover:bg-gray-400 hover:bg-opacity-70 text-black font-semibold font-dmsans transition-all duration-200">
                                                {window.innerWidth < 680 ? '' : 'follow'}<img className="w-6" src={notFollowing} alt="not following" />
                                            </button>
                                        )
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Modal >
    );
}

export default MdlFollows;
