import { Card, Space, Tag } from 'antd';
import { Link } from 'umi';
import VoteButton from './VoteButton';
import { getTags } from '@/services/Tags/index';
import { useEffect, useState } from 'react';
import type { Tags } from '@/services/Tags/typings.d';

export default function PostItem({ post, userId, onVote }: any) {
  const [tags, setTags] = useState<Tags[]>([]);

  useEffect(() => {
    setTags(getTags());
  }, []);

  return (
    <Card title={<Link to={`/forum/${post.id}`}>{post.title}</Link>}>
      <Space wrap>
        {post.tagIds?.map((tagId: string) => {
            const tag = tags.find(t => t.id === tagId);
            return <Tag key={tagId}>{tag?.name}</Tag>;
        })}
      </Space>
      <div style={{ marginTop: 12 }}>
        <VoteButton item={post} userId={userId} onVote={onVote} />
      </div>
    </Card>
  );
}