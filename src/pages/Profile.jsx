import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProfileSection from "../components/ProfileSection";
import MdlFollows from "../components/MdlFollows";
import MdlVerifyUser from "../components/MdlVerifyUser";
import MdlLoginNeeded from "../components/MdlLoginNeeded";
import logout from "../assets/icons/logout.svg";
import edit from "../assets/icons/edit.svg";
import notFollowing from "../assets/icons/follow.svg";
import following from "../assets/icons/check.svg";
import { getUserByUrl, getProjectByCreator, doesUserFollow, followUser, unfollowUser, getFollowers, getFollowing, getProjectsByUserStatus } from "../services/index";

function Profile() {
    const skip = 0;
    const limit = 8;
    let navigate = useNavigate();
    const { userUrl } = useParams();
    const userData = JSON.parse(localStorage.getItem('userData'));
    const [isFollowing, setIsFollowing] = useState(false);
    const [user, setUser] = useState(null);
    const [projects, setProjects] = useState([]);
    const [likedProjects, setLikedProjects] = useState([]);
    const [dislikedProjects, setDislikedProjects] = useState([]);
    const [collaboratingProjects, setCollaboratingProjects] = useState([]);

    useEffect(() => {
        closeFollowsModal();
        const fetchUserAndProjects = async () => {
            await getUserByUrl(userUrl)
                .then(async (data) => {
                    if (data.message) {
                        navigate('/not-found');
                        return;
                    } else {
                        setUser(data[0]);
                        // If the user is the same as the logged in user, update the user data in the local storage
                        // This way we can update the verified email status of the user
                        if (userData && userData.userUrl === data[0].url) {
                            userData.verifiedEmail = data[0].verifiedEmail;
                            localStorage.setItem('userData', JSON.stringify(userData));
                        } else if (userData) {
                            await doesUserFollow(localStorage.getItem('token'), data[0].url, userData.userUrl)
                                .then((res) => {
                                    if (res.code === 200) {
                                        setIsFollowing(true);
                                    }
                                });
                        }
                        await getProjectByCreator(data[0].id, skip, limit)
                            .then(projects => {
                                setProjects(projects);
                            });
                        if (userData && userData.userUrl === userUrl) {
                            await getProjectsByUserStatus(localStorage.getItem('token'), 'like', skip, limit)
                                .then(projects => {
                                    setLikedProjects(projects);
                                });
                            await getProjectsByUserStatus(localStorage.getItem('token'), 'dislike', skip, limit)
                                .then(projects => {
                                    setDislikedProjects(projects);
                                });
                        }
                        await getProjectsByUserStatus(localStorage.getItem('token'), 'both', skip, limit, data[0].id)
                            .then(projects => {
                                setCollaboratingProjects(projects);
                            });
                    }
                });
        }
        fetchUserAndProjects();
    }, [userUrl, isFollowing]);

    useEffect(() => {
        document.title = (user ? user.username : '') + "'s profile · fundflow";
    }, [user]);    

    const logoutUser = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        navigate('/login');
    }

    async function handleFollow() {
        if (!userData) {
            openLoginNeededModal();
            return;
        }
        if (!userData.verifiedEmail) {
            openVerifyUserModal();
            return;
        }
        await followUser(localStorage.getItem('token'), user.url, userData.userUrl)
            .then((res) => {
                if (res.code === 201) {
                    setIsFollowing(true);
                }
            });
    }

    async function handleUnFollow() {
        if (!userData) {
            openLoginNeededModal();
            return;
        }
        if (!userData.verifiedEmail) {
            openVerifyUserModal();
            return;
        }
        await unfollowUser(localStorage.getItem('token'), user.url, userData.userUrl)
            .then((res) => {
                if (res.code === 200) {
                    setIsFollowing(false);
                }
            });
    }

    const [showVerifyUserModal, setShowVerifyUserModal] = useState(false);
    const openVerifyUserModal = () => {
        setShowVerifyUserModal(true);
    };
    const closeVerifyUserModal = () => {
        setShowVerifyUserModal(false);
    };

    const [showLoginNeededModal, setShowLoginNeededModal] = useState(false);
    const openLoginNeededModal = () => {
        setShowLoginNeededModal(true);
    };
    const closeLoginNeededModal = () => {
        setShowLoginNeededModal(false);
    };

    const [followModal, setFollowModal] = useState({ visible: false, type: '' });

    async function openFollowsModal(type) {
        if (!userData) {
            openLoginNeededModal();
            return;
        } else {
            const followers = await getFollowers(localStorage.getItem('token'), user.url)
            const following = await getFollowing(localStorage.getItem('token'), user.url)
            setUser({ ...user, followersUrl: followers, followingUrl: following });
            setFollowModal({ visible: true, type });
        }
    };

    const closeFollowsModal = () => {
        setFollowModal({ visible: false, type: '' });
    };
    return (
        <div className="w-full bg-gray-200 min-h-screen overflow-hidden h-fit flex flex-col gap-10">
            {followModal.visible && <MdlFollows onClose={closeFollowsModal} user={user} type={followModal.type} setUser={setUser} sameUser={user.url === userData.userUrl} />}
            {showVerifyUserModal && <MdlVerifyUser onClose={closeVerifyUserModal} />}
            {showLoginNeededModal && <MdlLoginNeeded onClose={closeLoginNeededModal} />}
            <Header categoriesDisabled={true} />
            <div className="flex flex-col items-center justify-center gap-10">
                <div className="relative flex justify-center items-start overflow-hidden w-full bg-black" style={{ height: `${window.innerWidth < 1080 ? '40vh' : '50vh'}` }}>
                    <img className="object-cover object-center w-full h-full" src={user ? `${import.meta.env.VITE_API_URL}users/${user.url}/profileBanner` : ''} alt="" />
                    {user && !user.verifiedEmail && userData.userUrl === userUrl ? (
                        <div className="absolute flex justify-center items-center py-1 w-full top-20 lg:top-auto lg:bottom-0 bg-red-500">
                            <button onClick={openVerifyUserModal} className="font-dmsans text-white font-bold underline">Your account isn't verified yet.</button>
                        </div>) : null}
                </div>
            </div>
            <div className="flex flex-col justify-center items-center fade-in">
                <div className="relative w-10/12">
                    <div className="absolute left-1/4 lg:left-0 -top-32 md:-top-44 flex flex-col w-40 sm:w-72 h-40 sm:h-72 bg-gradient-to-r overflow-hidden from-primary to-secondary rounded-full shadow-xl">
                        <img className="w-full h-full" src={user ? `${import.meta.env.VITE_API_URL}users/${user.url}/profilePicture` : 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'} />
                    </div>
                    <div className="flex flex-col lg:flex-row justify-center items-center lg:justify-between lg:items-start gap-10 md:mt-24 lg:mt-0 lg:gap-28">
                        <div className="w-2/12 mr-8">
                        </div>
                        <div className="flex flex-col gap-4 w-8/12 fade-in" style={{ animationDelay: `0.05s` }}>
                            <div className="flex flex-col lg:flex-row items-center lg:items-end">
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-montserrat font-extrabold text-black">{user ? user.username : ''}</h2>
                                <p className="text-black font-semibold text-lg font-dmsans text-opacity-70">&nbsp; {user && user.name ? user.name : ''} {user && user.lastName ? user.lastName : ''}</p>
                            </div>
                            <div className="flex justify-center items-center lg:justify-normal lg:items-start gap-5">
                                {/* <p className="text-black font-normal font-dmsans text-opacity-70"><span className="text-black font-bold text-opacity-100">{user && user.stats ? user.stats.rating : '-'}</span> positive rating</p> */}
                                <button onClick={() => openFollowsModal('followers')} className="text-black font-normal font-dmsans text-opacity-70 border-b-2 border-transparent hover:border-black transition-all duration-200"><span className="text-black font-bold text-opacity-100">{user && user.followers ? user.followers : 0}</span> followers</button>
                                <button onClick={() => openFollowsModal('following')} className="text-black font-normal font-dmsans text-opacity-70 border-b-2 border-transparent hover:border-black transition-all duration-200"><span className="text-black font-bold text-opacity-100">{user && user.following ? user.following : 0}</span> following</button>
                            </div>
                            <p className="font-dmsans text-black">{user && user.biography ? user.biography : ''}</p>
                        </div>
                        <div className="w-2/12 flex justify-center items-center fade-in" style={{ animationDelay: `0.1s` }}>
                            {userData && userData.userUrl === userUrl ? (
                                <div className="flex flex-col gap-3">
                                    <Link to={"/settings"} className="px-4 flex gap-3 justify-center items-center w-36 h-12 bg-gray-300 hover:bg-secondary hover:translate-x-1.5 rounded-md text-black font-semibold font-dmsans shadow transition-all duration-200">
                                        edit
                                        <img className="w-7" src={edit} alt="edit" />
                                    </Link>
                                    <button className="px-4 flex gap-3 justify-center items-center w-36 h-12 bg-gray-300 hover:bg-red-500 hover:translate-x-1.5 rounded-md text-black font-semibold font-dmsans shadow transition-all duration-200" onClick={logoutUser}>
                                        log out
                                        <img className="w-7" src={logout} alt="logout" />
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    {isFollowing ? (
                                        <button onClick={handleUnFollow} className="px-4 flex gap-3 justify-center items-center w-36 h-12 bg-gradient-to-r opacity-70 from-primary to-secondary rounded-md text-white font-semibold font-dmsans shadow hover:opacity-100 transition-all duration-200">
                                            following<img className="w-6" src={following} alt="following" />
                                        </button>
                                    ) : (
                                        <button onClick={handleFollow} className="px-4 flex gap-3 justify-center items-center w-36 h-12 bg-gray-300 hover:bg-gray-400 hover:bg-opacity-70 rounded-md text-black font-semibold font-dmsans shadow transition-all duration-200">
                                            follow<img className="w-6" src={notFollowing} alt="not following" />
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <ProfileSection belongingUser={userData && userData.userUrl === userUrl ? true : false} ownerProjects={projects} likedProjects={likedProjects} dislikedProjects={dislikedProjects} collaboratingProjects={collaboratingProjects} user={user} />
            <Footer />
        </div >
    );
}

export default Profile;