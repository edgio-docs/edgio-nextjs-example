import { StarIcon } from '@heroicons/react/solid'
import { relativizeURL, getOrigin } from '@/lib/helper'
import { HeartIcon, StarIcon as StarIconOutline } from '@heroicons/react/outline'

const Product = ({ data }) => {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex max-w-6xl flex-col lg:flex-row">
        <div className="relative flex w-full flex-col items-start lg:w-1/2">
          <div className="absolute top-0 left-0 z-10 flex flex-col items-start">
            <h3 className="border border-gray-200 bg-white py-2 px-4 text-2xl font-bold text-black">{data.name}</h3>
            <h4 className="border border-gray-200 bg-white py-2 px-4 text-lg text-black">{`$ ${data.prices.price.value} ${data.prices.price.currencyCode}`}</h4>
          </div>
          <HeartIcon className="absolute top-0 right-0 z-10 h-[50px] w-[50px] border border-gray-200 bg-white p-2" />
          <div className="flex w-full flex-col items-center">
            <img src={relativizeURL(data.images[0].url)} className="h-auto w-full max-w-[600px]" />
          </div>
          <div className="product-thumbnails mt-5 flex flex-row items-start gap-x-2 overflow-x-scroll">
            {data.images.map((i, ind) => (
              <img key={i.url} loading="lazy" src={relativizeURL(i.url)} className="h-[250px] w-auto hover:bg-white" />
            ))}
          </div>
        </div>
        <div className="flex w-full flex-col items-start px-10 lg:w-1/2">
          <h1 className="mt-10 text-3xl font-bold text-white lg:mt-0">{data.name}</h1>
          <h2 dangerouslySetInnerHTML={{ __html: data.description }} className="text-md mt-5 font-light text-[#FFFFFF75]"></h2>
          <div className="mt-10 flex w-full flex-row justify-between">
            <div className="flex flex-row items-center space-x-1">
              <StarIcon className="h-[20px] w-[20px] text-[#FFFFFF75]" />
              <StarIcon className="h-[20px] w-[20px] text-[#FFFFFF75]" />
              <StarIcon className="h-[20px] w-[20px] text-[#FFFFFF75]" />
              <StarIcon className="h-[20px] w-[20px] text-[#FFFFFF75]" />
              <StarIconOutline className="h-[18px] w-[18px] text-[#FFFFFF75]" />
            </div>
            <span className="text-[#FFFFFF75]">36 reviews</span>
          </div>
          <button className="mt-5 w-full bg-black px-2 py-4 uppercase text-white">Add To Cart</button>
          <span className="mt-5 text-lg font-medium text-white">Care</span>
          <span className="mt-2 font-light text-[#FFFFFF75]">This is a limited edition production run. Printing starts when the drop ends.</span>
          <div className="mt-5 h-[1px] w-full bg-[#FFFFFF30]"></div>
          <span className="mt-5 text-lg font-medium text-white">Details</span>
          <span className="mt-2 font-light text-[#FFFFFF75]">
            This is a limited edition production run. Printing starts when the drop ends. Reminder: Bad Boys For Life. Shipping may take 10+ days due
            to COVID-19.
          </span>
          <div className="mt-5 h-[1px] w-full bg-[#FFFFFF30]"></div>
        </div>
      </div>
      <style jsx>
        {`
          .product-thumbnails::-webkit-scrollbar {
            display: none;
          }
          .product-thumbnails {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>
    </div>
  )
}

export default Product

export async function getServerSideProps({ req, params }) {
  const slug = params.name
  const resp = await fetch(`${getOrigin(req)}/l0-api/products/${slug}`)
  if (!resp.ok) {
    return {
      notFound: true,
    }
  }
  const data = await resp.json()
  return {
    props: { data },
  }
}
