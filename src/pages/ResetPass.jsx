import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import UserMain from '../components/UserMain';
import { resetPassword } from '../services';

function ResetPass() {
    const [passwordMessage, setPasswordMessage] = useState('');
    let navigate = useNavigate();
    const { code } = useParams();
    const handleChangePassword = async (event) => {
        event.preventDefault();
        let seemsOk = true;
        const newPassword = document.getElementById('newPassword');
        const confirmationPassword = document.getElementById('confirmNewPassword');
        newPassword.classList.remove('border-red-500');
        confirmationPassword.classList.remove('border-red-500');
        setPasswordMessage('');
        if (!newPassword.value) {
            seemsOk = false;
            newPassword.classList.add('border-red-500');
            newPassword.classList.add("animate-shake");
            setTimeout(() => {
                newPassword.classList.remove("animate-shake");
            }, 1200);
        }
        if (!confirmationPassword.value) {
            seemsOk = false;
            confirmationPassword.classList.add('border-red-500');
            confirmationPassword.classList.add("animate-shake");
            setTimeout(() => {
                confirmationPassword.classList.remove("animate-shake");
            }, 1200);
        }
        if (!seemsOk) {
            setPasswordMessage('Please fill all the required fields');
            return;
        }
        if (newPassword.value !== confirmationPassword.value || newPassword.value.length < 8) {
            seemsOk = false;
            confirmationPassword.classList.add('border-red-500');
            confirmationPassword.classList.add("animate-shake");
            newPassword.classList.add('border-red-500');
            newPassword.classList.add("animate-shake");
            setTimeout(() => {
                confirmationPassword.classList.remove("animate-shake");
                newPassword.classList.remove("animate-shake");
            }, 1200);
            newPassword.value = '';
            confirmationPassword.value = '';
            setPasswordMessage('Passwords do not match or are too short');
            return;
        }
        if (seemsOk) {
            await resetPassword(code, newPassword.value, confirmationPassword.value)
                .then(response => {
                    if (response.code === 200) {
                        navigate('/login');
                    } else {
                        setPasswordMessage(response.message);
                    }
                });
        }
    }

    useEffect(() => {
        document.title = "reset password · fundflow";
    }, []);

    return (
        <UserMain>
            <form className="flex flex-col w-64 gap-2" action="">
                {/* <div className='text-black'>
                    <h2 className='text-xl font-bold'>Reset your password</h2>
                    <p className='opacity-70'>minimum length of 8 characters.</p>
                </div> */}
                <div className='w-full'>
                    <div className="flex flex-col">
                        <label className="font-dmsans text-lg text-black text-opacity-70 font-semibold w-fit" htmlFor="newPassword">new password <span className='text-sm font-normal'>min. 8 chars.</span></label>
                        <input id='newPassword' name='newPassword' className="p-2 mb-2 bg-white rounded-lg font-montserrat border border-gray-500 border-opacity-30 w-full text-black outline-none focus:border-opacity-80 transition-all duration-200" type="password" />
                    </div>
                    <div className="flex flex-col">
                        <label className="font-dmsans text-lg text-black text-opacity-70 font-semibold w-fit" htmlFor="confirmNewPassword">confirm new password</label>
                        <input id='confirmNewPassword' name='confirmNewPassword' className="p-2 mb-2 bg-white rounded-lg font-montserrat border border-gray-500 border-opacity-30 w-full text-black outline-none focus:border-opacity-80 transition-all duration-200" type="password" />
                    </div>
                </div>
                <p className={`text-red-600 font-dmsans text-center`}>{passwordMessage ? passwordMessage : ''}</p>
                <button onClick={handleChangePassword} type="submit" className="py-2.5 bg-gradient-to-r opacity-70 from-primary to-secondary rounded-md text-white font-semibold font-dmsans shadow hover:opacity-100 transition-all duration-200">Reset password</button>
            </form>
            <Link to={"/login"} className='mt-2 text-primary font-normal tracking-tight w-full transition-all duration-200 hover:text-purple-500'>Go back to login</Link>
        </UserMain>
    )
}

export default ResetPass;