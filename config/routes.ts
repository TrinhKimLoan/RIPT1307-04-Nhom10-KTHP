export default [
	{
		path: '/user',
		layout: false,
		routes: [
			{
				path: '/user/login',
				layout: false,
				name: 'login',
				component: './user/Login',
			},
			{
				path: '/user',
				redirect: '/user/login',
			},
		],
	},

	///////////////////////////////////
	// DEFAULT MENU
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: './TrangChu',
		icon: 'HomeOutlined',
	},
	{
		path: '/gioi-thieu',
		name: 'About',
		component: './TienIch/GioiThieu',
		hideInMenu: true,
	},
	{
		path: '/random-user',
		name: 'RandomUser',
		component: './RandomUser',
		icon: 'ArrowsAltOutlined',
	},
	{
		path: '/login',
		name: 'Login',
		component: './Login',
		hideInMenu: true,
	},
	{
		path: '/register',
		name: 'Register',
		component: './Register',
		hideInMenu: true,
	},
	{
		path: '/postposts',
		name: 'Add Post',
		component: './Posts/NewPost',
		icon: 'QuestionCircleOutlined',
	},
	// {
	// 	path: '/posts/:id',
	// 	name: 'View Post',
	// 	component: '@/pages/Posts/[id]/index.tsx',
	// },
	// {
	// 	path: '/posts-lists',
	// 	name: 'List of Post',
	// 	component: './Posts/PostList',
	// },

	{
		name: 'Admin',
		path: '/admin',
		icon: 'crown',
		routes: [
			{
				name: 'Bảng điều khiển',
				path: 'dashboard',
				icon: 'DashboardOutlined',
				component: './Admin/Dashboard',
			},
			{
				name: 'Quản lý người dùng',
				path: 'users',
				component: './Admin/User',
			},
			{
				name: 'Quản lý bài đăng',
				path: 'posts',
				component: './Admin/Post',
			},
		],
	},

	{
		path: '/forum',
		name: 'Diễn đàn học thuật',
		icon: 'BookOutlined',
		routes: [
		{
			path: '/forum',
			name: 'Danh sách bài viết',
			component: './Posts/PostList/index.tsx',
		},
		{
			path: '/forum/:postId',
			name: 'Chi tiết bài viết',
			component: './Posts/PostList/[postId]',
			hideInMenu: true,
		},
		],
 	},
	{
		path: '/TagForum/tag-management',
		name: 'Quản lý Tag',
		icon: 'TagsOutlined',
		component: './Posts/Tags',
	},


	// DANH MUC HE THONG
	// {
	// 	name: 'DanhMuc',
	// 	path: '/danh-muc',
	// 	icon: 'copy',
	// 	routes: [
	// 		{
	// 			name: 'ChucVu',
	// 			path: 'chuc-vu',
	// 			component: './DanhMuc/ChucVu',
	// 		},
	// 	],
	// },

	{
		path: '/notification',
		routes: [
			{
				path: './subscribe',
				exact: true,
				component: './ThongBao/Subscribe',
			},
			{
				path: './check',
				exact: true,
				component: './ThongBao/Check',
			},
			{
				path: './',
				exact: true,
				component: './ThongBao/NotifOneSignal',
			},
		],
		layout: false,
		hideInMenu: true,
	},
	{
		path: '/',
	},
	{
		path: '/403',
		component: './exception/403/403Page',
		layout: false,
	},
	{
		path: '/hold-on',
		component: './exception/DangCapNhat',
		layout: false,
	},
	{
		component: './exception/404',
	},
];
