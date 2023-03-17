import { useState, Fragment } from "react";

export default function Accordion(props) {
    const [isShowing, setIsShowing] = useState(false);

    const toggle = () => {
        setIsShowing(!isShowing);
    };

    const classDisplay = isShowing ? "block" : "hidden";
    const fa_item = isShowing ? "fa-caret-down" : "fa-caret-up";

    return (
        <div className="w-full rounded mb-2 cursor-pointer bg-[#ffffff39]">
            <div className="bg-transparent w-full py-2 px-4 flex justify-between text-white select-none" onClick={toggle}>
                <p className="text-lg font-normal">
                    {props.title}
                </p>
                <i className={`fa ${fa_item} text-2xl`}></i>
            </div>
            <div className={`${classDisplay} px-3 py-2 bg-[#1b1b1b33] text-white`} >
                <Fragment>{props.content}</Fragment>
            </div>
        </div>
    );
}