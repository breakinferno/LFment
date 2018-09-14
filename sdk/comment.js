'use strict'

const utils = require('./utils');
const Service = require('./service');
const service = new Service();

class LFment {
    constructor(Appkey, AppSecret) {
        this.App = {};
        this.config = {};
        this.init(Appkey, AppSecret);
        return this;
    }

    /**
     * 初始化
     * @param {string|object} AppKey appkey  
     * @param {string} AppSecret 秘钥
     */
    init(AppKey, AppSecret) {
        if (typeof AppSecret === 'string') {
            this.App = {
                AppKey,
                AppSecret
            }
        }

        if (utils.checkType(AppKey, 'Object')) {
            this.App = {
                ...this.App,
                ...AppKey
            }
        }
        service.__setAuth(this.App);
        return this;
    }
    /**
     * 加载配置项
     */
    loadConfig(config) {
        this.config = config;
        return this;
    }
    /**
     * 是否可以发送请求
     */
    __checkCanRequest() {
        if (typeof this.App === 'object') {
            return this.App.Appkey && this.App.AppSecret ? true : false;
        }
        return false;
    }

    __test() {
        return service.__test();
    }

    sendComment(comment) {
        let lackPropName;
        const requestPropName = ['targetId', 'userId', 'content', 'createdTime', 'updatedTime'];
        let isStandar = requestPropName.every(propName => {
            if (propName in comment) {
                return true;
            }
            lackPropName = propName;
            return false;
        })
        if (!isStandar) {
            return Promise.reject((`评论数据格式不正确，缺少参数${lackPropName}`))
        }
        return service.sendComment(comment);
    }

    deleteCommentById(commentId) {
        if (!commentId) {
            return Promise.reject('请传人相关参数')
        }
        return service.deleteComment(commentId)
    }

    deleteCommentsByUser(userId) {
        if (!userId) {
            return Promise.reject('请传人相关参数')
        }
        return service.deleteUserComments(userId);
    }

    deleteCommentsByTarget(targetId) {
        if (!targetId) {
            return Promise.reject('请传人相关参数')
        }
        return service.deleteTargetComments(targetId);
    }

    getCommentById(commentId) {
        if (!commentId) {
            return Promise.reject('请传人相关参数')
        }
        return service.getCommentById(commentId);
    }

    getCommentByTarget(targetId, options) {
        if (!targetId) {
            return Promise.reject('请传人相关参数')
        }
        if (utils.checkType(options, 'object')) {
            let valideProps = ['count', 'group', 'sort'];
            options = valideProps.reduce((obj, prop) => {
                obj[prop] = options[prop];
                return obj;
            }, {});
        }
        return service.getCommentByTarget(targetId, options);
    }

    getCommentByUser(userId, options) {
        if (!userId) {
            return Promise.reject('请传人相关参数')
        }
        if (utils.checkType(options, 'object')) {
            let valideProps = ['count', 'group', 'sort'];
            options = valideProps.reduce((obj, prop) => {
                obj[prop] = options[prop];
                return obj;
            }, {});
        }
        return service.getCommentByUser(userId, options);
    }

    setExtra(extra) {
        if (!extra) {
            return Promise.reject('请传人相关参数')
        }
        return service.setExtra(extra); 
    }

    updateExtra(propName,value) {
        if (!propName) {
            return Promise.reject('请传人相关参数')
        }
        let data;
        if (typeof value !== 'undefined') {
            data = {
                [propName]: value
            }
        } else {
            data = propName;
        }
        return service.updateExtra(data);
    }
}

module.exports = LFment