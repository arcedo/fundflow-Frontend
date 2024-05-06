import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Help() {
    return (
        <div className="w-full bg-white min-h-screen overflow-hidden h-fit flex flex-col gap-16">
            <Header />
            <div className="absolute w-full bottom-56 flex flex-col items-center justify-center gap-10 bg-black text-white rounded-b-full h-screen shadow-xl">
                <div className="flex flex-col justify-center gap-10 w-6/12">
                    <div className="flex flex-col justify-center gap-3 pt-32">
                        <h2 className="text-6xl font-dmsans font-extrabold">We are here,</h2>
                        <p className="text-6xl font-dmsans font-extrabold">do you need a hand?</p>
                    </div>
                    <div className="flex flex-col justify-center gap-1">
                        <p className="font-semibold font-montserrat text-base">At the moment, we do not have a dedicated ticket system for handling issues.</p>
                        <p className="font-semibold font-montserrat text-base">However, you can reach out to us for assistance via email at <span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">help@reasonable.dev</span> or by phone at <span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">123-123-123</span>.</p>
                        <p className="font-semibold font-montserrat text-base pt-4">We are here to help and will respond promptly to your inquiries.</p>
                    </div>
                </div>
            </div>
            <section className="mt-96 pt-96 w-6/12 mx-auto flex flex-col justify-center gap-8 pb-5">
                <div className="flex flex-col justify-center gap-4 pt-20">
                    <h2 id="cookiesPolicy" className="text-6xl font-dmsans font-extrabold">Cookies Policy</h2>
                    <p className="pl-1 font-montserrat font-semibold">Last updated: <span className="italic">May 06, 2024</span></p>
                </div>
                <div className="flex flex-col justify-center gap-4 font-montserrat">
                    <div className="flex flex-col justify-center gap-2">
                        <h3 className="font-dmsans text-3xl font-semibold border-b border-black">Introduction</h3>
                        <p>
                            FundFlow ("us", "we", or "our") uses cookies on fundflow.arcedo.dev (the "Service"). By using the Service, you consent to the use of cookies.
                        </p>
                    </div>
                    <div className="flex flex-col justify-center gap-3">
                        <h3 className="font-dmsans text-3xl font-semibold border-b border-black">Our Cookies Policy</h3>
                        <div className="flex flex-col justify-center gap-2">
                            <h4 className="font-dmsans text-2xl font-semibold">What Are Cookies</h4>
                            <p>
                                Cookies are small pieces of text sent by your web browser by a website you visit. A cookie file is stored in your web browser and allows the Service or a third-party to recognize you and make your next visit easier and the Service more useful to you.
                            </p>
                        </div>
                        <div className="flex flex-col justify-center gap-2">
                            <h4 className="font-dmsans text-2xl font-semibold">
                                How FundFlow Uses Cookies
                            </h4>
                            <p>
                                When you use and access the Service, we may place a number of cookies files in your web browser. We use cookies for the following purposes:
                            </p>
                            <ul className="list-disc pl-5">
                                <li>
                                    <strong>Essential Cookies: </strong>
                                    These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility. You may disable these by changing your browser settings, but this may affect how the website functions.
                                </li>
                                <li>
                                    <strong>Analytics Cookies: </strong>
                                    These cookies allow us to track and analyze user behavior in order to improve our Service. For example, we use Google Analytics to understand how users interact with our website. You can opt-out of Google Analytics by installing the Google Analytics Opt-out Browser Add-on.
                                </li>
                            </ul>
                        </div>
                        <div className="flex flex-col justify-center gap-2">
                            <h4 className="font-dmsans text-2xl font-semibold">
                                Third-Party Cookies
                            </h4>
                            <p>
                                In addition to our own cookies, we may also use various third-parties cookies to report usage statistics of the Service, deliver advertisements on and through the Service, and so on.
                            </p>
                        </div>
                        <div className="flex flex-col justify-center gap-2">
                            <h4 className="font-dmsans text-2xl font-semibold">
                                What Are Your Choices Regarding Cookies
                            </h4>
                            <p>
                                If you'd like to delete cookies or instruct your web browser to delete or refuse cookies, please visit the help pages of your web browser.
                            </p>
                            <p>
                                Please note, however, that if you delete cookies or refuse to accept them, you might not be able to use all of the features we offer, you may not be able to store your preferences, and some of our pages might not display properly.
                            </p>
                        </div>
                        <div className="flex flex-col justify-center gap-2">
                            <h4 className="font-dmsans text-2xl font-semibold">
                                Contact Us
                            </h4>
                            <p>If you have any questions about this Cookies Policy, please contact us:</p>
                            <ul className="list-disc pl-5">
                                <li>By email: <strong>help@fundflow.arcedo.dev</strong></li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center gap-3">
                        <h3 className="font-dmsans text-3xl font-semibold border-b border-black">Changes to This Cookies Policy</h3>
                        <p>We may update our Cookies Policy from time to time. We will notify you of any changes by posting the new Cookies Policy on this page.</p>
                        <p>We will let you know via email and/or a prominent notice on our Service, prior to the change becoming effective and update the "Last updated" date at the top of this Cookies Policy.</p>
                        <p>You are advised to review this Cookies Policy periodically for any changes. Changes to this Cookies Policy are effective when they are posted on this page.</p>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}

export default Help;