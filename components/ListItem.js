import Link from 'next/link'
import { Prefetch } from '@layer0/react'
import Rating from './Rating'

const ListItem = ({ product, prefetchProps }) => {
  return (
    <div key={product.id}>
      <Link href={product.href} passHref>
        <Prefetch {...prefetchProps}>
          <a>
            <div className="relative">
              <div
                className="pb-2/3 bg-contain bg-center bg-no-repeat h-48"
                style={{ backgroundImage: `url(${product.picture})` }}
              ></div>
              <div className="w-full text-left lowercase font-bold">{product.name}</div>
              <div className="w-full text-left">
                <Rating value={product.rating} />
              </div>
              <div className="w-full text-left">${product.price}</div>
            </div>
          </a>
        </Prefetch>
      </Link>
    </div>
  )
}

export default ListItem
