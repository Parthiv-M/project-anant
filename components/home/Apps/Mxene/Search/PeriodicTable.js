import { TableLayout } from "../../../../../data/PeriodicTableData"

const PeriodicTable = (props) => {

    const setFunction = (target, item) => {
        props.set_value(target, item);
    }

    const functionExecution = (target, item) => {
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
        let colorValue = "bg-[#ffe0b9] text-black";
        if (subProps.m1List.includes(subProps.item)) {
            colorValue = currentlySelected === "M1" ? "bg-white text-[#004a77] scale-105 hover:text-white" : "bg-[#5172b0] text-white"
        }
        if (subProps.m2List.includes(subProps.item) && !subProps.m1List.includes(subProps.item)) {
            colorValue = currentlySelected === "M2" ? "bg-white text-[#004a77] scale-105 hover:text-white" : "bg-[#5172b0] text-white"
        }
        if (subProps.xList.includes(subProps.item)) {
            colorValue = currentlySelected === "X" ? "bg-white text-[#613b28] scale-105 hover:text-white" : "bg-[#a0d173] text-white"
        }
        if (subProps.t1List.includes(subProps.item)) {
            colorValue = currentlySelected === "T1" ? "bg-white text-[#2f4d47] scale-105 hover:text-white" : "bg-[#FA5F55] text-white"
        }
        if (subProps.t2List.includes(subProps.item) && !subProps.t1List.includes(subProps.item)) {
            colorValue = currentlySelected === "T2" ? "bg-white text-[#2f4d47] scale-105 hover:text-white" : "bg-[#FA5F55] text-white"
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