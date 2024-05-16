import React from "react";
import Modal from "./Modal";

function MdlFollows({ onClose, user, follows}) {
    return (
        <Modal onClose={onClose}>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <h2 className="text-4xl font-dmsans font-bold text-black">Follows</h2>
                    <p className="text-black font-normal font-dmsans opacity-70"></p>
                </div>
            </div>
        </Modal>
    );
}

export default MdlFollows;
