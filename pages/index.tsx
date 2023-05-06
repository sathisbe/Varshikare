import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { request, gql } from 'graphql-request'

type Post = {
  id: string;
  title: string;
  date: string;
  featuredImage: {
    node: {
      id: string;
      sourceUrl: string;
    };
  };
};

type Props = {
  posts: Post[];
};

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Recent Articles</title>
        <meta name="description" content="Recent articles fetched from a GraphQL endpoint" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Recent Articles
        </h1>

        <div className={styles.grid}>
          {posts.map((post) => (
            <a key={post.id} href={`/posts/${post.id}`} className={styles.card}>
              <div className={styles.imageContainer}>
                <Image src={post.featuredImage.node.sourceUrl} alt="Post Image" layout="fill" objectFit="cover" />
              </div>
              <h2>{post.title}</h2>
              <p>{new Date(post.date).toLocaleDateString()}</p>
            </a>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export async function getStaticProps() {
  const query = gql`
    query GetPostsEdges {
      posts {
        edges {
          node {
            id
            title
            date
            featuredImage {
              node {
                id
                sourceUrl
              }
            }
          }
        }
      }
    }
  `;

  const data = await request('https://your-graphql-endpoint.com', query);

  return {
    props: {
      posts: data.posts.edges.map((edge: { node: Post }) => edge.node),
    },
  };
}

export default Home;
