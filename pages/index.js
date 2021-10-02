import SEO from '@/components/SEO'

const Home = () => {
  const meta = {
    title: 'Layer0 Nextjs Example',
    description:
      'This open source project demonstrates Prefetching, and Image Optimization with Layer0 using Nextjs.',
    url: 'https://layer0-docs-layer0-next-example-default.layer0.link',
  }
  return (
    <>
      <SEO meta={meta} />
      <div className="flex flex-col justify-center items-center w-full min-h-[75vh]">
        <p className="text-center">
          This is an example Next.js app powered by Layer0. Click a category above to get started.
        </p>
      </div>
    </>
  )
}

export default Home
