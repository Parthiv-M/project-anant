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
import Accordion from '../../../components/common/Accordion';
import CheckInOtherApps from '../../../components/common/CheckInOtherApps';

export default function MxeneResult({ topologyData, slug }) {
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
        fileContents={topologyData.pdb_file_content}
      />);
  }, [])


  const handleDownload = async () => {
    if (loggedIn) {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/downloadtopology/?id=${slug}`)
        const blob = b64ToBlob(res.data, "application/zip");
        saveAs(blob, `anant_topology.zip`);
        MyToaster({ header: "Download successfull!", message: `Your topology data was downloaded` });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
        MyToaster({ header: "Download failed!", message: "There was an error downloading your topology data" });
      }
    } else {
      setLoading(false);
      MyToaster({ header: "Login to download!", message: "Please login to download topology data" });
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-16 container">
      <Head>
        <title>
          {topologyData.mxene.mxene} | Topology Database
        </title>
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <meta
          name="description"
          content="aNANt is an initiative of Materials Theory and Simulations Group, Materials Research Centre, Indian Institute of Science Bangalore to develop and host an open-access online repository of functional materials."
        />
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content="anant, project anant, iisc, indian institute of science, bangalore, topology, materials theory, functional materials, materials research, research"
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
          content={topologyData.mxene}
        />
        <meta
          property="og:description"
          content=""
        />
        <meta property="og:image" content={process.env.NEXT_PUBLIC_SERVER_URL + topologyData.bandImage} />
        <meta property="og:url" content="" />
        <meta
          property="og:site_name"
          content="Project aNANt"
        />
      </Head>
      <Toaster position="top-right" />
      <Meta title={`${topologyData.mxene} | Topology Database`} extraKeywords={"topology"} />
      <div className="my-8">
        <h2 className="md:text-4xl text-3xl font-bold text-white">{topologyData.mxene}</h2>
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
              value={topologyData.poscar_data}
              className="w-full focus:outline-none border-2 border-gray-300 my-2 p-2 h-full"
              rows={5}
            ></textarea>
          </div>
          <div className="flex justify-center items-center bg-white relative h-[30vh] lg:h-full w-full rounded-lg min-h-[40vh]">
            <Image src={process.env.NEXT_PUBLIC_SERVER_URL + topologyData.bandImage} alt="Band image for the mxene" layout='fill' loading='lazy' objectFit='contain' />
          </div>
          <div className="flex justify-center items-center bg-white relative h-[30vh] lg:h-full w-full rounded-lg min-h-[40vh]">
            <Image src={process.env.NEXT_PUBLIC_SERVER_URL + topologyData.socBandImage} alt="SOC Band image" layout='fill' loading='lazy' objectFit='contain' />
          </div>
          {
            topologyData.isSoc &&
            <div className="flex justify-center items-center bg-white relative h-[30vh] lg:h-full w-full rounded-lg min-h-[40vh]">
              <Image src={process.env.NEXT_PUBLIC_SERVER_URL + topologyData.berryStateImage} alt="Berry state image" layout='fill' loading='lazy' objectFit='contain' />
            </div>
          }
          {
            topologyData.isSoc &&
            <div className="flex justify-center items-center bg-white relative h-[30vh] lg:h-full w-full rounded-lg min-h-[40vh]">
              <Image src={process.env.NEXT_PUBLIC_SERVER_URL + topologyData.surfStateImage} alt="Surface state image" layout='fill' loading='lazy' objectFit='contain' />
            </div>
          }
          <div className="">

          </div>
          <div className="flex flex-col items-center justify-between">
            {
              topologyData.isSoc &&
              <Accordion title="Why is this MXene different?" content={
                "The existence of non-zero Berry curvature and Chern number has been found in this MXene due to the combined effects of time \
            reversal (T) and inversion symmetry (P). This indicates the existence of the valley-polarized quantum anomalous Hall (VP-QAH) \
            effect in this material. The non-zero value of the Chern number is verified by the presence of a single chiral edge state \
            appearing in the band gap of the material."
              } />
            }
            {
              topologyData.isSoc &&
              <Accordion title="Topological properties calculated" content={topologyData.topologicalProperties.join(", ")} />
            }
            <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-2">
              <div className="bg-gray-200 flex flex-col items-center justify-center rounded-lg p-2 text-center">
                <h4 className="md:text-3xl text-2xl theme-text font-bold">{topologyData.isSoc ? topologyData.socBandGap : topologyData.bandGap}</h4>
                <h5 className="text-lg">Band Gap (eV)</h5>
              </div>
              {
                topologyData.isSoc &&
                <div className="bg-gray-200 flex flex-col items-center justify-center rounded-lg p-2 text-center">
                  <h4 className="md:text-2xl text-xl theme-text font-bold">{topologyData.magneticState}</h4>
                  <h5 className="text-lg">Magnetic Ground State</h5>
                </div>
              }
              {
                topologyData.isSoc &&
                <div className="bg-gray-200 flex flex-col items-center justify-center rounded-lg p-2 text-center">
                  <h4 className="md:text-3xl text-2xl theme-text font-bold">{topologyData.socMagneticMoment}</h4>
                  <h5 className="text-lg">Magnetic Moment (μ<sub>B</sub>)</h5>
                </div>
              }
              <div className="bg-gray-200 flex flex-col items-center justify-center rounded-lg p-2 text-center">
                <h4 className="md:text-3xl text-2xl theme-text font-bold">{topologyData.latticeConstant}</h4>
                <h5 className="text-lg">Lattice Constant</h5>
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
        <div className="lg:col-span-2">
          <CheckInOtherApps mxeneId={topologyData.mxeneId} />
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
      `}</style>
    </div>
  )
}

export const getServerSideProps = async (context) => {
  const resTopology = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/searchtopology/searchbyid/${context.params.slug}`
  ).catch(err => {
    console.log(err)
    context.res.writeHead(302, { Location: "/500" });
    context.res.end();
  });
  const topology = resTopology ? await resTopology.json() : {};
  return {
    props: {
      topologyData: topology,
      slug: context.params.slug,
    }
  };
};
