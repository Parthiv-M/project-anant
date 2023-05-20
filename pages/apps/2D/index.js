
import React, { Fragment, useEffect, useState } from 'react';
import Image from "next/image"
import Link from "next/link"
import Meta from "../../../components/common/Meta/Meta"

import Session from 'supertokens-auth-react/recipe/session';
import Modal from '../../../components/common/Modal';

export default function TwoDMaterials() {
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
            <Meta title="2D Materials Database | Project aNANt" extraKeywords={"2d database, two dimensional, functional materials"} />
            <div className="pt-20 lg:pt-8">
                <h2 className="md:text-4xl text-3xl font-bold text-white">2D Materials Database</h2>
                <div className="w-56 mx-auto my-2 h-1 bg-gray-100"></div>
            </div>
            <div className="container flex lg:flex-row flex-col items-center justify-center mb-12">
                <div className="lg:w-1/2 w-full px-8 md:px-8">
                    <Image src="/images/2DDatabaseCard.png" height="100" width="200" layout="responsive" />
                </div>
                <div className="lg:w-1/2 w-full px-8 pt-5 md:pt-0  text-center flex flex-col-reverse lg:flex-col">
                    <p className="md:text-xl text-lg text-white lg:text-justify">
                        Octahedral two-dimensional materials are considered to be promising photocatalysts. Apart from catalysis, these materials also have 
                        extensive applications in spintronics, 2D ferromagnets, quantum computers, and topological insulators, to name a few.  A database of 
                        3099 octahedral 2D materials, termed as 2DO database, is available with their calculated properties. 
                    </p>
                    <Link href="/apps/2D/search">
                        <button
                            className="w-full lg:w-auto bg-gray-900 text-white rounded-md text-lg px-4 py-3 my-3 hover:translate-y-1 outline-none"
                        >
                            <span><i className="fa fa-search mr-2"></i></span>
                            Go to search
                        </button>
                    </Link>
                </div>
            </div>
            <Modal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />
        </div>
    )
} 