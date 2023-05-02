import { Fragment, useState, useRef, useEffect } from "react"
import { useRouter } from "next/router";

import toast, { Toaster } from "react-hot-toast";
import Loader from "../../../components/common/loader";
import Meta from "../../../components/common/Meta/Meta";
import TwoDSearchForm from "../../../components/home/Apps/TwoDimensional/PeriodicTable/Search/SearchForm";
import PeriodicTable from "../../../components/home/Apps/TwoDimensional/PeriodicTable/Search/PeriodicTable";

import { FunctionalGroups, Metals } from "./../../../data/PeriodicTableData";

export default function MxeneSearch() {
    const router = useRouter();
    // function to handle the search
    const [f1, setF1] = useState("");
    const [f2, setF2] = useState("");
    const [m, setM] = useState("");
    const [currentlySelected, setCurrentlySelected] = useState("");
    const [loading, setLoading] = useState(false);
    const f1Ref = useRef(null);
    const f2Ref = useRef(null);
    const mRef = useRef(null);

    // handle suggest search
    const [f1List, setF1List] = useState(FunctionalGroups);
    const [f2List, setF2List] = useState(FunctionalGroups);
    const [mList, setMList] = useState(Metals);

    const suggestHandler = async () => {
        const body = {
            F1: f1,
            F2: f2,
            M: m,
            isSuggest: true,
            type: "2d"
        }
        const suggestResponse
            = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/suggestSearch`,
                {
                    method: 'POST',
                    mode: "cors",
                    cache: "no-cache",
                    credentials: "same-origin",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body)
                },
            );
        const suggestions = await suggestResponse.json();
        const f1Suggested = suggestions.suggestions.F1;
        const f2Suggested = suggestions.suggestions.F2;
        const mSuggested = suggestions.suggestions.M;
        if (f1Suggested) {
            setF1List(f1Suggested);
        }
        if (f2Suggested) {
            setF2List(f2Suggested);
        }
        if (mSuggested) {
            setMList(mSuggested);
        }
    }

    useEffect(() => {
        suggestHandler();
    }, [f1, f2, m]);

    const handleSearch = async () => {
        // have at least element filled
        setLoading(true);
        if (f1 === "" && f2 === "" && m === "") {
            toast('Please select at least 1 element to search', { type: "error" });
            setLoading(false);
        } else {
            router.push({
                pathname: '/apps/2D/filter',
                query: {
                    F1: f1,
                    F2: f2,
                    M: m,
                    currentPage: 1
                }
            });
        }
    }
    const changeFocus = (changeTo) => {
        if (changeTo === "F2") {
            f2Ref.current.focus();
        } else if (changeTo === "M") {
            mRef.current.focus();
        }
        currentlySelectedForm(changeTo);
    }
    const currentlySelectedForm = (formName) => {
        setCurrentlySelected(formName);
    }
    const setAllFieldsEmpty = () => {
        setF1("");
        setF2("");
        setM("");
    }
    const setElementValue = (element, value) => {
        if (element === "F1") {
            setF1(value);
            changeFocus("F2");
            setCurrentlySelected("F2");
        } else if (element === "F2") {
            setF2(value);
            changeFocus("M");
            setCurrentlySelected("M");
        } else if (element === "M") {
            setM(value);
            setCurrentlySelected("");
        }
    }

    return (
        <Fragment>
            {loading ? <Loader /> : null}
            <div className="w-screen py-20 flex flex-col items-center justify-start" style={{ minHeight: 'max-content' }}>
                <Meta title="Topology Search | Project aNANt" extraKeywords={"search topology, find topology, periodic table"} />
                <div className="mt-8 mb-3">
                    <h2 className="md:text-4xl text-2xl text-white text-center">2D Material Search</h2>
                    <div className="w-56 mx-auto my-2 h-1 bg-gray-100"></div>
                    <p className="text-white text-lg px-4 text-center hidden lg:inline">Click on the input field to show available options for searching 2D materials</p>
                    <p className="text-white text-lg px-4 text-center lg:hidden inline">Select a value of the element from the dropdown</p>
                </div>
                <div className="w-screen flex flex-col justify-start py-1 lg:px-16 px-6">
                    {/* The design for forms */}
                    <TwoDSearchForm
                        set_value={setElementValue}
                        resetFunction={setAllFieldsEmpty}
                        searchFunction={handleSearch}
                        currentlySelected={currentlySelectedForm}
                        F1={f1}
                        F2={f2}
                        M={m}
                        f1={f1Ref}
                        f2={f2Ref}
                        m={mRef}
                    />
                    <div className="hidden md:grid gap-x-2 grid-cols-1 px-24">
                        <PeriodicTable
                            selected={currentlySelected}
                            set_value={setElementValue}
                            f1List={f1List}
                            f2List={f2List}
                            mList={mList}
                        />
                        {/* <TwoDOptionSelector formSelected={currentlySelected} set_value={setElementValue} /> */}
                    </div>
                    <Toaster position="top-right" toastOptions={{
                        className: 'mt-20',
                    }} />
                </div >
            </div >
        </Fragment>
    )
} 