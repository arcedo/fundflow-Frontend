import React from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import GridUserSection from "../components/GridUserSection";
import GridProjectSection from "../components/GridProjectSection";
import { getLatestsProjects, getCategories, searchProjects, searchUsers } from "../services/index";


function Search() {
    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get("query");

    const [categories, setCategories] = useState([]);
    const [projectsFound, setProjectsFound] = useState([]);
    const [usersFound, setUsersFound] = useState([]);
    const [limitProject, setLimitProject] = useState({ skip: 0, limit: 6, seeMore: false, noMore: false });
    const [limitUser, setLimitUser] = useState({ skip: 0, limit: 6, seeMore: false, noMore: false });

    const fetchSearchProjects = async () => {
        if (limitProject.noMore) return;

        if (searchQuery) {
            await searchProjects(searchQuery, limitProject.skip, limitProject.limit)
                .then((data) => {
                    if (!data.message) {
                        if (limitProject.seeMore) {
                            setProjectsFound(prevProjects => prevProjects.concat(data));
                        } else {
                            setProjectsFound(data);
                        }
                    } else if (!limitProject.seeMore) {
                        setProjectsFound([]);
                    } else {
                        setLimitProject(prev => ({ ...prev, noMore: true }));
                    }
                })
        } else {
            await getLatestsProjects(limitProject.skip, limitProject.limit)
                .then((data) => {
                    if (!data.message) {
                        if (limitProject.seeMore) {
                            setProjectsFound(prevProjects => prevProjects.concat(data));
                        } else {
                            setProjectsFound(data);
                        }
                    } else if (!limitProject.seeMore) {
                        setProjectsFound([]);
                    } else {
                        setLimitProject(prev => ({ ...prev, noMore: true }));
                    }
                })
        }
    };

    const fetchSearchUsers = async () => {
        if (limitUser.noMore) return;

        await searchUsers(searchQuery, limitUser.skip, limitUser.limit)
            .then((data) => {
                if (!data.message) {
                    if (limitUser.seeMore) {
                        setUsersFound(prevUsers => prevUsers.concat(data));
                    } else {
                        setUsersFound(data);
                    }
                } else if (!limitUser.seeMore) {
                    setUsersFound([]);
                } else {
                    setLimitUser(prev => ({ ...prev, noMore: true }));
                }
            })
    };

    useEffect(() => {
        const fetchCategories = async () => {
            await getCategories()
                .then((data) => {
                    setCategories(data);
                })
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        fetchSearchProjects();
    }, [searchQuery, limitProject]);

    useEffect(() => {
        fetchSearchUsers();
    }, [searchQuery, limitUser]);

    useEffect(() => {
        setLimitProject({ skip: 0, limit: 6, seeMore: false, noMore: false });
        setLimitUser({ skip: 0, limit: 6, seeMore: false, noMore: false });
    }, [searchQuery]);

    const searchCategory = (e) => {
        const category = e.target.innerText;
        setSearchParams({ query: category });
    };

    return (
        <div className="w-full bg-white min-h-screen overflow-hidden h-fit flex flex-col gap-16">
            <Header />
            <div className="flex flex-col items-center justify-center gap-10 pt-28 fade-in">
                <div className="w-11/12 flex items-start justify-center mt-10 gap-5">
                    <div className="w-2/12">
                        <div className="flex flex-col gap-2">
                            <h3 className="font-dmsans text-2xl font-semibold text-opacity-70 text-black">categories</h3>
                            <ul className="flex flex-col gap-2">
                                {categories.map((category) => (
                                    <li key={category.id} onClick={searchCategory} className="w-fit lowercase font-dmsans text-black text-opacity-75 cursor-pointer hover:text-opacity-100 transition-colors duration-200">{category.name}</li>
                                ))}
                            </ul>
                            <h3 className="mt-3 font-dmsans text-2xl font-semibold text-opacity-70 text-black">filter by</h3>
                            <p className="font-dmsans font-semibold text-black text-opacity-75">needs</p>
                            <div className="flex flex-col gap-2">
                                <div className="flex gap-2.5 items-center">
                                    <label className="container w-fit">
                                        <input id="fundCheckbox" type="checkbox" />
                                        <svg viewBox="0 0 64 64" height="1.3em" width="1.3em">
                                            <path d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16" pathLength="575.0541381835938" className="path"></path>
                                        </svg>
                                    </label>
                                    <label htmlFor="fundCheckbox" className="font-dmsans text-black text-opacity-75">funds</label>
                                </div>
                                <div className="flex gap-2.5 items-center">
                                    <label className="container w-fit">
                                        <input id="collCheckbox" type="checkbox" />
                                        <svg viewBox="0 0 64 64" height="1.3em" width="1.3em">
                                            <path d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16" pathLength="575.0541381835938" className="path"></path>
                                        </svg>
                                    </label>
                                    <label htmlFor="collCheckbox" className="font-dmsans text-black text-opacity-75">collaborators</label>
                                </div>
                            </div>
                            <p className="font-dmsans font-semibold text-black text-opacity-75">status</p>
                            <div className="flex flex-col gap-2">
                                <div className="flex gap-2.5 items-center">
                                    <label className="container w-fit">
                                        <input id="openCheckbox" type="checkbox" />
                                        <svg viewBox="0 0 64 64" height="1.3em" width="1.3em">
                                            <path d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16" pathLength="575.0541381835938" className="path"></path>
                                        </svg>
                                    </label>
                                    <label htmlFor="openCheckbox" className="font-dmsans text-black text-opacity-75">open</label>
                                </div>
                                <div className="flex gap-2.5 items-center">
                                    <label className="container w-fit">
                                        <input id="finishedCheckbox" type="checkbox" />
                                        <svg viewBox="0 0 64 64" height="1.3em" width="1.3em">
                                            <path d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16" pathLength="575.0541381835938" className="path"></path>
                                        </svg>
                                    </label>
                                    <label htmlFor="finishedCheckbox" className="font-dmsans text-black text-opacity-75">finished</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-10/12 flex flex-col gap-5">
                        <h2 className="font-dmsans text-4xl font-semibold text-opacity-70 text-black">search results for <span className="text-black text-opacity-100 font-bold">{searchQuery}</span></h2>
                        <GridUserSection sectionTitle={"users"} usersFound={usersFound} />
                        <GridProjectSection sectionTitle={"projects"} projectsFound={projectsFound} search={3} />
                        {projectsFound && projectsFound.length > 0 && !limitProject.noMore && projectsFound.length % 3 === 0 ? (
                            <div className="flex justify-center items-center mt-6 gap-3">
                                <hr className="w-6/12 border-black border-opacity-25" />
                                <button onClick={() => {
                                    setLimitProject(prev => ({ ...prev, skip: prev.skip + prev.limit, seeMore: true }));
                                }} className="font-dmsans w-6/12 sm:w-1/12 text-black text-opacity-75 font-semibold text-lg text-center bg-gradient-to-r from-primary to-secondary inline-block text-transparent bg-clip-text">load more</button>
                                <hr className="w-6/12 border-black border-opacity-25" />
                            </div>
                        ) :
                            projectsFound.length > 0 && <p className="font-dmsans text-black py-10 fade-in text-lg font-semibold text-opacity-75 text-center" style={{ animationDelay: '0.75s' }}>no more projects found</p>
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </div >
    );
}

export default Search;