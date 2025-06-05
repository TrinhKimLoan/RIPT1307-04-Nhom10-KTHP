import React from 'react';
import { useModel } from 'umi';
import { Typography } from 'antd';
import StatsOverview from './components/StatsOverview';
import PostsLineChart from './components/PostsLineChart';
import TagStatsTable from './components/TagStatsTable';
import TopPostsList from './components/TopPostsList';

const { Title } = Typography;

const DashboardPage: React.FC = () => {
	const {
		userCounts = { students: 0, teachers: 0 },
		totalPosts = 0,
		totalComments = 0,
		postByMonth = [],
		tagStats = [],
		topPosts = [],
		tags = [],
	} = useModel('Admin.dashboard') || {};

	return (
		<div style={{ padding: 24 }}>
			<Title level={2}>Dashboard tổng quan</Title>

			<StatsOverview userCounts={userCounts} totalPosts={totalPosts} totalComments={totalComments} />

			<PostsLineChart data={postByMonth} />

			<TagStatsTable data={tagStats} tags={tags} />

			<TopPostsList posts={topPosts} />
		</div>
	);
};

export default DashboardPage;
