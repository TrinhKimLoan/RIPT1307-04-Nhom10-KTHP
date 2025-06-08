import React from 'react';
import { Card, List, Button } from 'antd';
import { Post } from '@/services/Admin/admin.types';

interface TopPostsListProps {
	posts: Post[];
}

const TopPostsList: React.FC<TopPostsListProps> = ({ posts }) => (
	<Card title='Bài đăng nổi bật'>
		<List
			dataSource={posts}
			renderItem={(item) => (
				<List.Item
					actions={[
						<Button type='link' key='view'>
							Xem chi tiết
						</Button>,
					]}
				>
					<List.Item.Meta
						title={item.title}
						description={`Tổng điểm tương tác: ${Object.values(item.votes || {}).reduce((a, b) => a + b, 0)}`}
					/>
				</List.Item>
			)}
		/>
	</Card>
);

export default TopPostsList;
