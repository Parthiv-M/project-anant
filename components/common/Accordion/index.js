import { useState, Fragment } from "react";

const Accordion = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="w-full mt-5 text-white">
            <div
                className={`
                    bg-white/10 flex justify-between items-center py-2 px-3 
                    ${isOpen ? "rounded-tr-lg rounded-tl-lg" : "rounded-lg"}
                `}
            >
                <h4 className="text-lg font-bold">{props.title}</h4>
                <i
                    className={`fa fa-chevron-${isOpen ? "up" : "down"} hover:cursor-pointer`}
                    onClick={() => setIsOpen(!isOpen)}
                ></i>
            </div>
            <div className={`${isOpen ? "visible" : "hidden"} bg-white/5 p-2 rounded-br-lg rounded-bl-lg`}>
                <Fragment>{props.content}</Fragment>
            </div>
        </div>
    );
}

export default Accordion
