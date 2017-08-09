import fetch from '../config/fetch'


	/**
	 * 新增用户
	 */

	export const addUser = (userinfo) => fetch( 'POST', '/admin/userRegister', {
		companyNameCn:userinfo.companyNameCn,
		user_name:userinfo.user_name,
		mobile:userinfo.mobile,
		password:userinfo.password,
		email:userinfo.email,
		status:userinfo.passOrNoPass
	});

	/**
	 * 修改用户
	 */

	export const putUser = (userinfo) => fetch( 'PUT', '/admin/changeUser', {
		user_id: userinfo.user_id,
		companyNameCn: userinfo.companyNameCn,
		user_name: userinfo.user_name,
		mobile: userinfo.mobile,
		password: userinfo.password,
		email: userinfo.email,
		status: userinfo.passOrNoPass
	});

	/**
	 * 账号登录
	 */

  export const accountLogin = (user_name,password) => fetch( 'POST', '/admin/login', {
		user_name:user_name,
		password:password
	});


	/**
	 * 获取页面菜单列表
	 */
	export const getMenuList = () => fetch('GET', '/menu/menu');


	/**
	 * 修改用户密码
	 */

	export const changePassword = (oldPas,newPas) => fetch( 'PUT', '/admin/changePassword', {
		oldPas:oldPas,
		newPas:newPas
	});


	/**
	 * 退出登录
	 */

	export const singout = () => fetch('GET', '/admin/singout');

	/**
	 * 验证公司名称是否注册
	 */

	export const companyNameCheckIsRg = (companyNameCn) => fetch('POST', '/admin/companyNameCheck',{
		companyNameCn:companyNameCn
	});



	/**
	 * 获取用户列表数据
	 */

	export const getUserList = (pageNo, pageSize,query) => fetch('POST', '/admin/listByPage', {
		pageNo:pageNo,
		pageSize:pageSize,
		query:query
	});

	/**
	 * 获取用户数据
	 */

	export const getUserInfo = (userId) => fetch('GET', '/admin/getUserInfo?user_id='+ userId);

   /**
	* 删除管理员
	*/

	export const deleAdmin = (adminId) => fetch('DELETE', '/admin/delAdmin?admin_id='+ adminId);

	/**
	 * 删除角色
	 */

	export const deleRole = (roleId) => fetch('DELETE', '/admin/delRole?role_id='+ roleId);

	/**
	 * 获取管理员列表
	 */

	export const getAdminList = (pageNo, pageSize,query) => fetch('POST', '/admin/getAllAdmin', {
		pageNo:pageNo,
		pageSize:pageSize,
		query:query
	});

	/**
	 * 获取角色分页列表
	 */

	export const getRoleListByPage = (pageNo, pageSize,query) => fetch('POST', '/admin/roleListByPage', {
		pageNo:pageNo,
		pageSize:pageSize,
		query:query
	});

	/**
	 * 获取角色列表
	 */

	export const getRoleList = (pageNo, pageSize,query) => fetch('GET', '/admin/getRoleList');

	/**
	 * 获取角色权限选择列表
	 */

	export const getRolePermissionsList = (pageNo, pageSize,query) => fetch('GET', '/admin/getRolePermissionsList');

	/**
	 * 新增管理员
	 */

	export const addAdministrator = (adminInfo) => fetch( 'POST', '/admin/addAdmin', {
		admin_name:adminInfo.admin_name,
		password:adminInfo.password,
		role_id:adminInfo.role_id,
		realname:adminInfo.realname,
	});

	/**
	 * 修改管理员
	 */

	export const putAdministrator = (adminInfo) => fetch( 'PUT', '/admin/changeAdmin', {
		admin_id: adminInfo.admin_id,
		admin_name: adminInfo.admin_name,
		password: adminInfo.password,
		role_id: adminInfo.role_id,
		realname: adminInfo.realname
	});

	/**
	 * 获取管理员数据
	 */

	export const getAdminInfo = (adminId) => fetch('GET', '/admin/getAdminInfo?admin_id='+ adminId);

	/**
	 * 新增角色
	 */

	export const addRole = (role_name,operationIds) => fetch( 'POST', '/admin/addRole', {
		role_name: role_name,
		operationIds: operationIds
	});

	/**
	 * 修改角色
	 */

	export const putRole = (role_id,role_name,operationIds) => fetch( 'PUT', '/admin/changeRole', {
		role_id: role_id,
		role_name: role_name,
		operationIds: operationIds
	});

	/**
	 * 获取角色数据
	 */

	export const getRoleInfo = (roleId) => fetch('GET', '/admin/getRoleInfo?role_id='+ roleId);

	/**
	 * 获取supplier列表
	 */

	export const postSupplierListByPage = (pageNo, pageSize,query) => fetch('POST', '/supplier/listByPage', {
		pageNo:pageNo,
		pageSize:pageSize,
		query:query
	});

	/**
	 * 获取supplier详情
	 */

	export const getSupplierInfo = (companyId) => fetch('GET', '/supplier/getSupplierInfo?company_id='+ companyId);


	/**
	* 修改supplier
	*/

	export const putSupplier = (company_id,query) => fetch( 'PUT', '/supplier/changeSupplier', {
		company_id: company_id,
		query: query
	});

	/**
	 * 修改采购商
	 */

	export const putCompany = (company_id,query) => fetch( 'PUT', '/supplier/changeCompany', {
		company_id: company_id,
		query: query
	});


	/**
	 * 新增采购商
	 */

	export const addCompany = (query,license) => fetch( 'POST', '/supplier/createCompany', {
		company_name_cn:query.company_name_cn,
		user_id:query.user_id,
		registered_capital:query.registered_capital,
		company_phone:query.company_phone,
		detail_address:query.detail_address,
		address: query.address,
		threeToOne:query.threeToOne,
		license
	});

	/**
	 * 获取报关单列表
	 */

	export const getClearanceList = (pageNo, pageSize,query) => fetch('POST', '/clearance/listByPage', {
		pageNo:pageNo,
		pageSize:pageSize,
		query:query
	});

	/**
	 * 获取报关单详情
	 */

	export const getClearanceInfo = (export_form_id) => fetch('GET', '/clearance/getClearanceInfo?export_form_id='+ export_form_id);

	/**
	 * 修改报关单信息
	 */

	export const putClearanceInfo = (export_form_id,query) => fetch( 'PUT', '/clearance/changeClearance', {
		export_form_id: export_form_id,
		query: query
	});

	/**
	 * 获取货品详情
	 */

	export const getGoodInfo = (export_goods_id) => fetch('GET', '/clearance/getGoodInfo?export_goods_id='+ export_goods_id);

	/**
	 * 修改货品信息
	 */

	export const putGoodInfo = (export_goods_id,query) => fetch( 'PUT', '/clearance/changeGood', {
		export_goods_id: export_goods_id,
		query: query
	});


	/**
	 * 获取短信验证码
	 */

	export const mobileCode = phone => fetch('POST', '/v4/mobile/verify_code/send', {
		mobile: phone,
		scene: 'login',
		type: 'sms'
	});

	/**
	 * 下订单
	 */

	export const placeOrders = (user_id, cart_id, address_id, description, entities, geohash, sig) => fetch('POST', '/v1/users/' + user_id + '/carts/' + cart_id + '/orders', {
		address_id,
		come_from: "mobile_web",
		deliver_time: "",
		description,
		entities,
		geohash,
		paymethod_id: 1,
		sig,
	});

	/**
	 * 下订单
	 */

	export const validateOrders = ({
		user_id,
		cart_id,
		address_id,
		description,
		entities,
		geohash,
		sig,
		validation_code,
		validation_token
	}) => fetch('POST', '/v1/users/' + user_id + '/carts/' + cart_id + '/orders', {
		address_id,
		come_from: "mobile_web",
		deliver_time: "",
		description,
		entities,
		geohash,
		paymethod_id: 1,
		sig,
		validation_code,
		validation_token,
	});

