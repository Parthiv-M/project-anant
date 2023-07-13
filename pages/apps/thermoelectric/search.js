import { Fragment, useState, useRef, useEffect } from "react"
import { useRouter } from "next/router";

import SearchForm from "../../../components/home/Apps/Thermo/Search/SearchForm";
import PeriodicTable from "../../../components/home/Apps/Thermo/Search/PeriodicTable";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../../components/common/loader";
import Meta from "../../../components/common/Meta/Meta";

import { E_values } from "../../../data/PeriodicTableData";

export default function MxeneSearch() {
    const router = useRouter();
    // function to handle the search
    const [e1, setE1] = useState("");
    const [e2, setE2] = useState("");
    const [e3, setE3] = useState("");
    const [e4, setE4] = useState("");
    const [e5, setE5] = useState("");
    const [currentlySelected, setCurrentlySelected] = useState("");
    const [loading, setLoading] = useState(false);
    const e1Ref = useRef(null);
    const e2Ref = useRef(null);
    const e3Ref = useRef(null);
    const e4Ref = useRef(null);
    const e5Ref = useRef(null);

    // handle suggest search
    const [e1List, setE1List] = useState(E_values);
    const [e2List, setE2List] = useState(E_values);
    const [e3List, setE3List] = useState(E_values);
    const [e4List, setE4List] = useState(E_values);
    const [e5List, setE5List] = useState(E_values);

    const suggestHandler = async () => {
        const body = {
            E1: e1,
            E2: e2,
            E3: e3,
            E4: e4,
            E5: e5,
            isSuggest: true,
            type: "thermo"
        }
        console.log("body: ", body)
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
        console.log("suges:", suggestions)
        const e1Suggested = suggestions.suggestions.E1;
        const e2Suggested = suggestions.suggestions.E2;
        const e3Suggested = suggestions.suggestions.E3;
        const e4Suggested = suggestions.suggestions.E4;
        const e5Suggested = suggestions.suggestions.E5;
        // update the element list for the corresponding fields
        if (e1Suggested) {
            setE1List(e1Suggested);
        }
        if (e2Suggested) {
            setE2List(e2Suggested);
        }
        if (e3Suggested) {
            setE3List(e3Suggested);
        }
        if (e4Suggested) {
            setE4List(e4Suggested);
        }
        if (e5Suggested) {
            setE5List(e5Suggested);
        }
    }

    useEffect(() => {
        suggestHandler();
    }, [e1, e2, e3, e4, e5]);

    const handleSearch = async () => {
        // have at least element filled
        setLoading(true);
        if (e1 === "" && e2 === "" && e3 === "" && e4 === "" && e5 === "") {
            toast('Please select at least 1 element to search', { type: "error" });
            setLoading(false);
        } else {
            router.push({
                pathname: '/apps/thermoelectric/filter',
                query: {
                    E1: e1,
                    E2: e2,
                    E3: e3,
                    E4: e4,
                    E5: e5,
                    currentPage: 1
                }
            });

        }
    }
    const changeFocus = (changeTo) => {
        if (changeTo === "E2") {
            e2Ref.current.focus();
        } else if (changeTo === "E3") {
            e3Ref.current.focus();
        } else if (changeTo === "E4") {
            e4Ref.current.focus();
        } else if (changeTo === "E5") {
            e5Ref.current.focus();
        }
        currentlySelectedForm(changeTo);
    }
    const currentlySelectedForm = (formName) => {
        setCurrentlySelected(formName);
    }
    const setAllFieldsEmpty = () => {
        setE1("");
        setE2("");
        setE3("");
        setE4("");
        setE5("");
        setBandGap("");
    }
    const setElementValue = (element, value) => {
        if (element === "E1") {
            setE1(value);
            changeFocus("E2");
            setCurrentlySelected("E2");
        } else if (element === "E2") {
            setE2(value);
            changeFocus("E3");
            setCurrentlySelected("E3");
        } else if (element === "E3") {
            setE3(value);
            changeFocus("E4");
            setCurrentlySelected("E4");
        } else if (element === "E4") {
            setE4(value);
            setCurrentlySelected("");
        } else if (element === "E5") {
            setE5(value);
            changeFocus("E1");
            setCurrentlySelected("E1");
        }
    }

    return (
        <Fragment>
            {loading ? <Loader /> : null}
            <div className="w-screen py-20 flex flex-col items-center justify-start" style={{ minHeight: 'max-content' }}>
                <Meta title="Thermoelectric Search | Project aNANt" extraKeywords={"search thermoelectric materials, find thermoelectric, periodic table"} />
                <div className="mt-8 mb-3">
                    <h2 className="md:text-4xl text-2xl text-white text-center">Thermoelectric Search</h2>
                    <div className="w-56 mx-auto my-2 h-1 bg-gray-100"></div>
                    <p className="text-white text-lg px-4 text-center hidden lg:inline">Click on the input field to show available options for searching Thermoelectric materials</p>
                    <p className="text-white text-lg px-4 text-center lg:hidden inline">Select a value of the element from the dropdown</p>
                </div>
                <div className="w-screen flex flex-col justify-start py-1 lg:px-16 px-6">
                    {/* The design for forms */}
                    <SearchForm
                        set_value={setElementValue}
                        resetFunction={setAllFieldsEmpty}
                        searchFunction={handleSearch}
                        currentlySelected={currentlySelectedForm}
                        E1={e1}
                        E2={e2}
                        E3={e3}
                        E4={e4}
                        E5={e5}
                        e1={e1Ref}
                        e2={e2Ref}
                        e3={e3Ref}
                        e4={e4Ref}
                        e5={e5Ref}
                    />
                    <div className="hidden md:grid gap-x-2 grid-cols-1 px-24">
                        <PeriodicTable
                            selected={currentlySelected}
                            set_value={setElementValue}
                            e1List={e1List}
                            e2List={e2List}
                            e5List={e5List}
                            e3List={e3List}
                            e4List={e4List}
                        />
                    </div>

                    <Toaster position="top-right" toastOptions={{
                        className: 'mt-20',
                    }} />
                </div >
            </div >
        </Fragment>
    )
} 