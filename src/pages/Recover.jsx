import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import UserMain from '../components/UserMain';
import { recoverPassword } from '../services/index';

function Recover() {
    const [recoverEmailSent, setRecoverEmailSent] = useState({ code: 0, message: '' });
    const [userEmail, setUserEmail] = useState('');
    const sendRecoverPasswordEmail = async (event) => {
        event.preventDefault();
        if (userEmail) {
            await recoverPassword(userEmail)
                .then((data) => {
                    if (data.code === 200) {
                        setRecoverEmailSent(data);
                    } else {
                        setRecoverEmailSent(data);
                    }
                });
        }       
    }

    useEffect(() => {
        document.title = "recover · fundflow";
    }, []);

    return (
        <UserMain>
            <form className="flex flex-col w-64 gap-4" onSubmit={sendRecoverPasswordEmail}>
                <div className='text-black'>
                    <h2 className='text-xl font-bold'>Recover your password</h2>
                    <p className='opacity-70'>We will send you an email to reset your password.</p>
                </div>
                <div className='w-full'>
                    <label htmlFor="email" className='text-black font-semibold tracking-tighter opacity-70'>Email</label>
                    <input id='email' value={userEmail} onChange={(e) => setUserEmail(e.target.value)} className="p-2 bg-white rounded-lg font-montserrat border border-gray-500 border-opacity-30 w-full text-black outline-none focus:border-opacity-80 transition-all duration-200" type="text" />
                </div>
                <button className="p-2 mt-2 mb-2 bg-gradient-to-r from-primary to-secondary rounded-lg text-white font-bold hover:opacity-75 transition-all duration-200" type="submit">Send email</button>
            </form>
            {recoverEmailSent && recoverEmailSent.code === 200 ?
                <p className='text-black w-full font-semibold mb-2 tracking-tighter opacity-70'>{recoverEmailSent.message}</p>
                :
                <p className='text-red-400 w-full font-semibold mb-2 tracking-tighter'>{recoverEmailSent.message}</p>
            }
            <Link to={"/login"} className='text-primary font-normal tracking-tight w-full transition-all duration-200 hover:text-purple-500'>Go back to login</Link>
        </UserMain>
    )
}

export default Recover;