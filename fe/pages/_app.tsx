import '../styles/globals.css'
import Head from 'next/head'
import { Web3ReactProvider } from '@web3-react/core'
import Web3 from 'web3'
import { Layout } from "../components"

function getLibrary(provider: any) {
  return new Web3(provider);
}

export default function App({ Component, pageProps }) {
  const appTitle = "DeFi_ENP";

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Layout title={appTitle}>
        <Head>
          <title>{appTitle}</title>
        </Head>
        <Component {...pageProps}/>
      </Layout>
    </Web3ReactProvider>
  )
}
