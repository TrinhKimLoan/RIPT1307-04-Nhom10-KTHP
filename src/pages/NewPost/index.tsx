import { Button, Card, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useModel } from 'umi';
import PostForm from './PostForm';

const PostsPage = () => {
  const { 
    editorVisible, 
    setEditorVisible,
    newPost,
    currentPost
  } = useModel('posts');

  return (
    <div>
      <Card 
        title="Bài đăng" 
        extra={
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={newPost}
          >
            Đăng bài mới
          </Button>
        }
      >
        {/* Danh sách bài đăng sẽ được thêm ở đây */}
        <p>Danh sách bài đăng sẽ hiển thị tại đây...</p>
      </Card>

      <Modal
        title={currentPost ? 'Chỉnh sửa bài đăng' : 'Đăng bài mới'}
        visible={editorVisible}
        onCancel={() => setEditorVisible(false)}
        footer={null}
        width={800}
        destroyOnClose
      >
        <PostForm />
      </Modal>
    </div>
  );
};

export default PostsPage;