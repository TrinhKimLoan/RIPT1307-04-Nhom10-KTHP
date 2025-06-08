import { useState } from 'react';
import { Form, Input, Button, Select, Tag, Checkbox, AutoComplete } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import TinyEditor from '@/components/TinyEditor';
import { useModel } from 'umi';

const { Option } = Select;

const PostForm = () => {
  const { 
    savePost, 
    tagCategories, 
    tags, 
    loadTagsForCategory, 
    handleCreateTag, 
    handleCreateTagCategory 
  } = useModel('posts');
  
  const [form] = Form.useForm();
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newTagName, setNewTagName] = useState('');
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddTag, setShowAddTag] = useState(false);

  const onFinish = (values: any) => {
    savePost({
      title: values.title,
      content: values.content,
      tagCategoryId: values.tagCategory,
      tagIds: values.tags,
      notifyOnNewComment: values.notify,
      authorId: 'current-user-id', // Cần thay bằng ID user thực tế
    });
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    loadTagsForCategory(value);
  };

  const addNewCategory = () => {
    if (newCategoryName.trim()) {
      const newCategory = handleCreateTagCategory(newCategoryName);
      setNewCategoryName('');
      setShowAddCategory(false);
      form.setFieldsValue({ tagCategory: newCategory.id });
      handleCategoryChange(newCategory.id);
    }
  };

  const addNewTag = () => {
    if (selectedCategory && newTagName.trim()) {
      const newTag = handleCreateTag(newTagName, selectedCategory);
      setNewTagName('');
      setShowAddTag(false);
      
      // Thêm tag mới vào danh sách đã chọn
      const currentTags = form.getFieldValue('tags') || [];
      form.setFieldsValue({ tags: [...currentTags, newTag.id] });
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{ notify: true }}
    >
      <Form.Item
        name="title"
        label="Tiêu đề"
        rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
      >
        <Input placeholder="Nhập tiêu đề bài đăng" />
      </Form.Item>

      <Form.Item
        name="content"
        label="Nội dung"
        rules={[{ required: true, message: 'Vui lòng nhập nội dung' }]}
      >
        <TinyEditor />
      </Form.Item>

      <Form.Item
        name="tagCategory"
        label="Phân loại tag"
        rules={[{ required: true, message: 'Vui lòng chọn phân loại tag' }]}
      >
        <Select
          placeholder="Chọn phân loại"
          onChange={handleCategoryChange}
          dropdownRender={(menu) => (
            <>
              {menu}
              <div style={{ padding: 8 }}>
                {showAddCategory ? (
                  <div style={{ display: 'flex', gap: 8 }}>
                    <Input
                      placeholder="Tên phân loại mới"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                    />
                    <Button 
                      type="primary" 
                      icon={<PlusOutlined />}
                      onClick={addNewCategory}
                    >
                      Thêm
                    </Button>
                  </div>
                ) : (
                  <Button 
                    type="dashed" 
                    icon={<PlusOutlined />} 
                    onClick={() => setShowAddCategory(true)}
                  >
                    Thêm phân loại mới
                  </Button>
                )}
              </div>
            </>
          )}
        >
          {tagCategories.map(category => (
            <Option key={category.id} value={category.id}>
              {category.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      {selectedCategory && (
        <Form.Item
          name="tags"
          label="Tags"
          rules={[
            { 
              required: true, 
              message: 'Vui lòng chọn ít nhất một tag' 
            },
            {
              validator: (_, value) => 
                value && value.length <= 5 
                  ? Promise.resolve() 
                  : Promise.reject(new Error('Tối đa 5 tags'))
            }
          ]}
        >
          <Select
            mode="multiple"
            placeholder="Chọn tags (tối đa 5)"
            dropdownRender={(menu) => (
              <>
                {menu}
                <div style={{ padding: 8 }}>
                  {showAddTag ? (
                    <div style={{ display: 'flex', gap: 8 }}>
                      <AutoComplete
                        placeholder="Tên tag mới"
                        value={newTagName}
                        onChange={setNewTagName}
                        options={tags.map(tag => ({ value: tag.name }))}
                      />
                      <Button 
                        type="primary" 
                        icon={<PlusOutlined />}
                        onClick={addNewTag}
                      >
                        Thêm
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      type="dashed" 
                      icon={<PlusOutlined />} 
                      onClick={() => setShowAddTag(true)}
                    >
                      Thêm tag mới
                    </Button>
                  )}
                </div>
              </>
            )}
          >
            {tags
              .filter(tag => tag.categoryId === selectedCategory)
              .map(tag => (
                <Option key={tag.id} value={tag.id}>
                  <Tag>{tag.name}</Tag>
                </Option>
              ))}
          </Select>
        </Form.Item>
      )}

      <Form.Item
        name="notify"
        valuePropName="checked"
      >
        <Checkbox>Nhận email khi có bình luận mới</Checkbox>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Đăng bài
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PostForm;