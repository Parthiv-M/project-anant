import { Fragment, useState, useEffect } from "react";
import ResultCard from "../../../../components/home/Apps/Mxene/ResultCard";
import { saveAs } from "file-saver";
import b64ToBlob from "b64-to-blob";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { MyToaster } from "../../../../functions/toaster";
import PageBar from "../../../../components/common/PaginationBar/PageBar";
import { useRouter } from "next/router";
import Loader from "../../../../components/common/loader";
import Meta from "../../../../components/common/Meta/Meta";

import Session from "supertokens-auth-react/recipe/session";
Session.addAxiosInterceptors(axios);

export default function MxeneFilter({ query, res }) {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);

  async function getUserInfo() {
    if (await Session.doesSessionExist()) {
      setLoggedIn(true);
    }
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  const [idList, setIdList] = useState([]);
  const handleDownload = async () => {
    if (idList.length === 0 && idList.length <= 10) {
      setDownloadLoading(false);
      return MyToaster({
        header: "No mxene selected!",
        message: "Please select at least 1 mxene",
      });
    }
    if (idList.length > 10) {
      setDownloadLoading(false);
      return MyToaster({
        header: "Max download limit!",
        message: "You cannot download more than 10 mxenes at once",
      });
    }
    if (loggedIn) {
      try {
        const mxeneIds = idList.join(",");
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/downloadThermo/?id=${mxeneIds}`
        );
        const blob = b64ToBlob(res.data, "application/zip");
        saveAs(blob, `anant_mxene.zip`);
        setDownloadLoading(false);
        MyToaster({
          header: "Download successfull!",
          message: `You have downloaded ${idList.length} materials${
            idList.length === 1 ? "" : "s"
          }`,
        });
        setIdList([]);
      } catch (error) {
        setDownloadLoading(false);
        MyToaster({
          header: "Download failed!",
          message: "There was an error downloading your materials",
        });
      }
    } else {
      setDownloadLoading(false);
      MyToaster({
        header: "Login to download!",
        message: "Please login to download materials",
      });
    }
  };

  return (
    <Fragment>
      {loading ? <Loader /> : null}
      <div className="w-screen min-h-screen pt-16 flex flex-col items-center justify-start">
        <Meta
          title="Filter Search | Thermoelectric Database"
          extraKeywords={"filter thermoelectric materials, thermoelectric data"}
        />
        <Toaster position="top-right" />
        <div className="my-8">
          <h2 className="md:text-4xl text-2xl text-white text-center">
            Search Results
          </h2>
          <div className="w-56 mx-auto my-2 h-1 bg-gray-100"></div>
          <p className="text-white text-lg px-4 text-center">
            Click on the search result box to select it for downloading
          </p>
        </div>
        <div className="w-full px-8 py-6">
          <div className="flex flex-row mb-5 gap-2 items-center">
            <p className="md:text-md text-center text-white text-lg bg-gray-900 inline px-4 py-3 border border-gray-600 rounded-3xl md:mr-4 mb-2 md:mb-0">
              <span>
                <i className="fa fa-list-ul mr-2"></i>
              </span>
              <strong>{res.totalResults}</strong> materials
              {res.totalResults === 1 ? "" : "s"} found
            </p>
            {idList.length > 0 && (
              <button
                onClick={() => {
                  setDownloadLoading(true);
                  handleDownload();
                }}
                className="outline-none md:text-md text-center text-lg bg-gray-300 inline px-4 py-3 border border-gray-600 rounded-3xl"
              >
                <span>
                  {!downloadLoading ? (
                    <i className="fa fa-download mr-1"></i>
                  ) : (
                    <i className="fa fa-circle-o-notch mr-2 animate-spin"></i>
                  )}
                </span>{" "}
                {!downloadLoading ? (
                  <>
                    Download {idList.length} material
                    {idList.length === 1 ? "" : "s"}
                  </>
                ) : (
                  <>Downloading</>
                )}
              </button>
            )}
            {idList.length <= 0 && res.thermoMaterials.length > 0 && (
              <p className="text-gray-300">
                Displaying{" "}
                <span className="underline font-bold">
                  {20 * parseInt(res.currentPage - 1) + 1} -{" "}
                  {20 * parseInt(res.currentPage - 1) + res.thermoMaterials.length}
                </span>{" "}
                of <span className="font-bold">{res.totalResults}</span> mxenes
              </p>
            )}
          </div>
          {res.thermoMaterials.length > 0 ? (
            <Fragment>
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                {res.thermoMaterials.map((mxene) => {
                  return (
                    <ResultCard
                      key={mxene.id}
                      id={mxene.id}
                      mxene={mxene.materialFull}
                      cardType={"thermo"}
                      latticeConstant={mxene.latticeConstant}
                      bandGap={mxene.bandGap}
                      idList={idList}
                      setIdList={setIdList}
                      loadingSetter={setLoading}
                    />
                  );
                })}
              </div>
              <div className="container mx-auto text-center mt-6 mb-4">
                <PageBar
                  query={query}
                  totalPages={res.totalPages}
                  currentPage={res.currentPage}
                />
              </div>
            </Fragment>
          ) : (
            <div className="w-full h-32 flex flex-col items-center justify-center">
              <p className="text-3xl text-white font-bold">Uh oh!</p>
              <p className="text-lg text-gray-300">
                No results were found. Try adjusting your search parameters.
              </p>
              <button
                className="bg-white theme-text px-3 py-2 mt-5 rounded-lg font-bold hover:theme hover:text-white border-2 border-white"
                onClick={() => router.back()}
              >
                Try again?
              </button>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
}

const resolvedURL = (query) => {
  const queryArray = query.split("/");
  let redirectionUrl = null;
  if (queryArray.length >= 5) {
    redirectionUrl = "/apps/thermo/filter";
    if (queryArray[5]) {
      if (queryArray[5] !== "_") {
        redirectionUrl += `?E1=${queryArray[5]}`;
      } else {
        redirectionUrl += "?E1=";
      }
    }
    if (queryArray[6]) {
      if (queryArray[6] !== "_") {
        redirectionUrl += `&E2=${queryArray[6]}`;
      } else {
        redirectionUrl += "&E2=";
      }
    }
    if (queryArray[7]) {
      if (queryArray[7] !== "_") {
        redirectionUrl += `&E3=${queryArray[7]}`;
      } else {
        redirectionUrl += "&E3=";
      }
    }
    if (queryArray[8]) {
      if (queryArray[8] !== "_") {
        redirectionUrl += `&E4=${queryArray[8]}`;
      } else {
        redirectionUrl += "&E4=";
      }
    }
    if (queryArray[9]) {
      if (queryArray[9] !== "_") {
        redirectionUrl += `&E5=${queryArray[9]}`;
      } else {
        redirectionUrl += "&E5=";
      }
    }
    if (queryArray[11]) {
      if (queryArray[11] !== "_") {
        redirectionUrl += `&currentPage=${queryArray[11]}`;
      }
    }
  }
  return redirectionUrl;
};

export async function getServerSideProps(context) {
  const query = context.query;
  const redirectLink = resolvedURL(context.resolvedUrl);
  if (redirectLink) {
    context.res.writeHead(302, { Location: redirectLink });
    context.res.end();
    return { props: {} };
  } else {
    let parameters = {
      E1: query.E1,
      E2: query.E2,
      E3: query.E3,
      E4: query.E4,
      E5: query.E5,
      currentPage: query.currentPage,
    };
    const fetchURL = process.env.NEXT_PUBLIC_SERVER_URL + "/searchthermo";
    const resBody = await fetch(fetchURL, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      referrerPolicy: "no-referrer",
      body: JSON.stringify(parameters),
    }).catch((err) => {
      console.log(err);
      context.res.writeHead(302, { Location: "/500" });
      context.res.end();
    });
    const res = await resBody.json();
    return {
      props: {
        query,
        res,
      },
    };
  }
}
