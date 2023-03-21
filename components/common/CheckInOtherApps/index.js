const CheckInOtherApps = ({ topologyId, mxeneId }) => {
    return (
        (topologyId || mxeneId) ? 
        <div className="flex flex-col fixed lg:top-auto top-[50%] lg:right-auto right-0">
            <h6 className="text-white mb-2 font-bold lg:block hidden">
                <i className="fa fa-solid fa-database mr-2"></i>
                Learn more
            </h6>
            {
                topologyId &&
                <a
                    className="lg:translate-x-0 translate-x-[82%] py-3 pr-4 lg:bg-black/80 bg-black 
                        border lg:border-none border-white hover:bg-black/70 text-white hover:text-white rounded-md font-medium"
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
                    className="lg:translate-x-0 translate-x-[82%] py-3 pr-4 lg:bg-black/80 bg-black 
                        border lg:border-none border-white hover:bg-black/70 text-white hover:text-white rounded-md font-medium"
                    href={`/apps/mxene/${mxeneId}`}
                >
                    <div className="w-16 h-full px-4 py-3 mr-4 bg-white/10 inline rounded-l-md">
                        T
                    </div>
                    View Mxene Data
                    <i className="fa fa-solid fa-arrow-right ml-1"></i>
                </a>
            }
        </div> : <></>
    )
}

export default CheckInOtherApps