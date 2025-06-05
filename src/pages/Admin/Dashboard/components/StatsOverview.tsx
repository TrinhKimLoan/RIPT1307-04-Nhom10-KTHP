import React from 'react';
import { Card, Row, Col, Typography } from 'antd';

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
				<Title level={4}>Sinh viên</Title>
				<Text strong>{userCounts.students}</Text>
			</Card>
		</Col>
		<Col span={6}>
			<Card>
				<Title level={4}>Giảng viên</Title>
				<Text strong>{userCounts.teachers}</Text>
			</Card>
		</Col>
		<Col span={6}>
			<Card>
				<Title level={4}>Bài đăng</Title>
				<Text strong>{totalPosts}</Text>
			</Card>
		</Col>
		<Col span={6}>
			<Card>
				<Title level={4}>Bình luận</Title>
				<Text strong>{totalComments}</Text>
			</Card>
		</Col>
	</Row>
);

export default StatsOverview;
