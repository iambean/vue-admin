import request from '../common/js/request';

/**********************************************************************/
// 用户登录
export const requestLogin = (name, pwd) => {
    return Promise.resolve({
        "success": 1,
        "data": {
            "u_id": 192,
            "ver": 0,
            "status": 1,
            "auth_key": "FxLmphiGk-amFbeizvyBAZnZ4c2AR7YX",
            "u_code": null,
            "u_name": "liujie@evergrande.cn",
            "u_name_py": "l",
            "u_realname": "刘劼",
            "u_phone": "13925092817",
            "u_telphone": "",
            "duty": null,
            "sex": 2,
            "birthday": "",
            "depart_id": 6,
            "depart_name_py": "hulianwangbu",
            "depart_name": "互联网部",
            "r_role": 2,
            "sort": 9999,
            "u_prive": null,
            "createperson": 0,
            "createtime": "0000-00-00 00:00:00",
            "is_join": 1,
            "login_count": 72,
            "create_user": null,
            "update_time": 1473322884,
            "create_time": 0,
            "mail_tip": 1,
            "update_tip": 0,
            "update_time_txt": "2016-09-08 16:21",
            "create_time_txt": "1970-01-01 08:00",
            "u_name_simple": "liujie"
        },
        "msg": "操作成功",
        "serial": false,
        "debug": "57d11f82f1891"
    });
    return request('system.user.login', 'post', {
        'params[u_name]': name,
        'params[u_password]': pwd
    });
    // return axios.post(`${base}/login`, params).then(res => res.data);
};

/**********************************************************************/
// 获取配置列表
export const getConfigList = (keyword = '', page = 1, pageSize = 20) => {
    // return axios.get(`${base}/user/listpage`, { params: params });
    return request('system.admin.config', 'post', {
        'search[keyword]': keyword,
        'page[pageSize]': +pageSize,
        'page[currPage]': +page
    });
};

// 编辑（新增）配置项
export const setConfig = params => {
    return request('system.admin.saveConfig', 'post', {
        id: params.id || 0,
        config_key: params.key,
        config_val: params.value,
        des: params.desc
    });
}

/**********************************************************************/
// 电子审批列表
export const getApprovalList = (keyword = '', page = 1, pageSize = 20) => {
    return request('system.admin.approval', 'post', {
        'search[keyword]': keyword,
        'page[pageSize]': +pageSize,
        'page[currPage]': +page
    })
}

// 电子审批签章重新合成
export const reComposeApproval = code => {
    return request('system.admin.batCompose', 'post', {
        'codes': code
    })
}

// 电子审批签章重置
export const resetApprovalSignature = appId => {
    return request('system.admin.setApprSign', 'post', {
        'app_id': appId
    })
}

/**********************************************************************/
//招投标-->发包列表
export const getContractAwardList = (keyword = '', page = 1, pageSize = 20) => {
    return request('system.admin.bid', 'post', {
        'search[keyword]': keyword,
        'page[pageSize]': +pageSize,
        'page[currPage]': +page
    })
}
// 招投标-->修改（新增）发包
export const setContractAward = params => {
    return request('system.admin.saveBidCompany', 'post', params);
}

//招投标-->联系人列表
export const getTenderList = number => {
    return request('system.admin.bidOutuser', 'post', {
        'p_number': number
    });
}

//招投标-->修改（新增）联系人
export const setTender = params => {
    return request('system.admin.saveBidOutuser', 'post', params);
}

