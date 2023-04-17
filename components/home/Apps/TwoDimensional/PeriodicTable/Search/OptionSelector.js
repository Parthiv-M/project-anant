import { useState, useEffect } from "react"
import { FunctionalGroups, Metals } from "../../../../../../data/PeriodicTableData"

const TwoDOptionSelector = (props) => {

    const [boxColor, setBoxColor] = useState("bg-[#ffffff]")
    const [selectorGrids, setSelectorGrids] = useState(1)

    useEffect(() => {
        const data = String(props.formSelected)
        let color, grids;
        if (data === "F1") {
            color = "bg-[#a0d173]"
            grids = 4
        } else if (data === "F2") {
            color = "bg-[#a0d173]"
            grids = 4
        } else if (data === "M") {
            color = "bg-[#5172b0]"
            grids = 5
        }
        setBoxColor(color);
        setSelectorGrids(grids);
    }, [props.formSelected])

    const functionExecution = (target, item) => {
        props.set_value(target, item)
    }

    return (
        <div className="bg-[#ffffff33] px-5 mt-2 rounded-sm select-none py-5 h-full hidden lg:flex flex-col text-center">
            {props.formSelected === "" && <div className="flex flex-col justify-center h-full"><p className="text-xl text-white">Select an input box to show available options</p></div>}
            {props.formSelected != "" && <p className="text-lg text-white">Select a value for <span className="font-bold">{props.formSelected}</span>:</p>}
            {props.formSelected.length != "" ?
                <SelectorGroup option={props.formSelected} associated_function={functionExecution} boxColor={boxColor} selectorGrids={selectorGrids} />
                : null}
        </div>
    )
}

const SelectorGroup = (selector) => {
    console.log(selector);
    const Value = selector.option === "F1" || selector.option === "F2" ? FunctionalGroups : Metals;
    const renderer = Value.map((item, index) => {
        return <Selector key={index} value={item} clickFunction={() => selector.associated_function(selector.option, item)} boxColor={selector.boxColor} />
    })
    return (        
        <div className={`grid grid-cols-${selector.selectorGrids} gap-2 pt-2`}>{renderer}</div >
    )
}

const Selector = (item) => {
    const classValues = `border border-black rounded-md font-medium px-5 py-3 text-white cursor-pointer hover:bg-white hover:text-black ${item.boxColor}`
    return (
        <p className={classValues} onClick={item.clickFunction}>{item.value}</p>
    )
}

export default TwoDOptionSelector;