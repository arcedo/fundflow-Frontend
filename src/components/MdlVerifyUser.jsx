import React from "react";
import Modal from "./Modal";

function MdlVerifyUser({ onClose }) {
    return (
        <Modal onClose={onClose}>
            <div className="flex flex-col gap-4">
                <div>
                    <h2 className="text-4xl font-dmsans font-bold text-black">User verification</h2>
                    <p className="text-black font-normal font-dmsans opacity-70">Start a new project and share it with the community.</p>
                </div>
                <div className="flex flex-col gap-4">
                    <h3 className="text-2xl font-dmsans font-bold text-black">What is the target?</h3>
                    
                </div>
            </div>
        </Modal>
    );
}

export default MdlVerifyUser;
