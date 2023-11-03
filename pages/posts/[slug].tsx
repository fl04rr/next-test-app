import { GraphQLClient } from 'graphql-request';
import { gql } from 'graphql-request';
import { useRouter } from 'next/router';
import Layout from '../../components/layout';
import { Text } from '@mantine/core';
import Head from 'next/head';
import styles from './styles.module.scss';

const hygraph = new GraphQLClient(process.env.HYGRAPH_ENDPOINT);

interface Post {
  id: string;
  heading: string;
  description: string;
  slug: string;
}

export async function getStaticProps({ params, locale }) {
  const { slug } = params;

  const QUERY: string = gql`
  {
    post(where: { slug: "${slug}"}, locales: ${locale}) {
      id
      heading
      description
    }
  }`;

  const { post } = await hygraph.request<{ post: Post }>(QUERY);

  return {
    props: {
      post: post,
    },
  };
}

export async function getStaticPaths() {
  const QUERY: string = gql`
    {
      posts {
        slug
      }
    }
  `;

  const { posts } = await hygraph.request<{ posts: Post[] }>(QUERY);

  const locales = ['en', 'ru'];

  const paths = posts.flatMap(({ slug }) =>
    locales.map((locale) => ({
      params: { slug },
      locale,
    }))
  );

  return {
    paths,
    fallback: false,
  };
}

export default function Post({ post }, { pat }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const home: boolean = false;

  return (
    <Layout home={home}>
      <Head>
        <title>{post.heading}</title>
      </Head>
      <Text size='lg' fw={700}>
        {post.heading}
      </Text>
      <section className={styles.content}>
        <Text>{post.description}</Text>
      </section>
      {pat}
    </Layout>
  );
}
