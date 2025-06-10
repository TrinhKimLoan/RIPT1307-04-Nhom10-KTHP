import { Modal, Checkbox, Select, message } from 'antd';
import { useEffect, useState } from 'react';
import { getTags } from '@/services/Tags/index';
import { getCurrentUser, updateUser } from '@/services/Users/index';
import type { Tags } from '@/services/Tags/typings.d';

export default function TagPopup() {
  const [visible, setVisible] = useState(false);
  const [tags, setTags] = useState<Tags[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [notify, setNotify] = useState(false);

  useEffect(() => {
    const shownToday = localStorage.getItem('popup_shown_today');
    if (!shownToday) {
      setTags(getTags());
      setVisible(true);
    }
  }, []);

  const handleSave = () => {
    const user = getCurrentUser();
    if (user) {
      updateUser({ ...user, subscribedTags: selected, notifyOnNewPost: notify });
      localStorage.setItem('popup_shown_today', 'true');
      message.success('Đã lưu thông tin');
      setVisible(false);
    }
  };

  return (
    <Modal title="Chọn Tag yêu thích" visible={visible} onOk={handleSave} onCancel={() => setVisible(false)}>
      <Select
        mode="multiple"
        style={{ width: '100%' }}
        placeholder="Chọn các tag bạn quan tâm"
        value={selected}
        onChange={setSelected}
      >
        {tags.map(tag => (
          <Select.Option key={tag.id} value={tag.id}>{tag.name}</Select.Option>
        ))}
      </Select>
      <Checkbox checked={notify} onChange={e => setNotify(e.target.checked)}>
        Tôi muốn nhận thông báo qua email
      </Checkbox>
    </Modal>
  );
}