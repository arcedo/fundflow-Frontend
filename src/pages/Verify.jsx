import React, { useState } from 'react';
import UserMain from '../components/UserMain';

async function verifyUser() {
}

var verified = false;
let status = "Verifying your account...";

function Verify() {
    return (
        <UserMain>
            <div className='text-black'>
                <h2 className='text-xl font-bold'>{status}</h2>
            </div>
        </UserMain>
    )
}

export default Verify;