import Link from 'next/link'
import { useState, useEffect } from 'react'
import { StarIcon } from '@heroicons/react/solid'
import { HeartIcon, StarIcon as StarIconOutline } from '@heroicons/react/outline'

const Product = ({ data }) => {
  const [allProducts, setAllProducts] = useState([])
  const [selectedImage, setSelectedImage] = useState(data.images[0].url)

  // Fetch the items for listing at the bottom
  useEffect(() => {
    fetch('https://layer0-docs-layer0-ecommmerce-api-example-default.layer0-limelight.link/products/all')
      .then((res) => res.json())
      .then((res) => {
        setAllProducts(res)
      })
  }, [])

  return (
    <div className="flex w-full flex-col items-start">
      <div className="flex w-full flex-col items-start md:flex-row">
        <div className="relative flex w-full w-full flex-col items-start bg-purple-700 md:w-[65%]">
          <div className="absolute top-0 left-0 flex flex-col items-start">
            <h3 className="bg-white py-2 px-4 text-2xl font-bold text-black">{data.name}</h3>
            <h4 className="bg-white py-2 px-4 text-lg text-black">{`$ ${data.prices.price.value} ${data.prices.price.currencyCode}`}</h4>
          </div>
          <HeartIcon className="absolute top-0 right-0 h-[50px] w-[50px] bg-white p-2" />
          <div className="flex w-full flex-col items-center">
            <img className="w-auto md:h-[75vh]" src={selectedImage} />
          </div>
          <div className="flex flex-row items-start overflow-x-scroll bg-purple-900">
            {data.images.map((i) => (
              <img
                key={i.url}
                src={i.url}
                loading="lazy"
                onClick={() => {
                  setSelectedImage(i.url)
                }}
                className="h-[250px] w-auto cursor-pointer hover:bg-white"
              />
            ))}
          </div>
        </div>
        <div className="flex w-full flex-col items-start px-10 md:w-[35%]">
          <h1 className="mt-10 text-3xl font-bold md:mt-0">{data.name}</h1>
          <h2 dangerouslySetInnerHTML={{ __html: data.description }} className="text-md mt-5 font-light"></h2>
          <div className="mt-10 flex w-full flex-row justify-between">
            <div className="flex flex-row items-center space-x-1">
              <StarIcon className="h-[20px] w-[20px] text-gray-700" />
              <StarIcon className="h-[20px] w-[20px] text-gray-700" />
              <StarIcon className="h-[20px] w-[20px] text-gray-700" />
              <StarIcon className="h-[20px] w-[20px] text-gray-700" />
              <StarIconOutline className="h-[18px] w-[18px] text-gray-700" />
            </div>
            <span>36 reviews</span>
          </div>
          <button className="mt-5 w-full bg-black px-2 py-4 uppercase text-white">Add To Cart</button>
          <span className="mt-5 text-lg font-medium">Care</span>
          <span className="mt-2 font-light">This is a limited edition production run. Printing starts when the drop ends.</span>
          <div className="mt-5 h-[1px] w-full bg-gray-300"></div>
          <span className="mt-5 text-lg font-medium">Details</span>
          <span className="mt-2 font-light">
            This is a limited edition production run. Printing starts when the drop ends. Reminder: Bad Boys For Life. Shipping may take 10+ days due
            to COVID-19.
          </span>
          <div className="mt-5 h-[1px] w-full bg-gray-300"></div>
        </div>
      </div>
      <div className="mt-10 h-[1px] w-full bg-gray-300"></div>
      {allProducts.length && (
        <div className="relative mt-10 flex w-full flex-col">
          <h1 className="px-5 text-2xl font-bold">Related Products</h1>
          <div className="flex flex-row items-start overflow-x-scroll">
            {allProducts.map((i) => (
              <Link key={i.images[0].url} href={'/product' + i.path}>
                <img loading="lazy" key={i.images[0].url} src={i.images[0].url} className="h-[250px] w-auto cursor-pointer hover:bg-white" />
              </Link>
            ))}
          </div>
        </div>
      )}
      <div className="mt-10 h-[1px] w-full bg-gray-300"></div>
    </div>
  )
}

export default Product

export async function getServerSideProps({ params }) {
  const slug = params.name
  const fetchCall = await fetch(`https://layer0-docs-layer0-ecommmerce-api-example-default.layer0-limelight.link/products/${slug}`)
  if (!fetchCall.ok) {
    return {
      notFound: true,
    }
  }
  const dataReturned = await fetchCall.json()
  return {
    props: {
      data: dataReturned,
    },
  }
}
