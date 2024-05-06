import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Settings() {
    // State to store the bio text
    const [bio, setBio] = useState("");

    // Event handler for changing the bio
    const handleBioChange = (event) => {
        setBio(event.target.value);
    };

    // Determine the border color based on the character count
    const bioStyle = bio.length > 250 ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-gray-300";

    return (
        <div className="w-full bg-gray-200 min-h-screen overflow-hidden h-fit flex flex-col gap-10">
            <Header categoriesDisabled={true}/>
            <div className="flex flex-col items-center justify-center pt-32">
                <div className="w-10/12 items-center justify-start">
                    <h2 className="font-dmsans text-3xl font-semibold text-opacity-75 text-black mb-4">profile settings</h2>
                    <div className="grid grid-cols-2 gap-14">
                        <div className="flex flex-col gap-4">
                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex flex-col gap-2">
                                    <label className="font-dmsans text-lg text-black text-opacity-70 font-semibold w-fit" htmlFor="username">username</label>
                                    <input className="font-dmsans text-lg text-black font-normal border-2 border-gray-300 bg-white p-2 rounded-md outline-none focus:border-gray-400 transition-all duration-200" type="text" id="username" name="username" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-dmsans text-lg text-black text-opacity-70 font-semibold w-fit" htmlFor="name">name</label>
                                    <input className="font-dmsans text-lg text-black font-normal border-2 border-gray-300 bg-white p-2 rounded-md outline-none focus:border-gray-400 transition-all duration-200" type="text" id="name" name="name" />
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
                                    value={bio}
                                    onChange={handleBioChange}
                                ></textarea>
                                <p className={`text-right font-dmsans text-md ${bio.length > 250 ? 'text-red-500' : 'text-black text-opacity-70'}`}>{bio.length}/250</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="font-dmsans text-lg text-black text-opacity-70 font-semibold w-fit" htmlFor="email">email</label>
                                <input className="font-dmsans text-lg text-black font-normal border-2 border-gray-300 bg-white p-2 rounded-md outline-none focus:border-gray-400 transition-all duration-200" type="email" id="email" name="email" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="font-dmsans text-lg text-black text-opacity-70 font-semibold w-fit" htmlFor="password">current password</label>
                                <input className="font-dmsans text-lg text-black font-normal border-2 border-gray-300 bg-white p-2 rounded-md outline-none focus:border-gray-400 transition-all duration-200" type="password" id="password" name="password" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <h3 className="font-dmsans text-lg font-semibold text-black text-opacity-70">profile picture</h3>
                                <div className="flex flex-col gap-2 justify-center items-center">
                                    <img className="w-52 h-52 rounded-full" src="https://image.api.playstation.com/cdn/UP1477/CUSA07022_00/qUCRmkxrJ2H2CxLIAUPIpWFFGuQn5H3i.png?w=440&thumb=false"></img>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="font-dmsans text-lg font-semibold text-black text-opacity-70">banner picture</h3>
                                <div className="flex flex-col gap-2 justify-center items-center">
                                    <img className="w-full h-60 rounded-md object-cover" src="https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2022/05/00-lead-windows-default-wallpaper.jpg"></img>
                                </div>
                                <p className="font-dmsans text-md text-black text-opacity-70 text-right">1920x800 recommended</p>
                            </div>
                        </div>
                    </div>
                    <button className="h-12 w-2/12 bg-gradient-to-r opacity-70 from-primary to-secondary rounded-md text-white font-semibold font-dmsans shadow hover:opacity-100 transition-all duration-200">Save changes</button>
                    <h2 className="font-dmsans text-3xl font-semibold text-opacity-75 text-black mt-8 mb-5">account security</h2>
                    <div className="grid grid-cols-2 gap-14">
                        <div className="flex flex-col  gap-4">
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-2">
                                    <label className="font-dmsans text-lg text-black text-opacity-70 font-semibold w-fit" htmlFor="changeCurrentPassword">current password</label>
                                    <input className="font-dmsans text-lg text-black font-normal border-2 border-gray-300 bg-white p-2 rounded-md outline-none focus:border-gray-400 transition-all duration-200" type="password" id="changeCurrentPassword" name="changeCurrentPassword" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-dmsans text-lg text-black text-opacity-70 font-semibold w-fit" htmlFor="newPassword">new password</label>
                                    <input className="font-dmsans text-lg text-black font-normal border-2 border-gray-300 bg-white p-2 rounded-md outline-none focus:border-gray-400 transition-all duration-200" type="password" id="newPassword" name="newPassword" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-dmsans text-lg text-black text-opacity-70 font-semibold w-fit" htmlFor="confirmNewPassword">confirm new password</label>
                                    <input className="font-dmsans text-lg text-black font-normal border-2 border-gray-300 bg-white p-2 rounded-md outline-none focus:border-gray-400 transition-all duration-200" type="password" id="confirmNewPassword" name="confirmNewPassword" />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <h3 className="font-dmsans text-lg text-black text-opacity-70 font-semibold w-fit">account deletion</h3>
                                <p className="font-dmsans text-md text-black text-opacity-70">If you don't wish to keep using our services, you can request that we <span className="text-red-600 font-semibold">delete your account</span>.<br/></p>
                                <ul className="list-disc pl-5 opacity-70">
                                    <li className="font-dmsans text-md text-black">Your profile will become inaccessible</li>
                                    <li className="font-dmsans text-md text-black">Your projects and reviews will stay in our platform, but people will not be able to interact</li>
                                </ul>
                                <p className="font-dmsans text-md text-black text-opacity-70">Once you delete your account, <span className="text-red-600 font-semibold">there is no going back</span>. Please be certain.</p>
                            </div>
                            <button className="h-12 w-3/12 border-2 border-red-600 rounded-md text-red-600 hover:bg-red-600 hover:text-white font-semibold font-dmsans transition-all duration-200">Delete account</button>
                        </div>
                    </div>
                    <button className="h-12 w-2/12 mt-8 bg-gradient-to-r opacity-70 from-primary to-secondary rounded-md text-white font-semibold font-dmsans shadow hover:opacity-100 transition-all duration-200">Change password</button>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Settings;
