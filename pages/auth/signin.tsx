import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
} from 'next';
import { getProviders, getSession, signIn } from 'next-auth/react';
import Layout from '../../components/layout';
import styles from './styles.module.scss';
import { IconBrandGoogleFilled } from '@tabler/icons-react';
import { Text } from '@mantine/core';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function SignIn({
  providers,
}: InferGetStaticPropsType<typeof getStaticProps>) {

  // const router = useRouter();
  
  // const checkSession = async () => {
  //   const session = await getSession();
  //   if (session) {
  //     router.back();
  //   }
  // };

  // useEffect(() => {
  //   checkSession();
  // }, []);

  return (
    <Layout home={false}>
      <article className={styles.wrapper}>
        <section className={styles.popup}>
          <Text fw={700}>Sign in with</Text>
          {providers && Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                className={styles.button}
                onClick={() => signIn(provider.id, { callbackUrl: '/' })}
              >
                {provider.name === 'Google' && <IconBrandGoogleFilled />} Sign
                in with {provider.name}
              </button>
            </div>
          ))}
        </section>
      </article>
    </Layout>
  );
}

export async function getStaticProps() {
  
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  }
}
