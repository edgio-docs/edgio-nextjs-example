import Link from 'next/link'
import { useRouter } from 'next/router'
import { Prefetch } from '@layer0/react'
import { getCategories } from '@/lib/cms'
import { useEffect, useState } from 'react'
import { createNextDataURL } from '@layer0/next/client'

export default function Header() {
  const [categories, setCategories] = useState()
  const [activeTab, setActiveTab] = useState()
  const router = useRouter()

  useEffect(() => {
    async function fetchCategories() {
      const { categories: results } = await getCategories()
      setCategories(results)
    }
    fetchCategories()
  }, [])

  useEffect(() => {
    router.events.on('routeChangeComplete', (url) => {
      if (categories) {
        setActiveTab(categories.findIndex(({ href }) => href === url))
      }
    })
  }, [categories])

  return (
    <>
      <header className="bg-white pt-2 flex flex-col items-center">
        <Link href="/">
          <a>
            <img
              width={200}
              height={55.59}
              src="/layer0-icon.svg"
              alt="Layer0 Logo"
              title="Layer0 Logo"
            />
            <div className="text-center text-gray-700">Next.js Example</div>
          </a>
        </Link>
        {categories && (
          <div className="flex flex-col items-center w-full border-b-[1px] border-[#eaeaea]">
            <div className={`py-4 w-2/3 md:flex flex flex-row justify-between`}>
              {categories.map(({ slug, categoryName, href }, i) => (
                <div
                  key={slug}
                  className={activeTab === i ? 'border-b-[3px] border-[#ff0000]' : null}
                >
                  <Link href={href} passHref>
                    <Prefetch url={createNextDataURL({ href, routeParams: { slug } })}>
                      <a>{categoryName}</a>
                    </Prefetch>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  )
}
