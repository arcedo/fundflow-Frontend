import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserMain from '../components/UserMain';
import { endVerificationEmail } from '../services';
import emailVerified from '../assets/icons/emailVerified.svg';

function Verify() {
    let navigate = useNavigate();
    const { code } = useParams();
    const [verification, setVerification] = useState(null);
    useEffect(() => {
        const verify = async () => {
            const response = await endVerificationEmail(code);
            setVerification(response);
            if (response && response.message) {
                if (localStorage.getItem('userData')) {
                    const currentUser = JSON.parse(localStorage.getItem('userData'));
                    currentUser.verified = true;
                    localStorage.setItem('userData', JSON.stringify(currentUser));
                }
                setTimeout(() => {
                    navigate('/');
                }, 3000);
            }
        }
        verify();
    }, []);
    return (
        <UserMain>
            {verification.code === 200 ? (
                <div className='text-black flex flex-col justify-center items-center gap-2'>
                    <h2 className='text-xl font-bold'>Email verified!</h2>
                    <img src={emailVerified} alt='Email verified' />
                </div>
            ) : (
                <div className='text-black flex flex-col justify-center items-center gap-2'>
                    <h2 className='text-xl font-bold'>Something went wrong</h2>
                    <p className='opacity-70'>Seems something failed. Want to try again?</p>
                    <button className='p-3 bg-gradient-to-r from-primary to-secondary border-none bg-opacity-50 rounded-lg text-white font-bold'>Resend email</button>
                </div>
            )}
        </UserMain>
    );
}

export default Verify;
