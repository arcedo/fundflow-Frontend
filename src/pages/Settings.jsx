import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MdlDeleteUser from "../components/MdlDeleteUser";
import { useNavigate } from "react-router-dom";
import { getLoggedUser, changeUserPassword } from "../services";
import passAlert from "../assets/icons/passAlert.svg";
import { verifyEmail } from "../services";

function Settings() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    let navigate = useNavigate();
    if (!localStorage.getItem('token')) {
        navigate('/login');
    }

    const [emailSent, setEmailSent] = useState(false);

    const resendEmail = async () => {
        await verifyEmail(localStorage.getItem('token'))
            .then((data) => {
                if (data.code === 200) {
                    setEmailSent(true);
                }
            });
    }

    const [currentUser, setCurrentUser] = useState({ username: '', email: '', biography: '' });
    useEffect(() => {
        const fetchUser = async () => {
            await getLoggedUser(localStorage.getItem('token'))
                .then(user => {
                    setCurrentUser(user[0]);
                    userData.verifiedEmail = user[0].verifiedEmail;
                    localStorage.setItem('userData', JSON.stringify(userData));
                });
        }
        fetchUser();
    }, []);

    const fileInputRefProfile = useRef(null);
    const fileInputRefBanner = useRef(null);
    const handleBioChange = (event) => {
        setBio(event.target.value);
        handleInputChange(event);
    };
    const handleProfileImageChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleBannerImageChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setBannerImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleProfileImageClick = () => {
        fileInputRefProfile.current.click();
    };
    const handleBannerImageClick = () => {
        fileInputRefBanner.current.click();
    };

    const [bio, setBio] = useState("");
    const bioStyle = bio.length > 250 ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-gray-300";

    const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
    const openDeleteUserModal = () => {
        setShowDeleteUserModal(true);
    };
    const closeDeleteUserModal = () => {
        setShowDeleteUserModal(false);
    };

    const handleSaveChanges = (event) => {
        event.preventDefault();
        console.log('Save changes');
    }
    const [changePasswordMessage, setChangePasswordMessage] = useState('');
    const handleChangePassword = async (event) => {
        event.preventDefault();
        let seemsOk = true;
        const password = document.getElementById('changeCurrentPassword');
        const newPassword = document.getElementById('newPassword');
        const confirmationPassword = document.getElementById('confirmNewPassword');
        password.classList.remove('border-red-500');
        newPassword.classList.remove('border-red-500');
        confirmationPassword.classList.remove('border-red-500');
        setChangePasswordMessage('');
        if (!password.value) {
            seemsOk = false;
            password.classList.add('border-red-500');
            password.classList.add("animate-shake");
            setTimeout(() => {
                password.classList.remove("animate-shake");
            }, 1200);
        }
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
            setChangePasswordMessage('Please fill all the required fields');
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
            setChangePasswordMessage('Passwords do not match or are too short');
        }
        if (seemsOk) {
            const response = await changeUserPassword(localStorage.getItem('token'), password.value, newPassword.value, confirmationPassword.value);
            if (response && !response.id) {
                setChangePasswordMessage(response.message);
            } else {
                //TODO: Show success message
                console.log('Password changed successfully');
            }
            console.log(response);
        }
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCurrentUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };
    console.log(currentUser);

    // esto es la variable que pilla si es user de google o no y pone el blur
    const googleUserFormStyle = currentUser && currentUser.googleAccount || !currentUser.verifiedEmail ? "blur-sm pointer-events-none" : "";

    return (
        <div className="w-full bg-gray-200 min-h-screen overflow-hidden h-fit flex flex-col gap-10">
            {showDeleteUserModal && <MdlDeleteUser onClose={closeDeleteUserModal} email={currentUser.email} />}
            <Header categoriesDisabled={true} />
            <div className="flex flex-col items-center justify-center pt-32 fade-in">
                <div className="w-10/12 items-center justify-start">
                    <div>
                        <h2 className="font-dmsans text-3xl font-semibold text-opacity-75 text-black">profile settings</h2>
                        <hr className="w-full h-0.5 mb-4 bg-555 bg-opacity-50 rounded-full" />
                        {/* div relativo pa que se ponga encima, hace el check de si es user de google y pone el div absolute */}
                        <div className="relative">                        
                            {currentUser && currentUser.googleAccount ?
                            <div className="absolute w-full h-full z-30 flex justify-center items-center">
                                <div className="w-4/12 bg-white backdrop-blur-xl bg-opacity-90 rounded-lg px-8 py-7 shadow-xl">
                                    <div className="flex flex-col gap-4 items-center justify-center">
                                        <div className="w-full flex flex-col gap-1">
                                            <img className="w-16" src={passAlert} alt="Password alert" />
                                            <h3 className="font-dmsans font-semibold text-2xl text-black">Password setup required</h3>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <p className="font-dmsans text-black text-md text-opacity-70">Due to our privacy policy, we require that Google users <span className="font-bold text-black">set up a password</span> before they can change their user settings.</p>
                                            <p className="font-dmsans text-black text-md text-opacity-70">You only need to do this once, and you will still be able to keep using the Google login alongside ours.</p>  
                                            <p className="font-dmsans text-black text-md text-opacity-70">We'll <span className="font-bold text-black">send you an email</span> with instructions to set it up.</p>
                                        </div>
                                        <button className="w-full self-center mx-auto bg-gradient-to-r from-primary to-secondary rounded-md text-white font-dmsans font-bold shadow-md hover:shadow-none transition-all duration-300 p-3.5">
                                            Send email
                                        </button>
                                    </div>
                                </div>
                            </div> : ''}
                            {currentUser && !currentUser.verifiedEmail ? 
                            <div className="absolute w-full h-full z-30 flex justify-center items-center">
                                <div className="w-4/12 bg-white backdrop-blur-xl bg-opacity-90 rounded-lg px-8 py-7 shadow-xl">
                                    {emailSent ? <div>
                                        <h2 className="text-4xl font-dmsans font-bold text-black">Email sent</h2>
                                        <p className="text-black font-normal font-dmsans opacity-70">Check your inbox for a verification email. Make sure to check your spam folder.</p>
                                    </div> : 
                                    <div className="flex flex-col gap-4 items-center justify-center">
                                        <div className="w-full flex flex-col gap-1">
                                            <img className="w-16" src={passAlert} alt="Password alert" />
                                            <h3 className="font-dmsans font-semibold text-2xl text-black">Your account isn't verified</h3>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <p className="font-dmsans text-black text-md text-opacity-70">You need to <span className="font-bold text-black">verify your account</span> before you can change your user settings.</p>
                                            <p className="font-dmsans text-black text-md text-opacity-70">Check your inbox for the email we sent you at signup.</p>  
                                            <p className="font-dmsans text-black text-md text-opacity-70"><span className="font-bold text-black">Can't find it?</span> Click the button and we'll send you another.</p>
                                        </div>
                                        <button onClick={resendEmail} className="w-full self-center mx-auto bg-gradient-to-r from-primary to-secondary rounded-md text-white font-dmsans font-bold shadow-md hover:shadow-none transition-all duration-300 p-3.5">
                                            Send email
                                        </button>
                                    </div>}                                    
                                </div>
                            </div> : ''}
                            {/* el form coge la variable del blur. everything else is the same as before */}
                            <form className={`grid grid-cols-2 gap-x-14 ${googleUserFormStyle}`} onSubmit={handleSaveChanges}>
                                <div className="flex flex-col gap-4">
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="flex flex-col gap-2">
                                            <label className="font-dmsans text-lg text-black text-opacity-70 font-semibold w-fit" htmlFor="username">username <span className="text-red-600">*</span></label>
                                            <input value={currentUser ? currentUser.username : ''} onChange={handleInputChange} className="font-dmsans text-lg text-black font-normal border-2 border-gray-300 bg-white p-2 rounded-md outline-none focus:border-gray-400 transition-all duration-200" type="text" id="username" name="username" />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="font-dmsans text-lg text-black text-opacity-70 font-semibold w-fit" htmlFor="email">email <span className="text-red-600">*</span></label>
                                            <input value={currentUser ? currentUser.email : ''} onChange={handleInputChange} className="font-dmsans text-lg text-black font-normal border-2 border-gray-300 bg-white p-2 rounded-md outline-none focus:border-gray-400 transition-all duration-200" type="email" id="email" name="email" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="flex flex-col gap-2">
                                            <label className="font-dmsans text-lg text-black text-opacity-70 font-semibold w-fit" htmlFor="name">name</label>
                                            <input className="font-dmsans text-lg text-black font-normal border-2 border-gray-300 bg-white p-2 rounded-md outline-none focus:border-gray-400 transition-all duration-200" type="text" id="name" name="name" />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="font-dmsans text-lg text-black text-opacity-70 font-semibold w-fit" htmlFor="surname">surname</label>
                                            <input className="font-dmsans text-lg text-black font-normal border-2 border-gray-300 bg-white p-2 rounded-md outline-none focus:border-gray-400 transition-all duration-200" type="text" id="surname" name="surname" />
                                        </div>
                                    </div>
                                    <p className="font-dmsans text-md text-black text-opacity-70">Users are identified by their username, the name will only show in the profile.</p>
                                    <div className="flex flex-col gap-2">
                                        <label className="font-dmsans text-lg text-black text-opacity-70 font-semibold w-fit" htmlFor="bio">bio</label>
                                        <textarea
                                            rows={4}
                                            className={`font-dmsans text-lg text-black font-normal border-2 ${bioStyle} bg-white p-2 rounded-md outline-none focus:border-gray-400 transition-all duration-200`}
                                            id="bio"
                                            name="bio"
                                            style={{ resize: 'none' }}
                                            placeholder={currentUser && currentUser.biography ? '' : "Tell us about yourself"}
                                            value={currentUser && currentUser.biography ? currentUser.biography : bio}
                                            onChange={handleBioChange}
                                        ></textarea>
                                        <p className={`text-right font-dmsans text-md ${bio.length > 250 ? 'text-red-500' : 'text-black text-opacity-70'}`}>{bio.length}/250</p>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="font-dmsans text-lg text-black text-opacity-70 font-semibold w-fit" htmlFor="password">current password <span className="text-red-600">*</span></label>
                                        <input className="font-dmsans text-lg text-black font-normal border-2 border-gray-300 bg-white p-2 rounded-md outline-none focus:border-gray-400 transition-all duration-200" type="password" id="password" name="password" />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col gap-2">
                                        <h3 className="font-dmsans text-lg font-semibold text-black text-opacity-70">profile picture</h3>
                                        <div className="flex flex-col gap-2 justify-center items-center">
                                            <img
                                                className="w-52 h-52 rounded-full cursor-pointer object-cover shadow-md hover:shadow-lg hover:brightness-50 transition-all duration-200"
                                                src={currentUser && currentUser.url ? `${import.meta.env.VITE_API_URL}users/${currentUser.url}/profilePicture` : 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'}
                                                alt="Profile"
                                                onClick={handleProfileImageClick}
                                            />
                                            <input
                                                type="file"
                                                accept="image/*"
                                                ref={fileInputRefProfile}
                                                onChange={handleProfileImageChange}
                                                style={{ display: 'none' }}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <h3 className="font-dmsans text-lg font-semibold text-black text-opacity-70">banner picture</h3>
                                        <div className="flex flex-col gap-2 justify-center">
                                            <img
                                                className="w-full h-60 rounded-md object-cover cursor-pointer shadow-md hover:shadow-lg hover:brightness-75 transition-all duration-200 bg-555"
                                                src={currentUser && currentUser.url ? `${import.meta.env.VITE_API_URL}users/${currentUser.url}/profileBanner` : ''}
                                                alt="Banner"
                                                onClick={handleBannerImageClick}
                                            />
                                            <input
                                                type="file"
                                                accept="image/*"
                                                ref={fileInputRefBanner}
                                                onChange={handleBannerImageChange}
                                                style={{ display: 'none' }}
                                            />
                                            <p className="font-dmsans text-md text-black text-opacity-70 text-right">1920x1020 recommended</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-end gap-5">
                                        <button type="submit" className="py-3.5 w-4/12 bg-gradient-to-r opacity-70 from-primary to-secondary rounded-md text-white font-semibold font-dmsans shadow hover:opacity-100 transition-all duration-200">Save changes</button>
                                        <p className="font-dmsans text-lg text-red-600">* required values</p>
                                    </div>
                                    <p className='text-red-400 font-dmsans'>{changePasswordMessage ? changePasswordMessage : ''}</p>
                                </div>
                            </form> 
                        </div>
                    </div> 
                    <h2 className="font-dmsans text-3xl font-semibold text-opacity-75 text-black mt-10">account security</h2>
                    <hr className="w-full h-0.5 mb-5 bg-555 bg-opacity-50 rounded-full" />
                    <div className="grid grid-cols-2 gap-x-14">
                        {currentUser && !currentUser.googleAccount ? 
                        <form onSubmit={handleChangePassword} className="flex flex-col  gap-8">
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-2">
                                    <label className="font-dmsans text-lg text-black text-opacity-70 font-semibold w-fit" htmlFor="changeCurrentPassword">current password <span className="text-red-600">*</span></label>
                                    <input className="font-dmsans text-lg text-black font-normal border-2 border-gray-300 bg-white p-2 rounded-md outline-none focus:border-gray-400 transition-all duration-200" type="password" id="changeCurrentPassword" name="changeCurrentPassword" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-dmsans text-lg text-black text-opacity-70 font-semibold w-fit" htmlFor="newPassword">new password <span className="text-red-600">*</span></label>
                                    <input className="font-dmsans text-lg text-black font-normal border-2 border-gray-300 bg-white p-2 rounded-md outline-none focus:border-gray-400 transition-all duration-200" type="password" id="newPassword" name="newPassword" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-dmsans text-lg text-black text-opacity-70 font-semibold w-fit" htmlFor="confirmNewPassword">confirm new password <span className="text-red-600">*</span></label>
                                    <input className="font-dmsans text-lg text-black font-normal border-2 border-gray-300 bg-white p-2 rounded-md outline-none focus:border-gray-400 transition-all duration-200" type="password" id="confirmNewPassword" name="confirmNewPassword" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="flex items-end gap-5">
                                    <button type="submit" className="py-3.5 w-4/12 bg-gradient-to-r opacity-70 from-primary to-secondary rounded-md text-white font-semibold font-dmsans shadow hover:opacity-100 transition-all duration-200">Change password</button>
                                    <p className="font-dmsans text-lg text-red-600">* required values</p>
                                </div>
                                <p className='text-red-400 font-dmsans'>{changePasswordMessage ? changePasswordMessage : ''}</p>
                            </div>
                        </form> : ''
                        }
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <h3 className="font-dmsans text-lg text-black text-opacity-70 font-semibold w-fit">account deletion</h3>
                                <p className="font-dmsans text-md text-black text-opacity-70">If you don't wish to keep using our services, you can request that we <span className="text-red-600 font-semibold">delete your account</span>.<br /></p>
                                <ul className="list-disc pl-5 opacity-70">
                                    <li className="font-dmsans text-md text-black">Your profile will become inaccessible</li>
                                    <li className="font-dmsans text-md text-black">Your projects and reviews will stay in our platform, for archive purposes</li>
                                    <li className="font-dmsans text-md text-black">However, no one will be able to interact with them</li>
                                </ul>
                                <p className="font-dmsans text-md text-black text-opacity-70">Once you delete your account, <span className="text-red-600 font-semibold">there is no going back</span>. Please be certain.</p>
                            </div>
                            <button onClick={openDeleteUserModal} className="h-12 w-3/12 border-2 border-red-600 rounded-md text-red-600 hover:bg-red-600 hover:text-white font-semibold font-dmsans transition-all duration-200">Delete account</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Settings;
