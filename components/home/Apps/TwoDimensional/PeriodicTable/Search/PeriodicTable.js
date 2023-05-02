import { TableLayout } from "../../../../../../data/PeriodicTableData";

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
        let colorValue;
        if (subProps.mList.includes(subProps.item)) {
            colorValue = currentlySelected === "M" ? "bg-white text-[#004a77] scale-105 hover:text-white" : "bg-[#5172b0] text-white"
        }
        else if (subProps.f1List.includes(subProps.item) && currentlySelected === "F1") {
            colorValue = currentlySelected === "F1" ? "bg-white text-[#613b28] scale-105 hover:text-white" : "bg-[#a0d173] text-white"
        }
        else if (subProps.f2List.includes(subProps.item) && currentlySelected === "F2") {
            colorValue = currentlySelected === "F2" ? "bg-white text-[#613b28] scale-105 hover:text-white" : "bg-[#a0d173] text-white"
        }
        else {
            colorValue = "bg-[#ffe0b9] text-black"
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