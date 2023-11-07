import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { getProviders, signIn } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';
import Layout from '../../components/layout';
import styles from './styles.module.scss';
import { IconBrandGoogleFilled } from '@tabler/icons-react';
import { Text } from '@mantine/core';

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout home={false}>
      <article className={styles.wrapper}>
        <section className={styles.popup}>
          <Text fw={700}>Sign in with</Text>
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                className={styles.button}
                onClick={() => signIn(provider.id)}
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return { redirect: { destination: '/' } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}
