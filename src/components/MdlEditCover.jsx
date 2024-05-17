import React, { useState } from "react";
import Modal from "./Modal";

function MdlEditCover({ onClose, project }) {
    const [coverUrl, setCoverUrl] = useState(`${import.meta.env.VITE_API_URL}projects/${project.id}/cover`);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setCoverUrl(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Modal onClose={onClose}>
            <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-5">
                    <h2 className="text-4xl font-dmsans font-bold text-black">Change cover</h2>
                    <div
                        className="bg-cover bg-center rounded-lg flex justify-center items-center hover:brightness-125 transition-all duration-200 cursor-pointer"
                        style={{ backgroundImage: `url(${coverUrl})`, width: '70vh', height: '32vh' }}
                        onClick={() => document.getElementById('coverInput').click()}
                    >
                        <input
                            type="file"
                            id="coverInput"
                            style={{ display: 'none' }}
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
                    </div>
                    <button
                        className="w-full h-12 bg-gradient-to-r from-primary to-secondary text-white font-semibold font-dmsans rounded-lg hover:opacity-75 transition-all duration-200"
                        onClick={() => console.log("Change cover")}
                    >
                        Save changes
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default MdlEditCover;
