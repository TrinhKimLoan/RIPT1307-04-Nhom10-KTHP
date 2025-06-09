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
		path: '/to-do-list',
		name: 'ToDoList',
		component: './ToDoList',
		icon: 'UnorderedListOutlined',
	},
	{
		path: '/guess-number',
		name: 'RandomNumber',
		component: './RandomNum',
		icon: 'UnorderedListOutlined',
	},
	{
		path: '/courses',
		name: 'Learn online', 
		component: '@/pages/Learn Online/index',
	},	
	{
		path: '/CLB',
		name: 'List CLB',
		component: '@/pages/CLB/index',
	},
	{
    path: '/forum',
    name: 'Diễn đàn học thuật',
    icon: 'BookOutlined',
    routes: [
      {
        path: '/forum/List',
        name: 'Danh sách bài viết',
        component: '@/pages/AcademicForum/Forum/index',
      },
      {
        path: '/forum/:postId',
        name: 'Chi tiết bài viết',
        component: '@/pages/AcademicForum/Forum/[postId]',
      },
    ],
 	},
	{
		path: '/TagForum/tag-management',
		name: 'Quản lý Tag',
		icon: 'TagsOutlined',
		component: '@/pages/AcademicForum/tag-management/Tags',
	},

	// {
	// 	path: '/study-tracker',
	// 	name: 'ToDoList',
	// 	component: './StudyTracker',
	// 	icon: 'UnorderedListOutlined',
	// },

	

		{
		  path: '/study-tracker',
		  name: '📚 StudyTracker',
		  routes: [
			{ path: '/study-tracker/subjects', name: '📘 Quản lý Môn học', component: './StudyTracker/Subjects' },
			{ path: '/study-tracker/progress', name: '⏳ Tiến độ Học tập', component: './StudyTracker/Progress' },
			{ path: '/study-tracker/goals', name: '🎯 Mục tiêu Học tập', component: './StudyTracker/Goals' },
		  ],
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
