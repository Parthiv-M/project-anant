import { Fragment, useState, useRef } from "react"
import { useRouter } from "next/router";

import SearchForm from "../../../components/home/Apps/Mxene/Search/SearchForm";
import PeriodicTable from "../../../components/home/Apps/Mxene/Search/PeriodicTable";
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
    const m1Ref = useRef(null);
    const m2Ref = useRef(null);
    const xRef = useRef(null);
    const t1Ref = useRef(null);
    const t2Ref = useRef(null);

    const handleSearch = async () => {
        // have at least element filled
        setLoading(true);
        if (m1 === "" && m2 === "" && t1 === "" && t2 === "" && x === "") {
            toast('Please select at least 1 element to search', { type: "error" });
            setLoading(false);
        } else {
            if (bandGap) {
                router.push({
                    pathname: '/apps/mxene/filter',
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
                    pathname: '/apps/mxene/filter',
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
    const changeFocus = (changeTo) => {
        if (changeTo === "M2") {
            m2Ref.current.focus();
        } else if (changeTo === "X") {
            xRef.current.focus();
        } else if (changeTo === "T1") {
            t1Ref.current.focus();
        } else if (changeTo === "T2") {
            t2Ref.current.focus();
        }
        currentlySelectedForm(changeTo);
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
            changeFocus("M2");
            setCurrentlySelected("M2");
        } else if (element === "M2") {
            setM2(value);
            changeFocus("X");
            setCurrentlySelected("X");
        } else if (element === "T1") {
            setT1(value);
            changeFocus("T2");
            setCurrentlySelected("T2");
        } else if (element === "T2") {
            setT2(value);
            setCurrentlySelected("");
        } else if (element === "X") {
            setX(value);
            changeFocus("T1");
            setCurrentlySelected("T1");
        }
    }
    const setValueBandGap = (value) => {
        setBandGap(value);
    }

    return (
        <Fragment>
            {loading ? <Loader /> : null}
            <div className="w-screen py-20 flex flex-col items-center justify-start" style={{ minHeight: 'max-content' }}>
                <Meta title="Mxene Search | Project aNANt" extraKeywords={"search mxenes, find mxenes, periodic table"}/>
                <div className="mt-8 mb-3">
                    <h2 className="md:text-4xl text-2xl text-white text-center">MXene Search</h2>
                    <div className="w-56 mx-auto my-2 h-1 bg-gray-100"></div>
                    <p className="text-white text-lg px-4 text-center hidden lg:inline">Click on the input field to show available options for searching MXenes</p>
                    <p className="text-white text-lg px-4 text-center lg:hidden inline">Select a value of the element from the dropdown</p>
                </div>
                <div className="w-screen flex flex-col justify-start py-1 lg:px-16 px-6">
                    {/* The design for forms */}
                    <SearchForm 
                        set_value={setElementValue} 
                        resetFunction={setAllFieldsEmpty} 
                        searchFunction={handleSearch} 
                        BandGap={bandGap} 
                        SetBandGap={setValueBandGap} 
                        currentlySelected={currentlySelectedForm} 
                        M1={m1} 
                        M2={m2} 
                        T1={t1} 
                        T2={t2} 
                        X={x} 
                        m1={m1Ref}
                        m2={m2Ref}
                        x={xRef}
                        t1={t1Ref}
                        t2={t2Ref}
                    />
                    <div className="hidden md:grid gap-x-2 grid-cols-1 px-24">
                        <PeriodicTable selected={currentlySelected} set_value={setElementValue}/>
                    </div>

                    <Toaster position="top-right" toastOptions={{
                        className: 'mt-20',
                    }} />
                </div >
            </div >
        </Fragment>
    )
} 