import { useModel, history, useLocation } from 'umi';
import PostForm from './PostForm';
import { useEffect } from 'react';
import { message } from 'antd';
import queryString from 'query-string';

const PostCreatePage = () => {
  const location = useLocation();
  const query = queryString.parse(location.search);
  const postId = query.postId as string | undefined;

  const { currentUser } = useModel('currentUser');
  const { savePost, currentPost, setCurrentPost, getById } = useModel('posts');
  
  // Load bài viết nếu có postId
  useEffect(() => {
    if (postId) {
      const post = getById(postId);
      if (post) {
        setCurrentPost(post);
      } else {
        message.error('Không tìm thấy bài viết');
        history.push('/postposts');
      }
    } else {
      setCurrentPost(null); // Reset khi tạo mới
    }
  }, [postId]);

  useEffect(() => {
    if (!currentUser) {
      message.warning('Bạn cần đăng nhập để đăng bài');
      history.push('/login');
    }
  }, [currentUser]);

  return (
    <div style={{ padding: 24 }}>
      <h1>{currentPost ? 'Cập nhật bài viết' : 'Đăng bài mới'}</h1>
      <PostForm
        authorId={currentUser?.id || 'unknown'}
        onSubmit={savePost}
        isEditing={!!currentPost}
        initialValues={currentPost} // Truyền giá trị ban đầu
      />
    </div>
  );
};

export default PostCreatePage;