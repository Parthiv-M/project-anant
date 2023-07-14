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
import { Tooltip } from "react-tooltip";
import 'react-tooltip/dist/react-tooltip.css';
import Image from 'next/image';
import molecularNameResolver from '../../../functions/moleculeNameResolver';

export default function MxeneResult({ thermoData, slug }) {
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
                fileContents={thermoData.pdb_file_content}
            />);
    }, [])

    const handleDownload = async () => {
        if (loggedIn) {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/downloadThermo/?id=${slug}`)
                const blob = b64ToBlob(res.data, "application/zip");
                saveAs(blob, `anant_thermo.zip`);
                MyToaster({ header: "Download successfull!", message: `Your thermoelectric material data was downloaded` });
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.log(error);
                MyToaster({ header: "Download failed!", message: "There was an error downloading your thermoelectric material data" });
            }
        } else {
            setLoading(false);
            MyToaster({ header: "Login to download!", message: "Please login to download thermoelectric material data" });
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-start pt-16 container">
            <Toaster position="top-right" />
            <Meta title={`Thermoelectric Materials Database`} extraKeywords={"thermoelectric"} />
            <div className="my-8 text-center">
                <p className="md:text-4xl text-3xl font-bold text-white" dangerouslySetInnerHTML={{ __html: molecularNameResolver({ fullMaterial: thermoData.material }) }}></p>
                <div className="w-56 mx-auto my-2 h-1 bg-gray-100"></div>
            </div>
            <div className="w-full lg:p-24 p-4 grid lg:grid-cols-2 grid-cols-1 gap-2">
                <div className="min-h-[40vh] h-full w-full flex justify-center items-center result-card rounded-lg" id="apphere">
                    {Model3D}
                </div>
                <div className="result-card h-full w-full justify-start items-start p-4 rounded-lg">
                    <textarea
                        disabled={true}
                        value={thermoData.poscar_data}
                        className="w-full focus:outline-none border-2 border-gray-300 my-2 p-2 h-full"
                        rows={5}
                    ></textarea>
                </div>
                {
                    thermoData.elect_band_structure &&
                    <div className="bg-white rounded-lg p-1">
                        <div className="px-2 py-1 rounded-md z-10 text-white text-center" style={{ backgroundColor: "rgb(22, 63, 101, 0.85)" }}>Electronic Band Structure</div>
                        <div className="card relative w-full lg:min-h-[40vh] h-[30vh] my-3">
                            <div className="grid grid-cols-2">
                                <div>
                                    <Image
                                        src={process.env.NEXT_PUBLIC_SERVER_URL + thermoData.elect_band_structure}
                                        alt="Electronic band structure image"
                                        layout='responsive'
                                        height={100}
                                        width={100}
                                        loading='lazy'
                                        objectFit='contain'
                                    />
                                </div>
                                <div>
                                    <Image
                                        src={process.env.NEXT_PUBLIC_SERVER_URL + thermoData.elect_dos}
                                        alt="Electronic band DOS"
                                        layout='responsive'
                                        height={100}
                                        width={100}
                                        loading='lazy'
                                        objectFit='contain'
                                    />
                                </div>
                            </div>
                            <Tooltip
                                id="tooltip"
                            />
                            <div
                                className="absolute bottom-0 right-0 mr-4 border border-2 border-black px-2 rounded-full font-bold"
                                data-tooltip-id="tooltip"
                                data-tooltip-content={""}
                                data-tooltip-place="top"
                            >?</div>
                        </div>
                    </div>
                }
                {
                    thermoData.phonon_bands &&
                    <div className="bg-white rounded-lg p-1">
                        <div className="px-2 py-1 rounded-md z-10 text-white text-center" style={{ backgroundColor: "rgb(22, 63, 101, 0.85)" }}>Phonon Bands</div>
                        <div className="card relative w-full lg:min-h-[40vh] h-[30vh] my-3">
                            <div className="grid grid-cols-2">
                                <div>
                                    <Image
                                        src={process.env.NEXT_PUBLIC_SERVER_URL + thermoData.phonon_bands}
                                        alt="Phonon bands image"
                                        layout='responsive'
                                        width={100}
                                        height={100}
                                        loading='lazy'
                                        objectFit='contain'
                                    />
                                </div>
                                <div>
                                    <Image
                                        src={process.env.NEXT_PUBLIC_SERVER_URL + thermoData.phonon_dos}
                                        alt="Phonon DOS"
                                        layout='responsive'
                                        width={100}
                                        height={100}
                                        loading='lazy'
                                        objectFit='contain'
                                    />
                                </div>
                            </div>
                            <Tooltip
                                id="tooltip"
                            />
                            <div
                                className="absolute bg-white bottom-0 right-0 mr-4 border border-2 border-black px-2 rounded-full font-bold"
                                data-tooltip-id="tooltip"
                                data-tooltip-content={""}
                                data-tooltip-place="top"
                            >?</div>
                        </div>
                    </div>
                }
                {
                    thermoData.deform_potential &&
                    <div className="bg-white rounded-lg p-1">
                        <div className="px-2 py-1 rounded-md z-10 text-white text-center" style={{ backgroundColor: "rgb(22, 63, 101, 0.85)" }}>Deformation Potential</div>
                        <div className="card relative w-full lg:min-h-[40vh] h-[30vh] my-3">
                            <Image
                                src={process.env.NEXT_PUBLIC_SERVER_URL + thermoData.deform_potential}
                                alt="Deformation potentials image"
                                layout='fill'
                                loading='lazy'
                                objectFit='contain'
                            />
                            <Tooltip
                                id="tooltip"
                            />
                            <div
                                className="absolute bottom-0 right-0 mr-4 border border-2 border-black px-2 rounded-full font-bold"
                                data-tooltip-id="tooltip"
                                data-tooltip-content={""}
                                data-tooltip-place="top"
                            >?</div>
                        </div>
                    </div>
                }
                {
                    thermoData.elf &&
                    <div className="bg-white rounded-lg p-1">
                        <div className="px-2 py-1 rounded-md z-10 text-white text-center" style={{ backgroundColor: "rgb(22, 63, 101, 0.85)" }}>ELF</div>
                        <div className="card relative w-full lg:min-h-[40vh] h-[30vh] my-3">
                            <Image
                                src={process.env.NEXT_PUBLIC_SERVER_URL + thermoData.elf}
                                alt="ELF image"
                                layout='fill'
                                loading='lazy'
                                objectFit='contain'
                            />
                            <Tooltip
                                id="tooltip"
                            />
                            <div
                                className="absolute bottom-0 right-0 mr-4 border border-2 border-black px-2 rounded-full font-bold"
                                data-tooltip-id="tooltip"
                                data-tooltip-content={""}
                                data-tooltip-place="top"
                            >?</div>
                        </div>
                    </div>
                }
                {
                    thermoData.group_velocity &&
                    <div className="bg-white rounded-lg p-1">
                        <div className="px-2 py-1 rounded-md z-10 text-white text-center" style={{ backgroundColor: "rgb(22, 63, 101, 0.85)" }}>Group Velocity</div>
                        <div className="card relative w-full lg:min-h-[40vh] h-[30vh] my-3">
                            <Image
                                src={process.env.NEXT_PUBLIC_SERVER_URL + thermoData.group_velocity}
                                alt="Group velocity image"
                                layout='fill'
                                loading='lazy'
                                objectFit='contain'
                            />
                            <Tooltip
                                id="tooltip"
                            />
                            <div
                                className="absolute bottom-0 right-0 mr-4 border border-2 border-black px-2 rounded-full font-bold"
                                data-tooltip-id="tooltip"
                                data-tooltip-content={""}
                                data-tooltip-place="top"
                            >?</div>
                        </div>
                    </div>
                }
                {
                    thermoData.gru_param &&
                    <div className="bg-white rounded-lg p-1">
                        <div className="px-2 py-1 rounded-md z-10 text-white text-center" style={{ backgroundColor: "rgb(22, 63, 101, 0.85)" }}>GRU parameter</div>
                        <div className="card relative w-full lg:min-h-[40vh] h-[30vh] my-3">
                            <Image
                                src={process.env.NEXT_PUBLIC_SERVER_URL + thermoData.gru_param}
                                alt="GRU Param image"
                                layout='fill'
                                loading='lazy'
                                objectFit='contain'
                            />
                            <Tooltip
                                id="tooltip"
                            />
                            <div
                                className="absolute bottom-0 right-0 mr-4 border border-2 border-black px-2 rounded-full font-bold"
                                data-tooltip-id="tooltip"
                                data-tooltip-content={""}
                                data-tooltip-place="top"
                            >?</div>
                        </div>
                    </div>
                }
                {
                    thermoData.lattice_conduc &&
                    <div className="bg-white rounded-lg p-1">
                        <div className="px-2 py-1 rounded-md z-10 text-white text-center" style={{ backgroundColor: "rgb(22, 63, 101, 0.85)" }}>Lattice Conductivity</div>
                        <div className="card relative w-full lg:min-h-[40vh] h-[30vh] my-3">
                            <Image
                                src={process.env.NEXT_PUBLIC_SERVER_URL + thermoData.lattice_conduc}
                                alt="Lattice Conductivity image"
                                layout='fill'
                                loading='lazy'
                                objectFit='contain'
                            />
                            <Tooltip
                                id="tooltip"
                            />
                            <div
                                className="absolute bottom-0 right-0 mr-4 border border-2 border-black px-2 rounded-full font-bold"
                                data-tooltip-id="tooltip"
                                data-tooltip-content={""}
                                data-tooltip-place="top"
                            >?</div>
                        </div>
                    </div>
                }
                {
                    thermoData.figure_of_merit &&
                    <div className="bg-white rounded-lg p-1">
                        <div className="px-2 py-1 rounded-md z-10 text-white text-center" style={{ backgroundColor: "rgb(22, 63, 101, 0.85)" }}>Figure of merit</div>
                        <div className="card relative w-full lg:min-h-[40vh] h-[30vh] my-3">
                            <Image
                                src={process.env.NEXT_PUBLIC_SERVER_URL + thermoData.figure_of_merit}
                                alt="Figure of merit image"
                                layout='fill'
                                loading='lazy'
                                objectFit='contain'
                            />
                            <Tooltip
                                id="tooltip"
                            />
                            <div
                                className="absolute bottom-0 right-0 mr-4 border border-2 border-black px-2 rounded-full font-bold"
                                data-tooltip-id="tooltip"
                                data-tooltip-content={""}
                                data-tooltip-place="top"
                            >?</div>
                        </div>
                    </div>
                }
                <div className="">

                </div>
                <div className="flex flex-col items-center justify-between">
                    <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-2">
                        <div className="bg-gray-200 flex flex-col items-center justify-center rounded-lg p-2 text-center">
                            <h4 className="md:text-3xl text-2xl theme-text font-bold">{parseFloat(thermoData.latticeConstant).toFixed(2).toString()}</h4>
                            <h5 className="text-lg">Lattice Constant (Å)</h5>
                        </div>
                        <div className="bg-gray-200 flex flex-col items-center justify-center rounded-lg p-2 text-center">
                            <h4 className="md:text-3xl text-2xl theme-text font-bold">{parseFloat(thermoData.bandGap).toFixed(2).toString()}</h4>
                            <h5 className="text-lg">Band gap</h5>
                        </div>
                        <div className="bg-gray-200 flex flex-col items-center justify-center rounded-lg p-2 text-center">
                            <h4 className="md:text-3xl text-2xl theme-text font-bold">{parseFloat(thermoData.spaceGroup).toFixed(2).toString()}</h4>
                            <h5 className="text-lg">Space group</h5>
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
                <Link href="/apps/thermoelectric/search"><p className="cursor-pointer hover:underline"><i className='fa fa-search pr-2'></i>Search Page</p></Link>
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
    const thermoMaterial = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/searchthermo/searchbyid/${context.params.slug}`
    ).catch(err => {
        console.log(err)
        context.res.writeHead(302, { Location: "/500" });
        context.res.end();
    });
    const thermo = thermoMaterial ? await thermoMaterial.json() : {};
    return {
        props: {
            thermoData: thermo,
            slug: context.params.slug,
        }
    };
};
