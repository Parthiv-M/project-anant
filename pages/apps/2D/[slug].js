import axios from 'axios';
import Session from 'supertokens-auth-react/recipe/session';
Session.addAxiosInterceptors(axios);
import { Toaster } from "react-hot-toast";
import { MyToaster } from "../../../functions/toaster";
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { saveAs } from "file-saver";
import b64ToBlob from "b64-to-blob";
import Link from 'next/link';
import { useRouter } from 'next/router';
import Meta from '../../../components/common/Meta/Meta';
import 'react-tooltip/dist/react-tooltip.css';

export default function MxeneResult({ twoDData, slug }) {
    const router = useRouter();
    const [Model3D, setModel3D] = useState(<p>Model is loading...</p>);
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);

    async function getUserInfo() {
        if (await Session.doesSessionExist()) {
            setLoggedIn(true)
        }
    }

    useEffect(() => {
        getUserInfo()
    }, [])

    useEffect(() => {
        const DynamicComponent = dynamic(() => import('../../../components/mxene/ThreeDModel'), { ssr: false });
        setModel3D(
            <DynamicComponent
                fileContents={twoDData.pdb_file_content}
            />);
    }, [])


    const handleDownload = async () => {
        if (loggedIn) {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/download2D/?id=${slug}`)
                const blob = b64ToBlob(res.data, "application/zip");
                saveAs(blob, `anant_2D.zip`);
                MyToaster({ header: "Download successfull!", message: `Your 2D material data was downloaded` });
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.log(error);
                MyToaster({ header: "Download failed!", message: "There was an error downloading your 2D material data" });
            }
        } else {
            setLoading(false);
            MyToaster({ header: "Login to download!", message: "Please login to download 2D material data" });
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-start pt-16 container">
            <Toaster position="top-right" />
            <Meta title={`${twoDData.compound} | Topology Database`} extraKeywords={"topology"} />
            <div className="my-8 text-center">
                <h2 className="md:text-4xl text-3xl font-bold text-white">{twoDData.compound}</h2>
                <div className="w-56 mx-auto my-2 h-1 bg-gray-100"></div>
            </div>
            <div className="lg:p-12 p-4 grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-2">
                <div className="min-h-[40vh] h-full w-full flex justify-center items-center result-card rounded-lg" id="apphere">
                    {Model3D}
                </div>
                <div className="result-card h-full w-full justify-start items-start p-4 rounded-lg">
                    <textarea
                        disabled={true}
                        value={twoDData.poscar_data}
                        className="w-full focus:outline-none border-2 border-gray-300 my-2 p-2 h-full"
                        rows={5}
                    ></textarea>
                </div>
                <div className="">

                </div>
                <div className="flex flex-col items-center justify-between">
                    <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-2">
                        <div className="bg-gray-200 flex flex-col items-center justify-center rounded-lg p-2 text-center">
                            <h4 className="md:text-3xl text-2xl theme-text font-bold">{parseFloat(twoDData.latticeParam).toFixed(2).toString()}</h4>
                            <h5 className="text-lg">Lattice Constant (Å)</h5>
                        </div>
                        <div className="bg-gray-200 flex flex-col items-center justify-center rounded-lg p-2 text-center">
                            <h4 className="md:text-3xl text-2xl theme-text font-bold">{parseFloat(twoDData.formationEnergy).toFixed(2).toString()}</h4>
                            <h5 className="text-lg">Formation Energy (eV)</h5>
                        </div>
                        <div className="bg-gray-200 flex flex-col items-center justify-center rounded-lg p-2 text-center">
                            <h4 className="md:text-3xl text-2xl theme-text font-bold">{parseFloat(twoDData.eHull).toFixed(2).toString()}</h4>
                            <h5 className="text-lg">Hull Energy (eV)</h5>
                        </div>
                        <div className="bg-gray-200 flex flex-col items-center justify-center rounded-lg p-2 text-center">
                            <h4 className="md:text-3xl text-2xl theme-text font-bold">{Number(parseFloat(twoDData.phononFreq).toFixed(5)).toExponential()}</h4>
                            <h5 className="text-lg">Phonon Frequency (abs)</h5>
                        </div>
                    </div>
                    <div className="hover:theme border border-white w-full bg-white hover:text-white text-black mt-2">
                        {!loading ? <button
                            onClick={() => {
                                setLoading(true);
                                handleDownload()
                            }}
                            className="w-full my-2 uppercase text-lg outline-none"
                        >
                            <span><i className="fa fa-download mx-1"></i></span> Download
                        </button>
                            :
                            <button
                                className="w-full my-2 uppercase text-lg outline-none"
                            >
                                <span><i className="fa fa-circle-o-notch mr-2 animate-spin"></i></span> Please wait
                            </button>}
                    </div>
                </div>
            </div>
            <div className='flex flex-row justify-between container md:mb-12 lg:px-8 p-4 text-white'>
                <p onClick={() => router.back()} className="cursor-pointer hover:underline"><i className='fa fa-arrow-left pr-2'></i>Go back</p>
                <Link href="/apps/topology/search"><p className="cursor-pointer hover:underline"><i className='fa fa-search pr-2'></i>Search Page</p></Link>
            </div>
            <style>{`
        .result-card {
          background-color: rgba(255,255,255,0.9)
        }
        .card:hover .float-heading {
          transform: translateY(-10px);
          opacity: 0;
          transition: all 300ms ease-in-out;
        }
      `}</style>
        </div>
    )
}

export const getServerSideProps = async (context) => {
    const twoDMaterial = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/search2D/searchbyid/${context.params.slug}`
    ).catch(err => {
        console.log(err)
        context.res.writeHead(302, { Location: "/500" });
        context.res.end();
    });
    const twoD = twoDMaterial ? await twoDMaterial.json() : {};
    return {
        props: {
            twoDData: twoD,
            slug: context.params.slug,
        }
    };
};
