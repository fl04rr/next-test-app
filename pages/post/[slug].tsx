import { GraphQLClient } from 'graphql-request';
import { gql } from 'graphql-request';
import { useRouter } from 'next/router';
import Layout from '../../components/layout';
import Head from 'next/head';
import PostContent from '../../components/PostContent/PostContent';
import { useSession } from 'next-auth/react';
import SignInBanner from '../../components/SignInBanner/SignInBanner';

const hygraph = new GraphQLClient(process.env.HYGRAPH_ENDPOINT);

interface Content {
  html: string;
}

interface Image {
  url: string;
}

interface Post {
  id: string;
  heading: string;
  description: string;
  slug: string;
  content: Content;
  image: Image;
}

export async function getServerSideProps({ params, locale }) {
  const { slug } = params;

  const QUERY: string = gql`
  {
    post(where: { slug: "${slug}"}, locales: ${locale}) {
      id
      heading
      description
	  slug
      image{
        url
      }
      content{
        html
      }
    }
  }`;

  const { post } = await hygraph.request<{ post: Post }>(QUERY);

  return {
    props: {
      post: post,
    },
  };
}

const Post = (({ post }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const { data: session, status } = useSession();

  const home: boolean = false;

  return (
    <Layout home={home}>
      <Head>
        <title>{post.heading}</title>
        <meta name='description' content={post.description} />
        <meta property='og:image' content={post.image.url} />
        <meta name='og:title' content={post.heading} />
        <meta name='twitter:card' content='summary_large_image' />
      </Head>

      {status === 'authenticated' ? (
        <PostContent
          heading={post.heading}
          description={post.description}
          content={post.content.html}
          image={post.image.url}
		      slug={post.slug}
		      id={post.id}
        />
      ) : (
        <>
          {!session && <SignInBanner />}
          <PostContent
            heading=''
            description=''
            content=''
            image={post.image.url}
            slug=''
            id={post.id}
          />
        </>
      )}
    </Layout>
  );
});

export default Post;
