import React from "react";
import Modal from "./Modal";

function MdlDeleteUser({ onClose, email }) {
    const deleteCheck = () => {
        const confirm = document.querySelector("#confirm");
        const input = document.querySelector("#deleteInput");
        if (input.value === email) {
            console.log("Deleting user...");
            onClose();
        } else {
            confirm.style.color = "red";
            input.style.borderColor = "red";
            input.value = "";
            input.classList.add("animate-shake");
            setTimeout(() => {
                confirm.style.color = "#222"
                input.style.borderColor = "rgba(0, 0, 0, 0.25)";
                input.classList.remove("animate-shake");
            }, 1200);
        }
    };

    return (
        <Modal onClose={onClose}>
            <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-3">
                    <h2 className="text-4xl font-dmsans font-bold text-black">Are you <span className="text-red-600">really</span> sure?</h2>
                    <div>
                        <p className="text-black font-normal font-dmsans">Deleting your account is <span className="text-red-600 font-bold">permanent</span>. Make sure this is what you really want before proceeding.</p>
                        <p className="text-black font-normal font-dmsans">If this is your final decision, sorry to see you go! We hope to see you again sometime.</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p id="confirm" className="text-black font-normal font-dmsans opacity-70">Type "{email}" to confirm.</p>
                        <input id="deleteInput" type="text" className="w-full h-10 font-normal font-dmsans border-2 border-black border-opacity-25 p-3 rounded-lg outline-none focus:border-opacity-50 transition-all duration-200" />
                    </div>
                </div>
                <button onClick={deleteCheck} className="bg-red-700 text-white font-dmsans font-semibold text-lg py-3 px-6 rounded-lg hover:bg-red-800 transition-all duration-200">Delete</button>
            </div>
        </Modal>
    );
}


export default MdlDeleteUser;
