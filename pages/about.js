const About = ({ showcases }) => {
  return (
    <div className="flex min-h-[calc(100vh-56px)] flex-col items-center px-5 md:px-0">
      <div className="mt-10 flex w-full max-w-2xl flex-col p-2.5">
        <span className="text-2xl font-semibold text-white">About</span>
        <span className="mt-5 text-lg text-[#FFFFFF75]">This demo of Layer0 showcases the following:</span>
        <ul class="list-disc">
          {showcases.map((i) => (
            <li key={i} className="mt-3 text-[#FFFFFF75]">
              {i}
            </li>
          ))}
        </ul>
        <div className="mt-5 flex flex-row items-center space-x-3 text-lg text-[#FFFFFF90]">
          <svg className="h-[15px] w-[15px] md:h-[25px] md:w-[25px]" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
          </svg>
          <a target="_blank" className="border-b border-[#FFFFFF75] text-sm md:text-lg" href="https://github.com/layer0-docs/layer0-nextjs-example">
            layer0-docs/layer0-nextjs-example
          </a>
        </div>
        <a className="mt-5" target="_blank" href="https://app.layer0.co/deploy?repo=https://github.com/layer0-docs/layer0-nextjs-example">
          <img height="15px" src="https://docs.layer0.co/button.svg" />
        </a>
      </div>
    </div>
  )
}

export default About

export async function getStaticProps() {
  return {
    props: {
      showcases: [
        `Layer0's Built-In Support for Next.js 12.1`,
        'Static Pre-rendering with Layer0, to warm cache as soon as the app goes to production (or the cache is cleared)',
        '(Free) Real Time User Monitoring service offered by Layer0',
        'Edge and Browser caching of SSR page(s)',
        'Prefetching with Layer0 Service Worker to speeden up transitions',
        'Proxying and Caching external API(s) for faster edge and browser responses',
        'Layer0 Devtools: See what came from the edge, browser and serverless',
      ],
    },
  }
}
