
<!-- # 初始化配置

```javascript
DEFAULT_OPTIONS = {
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
``` -->


# 数据库设计

注意：每一个app都有对应的database,这样是便于管理不同应用的数据，并且能够对不同应用的数据进行区分。如果某个应用已经确定不会使用本服务了，可以很快的drop该数据库。数据库名字和AppId有关。

每个数据库存在3个表(考虑user和article合并成一个表)

1. user表： 记录用户基本信息

```javascript
{
    "userId": "23232323232",
    "nickname": "fffff",
    "password": "1232",
    "avatar": "",
    "sex": "male"
    "age": 22,
    "locatoin": "四川成都",
    "email": "2232@qq.com",
    "phone": "183223283232",
    "des": "infomation",
    "app": ""
}
```

2. article表： 记录文章等应用评论的目标对象和评论之间的关系

表结构如下：
```javascript
{
//   "code": 0,        // 状态码
  "masterId": '站长id',     // 站长
  "articleId": "1",// 文章
  "title": "测试", // 简单的回传该文章信息
  "like": 233,     // 赞
  "unlike": 23,    // 踩
  "count": 20,        // 评论数目
  "data": [ObjectId]   // 评论信息
}

```
3. 评论表： 评论信息

```javascript
{
    "articleId": "",
    // "code": 0,
    "commentId": 232,
    "isRoot": true,     // 是否是根级评论
    // "app": "",  // 由于app作为数据库名了所以这里去掉。 //评论产生的网站
    "data": {
        // "parentName": "",   // 上级算了，通过查询获取吧，不存了
        "report": 0,     // 是否被举报
        "content": "一级测试",
        "time": "1233223323",
        "anonymous": false,
        "ip": "127.0.0.1",
        "email": "ceshi@qq.com",
        "avatar": "url",
        "nickname": "breakinferno",
        "like": 3,
        "unlike": 3,
        "reply": [ObjectId] // 下一级评论ID
    }
}
```

# 流程设计

![登录及权限](https://github.com/breakinferno/LFment/blob/master/section1.png)

![流程及接口](https://github.com/breakinferno/LFment/blob/master/section2.png)

# API

## 评论接口

#### 0. 通用以及注意事项

App为通用部分

**App组成部分如下：**

```javascript
{
    "AppId":"",           // 应用ID
    "AppKey": "",         // 应用Key
    "AppSecret": "",      // 应用secret
}
```

**注意**：token头为：`__lfment__access-token`,保存用户基本信息。

#### 1. 初始化评论

新建一个文章都需要该操作，用于绑定评论和文章的关系.

**`LFment.initArticle(App, article)`**

article对象可选字段如下：

```javascript
{
    "articleId": "" // 文章ID 必须
    "master": "",   // 站长Id
    "title": "",
    "createdTime": ""，
    "title": ""
}
```

#### 2. 登录

**`LFment.login(App, user)`**

user对象字段：

```javascript
{
    "nickname": "fffff",
    "password": "1232",
}
```

#### 3. 注册

**`LFment.register(App, user)`**

user对象字段：

```javascript
{
    "nickname": "fffff", // 必须
    "password": "1232",  // 必须
    "avatar": "",   
    "sex": "male"
    "age": 22,
    "locatoin": "四川成都",
    "email": "2232@qq.com",
    "phone": "183223283232",
    "des": "infomation",
}
```

#### 4. 发送评论

**`LFment.sendComment(App, Comment)`**

**Comment组成部分：**

```javascript
{
    "articleId": "",        // 文章ID                       // 必须
    "replyTo": "32223",     // 回复的目标评论ID,空为null
    "content": "测试",      // 内容                         // 必须
    "time": "1233223323",   // 发送时间                     // 必须
    "anonymous": false,     // 是否匿名                     // 必须
    "ip": "127.0.0.1",      // IP
    "email": "ceshi@qq.com",// 邮箱
    "avatar": "url",        // 头像
    "nickname": "xianyu",   // 昵称
}
```

**注意**：匿名游客发送评论需要进行校验码校验。防止机器人。

#### 5. 删除评论

**`LFment.deleteComment(App, commentId)`**

**PS**:只有站主有这权限,因为会校验token

#### 6. 获取评论

获取单个评论

**`LFment.getComment(App, commentId)`**

获取文章评论

**`LFment.getComments(App, articleId, page)`**

获取与我有关评论

**`LFment.getCommentsAboutMe(App, userId, page)`**

#### 7. 点赞

点赞评论： **`LFment.like(App, commentId)`**

点赞文章： **`LFment.Like(App, articleId)`**

#### 8. 踩

踩评论： **`LFment.unLike(App, commentId)`**

踩文章： **`LFment.UnLike(App, articleId)`**

#### 9. 举报

**`LFment.report(App, commentId)`**

#### 10. 屏蔽用户

屏蔽方式有昵称，邮箱，ip。可设置屏蔽时间。支持正则。

**`LFment.shield(App, target)`**

target字段：

```javascript
{
    "email": "",                // 根据邮箱
    "ip": "",                   // 根据ip
    "nickname": "",             // 根据昵称屏蔽
    "startTime": "",            // 屏蔽开始时间
    "endTime": "",              // 屏蔽结束时间
    "timeLength": ""            // 屏蔽时长， -1表示无限期
}
```

**PS**:只有站主有这权限,因为会校验token

#### 11. 邮件订阅

订阅邮件，分为三种情况，一种是文章变化邮件通知，一种是评论变化邮件通知， 一种是和自己有关的评论变化邮件通知

**`LFment.subscribe(App, options)`**

options字段：

```javascript
{
    "article": false,           // 文章变化通知（这里只能知道文章是否删除等消息，无法知道文章是否更改）
    "aboutMe": false,           // 关于自己评论变化通知
    "comments": false           // 评论变化通知
}
```

**PS** 只有登录用户有这权限

##  自定义样式



##  自定义功能接口

##  三方登录

待续


### 6. TODO

必须功能：

可选功能（可在配置文件中进行配置）：markdown, 验证码， 三方登录

#### 站主

- [ ] 删除任意评论
- [ ] 获取评论数
- [ ] 屏蔽ip或者特定用户

#### 所有用户

- [ ] 评论
- [ ] 回复
- [ ] 举报
- [ ] 订阅提醒(邮件)
- [ ] 赞/踩
- [ ] @人


#### 功能性

- [ ] markdown评论
- [ ] 评论数加载，赞数加载，踩数加载
- [ ] 支持图片，表情
- [ ] 评论缓存
- [ ] 分页
- [ ] 三方登录????
- [ ] 验证码，防止机器人