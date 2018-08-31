const axios = require('axios');
const constant =  require('./constant');
const {logger, genSignature, encryptData} = require('./utils');
// import config from './config';
const uuid = require('node-uuid').v4

const baseConfig ={
    // `url` 是用于请求的服务器 URL
    url: '/',
    // `method` 是创建请求时使用的方法
    method: 'get', // 默认是 get
    // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
    // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
    baseURL: constant.SERVER_URL,
    // `transformRequest` 允许在向服务器发送前，修改请求数据
    // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
    // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
    // transformRequest: [function (data) {
    //     // 对 data 进行任意转换处理
    //     return data;
    // }],
    // // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
    // transformResponse: [function (data) {
    //     // 对 data 进行任意转换处理
    //     return data;
    // }],
    // `headers` 是即将被发送的自定义请求头
    headers: {'X-Requested-With': 'XMLHttpRequest', 'X-Requested-ID': uuid()},
    // `params` 是即将与请求一起发送的 URL 参数
    // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
    params: {},
    // `paramsSerializer` 是一个负责 `params` 序列化的函数
    // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
    // paramsSerializer: function(params) {
    //     // return Qs.stringify(params, {arrayFormat: 'brackets'})
    // },
    // `data` 是作为请求主体被发送的数据
    // 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
    // 在没有设置 `transformRequest` 时，必须是以下类型之一：
    // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
    // - 浏览器专属：FormData, File, Blob
    // - Node 专属： Stream
    data: {
        // firstName: 'Fred'
    },
    // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
    // 如果请求话费了超过 `timeout` 的时间，请求将被中断
    timeout: 4000,
    // `withCredentials` 表示跨域请求时是否需要使用凭证
    withCredentials: false, // 默认的
    // `adapter` 允许自定义处理请求，以使测试更轻松
    // 返回一个 promise 并应用一个有效的响应 (查阅 [response docs](#response-api)).
    // adapter: function (config) {
    //     /* ... */
    // },
    // `auth` 表示应该使用 HTTP 基础验证，并提供凭据
    // 这将设置一个 `Authorization` 头，覆写掉现有的任意使用 `headers` 设置的自定义 `Authorization`头
    // base64编码。。。。atob可以解码
    auth: {
        username: 'luffy',
        password: 'orz'
    },
    // `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
    responseType: 'json', // 默认的
    // `xsrfCookieName` 是用作 xsrf token 的值的cookie的名称
    xsrfCookieName: 'XSRF-TOKEN', // default
    // `xsrfHeaderName` 是承载 xsrf token 的值的 HTTP 头的名称
    xsrfHeaderName: 'X-XSRF-TOKEN', // 默认的
    // `onUploadProgress` 允许为上传处理进度事件
    // onUploadProgress: function (progressEvent) {
    //     // 对原生进度事件的处理
    // },
    // // `onDownloadProgress` 允许为下载处理进度事件
    // onDownloadProgress: function (progressEvent) {
    //     // 对原生进度事件的处理
    // },
    // `maxContentLength` 定义允许的响应内容的最大尺寸
    maxContentLength: 2000,
    // `validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
    // validateStatus: function (status) {
    //     return status >= 200 && status < 300; // 默认的
    // },
    // `maxRedirects` 定义在 node.js 中 follow 的最大重定向数目
    // 如果设置为0，将不会 follow 任何重定向
    maxRedirects: 5, // 默认的
    // `httpAgent` 和 `httpsAgent` 分别在 node.js 中用于定义在执行 http 和 https 时使用的自定义代理。允许像这样配置选项：
    // `keepAlive` 默认没有启用

    // httpAgent: new http.Agent({ keepAlive: true }),
    // httpsAgent: new https.Agent({ keepAlive: true }),

    // 'proxy' 定义代理服务器的主机名称和端口
    // `auth` 表示 HTTP 基础验证应当用于连接代理，并提供凭据
    // 这将会设置一个 `Proxy-Authorization` 头，覆写掉已有的通过使用 `header` 设置的自定义 `Proxy-Authorization` 头。
    // proxy: {
    //     host: '127.0.0.1',
    //     port: 8800,
    //     // auth: : {
    //     //     username: 'mikeymike',
    //     //     password: 'rapunz3l'
    //     // }
    // },
    // `cancelToken` 指定用于取消请求的 cancel token
    // （查看后面的 Cancellation 这节了解更多）
    // cancelToken: new CancelToken(function (cancel) {
    // })
};

// 结果处理
const handleResult = (response) => {
    const {status, statustText, config, data, request, headers} = response;
    if ( +status === 200 ){ //请求成功
        let length = Object.keys(data).length;
        if( length ) {
            let {code, msg} = data;
            if (+code === 200) {
                logger('service face success!');
                return Promise.resolve(data);
            } else {
                logger('sever return data as: ');
                logger(data);
                return Promise.reject(data);
            }
        } else {
            logger('service face success, but no data!');
            return Promise.reject(new Error('接入服务成功， 但无法连接服务'));
        }
    } else {
        logger('service face failed!');
        logger(response);
        return Promise.reject(new Error(response));
    }
}

