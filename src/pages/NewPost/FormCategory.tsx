import { Form, Select, Input, Button, message } from 'antd';
import { useModel } from 'umi';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';

const FormCategory = ({ form }: { form: any }) => {
  const { tagCategories, handleCreateTagCategory, loadTagsForCategory } = useModel('posts');
  const [newCategoryName, setNewCategoryName] = useState('');

  const handleAdd = () => {
    if (!newCategoryName.trim()) return;
    const newCat = handleCreateTagCategory(newCategoryName.trim());
    form.setFieldsValue({ tagCategoryId: newCat.id });
    loadTagsForCategory(newCat.id);
    setNewCategoryName('');
    message.success('Đã tạo phân loại mới');
  };

  return (
    <>
      <Form.Item
        label="Phân loại tag"
        name="tagCategoryId"
        rules={[{ required: true, message: 'Vui lòng chọn phân loại' }]}
      >
        <Select
          placeholder="Chọn phân loại"
          onChange={(val) => loadTagsForCategory(val)}
        >
          {tagCategories.map((cat) => (
            <Select.Option key={cat.id} value={cat.id}>
              {cat.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <Input
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="Tạo phân loại mới"
        />
        <Button icon={<PlusOutlined />} onClick={handleAdd}>Tạo</Button>
      </div>
    </>
  );
};

export default FormCategory;
