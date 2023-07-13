import { M_Values, T_Values, X_Values } from "../../../../../data/PeriodicTableData"

const desktop_map = [
    {
        name: "Elements",
        elements: [
            {
                name: "E1",
            },
            {
                name: "E2",
            }
        ]
    },
    {
        name: "Elements",
        elements: [
            {
                name: "E3",
            }
        ]
    },
    {
        name: "Elements",
        elements: [
            {
                name: "E4",
            },
            {
                name: "E5",
            }
        ]
    }
]

const mobile_map = [
    {
        name: "Elements",
        elements: [
            {
                name: "E1",
                values: M_Values
            },
            {
                name: "E2",
                values: M_Values
            }
        ]
    },
    {
        name: "Elements",
        elements: [
            {
                name: "E",
                values: X_Values
            }
        ]
    },
    {
        name: "Elements",
        elements: [
            {
                name: "E4",
                values: T_Values
            },
            {
                name: "E5",
                values: T_Values
            }
        ]
    }
]

const SearchForm = (props) => {
    return (
        <div className="bg-[#ffffff33] py-10">
            {/* Form options for large screen */}
            <div className="hidden lg:grid grid-cols-3">
                {
                    desktop_map.map((group, index) => {
                        return (
                            <div key={index} className={`my-0 py-0 flex flex-col w-full px-5 col-span-1`}>
                                <p className="text-[#FAFAFA] text-xl font-bold pt-4">{group.name}</p>
                                <div key={index} className={`grid gap-x-2 w-full`}>
                                    {
                                        group.elements.map((element, index) => {
                                            return (
                                                <div className="mt-2" key={index}>
                                                    <p className="text-[#FAFAFA] font-light">Select {element.name}</p>
                                                    <input ref={props[element.name.toLowerCase()]} type="text" className="p-2 rounded-sm w-full" placeholder={"Select a value for " + element.name} value={props[element.name]} onClick={() => props.currentlySelected(element.name)} readOnly={true} />
                                                </div>

                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            {/* Form options for small screen */}
            <div className="grid lg:hidden grid-cols-1">
                {
                    mobile_map.map((group, index) => {
                        return (
                            <div key={index} className="flex flex-col px-5">
                                <div className="mb-5">
                                    <p className="text-[#FAFAFA] text-xl font-medium underline">{group.name}</p>
                                    {
                                        group.elements.map((element, index) => {
                                            return (
                                                <div key={index}>
                                                    <p className="text-[#FAFAFA] mt-3">Select a value for <span className="font-extrabold">{element.name}</span></p>
                                                    <select name={element.name} className="p-2 rounded-sm w-full" onClick={() => props.currentlySelected(element.name)} onChange={(e) => props.set_value(element.name, e.target.value)} value={props[element.name]}>
                                                        <option value="">Select a value</option>
                                                        {
                                                            element.values.map((value, index) => {
                                                                return (
                                                                    <option key={index} value={value}>{value}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="grid grid-cols-2 gap-x-5 justify-center px-5 mt-5">
                <button className="text-md bg-white hover:bg-red-700 hover:text-white text-[#163F65] font-bold py-2 px-4 rounded-sm border-2 border-[#163F65] outline-none"
                    onClick={props.resetFunction}>
                    Reset
                </button>
                <button className="text-md bg-[#163F65] hover:bg-green-600 text-white font-bold py-2 px-4 rounded-sm border-2 border-[#163F65] outline-none"
                    onClick={props.searchFunction}>
                    Search
                </button>
            </div>
        </div>
    )
}

export default SearchForm;