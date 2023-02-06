import type { NextPage } from 'next'
import { Layout } from '../src/components/layout'
import { Home } from '../src/components/templates/home';
import useDataNFTs from '../src/hooks/useDataNFTs';

const HomePage: NextPage = () => {
  const dataNFTs = useDataNFTs();

  return (
    <Layout>
      <Home dataNFTs={dataNFTs} />
    </Layout>
  )
}

export default HomePage
