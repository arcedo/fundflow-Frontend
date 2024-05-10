import React, { useState } from "react";
import Modal from "./Modal";
import { verifyEmail } from "../services";

function MdlVerifyUser({ onClose }) {
    const [emailSent, setEmailSent] = useState(false);

    const resendEmail = async () => {
        await verifyEmail(localStorage.getItem('token'))
            .then((data) => {
                if (data.code === 200) {
                    setEmailSent(true);
                }
            });
    }

    return (
        <Modal onClose={onClose}>
            {emailSent ?
                (
                    <div>
                        <h2 className="text-4xl font-dmsans font-bold text-black">Email sent</h2>
                        <p className="text-black font-normal font-dmsans opacity-70">Check your inbox for a verification email. Make sure to check your spam folder.</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        <div>
                            <h2 className="text-4xl font-dmsans font-bold text-black">You're not verified</h2>
                            <p className="text-black font-normal font-dmsans opacity-70">Accounts need email verification to complete this action.</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-black font-normal font-dmsans text-opacity-70">Check your inbox for a verification email. Make sure to check your spam folder.</p>
                            <p className="text-black font-normal font-dmsans text-opacity-70"><span className="text-black text-opacity-100 font-semibold">Didn't receive an email?</span> Click the button below to resend it.</p>
                        </div>
                        <button onClick={resendEmail} className='p-3 font-dmsans bg-gradient-to-r from-primary to-secondary border-none bg-opacity-50 rounded-lg text-white font-bold hover:opacity-70 transition-all duration-200'>Resend email</button>
                    </div>
                )
            }
        </Modal>
    );
}

export default MdlVerifyUser;
