import React, { useState } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import UserMain from '../pages/UserMain';
import googleIcon from '../assets/icons/googleIcon.svg';

function Login() {
    const [profile, setProfile] = useState(null);

    const login = useGoogleLogin({
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
            .then(data => {
                setProfile(data);
            })
            .catch(error => {
                console.error('Error fetching user profile:', error);
            });
        },
        onError: (error) => alert('Login Failed:', error)
    });

    const logOut = () => {
        googleLogout();
        setProfile(null);
    };

    return (
        <UserMain>
            <form className="flex flex-col w-64 gap-4" action="">
                <div className='w-full'>
                    <label for="email" className='text-black font-semibold tracking-tighter opacity-70'>Username or email</label>
                    <input id="email" className="p-2 bg-white rounded-lg font-montserrat border border-gray-500 border-opacity-30 w-full text-black outline-none focus:border-opacity-80 transition-all duration-200" type="text"/>
                </div>
                <div className='w-full'>
                    <label for="password" className='text-black font-semibold tracking-tighter opacity-70'>Password</label>
                    <input id='password' className="p-2 mb-2 bg-white rounded-lg font-montserrat border border-gray-500 border-opacity-30 w-full text-black outline-none focus:border-opacity-80 transition-all duration-200" type="password"/>
                    <a href="/recover" className='text-primary font-normal tracking-tight w-40 transition-all duration-200 hover:text-purple-500'>Forgot your password?</a>              
                </div>
                <button className="p-2 mt-2 bg-secondary bg-opacity-70 rounded-lg text-white font-bold" type="submit">Login</button>              
            </form>
            <div className='flex flex-row items-center justify-between w-11/12 my-2'>
                <hr className='w-24 border-1 border-gray-500 border-opacity-30'/>
                <p className='text-gray-500 font-normal tracking-tighter opacity-70 mx-2 my-auto'>or</p>
                <hr className='w-24 border-1 border-gray-500 border-opacity-30'/>
            </div>
            {profile ? (
                <div className='text-black flex flex-col'>
                    <img src={profile.picture} alt="user image" />
                    <p>{profile.name}</p>
                    <p>{profile.email}</p>
                    <button className='text-white' onClick={logOut}>Log out</button>
                </div>
            ) : (
                <button className='flex items-center justify-center gap-3 w-full mb-4 bg-white border-gray-500 border-opacity-30 text-gray-500' onClick={login}><img src={googleIcon} alt="" className='w-6'/>Sign in with Google</button>
            )}
            <a href="/signup" className='text-primary font-normal tracking-tight w-full transition-all duration-200 hover:text-purple-500'>Don't have an account? Sign up</a>
        </UserMain>
    )
}

export default Login;
