import Link from 'next/link'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const relevanceItems = [
  {
    name: 'Trending',
    filter: 'trending',
  },
  {
    name: 'Price: Low to High',
    filter: 'price-low-to-high',
  },
  {
    name: 'Price: High to Low',
    filter: 'price-high-to-low',
  },
]

const Sidebar = ({}) => {
  const router = useRouter()
  const { filter = 'trending' } = router.query
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
      <h2 className="text-md font-light text-[#FFFFFF75]">Relevance</h2>
      {relevanceItems.map((item) => (
        <a
          key={item.name}
          className={classNames(
            'text-md mt-2 cursor-pointer',
            { 'font-light text-[#FFFFFF75]': filter !== item.filter },
            { 'font-medium text-[#FFFFFF]': filter === item.filter }
          )}
          onClick={(e) => {
            e.preventDefault()
            if (typeof window !== undefined) {
              router.push({
                pathname: window.location.pathname,
                query: { filter: item.filter },
              })
            }
          }}
        >
          {item.name}
        </a>
      ))}
      <Link passHref href={`/commerce`}>
        <a
          className={classNames(
            'text-md mt-7',
            { 'font-light text-[#FFFFFF75]': pathWithoutQuery !== `/commerce` },
            { 'font-medium text-[#FFFFFF]': pathWithoutQuery === `/commerce` }
          )}
        >
          Shop All
        </a>
      </Link>
      {listingItems.map((item) => (
        <Link key={item.slug} passHref href={`/commerce/${item.slug}`}>
          <a
            className={classNames(
              'text-md mt-2',
              { 'font-light text-[#FFFFFF75]': pathWithoutQuery !== `/commerce/${item.slug}` },
              { 'font-medium text-[#FFFFFF]': pathWithoutQuery === `/commerce/${item.slug}` }
            )}
          >
            {item.name}
          </a>
        </Link>
      ))}
    </div>
  )
}

export default Sidebar
