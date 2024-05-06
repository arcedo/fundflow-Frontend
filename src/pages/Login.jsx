import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import UserMain from '../components/UserMain';
import googleIcon from '../assets/icons/googleIcon.svg';
import { login } from '../services/index';

function Login() {
    let navigate = useNavigate();
    const [user, setUser] = useState(null);

    const verificationLogin = async (event) => {
        event.preventDefault();
        let seemsOk = true;
        const username = document.getElementById('email');
        const password = document.getElementById('password');
        if (!username.value) {
            seemsOk = false;
            username.classList.add('border-red-500');
            username.classList.add("animate-shake");
            setTimeout(() => {
                username.classList.remove("animate-shake");
            }, 1200);
        }
        if (!password.value) {
            seemsOk = false;
            password.classList.add('border-red-500');
            password.classList.add("animate-shake");
            setTimeout(() => {
                password.classList.remove("animate-shake");
            }, 1200);
        }
        if (seemsOk) {
            const userResponse = await login(username.value, password.value);
            if (userResponse && userResponse.token) {
                localStorage.setItem('token', userResponse.token);
                localStorage.setItem('userData', JSON.stringify({ profilePictureSrc: userResponse.profilePictureSrc, userUrl: userResponse.userUrl }));
                navigate('/');
            }
            setUser(userResponse); // Update the user state
        }
    }

    const googleLogin = useGoogleLogin({
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
                    const userResponse = await login(data.email, data.id);
                    if (userResponse && userResponse.token) {
                        localStorage.setItem('token', userResponse.token);
                        localStorage.setItem('userData', JSON.stringify(userResponse));
                        navigate('/');
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
            <form className="flex flex-col w-64 gap-4" action="" onSubmit={verificationLogin}>
                <div className='w-full'>
                    <label htmlFor="email" className='text-black font-semibold tracking-tighter opacity-70'>Username or email</label>
                    <input id="email" className="p-2 bg-white rounded-lg font-montserrat border border-gray-500 border-opacity-30 w-full text-black outline-none focus:border-opacity-80 transition-all duration-200" type="text" />
                </div>
                <div className='w-full'>
                    <label htmlFor="password" className='text-black font-semibold tracking-tighter opacity-70'>Password</label>
                    <input id='password' className="p-2 mb-2 bg-white rounded-lg font-montserrat border border-gray-500 border-opacity-30 w-full text-black outline-none focus:border-opacity-80 transition-all duration-200" type="password" />
                    <Link to={"/recover"} className='text-primary font-normal tracking-tight w-40 transition-all duration-200 hover:text-purple-500'>Forgot your password?</Link>
                </div>
                <button className="mt-2 h-12 bg-gradient-to-r from-primary to-secondary border-none bg-opacity-50 rounded-lg text-white font-bold" type="submit">Login</button>
            </form>
            <p className='text-red-400 pt-2.5 w-full'>{user && user.message ? user.message : ''}</p>
            <div className='flex flex-row items-center justify-between w-11/12 my-2'>
                <hr className='w-24 border-1 border-gray-500 border-opacity-30' />
                <p className='text-gray-500 font-normal tracking-tighter opacity-70 mx-2 my-auto'>or</p>
                <hr className='w-24 border-1 border-gray-500 border-opacity-30' />
            </div>
            {/* {profile ? (
                <div className='text-black flex flex-col'>
                    <img src={profile.picture} alt="user image" />
                    <p>{profile.name}</p>
                    <p>{profile.email}</p>
                    <button className='text-white' onClick={logOut}>Log out</button>
                </div>
            ) : ''} */}
            <button className='flex items-center justify-center gap-3 w-full h-12 mb-4 bg-white border border-gray-500 border-opacity-40 text-gray-500 rounded-lg' onClick={googleLogin}><img src={googleIcon} alt="" className='w-6' />Sign in with Google</button>
            <Link to={"/signup"} className='text-primary font-normal tracking-tight w-full transition-all duration-200 hover:text-purple-500'>Don't have an account? Sign up</Link>
        </UserMain>
    )
}

export default Login;
