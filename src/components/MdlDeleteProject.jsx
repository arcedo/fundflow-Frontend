import React, { useState } from "react";
import Modal from "./Modal";
import { deleteProject } from "../services/index";
function MdlDeleteProject({ onClose, projectName, projectId }) {
    const [values, setValues] = useState({ confirm: '', input: '', inputStyle: '' });
    const [error, setError] = useState('');
    const deleteCheck = async () => {
        if (values.input.replace(/\s/g, "") !== projectName.replace(/\s/g, "")) {
            setValues({ confirm: 'text-red-600', input: values.input, inputStyle: 'border-red-600 text-red-600 animate-shake' });
            setTimeout(() => {
                setValues({ confirm: '', input: '', inputStyle: '' });
            }, 1200);
        } else {
            await deleteProject(localStorage.getItem('token'), projectId)
                .then((data) => {
                    if (data.code === 200) {
                        onClose();
                        window.location.reload();
                    } else {
                        setError(data.message);
                    }
                });
        }
    };

    return (
        <Modal onClose={onClose}>
            <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-3">
                    <h2 className="text-4xl font-dmsans font-bold text-black">Delete {projectName}?</h2>
                    <div>
                        <p className="text-black font-normal font-dmsans">This action is <span className="text-red-600 font-bold">irreversible</span>, meaning everything related to this project will be removed.</p>
                        <p className="text-black font-normal font-dmsans">However, the reviews will stay on your profile to prevent bad activity.</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label id="confirm" htmlFor="deleteInput" className={`${values.confirm} text-black font-normal font-dmsans opacity-70`}>Type "{projectName}" to confirm.</label>
                        <input id="deleteInput" type="text" value={values.input} onChange={(e) => setValues({ confirm: '', input: e.target.value, inputStyle: '' })} className={`${values.inputStyle} w-full h-10 font-normal font-dmsans border-2 border-black border-opacity-25 p-3 rounded-lg outline-none focus:border-opacity-50 transition-all duration-200`} />
                    </div>
                </div>
                <button onClick={deleteCheck} className="bg-red-600 text-white font-dmsans font-semibold text-lg py-3 px-6 rounded-lg hover:bg-red-700 transition-all duration-200">Delete</button>
                {error && <p className="text-red-600 font-dmsans font-semibold">{error}</p>}
            </div>
        </Modal>
    );
}


export default MdlDeleteProject;
