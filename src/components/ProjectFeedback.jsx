import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import positiveReview from "../assets/icons/positiveReview.svg";
import negativeReview from "../assets/icons/negativeReview.svg";
import { getProjectReviews, postReview, deleteReview } from "../services";
import cross from "../assets/icons/cross.svg";

function ProjectFeedback({ project, userStats, userData, setProject }) {
    const [newReview, setNewReview] = useState({ evaluation: '', content: '' });
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchReviews();
    }, [project, setProject]);

    const fetchReviews = async () => {
        await getProjectReviews(project.id)
            .then((data) => {
                if (data) {
                    setReviews(data);
                }
            })
    }

    const handlePostReview = async () => {
        if (!newReview.content.trim()) {
            setError("Review content cannot be empty.");
            setTimeout(() => {
                setError("");
            }, 2000);
            return;
        }
        if (newReview.evaluation === '') {
            setError("Please select an evaluation.");
            setTimeout(() => {
                setError("");
            }, 2000);
            return;
        }
        setError("");
        await postReview(project.id, localStorage.getItem('token'), newReview.content, newReview.evaluation, userData.userUrl, project.title, project.idUser, project.projectUrl)
            .then((data) => {
                if (data._id) {
                    setNewReview({ evaluation: '', content: '' });
                    setReviews([...reviews, data]);
                }
            })
    }

    const handleDeleteReview = async (reviewId) => {
        await deleteReview(localStorage.getItem('token'), project.id, reviewId)
            .then((data) => {
                if (data.code === 200) {
                    setReviews(reviews.filter(review => review._id !== reviewId));
                }
            })
    }
    return (
        <section className="w-full flex flex-col gap-16 justify-center items-center min-h-56 py-5 fade-in">
            <div className="w-full">
                <h2 className="font-dmsans font-bold text-2xl opacity-60">overall feedback</h2>
                <div className="flex items-center gap-12 pt-8">
                    <div>
                        <p className="text-black text-xl font-dmsans font-semibold">Positive</p>
                        <p className="font-montserrat text-lg font-medium">
                            {reviews && reviews.length > 0 ? reviews.filter(review => review.rating === true).length : 0}
                        </p>
                    </div>
                    <hr className="rotate-90 border-black w-12" />
                    <div>
                        <p className="text-black text-xl font-dmsans font-semibold">Negative</p>
                        <p className="font-montserrat text-lg font-medium">
                            {reviews && reviews.length > 0 ? reviews.filter(review => review.rating === false).length : 0}
                        </p>
                    </div>
                </div>
            </div>
            {
                userData && userStats && (userStats.funded || userStats.collaborator) && reviews && reviews.filter(review => review.userUrl === userData.userUrl).length === 0 &&
                <div className="w-full shadow-xl bg-white/65 backdrop-blur-md py-5 rounded-md">
                    <div className="w-11/12 mx-auto">
                        <h2 className="font-dmsans font-bold text-2xl opacity-60">write your review</h2>
                        <div className="flex flex-col lg:flex-row gap-5 justify-center py-5">
                            <div className="rounded-full w-16 h-16 flex justify-center items-center overflow-hidden shadow-md">
                                <img src={`${import.meta.env.VITE_API_URL}users/${userData.userUrl}/profilePicture`} alt="user image" className="w-full h-full" />
                            </div>
                            <div className="w-full lg:w-11/12 flex flex-col justify-center gap-4 font-dmsans">
                                <div className="">
                                    <label className="hidden" htmlFor="newReview">Review content</label>
                                    <textarea name="newReview" id="newReview" placeholder="what do you think of this project?" value={newReview.content} onChange={(e) => setNewReview({ ...newReview, content: e.target.value })} className="p-3 resize-none w-full rounded-md border border-black border-opacity-20" rows={5}></textarea>
                                    <p className="font-medium text-black opacity-60">You can only post one review per project</p>
                                </div>
                                <div className="flex flex-col lg:flex-row justify-between items-center">
                                    <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-8">
                                        <p className="font-medium">How would you rate this project?</p>
                                        <div className="flex gap-3">
                                            <button onClick={() => setNewReview({ ...newReview, evaluation: true })} className={`flex justify-center border-2 ${newReview.evaluation === true ? ' border-green-600 shadow-md' : 'border-transparent'} items-center px-1 rounded-md pr-3 bg-transparent `}>
                                                <img src={positiveReview} alt="" className="w-10 h-10" />
                                                Positive
                                            </button>
                                            <button onClick={() => setNewReview({ ...newReview, evaluation: false })} className={`flex justify-center border-2 ${newReview.evaluation === false ? ' border-red-600 shadow-md' : 'border-transparent'} items-center px-1 rounded-md pr-3 bg-transparent `}>
                                                <img src={negativeReview} alt="" className="w-10 h-10 rotate-180" />
                                                Negative
                                            </button>
                                        </div>
                                    </div>
                                    <button onClick={handlePostReview} className="flex justify-center items-center font-semibold text-white rounded-lg bg-gradient-to-r from-primary to-secondary hover:opacity-75 transition-all duration-200 border-none h-11 w-full mt-4 lg:mt-0 lg:w-2/12">Post review</button>
                                </div>
                                {error && <p className="text-red-500">{error}</p>}
                            </div>
                        </div>
                    </div>
                </div>
            }
            <div className="w-full">
                <div className="flex flex-col gap-1">
                    <h2 className="font-dmsans font-bold text-2xl opacity-60">reviews</h2>
                    <p className="font-dmsans text-black opacity-75">reviews are written by people who have collaborated on this project</p>
                </div>
                <div className="w-full flex flex-col justify-around items-center gap-6 pt-8">
                    {reviews.length > 0 ? reviews.map((review, index) => (
                        <div key={review._id} className={`flex gap-2.5 items-end w-full ${reviews.length - 1 === index ? 'border-none' : 'border-b-2'} border-555/55 pb-6 font-dmsans`}>
                            <img src={review.rating ? positiveReview : negativeReview} alt="" className={`w-12 h-12 rounded-full object-contain ${review.rating ? 'rotate-0' : 'rotate-180'}`} />
                            <div className="flex flex-col gap-1 w-11/12">
                                <Link to={`/profile/${review.userUrl}`} className="text-black opacity-75 font-medium hover:text-secondary transition-colors duration-200 w-fit">@{review.userUrl}</Link>
                                <p className="font-normal text-black">{review.body}</p>
                            </div>
                            {userData && review.userUrl === userData.userUrl &&
                                <button onClick={() => handleDeleteReview(review._id)} className="flex justify-center items-center w-8 h-8 rounded-full bg-white/55 shadow-md border-black/5 border hover:bg-red-600 transition-all duration-200 group">
                                    <img src={cross} alt="" className="w-4 h-4 grayscale-0 group-hover:grayscale" />
                                </button>
                            }
                        </div>
                    )) : <p className="font-dmsans text-black opacity-75">no reviews yet</p>}
                </div>
            </div>
        </section>
    )
}

export default ProjectFeedback;
