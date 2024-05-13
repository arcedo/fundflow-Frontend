import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import like from "../assets/icons/like.svg";
import views from "../assets/icons/views.svg";
import swap from "../assets/icons/swap.svg";

function NewProject() {
    let today = new Date().toISOString().split('T')[0];
    const totalSteps = 6;
    const [currentStep, setCurrentStep] = useState(1);
    const [isSwapped, setIsSwapped] = useState(true);

    const handleSwap = () => {
        setIsSwapped(!isSwapped);
        const details = document.getElementById('details');
        const thumbnail = document.getElementById('thumbnail');
        if (isSwapped) {
            details.classList.add('hidden');
            thumbnail.classList.remove('hidden');
        } else {
            details.classList.remove('hidden');
            thumbnail.classList.add('hidden');
        }
    };

    const [formData, setFormData] = useState({
        title: "",
        projectDescription: "",
        category: "",
        goalFund: "",
        goalCollab: "",
        fundCurrency: "€",
        projectDuration: "",
        projectCover: "",
    });

    const location = useLocation();

    useEffect(() => {
        setCurrentStep(1);
        setFormData({
            title: "",
            projectDescription: "",
            category: "",
            goalFund: "",
            goalCollab: "",
            fundCurrency: "€",
            projectDuration: "",
            projectCover: "",
        });
        details.classList.remove('hidden');
        thumbnail.classList.add('hidden');
        setIsSwapped(true);
    }, [location.pathname]);

    const handleNextStep = () => {
        const checkMessage = checkStep(currentStep);
        if (checkMessage === 'all good') {
            if (currentStep === 2) {
                handleSwap();
            } else if (currentStep === 3) {
                handleSwap();
            } else if (currentStep === 5) {
                handleSwap();
            }
            setCurrentStep(currentStep + 1);            
        } else{
            document.getElementById('errorText').classList.add('fade-in');
            document.getElementById('errorText').innerHTML = checkMessage;
            setTimeout(() => {
                document.getElementById('errorText').innerHTML = '';
                document.getElementById('errorText').classList.remove('fade-in');
            }, 2000);
        }
    };

    const handleBackStep = () => {
        if (currentStep === 3) {
            handleSwap();
        } else if (currentStep === 4) {
            handleSwap();
        } else if (currentStep === 6) {
            handleSwap();
        }
        setCurrentStep(currentStep - 1);
    };

    const checkStep = (step) => {
        console.log('Checking step:', step);
        switch (step) {
            case 1:
                if (formData.title === '') {
                    document.getElementById('title').classList.add('border-red-500');
                    document.getElementById('title').classList.add('animate-shake');
                    setTimeout(() => {
                        document.getElementById('title').classList.remove('border-red-500');
                        document.getElementById('title').classList.remove('animate-shake');
                    }, 1500);
                    return 'Name can\'t be empty';
                } else {
                    return 'all good';
                }
            case 2:
                if (formData.projectDescription === '') {
                    document.getElementById('projectDescription').classList.add('border-red-500');
                    document.getElementById('projectDescription').classList.add('animate-shake');
                    setTimeout(() => {
                        document.getElementById('projectDescription').classList.remove('border-red-500');
                        document.getElementById('projectDescription').classList.remove('animate-shake');
                    }, 1500);
                    return 'Description can\'t be empty';
                } else {
                    return 'all good';
                }
            case 3:
                if (formData.category === '') {
                    return 'Please select a category';
                } else {
                    return 'all good';
                }
            case 4:
                if (type === 'funds') {
                    if (formData.goalFund === '') {
                        document.getElementById('goalFund').classList.add('border-red-500');
                        document.getElementById('goalFund').classList.add('animate-shake');
                        setTimeout(() => {
                            document.getElementById('goalFund').classList.remove('border-red-500');
                            document.getElementById('goalFund').classList.remove('animate-shake');
                        }, 1500);
                        return 'Goal can\'t be empty';
                    } else {
                        return 'all good';
                    }
                } else if (type === 'collaborators') {
                    if (formData.goalCollab === '') {
                        document.getElementById('goalCollab').classList.add('border-red-500');
                        document.getElementById('goalCollab').classList.add('animate-shake');
                        setTimeout(() => {
                            document.getElementById('goalCollab').classList.remove('border-red-500');
                            document.getElementById('goalCollab').classList.remove('animate-shake');
                        }, 1500);
                        return 'Goal can\'t be empty';
                    } else {
                        return 'all good';
                    }
                }
            case 5:
                return 'all good';
            case 6:
                return 'all good';
            default:
                return 'whar?';
        }
    };

    const handleSubmit = () => {
        console.log('Project created!');
        console.log('Form Data:', formData);
    };

    const { type } = useParams();
    const projectType = type;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCategorySelect = (category) => {
        setFormData({ ...formData, category });
    }; 

    const handleFileInputChange = (e) => {
        const { name, files } = e.target;
        setFormData({
            ...formData,
            [name]: files[0],
        });
    };    

    return (
        <div className="relative w-full bg-white min-h-screen overflow-hidden h-fit flex flex-col gap-16">
            <Header categoriesDisabled={true} />
            <div className="w-full min-h-screen flex flex-col justify-between items-center">
                <div className="w-10/12 mt-56 fade-in flex">
                    <div className="w-1/2" style={{ minHeight: '350px' }}>
                        <h2 className="text-4xl font-dmsans font-bold text-black mb-10">Let's start with the details</h2>
                        {currentStep === 1 && (
                            <>
                                <div className="w-4/5 flex flex-col gap-3 fade-in">
                                    <div>
                                        <label htmlFor="title" className="text-black font-normal font-dmsans opacity-70">What's the desired name?</label>
                                        <input 
                                            id="title" 
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            className="p-2 bg-white rounded-lg font-dmsans border border-gray-500 border-opacity-30 w-full text-black outline-none focus:border-opacity-80 transition-all duration-200" 
                                            type="text" 
                                        />
                                    </div>
                                    <div className="flex gap-3 items-center">
                                        <button onClick={handleNextStep} className="w-1/4 h-12 bg-gradient-to-r from-primary to-secondary hover:opacity-75 transition-all duration-200 border-none bg-opacity-50 rounded-lg text-white font-bold">Next</button>
                                        <p id="errorText" className="font-dmsans text-red-500"></p>
                                    </div>
                                    <p className="fade-in font-dmsans text-black text-opacity-70">{currentStep}/{totalSteps}</p>
                                </div>
                            </>
                        )}
                        {currentStep === 2 && (
                            <>
                                <div className="w-4/5 flex flex-col gap-3 fade-in">
                                    <div>
                                        <label htmlFor="projectDescription" className="text-black font-normal font-dmsans opacity-70">Provide a brief description. You'll be able to detail things later.</label>
                                        <textarea 
                                            id="projectDescription" 
                                            name="projectDescription"
                                            value={formData.projectDescription}
                                            onChange={handleInputChange}
                                            className="p-2 bg-white rounded-lg font-dmsans border border-gray-500 border-opacity-30 w-full text-black outline-none focus:border-opacity-80 transition-all duration-200 resize-none" 
                                            rows="4"
                                        ></textarea>
                                    </div>
                                    <div className="flex gap-3 items-center">
                                        <button onClick={handleBackStep} className="w-1/4 h-12 border border-black border-opacity-50 hover:border-opacity-70 hover:text-opacity-70 transition-all duration-200 rounded-lg text-black text-opacity-50 font-bold font-dmsans">Back</button>
                                        <button onClick={handleNextStep} className="w-1/4 h-12 font-dmsans bg-gradient-to-r from-primary to-secondary hover:opacity-75 transition-all duration-200 border-none bg-opacity-50 rounded-lg text-white font-bold">Next</button>
                                        <p id="errorText" className="font-dmsans text-red-500"></p>
                                    </div>
                                    <p className="fade-in font-dmsans text-black text-opacity-70">{currentStep}/{totalSteps}</p>
                                </div>
                            </>
                        )}
                        {currentStep === 3 && (
                            <>
                                <div className="w-4/5 flex flex-col gap-3 fade-in">
                                    <div>
                                        <p className="text-black font-normal font-dmsans opacity-70">What category does your project belong to?</p>
                                        <div className="flex gap-2 mt-1">
                                            <div
                                                className={`category-option py-2 px-4 rounded-full cursor-pointer opacity-50 text-white font-dmsans font-semibold hover:opacity-75 bg-black transition-all duration-200 ${formData.category === "art" ? "selected" : ""}`}
                                                onClick={() => handleCategorySelect("art")}
                                            >
                                                art
                                            </div>
                                            <div
                                                className={`category-option py-2 px-4 rounded-full cursor-pointer opacity-50 text-white font-dmsans font-semibold hover:opacity-75 bg-black transition-all duration-200 ${formData.category === "dev" ? "selected" : ""}`}
                                                onClick={() => handleCategorySelect("dev")}
                                            >
                                                dev
                                            </div>
                                            <div
                                                className={`category-option py-2 px-4 rounded-full cursor-pointer opacity-50 text-white font-dmsans font-semibold hover:opacity-75 bg-black transition-all duration-200 ${formData.category === "games" ? "selected" : ""}`}
                                                onClick={() => handleCategorySelect("games")}
                                            >
                                                games
                                            </div>
                                            <div
                                                className={`category-option py-2 px-4 rounded-full cursor-pointer opacity-50 text-white font-dmsans font-semibold hover:opacity-75 bg-black transition-all duration-200 ${formData.category === "music" ? "selected" : ""}`}
                                                onClick={() => handleCategorySelect("music")}
                                            >
                                                music
                                            </div>
                                            <div
                                                className={`category-option py-2 px-4 rounded-full cursor-pointer opacity-50 text-white font-dmsans font-semibold hover:opacity-75 bg-black transition-all duration-200 ${formData.category === "books" ? "selected" : ""}`}
                                                onClick={() => handleCategorySelect("books")}
                                            >
                                                books
                                            </div>
                                            <div
                                                className={`category-option py-2 px-4 rounded-full cursor-pointer opacity-50 text-white font-dmsans font-semibold hover:opacity-75 bg-black transition-all duration-200 ${formData.category === "innove" ? "selected" : ""}`}
                                                onClick={() => handleCategorySelect("innove")}
                                            >
                                                innove
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-3 items-center">
                                        <button onClick={handleBackStep} className="w-1/4 h-12 border border-black border-opacity-50 hover:border-opacity-70 hover:text-opacity-70 transition-all duration-200 rounded-lg text-black text-opacity-50 font-bold font-dmsans">Back</button>
                                        <button onClick={handleNextStep} className="w-1/4 h-12 font-dmsans bg-gradient-to-r from-primary to-secondary hover:opacity-75 transition-all duration-200 border-none bg-opacity-50 rounded-lg text-white font-bold">Next</button>
                                        <p id="errorText" className="font-dmsans text-red-500"></p>
                                    </div>
                                    <p className="fade-in font-dmsans text-black text-opacity-70">{currentStep}/{totalSteps}</p>
                                </div>
                            </>
                        )}
                        {currentStep === 4 && (
                            <>
                                {projectType === 'funds' ? (
                                    <div className="w-4/5 flex flex-col gap-3 fade-in">
                                        <div>
                                            <p className="text-black font-normal font-dmsans opacity-70">What's your fund goal?</p>
                                            <div className="flex gap-2">
                                                <input 
                                                    id="goalFund" 
                                                    name="goalFund"
                                                    value={formData.goalFund}
                                                    onChange={handleInputChange}
                                                    className="p-2 bg-white rounded-lg font-dmsans border border-gray-500 border-opacity-30 w-1/3 text-black outline-none focus:border-opacity-80 transition-all duration-200" 
                                                    type="number" 
                                                />
                                                <select 
                                                    id="fundCurrency" 
                                                    name="fundCurrency"
                                                    value={formData.fundCurrency}
                                                    onChange={handleInputChange}
                                                    className="p-2 bg-white rounded-lg font-dmsans border border-gray-500 border-opacity-30 w-1/8 text-black outline-none focus:border-opacity-80 transition-all duration-200"
                                                >
                                                    <option value="€">€</option>
                                                    <option value="$">$</option>
                                                    <option value="£">£</option>
                                                    <option value="¥">¥</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="flex gap-3 items-center">
                                            <button onClick={handleBackStep} className="w-1/4 h-12 border border-black border-opacity-50 hover:border-opacity-70 hover:text-opacity-70 transition-all duration-200 rounded-lg text-black text-opacity-50 font-bold font-dmsans">Back</button>
                                            <button onClick={handleNextStep} className="w-1/4 h-12 font-dmsans bg-gradient-to-r from-primary to-secondary hover:opacity-75 transition-all duration-200 border-none bg-opacity-50 rounded-lg text-white font-bold">Next</button>
                                            <p id="errorText" className="font-dmsans text-red-500"></p>
                                        </div>
                                        <p className="fade-in font-dmsans text-black text-opacity-70">{currentStep}/{totalSteps}</p>
                                    </div>
                                ) : (
                                    <div className="w-4/5 flex flex-col gap-3 fade-in">
                                        <div>
                                            <p className="text-black font-normal font-dmsans opacity-70">What's your collaborator goal?</p>
                                            <div className="flex gap-2 items-end">
                                                <input 
                                                    id="goalCollab" 
                                                    name="goalCollab"
                                                    value={formData.goalCollab}
                                                    onChange={handleInputChange}
                                                    className="p-2 bg-white rounded-lg font-dmsans border border-gray-500 border-opacity-30 w-1/3 text-black outline-none focus:border-opacity-80 transition-all duration-200" 
                                                    type="number" 
                                                />
                                                <p className="font-dmsans text-black text-opacity-70">people</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-3 items-center">
                                            <button onClick={handleBackStep} className="w-1/4 h-12 border border-black border-opacity-50 hover:border-opacity-70 hover:text-opacity-70 transition-all duration-200 rounded-lg text-black text-opacity-50 font-bold font-dmsans">Back</button>
                                            <button onClick={handleNextStep} className="w-1/4 h-12 font-dmsans bg-gradient-to-r from-primary to-secondary hover:opacity-75 transition-all duration-200 border-none bg-opacity-50 rounded-lg text-white font-bold">Next</button>
                                            <p id="errorText" className="font-dmsans text-red-500"></p>
                                        </div>
                                        <p className="fade-in font-dmsans text-black text-opacity-70">{currentStep}/{totalSteps}</p>
                                    </div>
                                )}
                            </>
                        )}
                        {currentStep === 5 && (
                            <>
                                <div className="w-4/5 flex flex-col gap-3 fade-in">
                                    <div>
                                        <p className="text-black font-normal font-dmsans opacity-70">Which should be the closing date?</p>
                                        <input 
                                            id="projectDuration" 
                                            name="projectDuration"
                                            value={formData.projectDuration}
                                            onChange={handleInputChange}
                                            className="p-2 bg-white rounded-lg font-dmsans border border-gray-500 border-opacity-30 w-1/3 text-black outline-none focus:border-opacity-80 transition-all duration-200" 
                                            type="date" 
                                            min={today}
                                        />
                                    </div>
                                    <div className="flex gap-3 items-center">
                                        <button onClick={handleBackStep} className="w-1/4 h-12 border border-black border-opacity-50 hover:border-opacity-70 hover:text-opacity-70 transition-all duration-200 rounded-lg text-black text-opacity-50 font-bold font-dmsans">Back</button>
                                        <button onClick={handleNextStep} className="w-1/4 h-12 font-dmsans bg-gradient-to-r from-primary to-secondary hover:opacity-75 transition-all duration-200 border-none bg-opacity-50 rounded-lg text-white font-bold">Next</button>
                                        <p id="errorText" className="font-dmsans text-red-500"></p>
                                    </div>
                                    <p className="fade-in font-dmsans text-black text-opacity-70">{currentStep}/{totalSteps}</p>
                                </div>
                            </>
                        )}
                        {currentStep === 6 && (
                            <>
                                <div className="w-4/5 flex flex-col gap-3 fade-in">
                                    <div>
                                        <p className="text-black font-normal font-dmsans opacity-70">Do you want to upload a cover image? You can always do this later.</p>
                                        <input 
                                            id="projectCover" 
                                            name="projectCover"
                                            onChange={handleFileInputChange}
                                            className="p-2 bg-white rounded-lg font-dmsans border border-gray-500 border-opacity-30 w-full text-black outline-none focus:border-opacity-80 transition-all duration-200" 
                                            type="file" 
                                        />
                                    </div>
                                    <div className="flex gap-3 items-center">
                                        <button onClick={handleBackStep} className="w-1/4 h-12 border border-black border-opacity-50 hover:border-opacity-70 hover:text-opacity-70 transition-all duration-200 rounded-lg text-black text-opacity-50 font-bold font-dmsans">Back</button>
                                        <button onClick={handleSubmit} className="w-1/4 h-12 font-dmsans bg-gradient-to-r from-primary to-secondary hover:opacity-75 transition-all duration-200 border-none bg-opacity-50 rounded-lg text-white font-bold">Create</button>
                                        <p id="errorText" className="font-dmsans text-red-500"></p>
                                    </div>
                                    <p className="fade-in font-dmsans text-black text-opacity-70">{currentStep}/{totalSteps}</p>
                                </div>
                            </>
                        )}       
                    </div>
                    <div className="w-1/2 flex gap-5 items-start justify-center fade-in">
                        <div id="details" className="w-3/5">
                            <p className="font-dmsans font-semibold text-black text-opacity-70">preview</p>
                            <div className="w-full p-8 bg-white rounded-lg shadow-xl border border-gray-200 border-opacity-60 bg-opacity-90 backdrop-blur-md flex flex-col gap-4">
                                <div className="flex gap-2 items-end">
                                    <h2 className="font-dmsans font-bold text-5xl">{formData.title}</h2>
                                    <p className="font-dmsans text-black text-opacity-70">by user</p>
                                </div>
                                <p className="font-dmsans">{formData.projectDescription}</p>
                                <div className="flex flex-col gap-3">
                                    <div className="bg-gray-300 h-3 rounded-full w-full">
                                        <div className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full" style={{ width: `50%` }}>
                                        </div>
                                    </div>
                                    <p className="font-dmsans text-black text-opacity-70"><span className="font-montserrat font-bold text-4xl bg-gradient-to-r from-primary to-secondary inline-block text-transparent bg-clip-text">--{formData.fundCurrency}</span> funded of a {formData.goalFund}{formData.fundCurrency} goal</p>
                                    <p className="font-dmsans text-black text-opacity-70"><span className="font-montserrat font-bold text-4xl">--</span> funders</p>
                                    <div className="flex items-center justify-between">
                                        <p className="font-dmsans text-black text-opacity-70"><span className="font-montserrat font-bold text-4xl">2</span> hours left</p>
                                        <div className="flex gap-5">
                                            <p className="h-8 text-black text-opacity-60 text-lg font-dmsans font-bold flex gap-2 items-center group"><img className="h-7 transition-all duration-300 opacity-40" src={views} alt="" />--</p>
                                            <button className="h-8 text-black text-opacity-60 text-lg font-dmsans font-bold flex gap-2 items-center group"><img className="h-7 transition-all duration-300 opacity-40 group-hover:opacity-100" src={like} alt="" />--</button>
                                            <button className="h-8 text-black text-opacity-60 text-lg font-dmsans font-bold flex gap-2 items-center group"><img className="h-7 transition-all duration-300 opacity-40 group-hover:opacity-100 -rotate-180" src={like} alt="" />--</button>
                                        </div>
                                    </div>
                                </div>
                                <button className="mt-2 h-12 bg-gradient-to-r from-primary to-secondary border-none hover:opacity-75 transition-all duration-200 rounded-lg text-white font-dmsans font-bold">Help this project</button>
                            </div>
                        </div>
                        <div id="thumbnail" className="w-3/5 hidden">
                            <p className="font-dmsans font-semibold text-black text-opacity-70">thumbnail</p>
                            <div className="relative flex flex-col justify-center items-center bg-gradient-to-r from-primary to-secondary h-44 sm:h-60 w-full rounded-md">
                                <p className="absolute font-dmsans top-3 right-3 z-30 py-2 px-3 bg-gray-500 bg-opacity-75 text-white text-sm font-bold rounded-full lowercase">{formData.category}</p>
                                <div className="flex flex-col justify-center items-center h-full w-full bg-gray-300 rounded-md filter brightness-75">
                                    <div className="h-full w-full rounded-md object-cover bg-555"/>
                                </div>
                            </div>
                            <div className="flex items-center justify-between gap-3 pt-3 w-full">
                                <div className="flex items-center justify-between gap-3">
                                    <div className="h-12 w-12 rounded-full overflow-hidden bg-black group">
                                        <div className="group-hover:scale-110 transition-all duration-150 bg-555"/>
                                    </div>
                                    <div className="flex flex-col">
                                        <h3 className="font-dmsans text-2xl font-bold text-black text-opacity-75">{formData.title}</h3>
                                        <h3 className="font-dmsans text-black transition duration-300 text-opacity-75 text-sm ">by user</h3>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1 text-right">
                                    <p className="font-dmsans text-black text-opacity-75 text-sm font-semibold flex items-center justify-end gap-1">
                                        <img className="w-5 opacity-75" src={like} alt="Like Icon" />
                                        --
                                    </p>
                                    <p className="font-dmsans text-black text-opacity-75 text-sm font-semibold">--% complete</p>
                                </div>
                            </div>
                        </div>                        
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default NewProject;
