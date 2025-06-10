import type { User, Post, Comment, Tag } from '@/services/Admin/admin.types';

/** Lấy dữ liệu từ localStorage theo key, trả về mảng hoặc [] nếu chưa có */
function getDataFromStorage<T>(key: string): T[] {
	const raw = localStorage.getItem(key);
	return raw ? JSON.parse(raw) : [];
}

export function getUsers(): User[] {
	return getDataFromStorage<User>('users');
}

export function getPosts(): Post[] {
	return getDataFromStorage<Post>('posts');
}

export function getComments(): Comment[] {
	return getDataFromStorage<Comment>('comments');
}

export function getTags(): Tag[] {
	return getDataFromStorage<Tag>('tags');
}

/** Lưu dữ liệu vào localStorage */
function saveDataToStorage<T>(key: string, data: T[]) {
	localStorage.setItem(key, JSON.stringify(data));
}

export function saveUsers(users: User[]) {
	saveDataToStorage('users', users);
}

export function savePosts(posts: Post[]) {
	saveDataToStorage('posts', posts);
}

export function saveComments(comments: Comment[]) {
	saveDataToStorage('comments', comments);
}
export function saveTags(tags: Tag[]) {
	saveDataToStorage('tags', tags);
}
