import React from 'react';
import axios from 'axios';
import Accordion from '../../common/Accordion';
import { Toaster } from "react-hot-toast";
import { MyToaster } from "../../../functions/toaster";

const Contact = (props) => {
    // method to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        let formData = new FormData(e.target);
        formData.append('service_id', process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID);
        formData.append('template_id', process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID);
        formData.append('user_id', process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);
        formData.append('from_name', document.getElementById("contact-form").elements["first_name"].value + " " + document.getElementById("contact-form").elements["last_name"].value);
        formData.append('reply_to', document.getElementById("contact-form").elements["from_email"]).value;

        let res = await axios.post("https://api.emailjs.com/api/v1.0/email/send-form", formData)
        if (res.status === 200) {
            MyToaster({ header: "Thank you!", message: "We have received your email!" });
            e.target.reset();   // resets form data
        } else {
            MyToaster({ header: "Oops", message: "We did not get that message!" });
        }
    }

    return (
        <div className="w-screen flex flex-col items-center justify-center mt-14 md:mt-20 mb-20 md:px-0 px-2">
            <Toaster position="top-right" />
            <div className="my-4">
                <h2 className="md:text-4xl text-xl text-white text-center">Contact Us</h2>
                <div className="w-56 mx-auto my-2 h-1 bg-gray-100"></div>
            </div>
            <form id="contact-form" onSubmit={(e) => handleSubmit(e)} className="container md:w-2/3 py-4 md:px-0 px-6 flex flex-col items-center justify-center rounded-lg" style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}>
                <div className="flex flex-col md:flex-row justify-between md:w-3/4 w-full m-1">
                    <div className="flex flex-col md:w-1/2 md:mr-1">
                        <p className="text-white text-sm md:text-md">First Name</p>
                        <input required className="w-full h-10 p-2 text-black rounded border-2 border-gray-300 focus:outline-none" type="text" name="first_name" />
                    </div>
                    <div className="flex flex-col md:w-1/2 md:ml-1">
                        <p className="text-white text-sm md:text-md">Last Name</p>
                        <input required className="w-full h-10 p-2 text-black rounded border-2 border-gray-300 focus:outline-none" type="text" name="last_name" />
                    </div>
                </div>
                <div className="md:w-3/4 w-full flex flex-col ">
                    <div className="my-1">
                        <p className="text-white text-sm md:text-md">Email</p>
                        <input required className="w-full h-10 p-2 text-black rounded border-2 border-gray-300 focus:outline-none" type="email" name="from_email" />
                    </div>
                    <div className="my-1">
                        <p className="text-white text-sm md:text-md" name="message">Message</p>
                        <textarea required style={{ minHeight: 130, maxHeight: 200 }} className="w-full p-2 text-black rounded border-2 border-gray-300 focus:outline-none" name="message" />
                    </div>
                </div>
                <div className="lg:w-3/4 w-full text-center lg:text-right my-2">
                    <button type="submit" className="rounded-lg bg-white theme-text px-8 py-2 text-xl hover:-translate-y-0.5 outline-none">Send</button>
                </div>
            </form>
            <div className="md:w-2/3 w-full md:px-0 px-1">
                <div className="mb-4 mt-8">
                    <h2 className="text-3xl font-bold text-white">Frequently Asked Questions</h2>
                    <div className="w-80 rounded my-1 h-1 bg-gray-100"></div>
                </div>
                {
                    props.faqs.length === 0 ? <p>There was an error fetching this data</p> : props.faqs.map((faq, index) => {
                        return (
                            <Accordion title={faq.question} content={<p>{faq.answer}</p>} key={index} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Contact;