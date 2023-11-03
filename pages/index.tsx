import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/layout';
import { siteTitle } from '../components/layout';
import utilStyles from '../styles/util.module.scss';
import React from 'react';
import { GraphQLClient } from 'graphql-request';
import { gql } from 'graphql-request';
import BlogItem from '../components/BlogItem/BlogItem';
import { Stack, Divider } from '@mantine/core';

interface Post {
  id: string;
  heading: string;
  description: string;
  slug: string;
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

        <Stack className={utilStyles.stack}>
          {posts.map(({ id, heading, description, slug }) => (
            <Link key={id} href={`/posts/${slug}`}>
              <BlogItem
                heading={heading}
                description={description}
                slug={slug}
              />
            </Link>
          ))}
        </Stack>
      </section>
    </Layout>
  );
}
