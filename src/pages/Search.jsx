import React from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import GridUserSection from "../components/GridUserSection";
import GridProjectSection from "../components/GridProjectSection";
import { getLatestsProjects, getCategories } from "../services/index";


function Search() {
    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get("query");

    const [latestsProjects, setLatestsProjects] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            await getCategories()
                .then((data) => {
                    setCategories(data);
                })
        };
        const fetchProjects = async () => {
            const latestProjectsData = await getLatestsProjects(0, 12);
            setLatestsProjects(latestProjectsData);
        };
        fetchCategories();
        fetchProjects();
    }, [searchQuery]);

    const searchCategory = (e) => {
        const category = e.target.innerText;
        setSearchParams({ query: category });
    };

    const users = [
        {
            id: 1,
            user: "johndoe",
            url: "johndoe",
            profilePicture: "https://images.unsplash.com/photo-1715966966827-25a227141ee9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            id: 2,
            user: "janedoe",
            url: "johndoe",
            profilePicture: "https://images.unsplash.com/photo-1715645944065-b1288f628a70?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
    ];

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
                        </div>
                    </div>     
                    <div className="w-10/12 flex flex-col gap-5">
                        <h2 className="font-dmsans text-4xl font-semibold text-opacity-70 text-black">search results for <span className="text-black text-opacity-100 font-bold">{searchQuery}</span></h2>
                        <GridUserSection key={searchQuery} sectionTitle={"users"} usersFound={users} />
                        <GridProjectSection key={searchQuery} sectionTitle={"projects"} projectsFound={latestsProjects} />
                    </div>             
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Search;