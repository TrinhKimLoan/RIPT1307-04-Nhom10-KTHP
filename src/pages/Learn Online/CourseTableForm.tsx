import React, { useState, useEffect } from 'react';
import { Table, Input, Select, Button, message, Space, Modal, Form, InputNumber } from 'antd';
import { Course } from './course';
import { getCourses, addCourse, updateCourse, deleteCourse } from './CourseService';
import TinyEditor from '@/components/TinyEditor';

const { Search } = Input;
const { Option } = Select;

const CourseTableForm: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterInstructor, setFilterInstructor] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [formVisible, setFormVisible] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [form] = Form.useForm();

  const loadCourses = () => {
    const data = getCourses();
    setCourses(data);
    setFilteredCourses(data);
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };
  
  const handleFilter = (instructor: string | null, status: string | null) => {
    setFilterInstructor(instructor);
    setFilterStatus(status);
  };  

  const filterData = (search: string, instructor: string | null, status: string | null) => {
    let data = getCourses();
    if (search) {
      data = data.filter(course => course.name.toLowerCase().includes(search.toLowerCase()));
    }
    if (instructor) {
      data = data.filter(course => course.instructor === instructor);
    }
    if (status) {
      data = data.filter(course => course.status === status);
    }
    setFilteredCourses(data);
  };

  useEffect(() => {
    filterData(searchTerm, filterInstructor, filterStatus);
  }, [searchTerm, filterInstructor, filterStatus]); 

  const handleDelete = (id: string) => {
    deleteCourse(id);
    loadCourses();
    message.success('Xóa khóa học thành công!');
  };

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
    form.setFieldsValue(course);
    setFormVisible(true);
  };

  const handleAdd = () => {
    setEditingCourse(null);
    form.resetFields();
    setFormVisible(true);
  };

  const handleSave = () => {
    form.validateFields().then(values => {
      if (editingCourse) {
        updateCourse({ ...editingCourse, ...values });
      } else {
        const newCourse: Course = { id: Date.now(), ...values };
        addCourse(newCourse);
      }
      
      setFormVisible(false);
      loadCourses();
      message.success('Lưu khóa học thành công!');
    }).catch(() => {
      message.error('Vui lòng kiểm tra lại thông tin!');
    });
  };
  
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Tên khóa học', dataIndex: 'name', key: 'name' },
    { title: 'Giảng viên', dataIndex: 'instructor', key: 'instructor' },
    { title: 'Số lượng học viên', dataIndex: 'students', key: 'students', sorter: (a: Course, b: Course) => a.students - b.students },
    { title: 'Trạng thái', dataIndex: 'status', key: 'status' },
    {
      title: 'Hành động',
      key: 'actions',
      render: (_: any, record: Course) => (
        <Space>
          <Button type="link" onClick={() => handleEdit(record)}>Sửa</Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>Xóa</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>Thêm khóa học</Button>
      <Space style={{ marginBottom: 16 }}>
        <Search placeholder="Tìm kiếm khóa học" onSearch={handleSearch} enterButton />
        <Select placeholder="Chọn giảng viên" allowClear onChange={value => handleFilter(value, filterStatus)}>
          {Array.from(new Set(courses.map(course => course.instructor))).map(instructor => (
            <Option key={instructor} value={instructor}>{instructor}</Option>
          ))}
        </Select>
        <Select placeholder="Chọn trạng thái" allowClear onChange={value => handleFilter(filterInstructor, value)}>
          <Option value="Đang mở">Đang mở</Option>
          <Option value="Đã kết thúc">Đã kết thúc</Option>
          <Option value="Tạm dừng">Tạm dừng</Option>
        </Select>
        <Form.Item name="instructor" label="Giảng viên" rules={[{ required: true, message: 'Vui lòng chọn giảng viên!' }]}>
          <Select>
            <Option value="Nguyễn Văn A">Nguyễn Văn A</Option>
            <Option value="Trần Thị B">Trần Thị B</Option>
            <Option value="Lê Văn C">Lê Văn C</Option>
          </Select>
        </Form.Item>
      </Space>
      <Table columns={columns} dataSource={filteredCourses} rowKey="id" />

      {/* Modal Form */}
      <Modal title={editingCourse ? 'Chỉnh sửa khóa học' : 'Thêm khóa học'} visible={formVisible} onCancel={() => setFormVisible(false)} onOk={handleSave}>
      <Form form={form} layout="vertical">
          <Form.Item name="name" label="Tên khóa học" rules={[{ required: true, message: 'Vui lòng nhập tên khóa học!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="instructor" label="Giảng viên" rules={[{ required: true, message: 'Vui lòng nhập tên giảng viên!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="students" label="Số lượng học viên" rules={[{ required: true, message: 'Vui lòng nhập số lượng học viên!' }]}>
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="status" label="Trạng thái" rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}>
            <Select>
              <Option value="Đang mở">Đang mở</Option>
              <Option value="Đã kết thúc">Đã kết thúc</Option>
              <Option value="Tạm dừng">Tạm dừng</Option>
            </Select>
          </Form.Item>
          <Form.Item name="description" label="Mô tả khóa học">
            <TinyEditor />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CourseTableForm;
