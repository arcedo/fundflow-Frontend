import React, { useState, useEffect, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { getCategories, createProject, putProjectCover } from "../services";
import { resizeImage } from "../helpers/resize";
import Header from "../components/Header";
import Footer from "../components/Footer";
import like from "../assets/icons/like.svg";
import views from "../assets/icons/views.svg";

function NewProject() {
    let navigate = useNavigate();
    let today = new Date().toISOString().split('T')[0];
    const userData = JSON.parse(localStorage.getItem('userData'));
    const totalSteps = 6;
    const [currentStep, setCurrentStep] = useState(1);
    const [isSwapped, setIsSwapped] = useState(true);
    const [categories, setCategories] = useState([{ name: '', id: 0 }])
    const { type } = useParams();
    const location = useLocation();
    const projectType = type;

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

    const [newProject, setNewProject] = useState({
        title: "",
        description: "",
        idCategory: 0,
        categoryName: '',
        typeGoal: type,
        goal: '',
        currency: "€",
        deadlineDate: "",
        hoursLeft: "",
    });

    const [coverPicture, setCoverPicture] = useState({ file: null, cover: '' });

    useEffect(() => {
        const fetchCategories = async () => {
            await getCategories()
                .then((data) => {
                    setCategories(data);
                })
        };
        if (type === 'funds' || type === 'collaborators') {
            setCurrentStep(1);
            setNewProject({
                title: "",
                description: "",
                idCategory: 0,
                categoryName: '',
                typeGoal: type,
                goal: '',
                currency: "€",
                deadlineDate: "",
                hoursLeft: "",
                cover: "",
            });
            details.classList.remove('hidden');
            thumbnail.classList.add('hidden');
            setIsSwapped(true);
            fetchCategories();
        } else {
            navigate('/404');
        }
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
        } else {
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
        switch (step) {
            case 1:
                if (!newProject.title) {
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
                if (!newProject.description) {
                    document.getElementById('description').classList.add('border-red-500');
                    document.getElementById('description').classList.add('animate-shake');
                    setTimeout(() => {
                        document.getElementById('description').classList.remove('border-red-500');
                        document.getElementById('description').classList.remove('animate-shake');
                    }, 1500);
                    return 'Description can\'t be empty';
                } else {
                    return 'all good';
                }
            case 3:
                if (!newProject.idCategory) {
                    return 'Please select a category';
                } else {
                    return 'all good';
                }
            case 4:
                if (type === 'funds') {
                    if (newProject.goal === '') {
                        document.getElementById('goal').classList.add('border-red-500');
                        document.getElementById('goal').classList.add('animate-shake');
                        setTimeout(() => {
                            document.getElementById('goal').classList.remove('border-red-500');
                            document.getElementById('goal').classList.remove('animate-shake');
                        }, 1500);
                        return 'Goal can\'t be empty';
                    } else if (newProject.goal <= 0) {
                        document.getElementById('goal').classList.add('border-red-500');
                        document.getElementById('goal').classList.add('animate-shake');
                        setTimeout(() => {
                            document.getElementById('goal').classList.remove('border-red-500');
                            document.getElementById('goal').classList.remove('animate-shake');
                        }, 1500);
                        return 'Goal can\'t be negative';
                    } else {
                        return 'all good';
                    }
                } else if (type === 'collaborators') {
                    if (newProject.goal === '') {
                        document.getElementById('goal').classList.add('border-red-500');
                        document.getElementById('goal').classList.add('animate-shake');
                        setTimeout(() => {
                            document.getElementById('goal').classList.remove('border-red-500');
                            document.getElementById('goal').classList.remove('animate-shake');
                        }, 1500);
                        return 'Goal can\'t be empty';
                    } else if (newProject.goal <= 0) {
                        document.getElementById('goal').classList.add('border-red-500');
                        document.getElementById('goal').classList.add('animate-shake');
                        setTimeout(() => {
                            document.getElementById('goal').classList.remove('border-red-500');
                            document.getElementById('goal').classList.remove('animate-shake');
                        }, 1500);
                        return 'Goal can\'t be negative';
                    } else {
                        return 'all good';
                    }
                }
            case 5:
                if (newProject.deadlineDate === '') {
                    document.getElementById('deadlineDate').classList.add('border-red-500');
                    document.getElementById('deadlineDate').classList.add('animate-shake');
                    setTimeout(() => {
                        document.getElementById('deadlineDate').classList.remove('border-red-500');
                        document.getElementById('deadlineDate').classList.remove('animate-shake');
                    }, 1500);
                    return 'Please select a deadline';
                } else {
                    return 'all good';
                }
            case 6:
                return 'all good';
            default:
                return;
        }
    };

    const handleInputChange = (e) => {
        if (currentStep === 1) {
            const { name, value } = e.target;
            if (name === 'title' && value.length > 30) {
                return;
            } else {
                setNewProject({
                    ...newProject,
                    [name]: value,
                });
            }
        } else if (currentStep === 2) {
            const { name, value } = e.target;
            if (name === 'description' && value.length > 250) {
                return;
            } else {
                setNewProject({
                    ...newProject,
                    [name]: value,
                });
            }
        } else if (currentStep === 4) {
            const { name, value } = e.target;
            if (name === 'goal' && value.length > 9) {
                return;
            } else {
                setNewProject({
                    ...newProject,
                    [name]: value,
                });
            }
        } else if (currentStep === 5) {
            const { name, value } = e.target;
            if (name === 'deadlineDate') {
                const selectedDate = new Date(value);
                const today = new Date();
                const timeDiff = selectedDate.getTime() - today.getTime();
                const hoursDiff = Math.ceil(timeDiff / (1000 * 60 * 60));
                if (hoursDiff < 0) {
                    return;
                } else {
                    setNewProject({
                        ...newProject,
                        [name]: value,
                        hoursLeft: hoursDiff,
                    });
                }
            }
        } else {
            const { name, value } = e.target;
            setNewProject({
                ...newProject,
                [name]: value,
            });
        }
    };

    const handleInputChangeGood = (e) => {
        const { name, value } = e.target;
        let hoursDiff = newProject.hoursLeft ?? 0;
        if (currentStep === 2 && name === 'description' && value.length > 250) {
            return;
        } else if (currentStep === 5 && name === 'deadlineDate') {
            const hoursDiff = Math.ceil(new Date(value).getTime() - new Date().getTime() / (1000 * 60 * 60));
            if (hoursDiff < 0) {
                return;
            }
        }
        setNewProject({
            ...newProject,
            [name]: value,
            hoursLeft: hoursDiff,
        });
    };

    const handleCategorySelect = (categoryName) => {
        document.querySelectorAll('.category-option').forEach((option) => {
            option.classList.remove('selected');
            if (option.innerHTML === categoryName) {
                option.classList.add('selected');
            }
        })
        setNewProject({ ...newProject, idCategory: categories.find((category) => category.name === categoryName).id, categoryName: categoryName })
    };

    const handleFileInputChange = async (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        const resizedImage = await resizeImage(file, 1900, 750, 90);
        reader.onloadend = () => {
            setCoverPicture({
                cover: reader.result,
                file: resizedImage,
            });
        };
        reader.readAsDataURL(resizedImage);
    };

    const [errorSubmit, setErrorSubmit] = useState('');
    const handleSubmit = async () => {
        await createProject(localStorage.getItem('token'), newProject)
            .then(async (data) => {
                if (data.url) {
                    if (coverPicture.cover) {
                        putProjectCover(localStorage.getItem('token'), data.id, coverPicture.file)
                    }
                    navigate(`/projects/${data.url}`);
                } else {
                    setErrorSubmit(data.message);
                }
            });
    };
    return (
        <div className="relative w-full bg-white min-h-screen overflow-hidden h-fit flex flex-col gap-16">
            <Header categoriesDisabled={true} />
            <div className="w-full min-h-screen flex flex-col justify-between items-center">
                <div className="w-10/12 mt-32 lg:mt-56 fade-in flex flex-col justify-center items-center lg:flex-row gap-10 lg:gap-0">
                    <div className="w-11/12 lg:w-1/2">
                        <h2 className="text-4xl font-dmsans font-bold text-black mb-10">Let's start with the details</h2>
                        {currentStep === 1 && (
                            <>
                                <div className="lg:w-4/5 flex flex-col gap-3 fade-in">
                                    <div>
                                        <label htmlFor="title" className="text-black font-normal font-dmsans opacity-70">What's the desired name?</label>
                                        <input
                                            id="title"
                                            name="title"
                                            value={newProject.title}
                                            onChange={handleInputChange}
                                            className="p-2 bg-white rounded-lg font-dmsans border border-gray-500 border-opacity-30 w-full text-black outline-none focus:border-opacity-80 transition-all duration-200"
                                            type="text"
                                        />
                                        <p className={`text-right font-dmsans text-md ${newProject.title.length > 30 ? 'text-red-500' : 'text-black text-opacity-70'}`}>{newProject.title.length}/30</p>
                                    </div>
                                    <div className="flex gap-3 items-center">
                                        <button onClick={handleNextStep} className="w-1/2 lg:w-1/4 h-12 bg-gradient-to-r from-primary to-secondary hover:opacity-75 transition-all duration-200 border-none bg-opacity-50 rounded-lg text-white font-bold">Next</button>
                                        <p id="errorText" className="font-dmsans text-red-500"></p>
                                    </div>
                                    <p className="fade-in font-dmsans text-black text-opacity-70">{currentStep}/{totalSteps}</p>
                                </div>
                            </>
                        )}
                        {currentStep === 2 && (
                            <>
                                <div className="lg:w-4/5 flex flex-col gap-3 fade-in">
                                    <div>
                                        <label htmlFor="description" className="text-black font-normal font-dmsans opacity-70">Provide a brief description. You'll be able to detail things later.</label>
                                        <textarea
                                            id="description"
                                            name="description"
                                            value={newProject.description}
                                            onChange={handleInputChange}
                                            className="p-2 bg-white rounded-lg font-dmsans border border-gray-500 border-opacity-30 w-full text-black outline-none focus:border-opacity-80 transition-all duration-200 resize-none"
                                            rows="4"
                                        ></textarea>
                                        <p className={`text-right font-dmsans text-md ${newProject.description.length > 250 ? 'text-red-500' : 'text-black text-opacity-70'}`}>{newProject.description.length}/250</p>
                                    </div>
                                    <div className="flex gap-3 items-center">
                                        <button onClick={handleBackStep} className="w-1/2 lg:w-1/4 h-12 border border-black border-opacity-50 hover:border-opacity-70 hover:text-opacity-70 transition-all duration-200 rounded-lg text-black text-opacity-50 font-bold font-dmsans">Back</button>
                                        <button onClick={handleNextStep} className="w-1/2 lg:w-1/4 h-12 font-dmsans bg-gradient-to-r from-primary to-secondary hover:opacity-75 transition-all duration-200 border-none bg-opacity-50 rounded-lg text-white font-bold">Next</button>
                                        <p id="errorText" className="font-dmsans text-red-500"></p>
                                    </div>
                                    <p className="fade-in font-dmsans text-black text-opacity-70">{currentStep}/{totalSteps}</p>
                                </div>
                            </>
                        )}
                        {currentStep === 3 && (
                            <>
                                <div className="lg:w-4/5 flex flex-col gap-3 fade-in">
                                    <div>
                                        <p className="text-black font-normal font-dmsans opacity-70">Which category does your project fit in the most?</p>
                                        <div className="flex flex-wrap gap-2 mt-1">
                                            {categories && categories.map((category) => (
                                                <div
                                                    key={category.id}
                                                    className={`category-option py-2 px-4 rounded-full lowercase cursor-pointer opacity-50 text-white font-dmsans font-semibold hover:opacity-75 bg-black transition-all duration-200 ${newProject.categoryName === "art" ? "selected" : ""}`}
                                                    onClick={() => handleCategorySelect(category.name)}>
                                                    {category.name}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex gap-3 items-center">
                                        <button onClick={handleBackStep} className="w-1/2 lg:w-1/4 h-12 border border-black border-opacity-50 hover:border-opacity-70 hover:text-opacity-70 transition-all duration-200 rounded-lg text-black text-opacity-50 font-bold font-dmsans">Back</button>
                                        <button onClick={handleNextStep} className="w-1/2 lg:w-1/4 h-12 font-dmsans bg-gradient-to-r from-primary to-secondary hover:opacity-75 transition-all duration-200 border-none bg-opacity-50 rounded-lg text-white font-bold">Next</button>
                                        <p id="errorText" className="font-dmsans text-red-500"></p>
                                    </div>
                                    <p className="fade-in font-dmsans text-black text-opacity-70">{currentStep}/{totalSteps}</p>
                                </div>
                            </>
                        )}
                        {currentStep === 4 && (
                            <>
                                {projectType === 'funds' ? (
                                    <div className="lg:w-4/5 flex flex-col gap-3 fade-in">
                                        <div className="w-fit">
                                            <label htmlFor="goal" className="text-black font-normal font-dmsans opacity-70">What's your fund goal?</label>
                                            <div className="flex gap-2">
                                                <input
                                                    id="goal"
                                                    name="goal"
                                                    value={newProject.goal}
                                                    min={0}
                                                    onChange={handleInputChange}
                                                    className="p-2 bg-white rounded-lg font-dmsans border border-gray-500 border-opacity-30 w-full text-black outline-none focus:border-opacity-80 transition-all duration-200"
                                                    type="number"
                                                />
                                                <label htmlFor="currency" className="hidden">Currency:</label>
                                                <select
                                                    id="currency"
                                                    name="currency"
                                                    value={newProject.currency}
                                                    onChange={handleInputChange}
                                                    className="p-2 bg-white rounded-lg font-dmsans border border-gray-500 border-opacity-30 w-1/8 text-black outline-none focus:border-opacity-80 transition-all duration-200"
                                                >
                                                    <option value="€">€</option>
                                                    <option value="$">$</option>
                                                    <option value="£">£</option>
                                                    <option value="¥">¥</option>
                                                </select>
                                            </div>
                                            <p className={`text-right font-dmsans text-md ${newProject.goal.length > 9 ? 'text-red-500' : 'text-black text-opacity-70'}`}>{newProject.goal.length}/9</p>
                                        </div>
                                        <div className="flex gap-3 items-center">
                                            <button onClick={handleBackStep} className="w-1/2 lg:w-1/4 h-12 border border-black border-opacity-50 hover:border-opacity-70 hover:text-opacity-70 transition-all duration-200 rounded-lg text-black text-opacity-50 font-bold font-dmsans">Back</button>
                                            <button onClick={handleNextStep} className="w-1/2 lg:w-1/4 h-12 font-dmsans bg-gradient-to-r from-primary to-secondary hover:opacity-75 transition-all duration-200 border-none bg-opacity-50 rounded-lg text-white font-bold">Next</button>
                                            <p id="errorText" className="font-dmsans text-red-500"></p>
                                        </div>
                                        <p className="fade-in font-dmsans text-black text-opacity-70">{currentStep}/{totalSteps}</p>
                                    </div>
                                ) : (
                                    <div className="lg:w-4/5 flex flex-col gap-3 fade-in">
                                        <div className="w-fit">
                                            <label htmlFor="goal" className="text-black font-normal font-dmsans opacity-70">What's your collaborator goal?</label>
                                            <div className="flex gap-2 items-end">
                                                <input
                                                    id="goal"
                                                    name="goal"
                                                    value={newProject.goal}
                                                    min={0}
                                                    onChange={handleInputChange}
                                                    className="p-2 bg-white rounded-lg font-dmsans border border-gray-500 border-opacity-30 w-full text-black outline-none focus:border-opacity-80 transition-all duration-200"
                                                    type="number"
                                                />
                                                <p className="font-dmsans text-black text-opacity-70">people</p>
                                            </div>
                                            <p className={`text-right font-dmsans text-md ${newProject.goal.length > 9 ? 'text-red-500' : 'text-black text-opacity-70'}`}>{newProject.goal.length}/9</p>
                                        </div>
                                        <div className="flex gap-3 items-center">
                                            <button onClick={handleBackStep} className="w-1/2 lg:w-1/4 h-12 border border-black border-opacity-50 hover:border-opacity-70 hover:text-opacity-70 transition-all duration-200 rounded-lg text-black text-opacity-50 font-bold font-dmsans">Back</button>
                                            <button onClick={handleNextStep} className="w-1/2 lg:w-1/4 h-12 font-dmsans bg-gradient-to-r from-primary to-secondary hover:opacity-75 transition-all duration-200 border-none bg-opacity-50 rounded-lg text-white font-bold">Next</button>
                                            <p id="errorText" className="font-dmsans text-red-500"></p>
                                        </div>
                                        <p className="fade-in font-dmsans text-black text-opacity-70">{currentStep}/{totalSteps}</p>
                                    </div>
                                )}
                            </>
                        )}
                        {currentStep === 5 && (
                            <>
                                <div className="lg:w-4/5 flex flex-col gap-3 fade-in">
                                    <div className="flex flex-col gap-3">
                                        <label htmlFor="deadlineDate" className="text-black font-normal font-dmsans opacity-70">Which should be the closing date?</label>
                                        <input
                                            id="deadlineDate"
                                            name="deadlineDate"
                                            value={newProject.deadlineDate}
                                            onChange={handleInputChange}
                                            className="p-2 bg-white rounded-lg font-dmsans border border-gray-500 border-opacity-30 w-3/5 lg:w-1/3 text-black outline-none focus:border-opacity-80 transition-all duration-200"
                                            type="date"
                                            min={today}
                                        />
                                    </div>
                                    <div className="flex gap-3 items-center">
                                        <button onClick={handleBackStep} className="w-1/2 lg:w-1/4 h-12 border border-black border-opacity-50 hover:border-opacity-70 hover:text-opacity-70 transition-all duration-200 rounded-lg text-black text-opacity-50 font-bold font-dmsans">Back</button>
                                        <button onClick={handleNextStep} className="w-1/2 lg:w-1/4 h-12 font-dmsans bg-gradient-to-r from-primary to-secondary hover:opacity-75 transition-all duration-200 border-none bg-opacity-50 rounded-lg text-white font-bold">Next</button>
                                        <p id="errorText" className="font-dmsans text-red-500"></p>
                                    </div>
                                    <p className="fade-in font-dmsans text-black text-opacity-70">{currentStep}/{totalSteps}</p>
                                </div>
                            </>
                        )}
                        {currentStep === 6 && (
                            <>
                                <div className="lg:w-4/5 flex flex-col gap-5 fade-in">
                                    <div className="flex flex-col gap-3 w-fit">
                                        <p className="text-black font-normal font-dmsans opacity-70 w-fit">Do you want to upload a cover image? You can always do this later.</p>
                                        <label htmlFor="cover" className="bg-gradient-to-r from-primary to-secondary w-full text-center font-dmsans font-semibold py-3 transition-all duration-200 hover:shadow-none hover:opacity-75 shadow-md text-white rounded-lg">Upload Image</label>
                                        <input
                                            id="cover"
                                            name="cover"
                                            accept="image/*"
                                            onChange={handleFileInputChange}
                                            className="p-2 bg-white rounded-lg font-dmsans border border-gray-500 border-opacity-30 w-full text-black outline-none focus:border-opacity-80 transition-all duration-200 hidden"
                                            type="file"
                                        />
                                    </div>
                                    <div className="flex gap-3 items-center">
                                        <button onClick={handleBackStep} className="w-1/2 lg:w-1/4 h-12 border border-black border-opacity-50 hover:border-opacity-70 hover:text-opacity-70 transition-all duration-200 rounded-lg text-black text-opacity-50 font-bold font-dmsans">Back</button>
                                        <button onClick={handleSubmit} className="w-1/2 lg:w-1/4 h-12 font-dmsans bg-gradient-to-r from-primary to-secondary hover:opacity-75 transition-all duration-200 border-none bg-opacity-50 rounded-lg text-white font-bold">Create</button>
                                        {errorSubmit && (<p className="font-dmsans text-red-500">{errorSubmit}</p>)}
                                    </div>
                                    <p className="fade-in font-dmsans text-black text-opacity-70">{currentStep}/{totalSteps}</p>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="w-full lg:w-1/2 flex gap-5 items-start justify-center fade-in">
                        <div id="details" className="w-full md:w-3/5 md:min-w-96">
                            <p className="font-dmsans font-semibold bg-gradient-to-r from-primary to-secondary inline-block text-transparent bg-clip-text text-xl">details preview</p>
                            <div className="w-full p-8 bg-white rounded-lg shadow-xl border border-gray-200 border-opacity-60 bg-opacity-90 backdrop-blur-md flex flex-col gap-4">
                                <div className="flex flex-col gap-2">
                                    <h2 className="font-dmsans font-bold text-5xl overflow-hidden pb-2">{newProject.title}</h2>
                                    <p className="font-dmsans text-black text-opacity-70">by {userData.userUrl}</p>
                                </div>
                                <p className="max-w-full font-dmsans overflow-auto">{newProject.description}</p>
                                <div className="flex flex-col gap-3">
                                    <div className="bg-gray-300 h-3 rounded-full w-full">
                                        <div className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full" style={{ width: `20%` }}>
                                        </div>
                                    </div>
                                    {projectType === 'funds' ? (
                                        <>
                                            <p className="font-dmsans text-black text-opacity-70"><span className="font-montserrat font-bold text-4xl bg-gradient-to-r from-primary to-secondary inline-block text-transparent bg-clip-text">0{newProject.currency}</span> funded of a <span className="text-black text-opacity-100 font-semibold">{newProject.goal}{newProject.currency}</span> goal</p>
                                            <p className="font-dmsans text-black text-opacity-70"><span className="font-montserrat font-bold text-4xl">0</span> funders</p>
                                        </>
                                    ) : (
                                        <>
                                            <p className="font-dmsans text-black text-opacity-70"><span className="font-montserrat font-bold text-4xl bg-gradient-to-r from-primary to-secondary inline-block text-transparent bg-clip-text">0</span> collaborators of a <span className="text-black text-opacity-100 font-semibold">{newProject.goal}</span> goal</p>
                                        </>
                                    )}
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                        <p className="font-dmsans text-black text-opacity-70 mb-4 md:mb-0"><span className="font-montserrat font-bold text-4xl">{newProject.hoursLeft}</span> hours left</p>
                                        <div className="flex gap-5">
                                            <p className="h-8 text-black text-opacity-60 text-lg font-dmsans font-bold flex gap-2 items-center group"><img className="h-7 transition-all duration-300 opacity-40" src={views} alt="" />0</p>
                                            <button className="h-8 text-black text-opacity-60 text-lg font-dmsans font-bold flex gap-2 items-center group"><img className="h-7 transition-all duration-300 opacity-40 group-hover:opacity-100" src={like} alt="" />0</button>
                                            <button className="h-8 text-black text-opacity-60 text-lg font-dmsans font-bold flex gap-2 items-center group"><img className="h-7 transition-all duration-300 opacity-40 group-hover:opacity-100 -rotate-180" src={like} alt="" />0</button>
                                        </div>
                                    </div>
                                </div>
                                <button className="mt-2 h-12 bg-gradient-to-r from-primary to-secondary border-none hover:opacity-75 transition-all duration-200 rounded-lg text-white font-dmsans font-bold cursor-default">Help this project</button>
                            </div>
                        </div>
                        <div id="thumbnail" className="w-full md:w-4/5 lg:w-3/5 hidden">
                            <p className="font-dmsans font-semibold bg-gradient-to-r from-primary to-secondary inline-block text-transparent bg-clip-text text-xl">thumbnail preview</p>
                            <div className="relative flex flex-col justify-center items-center bg-gradient-to-r from-primary to-secondary h-44 md:h-60 w-11/12 rounded-md">
                                <p className="absolute font-dmsans top-3 right-3 z-30 py-2 px-3 bg-gray-500 bg-opacity-75 text-white text-sm font-bold rounded-full lowercase">{newProject.categoryName}</p>
                                <div className="flex flex-col justify-center items-center h-full w-full bg-gray-300 rounded-md filter brightness-75">
                                    <img id="coverPreview" src={coverPicture && coverPicture.cover ? coverPicture.cover : `${import.meta.env.VITE_API_URL}users/${userData.userUrl}/profileBanner`} className="h-full w-full rounded-md object-cover bg-555" />
                                </div>
                            </div>
                            <div className="flex items-center justify-between gap-3 pt-3 w-11/12">
                                <div className="flex items-center justify-between gap-3">
                                    <div className="h-12 w-12 rounded-full overflow-hidden bg-black group">
                                        <img src={`${import.meta.env.VITE_API_URL}users/${userData.userUrl}/profilePicture`} className="group-hover:scale-110 transition-all duration-150 bg-555" />
                                    </div>
                                    <div className="flex flex-col">
                                        <h3 className="font-dmsans text-2xl font-bold text-black text-opacity-75">{newProject.title.length > 15 ? `${newProject.title.slice(0, 15)}...` : newProject.title}</h3>
                                        <h3 className="font-dmsans text-black transition duration-300 text-opacity-75 text-sm ">by {userData.userUrl}</h3>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1 text-right">
                                    <p className="font-dmsans text-black text-opacity-75 text-sm font-semibold flex items-center justify-end gap-1">
                                        <img className="w-5 opacity-75" src={like} alt="Like Icon" />
                                        0
                                    </p>
                                    <p className="font-dmsans text-black text-opacity-75 text-sm font-semibold">0% complete</p>
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
