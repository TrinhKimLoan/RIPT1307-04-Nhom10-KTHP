import { Modal } from 'antd';

interface Props {
	onConfirm: () => void;
	onCancel: () => void;
}

const DeleteConfirm: React.FC<Props> = ({ onConfirm, onCancel }) => {
	return (
		<Modal
			visible={true}
			title='Xác nhận xoá'
			onOk={onConfirm}
			onCancel={onCancel}
			okText='Xoá'
			okButtonProps={{ danger: true }}
			cancelText='Huỷ'
		>
			Bạn có chắc chắn muốn xoá bài đăng này không?
		</Modal>
	);
};

export default DeleteConfirm;
