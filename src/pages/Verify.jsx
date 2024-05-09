import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import UserMain from '../components/UserMain';

function Verify() {
    const { code } = useParams();
    const [status, setStatus] = useState("Verifying your account...");

    useEffect(() => {
        async function verifyUser() {
            try {
                const response = await fetch(`/verifyEmail/${code}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                const data = await response.json();
                if (response.status === 200) {
                    setStatus("Email verified!");
                } else {
                    setStatus(data.message || "Failed to verify email");
                }
            } catch (error) {
                setStatus("Failed to verify email");
            }
        }

        verifyUser();
    }, [code]);

    return (
        <UserMain>
            {status === "Email verified!" ? (
                <div className='text-black flex flex-col justify-center items-center gap-2'>
                    <h2 className='text-xl font-bold'>Email verified!</h2>
                    <Link to="/login" className='p-3 bg-gradient-to-r from-primary to-secondary border-none bg-opacity-50 rounded-lg text-white font-bold'>Go back to login</Link>
                </div>
                ) : 
                (
                <div className='text-black flex flex-col justify-center items-center gap-2'>
                    <h2 className='text-xl font-bold'>{status}</h2>
                    <p className='opacity-70'>Seems something failed. Want to try again?</p>
                    <button className='p-3 bg-gradient-to-r from-primary to-secondary border-none bg-opacity-50 rounded-lg text-white font-bold'>Resend email</button>
                </div>
            )}
        </UserMain>
    );
}

export default Verify;
