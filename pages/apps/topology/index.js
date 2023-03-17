
import React, { Fragment, useEffect, useState } from 'react';
import Image from "next/image"
import Link from "next/link"
import Meta from "../../../components/common/Meta/Meta"

import Session from 'supertokens-auth-react/recipe/session';
import Modal from '../../../components/common/Modal';

export default function Mxene() {
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
            <Meta title="Topology Database | Project aNANt" extraKeywords={"topology database, functional materials, topology"} />
            <div className="pt-20 lg:pt-8">
                <h2 className="md:text-4xl text-3xl font-bold text-white">Topology Database</h2>
                <div className="w-56 mx-auto my-2 h-1 bg-gray-100"></div>
            </div>
            <div className="container py-12 flex lg:flex-row flex-col items-center justify-center mb-12">
                <div className="lg:w-1/2 w-full px-8 md:px-8">
                    <Image src="/images/TopologyDatabaseCard.png" height="100" width="200" layout="responsive" />
                </div>
                <div className="lg:w-1/2 w-full px-8 pt-5 md:pt-0 text-center flex flex-col-reverse lg:flex-col">
                    <p className="md:text-xl text-lg text-white lg:text-justify">
                        MXenes are one of the best classes of material to search for the Quantum Anomalous Hall Effect (QAHE) effect 
                        as its SOC strength and magnetism can be tuned by replacing the transition metals and/or by functionalizing 
                        the surfaces. The discovery of new topological materials with exotic properties for spintronics and quantum 
                        computation applications has gained remarkable research attention in condensed matter physics and material science. 
                        A large class of MXene monolayers exhibiting the exotic topological phases is available in the database and it 
                        is planned to add more new topological materials in the future.
                    </p>
                    <Link href="/apps/topology/search">
                        <button
                            className="w-full lg:w-auto bg-gray-900 text-white rounded-md text-lg px-4 py-3 my-3 hover:translate-y-1 outline-none"
                        >
                            <span><i className="fa fa-search mr-2"></i></span>
                            Go to search
                        </button>
                    </Link>
                    {/* uncomment when required */}
                    {/* <Fragment>
                        {
                            loggedIn ?
                                <a 
                                    className="" 
                                    href="https://drive.google.com/file/d/1_oq6_eObSqUVOon_a-QFYhLeVUIk6qbh/view?usp=sharing" 
                                    target="_blank" 
                                    rel="noreferrer"
                                >
                                    <button
                                        // onClick={() => setIsOpen(true)}
                                        className="w-full theme bg-gray-300 theme-text rounded-md text-lg px-4 py-3 hover:translate-y-1 outline-none"
                                    >
                                        <span><i className="fa fa-database mr-2"></i></span>
                                        Download full database
                                    </button>
                                </a> : <p className='text-gray-300'>(Login to download the entire database)</p>
                        }
                    </Fragment> */}
                </div>
            </div>
            <Modal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />
        </div>
    )
} 