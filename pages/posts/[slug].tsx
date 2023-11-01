import { GraphQLClient } from 'graphql-request';
import { gql } from 'graphql-request';


const hygraph = new GraphQLClient(process.env.HYGRAPH_ENDPOINT);

interface Post {
  id: string;
  heading: string;
  description: string;
  slug: string;
}

export async function getStaticProps({ params }) {
  const QUERY = gql`
    query ProductPageQuery($slug: String!) {
      product(where: { slug: $slug }) {
        heading
        description
        id
      }
    }
  `;

  const { product } = await hygraph.request<{ product: Post }>(QUERY, {
    slug: params.slug,
  });

  return {
    props: {
      post: product,
    },
  };
}

  export async function getStaticPaths({locale}) {
    const QUERY = gql`
      {
        posts(locales: ${locale}) {
          slug
        }
      }
    `;
  
    const { posts } = await hygraph.request<{ posts: Post[] }>(QUERY);
  
    const paths = posts.map(({ slug }) => ({
      params: { slug },
    }));
  
    return {
      paths,
      fallback: false,
    };
  }

  export default ({post}) => {
    <>
      {post.heading}
      {post.description}
      {post.id}
    </>
  }