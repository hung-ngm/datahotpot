import type { NextPage } from 'next'
import { Layout } from '../src/components/layout'
import { Card } from "../src/components/modules/card";
import { bids } from "../src/components/mock/bids";
import styles from "../src/components/mock/card-test.module.sass";

const Home: NextPage = () => {
  return (
    <Layout>
      {bids.map((x, index) => (
        <Card className={styles.card} item={x} key={index} />
      ))}
    </Layout>
  )
}

export default Home
