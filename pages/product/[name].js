import { getProductById } from '../../lib/cms'
import Rating from '../../components/Rating'

export default function ProductPage({ product }) {
  return (
    <div className="container center flex flex-row">
      <div className="container px-4">
        <img src={product.picture} />
      </div>
      <div className="container px-4 flex flex-col">
        <h2 className="font-bold py-2 m2">{product.name}</h2>
        <div className="py-2 m2">{product.description}</div>
        <div className="py-2 m2">${product.price}</div>
        <div className="py-2 m2">
          <Rating value={Number(product.rating)} />
        </div>
        <div className="py-2 m2">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  )
}
export async function getServerSideProps({ params }) {
  const { product } = await getProductById(params.name)

  return {
    props: { product },
  }
}
