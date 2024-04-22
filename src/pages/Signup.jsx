import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import UserMain from '../components/UserMain';
import googleIcon from '../assets/icons/googleIcon.svg';
import alertIcon from '../assets/icons/alert.svg'

function Signup(){
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
                    <label htmlFor="username" className='text-black font-semibold tracking-tighter opacity-70'>Username</label>
                    <input id="username" className="p-2 bg-white rounded-lg font-montserrat border border-gray-500 border-opacity-30 w-full text-black outline-none focus:border-opacity-80 transition-all duration-200" type="text"/>
                </div>
                <div className='w-full'>
                    <label htmlFor="email" className='text-black font-semibold tracking-tighter opacity-70'>Email</label>
                    <input id="email" className="p-2 bg-white rounded-lg font-montserrat border border-gray-500 border-opacity-30 w-full text-black outline-none focus:border-opacity-80 transition-all duration-200" type="text"/>
                </div>
                <div className='w-full'>
                    <label htmlFor="password" className='text-black font-semibold tracking-tighter opacity-70'>Password</label>
                    <input id="password" className="p-2 bg-white rounded-lg font-montserrat border border-gray-500 border-opacity-30 w-full text-black outline-none focus:border-opacity-80 transition-all duration-200" type="password"/>           
                </div>
                <div className='w-full'>
                    <label htmlFor="confirmPassword" className='text-black font-semibold tracking-tighter opacity-70'>Confirm password</label>
                    <input id="confirmPassword" className="p-2 bg-white rounded-lg font-montserrat border border-gray-500 border-opacity-30 w-full text-black outline-none focus:border-opacity-80 transition-all duration-200" type="password"/>           
                </div>
                <div className='flex flex-row items-center gap-2 p-3 border rounded-lg bg-yellow-300 bg-opacity-40'>
                    <img className='w-14 opacity-70' src={alertIcon} alt="" />
                    <p className='text-xs text-black text-opacity-70'>By registering, you accept our <Link to={"/help"} className='underline text-black text-opacity-100' >terms and conditions</Link>.</p>
                </div>
                <button className="mt-2 h-12 bg-gradient-to-r from-primary to-secondary border-none bg-opacity-50 rounded-lg text-white font-bold" type="submit">Sign up</button>              
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
                <button className='flex items-center justify-center gap-3 w-full h-12 mb-4 bg-white border border-gray-500 border-opacity-40 text-gray-500 rounded-lg' onClick={login}><img src={googleIcon} alt="" className='w-6'/>Sign up with Google</button>
            )}
            <Link to={"/login"} className='text-primary font-normal tracking-tight w-full transition-all duration-200 hover:text-purple-500'>Have an account? Log in</Link>
        </UserMain>
    )
}

export default Signup;