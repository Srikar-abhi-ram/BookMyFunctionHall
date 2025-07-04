import React from 'react'

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center pt-6 md:pt-12">
        <h1 className="text-4xl font-bold leading-tight mt-0 mb-2">
          Find your perfect wedding venue
        </h1>
        <p className="text-xl text-gray-600">
          Browse through our curated selection of unique and luxurious wedding
          venues
        </p>
      </div>
      <div className="flex flex-col md:flex-row md:flex-wrap md:justify-center w-full px-4 md:px-12">
        <div className="w-full md:w-1/2 xl:w-1/3 p-6">
          <img
            src="https://picsum.photos/1200/800"
            alt="venue"
            className="rounded-t-lg"
          />
          <div className="bg-white rounded-b-lg p-4">
            <h2 className="text-2xl font-bold mb-2">Venue Name</h2>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
              tincidunt nibh sit amet magna malesuada facilisis.
            </p>
            <p className="text-gray-600">
              <span className="font-bold">Capacity:</span> 100-200
            </p>
            <p className="text-gray-600">
              <span className="font-bold">Price:</span> $500-$1000
            </p>
          </div>
        </div>
        <div className="w-full md:w-1/2 xl:w-1/3 p-6">
          <img
            src="https://picsum.photos/1200/801"
            alt="venue"
            className="rounded-t-lg"
          />
          <div className="bg-white rounded-b-lg p-4">
            <h2 className="text-2xl font-bold mb-2">Venue Name</h2>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
              tincidunt nibh sit amet magna malesuada facilisis.
            </p>
            <p className="text-gray-600">
              <span className="font-bold">Capacity:</span> 50-100
            </p>
            <p className="text-gray-600">
              <span className="font-bold">Price:</span> $300-$600
            </p>
          </div>
        </div>
        <div className="w-full md:w-1/2 xl:w-1/3 p-6">
          <img
            src="https://picsum.photos/1200/802"
            alt="venue"
            className="rounded-t-lg"
          />
          <div className="bg-white rounded-b-lg p-4">
            <h2 className="text-2xl font-bold mb-2">Venue Name</h2>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
              tincidunt nibh sit amet magna malesuada facilisis.
            </p>
            <p className="text-gray-600">
              <span className="font-bold">Capacity:</span> 200-300
            </p>
            <p className="text-gray-600">
              <span className="font-bold">Price:</span> $1000-$1500
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
