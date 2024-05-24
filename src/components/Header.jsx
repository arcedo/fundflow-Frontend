import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import MdlCreateProject from "./MdlCreateProject";
import MdlLoginNeeded from "./MdlLoginNeeded";
import MdlVerifyUser from "./MdlVerifyUser";
import fundLogo from "../assets/icons/logoLight.png";
import plus from "../assets/icons/plus.svg";
import search from "../assets/icons/search.svg";
import account from "../assets/icons/account.svg";
import alert from "../assets/icons/alertRed.svg";

function Header({ categoriesDisabled }) {
    let navigate = useNavigate();
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(!categoriesDisabled);
    const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams.get("query") || '');

    useEffect(() => {
        setVisible(!categoriesDisabled);
    }, [categoriesDisabled]);

    const userData = JSON.parse(localStorage.getItem('userData'));

    if (!categoriesDisabled) {
        useEffect(() => {
            function handleScroll() {
                const currentScrollPos = window.pageYOffset;
                setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 200);
                setPrevScrollPos(currentScrollPos);
            }

            window.addEventListener('scroll', handleScroll);

            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }, [prevScrollPos]);
    }

    const handleMouseEnter = () => {
        setVisible(true);
    };

    const handleMouseLeave = () => {
        const currentScrollPos = window.pageYOffset;
        if (!categoriesDisabled) {
            if (currentScrollPos > 200) {
                setVisible(false);
            }
        }
        else {
            setVisible(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            searchButton();
        }
        if (e.key === "Delete") {
            setSearchQuery(searchQuery.slice(0, -1));
            searchButton();
        }
    }

    function searchButton() {
        setSearchParams({ query: searchQuery });
        navigate(`/search?query=${searchQuery}`);
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

    const openCreateProjectModal = () => {
        if (!localStorage.getItem('userData')) {
            openLoginNeededModal();
        } else if (!JSON.parse(localStorage.getItem('userData')).verifiedEmail) {
            openVerifyUserModal();
        } else {
            handleMouseLeave();
            setShowCreateProjectModal(true);
        }
    };

    const closeCreateProjectModal = () => {
        setShowCreateProjectModal(false);
    };

    return (
        <div className="flex flex-col justify-center w-screen lg:w-full items-center fixed z-40" onMouseLeave={handleMouseLeave}>
            {showCreateProjectModal && <MdlCreateProject onClose={closeCreateProjectModal} />}
            {showVerifyUserModal && <MdlVerifyUser onClose={closeVerifyUserModal} />}
            {showLoginNeededModal && <MdlLoginNeeded onClose={closeLoginNeededModal} />}
            <div className="flex w-full shadow-md z-30" onMouseEnter={handleMouseEnter}>
                <div className="flex justify-center items-center w-full bg-white">
                    <div className="flex justify-between items-center w-10/12 gap-5 lg:gap-0 lg:w-11/12 h-20 bg-white">
                        <Link to={"/home"} className="group flex justify-center items-center gap-4">
                            <img className="w-14 md:w-10 rounded-md" src={fundLogo} alt="" />
                            <h1 className='font-montserrat text-black group-hover:bg-gradient-to-r from-primary to-secondary hidden lg:inline-block group-hover:text-transparent bg-clip-text text-3xl font-bold transition-all duration-500' >fundflow.</h1>
                        </Link>
                        <div className="hidden lg:flex gap-16">
                            <Link to={"/about"} className="text-black font-montserrat font-semibold text-sm hover:text-secondary transition-colors duration-300">who we are</Link>
                            <Link to={"/help"} className="text-black font-montserrat font-semibold text-sm hover:text-secondary transition-colors duration-300">help</Link>
                        </div>
                        <div className="flex gap-2 w-6/12">
                            <input
                                id="searchBar"
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="hidden lg:block p-2 px-4 h-11 w-full bg-white rounded-lg font-dmsans border border-gray-500 border-opacity-30 text-black outline-none focus:border-opacity-80 transition-all duration-200"
                                placeholder="what are you looking for?"
                            />
                            <button onClick={searchButton} className="hidden lg:block h-11 w-11 rounded-full bg-white" style={{ backgroundImage: `url(${search})`, backgroundSize: `1.5rem 1.5rem`, backgroundPosition: `center`, backgroundRepeat: `no-repeat` }}></button>
                        </div>
                        <button onClick={openCreateProjectModal} className="hidden lg:flex justify-center items-center gap-2.5 h-11 w-32 font-dmsans font-semibold text-xl text-white rounded-lg bg-gradient-to-r from-primary to-secondary hover:opacity-75 transition-all duration-200 border-none">
                            <img src={plus} alt="" />
                            new
                        </button>
                        <button onClick={searchButton} className="flex items-center lg:hidden h-11 w-11 rounded-full bg-white"><img src={search} className="w-full" alt="search" /></button>
                        <button onClick={openCreateProjectModal} className="flex lg:hidden justify-center items-center rounded-full p-1 font-dmsans font-semibold text-xl text-white bg-gradient-to-r from-primary to-secondary hover:opacity-75 transition-all duration-200 border-none">
                            <img className="w-12 md:w-9" src={plus} alt="" />
                        </button>
                        <Link to={userData ? `/profile/${userData.userUrl}` : "/login"} className={`${userData ? 'bg-gradient-to-r from-primary to-secondary p-0.5' : 'bg-black overflow-hidden w-auto h-auto lg:w-11 lg:h-11 px-0.5'} h-11 w-11 shadow-md group flex justify-center items-center rounded-full`}>
                            {userData ? <div className="relative">
                                {userData.verifiedEmail ? null : <div className="bg-white absolute z-30 -top-2 -right-2 rounded-full"><img src={alert} alt="" className="w-7" /></div>}
                                <div className="h-11 w-11 overflow-hidden rounded-full">
                                    <img src={`${import.meta.env.VITE_API_URL}users/${userData.userUrl}/profilePicture`} alt="Your avatar" className="w-full h-full rounded-full group-hover:scale-125 scale-110 transition-all duration-300" />
                                </div>
                            </div>
                                : <img src={account} alt="Login" className="group-hover:grayscale-0 grayscale w-full h-full transition-all duration-300" />
                            }
                        </Link>
                    </div>
                </div>
            </div>
            <div className={`hidden lg:flex shadow-md font-montserrat font-semibold justify-center items-center h-9 w-full gap-24 bg-gradient-to-r from-primary to-secondary ${visible ? '' : 'headerCategories'} absolute -bottom-9 transition-all duration-200 z-20 delay-100`}>
                <Link className=" text-white border-b-2 border-transparent hover:border-white transition-all duration-200" to={"/search?query=&category=1"}>art</Link>
                <Link className=" text-white border-b-2 border-transparent hover:border-white transition-all duration-200" to={"/search?query=&category=6"}>dev</Link>
                <Link className=" text-white border-b-2 border-transparent hover:border-white transition-all duration-200" to={"/search?query=&category=4"}>games</Link>
                <Link className=" text-white border-b-2 border-transparent hover:border-white transition-all duration-200" to={"/search?query=&category=2"}>music</Link>
                <Link className=" text-white border-b-2 border-transparent hover:border-white transition-all duration-200" to={"/search?query=&category=3"}>books</Link>
                <Link className=" text-white border-b-2 border-transparent hover:border-white transition-all duration-200" to={"/search?query=&category=5"}>innove</Link>
            </div>
        </div>
    );
}

export default Header;
