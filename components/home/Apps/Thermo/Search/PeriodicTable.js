import { TableLayout } from "../../../../../data/PeriodicTableData";
import { E_values } from "../../../../../data/PeriodicTableData";

const PeriodicTable = (props) => {

    const setFunction = (target, item) => {
        props.set_value(target, item);
    }

    const functionExecution = (target, item) => {
        if (target === "E1") {
            if (props.e1List.includes(item)) {
                setFunction(target, item);
            }
        } else if (target === "E2") {
            if (props.e2List.includes(item)) {
                setFunction(target, item);
            }
        } else if (target === "E3") {
            if (props.e3List.includes(item)) {
                setFunction(target, item);
            }
        } else if (target === "E4") {
            if (props.e4List.includes(item)) {
                setFunction(target, item);
            }
        } else if (target === "E5") {
            if (props.e5List.includes(item)) {
                setFunction(target, item);
            }
        }
    }

    return (
        <div className="px-5 mt-2 rounded-sm select-none py-5 h-full hidden md:flex flex-col justify-start">
            {
                TableLayout.map((row, index) => {
                    return (
                        <div key={index} className="grid" style={{ gridTemplateColumns: 'repeat(19, minmax(0, 1fr))' }}>
                            {
                                row.map((element, index) => {
                                    if (element === "") {
                                        return <Box key={index} item={' '} type="null" current={props.selected} e1List={props.e1List} e2List={props.e2List} e3List={props.e3List} e4List={props.e4List} e5List={props.e5List} />
                                    }
                                    else if (element === ".") {
                                        return <Box key={index} item={' '} type="spacing" current={props.selected} e1List={props.e1List} e2List={props.e2List} e3List={props.e3List} e4List={props.e4List} e5List={props.e5List} />
                                    }
                                    else {
                                        return <Box key={index} item={element} type="element" current={props.selected} functionExecution={functionExecution} e1List={props.e1List} e2List={props.e2List} e3List={props.e3List} e4List={props.e4List} e5List={props.e5List} />
                                    }
                                })
                            }
                        </div>
                    )
                })

            }
        </div >
    )
}

