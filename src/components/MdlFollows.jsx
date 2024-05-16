import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import notFollowing from "../assets/icons/follow.svg";
import following from "../assets/icons/check.svg";

function MdlFollows({ onClose, user, follows, type }) {
    const [isFollowing, setIsFollowing] = useState(false);

    return (
        <Modal onClose={onClose}>
            <div className="flex flex-col gap-4" style={{ height: '60vh', width: '30vw' }}>
                <div className="flex flex-col gap-1 h-full w-full">
                    <h2 className="text-4xl font-dmsans font-bold text-black">{type}</h2>
                    <div className="flex flex-col gap-2 pt-5 h-full w-full overflow-y-auto">
                        {follows && follows.map((follow) => {
                            return (
                                <div className="flex justify-between relative">
                                    <Link to={`/profile/${follow}`} key={follow} className="w-full text-lg font-dmsans font-bold text-black flex flex-row items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-300 hover:shadow-md transition-all duration-200">
                                        <div className="w-16 h-16 rounded-full overflow-hidden flex justify-center items-center bg-gradient-to-r from-primary to-secondary shadow-md">
                                            <img src={`${import.meta.env.VITE_API_URL}users/${follow}/profilePicture`} alt={follow + ' avatar'} className="h-full w-full" />
                                        </div>
                                        <p className="">@{follow}</p>
                                    </Link>
                                    {isFollowing ? (
                                        <button className="absolute top-4 right-4 px-4 flex gap-3 justify-center items-center w-36 h-12 bg-gradient-to-r opacity-70 from-primary to-secondary rounded-md text-white font-semibold font-dmsans shadow hover:opacity-100 transition-all duration-200">
                                            following<img className="w-6" src={following} alt="following" />
                                        </button>
                                    ) : (
                                        <button className="absolute top-4 right-4 px-4 flex gap-3 justify-center items-center w-36 h-12 bg-gray-300 hover:bg-gray-400 hover:bg-opacity-70 rounded-md text-black font-semibold font-dmsans shadow transition-all duration-200">
                                            follow<img className="w-6" src={notFollowing} alt="not following" />
                                        </button>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default MdlFollows;
