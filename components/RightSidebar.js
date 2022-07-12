import Link from 'next/link'
import { Fragment } from 'react'
import classNames from 'classnames'

const listingItems = {
  Relevance: [
    {
      name: 'Trending',
      route: '/commerce/trending',
    },
    {
      name: 'Latest Arrivals',
      route: '/commerce/latest-arrivals',
    },
    {
      name: 'Price: Low to High',
      route: '/commerce/price-low-to-high',
    },
    {
      name: 'Price: High to Low',
      route: '/commerce/price-high-to-low',
    },
  ],
}

const RightSidebar = ({}) => {
  return (
    <div className="flex w-full flex-col pl-5">
      {Object.keys(listingItems).map((item, index) => (
        <Fragment key={item}>
          <h2 className={classNames({ 'mt-10': index > 0 }, 'text-white', 'text-lg', 'font-medium')}>{item}</h2>
          {listingItems[item].map((subItem) => (
            <Link passHref key={subItem.name} href={subItem.route}>
              <a>
                <h3 className="text-md mt-2 font-light text-[#FFFFFF75]">{subItem.name}</h3>
              </a>
            </Link>
          ))}
        </Fragment>
      ))}
    </div>
  )
}

export default RightSidebar
