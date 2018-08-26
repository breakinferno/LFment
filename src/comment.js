// import { autorun, observable } from 'mobx'
import defaultTheme from './theme/default'
import {checktype} from '../uitls';

const DEFAULT_OPTIONS = {
    theme: defaultTheme,    // 默认主题
    pageCount: 20,          // 每页评论条数
    maxCommentHeight: 250,  // 每条评论高度
    maxCommentLength: 200,  // 每条评论字数
    loginUrl: '',           // 自己登录界面授权接口的url，默认登录到我们评论服务接口，用户可配置为自己的接口
    registUrl: '',          // 自己注册界面授权接口的url
    pageUrl: '',            // 定位到自己的界面url配置
    reportText: '',         // 举报文案
    loadingText: '',        // 加载文案
    errorText: '',          // 失败文案
}

class Comment {


    constructor(options = {}) {
        this.setting = {
            ...DEFAULT_OPTIONS,
            ...options
        };
        this.init();
    }

    init() {
        const {theme, pageCount} = this.setting;
        this.setTheme(theme);

        // 设置监听数据
        this.state = observable({
            user,
            error: null,
            comments: null,
            currentPage: 1
        })
    }


    /**
     * 对调用方app进行签名
     * @param {string} info 自定义字符串
     */
    registApp(info) {

    }

    __shortcut(App, param) {
        checktype(param, 'undefined | null') && 
    }

    initApp(AppId, AppKey, AppSecret) {
        
        const initState = {
            AppId: '',
            AppKey: '',
            AppSecret: ''
        };

        this.app = {
            ...initState,
            checktype(AppId, "string") ? AppId : ...AppId,
            checktype(AppId, "string") ? AppKey : ...AppKey,
            checktype(AppId, "string") ? AppSecret : ...AppSecret,

        }
        return this;
    }
    
    initArticle(App, article) {
        this.__shortcut(App, article);
    }

    login(App, user) {

    }

    register(App, user) {

    }

    sendComment(App, comment) {

    }

    deleteComment(App, commentId) {

    }

    getComent(App, commentId) {

    }

    getComments(App, articleId, page) {

    }

    getCommentsAboutMe(App, userId, page) {

    }

    like(App, commentId) {

    }

}