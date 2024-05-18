import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RandomProject from "./RandomProject";
import logo from "../assets/icons/logoLight.png";
import { getRandomProjects } from "../services/index";

function RandomSection() {
    const [projects, setProjects] = useState([]);
    const [flipped, setFlipped] = useState(false);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        let projectsData;
        if (projects && projects[0] && projects[0].id) {
            projectsData = await getRandomProjects(0, 1, projects[0].id);
        } else {
            projectsData = await getRandomProjects(0, 1);
        }
        setProjects(projectsData);
    };


    function randomClick() {
        setFlipped(true);
        setTimeout(() => {
            fetchProjects();
        }, 300);
        setTimeout(() => {
            setFlipped(false);
        }, 1000);
    }

    return (
        <section className={`flex justify-center items-center`}>
            <div className="flex flex-col gap-5 w-full">
                <h3 className="text-black text-2xl font-dmsans font-bold text-opacity-75 w-9/12">Discover what others are up to</h3>
                <div className={`flip-card`}>
                    <div className={`flip-card-inner  ${flipped ? 'flipped' : ''}`}>
                        <section id="randomProject" className={`flip-card-front w-full overflow-hidden py-5 px-5 sm:py-10 sm:px-10 shadow-xl border-2 border-gray-200 border-opacity-50 bg-gray-100 backdrop-blur-md gap-10 rounded-md flex flex-col sm:grid sm:grid-cols-5 `}>
                            <RandomProject key={projects[0]?.id} project={projects[0]} />
                        </section>
                        <section className={`flip-card-back w-full overflow-hidden py-5 px-5 sm:py-10 sm:px-10 shadow-xl border-2 border-gray-200 border-opacity-50 bg-gray-100 backdrop-blur-md gap-10 rounded-md flex flex-col justify-center items-center`}>
                            <div className='flex gap-8 justify-center items-center'>
                                <img src={logo} alt="" className='w-20 h-20 rounded-md' />
                                {/* <h4 className='font-dmsans text-black text-7xl font-bold' >fundflow.</h4> */}
                            </div>
                        </section>
                    </div>
                </div>
                <div className="flex w-full items-center justify-center">
                    <button onClick={randomClick} className="w-full sm:w-2/12 bg-gradient-to-r from-primary to-secondary hover:opacity-75 transition-all duration-200 text-white font-dmsans font-semibold text-lg py-2 px-4 rounded-lg border-0">Randomize</button>
                </div>
            </div>
        </section>
    );
}

export default RandomSection;
