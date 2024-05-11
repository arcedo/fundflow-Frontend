import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from '@react-oauth/google';
import UserMain from '../components/UserMain';
import googleIcon from '../assets/icons/googleIcon.svg';
import alertIcon from '../assets/icons/alert.svg'
import { register, loginGoogle } from '../services';

function Signup() {
    let navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState(null);
    //TODO: Optimize this function
    const verificationSingUp = async (event) => {
        event.preventDefault();
        let seemsOk = true;
        const username = document.getElementById('username');
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        const rePassword = document.getElementById('confirmPassword');
        username.classList.remove('border-red-500');
        email.classList.remove('border-red-500');
        password.classList.remove('border-red-500');
        rePassword.classList.remove('border-red-500');
        if (!username.value) {
            seemsOk = false;
            username.classList.add('border-red-500');
            username.classList.add("animate-shake");
            setTimeout(() => {
                username.classList.remove("animate-shake");
            }, 1200);
        }
        if (!email.value || !email.value.includes('@') || !email.value.includes('.')) {
            seemsOk = false;
            email.classList.add('border-red-500');
            email.classList.add("animate-shake");
            setTimeout(() => {
                email.classList.remove("animate-shake");
            }, 1200);
        }
        if (!password.value || password.value.length < 8) {
            seemsOk = false;
            password.classList.add('border-red-500');
            password.classList.add("animate-shake");
            if (password.value) {
                setMessage('Password must be at least 8 characters long');
            }
            setTimeout(() => {
                password.classList.remove("animate-shake");
            }, 1200);
        }
        if (!rePassword.value) {
            seemsOk = false;
            rePassword.classList.add('border-red-500');
            rePassword.classList.add("animate-shake");
            setTimeout(() => {
                rePassword.classList.remove("animate-shake");
            }, 1200);
        }
        if (password.value !== rePassword.value) {
            seemsOk = false;
            password.classList.add('border-red-500');
            rePassword.classList.add('border-red-500');
            password.classList.add("animate-shake");
            rePassword.classList.add("animate-shake");
            setTimeout(() => {
                password.classList.remove("animate-shake");
                rePassword.classList.remove("animate-shake");
            }, 1200);
        }
        if (seemsOk) {
            const userResponse = await register(username.value, email.value, password.value, rePassword.value);

            if (userResponse && userResponse.token) {
                localStorage.setItem('token', userResponse.token);
                localStorage.setItem('userData', JSON.stringify({ userUrl: userResponse.userUrl }));
                navigate('/');
            }
            if (userResponse && userResponse.message) {
                setMessage(userResponse.message);
            }
            setUser(userResponse); // Update the user state
        }
    }

    const googleSignUp = useGoogleLogin({
        onSuccess: (codeResponse) => {
            fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${codeResponse.access_token}`,
                    Accept: 'application/json'
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(async (data) => {
                    const userResponse = await loginGoogle(codeResponse.access_token);
                    if (userResponse && userResponse.token) {
                        localStorage.setItem('token', userResponse.token);
                        localStorage.setItem('userData', JSON.stringify(userResponse));
                        navigate('/');
                    }
                    if (userResponse && userResponse.message) {
                        setMessage(userResponse.message);
                    }
                    setUser(userResponse); // Update the user state
                })
                .catch(error => {
                    console.error('Error fetching user profile:', error);
                });
        },
        onError: (error) => console.error('Login error:', error)
    });

    return (
        <UserMain>
            <form className="flex flex-col w-64 gap-4" action="" onSubmit={verificationSingUp}>
                <div className='w-full'>
                    <label htmlFor="username" className='text-black font-semibold tracking-tighter opacity-70'>Username</label>
                    <input id="username" className="p-2 bg-white rounded-lg font-montserrat border border-gray-500 border-opacity-30 w-full text-black outline-none focus:border-opacity-80 transition-all duration-200" type="text" />
                </div>
                <div className='w-full'>
                    <label htmlFor="email" className='text-black font-semibold tracking-tighter opacity-70'>Email</label>
                    <input id="email" className="p-2 bg-white rounded-lg font-montserrat border border-gray-500 border-opacity-30 w-full text-black outline-none focus:border-opacity-80 transition-all duration-200" type="text" />
                </div>
                <div className='w-full'>
                    <label htmlFor="password" className='text-black font-semibold tracking-tighter opacity-70'>Password</label>
                    <input id="password" className="p-2 bg-white rounded-lg font-montserrat border border-gray-500 border-opacity-30 w-full text-black outline-none focus:border-opacity-80 transition-all duration-200" type="password" />
                </div>
                <div className='w-full'>
                    <label htmlFor="confirmPassword" className='text-black font-semibold tracking-tighter opacity-70'>Confirm password</label>
                    <input id="confirmPassword" className="p-2 bg-white rounded-lg font-montserrat border border-gray-500 border-opacity-30 w-full text-black outline-none focus:border-opacity-80 transition-all duration-200" type="password" />
                </div>
                <div className='flex flex-row items-center gap-2 p-3 border rounded-lg bg-yellow-300 bg-opacity-40'>
                    <img className='w-14 opacity-70' src={alertIcon} alt="" />
                    <p className='text-xs text-black text-opacity-70'>By registering, you accept our <Link to={"/help#cookiesPolicy"} className='underline text-black text-opacity-100' >terms and conditions</Link>.</p>
                </div>
                <button className="mt-2 h-12 bg-gradient-to-r from-primary to-secondary border-none hover:opacity-75 transition-all duration-200 rounded-lg text-white font-bold" type="submit">Sign up</button>
                <p className='text-red-400 text-center'>{message ? message : ''}</p>
            </form>
            <div className='flex flex-row items-center justify-between w-11/12 my-2'>
                <hr className='w-24 border-1 border-gray-500 border-opacity-30' />
                <p className='text-gray-500 font-normal tracking-tighter opacity-70 mx-2 my-auto'>or</p>
                <hr className='w-24 border-1 border-gray-500 border-opacity-30' />
            </div>
            <button className='flex items-center justify-center gap-3 w-full h-12 mb-4 bg-white border border-gray-500 border-opacity-40 text-gray-500 rounded-lg' onClick={googleSignUp}>
                <img src={googleIcon} alt="" className='w-6' />
                Login with Google
            </button>
            <Link to={"/login"} className='text-primary font-normal tracking-tight w-full transition-all duration-200 hover:text-purple-500'>Have an account? Log in</Link>
        </UserMain>
    )
}

export default Signup;