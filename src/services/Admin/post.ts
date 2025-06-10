import type {
	CreatePostPayload,
	EditPostPayload,
	AddCommentPayload,
	VoteType,
} from '@/services/Admin/admin.types';
import type {Post} from '@/services/Posts/typings.d';
import type { Comment } from '@/services/Comments/typings.d';
const POST_KEY = 'posts';
const COMMENT_KEY = 'comments';

// hàm để lấy và lưu trữ bài viết và bình luận trong localStorage
export const getPosts = (): Post[] => {
	return JSON.parse(localStorage.getItem(POST_KEY) || '[]');
};

// hàm để lưu bài viết vào localStorage
export const savePosts = (posts: Post[]) => {
	localStorage.setItem(POST_KEY, JSON.stringify(posts));
};

// hàm để lấy và lưu trữ bình luận trong localStorage
export const getComments = (): Comment[] => {
	return JSON.parse(localStorage.getItem(COMMENT_KEY) || '[]');
};

// hàm để lưu bình luận vào localStorage
export const saveComments = (comments: Comment[]) => {
	localStorage.setItem(COMMENT_KEY, JSON.stringify(comments));
};

// Quản lý bài đăng
export const createPost = (payload: CreatePostPayload): Post => {
  const posts = getPosts();
  const newPost: Post = {
    ...payload, // Sử dụng payload thay vì tạo thủ công
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    votes: {},
  };
  savePosts([...posts, newPost]);
  return newPost;
};

// Lấy danh sách bài đăng
export const editPost = (payload: EditPostPayload): Post | null => {
	const posts = getPosts();
	const idx = posts.findIndex((p) => p.id === payload.id);
	if (idx === -1) return null;
	posts[idx] = {
		...posts[idx],
		title: payload.title,
		content: payload.content,
		tagIds: payload.tagIds,
		createdAt: new Date().toISOString(),
	};
	savePosts(posts);
	return posts[idx];
};

//Xóa bài đăng
export const deletePost = (postId: string) => {
	const posts = getPosts().filter((p) => p.id !== postId);
	savePosts(posts);
};

//thêm bình chọn cho bài đăng
export const addVote = (postId: string, userId: string, vote: VoteType) => {
	const posts = getPosts();
	const post = posts.find((p) => p.id === postId);
	if (!post) return;
	post.votes[userId] = vote;
	savePosts(posts);
};

// Xóa bình chọn cho bài đăng
export const addComment = (payload: AddCommentPayload): Comment => {
	const comments = getComments();
	const newComment: Comment = {
		id: Date.now().toString(),
		postId: payload.postId,
		parentCommentId: payload.parentCommentId,
		authorId: payload.authorId,
		content: payload.content,
		createdAt: new Date().toISOString(),
		votes: {},
	};
	comments.push(newComment);
	saveComments(comments);
	return newComment;
};

// Lấy danh sách bài đăng
export const getPostComments = (postId: string): Comment[] => {
	return getComments().filter((c) => c.postId === postId);
};

// Lấy danh sách bài đăng theo trang
export const getVoteCount = (postId: string): number => {
	const posts = getPosts();
	const post = posts.find((p) => p.id === postId);
	if (!post) return 0;
	return Object.values(post.votes).reduce((sum, v) => sum + v, 0);
};

// Lấy danh sách bình luận theo trang
export const getCommentCount = (postId: string): number => {
	return getComments().filter((c) => c.postId === postId).length;
};

// Tìm kiếm bài đăng theo tiêu đề
export const searchPostsByTitle = (keyword: string): Post[] => {
	return getPosts().filter((p) => p.title.toLowerCase().includes(keyword.toLowerCase()));
};

// Lọc bài đăng theo thẻ
export const filterPostsByTag = (tagId: string): Post[] => {
	return getPosts().filter((p) => p.tagIds.includes(tagId));
};