import React, { useState, useEffect, Fragment } from 'react';
import { useRouter } from 'next/router';

import Session from 'supertokens-auth-react/recipe/session';
import { signOut } from "supertokens-auth-react/recipe/thirdparty";

const genMenuOptions = [
    { name: "Apps", href: "/apps" },
    { name: "Publications", href: "/publications" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" }
]

const mxeneOptions = [
    { name: "Home", href: "/" },
    { name: "About", href: "/apps/mxene" },
    { name: "MXene Search", href: "/apps/mxene/search" }
]

const topologyOptions = [
    { name: "Home", href: "/" },
    { name: "About", href: "/apps/topology" },
    { name: "Topology Search", href: "/apps/topology/search" }
]
const MobileNav = () => {
    const [navBarOpen, setNavbarOpen] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [index, setIndex] = useState(0);
    const [menuOptions, setMenuOptions] = useState(null);

    const router = useRouter();

    async function onLogout() {
        await signOut();
        router.reload()
    }

    async function getUserInfo() {
        if (await Session.doesSessionExist()) {
            setLoggedIn(true)
        }
    }

    useEffect(() => {
        getUserInfo()
    }, [])

    useEffect(() => {
        const cleanPath = router.pathname.split("/").filter((el) => el !== '')[1];
        switch (cleanPath) {
            case "mxene":
                setMenuOptions(mxeneOptions);
                break;
            case "topology":
                setMenuOptions(topologyOptions);
                break;
            default:
                setMenuOptions(genMenuOptions);
                break;
        }
    }, [router.pathname.split("/").filter((el) => el !== '')[1]])

    const currentURL = router.asPath;
    const queries = router.query;
    const currentPage = currentURL.split('/')
    let redirectToAfterLogin
    if (currentURL.split("?")[0] === "/apps/mxene/filter") {
        if (currentPage[3].split("?")[0] == "filter") {
            redirectToAfterLogin = `/apps/mxene/filter/redirection`
            if (queries.M1) {
                redirectToAfterLogin += `/${queries.M1}`
            } else {
                redirectToAfterLogin += `/_`
            }
            if (queries.M2) {
                redirectToAfterLogin += `/${queries.M2}`
            } else {
                redirectToAfterLogin += `/_`
            }
            if (queries.T1) {
                redirectToAfterLogin += `/${queries.T1}`
            } else {
                redirectToAfterLogin += `/_`
            }
            if (queries.T2) {
                redirectToAfterLogin += `/${queries.T2}`
            } else {
                redirectToAfterLogin += `/_`
            }
            if (queries.X) {
                redirectToAfterLogin += `/${queries.X}`
            } else {
                redirectToAfterLogin += `/_`
            }
            if (queries.bandGap) {
                redirectToAfterLogin += `/${queries.bandGap}`
            } else {
                redirectToAfterLogin += `/_`
            }
            if (queries.currentPage) {
                redirectToAfterLogin += `/${queries.currentPage}`
            } else {
                redirectToAfterLogin += `/_`
            }
        }
    } else {
        redirectToAfterLogin = currentURL
    }

    return (
        <Fragment>
            {navBarOpen ?
                <div className='transition ease-in-out fixed z-50 bottom-0 lg:hidden flex flex-col justify-end w-full h-full' style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', opacity: '1' }}>
                    <div className="relative inset-0 transition-opacity"
                    >
                        <div className='w-11/12 md:w-3/4 min-h-3/4 mx-auto bg-white rounded-t-lg p-5'>
                            <p className='mb-2'>{loggedIn ? "You are already logged in." : "You are not logged in."}</p>
                            {loggedIn ?
                                <div onClick={onLogout}>
                                    <div className="10 mb-1 flex flex-col items-center justify-center bg-[#163F65] py-2 hover:bg-black cursor-pointer text-white" onClick={() => setNavbarOpen(false)} >
                                        Logout
                                    </div>
                                </div>
                                :
                                <div onClick={() => router.push(`/auth?redirectToPath=${redirectToAfterLogin}`)}>
                                    <div className='h-10 mb-1 flex flex-col items-center justify-center bg-[#163F65] py-2 hover:bg-black cursor-pointer text-white' onClick={() => setNavbarOpen(false)}>
                                        Login
                                    </div>
                                </div>}
                            {menuOptions.map((option, index) => {
                                return (
                                    <a href={option.href} key={index}>
                                        <div className="flex items-center w-full py-2 my-5 text-black font-medium hover:text-white hover:bg-gray-400 pl-5" key={index}>
                                            <p>{option.name}</p>
                                        </div>
                                    </a>
                                )
                            })}
                            <div className='h-10 flex flex-col items-center justify-center py-2 bg-white hover:bg-black border-2 border-black cursor-pointer text-black hover:text-white' onClick={() => setNavbarOpen(false)}>
                                <i className='fa fa-times'></i>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className="mobile-nav fixed w-20 bg-white h-10 bottom-0 right-12 z-50 rounded-t-2xl text-center lg:hidden flex flex-col justify-start cursor-pointer border-2 border-[#163F65]" onClick={() => setNavbarOpen(!navBarOpen)}>
                    <p className="text-3xl font-black"><i className='fa fa-bars'></i></p>
                </div>}
        </Fragment >
    )
}

export default MobileNav