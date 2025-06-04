import { Button, Space } from 'antd';
import { LikeOutlined, DislikeOutlined } from '@ant-design/icons';

export default function VoteButton({ item, userId, onVote }: {
  item: { votes: { [userId: string]: 1 | -1 } };
  userId: string;
  onVote: (value: 1 | -1) => void;
}) {
  const voted = item.votes[userId];
  const count = Object.values(item.votes).reduce((a, b) => a + b, 0);

  return (
    <Space>
      <Button icon={<LikeOutlined />} disabled={!!voted} onClick={() => onVote(1)} />
      <span>{count}</span>
      <Button icon={<DislikeOutlined />} disabled={!!voted} onClick={() => onVote(-1)} />
    </Space>
  );
}
