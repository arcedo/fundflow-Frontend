import React, { useState } from "react";
import Modal from "./Modal";

function MdlEditCover({ onClose, project }) {
    console.log(project)
    return (
        <Modal onClose={onClose}>
            <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-3">
                    <h2 className="text-4xl font-dmsans font-bold text-black">Change cover</h2>
                    <div className="w-96 h-96 bg-cover bg-center flex justify-center items-center" style={{ backgroundImage: `url(${import.meta.env.VITE_API_URL}projects/${project.id}/cover)` }}>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default MdlEditCover;
