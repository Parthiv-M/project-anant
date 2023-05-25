import axios from "axios";
import { useState } from "react";
import { saveAs } from "file-saver";
import b64ToBlob from "b64-to-blob";

export default function Modal({ isOpen, setIsOpen, dbType }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [designation, setDesignation] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [reason, setReason] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(null);
  const [downloadSuccessful, setDownloadSuccessful] = useState(null);
  const [error, setError] = useState({ errorFor: "", errorType: "" });

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleInputValidation = () => {
    if (name === "") {
      setError({ errorFor: "name", errorType: "empty" });
      return false;
    }
    if (email === "") {
      setError({ errorFor: "email", errorType: "empty" });
      return false;
    } else if (email !== "" && !validateEmail(email)) {
      setError({ errorFor: "email", errorType: "invalid" });
      return false;
    }
    if (designation === "") {
      setError({ errorFor: "designation", errorType: "empty" });
      return false;
    }
    if (organisation === "") {
      setError({ errorFor: "organisation", errorType: "empty" });
      return false;
    }
    if (reason === "") {
      setError({ errorFor: "reason", errorType: "empty" });
      return false;
    }
    console.log("agreed: ", agreed)
    if (agreed === false) {
      setError({ errorFor: "agreed", errorType: "empty" });
      return false;
    }
    setError({ errorFor: "", errorType: "" });
    return true;
  }

  const resetState = () => {
    setName("");
    setEmail("");
    setDesignation("");
    setOrganisation("");
    setReason("");
    setAgreed("");
    setLoading(null);
    setDownloadSuccessful(null);
    setError({ errorFor: "", errorType: "" });
  }

  const downloadDatabase = async (e) => {
    e.preventDefault();
    if (handleInputValidation()) {
      let downloadInfo = {
        fullName: name,
        email,
        designation,
        organisation,
        reason
      }
      setLoading(true);
      try {
        const apiResult = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/dbdownload/${dbType}`, downloadInfo);
        if (apiResult.status === 200) {
          const blob = b64ToBlob(apiResult.data, "application/zip");
          saveAs(blob, 'database.zip');
          setDownloadSuccessful(true);
          setLoading(false);
        }
      } catch (error) {
        setDownloadSuccessful(false);
        setLoading(false);
      } finally {
        if (!loading && downloadSuccessful) {
          setTimeout(() => {
            resetState();
            setIsOpen(false);
          }, 5000);
        }
      }
    }
  }

  const getDB = (dbType) => {
    let dbName = "";
    let colour = "";

    switch (dbType) {
      case "mxene":
        dbName = "MXene";
        colour = "blue";
        break;
      case "2d":
        dbName = "2D Octahedral Materials";
        colour = "pink";
        break;
      case "topology":
        dbName = "Topological Materials";
        colour = "red";
        break;
      case "thermoelectric":
        dbName = "Thermoelectric";
        colour = "green";
        break;
      default:
        dbName = "Name";
        break;
    }

    return { dbName, colour };
  }

  return (
    isOpen
    &&
    <div className="z-20 px-4 fixed inset-0 h-screen w-screen overflow-hidden flex flex-col gap-3 items-center justify-center bg-[#00000099]">
      <div className="bg-black md:p-8 p-4 rounded-lg lg:w-1/3 w-full fade-up">
        <h5 className={`text-${getDB(dbType).colour}-400 font-bold text-sm`}>
          <span className={`h-2 w-2 bg-${getDB(dbType).colour}-400 inline-block rounded-full mr-1`}></span>
          <span className={`h-2 w-2 bg-${getDB(dbType).colour}-400 inline-block rounded-full mr-1 `}></span>
          <span className={`h-2 w-2 bg-${getDB(dbType).colour}-400 inline-block rounded-full mr-1`}></span>
          {getDB(dbType).dbName} Database
        </h5>
        <h4 className="text-white text-xl font-bold mb-4">
          <i class="fa fa-info-circle" aria-hidden="true"></i> User Information for Database Download
        </h4>
        <form className="w-full">
          <InputField
            labelName={"Full Name"}
            isRequired={true}
            controller={setName}
            isError={error.errorFor === "name"}
            errorText={"Name cannot be empty"}
          />
          <InputField
            labelName={"Email ID"}
            isRequired={true}
            controller={setEmail}
            isError={error.errorFor === "email"}
            errorText={error.errorType === "empty" ? "Email ID cannot be empty" : "Invalid email"}
          />
          <div className="md:flex gap-4">
            <InputField
              labelName={"Designation"}
              isRequired={true}
              controller={setDesignation}
              isError={error.errorFor === "designation"}
              errorText={"Designation cannot be empty"}
            />
            <InputField
              labelName={"Organisation"}
              isRequired={true}
              controller={setOrganisation}
              isError={error.errorFor === "organisation"}
              errorText={"Organisation cannot be empty"}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-white text-sm"><span className="text-red-500">*</span> Reason for download</label>
            <textarea
              className="bg-white/80 focus:bg-white outline-none p-2 text-sm rounded-md"
              placeholder="Tell us, briefly, why you want the data"
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
          <div className="mt-2">
            <input name="readandagree" type="checkbox" className="mr-1" onChange={(e) => { setAgreed(e.target.checked) }} />
            <label className="text-gray-500 text-sm" htmlFor="readandagree">
              I confirm that I have read and agreed to the
              <a className="text-blue-300" href="/privacypolicy" target="_blank"> Privacy Policy</a> and the
              <a className="text-blue-300" href="/termsandconditions" target="_blank"> Terms and Agreements </a>
              of using aNANt
            </label>
            {error.errorFor === "agreed" && <p className="text-red-500 text-[12px]">Please accept terms and conditions to continue</p>}
          </div>
          <div className="flex gap-2 items-center mt-2">
            <button
              className={`theme disabled:opacity-70 disabled:cursor-not-allowed w-full py-2 rounded-lg text-white border border-transparent hover:border-white/30`}
              onClick={(e) => downloadDatabase(e)}
              disabled={loading}
            >
              {(loading === null || (!loading && downloadSuccessful)) && "Submit details"}
              {loading !== null && !loading && !downloadSuccessful && "Try Again"}
              {loading !== null && loading && <span><i class="fa fa-circle-o-notch animate-spin" aria-hidden="true"></i> Downloading</span>}
            </button>
            {
              (loading !== null && !loading && !downloadSuccessful) &&
              <div className="theme text-white py-2 px-4 rounded-md opacity-80 cursor-auto">
                <i className="fa fa-refresh" aria-hidden="true"></i>
              </div>
            }
          </div>
          <button
            className="bg-white/30 disabled:opacity-40 disabled:cursor-not-allowed disabled:border-transparent 
                    w-full mt-2 py-2 rounded-lg text-gray-100 border border-transparent hover:border-white/50"
            onClick={() => { resetState(); setIsOpen(false) }}
            disabled={loading}
          >
            Cancel
          </button>
        </form>
        <div></div>
      </div>
      <style>{`
        textarea {
          min-height: 100px;
          max-height: 200px;
        }
        input::placeholder, textarea::placeholder {
          color: #00000099;
        }
      `}</style>
    </div >
  )
}

const InputField = ({ labelName, isRequired, controller, isError, errorText }) => {
  return (
    <div className="flex flex-col flex-grow my-2">
      <label className="text-white text-sm">{isRequired && <span className="text-red-500">*</span>} {labelName}</label>
      <input
        className="bg-white/80 focus:bg-white outline-none p-2 text-sm rounded-md"
        onChange={(e) => controller(e.target.value)}
      />
      {isError && <p className="text-red-500 text-[12px]">{errorText}</p>}
    </div>
  )
}