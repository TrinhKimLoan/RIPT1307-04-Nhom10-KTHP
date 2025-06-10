import React from 'react';
import { Card, Table } from 'antd';
import type { Tags } from '@/services/Tags/typings.d';

interface TagStat {
	tagId: string;
	postCount: number;
	commentCount: number;
}

interface TagStatsTableProps {
	data: TagStat[];
	tags: Tags[];
}

const TagStatsTable: React.FC<TagStatsTableProps> = ({ data, tags }) => {
	const columns = [
		{
			title: 'STT',
			key: 'index',
			align: 'center',
			render: (_: any, __: any, index: number) => index + 1,
		},
		{
			title: 'Tag',
			dataIndex: 'tagId',
			key: 'tagId',
			render: (tagId: string) => {
				const tag = tags.find((t) => t.id === tagId);
				return tag ? tag.name : tagId;
			},
		},
		{
			title: 'Số bài đăng',
			dataIndex: 'postCount',
			align: 'center',
			key: 'postCount',
		},
		{
			title: 'Số bình luận',
			dataIndex: 'commentCount',
			align: 'center',
			key: 'commentCount',
		},
	];

	return (
		<Card title='Thống kê bài và bình luận theo Tag' style={{ marginBottom: 24 }}>
			<Table dataSource={data} columns={columns as any} rowKey='tagId' pagination={false} bordered />
		</Card>
	);
};

export default TagStatsTable;