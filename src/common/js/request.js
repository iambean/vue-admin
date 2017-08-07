/**
 * 后台接口，只返回json，url里面接受一个service的command参数。
 * 如果是post，则其他参数以key-value的形式丢在body里面,格式为form-data。
 * @type {string}
 */

const BASE_URL = 'http://omsdev.egtest.cn/api.php';

// import axios from 'axios';
//
// //当前所有请求都是跨域的。
// axios.defaults.withCredentials = true;

export default function (command, method='get', params){
  method = method.toLowerCase();
  let url = '';
  let options = {
      method: method,
      mode: 'cors',
      redirect: 'follow',
      credentials: 'include'
  };

  //post请求的参数作为K-V形式以form-data提交，get的参数为search params。
  if(method === 'post'){
    url = BASE_URL + '?service=' + command;
    options.headers = {
      // 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      'Content-Type': 'multipart/form-data'
    };
    options.body = function(fd){
      Object.keys(params).forEach(key=>{
        fd.append(key, params[key]);
      });
      return fd;
    }(new FormData());

  } else {
    let paramsArray = [];
    params['service'] = command;
    Object.keys(params).forEach(key=>paramsArray.push(key + '=' + params[key]));
    url = BASE_URL + '?' + paramsArray.join('&');
  }

  // console.log("===");
  return window.fetch(url, options).then(resp=>{
    return resp.json();
  });

  // return axios
  //   .get(PREFIX, {
  //     params : {
  //       'service': command
  //     },
  //     //当前所有请求都是跨域的。
  //     withCredentials : true
  //   })
  //   .then(response=>{
  //     let jsonData = response.data;
  //     console.info(JSON.stringify(jsonData));
  //     if(response.status === 200){
  //
  //       if(jsonData.code === 0){
  //         console.log(jsonData.data);
  //         Promise.resolve(jsonData.data);
  //       }else{
  //         Promise.reject('HTTP状态错误', response);
  //       }
  //     }else{
  //       Promise.reject('HTTP状态错误', response);
  //     }
  //   })
};
