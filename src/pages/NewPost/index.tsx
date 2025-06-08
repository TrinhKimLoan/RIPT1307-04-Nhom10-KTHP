import { useModel } from 'umi';
import PostForm from './PostForm';

const PostCreatePage = () => {
  const { currentUser } = useModel('currentUser');
  const { savePost, currentPost } = useModel('posts');

  return (
    <div style={{ padding: 24 }}>
      <h1>{currentPost ? 'Cập nhật bài viết' : 'Đăng bài mới'}</h1>
      <PostForm
        authorId={currentUser?.id || 'unknown'}
        onSubmit={savePost}
        isEditing={!!currentPost}
      />
    </div>
  );
};

export default PostCreatePage;
