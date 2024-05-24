import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getReviewsByUser, getReviewsToUser } from "../services";
import positiveReview from "../assets/icons/positiveReview.svg";
import negativeReview from "../assets/icons/negativeReview.svg";

function ProfileFeedback({ user }) {
    const [reviewsFromOthers, setReviewsFromOthers] = useState([]);
    const [reviewsToOthers, setReviewsToOthers] = useState([]);

    useEffect(() => {
        fetchReviews();
    }, [user]);

    const fetchReviews = async () => {
        await getReviewsByUser(user.id)
            .then((data) => {
                if (data && data.length > 0) {
                    setReviewsToOthers(data);
                }
            })
        await getReviewsToUser(user.id)
            .then((data) => {
                if (data && data.length > 0) {
                    setReviewsFromOthers(data);
                }
            })
    }

    return (
        <section className="w-full flex flex-col gap-16 justify-center items-center min-h-56 py-5 fade-in">
            <div className="flex flex-col lg:flex-row w-full gap-16 lg:gap-48">
                <div className="w-fit">
                    <h2 className="font-dmsans font-bold text-2xl opacity-60">others' ratings</h2>
                    <div className="flex items-center gap-12 pt-8">
                        <div>
                            <p className="text-black text-xl font-dmsans font-semibold">Positive</p>
                            <p className="font-montserrat text-lg font-medium">
                                {reviewsFromOthers ? reviewsFromOthers.filter(review => review.rating === true).length : 0}
                            </p>
                        </div>
                        <hr className="rotate-90 border-black w-12" />
                        <div >
                            <p className="text-black text-xl font-dmsans font-semibold">Negative</p>
                            <p className="font-montserrat text-lg font-medium">
                                {reviewsFromOthers ? reviewsFromOthers.filter(review => review.rating === false).length : 0}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-fit">
                    <h2 className="font-dmsans font-bold text-2xl opacity-60">{user.username}'s ratings</h2>
                    <div className="flex items-center gap-12 pt-8">
                        <div>
                            <p className="text-black text-xl font-dmsans font-semibold">Positive</p>
                            <p className="font-montserrat text-lg font-medium">
                                {reviewsToOthers ? reviewsToOthers.filter(review => review.rating === true).length : 0}
                            </p>
                        </div>
                        <hr className="rotate-90 border-black w-12" />
                        <div >
                            <p className="text-black text-xl font-dmsans font-semibold">Negative</p>
                            <p className="font-montserrat text-lg font-medium">
                                {reviewsToOthers ? reviewsToOthers.filter(review => review.rating === false).length : 0}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full">
                <h2 className="font-dmsans font-bold text-2xl opacity-60">what <span className="underline">others</span> <span className="underline">think</span> about {user.username}'s projects</h2>
                <div className="w-full flex flex-col justify-around items-center gap-6 pt-8">
                    {reviewsFromOthers.length > 0 ? reviewsFromOthers.map((review, index) => (
                        <div key={review._id} className={`flex gap-2.5 items-end w-full ${reviewsFromOthers.length - 1 === index ? 'border-none' : 'border-b-2'} border-555/55 pb-6 font-dmsans`}>
                            <img src={review.rating ? positiveReview : negativeReview} alt="" className={`w-12 h-12 rounded-full object-contain ${review.rating ? 'rotate-0' : 'rotate-180'}`} />
                            <div className="flex flex-col gap-1 w-11/12">
                                <div className="flex gap-1">
                                    <Link to={`/profile/${review.userUrl}`} className="text-black opacity-75 font-semibold hover:text-secondary transition-colors duration-200 w-fit">@{review.userUrl}</Link>
                                    <p className="text-black opacity-75 font-medium">in</p>
                                    <Link to={`/projects/${review.projectUrl}`} className="text-black opacity-75 font-bold hover:text-primary transition-colors duration-200 w-fit">{review.projectName ? review.projectName : review.projectUrl}</Link>
                                </div>
                                <p className="font-normal text-black">{review.body}</p>
                            </div>
                        </div>
                    )) : <p className="font-dmsans text-black opacity-75">no reviews yet</p>}
                </div>
            </div>
            <div className="w-full">
                <h2 className="font-dmsans font-bold text-2xl opacity-60">what <span className="underline">{user.username}</span> <span className="underline">thinks</span> about others' projects</h2>
                <div className="w-full flex flex-col justify-around items-center gap-6 pt-8">
                    {reviewsToOthers.length > 0 ? reviewsToOthers.map((review, index) => (
                        <div key={review._id} className={`flex gap-2.5 items-end w-full ${reviewsToOthers.length - 1 === index ? 'border-none' : 'border-b-2'} border-555/55 pb-6 font-dmsans`}>
                            <img src={review.rating ? positiveReview : negativeReview} alt="" className={`w-12 h-12 rounded-full object-contain ${review.rating ? 'rotate-0' : 'rotate-180'}`} />
                            <div className="flex flex-col gap-1 w-11/12">
                                <div className="flex gap-1">
                                    <p className="text-black opacity-75 font-medium">in</p>
                                    <Link to={`/projects/${review.projectUrl}`} className="text-black opacity-75 font-bold hover:text-primary transition-colors duration-200 w-fit">{review.projectName ? review.projectName : review.projectUrl}</Link>
                                </div>
                                <p className="font-normal text-black">{review.body}</p>
                            </div>
                        </div>
                    )) : <p className="font-dmsans text-black opacity-75">no reviews yet</p>}
                </div>
            </div>
        </section>
    )
}

export default ProfileFeedback;