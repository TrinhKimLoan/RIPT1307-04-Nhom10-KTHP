import React from 'react';
import { useModel } from 'umi';
import { Typography } from 'antd';
import StatsOverview from './components/StatsOverview';
import PostsLineChart from './components/PostsLineChart';
import TagStatsTable from './components/TagStatsTable';
import TopPostsList from './components/TopPostsList';

const { Title } = Typography;

const DashboardPage: React.FC = () => {
  const dashboard = useModel('adminDashboard');

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Bảng điều khiển</Title>
      
      <StatsOverview 
        userCounts={dashboard.userCounts} 
        totalPosts={dashboard.totalPosts} 
        totalComments={dashboard.totalComments} 
      />
      
      <PostsLineChart data={dashboard.postByMonth} />
      
      <TagStatsTable 
        data={dashboard.tagStats} 
        tags={dashboard.tags} 
      />
      
      <TopPostsList posts={dashboard.topPosts} />
    </div>
  );
};

export default DashboardPage;