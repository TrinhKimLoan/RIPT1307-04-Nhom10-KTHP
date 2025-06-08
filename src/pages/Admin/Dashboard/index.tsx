import React from 'react';
import { useModel } from 'umi';
import { Typography } from 'antd';
import StatsOverview from './components/StatsOverview';
import PostsLineChart from './components/PostsLineChart';
import TagStatsTable from './components/TagStatsTable';
import TopPostsList from './components/TopPostsList';
import {mockUsers, mockTags, mockPosts, mockComments } from '@/services/Admin/mockData'; // Import mock data for development
const { Title } = Typography;

const DashboardPage: React.FC = () => {
	let {
		userCounts = { students: 0, teachers: 0 },
		totalPosts = 0,
		totalComments = 0,
		postByMonth = [],
		tagStats = [],
		topPosts = [],
		tags = [],
	} = useModel('Admin.dashboard') || {};



	// MockData
	if (!userCounts.students && !userCounts.teachers) {
		// mockUsermockUser
		// Giả sử userCounts là tổng số người dùng
		// Chỉ lấy số lượng người dùng từ mockUsers
		userCounts.students = mockUsers.filter(user => user.role === 'student').length;
		userCounts.teachers = mockUsers.filter(user => user.role === 'teacher').length;
	}	
	if (!totalPosts) {
		// mockPostmockPost
		// Giả sử totalPosts là tổng số bài viết
		// Chỉ lấy số lượng bài viết từ mockPosts
		totalPosts = mockPosts.length;
	}
	if (!totalComments) {
		// mockComment
		// Giả sử totalComments là tổng số bình luận
		// Chỉ lấy số lượng bình luận từ mockComments
		// Giả sử mockComments có cấu trúc { id, postId, content, authorId, createdAt }
		totalComments = mockComments.length;
	}

	if (postByMonth.length === 0) {
		// mockPostByMonth
		// Giả sử postByMonth là thống kê số lượng bài viết theo tháng
		// Chỉ lấy month và count 
		postByMonth = mockPosts.reduce((acc, post) => {
			const date = new Date(post.createdAt);
			const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
			const existing = acc.find(item => item.month === month);
			if (existing) {
				existing.count += 1;
			} else {
				acc.push({ month, count: 1 });
			}
			return acc;
		}
, []);
	}
	if (tagStats.length === 0) {
		// mockTagStats
		// Giả sử tagStats là thống kê số lượng bài viết và bình luận theo từng tag
		// Chỉ lấy id, postCount, commentCount
		tagStats = mockPosts.reduce((acc, post) => {
			post.tagIds.forEach(tagId => {
				const existing = acc.find(item => item.tagId === tagId);
				if (existing) {
					existing.postCount += 1;
				} else {
					acc.push({ tagId, postCount: 1, commentCount: 0 });
				}
			});
			return acc;
		}
, []);
		mockComments.forEach(comment => {
			const post = mockPosts.find(p => p.id === comment.postId);
			if (post) {
				post.tagIds.forEach(tagId => {
					const existing = tagStats.find(item => item.tagId === tagId);
					if (existing) {
						existing.commentCount += 1;
					}
				});
			}
		}
, []);
	}
	if (topPosts.length === 0) {
		// mockTopPosts	
		// Giả sử topPosts là 5 bài viết mới nhất
		// Chỉ lấy 5 bài viết mới nhất, kèm theo số lượng bình luận và số lượng bình chọn
		topPosts = mockPosts.slice(0, 5).map(post => ({
			...post,
			voteCount: Object.keys(post.votes).length,
			comments: mockComments.filter(comment => comment.postId === post.id),
		}));
	}
	if (tags.length === 0) {
		// mockTags
		// Chuyển đổi mockTags thành định dạng phù hợp với component
		// Chỉ lấy id, name, categoryId
		// Giả sử mockTags có cấu trúc { id, name, categoryId }
		tags = mockTags.map(tag => ({
			id: tag.id,
			name: tag.name,
			categoryId: tag.categoryId,
		}));
	}
	

	
	// Render giao diện Dashboard							
	return (
		<div style={{ padding: 24 }}>
			<Title level={2}>Bảng điều khiển</Title>

			<StatsOverview userCounts={userCounts} totalPosts={totalPosts} totalComments={totalComments} />

			<PostsLineChart data={postByMonth} />

			<TagStatsTable data={tagStats} tags={tags} />

			<TopPostsList posts={topPosts} />
		</div>
	);
};

export default DashboardPage;
