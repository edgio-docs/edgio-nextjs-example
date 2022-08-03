import Link from 'next/link'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useState } from 'react'

const LeftSidebar = () => {
  const router = useRouter()
  const [listingItems, setListingItems] = useState([])
  const [pathWithoutQuery, setPathWithoutQuery] = useState(router.asPath)
  useEffect(() => {
    let temp = router.asPath
    if (temp.includes('?')) setPathWithoutQuery(temp.substring(0, temp.indexOf('?')))
    else setPathWithoutQuery(temp)
  }, [router.asPath])
  useEffect(() => {
    fetch('/l0-api/categories/all')
      .then((res) => res.json())
      .then((res) => {
        setListingItems(res)
      })
  }, [])
  return (
    <div className="flex w-full flex-col">
      <Link passHref href={`/commerce`}>
        <a>
          <h3
            className={classNames(
              'text-md',
              { 'font-light text-[#FFFFFF75]': pathWithoutQuery !== `/commerce` },
              { 'font-medium text-[#FFFFFF]': pathWithoutQuery === `/commerce` }
            )}
          >
            Shop All
          </h3>
        </a>
      </Link>
      {listingItems.map((item) => (
        <Fragment key={item.slug}>
          <Link passHref href={`/commerce/${item.slug}`}>
            <a>
              <h3
                className={classNames(
                  'text-md mt-2',
                  { 'font-light text-[#FFFFFF75]': pathWithoutQuery !== `/commerce/${item.slug}` },
                  { 'font-medium text-[#FFFFFF]': pathWithoutQuery === `/commerce/${item.slug}` }
                )}
              >
                {item.name}
              </h3>
            </a>
          </Link>
        </Fragment>
      ))}
    </div>
  )
}

export default LeftSidebar
