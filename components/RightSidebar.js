import Link from 'next/link'
import { Fragment } from 'react'

const listingItems = {
  Relevance: [
    {
      name: 'Trending',
      route: '/search/shop-all',
    },
    {
      name: 'Latest Arrivals',
      route: '/search/shop-all',
    },
    {
      name: 'Price: Low to High',
      route: '/search/shop-all',
    },
    {
      name: 'Price: High to Low',
      route: '/search/shop-all',
    },
  ],
}

const RightSidebar = ({}) => {
  return (
    <div className="flex w-full flex-col pl-5">
      {Object.keys(listingItems).map((item, index) => (
        <Fragment key={item}>
          <h2 className={`${index > 0 ? 'mt-10 ' : ''}text-black text-lg font-medium`}>{item}</h2>
          {listingItems[item].map((subItem) => (
            <Link passHref key={subItem.name} href={subItem.route}>
              <a>
                <h3 className="text-md mt-2 font-light text-gray-500">{subItem.name}</h3>
              </a>
            </Link>
          ))}
        </Fragment>
      ))}
    </div>
  )
}

export default RightSidebar
