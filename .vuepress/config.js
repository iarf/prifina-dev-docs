module.exports = {
	title: 'Prifina Developer Docs',
	description: 'Documentation for developers',
	themeConfig: {
		logo: '/img/logo.svg',
		nav: [
			{ text: 'Prifina.com', link: 'https://www.prifina.com/' },
			{
				text: 'For Developers',
				items: [
					{ text: 'Developers Main', link: 'https://dev.prifina.com/' },
					{ text: 'Github', link: 'https://github.com/libertyequalitydata' },
					{ text: 'Slack', link: 'https://join.slack.com/t/libertyequalitydata/shared_invite/zt-ddr4t974-MCzsch4FSeux8DrFQ2atbQ' }
				]
			}
		],
		sidebar: [
			{
				title: 'About Prifina',
				path: '/',
			},
			'/quickstart/',
			{
				title: 'Components',
				path: '/components/',
			},
			
			{
				title: 'Data Access',
				path: '/data/',
				children: [
					'/data/aggregated/'
				]
			},
			'/glossary/',
		],
	    sidebarDepth: 1,
	}
}
