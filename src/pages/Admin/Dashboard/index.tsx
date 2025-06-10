import React from 'react';
import { useModel } from 'umi';
import { Typography } from 'antd';
import StatsOverview from './components/StatsOverview';
import PostsLineChart from './components/PostsLineChart';
import TagStatsTable from './components/TagStatsTable';
import TopPostsList from './components/TopPostsList';
import { mockUsers, mockTags, mockPosts, mockComments, postByMonthMockData } from '@/services/Admin/mockData';

const { Title } = Typography;

const DashboardPage: React.FC = () => {
	const dashboard = useModel('Admin.dashboard');

	// Mock data for users, posts, comments, tags
	const userCounts: { students: number; teachers: number } = dashboard?.userCounts ?? {
		students: mockUsers.filter((u) => u.role === 'student').length,
		teachers: mockUsers.filter((u) => u.role === 'teacher').length,
	};


	const totalPosts = dashboard?.totalPosts || mockPosts.length;

	const totalComments = dashboard?.totalComments || mockComments.length;

	const postByMonth =
		dashboard?.postByMonth?.length > 0
			? dashboard.postByMonth
			: mockPosts.reduce((acc, post) => {
					const date = new Date(post.createdAt);
					const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
					const existing = acc.find((item) => item.month === month);
					if (existing) {
						existing.count += 1;
					} else {
						acc.push({ month, count: 1 });
					}
					return acc;
			  }, []);

	const tagStats =
		dashboard?.tagStats?.length > 0
			? dashboard.tagStats
			: (() => {
					const stats = mockPosts.reduce((acc, post) => {
						post.tagIds.forEach((tagId) => {
							const existing = acc.find((item) => item.tagId === tagId);
							if (existing) {
								existing.postCount += 1;
							} else {
								acc.push({ tagId, postCount: 1, commentCount: 0 });
							}
						});
						return acc;
					}, []);
					mockComments.forEach((comment) => {
						const post = mockPosts.find((p) => p.id === comment.postId);
						if (post) {
							post.tagIds.forEach((tagId) => {
								const existing = stats.find((item) => item.tagId === tagId);
								if (existing) {
									existing.commentCount += 1;
								}
							});
						}
					});
					return stats;
			  })();

	const topPosts =
		dashboard?.topPosts?.length > 0
			? dashboard.topPosts
			: mockPosts.slice(0, 5).map((post) => ({
					...post,
					voteCount: Object.keys(post.votes).length,
					comments: mockComments.filter((comment) => comment.postId === post.id),
			  }));

	const tags =
		dashboard?.tags?.length > 0
			? dashboard.tags
			: mockTags.map((tag) => ({
					id: tag.id,
					name: tag.name,
					categoryId: tag.categoryId,
			  }));

	const chartData = (() => {
		const countMap = mockPosts.reduce((acc, post) => {
			const month = post.createdAt.slice(0, 7);
			acc[month] = (acc[month] || 0) + 1;
			return acc;
		}, {});
		return postByMonthMockData.map(({ month }) => ({
			month,
			count: countMap[month] || 0,
		}));
	})();

	return (
		<div style={{ padding: 24 }}>
			<Title level={2}>Bảng điều khiển</Title>
			<StatsOverview userCounts={userCounts} totalPosts={totalPosts} totalComments={totalComments} />
			<PostsLineChart data={chartData} />
			<TagStatsTable data={tagStats} tags={tags} />
			<TopPostsList posts={topPosts} />
		</div>
	);
};

export default DashboardPage;
