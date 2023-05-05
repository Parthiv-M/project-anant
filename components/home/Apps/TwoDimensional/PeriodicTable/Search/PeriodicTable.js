import { FunctionalGroups, Metals, TableLayout } from "../../../../../../data/PeriodicTableData";

const PeriodicTable = (props) => {

    const setFunction = (target, item) => {
        props.set_value(target, item);
    }

    const functionExecution = (target, item) => {
        if (target === "F1") {
            if (props.f1List.includes(item)) {
                setFunction(target, item);
            }
        } else if (target === "F2") {
            if (props.f2List.includes(item)) {
                setFunction(target, item);
            }
        } else if (target === "M") {
            if (props.mList.includes(item)) {
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
                                        return <Box key={index} item={' '} type="null" current={props.selected} f1List={props.f1List} f2List={props.f2List} mList={props.mList} />
                                    }
                                    else if (element === ".") {
                                        return <Box key={index} item={' '} type="spacing" current={props.selected} f1List={props.f1List} f2List={props.f2List} mList={props.mList} />
                                    }
                                    else {
                                        return <Box key={index} item={element} type="element" current={props.selected} functionExecution={functionExecution} f1List={props.f1List} f2List={props.f2List} mList={props.mList} />
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
            <div className="flex text-transparent bg-transparent mx-2 text-center h-9 w-9"></div>
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
        let f1Normal = "bg-[#5172b0] text-white";
        let f2Normal = "bg-[#5172b0] text-white";
        let mNormal = "bg-[#a0d173] text-white";
        let defaultBg = "bg-[#ffe0b9] text-black";

        let colorValue = defaultBg;

        if (currentlySelected === "F1" && subProps.f1List.includes(subProps.item)) {
            colorValue = activeTile;
        } else if (currentlySelected === "F1" && !subProps.f1List.includes(subProps.item) && FunctionalGroups.includes(subProps.item)) {
            colorValue = f1Normal + " blur-[1px]";
        } else if (currentlySelected === "F1" && !subProps.f1List.includes(subProps.item) && Metals.includes(subProps.item)) {
            colorValue = mNormal + " blur-[1px]";
        } else if (currentlySelected !== "F1" && subProps.f1List.includes(subProps.item)) {
            // pass
        }

        if (currentlySelected === "F2" && subProps.f2List.includes(subProps.item)) {
            colorValue = activeTile;
        } else if (currentlySelected === "F2" && !subProps.f2List.includes(subProps.item) && FunctionalGroups.includes(subProps.item)) {
            colorValue = f2Normal + " blur-[1px]";
        } else if (currentlySelected === "F2" && !subProps.f2List.includes(subProps.item) && Metals.includes(subProps.item)) {
            colorValue = mNormal + " blur-[1px]";
        } else if (currentlySelected !== "F2" && subProps.f2List.includes(subProps.item) && !subProps.f1List.includes(subProps.item)) {
            colorValue = f2Normal + " blur-[1px]";
        } else if (currentlySelected !== "F2" && subProps.f2List.includes(subProps.item)) {
            // pass
        }
        
        if (currentlySelected === "M" && subProps.mList.includes(subProps.item)) {
            colorValue = activeTile;
        } else if (currentlySelected === "M" && !subProps.mList.includes(subProps.item) && Metals.includes(subProps.item)) {
            colorValue = mNormal + " blur-[1px]";
        } else if (currentlySelected === "M" && !subProps.mList.includes(subProps.item) && FunctionalGroups.includes(subProps.item)) {
            colorValue = f1Normal + " blur-[1px]";
        }

        if (currentlySelected === "") {
            if (FunctionalGroups.includes(subProps.item)) {
                colorValue = f1Normal;
            } else if (Metals.includes(subProps.item)) {
                colorValue = mNormal;
            }
        } else if (colorValue === defaultBg) {
            colorValue += " blur-[1px]";
        }

        return (
            <div
                className={`flex hover:bg-black hover:text-white transition ease-in-out hover:scale-150 hover:font-bold hover:z-10 ${colorValue} border border-black h-12 w-full rounded-md hover:cursor-pointer`}
                onClick={() => subProps.functionExecution(subProps.current, subProps.item)}
            >
                <p className="self-center mx-auto text-xs font-medium">
                    {subProps.item}
                </p>
            </div>
        )
    }

}

export default PeriodicTable