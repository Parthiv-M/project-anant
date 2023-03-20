import React, { useState, useEffect, useRef } from "react";

import { useRouter } from 'next/router'
import Link from "next/link"

import Sidebar from "../Sidebar/Sidebar";


const menuOptions = [
    { name: "Home", href: "/" },
    { name: "Apps", href: "/apps" },
    { name: "Publications", href: "/publications" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" }
]

const NavBar = () => {
    const [isActiveIndex, setIsActiveIndex] = useState(null);
    const [expanded, setExpanded] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const ref = useRef()

    const handleClick = () => {
        setExpanded(true);
        setIsMenuOpen(true);
        const sidebar = document.querySelector('.sidebar');
        sidebar.classList.toggle('translate-x-full');
    }

    const router = useRouter();
    useEffect(() => {
        const checkIfClickedOutside = e => {
            if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
                setIsMenuOpen(false);
                const sidebar = document.querySelector('.sidebar');
                sidebar.classList.toggle('translate-x-full');
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)
        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [isMenuOpen]);

    useEffect(() => {
        const cleanedPath = router.pathname.split("/").filter((el) => el !== '')[0];
        switch (cleanedPath) {
            case "apps":
                setIsActiveIndex(1);
                break;
            case "publications":
                setIsActiveIndex(2);
                break;
            case "about":
                setIsActiveIndex(3);
                break;
            case "contact":
                setIsActiveIndex(4);
                break;
            default:
                setIsActiveIndex(0);
                break;
        }
    }, [router.pathname]);

    return (
        <navbar className="flex h-16 fixed top-0 w-screen items-center z-20 theme">
            <div className="lg:w-1/4 w-full h-full lg:p-2 py-5">

            </div>
            <div className="md:w-3/4 h-full w-screen flex justify-end">
                <div className="w-full items-center bg-[#163F65] justify-center lg:grid hidden h-full grid-cols-5">
                    {
                        menuOptions.map((option, index) => (
                            <Link key={index} href={option.href} className="px-2">
                                <div className={`p-3 flex ${isActiveIndex === index ? "theme" : "bg-gray-100"} items-center justify-center cursor-pointer`} onClick={() => setIsActiveIndex(index)}>
                                    <a className={`${isActiveIndex === index ? "text-gray-100" : "text-gray-900"} text-xl`}>{option.name}</a>
                                </div>
                            </Link>
                        ))
                    }
                </div>
                <div className="md:w-40 w-24 py-5 bg-theme hidden lg:flex justify-center items-center">
                    <i className="fa fa-bars text-3xl text-white cursor-pointer" onClick={handleClick}></i>
                </div>
                <div className="sidebar h-screen w-96 absolute right-0 translate-x-full transform transition duration-700 ease-in-out" ref={ref}>
                    <Sidebar />
                </div>
            </div>
        </navbar>
    );
}

export default NavBar;