// 错误处理
const handleErr = (error) => {
    logger('service get request throw error:');
    logger(error);
    const {config, message, request, response} = error;
    const {auth, data, url, method} = config;
    // logger(`service get request throw error: ${typeof error === 'object' ? JSON.stringify(error) : error}. header: ${JSON.stringify(response.headers)} ; query : ${JSON.stringify(query)}`);
    return Promise.reject({auth, data, url, method, message});
}



/**
 * 一步操作封装
 */
// 异步处理
const asyncDima = (promise) => {
    return promise
        .then(data => {
            return [null, data];
        })
        .catch(err => [err]);
}

// dima增加一层处理层
const asyncTask = async (asyncFunc, resulter, catcher) => {
    const [err, res] = await asyncDima(asyncFunc);
    let rt;
    if (err) {
        typeof catcher === 'function' ? rt = catcher(err) : rt = Promise.reject(err);
    } else {
        typeof resulter === 'function' ? rt = resulter(res) : rt = Promise.resolve(res);
    }
    return await asyncDima(rt);
}
/** 封装结束 */

/**
 * 数据处理，对每个value进行加密,对原文进行签名
 */
const dataHandler = (data) => {
    const nData = Object.keys(data).reduce((d, key) => {
        d[key] = encryptData(data[key]);
        return d;
    }, {});
    nData['signature'] = genSignature({
        ...data,
        appkey: this.auth.AppKey,
        version: '1.0',
        format: 'json'
    }, service.auth.AppSecret); 
    return nData; 
}

// 玩的是个蛇皮，改成类吧以后
class Service {

    constructor() {
        this.auth = {
            username: 'luffy',
            password: 'orz'
        };
    }
    __setAuth (auth) {
        baseConfig.auth = {
            username: auth.AppKey,
            password: auth.AppSecret
        }
    }

    __test() {
        const config = {
            url: 'https://api.coindesk.com/v1/bpi/currentprice.json',
            method: 'get'
        };
        return asyncTask(this.sendRequest(config), handleResult, handleErr);
    }

    /**
     * 请求的统一处理
     * @param {object} config 请求的参数
     */
    sendRequest(config) {
        let options = {
            ...baseConfig,
            ...config
        };
        let {method, data, params} = options;
        switch(method) {
            case 'get':           
                options.params = dataHandler(params);
            break;
            case 'post':
                options.data = dataHandler(data);
            break;
            case 'put':
                options.data = dataHandler(data);
            break;
            case 'delete':
                options.params = dataHandler(params);
            break;
            case 'patch':
                options.data = dataHandler(data);
            break;
            default:
                Promise.reject("请求方法不正确");
        }
        return axios(options)
    }

    sendComment(data) {
        // axios.post(constant.ADD_COMMENT_URL, data);
        const config = {
            url: constant.ADD_COMMENT_URL,
            method: 'post',
            data
        };
        // return this.sendRequest(config).then(handleResult).catch(handleErr);
        return asyncTask(this.sendRequest(config), handleResult, handleErr);
    }

    deleteCommentById(commentId){
        const config = {
            url: `${constant.DELETE_COMMENT_URL}/${commentId}`
        };
        return asyncTask(this.sendRequest(config), handleResult, handleErr);
    }

    getCommentById(commentId) {
        const config = {
            url: `${constant.GET_COMMENTS_URL}/${commentId}`,
        };
        return asyncTask(this.sendRequest(config), handleResult, handleErr);
    }

    deleteUserComments(userId) {
        const config = {
            url: constant.DELETE_COMMENT_URL,
            method: 'delete',
            params: {
                userId
            }
        }
        return asyncTask(this.sendRequest(config), handleResult, handleErr);
    }

    getCommentByTarget(targetId, options) {
        const config = {
            url: constant.GET_COMMENTS_URL,
            params: {
                targetId,
                ...options
            }
        }
        return asyncTask(this.sendRequest(config), handleResult, handleErr);
    }

    getCommentByUser(userId, options) {
        const config = {
            url: constant.GET_COMMENTS_URL,
            params: {
                userId,
                ...options
            }
        }
        return asyncTask(this.sendRequest(config), handleResult, handleErr);
    }

    defineExtraSchema(data) {
        const config = {
            url: constant.DEFINE_EXTRA_SCHEMA,
            method: 'post',
            data
        };
        return asyncTask(this.sendRequest(config), handleResult, handleErr);
    }

    setExtra(data) {
        const config = {
            url: constant.UPDATE_EXTRA,
            method: 'patch',
            data
        };
        return asyncTask(this.sendRequest(config), handleResult, handleErr);   
    }
}

module.exports = Service

