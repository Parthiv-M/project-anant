import Head from 'next/head'
import Image from "next/image"
import Link from "next/link"

const AppData = [
  {
    name: "MXene Database",
    description: "Contains details of over 23,000 MXenes, with downloadable POSCARs",
    image: "/images/MxeneDatabaseCard.png",
    link: "/apps/mxene"
  },
  {
    name: "Topology Database",
    description: "Contains details of topological phases present in MXenes' monolayers",
    image: "/images/TopologyDatabaseCard.png",
    link: "/apps/topology"
  },
  {
    name: "2D Materials Database",
    description: "Contains details of 3099 octahedral two-dimensional materials, with downloadable POSCARs",
    image: "/images/2DDatabaseCard.png",
    link: "/apps/2D"
  },
  {
    name: "Thermoelectric Material Database",
    description: "Contains details about thermoelectric materials with a host of other calculated properties",
    image: "/images/ThermoDatabaseCard.png",
    link: "/apps/thermoelectric"
  },
  {
    name: "Post Processing Utilities",
    description: "ML models and training data to help learn about material properties",
    image: "/images/PostProcessingCard.png",
    link: "/postprocess"
  }
]

export default function Apps() {
  return (
    <div className="text-gray-50">
      <Head>
        <title>Our Apps | Project aNANt</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center w-screen py-20 lg:pt-32">
        <div className="my-8 text-center">
          <h2 className="md:text-4xl text-3xl font-bold">Our Applications</h2>
          <div className="w-56 mx-auto my-2 h-1 bg-gray-100"></div>
        </div>
        <div className="grid lg:grid-cols-3 grid-cols-1 w-5/6 mx-auto gap-x-5 gap-y-3">
          {AppData.map((app, index) => {
            const container = app.link ?
              (
                <Link href={app.link} key={index}>
                  <div className="block bg-gray-100 p-3 lg:p-5 rounded-lg cursor-pointer">
                    <Image src={app.image} height="100" width="200" layout="responsive" />
                    <h5 className="theme-text text-center md:text-2xl text-xl pt-2">{app.name}</h5>
                    <div className="w-3/4 mx-auto theme" style={{ height: 2 }}></div>
                    <p className="text-gray-900 md:text-lg text-md text-center pt-2">{app.description}</p>
                  </div>
                </Link>
              )
              :
              <div className="opacity-50 block bg-gray-100 md:p-5 p-3 rounded-lg cursor-not-allowed" key={index}>
                <Image src={app.image} height="100" width="200" layout="responsive" />
                <h5 className="theme-text text-center md:text-2xl text-xl pt-2">{app.name}</h5>
                <div className="w-3/4 mx-auto theme" style={{ height: 2 }}></div>
                <p className="text-gray-900 md:text-lg text-md text-center pt-2">{app.description}</p>
              </div>
            return container
          })
          }
        </div>
      </main>
    </div>
  )
}
