const CheckInOtherApps = ({ topologyId, mxeneId }) => {
    return (
        (topologyId || mxeneId) ? 
        <div className="w-full p-8">
            <h6 className="text-white my-6 font-bold">
                <i className="fa fa-solid fa-database mr-2"></i>
                Learn more
            </h6>
            {
                topologyId &&
                <a
                    className="py-3 pr-4 bg-black/80 hover:bg-black/70 text-white hover:text-white rounded-md font-medium"
                    href={`/apps/topology/${topologyId}`}
                >
                    <div className="w-16 h-full px-4 py-3 mr-4 bg-white/10 inline rounded-l-md">
                        T
                    </div>
                    View Topology Data
                    <i className="fa fa-solid fa-arrow-right ml-1"></i>
                </a>
            }
            {
                mxeneId &&
                <a
                    className="py-3 pr-4 bg-black/80 hover:bg-black/70 text-white hover:text-white rounded-md font-medium"
                    href={`/apps/mxene/${mxeneId}`}
                >
                    <div className="w-16 h-full px-4 py-3 mr-4 bg-white/10 inline rounded-l-md">
                        MX
                    </div>
                    View MXene Data
                    <i className="fa fa-solid fa-arrow-right ml-1"></i>
                </a>
            }
        </div> : <></>
    )
}

export default CheckInOtherApps