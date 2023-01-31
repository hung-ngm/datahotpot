import type { NextPage } from 'next'
import { Layout } from '../src/components/layout'
import styles from "../src/components/mock/card-test.module.sass";
import { signOut, useSession } from "next-auth/react";
import { useDisconnect } from "wagmi";

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const { disconnect } = useDisconnect();

  return (
    <Layout>
      {!session && (
        <>
          <span>
            You are not signed in
          </span>
        </>
      )}
      {session?.user && (
        <>
          {session.user.image && (
            <span
              style={{ backgroundImage: `url('${session.user.image}')` }}
              className={styles.avatar}
            />
          )}
          <span className={styles.signedInText}>
            <small>Signed in as</small>
            <br />
            <strong>{session.user.email ?? session.user.name}</strong>
          </span>
          <a
            href={`/api/auth/signout`}
            className={styles.button}
            onClick={(e) => {
              e.preventDefault()
              disconnect()
              signOut()
            }}
          >
            Sign out
          </a>
        </>
      )}
    </Layout>
  )
}

export default Home
