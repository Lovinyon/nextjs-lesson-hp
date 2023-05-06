import Link from "next/link";
import Layout from "../components/Layout";
import { getAllPostsIds, getPostData } from "../lib/posts";

// getStaticPropsで返す値をpropsとして受け取る
export default function Post({ post }) {
  // postデータがない場合
  if (!post) {
    return <div>Loading...</div>
  }

  // id、title、bodyの内容を出力
  return (
    <Layout title={post.title}>
      <p className="m-4">
        {"ID: "}
        {post.id}
      </p>
      <p className="mb-8 text-xl font-bold">{post.title}</p>
      <p className="px-10">{post.body}</p>
      <Link href="/blog-page">
        <div className="flex cursor-pointer mt-12">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
          </svg>
          <span>Back to blog-page</span>
        </div>
      </Link>
    </Layout>
  )
}

// ビルド時にgetAllPostsIdsを呼び出して、apiのエンドポイントにアクセス
export async function getStaticPaths() {
  const paths = await getAllPostsIds();

  return {
    paths,
    fallback: false, //存在しないpathsにアクセスされた場合、404を返すようにする設定
  };
}

// paramsをgetPostDataに渡して、そのidのdataを取得
export async function getStaticProps({ params }) {
  const { post: post } = await getPostData(params.id);

  return {
    props: {
      post,
    },
  };
}