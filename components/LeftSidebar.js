import Link from 'next/link'
import { Fragment } from 'react'

const listingItems = {
  'All Categories': [
    {
      name: 'Apparel',
      route: '/search/shop-all',
    },
    {
      name: 'Shop All',
      route: '/search/shop-all',
    },
  ],
  'All Designers': [
    {
      name: 'Sagaform',
      route: '/search/shop-all',
    },
    {
      name: 'OFS',
      route: '/search/shop-all',
    },
    {
      name: 'ACME',
      route: '/search/shop-all',
    },
  ],
}

const LeftSidebar = ({}) => {
  return (
    <div className="flex w-full flex-col">
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

export default LeftSidebar
