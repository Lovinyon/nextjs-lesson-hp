const apiUrl = "https://jsonplaceholder.typicode.com/posts";

// apiurlのリンクにアクセスして、json形式に整形してreturn
export async function getAllPostsData() {
  const res = await fetch(new URL(apiUrl));
  const posts = await res.json();
  return posts;
}

// apiurlのリンクにアクセスして、json形式に整形
// mapで展開してidだけにする
// getStaticPathesにはfieldにparamsが必要
export async function getAllPostsIds() {
  const res = await fetch(new URL(apiUrl));
  const posts = await res.json();

  return posts.map((post) => {
    return {
      params: {
        id: String(post.id),
      },
    };
  });
}

// 特定のidを使ってdataを取得
// idを受け取って、それをpathに組み込み、dataを取得
export async function getPostData(id) {
  const res = await fetch(new URL(`${apiUrl}/${id}`));
  const post = await res.json();
  return {
    post,
  };
}