import Link from "next/link"
import { useState, useEffect } from "react";

export default function ResultCard({ mxene, cardType, latticeConstant, bandGap, id, idList, setIdList, loadingSetter }) {

    const [cardPreferences, setCardPreferences] = useState({
        cardLeadsToPath: "",
        showLatticeConstant: null,
        showBandGap: null,
    });

    useEffect(() => {
        if (cardType === "mxene") {
            setCardPreferences({
                cardLeadsToPath: "/apps/mxene/",
                showLatticeConstant: true,
                showBandGap: true
            });
        } else if (cardType === "topology") {
            setCardPreferences({
                cardLeadsToPath: "/apps/topology/",
                showLatticeConstant: true,
                showBandGap: true
            });
        }
    }, [cardType])

    // creates the ID list for download
    const handleIdList = (id) => {
        if (idList.includes(id)) {
            idList.splice(idList.indexOf(id), 1);
            setIdList([...idList])
        } else {
            setIdList([...idList, id])
        }
    }
    return (
        <div
            onClick={() => handleIdList(id)}
            className={`w-full flex flex-col items-center justify-between lg:px-4 lg:py-6 p-2 rounded-md select-none border-2 ${idList.includes(id) ? "border-white shadow-xl" : "border-transparent"}`}
            style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
        >
            <div className="md:w-auto w-4/5 flex flex-row items-center justify-center md:border-0 border-t-2 border-b-2 my-2 border-gray-400 md:text-left text-center">
                <p className={`text-white text-2xl md:my-0 my-4 ${idList.includes(id) ? "font-bold" : ""}`}>{mxene}</p>
            </div>
            <div className="flex md:justify-between justify-center md:gap-2 gap-4 md:mx-2 my-2">
                {
                    cardPreferences.showLatticeConstant &&
                    <div className="text-center mx-2">
                        <p className="md:text-xl text-lg text-gray-300">Lattice Constant</p>
                        <p className="text-2xl font-medium text-white">{parseFloat(latticeConstant).toFixed(2)}</p>
                    </div>
                }
                {
                    cardPreferences.showBandGap &&
                    <div className="text-center mx-2">
                        <p className="md:text-xl text-lg text-gray-300">Band Gap</p>
                        <p className="text-2xl font-medium text-white">{parseFloat(bandGap).toFixed(2)}</p>
                    </div>
                }
            </div>
            <Link href={`${cardPreferences.cardLeadsToPath}${id}`}>
                <button
                    className={`${idList.includes(id) ? "bg-gray-200" : "theme text-gray-100"} md:w-3/5 w-full mt-2 py-3 rounded-lg  outline-none transition ease-in-out delay-150 hover:bg-white hover:theme-text`}
                    onClick={() => loadingSetter(true)}
                >
                    VIEW MXENE
                    <span className="ml-2"><i className="fa fa-arrow-right hover:translate-x-1 duration-500"></i></span>
                </button>
            </Link>
        </div>
    )
}