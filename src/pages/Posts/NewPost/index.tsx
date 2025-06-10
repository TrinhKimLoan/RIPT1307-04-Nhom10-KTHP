import { useModel, history } from 'umi';
import PostForm from './PostForm';
import { UserRole } from '@/services/Users/typings.d';
import {useEffect} from 'react';
import { message } from 'antd';

const PostCreatePage = () => {
  const { currentUser } = useModel('currentUser');
  const { savePost, currentPost } = useModel('posts');
  useEffect(() => {
    if (!currentUser) {
      message.warning('Bạn cần đăng nhập để đăng bài');
      history.push('/login');
    } else if (currentUser.role === UserRole.Admin) {
      message.warning('Admin không thể đăng bài');
      history.push('/list');
    }
  }, [currentUser]);

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
