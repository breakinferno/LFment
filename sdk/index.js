'use strict'

import cnst from '../constant';
import utils from '../uitls';
import * as service from './service';
import univerlify from 'universalify';

// fake shema constructor
function ObjectId() {}

function Mixed() {}

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
            return;
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

    sendComment(comment) {
        let lackPropName;
        const requestPropName = ['targetId', 'userId', 'content', 'time'];
        let isStandar = requestPropName.every(propName => {
            if (propName in comment) {
                return true;
            }
            lackPropName = propName;
            return false;
        })
        if (!isStandar) {
            throw new Error(`评论数据格式不正确，缺少参数${lackPropName}`)
        }
        return universalify.fromPromise(service.sendComment(data));
    }

    deleteCommentById(commentId) {
        return univerlify.fromPromise(service.deleteComment(commentId))
    }

    deleteUserComments(userId) {
        return univerlify.fromPromise(service.deleteUserComments(userId));
    }

    getCommentById(commentId) {
        return univerlify.fromPromise(service.getCommentById(commentId));
    }

    getCommentByTarget(targetId, options) {
        if (utils.checkType(options, 'object')) {
            let valideProps = ['count', 'group', 'sort'];
            options = valideProps.reduce((obj, prop) => {
                obj[prop] = options[prop];
                return obj;
            }, {});
        }
        return univerlify.fromPromise(service.getCommentByTarget(targetId, options));
    }

    getCommentByUser(userId, options) {
        if (utils.checkType(options, 'object')) {
            let valideProps = ['count', 'group', 'sort'];
            options = valideProps.reduce((obj, prop) => {
                obj[prop] = options[prop];
                return obj;
            }, {});
        }
        return univerlify.fromPromise(service.getCommentByTarget(userId, options));
    }

    /**
     * 检查模式对象
     * @param {object} schma 模式对象
     */
    __checkSchma(schma) {
        const types = ['Boolean', 'String', 'Number', 'ObjectId', 'Mixed'];
        function recurse(target) {
            for( let prop in target) {
                if (target.hasOwnProperty(prop)) {
                    switch(utils.getType(target[prop])) {
                        case 'funtcion':
                        if (!types.includes(target[prop].name)) {
                            throw new Error('Schema 类别错误， 不存在%s此类型的数据', target[prop].name)
                        }
                        break;
                        case 'object':
                        if (target[prop].type) {
                            if (utils.checkType(target[prop].type, 'function')) {
                                if (!types.includes(target[prop].type.name)) {
                                    throw new Error('Schema 类别错误， 不存在%s此类型的数据', target[prop].type.name)
                                }
                                continue;
                            } else if (utils.checkType(target[prop].type, 'object')) {
                                recurse(target[prop].type)
                            } else {
                                throw new Error('Schema对象的属性必须是函数或者对象')
                            }
                        } else {
                            recurse(target[prop]);
                        }
                        break;
                        default:
                            throw new Error('Schema对象的属性必须是函数或者对象')
                    }
                }
            }
        }

        recurse(schma);
        return this;
    }

    defineExtraSchema(schma) {
        this.__checkSchma(schma);
        return univerlify.fromPromise(service.defineExtraSchema(schma)); 
    }

    setExtra(propName,value) {
        let data;
        if (typeof value !== 'undefined') {
            data = {
                [propName]: value
            }
        } else {
            data = propName;
        }
        return univerlify.fromPromise(service.setExtra(data));
    }
}