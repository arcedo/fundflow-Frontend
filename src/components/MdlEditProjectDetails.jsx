import React from "react";
import Modal from "./Modal";

function MdlEditProjectDetails({ onClose }) {
    return (
        <Modal onClose={onClose}>
            <div className="flex flex-col gap-4">
                <h2 className="text-4xl font-dmsans font-bold text-black">Edit!!</h2>
            </div>
        </Modal>
    );
}

export default MdlEditProjectDetails;
