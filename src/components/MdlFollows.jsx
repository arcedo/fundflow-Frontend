import React from "react";
import { Link } from "react-router-dom";
import Modal from "./Modal";

function MdlFollows({ onClose, user, follows, type }) {
    return (
        <Modal onClose={onClose}>
            <div className="flex flex-col gap-4" style={{ height: '60vh', width: '30vw' }}>
                <div className="flex flex-col gap-1 h-full w-full">
                    <h2 className="text-4xl font-dmsans font-bold text-black">{type}</h2>
                    <div className="flex flex-col gap-5 pt-5 h-full w-full overflow-y-auto">
                        {follows && follows.map((follow) => {
                            return (
                                <Link to={`/profile/${follow}`} key={follow} className="text-lg font-dmsans font-bold text-black flex flex-row items-center gap-2">
                                    <div className="w-16 h-16 rounded-full overflow-hidden flex justify-center items-center bg-gradient-to-r from-primary to-secondary shadow-md">
                                        <img src={`${import.meta.env.VITE_API_URL}users/${follow}/profilePicture`} alt={follow + ' avatar'} className="h-full w-full" />
                                    </div>
                                    <p className="">@{follow}</p>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default MdlFollows;
