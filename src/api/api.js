import request from '../common/js/request';

/**********************************************************************/
// 用户登录
export const requestLogin = (name, pwd) => {
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
    return request('system.admin.bidUser', 'post', {
        'search[keyword]': keyword
    });
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