import React from 'react';
import { Card, Row, Col, Typography } from 'antd';
import { UserOutlined, SolutionOutlined, FileTextOutlined, MessageOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface StatsOverviewProps {
	userCounts: { students: number; teachers: number };
	totalPosts: number;
	totalComments: number;
}

const StatsOverview: React.FC<StatsOverviewProps> = ({ userCounts, totalPosts, totalComments }) => (
	<Row gutter={16} style={{ marginBottom: 24 }}>
		<Col span={6}>
			<Card>
				<Title level={4}>
					<UserOutlined style={{ marginRight: 8, color: '#1890ff' }} />
						Sinh viên
					</Title>
				<Text strong>{userCounts.students}</Text>
			</Card>
		</Col>
		<Col span={6}>
			<Card>
				<Title level={4}>
					<SolutionOutlined style={{ marginRight: 8, color: '#52c41a' }} />
					Giảng viên
				</Title>
				<Text strong>{userCounts.teachers}</Text>
			</Card>
		</Col>
		<Col span={6}>
			<Card>
				<Title level={4}>
					<FileTextOutlined style={{ marginRight: 8, color: '#faad14' }} />
					Bài đăng
				</Title>
				<Text strong>{totalPosts}</Text>
			</Card>
		</Col>
		<Col span={6}>
			<Card>
				<Title level={4}>
					<MessageOutlined style={{ marginRight: 8, color: '#eb2f96' }} />
					Bình luận
				</Title>
				<Text strong>{totalComments}</Text>
			</Card>
		</Col>
	</Row>
);

export default StatsOverview;
