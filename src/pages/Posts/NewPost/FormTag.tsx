import { Form, AutoComplete, Tag, message } from 'antd';
import { useModel } from 'umi';
import { useEffect, useMemo, useState } from 'react';

const FormTags = ({ form }: { form: any }) => {
  const { tags, handleCreateTag } = useModel('tags');

  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<{ value: string }[]>([]);

  const selectedCategory = Form.useWatch('tagCategoryId', form);
  const selectedTags = Form.useWatch('tagIds', form) || [];

  const availableTags = useMemo(() => {
    return tags.filter((tag) => tag.categoryId === selectedCategory);
  }, [tags, selectedCategory]);

  useEffect(() => {
    const filtered = availableTags
      .filter((tag) =>
        tag.name.toLowerCase().includes(inputValue.toLowerCase())
      )
      .map((tag) => ({ value: tag.name }));

    setOptions(filtered);
  }, [inputValue, availableTags]);

  const addTag = (name: string) => {
    if (!selectedCategory) return;
    if (!name.trim()) return;

    const existing = availableTags.find(
      (t) => t.name.toLowerCase() === name.trim().toLowerCase()
    );

    const currentTags = [...selectedTags];

    if (currentTags.length >= 5) {
      message.warning('Tối đa 5 tags');
      return;
    }

    if (existing && !currentTags.includes(existing.id)) {
      form.setFieldsValue({ tagIds: [...currentTags, existing.id] });
      return;
    }

    if (!existing) {
      const newTag = handleCreateTag(name.trim(), selectedCategory);
      form.setFieldsValue({ tagIds: [...currentTags, newTag.id] });
    }

    setInputValue('');
  };

  const removeTag = (id: string) => {
    const updated = selectedTags.filter((tagId: string) => tagId !== id);
    form.setFieldsValue({ tagIds: updated });
  };

  return (
    <Form.Item
      name="tagIds"
      label="Tags"
      rules={[
        { required: true, message: 'Vui lòng chọn ít nhất một tag' },
        {
          validator: (_, value) =>
            value && value.length <= 5
              ? Promise.resolve()
              : Promise.reject(new Error('Tối đa 5 tags')),
        },
      ]}
    >
      <>
        <div style={{ marginBottom: 8 }}>
          {selectedTags.map((tagId: string) => {
            const tag = tags.find((t) => t.id === tagId);
            return (
              <Tag
                key={tagId}
                closable
                onClose={() => removeTag(tagId)}
              >
                {tag?.name || tagId}
              </Tag>
            );
          })}
        </div>

        <AutoComplete
          value={inputValue}
          onChange={setInputValue}
          onSelect={(val) => addTag(val)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addTag(inputValue);
            }
          }}
          options={options}
          placeholder="Nhập tag mới hoặc chọn gợi ý"
          style={{ width: '100%' }}
        />
      </>
    </Form.Item>
  );
};

export default FormTags;
