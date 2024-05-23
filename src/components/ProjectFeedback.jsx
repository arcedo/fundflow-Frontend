import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import positiveReview from "../assets/icons/positiveReview.svg";
import negativeReview from "../assets/icons/negativeReview.svg";

function ProjectFeedback({ project, userStats, userData }) {
    const [newReview, setNewReview] = useState({ evaluation: '', content: '' });
    return (
        <section className="w-full flex flex-col gap-16 justify-center items-center min-h-56 py-5 fade-in">
            <div className="w-full">
                <h2 className="font-dmsans font-bold text-2xl opacity-60">overall feedback</h2>
                <div className="flex items-center gap-12 pt-8">
                    <div>
                        <p className="text-black text-xl font-dmsans font-semibold">Positive</p>
                        <p className="font-montserrat text-lg font-medium">123</p>
                    </div>
                    <hr className="rotate-90 border-black w-12" />
                    <div >
                        <p className="text-black text-xl font-dmsans font-semibold">Negative</p>
                        <p className="font-montserrat text-lg font-medium">123</p>
                    </div>
                </div>
            </div>
            {
                userData && userStats && (userStats.funded || userStats.collaborator) && <div className="w-full shadow-xl bg-white/65 backdrop-blur-md py-5 rounded-md">
                    <div className="w-11/12 mx-auto">
                        <h2 className="font-dmsans font-bold text-2xl opacity-60">write your review</h2>
                        <div className="flex gap-5 justify-center py-5">
                            <div className="rounded-full w-16 h-16 flex justify-center items-center overflow-hidden shadow-md">
                                <img src={`${import.meta.env.VITE_API_URL}users/${userData.userUrl}/profilePicture`} alt="user image" className="w-full h-full" />
                            </div>
                            <div className="w-11/12 flex flex-col justify-center gap-4 font-dmsans">
                                <label className="hidden" htmlFor="newReview">Review content</label>
                                <textarea name="newReview" id="newReview" placeholder="what do you think of this project?" value={newReview.content} onChange={(e) => setNewReview({ ...newReview, content: e.target.value })} className="p-3 resize-none w-full rounded-md border border-black border-opacity-20" rows={5}></textarea>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-8">
                                        <p className="font-medium">How would you rate this project?</p>
                                        <div className="flex gap-3">
                                            <button onClick={() => setNewReview({ ...newReview, evaluation: true })} className={`flex justify-center border-2 ${newReview.evaluation === true ? ' border-green-600 shadow-md' : 'border-transparent'} items-center px-1 rounded-md pr-3`}>
                                                <img src={positiveReview} alt="" className="w-10 h-10" />
                                                Positive
                                            </button>
                                            <button onClick={() => setNewReview({ ...newReview, evaluation: false })} className={`flex justify-center border-2 ${newReview.evaluation === false ? ' border-red-600 shadow-md' : 'border-transparent'} items-center px-1 rounded-md pr-3`}>
                                                <img src={negativeReview} alt="" className="w-10 h-10 rotate-180" />
                                                Negative
                                            </button>
                                        </div>
                                    </div>
                                    <button className="flex justify-center items-center font-semibold text-white rounded-lg bg-gradient-to-r from-primary to-secondary hover:opacity-75 transition-all duration-200 border-none h-11 w-2/12">Post review</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <div className="w-full">
                <h2 className="font-dmsans font-bold text-2xl opacity-60">reviews</h2>
                <div className="w-full flex flex-col items-center gap-6 pt-8">
                    <div className="flex gap-2.5 items-end w-full border-b-2 border-555/55 pb-6 font-dmsans">
                        <img src={positiveReview} alt="" className="w-12 h-12 object-contain" />
                        <div className="flex flex-col gap-1">
                            <Link to="." className="text-black opacity-75 font-medium hover:text-secondary transition-colors duration-200 w-fit">User One</Link>
                            <p className="font-normal text-black">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis minus excepturi nemo aspernatur, explicabo perferendis adipisci neque aliquam quae libero incidunt voluptas suscipit! Commodi, nam quo repellat dicta odio sed libero doloremque obcaecati saepe aliquam, pariatur sit dolorum, reiciendis deleniti autem non facilis voluptate consectetur. Cupiditate quaerat labore praesentium accusantium!</p>
                        </div>
                    </div>
                    <div className="flex gap-2.5 items-end w-full border-none border-555/55 pb-6 font-dmsans">
                        <img src={negativeReview} alt="" className="w-12 h-12 object-contain rotate-180" />
                        <div className="flex flex-col gap-1">
                            <Link to="." className="text-black opacity-75 font-medium hover:text-secondary transition-colors duration-200 w-fit">User One</Link>
                            <p className="font-normal text-black">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis minus excepturi nemo aspernatur, explicabo perferendis adipisci neque aliquam quae libero incidunt voluptas suscipit! Commodi, nam quo repellat dicta odio sed libero doloremque obcaecati saepe aliquam, pariatur sit dolorum, reiciendis deleniti autem non facilis voluptate consectetur. Cupiditate quaerat labore praesentium accusantium!</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProjectFeedback;