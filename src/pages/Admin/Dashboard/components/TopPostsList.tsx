import React from 'react';
import { Card, List, Button } from 'antd';
import type { Post } from '@/services/Posts/typings.d';
import { Link } from 'umi';

interface TopPostsListProps {
  posts: Post[];
}

const TopPostsList: React.FC<TopPostsListProps> = ({ posts }) => (
  <Card title="Bài đăng nổi bật">
    <List
      dataSource={posts}
      renderItem={(item) => (
        <List.Item
          actions={[
            <Link to={`/forum/${item.id}`} key="view">
              <Button type="link">Xem chi tiết</Button>
            </Link>,
          ]}
        >
          <List.Item.Meta
            title={
              <Link to={`/forum/${item.id}`}>
                {item.title}
              </Link>
            }
            description={`Tổng điểm tương tác: ${Object.values(item.votes || {}).reduce((a, b) => a + b, 0)}`}
          />
        </List.Item>
      )}
    />
  </Card>
);

export default TopPostsList;
