import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { deleteOwnUser } from "../services/index";

function MdlDeleteUser({ onClose, email, googleAccount }) {
    let navigate = useNavigate();
    const [inputEmail, setInputEmail] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [showError, setShowError] = useState('');
    const deleteCheck = (event) => {
        event.preventDefault();
        let seemsOk = true;
        if (!inputEmail || inputEmail !== email) {
            seemsOk = false;
            const input = document.getElementById("deleteInput");
            input.style.borderColor = "red";
            input.classList.add("animate-shake");
            setTimeout(() => {
                input.style.borderColor = "rgba(0, 0, 0, 0.25)";
                input.classList.remove("animate-shake");
            }, 1200);
        }
        if (!inputPassword && !googleAccount) {
            seemsOk = false;
            const input = document.getElementById("currentPassword");
            input.style.borderColor = "red";
            input.classList.add("animate-shake");
            setTimeout(() => {
                input.style.borderColor = "rgba(0, 0, 0, 0.25)";
                input.classList.remove("animate-shake");
            }, 1200);
        }
        if (seemsOk) {
            deleteOwnUser(localStorage.getItem('token'), inputPassword)
                .then((data) => {
                    if (data.id) {
                        localStorage.removeItem('token');
                        localStorage.removeItem('userData');
                        navigate('/');
                    } else {
                        setShowError(data.message);
                    }
                });
        }
    };

    return (
        <Modal onClose={onClose}>
            <form className="flex flex-col gap-5" action="" onSubmit={deleteCheck}>
                <div className="flex flex-col gap-3">
                    <h2 className="text-4xl font-dmsans font-bold text-black">Are you <span className="text-red-600">really</span> sure?</h2>
                    <div>
                        <p className="text-black font-normal font-dmsans">Deleting your account is <span className="text-red-600 font-bold">permanent</span>. Make sure this is what you really want before proceeding.</p>
                        <p className="text-black font-normal font-dmsans">If this is your final decision, sorry to see you go! We hope to see you again sometime.</p>
                    </div>
                    <div className="flex justify-center gap-5">
                        <div className={`flex flex-col gap-1 ${!googleAccount ? 'w-2/3' : 'w-full'}`}>
                            <label htmlFor="deleteInput" className="text-black font-normal font-dmsans opacity-70">Type "<span className="font-bold">{email}</span>" to confirm.</label>
                            <input id="deleteInput" value={inputEmail} onChange={(e) => setInputEmail(e.target.value)} type="text" className="w-full h-10 font-normal font-dmsans border-2 border-black border-opacity-25 p-3 rounded-lg outline-none focus:border-opacity-50 transition-all duration-200" />
                        </div>
                        {!googleAccount && <div className="flex flex-col gap-1 w-1/3">
                            <label htmlFor="currentPassword" className="text-black font-semibold font-dmsans opacity-70">Your current password <span className="text-red-600">*</span></label>
                            <input id="currentPassword" value={inputPassword} onChange={(e) => setInputPassword(e.target.value)} type="password" className="w-full h-10 font-normal font-dmsans border-2 border-black border-opacity-25 p-3 rounded-lg outline-none focus:border-opacity-50 transition-all duration-200" />
                        </div>}
                    </div>
                </div>
                {showError && <p className="text-red-600 font-dmsans font-semibold">{showError}</p>}
                <button type="submit" className="bg-red-600 text-white font-dmsans font-semibold text-lg py-3 px-6 rounded-lg hover:bg-red-700 transition-all duration-200">Delete</button>
            </form>
        </Modal>
    );
}


export default MdlDeleteUser;
