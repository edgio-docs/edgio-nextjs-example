import Link from 'next/link'
import { Prefetch } from '@layer0/react'
import styles from '../styles/Header.module.css'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getCategories } from '../lib/cms'

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
    router.events.on('routeChangeComplete', url => {
      if (categories) {
        setActiveTab(categories.findIndex(({ href }) => href === url))
      }
    })
  }, [categories])

  if (!categories) return null

  return (
    <>
      <header className="bg-white rounded-lg p-2 justify-center">
        <div className={`container ${styles.logoContainer}`}>
          <Link href="/" passHref>
            <a>
              <img src="/layer0-icon.svg" alt="Layer0 Logo" />
              <div className="text-center text-gray-700">Next.js Example</div>
            </a>
          </Link>
        </div>
        <div className={`md:flex ${styles.container}`}>
          <ul>
            {categories.map(({ categoryName, href }, i) => {
              const prefetchProps = {}

              if (process.browser) {
                // prefetch URL needs to include the `name` param otherwise it will be a browser miss
                prefetchProps.url = `/_next/data/${__NEXT_DATA__.buildId}${href}.json?name=${
                  href.split('/').reverse()[0]
                }`
              }

              return (
                <li key={categoryName} className={activeTab === i ? styles.active : null}>
                  <Link href={href} passHref>
                    <Prefetch {...prefetchProps}>
                      <a>{categoryName}</a>
                    </Prefetch>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </header>
    </>
  )
}
