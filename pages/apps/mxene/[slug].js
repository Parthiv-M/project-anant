import axios from 'axios';
import Session from 'supertokens-auth-react/recipe/session';
Session.addAxiosInterceptors(axios);
import { Toaster } from "react-hot-toast";
import { MyToaster } from "../../../functions/toaster";
import Head from 'next/head';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { saveAs } from "file-saver";
import b64ToBlob from "b64-to-blob";
import Link from 'next/link';
import { useRouter } from 'next/router';
import Meta from '../../../components/common/Meta/Meta';
import CheckInOtherApps from '../../../components/common/CheckInOtherApps';
import { Tooltip } from "react-tooltip";
import 'react-tooltip/dist/react-tooltip.css';
import { SpinPolarisedBand } from '../../../data/ToolTipData';

export default function MxeneResult({ mxene, topologyId, slug }) {
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
        fileContents={mxene.pdb_file_content}
      // fileLink={process.env.NEXT_PUBLIC_SERVER_URL + mxene.pdb_file}
      />);
  }, [])


  const handleDownload = async () => {
    if (loggedIn) {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/downloadmxene/?id=${slug}`)
        const blob = b64ToBlob(res.data, "application/zip");
        saveAs(blob, `anant_mxene.zip`);
        MyToaster({ header: "Download successfull!", message: `Your mxene was downloaded` });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
        MyToaster({ header: "Download failed!", message: "There was an error downloading your mxenes" });
      }
    } else {
      setLoading(false);
      MyToaster({ header: "Login to download!", message: "Please login to download mxenes" });
    }
  }


  return (

    <div className="min-h-screen flex flex-col items-center justify-start pt-16 container">
      <Head>
        <title>
          {mxene.mxene} | Mxene Database
        </title>
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <meta
          name="description"
          content="aNANt is an initiative of Materials Theory and Simulations Group, Materials Research Centre, Indian Institute of Science Bangalore to develop and host an open-access online repository of functional materials."
        />
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content="anant, project anant, iisc, indian institute of science, bangalore, mxenes, materials theory, functional materials, materials research, research"
        />
        <meta name="url" content="" />
        <meta name="coverage" content="Worldwide" />
        <meta name="target" content="all" />
        <meta name="HandheldFriendly" content="True" />
        <link rel="canonical" href="" />
        {/* OG meta tags */}
        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content={mxene.mxene}
        />
        <meta
          property="og:description"
          content=""
        />
        <meta property="og:image" content={process.env.NEXT_PUBLIC_SERVER_URL + mxene.bandImage} />
        <meta property="og:url" content="" />
        <meta
          property="og:site_name"
          content="Project aNANt"
        />
      </Head>
      <Toaster position="top-right" />
      <Meta title={`${mxene.mxene} | Mxene Database`} extraKeywords={"mxene"} />
      <div className="my-8">
        <h2 className="md:text-4xl text-3xl font-bold text-white">{mxene.mxene}</h2>
        <div className="w-56 mx-auto my-2 h-1 bg-gray-100"></div>
      </div>
      <div className="w-full grid lg:grid-cols-12 grid-cols-1 gap-2 lg:p-8 p-4">
        <div className="lg:col-span-10 grid lg:grid-cols-2 grid-cols-1 gap-2">
          <div className="min-h-[40vh] h-full w-full flex justify-center items-center result-card rounded-lg" id="apphere">
            {Model3D}
          </div>
          <div className="result-card h-full w-full justify-start items-start p-4 rounded-lg">
            <textarea
              disabled={true}
              value={mxene.poscar_data}
              className="w-full focus:outline-none border-2 border-gray-300 my-2 p-2 h-full"
              rows={5}
            ></textarea>
          </div>
          <div className="bg-white rounded-lg p-1">
            <div className="px-2 py-1 rounded-md z-10 text-white text-center" style={{ backgroundColor: "rgb(22, 63, 101, 0.85)" }}>Spin polarised band structure</div>
            <div className="card relative w-full lg:min-h-[40vh] h-[30vh] my-3">
              <Image
                src={process.env.NEXT_PUBLIC_SERVER_URL + mxene.bandImage}
                alt="Band image for the mxene protein"
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
                data-tooltip-content={SpinPolarisedBand}
                data-tooltip-place="top"
              >?</div>
            </div>
          </div>
          <div className="flex flex-col gap-2 justify-center items-center">
            <div className="md:h-full w-full flex md:flex-row flex-col gap-2">
              <div className="w-full md:w-1/3 h-full bg-gray-200 flex flex-col items-center justify-center rounded-lg p-2 text-center">
                <h4 className="md:text-3xl text-2xl theme-text font-bold">{parseFloat(mxene.latticeConstant).toFixed(2)}</h4>
                <h5 className="text-lg">Lattice Constant (Å)</h5>
              </div>
              <div className="w-full md:w-1/3 h-full bg-gray-200 flex flex-col items-center justify-center rounded-lg p-2 text-center">
                <h4 className="md:text-3xl text-2xl theme-text font-bold">{parseFloat(mxene.bandGap).toFixed(2)}</h4>
                <h5 className="text-lg">Band Gap (eV)</h5>
              </div>
              <div className="w-full md:w-1/3 h-full bg-gray-200 flex flex-col items-center justify-center rounded-lg p-2 text-center">
                <h4 className="md:text-3xl text-2xl theme-text font-bold">{parseFloat(mxene.magneticMoment).toFixed(2)}</h4>
                <h5 className="text-lg">Magnetic Moment (μ<sub>B</sub>)</h5>
              </div>
            </div>
            <div className="hover:theme border border-white w-full bg-white hover:text-white text-black">
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
        <div className="lg:col-span-2">
          <CheckInOtherApps topologyId={topologyId} />
        </div>
      </div>
      <div className='flex flex-row justify-between container md:mb-12 lg:px-8 p-4 text-white'>
        <p onClick={() => router.back()} className="cursor-pointer hover:underline"><i className='fa fa-arrow-left pr-2'></i>Go back</p>
        <Link href="/apps/mxene/search"><p className="cursor-pointer hover:underline"><i className='fa fa-search pr-2'></i>Search Page</p></Link>
      </div>
      <style>{`
        .result-card {
          background-color: rgba(255,255,255,0.9)
        }
      `}</style>
    </div>
  )
}

export const getServerSideProps = async (context) => {
  const resMxenes = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/searchmxene/searchbyid/${context.params.slug}`
  ).catch(err => {
    console.log(err)
    context.res.writeHead(302, { Location: "/500" });
    context.res.end();
  });
  const resTopology = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/searchtopology/searchbymxeneid/${context.params.slug}`
  ).catch(err => {
    console.log(err)
    context.res.writeHead(302, { Location: "/500" });
    context.res.end();
  });
  let topologyId;
  if (resTopology.status === 200)
    topologyId = resTopology ? await resTopology.json() : {};
  const mxenes = resMxenes ? await resMxenes.json() : {};
  return {
    props: {
      mxene: mxenes,
      topologyId: topologyId ? topologyId.id : null,
      slug: context.params.slug,
    }
  };
};
