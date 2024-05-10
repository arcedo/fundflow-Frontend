import React from "react";
import Modal from "./Modal";
import { Link } from "react-router-dom";

function MdlLoginNeeded({ onClose }) {
    return (
        <Modal onClose={onClose}>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <h2 className="text-4xl font-dmsans font-bold text-black">Login needed</h2>
                    <p className="text-black font-normal font-dmsans opacity-70">You need to be logged in for this action.</p>
                </div>
                <Link to="/login" className='p-3 font-dmsans bg-gradient-to-r from-primary to-secondary border-none bg-opacity-50 rounded-lg text-white text-center font-bold hover:opacity-70 transition-all duration-200'>To login</Link>
            </div>
        </Modal>
    );
}

export default MdlLoginNeeded;
