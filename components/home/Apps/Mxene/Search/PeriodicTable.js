import { TableLayout } from "../../../../../data/PeriodicTableData";
import { M_Values, T_Values, X_Values } from "../../../../../data/PeriodicTableData";

const PeriodicTable = (props) => {

    const setFunction = (target, item) => {
        props.set_value(target, item);
    }

    const functionExecution = (target, item) => {
        console.log("ti: ", target, item);
        if (target === "M1") {
            if (props.m1List.includes(item)) {
                setFunction(target, item);
            }
        } else if (target === "M2") {
            if (props.m2List.includes(item)) {
                setFunction(target, item);
            }
        } else if (target === "X") {
            if (props.xList.includes(item)) {
                setFunction(target, item);
            }
        } else if (target === "T1") {
            if (props.t1List.includes(item)) {
                setFunction(target, item);
            }
        } else if (target === "T2") {
            if (props.t2List.includes(item)) {
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
                                        return <Box key={index} item={' '} type="null" current={props.selected} m1List={props.m1List} m2List={props.m2List} xList={props.xList} t1List={props.t1List} t2List={props.t2List} />
                                    }
                                    else if (element === ".") {
                                        return <Box key={index} item={' '} type="spacing" current={props.selected} m1List={props.m1List} m2List={props.m2List} xList={props.xList} t1List={props.t1List} t2List={props.t2List} />
                                    }
                                    else {
                                        return <Box key={index} item={element} type="element" current={props.selected} functionExecution={functionExecution} m1List={props.m1List} m2List={props.m2List} xList={props.xList} t1List={props.t1List} t2List={props.t2List} />
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

        if (currentlySelected === "M1" && subProps.m1List.includes(subProps.item)) {
            colorValue = activeTile;
        } else if (currentlySelected === "M1" && !subProps.m1List.includes(subProps.item) && M_Values.includes(subProps.item)) {
            colorValue = m1Normal;
        } else if (currentlySelected === "M1" && !subProps.m1List.includes(subProps.item) && X_Values.includes(subProps.item)) {
            colorValue = xNormal;
        } else if (currentlySelected === "M1" && !subProps.m1List.includes(subProps.item) && T_Values.includes(subProps.item)) {
            colorValue = t1Normal;
        } else if (currentlySelected !== "M1" && subProps.m1List.includes(subProps.item)) {
            // pass
        }

        if (currentlySelected === "M2" && subProps.m2List.includes(subProps.item)) {
            colorValue = activeTile;
        } else if (currentlySelected === "M2" && !subProps.m2List.includes(subProps.item) && M_Values.includes(subProps.item)) {
            colorValue = m2Normal;
        } else if (currentlySelected === "M2" && !subProps.m2List.includes(subProps.item) && X_Values.includes(subProps.item)) {
            colorValue = xNormal;
        } else if (currentlySelected === "M2" && !subProps.m2List.includes(subProps.item) && T_Values.includes(subProps.item)) {
            colorValue = t1Normal;
        } else if (currentlySelected !== "M2" && subProps.m2List.includes(subProps.item) && !subProps.m1List.includes(subProps.item)) {
            colorValue = m2Normal;
        } else if (currentlySelected !== "M2" && subProps.m2List.includes(subProps.item)) {
            // pass
        }

        if (currentlySelected === "X" && subProps.xList.includes(subProps.item)) {
            colorValue = activeTile;
        } else if (currentlySelected === "X" && !subProps.xList.includes(subProps.item) && X_Values.includes(subProps.item)) {
            colorValue = xNormal;
        } else if (currentlySelected === "X" && !subProps.xList.includes(subProps.item) && M_Values.includes(subProps.item)) {
            colorValue = m1Normal;
        } else if (currentlySelected === "X" && !subProps.xList.includes(subProps.item) && T_Values.includes(subProps.item)) {
            colorValue = t1Normal;
        }

        if (currentlySelected === "T1" && subProps.t1List.includes(subProps.item)) {
            colorValue = activeTile;
        } else if (currentlySelected === "T1" && !subProps.t1List.includes(subProps.item) && T_Values.includes(subProps.item)) {
            colorValue = t1Normal;
        } else if (currentlySelected === "T1" && !subProps.t1List.includes(subProps.item) && M_Values.includes(subProps.item)) {
            colorValue = m2Normal;
        } else if (currentlySelected === "T1" && !subProps.t1List.includes(subProps.item) && X_Values.includes(subProps.item)) {
            colorValue = xNormal;
        } else if (currentlySelected !== "T1" && subProps.t1List.includes(subProps.item)) {
            // pass
        }

        if (currentlySelected === "T2" && subProps.t2List.includes(subProps.item)) {
            colorValue = activeTile;
        } else if (currentlySelected === "T2" && !subProps.t2List.includes(subProps.item) && T_Values.includes(subProps.item)) {
            colorValue = t2Normal;
        } else if (currentlySelected === "T2" && !subProps.t2List.includes(subProps.item) && M_Values.includes(subProps.item)) {
            colorValue = m2Normal;
        } else if (currentlySelected === "T2" && !subProps.t2List.includes(subProps.item) && X_Values.includes(subProps.item)) {
            colorValue = xNormal;
        } else if (currentlySelected !== "T2" && subProps.t2List.includes(subProps.item) && !subProps.t1List.includes(subProps.item)) {
            colorValue = t2Normal;
        } else if (currentlySelected !== "T2" && subProps.t2List.includes(subProps.item)) {
            // pass
        }

        if (currentlySelected === "") {
            if (M_Values.includes(subProps.item)) {
                colorValue = m1Normal;
            } else if (X_Values.includes(subProps.item)) {
                colorValue = xNormal;
            } else if (T_Values.includes(subProps.item)) {
                colorValue = t1Normal;
            }
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