//招投标--> 设置权限的人员列表
export const getBidUserList = keyword => {
    return Promise.resolve({"list":[{"u_id":"726","u_realname":"xiaowen","r_role":"5","r_role_txt":"高层领导","titles":["访问权限","短信通知","消息审批","白名单","投标单位审批"],"bid_permission":[{"id":"1","name":"工程采购类","items":[0,0,0,0,0]},{"id":"2","name":"材料采购类","items":[0,0,0,0,0]},{"id":"3","name":"日常采购类","items":[0,0,0,0,0]},{"id":"4","name":"营销采购类","items":[0,0,0,0,0]},{"id":"5","name":"物业招标类","items":[0,0,0,0,0]},{"id":"6","name":"测试专用","items":[0,0,0,0,0]}]},{"u_id":"723","u_realname":"毛兵兵","r_role":"5","r_role_txt":"高层领导","titles":["访问权限","短信通知","消息审批","白名单","投标单位审批"],"bid_permission":[{"id":"1","name":"工程采购类","items":[0,0,0,0,0]},{"id":"2","name":"材料采购类","items":[0,0,0,0,0]},{"id":"3","name":"日常采购类","items":[0,0,0,0,0]},{"id":"4","name":"营销采购类","items":[0,0,0,0,0]},{"id":"5","name":"物业招标类","items":[0,0,0,0,0]},{"id":"6","name":"测试专用","items":[0,0,0,0,0]}]},{"u_id":"699","u_realname":"t60","r_role":"5","r_role_txt":"高层领导","titles":["访问权限","短信通知","消息审批","白名单","投标单位审批"],"bid_permission":[{"id":"1","name":"工程采购类","items":[1,0,0,0,0]},{"id":"2","name":"材料采购类","items":[1,0,0,0,0]},{"id":"3","name":"日常采购类","items":[1,0,0,0,0]},{"id":"4","name":"营销采购类","items":[1,0,0,0,0]},{"id":"5","name":"物业招标类","items":[1,0,0,0,0]},{"id":"6","name":"测试专用","items":[0,0,0,0,0]}]},{"u_id":"686","u_realname":"test003","r_role":"2","r_role_txt":"招标管理人员","titles":["访问权限","短信通知","消息审批","白名单","投标单位审批"],"bid_permission":[{"id":"1","name":"工程采购类","items":[0,0,0,0,0]},{"id":"2","name":"材料采购类","items":[0,0,0,0,0]},{"id":"3","name":"日常采购类","items":[0,0,0,0,0]},{"id":"4","name":"营销采购类","items":[0,0,0,0,0]},{"id":"5","name":"物业招标类","items":[0,0,0,0,0]},{"id":"6","name":"测试专用","items":[0,0,0,0,0]}]},{"u_id":"685","u_realname":"test002","r_role":"2","r_role_txt":"招标管理人员","titles":["访问权限","短信通知","消息审批","白名单","投标单位审批"],"bid_permission":[{"id":"1","name":"工程采购类","items":[0,0,0,0,0]},{"id":"2","name":"材料采购类","items":[0,0,0,0,0]},{"id":"3","name":"日常采购类","items":[0,0,0,0,0]},{"id":"4","name":"营销采购类","items":[0,0,0,0,0]},{"id":"5","name":"物业招标类","items":[0,0,0,0,0]},{"id":"6","name":"测试专用","items":[0,0,0,0,0]}]},{"u_id":"684","u_realname":"test001","r_role":"2","r_role_txt":"招标管理人员","titles":["访问权限","短信通知","消息审批","白名单","投标单位审批"],"bid_permission":[{"id":"1","name":"工程采购类","items":[0,0,0,0,0]},{"id":"2","name":"材料采购类","items":[0,0,0,0,0]},{"id":"3","name":"日常采购类","items":[0,0,0,0,0]},{"id":"4","name":"营销采购类","items":[0,0,0,0,0]},{"id":"5","name":"物业招标类","items":[0,0,0,0,0]},{"id":"6","name":"测试专用","items":[0,0,0,0,0]}]},{"u_id":"661","u_realname":"刘婧1","r_role":"2","r_role_txt":"招标管理人员","titles":["访问权限","短信通知","消息审批","白名单","投标单位审批"],"bid_permission":[{"id":"1","name":"工程采购类","items":[1,0,0,0,0]},{"id":"2","name":"材料采购类","items":[0,0,0,0,0]},{"id":"3","name":"日常采购类","items":[0,0,0,0,0]},{"id":"4","name":"营销采购类","items":[0,0,0,0,0]},{"id":"5","name":"物业招标类","items":[0,0,0,0,0]},{"id":"6","name":"测试专用","items":[0,0,0,0,0]}]},{"u_id":"656","u_realname":"宋雅","r_role":"3","r_role_txt":"投标单位资格审查人员","titles":["访问权限","短信通知","消息审批","白名单","投标单位审批"],"bid_permission":[{"id":"1","name":"工程采购类","items":[1,0,0,0,0]},{"id":"2","name":"材料采购类","items":[1,0,0,0,0]},{"id":"3","name":"日常采购类","items":[1,0,0,0,0]},{"id":"4","name":"营销采购类","items":[1,0,0,0,0]},{"id":"5","name":"物业招标类","items":[1,0,0,0,0]},{"id":"6","name":"测试专用","items":[0,0,0,0,0]}]},{"u_id":"643","u_realname":"吴学荣","r_role":"2","r_role_txt":"招标管理人员","titles":["访问权限","短信通知","消息审批","白名单","投标单位审批"],"bid_permission":[{"id":"1","name":"工程采购类","items":[0,0,0,0,0]},{"id":"2","name":"材料采购类","items":[0,0,0,0,0]},{"id":"3","name":"日常采购类","items":[0,0,0,0,0]},{"id":"4","name":"营销采购类","items":[0,0,0,0,0]},{"id":"5","name":"物业招标类","items":[0,0,0,0,0]},{"id":"6","name":"测试专用","items":[0,0,0,0,0]}]},{"u_id":"639","u_realname":"谢世建","r_role":"2","r_role_txt":"招标管理人员","titles":["访问权限","短信通知","消息审批","白名单","投标单位审批"],"bid_permission":[{"id":"1","name":"工程采购类","items":[0,0,0,0,0]},{"id":"2","name":"材料采购类","items":[0,0,0,0,0]},{"id":"3","name":"日常采购类","items":[0,0,0,0,0]},{"id":"4","name":"营销采购类","items":[0,0,0,0,0]},{"id":"5","name":"物业招标类","items":[0,0,0,0,0]},{"id":"6","name":"测试专用","items":[0,0,0,0,0]}]}],"page":{"total":"70","pageSize":10,"currPage":1}});
    // return request('system.admin.bidUser', 'post', {
    //     'search[keyword]': keyword
    // });
}

// //招投标-->修改（新增）联系人
// export const setTender = params => {
//     return request('system.admin.saveBidOutuser', 'post', params);
// }
//
// //招投标-->修改（新增）联系人
// export const setTender = params => {
//     return request('system.admin.saveBidOutuser', 'post', params);
// }