const Box = (subProps) => {
    if (subProps.type === "null") {
        return (
            <div className="flex text-transparent bg-transparent mx-2 text-center h-12"></div>
        )
    }
    else if (subProps.type === "spacing") {
        return (
            <div className="flex text-transparent bg-transparent mx-2 text-center h-2 w-1"></div>
        )
    }
    else {
        const currentlySelected = subProps.current === "" ? "" : subProps.current;

        let activeTile = "bg-white text-[#004a77] scale-105 hover:text-white";
        let m1Normal = "bg-[#5172b0] text-white";
        let m2Normal = "bg-[#5172b0] text-white";
        let xNormal = "bg-[#a0d173] text-white";
        let t1Normal = "bg-[#FA5F55] text-white";
        let t2Normal = "bg-[#FA5F55] text-white";
        let defaultBg = "bg-[#ffe0b9] text-black";

        let colorValue = defaultBg;

        if (currentlySelected === "E1" && subProps.e1List.includes(subProps.item)) {
            colorValue = activeTile;
        } else if (currentlySelected === "E1" && !subProps.e1List.includes(subProps.item) && E_values.includes(subProps.item)) {
            colorValue = m1Normal + " blur-[1px]";
        } else if (currentlySelected === "E1" && !subProps.e1List.includes(subProps.item) && E_values.includes(subProps.item)) {
            colorValue = xNormal + " blur-[1px]";
        } else if (currentlySelected === "E1" && !subProps.e1List.includes(subProps.item) && E_values.includes(subProps.item)) {
            colorValue = t1Normal + " blur-[1px]";
        } else if (currentlySelected !== "E1" && subProps.e1List.includes(subProps.item)) {
            // pass
        }

        if (currentlySelected === "E2" && subProps.e2List.includes(subProps.item)) {
            colorValue = activeTile;
        } else if (currentlySelected === "E2" && !subProps.e2List.includes(subProps.item) && E_values.includes(subProps.item)) {
            colorValue = m2Normal + " blur-[1px]";
        } else if (currentlySelected === "E2" && !subProps.e2List.includes(subProps.item) && E_values.includes(subProps.item)) {
            colorValue = xNormal + " blur-[1px]";
        } else if (currentlySelected === "E2" && !subProps.e2List.includes(subProps.item) && E_values.includes(subProps.item)) {
            colorValue = t1Normal + " blur-[1px]";
        } else if (currentlySelected !== "E2" && subProps.e2List.includes(subProps.item) && !subProps.e1List.includes(subProps.item)) {
            colorValue = m2Normal + " blur-[1px]";
        } else if (currentlySelected !== "E2" && subProps.e2List.includes(subProps.item)) {
            // pass
        }

        if (currentlySelected === "E3" && subProps.e3List.includes(subProps.item)) {
            colorValue = activeTile;
        } else if (currentlySelected === "E3" && !subProps.e3List.includes(subProps.item) && E_values.includes(subProps.item)) {
            colorValue = xNormal + " blur-[1px]";
        } else if (currentlySelected === "E3" && !subProps.e3List.includes(subProps.item) && E_values.includes(subProps.item)) {
            colorValue = m1Normal + " blur-[1px]";
        } else if (currentlySelected === "E3" && !subProps.e3List.includes(subProps.item) && E_values.includes(subProps.item)) {
            colorValue = t1Normal + " blur-[1px]";
        }

        if (currentlySelected === "E4" && subProps.e4List.includes(subProps.item)) {
            colorValue = activeTile;
        } else if (currentlySelected === "E4" && !subProps.e4List.includes(subProps.item) && E_values.includes(subProps.item)) {
            colorValue = t1Normal + " blur-[1px]";
        } else if (currentlySelected === "E4" && !subProps.e4List.includes(subProps.item) && E_values.includes(subProps.item)) {
            colorValue = m2Normal + " blur-[1px]";
        } else if (currentlySelected === "E4" && !subProps.e4List.includes(subProps.item) && E_values.includes(subProps.item)) {
            colorValue = xNormal + " blur-[1px]";
        } else if (currentlySelected !== "E4" && subProps.e4List.includes(subProps.item)) {
            // pass
        }

        if (currentlySelected === "E5" && subProps.e5List.includes(subProps.item)) {
            colorValue = activeTile;
        } else if (currentlySelected === "E5" && !subProps.e5List.includes(subProps.item) && E_values.includes(subProps.item)) {
            colorValue = t2Normal + " blur-[1px]";
        } else if (currentlySelected === "E5" && !subProps.e5List.includes(subProps.item) && E_values.includes(subProps.item)) {
            colorValue = m2Normal + " blur-[1px]";
        } else if (currentlySelected === "E5" && !subProps.e5List.includes(subProps.item) && E_values.includes(subProps.item)) {
            colorValue = xNormal + " blur-[1px]";
        } else if (currentlySelected !== "E5" && subProps.e5List.includes(subProps.item) && !subProps.e4List.includes(subProps.item)) {
            colorValue = t2Normal + " blur-[1px]";
        } else if (currentlySelected !== "E5" && subProps.e5List.includes(subProps.item)) {
            // pass
        }

        if (currentlySelected === "") {
            if (E_values.includes(subProps.item)) {
                colorValue = m1Normal;
            } else if (E_values.includes(subProps.item)) {
                colorValue = xNormal;
            } else if (E_values.includes(subProps.item)) {
                colorValue = t1Normal;
            }
        } else if (colorValue === defaultBg) {
            colorValue += " blur-[1px]";
        }

        return (
            <div
                className={`flex hover:bg-black hover:text-white transition ease-in-out hover:scale-150 hover:font-bold hover:z-10 ${colorValue} border border-black h-12 w-full rounded-md hover:cursor-pointer`}
                onClick={() => subProps.functionExecution(subProps.current, subProps.item)}
            >
                <p className="self-center mx-auto text-s font-medium">
                    {subProps.item}
                </p>
            </div>
        )
    }

}

export default PeriodicTable