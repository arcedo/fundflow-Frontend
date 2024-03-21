import React from 'react';
import UserMain from '../components/UserMain';

function Signup(){
    return (
        <UserMain>
            <form className="flex flex-col w-64" action="">
                <input className="p-2 mb-4 bg-slate-200 rounded-lg" type="text" placeholder="Username" />
                <input className="p-2 mb-4 bg-slate-200 rounded-lg" type="password" placeholder="Password" />
                <input className="p-2 mb-4 bg-slate-200 rounded-lg" type="password" placeholder="Confirm Password" />
                <button className="p-2 bg-slate-300 rounded-lg" type="submit">Sign up</button>
            </form>
            <a href="/login">Login</a>
        </UserMain>
    )
}

export default Signup;