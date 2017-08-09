import {
	RECORD_USERINFO,
	GET_USERINFO,
	OUT_LOGIN
} from './mutation-types.js'

export default {
	// 记录用户信息
	[RECORD_USERINFO](state, info) {
		state.userInfo = info;
		state.login = true;
	},
	//获取用户信息存入vuex
	[GET_USERINFO](state, info) {
		if (state.userInfo && (state.userInfo.user_name !== info.user_name)) {
			return;
		};
		if (!state.login) {
			return
		}
		if (info) {
			state.userInfo = {...info};
		} else {
			state.userInfo = null;
		}
	},
	//退出登录
	[OUT_LOGIN](state) {
		state.userInfo = null;
		state.login = false;
	},

}
