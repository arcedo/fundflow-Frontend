import React from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import search from "../assets/icons/search.svg";
import dropdown from "../assets/icons/dropdown.svg";
import Header from "../components/Header";
import Footer from "../components/Footer";
import GridUserSection from "../components/GridUserSection";
import GridProjectSection from "../components/GridProjectSection";
import { getLatestsProjects, getCategories, searchProjects, searchUsers } from "../services/index";


function Search() {
    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get("query").replace(/\s/g, "_");
    const categoryQuery = searchParams.get("category");
    const statusQuery = searchParams.get("ended");

    const [categories, setCategories] = useState([]);
    const [projectsFound, setProjectsFound] = useState([]);
    const [usersFound, setUsersFound] = useState([]);
    const [limitProject, setLimitProject] = useState({ skip: 0, limit: 6, seeMore: false, noMore: false });
    const [limitUser, setLimitUser] = useState({ skip: 0, limit: 6, seeMore: false, noMore: false });

    const [openChecked, setOpenChecked] = useState(false);
    const [finishedChecked, setFinishedChecked] = useState(false);
    const [searchInput, setSearchInput] = useState(searchQuery.replace(/_/g, " "));
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleOpenChange = () => {
        const newOpenChecked = !openChecked;
        setOpenChecked(newOpenChecked);
        setFinishedChecked(false);
        setSearchParams(prevParams => {
            const newParams = new URLSearchParams(prevParams);
            if (newOpenChecked) {
                newParams.set("ended", "false");
            } else {
                newParams.delete("ended");
            }
            return newParams;
        });
    };
    
    const handleFinishedChange = () => {
        const newFinishedChecked = !finishedChecked;
        setFinishedChecked(newFinishedChecked);
        setOpenChecked(false);
        setSearchParams(prevParams => {
            const newParams = new URLSearchParams(prevParams);
            if (newFinishedChecked) {
                newParams.set("ended", "true");
            } else {
                newParams.delete("ended");
            }
            return newParams;
        });
    };    

    const fetchSearchProjects = async () => {
        if (limitProject.noMore) return;

        if (searchQuery) {
            await searchProjects(searchQuery, limitProject.skip, limitProject.limit, categoryQuery ? categoryQuery : null, statusQuery ? statusQuery : null)
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
            await getLatestsProjects(limitProject.skip, limitProject.limit, categoryQuery ? categoryQuery : null, statusQuery ? statusQuery : null)
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
        if (!searchQuery) return;
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
    }, [searchQuery, limitProject, categoryQuery, statusQuery]);

    useEffect(() => {
        fetchSearchUsers();
    }, [searchQuery, limitUser]);

    useEffect(() => {
        setLimitProject({ skip: 0, limit: 6, seeMore: false, noMore: false });
        setLimitUser({ skip: 0, limit: 6, seeMore: false, noMore: false });
    }, [searchQuery, categoryQuery, statusQuery]);

    const searchCategory = (e) => {
        const categorySearch = e.target.innerText.charAt(0).toUpperCase() + e.target.innerText.slice(1);
        const categoryId = categories.find(category => category.name === categorySearch).id;
        
        setSearchParams(prevParams => {
            const newParams = new URLSearchParams(prevParams);
            newParams.set("category", categoryId);
            return newParams;
        });
    };    

    const clearFilters = () => {
        setOpenChecked(false);
        setFinishedChecked(false);
        setSearchParams(prevParams => {
            const newParams = new URLSearchParams(prevParams);
            newParams.delete("category");
            newParams.delete("ended");
            return newParams;
        });
    };

    const handleSearchInputChange = (e) => {
        setSearchInput(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const query = searchInput.trim().replace(/\s/g, "_");
        setSearchParams(prevParams => {
            const newParams = new URLSearchParams(prevParams);
            newParams.set("query", query);
            return newParams;
        });
    };

    return (
        <div className="w-full bg-white min-h-screen overflow-hidden h-fit flex flex-col gap-16">
            <Header />
            <div className="flex flex-col items-center justify-center gap-10 pt-20 lg:pt-28 fade-in">
                <div className="w-11/12 flex flex-col lg:flex-row items-center lg:items-start justify-center mt-10 gap-5">
                    <div className="w-11/12 lg:w-2/12 lg:mb-40">
                        <form className="lg:hidden flex gap-3 items-center" onSubmit={handleSearchSubmit}>
                            <input
                                type="text"
                                className="p-2 bg-white rounded-lg font-dmsans border border-gray-500 border-opacity-30 w-full text-black outline-none focus:border-opacity-80 transition-all duration-200"
                                placeholder="search"
                                value={searchInput}
                                onChange={handleSearchInputChange}
                            />
                            <button type="submit" className=""><img className="w-8" src={search} alt="Search Icon" /></button>
                        </form>
                        <button
                            className="flex gap-2 items-center lg:hidden mt-4 font-dmsans text-black font-semibold text-lg text-opacity-75 cursor-pointer "
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            {isDropdownOpen ? "hide filters" : "show filters"}
                            <img className={`w-6 opacity-75 ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`} src={dropdown} alt="Dropdown Icon" />
                        </button>
                        <div className={`flex-col ${isDropdownOpen ? 'flex' : 'hidden'} lg:flex lg:gap-2 mt-3 lg:mt-0 fade-in`}>
                            <div className={`flex-row lg:flex-col ${isDropdownOpen ? 'flex' : 'hidden'} lg:flex gap-20 lg:gap-2 fade-in`}>
                                <div className="flex flex-col gap-2">
                                    <h3 className="font-dmsans text-2xl font-semibold text-opacity-70 text-black">categories</h3>
                                    <ul className="flex flex-col gap-2">
                                        {categories.map((category) => (
                                            <li key={category.id} onClick={searchCategory} className={`w-fit lowercase font-dmsans cursor-pointer hover:text-opacity-100 transition-colors duration-200 ${category.id === Number(categoryQuery) ? 'font-bold text-black text-opacity-100' : 'text-black text-opacity-75 '}`}>{category.name}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h3 className="lg:mt-3 font-dmsans text-2xl font-semibold text-opacity-70 text-black">filter by</h3>
                                    <p className="font-dmsans font-semibold text-black text-opacity-75">status</p>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex gap-2.5 items-center">
                                            <label className="container w-fit">
                                                <input id="openCheckbox" type="checkbox" checked={openChecked} onChange={handleOpenChange} />
                                                <svg viewBox="0 0 64 64" height="1.3em" width="1.3em">
                                                    <path d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16" pathLength="575.0541381835938" className="path"></path>
                                                </svg>
                                            </label>
                                            <label htmlFor="openCheckbox" className="font-dmsans text-black text-opacity-75">open</label>
                                        </div>
                                        <div className="flex gap-2.5 items-center">
                                            <label className="container w-fit">
                                                <input id="finishedCheckbox" type="checkbox" checked={finishedChecked} onChange={handleFinishedChange} />
                                                <svg viewBox="0 0 64 64" height="1.3em" width="1.3em">
                                                    <path d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16" pathLength="575.0541381835938" className="path"></path>
                                                </svg>
                                            </label>
                                            <label htmlFor="finishedCheckbox" className="font-dmsans text-black text-opacity-75">finished</label>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <p onClick={clearFilters} className="w-fit mt-3 font-dmsans text-black font-semibold text-lg bg-gradient-to-r from-primary to-secondary inline-block text-transparent bg-clip-text cursor-pointer">clear filters</p>
                        </div>
                    </div>
                    <div className="w-11/12 lg:w-10/12 flex flex-col gap-5">
                        <h2 className="font-dmsans text-4xl font-semibold text-opacity-70 text-black">
                            search <span className={`${searchQuery === '' ? 'hidden' : ''} fade-in `}>
                                results for <span className="text-black text-opacity-100 font-bold">{searchQuery.replace(/_/g, " ")}</span>
                            </span>
                            {searchQuery.length === 0 && categoryQuery || searchQuery.length === 0 && statusQuery ? (
                                <span className="fade-in"> for projects </span>
                            ) : ('')}
                            {categories.length > 0 && categoryQuery && (
                                <span className="fade-in"> in the <span className="text-black text-opacity-100 font-bold">
                                    {categories.find(category => category.id === Number(categoryQuery)).name.toLowerCase()}
                                </span> category </span>
                            )}{statusQuery && (
                                <span className="fade-in"> that {statusQuery === "true" ? "have" : "are"} <span className="text-black text-opacity-100 font-bold">{statusQuery === "true" ? "finished" : "open"}</span> </span>
                            )}
                        </h2>
                        {categoryQuery || !searchQuery || statusQuery ? null : (
                            <GridUserSection sectionTitle={"users"} usersFound={usersFound} />
                        )}
                        <GridProjectSection sectionTitle={"projects"} projectsFound={projectsFound} search={3} />
                        {projectsFound && projectsFound.length > 0 && !limitProject.noMore && projectsFound.length % 6 === 0 ? (
                            <div className="flex justify-center items-center mt-6 gap-3 fade-in">
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