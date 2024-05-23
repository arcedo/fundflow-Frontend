import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getReviewsByUser } from "../services";
import positiveReview from "../assets/icons/positiveReview.svg";
import negativeReview from "../assets/icons/negativeReview.svg";

function ProfileFeedback() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        await getReviewsByUser(localStorage.getItem('token'))
            .then((data) => {
                if (data) {
                    setReviews(data);
                    console.log('reviews', data);
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
                            {/* {reviews ? reviews.filter(review => review.rating === true).length : 0} */}
                        </p>
                    </div>
                    <hr className="rotate-90 border-black w-12" />
                    <div >
                        <p className="text-black text-xl font-dmsans font-semibold">Negative</p>
                        <p className="font-montserrat text-lg font-medium">
                            {/* {reviews ? reviews.filter(review => review.rating === false).length : 0} */}
                        </p>
                    </div>
                </div>
            </div>
            
            <div className="w-full">
                <h2 className="font-dmsans font-bold text-2xl opacity-60">reviews</h2>
                <div className="w-full flex flex-col justify-around items-center gap-6 pt-8">
                    <div className={`flex gap-2.5 items-end w-full border-555/55 pb-6 font-dmsans`}>
                        <img src={positiveReview} alt="" className={`w-12 h-12 rounded-full object-contain`} />
                        <div className="flex flex-col gap-1 w-11/12">
                            <div className="flex gap-1">
                                <Link to="." className="text-black opacity-75 font-medium hover:text-secondary transition-colors duration-200 w-fit">User1</Link>
                                <p className="text-black opacity-75 font-medium">in</p>
                                <Link to="." className="text-black opacity-75 font-bold hover:text-primary transition-colors duration-200 w-fit">Project1</Link>
                            </div>
                            <p className="font-normal text-black">wao</p>
                        </div>
                    </div>
                    {/* {reviews.length > 0 ? reviews.map((review, index) => (
                        <div key={review._id} className={`flex gap-2.5 items-end w-full ${reviews.length - 1 === index ? 'border-none' : 'border-b-2'} border-555/55 pb-6 font-dmsans`}>
                            <img src={review.rating ? positiveReview : negativeReview} alt="" className={`w-12 h-12 rounded-full object-contain ${review.rating ? 'rotate-0' : 'rotate-180'}`} />
                            <div className="flex flex-col gap-1 w-11/12">
                                <Link to="." className="text-black opacity-75 font-medium hover:text-secondary transition-colors duration-200 w-fit">{review.userUrl}</Link>
                                <p className="font-normal text-black">{review.body}</p>
                            </div>
                        </div>
                    )) : <p className="font-dmsans text-black opacity-75">no reviews yet</p>} */}
                </div>
            </div>
        </section>
    )
}

export default ProfileFeedback;