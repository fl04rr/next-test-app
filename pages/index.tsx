import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/layout';
import { siteTitle } from '../components/layout';
import utilStyles from '../styles/util.module.scss';
import React from 'react';
import { GraphQLClient } from 'graphql-request';
import { gql } from 'graphql-request';
import BlogItem from '../components/BlogItem/BlogItem';
import { SimpleGrid, Divider } from '@mantine/core';
import styles from './styles.module.scss';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

interface Image {
  url: string;
}

interface Post {
  id: string;
  heading: string;
  description: string;
  slug: string;
  image: Image;
}

interface HomeProps {
  posts: Post[];
}

export async function getStaticProps({ locale }) {
  const hygraph = new GraphQLClient(process.env.HYGRAPH_ENDPOINT);

  const QUERY: string = gql`
    {
      posts(locales: ${locale}){
        id
        heading
        description
        image{
          url
        }
        slug
      }
    }`;

  const { posts } = await hygraph.request<{ posts: Post[] }>(QUERY);

  return {
    props: {
      posts,
    },
  };
}

export default function Home({ posts }: HomeProps) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <Divider my='sm' />
        <SimpleGrid cols={{ base: 1, sm: 2}} className={styles.grid}>
          {posts.map(({ id, heading, description, slug, image }) => (
            <Link key={id} href={`/posts/${slug}`}>
              <BlogItem
                key={id}
                heading={heading}
                description={description}
                image={`${image.url}`}
                slug={slug}
              />
            </Link>
          ))}
        </SimpleGrid>
      </section>
    </Layout>
  );
}
