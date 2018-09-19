## 第三方评论系统sdk API

#### 0. 通用以及注意事项

**App为通用部分**

**App组成部分如下：**

```javascript
{
    "AppKey": "",         // 应用Key
    "AppSecret": "",      // 应用secret
}
```

#### 0. 初始化

使用App对象来初始化

**`LFment.init(App)`**

#### 1. 发送评论

**`LFment.sendComment(Comment)`**

**Comment组成部分：**

```javascript
{
    "targetId": "",        // 目标ID        // 必须
    "userId": "",          // 必须     
    "content": "测试",      // 内容          // 必须
    "time": "1233223323",   // 发送时间      // 必须
    "extra"：             // 自定义信息 对照数据表结构
}
```

**注意**：匿名游客发送评论需要进行校验码校验。防止机器人。(额第三方应用自己做吧)

#### 2. 删除评论

**`LFment.deleteComment(commentId)`**

删除某个用户的所有评论

**`LFment.deleteUserComments(userId)`**

**PS**: 权限管理交由App处理

#### 3. 获取评论

获取单个评论

**`LFment.getCommentById(commentId)`**

获取目标评论

**`LFment.getCommentsByTarget(targetId, options)`**

没有options默认返回所有目标的评论

Options属性：

```javascript
{
    "count":    // 数目限制
    "group":    // 是否是按组获取。按组获取意味着返回的数据是将一个评论以及其相关评论一起返回
    "sort":     // 排序（可按照时间排序，也可按照热度排序）
}
```

获取用户评论

**`LFment.getCommentsByUser(userId, options)`**

Options属性：

```javascript
{
    "count":    // 数目限制
    "sort":     // 排序（可按照时间排序，也可按照热度排序）
}
```

#### 4. 设置extra部分的模型（范式）

用于自定义自己应用的额外属性的模式，类似于Mongoose的Schema

定义的常见行为同schema定义一样

**`LFment.defineExtra(schema)`**

默认模式：

```javascript
{
    "user": {
        "avatar": String
        "nickname": String
        "email": String
        "ip": String
    },
    "like": Number
    "unlike": Number
    "anouymous": {
        "type": Boolean,
        "default": true
    },
    "reported": Boolean            // 是否被举报  true已经被举报
    "reply": [ObjectId]               // 对于本评论的回复
}
```

`e.g:`
```javascript
const schema = {
    like: Number,
    unlike: Number
}
LFment.setExtraSchema(schema)
```

#### 5. 更改额外属性

**`LFment.setExtra(propName, value)`**

支持逐层往下查找，找到同名属性立即设置并且返回