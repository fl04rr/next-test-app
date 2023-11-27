'use server'
import { GraphQLClient, gql } from "graphql-request";

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

export default async function getPosts(locale, posts, page){
    const hygraph = new GraphQLClient(process.env.HYGRAPH_ENDPOINT);

    const QUERY: string = gql`
         {
           posts(locales: ${locale}, first: ${posts}, skip: ${(page - 1) * posts}){
             id
             heading
             description
             image{
               url
             }
             slug
           }
         }`;
  
    try {
      const { posts } = await hygraph.request<{ posts: Post[] }>(QUERY);

      return posts;
    } catch(error){
        console.log(error);
    }
}