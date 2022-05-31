import { TableLayout, M_Values, X_Values, T_Values } from "../../../../../data/PeriodicTableData"



const PeriodicTable = (props) => {
    return (
        <div className="bg-[#ffffff33] px-5 mt-2 rounded-sm select-none py-5 h-full hidden md:flex flex-col justify-center">
            {
                TableLayout.map((row, index) => {
                    return (
                        <div key={index} className="grid" style={{ gridTemplateColumns: 'repeat(19, minmax(0, 1fr))' }}>
                            {
                                row.map((element, index) => {
                                    if (element === "") {
                                        return <Box key={index} item={' '} type="null" current={props.selected} />
                                    }
                                    else if (element === ".") {
                                        return <Box key={index} item={' '} type="spacing" current={props.selected} />
                                    }
                                    else {
                                        return <Box item={element} key={index} type="element" current={props.selected} />
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
        const currentlySelected = subProps.current === "" ? "" : subProps.current[0];

        let colorValue;
        if (M_Values.includes(subProps.item)) {
            colorValue = currentlySelected === "M" ? "bg-white text-[#004a77] scale-105 hover:text-white" : "bg-[#004a77] text-white"
        }
        else if (X_Values.includes(subProps.item)) {
            colorValue = currentlySelected === "X" ? "bg-white text-[#613b28] scale-105 hover:text-white" : "bg-[#433c65] text-white"
        }
        else if (T_Values.includes(subProps.item)) {
            colorValue = currentlySelected === "T" ? "bg-white text-[#2f4d47] scale-105 hover:text-white" : "bg-[#2f4d47] text-white"
        }
        else {
            colorValue = "bg-[#623842] text-white"
        }
        return (
            <div className={`flex hover:bg-black transition ease-in-out hover:scale-150 hover:font-bold ${colorValue} border border-black h-9 w-full rounded-md`}>
                <p className="self-center mx-auto text-xs font-medium">
                    {subProps.item}
                </p>
            </div>
        )
    }

}

export default PeriodicTable