import React from 'react';
import { Card } from 'antd';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface PostByMonth {
	month: string;
	count: number;
}

interface PostsLineChartProps {
	data: PostByMonth[];
}

const PostsLineChart: React.FC<PostsLineChartProps> = ({ data }) => (
	<Card title='Biểu đồ bài đăng theo tháng' style={{ marginBottom: 24 }}>
		<ResponsiveContainer width='100%' height={300}>
			<LineChart data={data}>
				<CartesianGrid stroke='#eee' strokeDasharray='5 5' />
				<XAxis dataKey='month' />
				<YAxis />
				<Tooltip />
				<Line type='monotone' dataKey='count' stroke='#1890ff' />
			</LineChart>
		</ResponsiveContainer>
	</Card>
);

export default PostsLineChart;
