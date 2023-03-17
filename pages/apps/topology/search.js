import { Fragment, useState } from "react"
import { useRouter } from "next/router";

import SearchForm from "../../../components/home/Apps/Mxene/Search/SearchForm";
import PeriodicTable from "../../../components/home/Apps/Mxene/Search/PeriodicTable";
import OptionSelector from "../../../components/home/Apps/Mxene/Search/OptionSelector";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../../components/common/loader";
import Meta from "../../../components/common/Meta/Meta";

export default function MxeneSearch() {
    const router = useRouter();
    // function to handle the search
    const [m1, setM1] = useState("");
    const [m2, setM2] = useState("");
    const [t1, setT1] = useState("");
    const [t2, setT2] = useState("");
    const [x, setX] = useState("");
    const [bandGap, setBandGap] = useState();
    const [currentlySelected, setCurrentlySelected] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        // have at least element filled
        setLoading(true);
        if (m1 === "" && m2 === "" && t1 === "" && t2 === "" && x === "") {
            toast('Please select at least 1 element to search', { type: "error" });
            setLoading(false);
        } else {
            if (bandGap) {
                router.push({
                    pathname: '/apps/topology/filter',
                    query: {
                        M1: m1,
                        M2: m2,
                        T1: t1,
                        T2: t2,
                        X: x,
                        bandGap: bandGap,
                        currentPage: 1
                    }
                });
            } else {
                router.push({
                    pathname: '/apps/topology/filter',
                    query: {
                        M1: m1,
                        M2: m2,
                        T1: t1,
                        T2: t2,
                        X: x,
                        currentPage: 1
                    }
                });
            }

        }
    }
    const currentlySelectedForm = (formName) => {
        setCurrentlySelected(formName);
    }
    const setAllFieldsEmpty = () => {
        setM1("");
        setM2("");
        setT1("");
        setT2("");
        setX("");
        setBandGap("");
    }
    const setElementValue = (element, value) => {
        if (element === "M1") {
            setM1(value);
        } else if (element === "M2") {
            setM2(value);
        } else if (element === "T1") {
            setT1(value);
        } else if (element === "T2") {
            setT2(value);
        } else if (element === "X") {
            setX(value);
        }
        setCurrentlySelected("")
    }
    const setValueBandGap = (value) => {
        setBandGap(value);
    }

    return (
        <Fragment>
            {loading ? <Loader /> : null}
            <div className="w-screen py-20 flex flex-col items-center justify-start" style={{ minHeight: 'max-content' }}>
                <Meta title="Topology Search | Project aNANt" extraKeywords={"search topology, find topology, periodic table"}/>
                <div className="mt-8 mb-3">
                    <h2 className="md:text-4xl text-2xl text-white text-center">Topology Search</h2>
                    <div className="w-56 mx-auto my-2 h-1 bg-gray-100"></div>
                    <p className="text-white text-lg px-4 text-center hidden lg:inline">Click on the input field to show available options for searching MXene Topologies</p>
                    <p className="text-white text-lg px-4 text-center lg:hidden inline">Select a value of the element from the dropdown</p>
                </div>
                <div className="w-screen flex flex-col justify-start py-1 lg:px-16 px-6">
                    {/* The design for forms */}
                    <SearchForm set_value={setElementValue} resetFunction={setAllFieldsEmpty} searchFunction={handleSearch} BandGap={bandGap} SetBandGap={setValueBandGap} currentlySelected={currentlySelectedForm} M1={m1} M2={m2} T1={t1} T2={t2} X={x} />
                    <div className="hidden md:grid gap-x-2 grid-cols-1 lg:grid-cols-2">
                        <PeriodicTable selected={currentlySelected} />
                        <OptionSelector formSelected={currentlySelected} set_value={setElementValue} />
                    </div>

                    <Toaster position="top-right" toastOptions={{
                        className: 'mt-20',
                    }} />
                </div >
            </div >
        </Fragment>
    )
} 