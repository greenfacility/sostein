import {
	Activity,
	AlertCircle,
	Bold,
	Droplet,
	Gift,
	HelpCircle,
	Home,
	Image,
	Link,
	MapPin,
	MessageCircle,
	Navigation,
	PieChart,
	Database,
	Sidebar,
	Terminal,
	Type,
	Underline,
	User,
} from 'react-feather';

export default [
	// {
	// 	path: '/',
	// 	name: 'Home',
	// 	icon: <Home strokeWidth={1} size={16} />,
	// },
	{
		path: '/dashboard',
		name: 'Dashboard',
		icon: <Activity strokeWidth={1} size={16} />,
	},
	{
		path: '/profile',
		name: 'Profile',
		icon: <User strokeWidth={1} size={16} />,
	},
	{
		path: '/data',
		name: 'Database',
		icon: <Database strokeWidth={1} size={16} />,
	},
	{
		path: '/signin',
		name: 'SignIn',
		icon: <User strokeWidth={1} size={16} />,
	},
	{
		path: '/signup',
		name: 'SignUp',
		icon: <User strokeWidth={1} size={16} />,
	},
	{
		path: '/chat',
		name: 'Chat',
		icon: <MessageCircle strokeWidth={1} size={16} />,
	},
	{
		name: 'Other Pages',
		icon: <Navigation strokeWidth={1} size={16} />,
		children: [
			{
				path: '/about',
				name: 'About',
			},
			{
				path: '/contact',
				name: 'Contact',
			},
			{
				path: '/service',
				name: 'Service',
			},
		],
	},
	// {
	//   path: '/widgets',
	//   name: 'Widgets',
	//   icon: <Droplet strokeWidth={1} size={16} />,
	//   badge: {
	//     value: '5'
	//   }
	// },
	// {
	//   path: '/taskboard',
	//   name: 'Taskboard',
	//   icon: <Sidebar strokeWidth={1} size={16} />,
	//   badge: {
	//     value: 'New'
	//   }
	// },
	// {
	//   name: 'Charts',
	//   icon: <PieChart strokeWidth={1} size={16} />,
	//   children: [
	//     {
	//       path: '/charts/plots',
	//       name: 'Plots'
	//     },
	//     {
	//       path: '/charts/axes',
	//       name: 'Axes'
	//     },
	//     {
	//       path: '/charts/legends',
	//       name: 'Legends'
	//     },
	//     {
	//       path: '/charts/sunburst',
	//       name: 'Sunburst'
	//     },
	//     {
	//       path: '/charts/radial',
	//       name: 'Radial'
	//     },
	//     {
	//       path: '/charts/sankeys',
	//       name: 'Sankeys'
	//     },
	//     {
	//       path: '/charts/treemaps',
	//       name: 'Treemaps'
	//     },
	//     {
	//       path: '/charts/radar',
	//       name: 'Radar charts'
	//     },
	//     {
	//       path: '/charts/misc',
	//       name: 'Misc'
	//     }
	//   ]
	// },
	// {
	//   name: 'Media',
	//   icon: <Image strokeWidth={1} size={16} />,
	//   children: [
	//     {
	//       path: '/media/grid',
	//       name: 'Grid'
	//     },
	//     {
	//       path: '/media/tile',
	//       name: 'Tile'
	//     }
	//   ]
	// },
	// {
	//   name: 'Maps',
	//   icon: <MapPin strokeWidth={1} size={16} />,
	//   children: [
	//     {
	//       path: '/maps/markers',
	//       name: 'Markers'
	//     },
	//     {
	//       path: '/maps/geojson',
	//       name: 'Geo JSON'
	//     }
	//   ]
	// },
	// {
	//   name: 'Extras',
	//   icon: <Gift strokeWidth={1} size={16} />,
	//   children: [
	//     {
	//       path: '/extras/invoice',
	//       name: 'Invoice'
	//     },
	//     {
	//       path: '/extras/timeline',
	//       name: 'Timeline'
	//     },
	//     {
	//       path: '/extras/blank',
	//       name: 'Blank'
	//     },
	//     {
	//       path: '/extras/pricing',
	//       name: 'Pricing'
	//     }
	//   ]
	// },
	// {
	//   name: 'Authentication',
	//   icon: <User strokeWidth={1} size={16} />,
	//   children: [
	//     {
	//       path: '/signin',
	//       name: 'Signin'
	//     },
	//     {
	//       path: '/signup',
	//       name: 'Signup'
	//     },
	//     {
	//       path: '/forgot',
	//       name: 'Forgot'
	//     },
	//     {
	//       path: '/lockscreen',
	//       name: 'Lockscreen'
	//     }
	//   ]
	// },
	// {
	//   name: 'Error',
	//   icon: <AlertCircle strokeWidth={1} size={16} />,
	//   children: [
	//     {
	//       path: '/thisroutedoesntwork',
	//       name: '404'
	//     },
	//     {
	//       path: '/500',
	//       name: 'Error'
	//     }
	//   ]
	// },
	// {
	//   name: 'General elements',
	//   icon: <Bold strokeWidth={1} size={16} />,
	//   children: [
	//     {
	//       path: '/general/button',
	//       name: 'Button'
	//     },
	//     {
	//       path: '/general/icon',
	//       name: 'Icon'
	//     }
	//   ]
	// },
	// {
	//   name: 'Navigation',
	//   icon: <Navigation strokeWidth={1} size={16} />,
	//   children: [
	//     {
	//       path: '/navigation/breadcrumb',
	//       name: 'Breadcrumb'
	//     },
	//     {
	//       path: '/navigation/dropdown',
	//       name: 'Dropdown'
	//     },
	//     {
	//       path: '/navigation/menu',
	//       name: 'Menu'
	//     },
	//     {
	//       path: '/navigation/pagination',
	//       name: 'Pagination'
	//     },
	//     {
	//       path: '/navigation/steps',
	//       name: 'Steps'
	//     }
	//   ]
	// },
	// {
	//   name: 'Data entry',
	//   icon: <Type strokeWidth={1} size={16} />,
	//   children: [
	//     {
	//       path: '/data-entry/autocomplete',
	//       name: 'AutoComplete'
	//     },
	//     {
	//       path: '/data-entry/checkbox',
	//       name: 'Checkbox'
	//     },
	//     {
	//       path: '/data-entry/cascader',
	//       name: 'Cascader'
	//     },
	//     {
	//       path: '/data-entry/datepicker',
	//       name: 'Date picker'
	//     },
	//     {
	//       path: '/data-entry/form',
	//       name: 'form'
	//     },
	//     {
	//       path: '/data-entry/inputnumber',
	//       name: 'Input number'
	//     },
	//     {
	//       path: '/data-entry/input',
	//       name: 'Input'
	//     },
	//     {
	//       path: '/data-entry/mention',
	//       name: 'Mention'
	//     },
	//     {
	//       path: '/data-entry/rate',
	//       name: 'Rate'
	//     },
	//     {
	//       path: '/data-entry/radio',
	//       name: 'Radio'
	//     },
	//     {
	//       path: '/data-entry/switch',
	//       name: 'Switch'
	//     },
	//     {
	//       path: '/data-entry/slider',
	//       name: 'Slider'
	//     },
	//     {
	//       path: '/data-entry/select',
	//       name: 'Select'
	//     },
	//     {
	//       path: '/data-entry/treeselect',
	//       name: 'Tree select'
	//     },
	//     {
	//       path: '/data-entry/transfer',
	//       name: 'Transfer'
	//     },
	//     {
	//       path: '/data-entry/timepicker',
	//       name: 'Time picker'
	//     },
	//     {
	//       path: '/data-entry/upload',
	//       name: 'Upload'
	//     }
	//   ]
	// },
	// {
	//   name: 'Data display',
	//   icon: <Underline strokeWidth={1} size={16} />,
	//   children: [
	//     {
	//       path: '/data-display/avatar',
	//       name: 'Avatar'
	//     },
	//     {
	//       path: '/data-display/badge',
	//       name: 'Badge'
	//     },
	//     {
	//       path: '/data-display/collapse',
	//       name: 'Collapse'
	//     },
	//     {
	//       path: '/data-display/carousel',
	//       name: 'Carousel'
	//     },
	//     {
	//       path: '/data-display/card',
	//       name: 'Card'
	//     },
	//     {
	//       path: '/data-display/calendar',
	//       name: 'Calendar'
	//     },
	//     {
	//       path: '/data-display/list',
	//       name: 'List'
	//     },
	//     {
	//       path: '/data-display/popover',
	//       name: 'Popover'
	//     },
	//     {
	//       path: '/data-display/tree',
	//       name: 'Tree'
	//     },
	//     {
	//       path: '/data-display/tooltip',
	//       name: 'Tooltip'
	//     },
	//     {
	//       path: '/data-display/timeline',
	//       name: 'Timeline'
	//     },
	//     {
	//       path: '/data-display/tag',
	//       name: 'Tag'
	//     },
	//     {
	//       path: '/data-display/tabs',
	//       name: 'Tabs'
	//     },
	//     {
	//       path: '/data-display/table',
	//       name: 'Table'
	//     }
	//   ]
	// },
	// {
	//   name: 'Feedback',
	//   icon: <Terminal strokeWidth={1} size={16} />,
	//   children: [
	//     {
	//       path: '/feedback/alert',
	//       name: 'Alert'
	//     },
	//     {
	//       path: '/feedback/drawer',
	//       name: 'Drawer'
	//     },
	//     {
	//       path: '/feedback/modal',
	//       name: 'Modal'
	//     },
	//     {
	//       path: '/feedback/message',
	//       name: 'Message'
	//     },
	//     {
	//       path: '/feedback/notification',
	//       name: 'Notification'
	//     },
	//     {
	//       path: '/feedback/progress',
	//       name: 'Progress'
	//     },
	//     {
	//       path: '/feedback/popconfirm',
	//       name: 'Pop confirm'
	//     },
	//     {
	//       path: '/feedback/spin',
	//       name: 'Spin'
	//     },
	//     {
	//       path: '/feedback/skeleton',
	//       name: 'Skeleton'
	//     }
	//   ]
	// },
];
