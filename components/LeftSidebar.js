import Link from 'next/link'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useState } from 'react'

const listingItems = {
  'All Categories': [
    {
      name: 'Joggers',
      route: '/commerce/joggers',
    },
    {
      name: 'Jackets',
      route: '/commerce/jackets',
    },
    {
      name: 'T-Shirts',
      route: '/commerce/t-shirts',
    },
    {
      name: 'Shop All',
      route: '/commerce/shop-all',
    },
  ],
}

const LeftSidebar = () => {
  const router = useRouter()
  const [pathWithoutQuery, setPathWithoutQuery] = useState(router.asPath)
  useEffect(() => {
    let temp = router.asPath
    if (temp.includes('?')) setPathWithoutQuery(temp.substring(0, temp.indexOf('?')))
    else setPathWithoutQuery(temp)
  }, [router.asPath])
  return (
    <div className="flex w-full flex-col">
      {Object.keys(listingItems).map((item, index) => (
        <Fragment key={item}>
          <h2 className={classNames({ 'mt-10': index > 0 }, 'text-white', 'text-lg', 'font-medium')}>{item}</h2>
          {listingItems[item].map((subItem) => (
            <Link passHref key={subItem.name} href={subItem.route}>
              <a>
                <h3
                  className={classNames(
                    'text-md mt-2',
                    { 'font-light text-[#FFFFFF75]': pathWithoutQuery !== subItem.route },
                    { 'font-medium text-[#FFFFFF]': pathWithoutQuery === subItem.route }
                  )}
                >
                  {subItem.name}
                </h3>
              </a>
            </Link>
          ))}
        </Fragment>
      ))}
    </div>
  )
}

export default LeftSidebar
