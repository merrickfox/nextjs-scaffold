import '../styles/globals.css'
import "tailwindcss/tailwind.css";
import type {AppProps /*, AppContext */} from 'next/app'
import React from "react";


function MyApp({Component, pageProps}: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
