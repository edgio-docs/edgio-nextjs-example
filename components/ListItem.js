import Link from 'next/link'
import Rating from './Rating'
import { Prefetch } from '@layer0/react'
import { createNextDataURL } from '@layer0/next/client'

const ListItem = ({ product }) => {
  return (
    <Link href={product.href} passHref>
      <Prefetch
        url={createNextDataURL({ href: product.href, routeParams: { slug: product.slug } })}
      >
        <a>
          <div className="relative flex flex-col items-center">
            <div
              className="pb-2/3 bg-contain bg-center bg-no-repeat h-48 w-48"
              style={{ backgroundImage: `url(${product.picture})` }}
            ></div>
            <p className="text-center lowercase font-bold">{product.name}</p>
            <Rating value={product.rating} />
            <p className="text-center">{product.price}</p>
          </div>
        </a>
      </Prefetch>
    </Link>
  )
}

export default ListItem
