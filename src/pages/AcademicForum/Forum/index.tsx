import { Table, Input, Tag, Space } from 'antd';
import { useState, useEffect } from 'react';
import { getTags } from '@/services/AcademicForum/tagService';
import { Tags, Post } from '@/services/AcademicForum/typings';

export default function ForumList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [tags, setTags] = useState<Tags[]>([]);

  useEffect(() => {
    setTags(getTags());
  }, []);

  return (
    <div>
      <h2>Danh sách bài viết</h2>
      <Table
        dataSource={posts}
        rowKey="id"
        columns={[
          { title: 'Tiêu đề', dataIndex: 'title', sorter: (a, b) => a.title.localeCompare(b.title) },
          { title: 'Ngày tạo', dataIndex: 'createdAt', sorter: (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime() },
          {
            title: 'Tags',
            render: (_, record) => (
              <Space>
                {record.tagIds.map((id: string) => {
                  const tag = tags.find(t => t.id === id);
                  return <Tag key={id}>{tag?.name}</Tag>;
                })}
              </Space>
            )
          },
          {
            title: 'Votes',
            render: (_, record) => Object.values(record.votes || {}).reduce((a: number, b: number) => a + b, 0),
            sorter: (a, b) => Object.values(b.votes || {}).reduce((x, y) => x + y, 0) - Object.values(a.votes || {}).reduce((x, y) => x + y, 0),
          }
        ]}
      />
    </div>
  );
}
