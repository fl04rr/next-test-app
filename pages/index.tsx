import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/layout';
import { siteTitle } from '../components/layout';
import utilStyles from '../styles/util.module.scss';
import {useEffect, useState } from 'react';
import { GraphQLClient } from 'graphql-request';
import { gql } from 'graphql-request';
import BlogItem from '../components/BlogItem/BlogItem';
import { SimpleGrid, Divider, Pagination, Group, Skeleton } from '@mantine/core';
import styles from './styles.module.scss';
import Image from 'next/image';
import { useRouter } from 'next/router';

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
  currentPage: number;
  postsInPage: number;
}

export const getServerSideProps = async ({ locale, query }) => {

	const currentPage: number = query.page ? Number(query.page) : 1;
  	const postsInPage: number = 4;	

	
	const hygraph = new GraphQLClient(process.env.HYGRAPH_ENDPOINT);

	const QUERY: string = gql`
		{
			posts(locales: ${locale}, first: ${postsInPage}, skip: ${(currentPage - 1) * postsInPage}){
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
		currentPage,
		postsInPage
		},
	};
};

export default function Home({ posts, currentPage, postsInPage }: HomeProps) {

	const [activePage, setActivePage] = useState<number>(currentPage);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const router = useRouter();

	const changePage = page => {
		setIsLoading(true)
		router.push(`/?page=${page}`);
		setActivePage(page);
	}

	useEffect(() => {
		setIsLoading(false);
	}, [posts])

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <article className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
		<Group justify='center'>
			<Pagination
				total={3}
				value={activePage}
				className={styles.pagination}
				onChange={page => changePage(page)}
          	/>
		</Group>
        <Divider my='sm' />
        <SimpleGrid cols={{ base: 1, sm: 2 }} className={styles.grid}>
          {!isLoading ? posts?.map(({ id, heading, description, slug, image }) => (
            <Link key={id} href={`/post/${slug}`}>
              <BlogItem
                key={id}
                heading={heading}
                description={description}
                image={`${image.url}`}
                slug={slug}
              />
            </Link>
          )) : [...Array(postsInPage)].map((_, index) => <Skeleton key={index} radius='md' className={styles.skeletonItem} />)}
        </SimpleGrid>
      </article>
    </Layout>
  );
}
