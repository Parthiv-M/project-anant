
import React, { Fragment, useEffect, useState } from 'react';
import Image from "next/image"
import Link from "next/link"
import Meta from "../../../components/common/Meta/Meta"

import Session from 'supertokens-auth-react/recipe/session';
import Modal from '../../../components/common/Modal';

export default function Thermoelectric() {
    const [isOpen, setIsOpen] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    async function getUserInfo() {
        if (await Session.doesSessionExist()) {
            setLoggedIn(true)
        }
    }
    useEffect(() => {
        getUserInfo()
    }, [])
    return (
        <div className="w-screen min-h-screen flex flex-col items-center justify-center">
            <Meta title="Thermoelectric Database | Project aNANt" extraKeywords={"thermoelectric database, functional materials, thermoelectric"} />
            <div className="pt-20 lg:pt-8">
                <h2 className="md:text-4xl text-3xl font-bold text-white">Thermoelectric Database</h2>
                <div className="w-56 mx-auto my-2 h-1 bg-gray-100"></div>
            </div>
            <div className="container flex lg:flex-row flex-col items-center justify-center mb-12">
                <div className="lg:w-1/2 w-full px-8 md:px-8">
                    <Image src="https://ik.imagekit.io/iiscvsmanipal/mxene_NMetdDe-U0?updatedAt=1639042149885" height="100" width="200" layout="responsive" />
                </div>
                <div className="lg:w-1/2 w-full px-8 pt-5 md:pt-0  text-center flex flex-col-reverse lg:flex-col">
                    <p className="md:text-xl text-lg text-white lg:text-justify">
                        To be updated...
                    </p>
                    <Link href="/apps/thermoelectric/search">
                        <button
                            className="w-full lg:w-auto bg-gray-900 text-white rounded-md text-lg px-4 py-3 my-3 hover:translate-y-1 outline-none"
                        >
                            <span><i className="fa fa-search mr-2"></i></span>
                            Go to search
                        </button>
                    </Link>
                    <Fragment>
                        {
                            loggedIn ?
                                <button
                                    onClick={() => setIsOpen(true)}
                                    className="w-full theme bg-gray-300 theme-text rounded-md text-lg px-4 py-3 hover:translate-y-1 outline-none"
                                >
                                    <span><i className="fa fa-database mr-2"></i></span>
                                    Download full database
                                </button>
                                : <p className='text-gray-300'>(Login to download the entire database)</p>
                        }
                    </Fragment>
                </div>
            </div>
            <Modal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                dbType={"thermo"}
            />
        </div>
    )
} 