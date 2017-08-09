/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 * 
 */
let baseUrl; 
let routerMode;
let imgBaseUrl;

if (process.env.NODE_ENV == 'development') {
	baseUrl = 'http://127.0.0.1:8111';
	imgBaseUrl = 'http://image.dev.atcdeal.com';
	routerMode = 'hash'
}else{
	baseUrl = 'http://127.0.0.1:8111';
	imgBaseUrl = 'http://image.atcdeal.com';
	routerMode = 'hash'
}

export {
	baseUrl,
	routerMode,
	imgBaseUrl
}