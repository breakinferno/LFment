'use strict'

const cnst = import('../constant');
const utils = import('../uitls')
class LFment {
    constructor(Appkey, AppSecret) {
        this.App = {};
        this.init(Appkey, AppSecret);
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
    }

    sendComment(comment) {

    }

    deleteComment(commentId) {

    }

    deleteUserComments(userId) {

    }

    getCommentById(commentId) {

    }

    getCommentByTarget(targetId, options) {
        
    }
}