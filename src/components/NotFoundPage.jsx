import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
    return (
        <>
        <Helmet>
    <title>{`Piyush Ras - Page Not Found`}</title>
  <meta
    name="description"
    content={"Best Hindi poetry platform"}
  />
      </Helmet>
        <div className='w-full  bg-gray-900  h-screen'>
            <div className="pt-20 object-cover object-center">

                <div class="text-center">
                    <p class="text-base font-semibold text-indigo-600 dark:text-indigo-400">404</p>
                    <h1 class="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl dark:text-white">Page not found</h1>
                    <p class="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8 dark:text-gray-400">Sorry, we couldn’t find the page you’re looking for.</p>
                    <div class="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                        to="/"
                        class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500" href="/">Go back home</Link>
                        </div></div>
            </div>
        </div>
        </>
    )
}

export default NotFoundPage