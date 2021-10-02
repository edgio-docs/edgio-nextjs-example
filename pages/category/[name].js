import { getCategory } from '@/lib/cms'
import SEO from '@/components/SEO'
import ListItem from '@/components/listItem'

export default function ProductListingPage({ products, slug }) {
  const meta = {
    title: slug,
    description: slug,
    url: `https://layer0-docs-layer0-next-example-default.layer0.link/category/${slug}`,
  }
  return (
    <>
      <SEO meta={meta} />
      <div className="flex flex-col items-center">
        <div className="grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => {
            const prefetchProps = {}
            if (process.browser) {
              // prefetch URL needs to include the `name` param otherwise it will be a browser miss
              prefetchProps.url = `/_next/data/${__NEXT_DATA__.buildId}${product.href}.json?name=${
                product.href.split('/').reverse()[0]
              }`
            }
            return <ListItem product={product} prefetchProps={prefetchProps} />
          })}
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps({ params }) {
  const { products } = await getCategory(params.name)

  return {
    props: { products, slug: params.name },
  }
}
