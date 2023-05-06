import Layout from "../components/Layout";
import Post from "../components/Post";
import { getAllPostsData } from "../lib/posts";

const Blog = ({ posts }) => {
  // component/Layoutをフォーマットとしている
  return (
    <Layout title="Blog">
      <ul className="m-10">
        {/* ../components/Postコンポーネントの呼び出し&postsの値をmapで展開 */}
        {posts && posts.map((post) => <Post key={post.id} post={post} />)}
      </ul>
    </Layout>
  );
};

export default Blog

// ビルド時に実行されるgetStaticPropsの定義
export async function getStaticProps() {
  // ../lib/postsのgetAllPostsDataを実行
  const posts = await getAllPostsData();
  // propsとしてreturn
  return {
    props: { posts },
  };
}