## express搭建权限管理系统

权限管理，是管理系统中的常见组件。通常需要定义资源，把资源调配给用户，通过判断用户是否有权限增删改查来实现。

### 初衷：

使用express开发过的项目大大小小加在一起也有二十多个了，之前做的各个项目都是独立存在的。最近领导建议说把这些小项目整合到一个大的平台上，给各部门开权限，让他们在一个平台上进行操作。这样做的好处，首先是便于项目管理，其次是节约开发成本。但好像目前使用nodejs做权限管理的资料并不多，这里特意分享出来，仅供参考。

一开始在node_acl、Connect Roles、rbac这几个框架中徘徊，最终选择的node_acl框架，但node_acl只帮你做了权限管理的一部分工作，只保存用户、角色、资源三者 之间的关联关系，用户、角色、资源本身并没有保存。而我们要做的就是把用户、角色、资源的增删改查补齐，就是一个完整的权限管理系统了。

### 预期效果：

超级管理员登录后，可以进行所有操作，可以看到所有菜单栏；
普通用户登录后只有部分权限，只能看到部分菜单栏或操作按钮。



### 主要模块：

- express：node框架
- express-hbs：模板引擎
- node_acl：权限管理系统的核心
- mongodb：数据库
- sails-mongodb：连接mongodb的引擎

### 前端：

Amaze ui、angular、Z-Tree



### 源码地址：https://github.com/wuwanyu/aclDemo



### 运行前提：

安装mongodb数据库

### 运行

##### 1. 数据准备

```
(1) 将源代码目录下sql文件夹的内容，拷贝到mongodb安装目录的bin目录下
(2) 命令行方式进入mongodb安装目录的bin目录下，运行 mongorestore -d acltest acltest.dmp/acltest，将数据导入acltest表
```

##### 2.安装依赖包：npm install

##### 3. 运行：npm start

##### 4.在浏览器输入： http://localhost:3000（用户名/密码：admin/admin   或    user/123）



### 部分截图

![image](https://github.com/wuwanyu/aclDemo/blob/master/screenshot/perManage.png)

![image](https://github.com/wuwanyu/aclDemo/blob/master/screenshot/roleManage.png)

![image](https://github.com/wuwanyu/aclDemo/blob/master/screenshot/userManage.png)

![image](https://github.com/wuwanyu/aclDemo/blob/master/screenshot/user.png)

### 接口文档

资源相关：
1.保存资源树
2.获取资源列表

角色相关：
1.添加角色
2.修改角色
3.查询角色列表
4.删除角色
4.查询角色详情（含角色的权限列表）

用户相关：
1.用户登录
2.用户退出
3.添加用户
4.修改用户
5.删除用户
6.获取用户列表
7.查询用户详情（含用户权限列表）
8.给用户添加角色
9.获取用户角色



#### 资源

1. 保存资源树（增加、修改、删除都是这个方法）

```
/api/acl_resource/addArray
参数：
{
  list：JSON.stringify(nodeList)
}
返回值：
{
  code:"200",
  msg:"创建成功！"
}
```

2.获取资源列表

```
/api/acl_resource/getList
参数：无
返回值：
{
  "code": "200",
  "msg": "获取详情成功",
  "result": [
    {
      "pId": "0",
      "name": "全部",
      "pinyin_name": "quanbu",
      "createdAt": "2017-05-26T09:49:03.139Z",
      "updatedAt": "2017-05-27T07:17:41.959Z",
      "id": "1"
    },
    {
      "pId": "1",
      "name": "首页",
      "pinyin_name": "shouye",
      "createdAt": "2017-05-26T09:49:03.141Z",
      "updatedAt": "2017-05-27T07:17:41.961Z",
      "id": "41cd1dce-66c9-4aca-91c2-9135fba291c3"
    },
    {
      "pId": "1",
      "name": "经适房",
      "pinyin_name": "jingshifang",
      "createdAt": "2017-05-26T09:49:03.142Z",
      "updatedAt": "2017-05-27T07:17:41.962Z",
      "id": "d2da6e56-f005-43cf-b109-af3a966fb059"
    },
    {
      "pId": "d2da6e56-f005-43cf-b109-af3a966fb059",
      "name": "经适房首页",
      "pinyin_name": "jingshifangshouye",
      "createdAt": "2017-05-26T09:49:03.142Z",
      "updatedAt": "2017-05-27T07:17:41.963Z",
      "id": "74a7970a-d53e-494b-9671-4b7b415c3469"
    },
    {
      "pId": "d2da6e56-f005-43cf-b109-af3a966fb059",
      "name": "经适房历史",
      "pinyin_name": "jingshifanglishi",
      "createdAt": "2017-05-26T09:49:03.143Z",
      "updatedAt": "2017-05-27T07:17:41.964Z",
      "id": "15862997-acef-43c1-a1c3-3af4b8e6588b"
    },
    {
      "pId": "1",
      "name": "对账单",
      "pinyin_name": "duizhangdan",
      "createdAt": "2017-05-26T09:51:48.411Z",
      "updatedAt": "2017-05-27T07:17:41.965Z",
      "id": "78aa4788-f42f-42b6-9db1-e8ff0ad5b5df"
    },
    {
      "pId": "78aa4788-f42f-42b6-9db1-e8ff0ad5b5df",
      "name": "对账单首页",
      "pinyin_name": "duizhangdanshouye",
      "createdAt": "2017-05-26T09:51:48.412Z",
      "updatedAt": "2017-05-27T07:17:41.966Z",
      "id": "c0f68fa4-81cd-4908-8005-97c88445d7b3"
    },
    {
      "pId": "78aa4788-f42f-42b6-9db1-e8ff0ad5b5df",
      "name": "对账单管理",
      "pinyin_name": "duizhangdanguanli",
      "createdAt": "2017-05-26T09:51:48.412Z",
      "updatedAt": "2017-05-27T07:17:41.966Z",
      "id": "5fe3e266-5a2a-47a4-b309-ee6f15db49ec"
    },
    {
      "pId": "1",
      "name": "系统管理",
      "pinyin_name": "xitongguanli",
      "createdAt": "2017-05-26T09:51:48.413Z",
      "updatedAt": "2017-05-27T07:17:41.966Z",
      "id": "fbe848c4-950e-402d-92c5-6fe067fd1bac"
    },
    {
      "pId": "fbe848c4-950e-402d-92c5-6fe067fd1bac",
      "name": "用户管理",
      "pinyin_name": "yonghuguanli",
      "createdAt": "2017-05-26T09:51:48.416Z",
      "updatedAt": "2017-05-27T07:17:41.967Z",
      "id": "1fd06306-6539-48e5-bf10-99ecd337e143"
    },
    {
      "pId": "fbe848c4-950e-402d-92c5-6fe067fd1bac",
      "name": "资源管理",
      "pinyin_name": "ziyuanguanli",
      "createdAt": "2017-05-26T09:51:48.416Z",
      "updatedAt": "2017-05-27T07:17:41.969Z",
      "id": "5de41a10-f31f-4eb2-91ba-25da102a25aa"
    },
    {
      "pId": "fbe848c4-950e-402d-92c5-6fe067fd1bac",
      "name": "角色管理",
      "pinyin_name": "jiaoseguanli",
      "createdAt": "2017-05-26T09:51:48.416Z",
      "updatedAt": "2017-05-27T07:17:41.970Z",
      "id": "9ffb5a8a-c304-403a-a724-f47cc73a9162"
    },
    {
      "pId": "1",
      "name": "new node1",
      "pinyin_name": "new node1",
      "createdAt": "2017-05-27T07:17:41.971Z",
      "updatedAt": "2017-05-27T07:17:41.971Z",
      "id": "d336dd69-80c7-492f-aee7-78a651b8305e"
    }
  ],
  "count": 13
}
            
```



角色

1. 查询角色列表

```
/api/acl_role/getList：获取角色列表
参数：无
返回值：
{
 "code": "200",
 "msg": "获取详情成功",
 "result": [
   {
     "name": "经适房用户",
     "createdAt": "2017-05-26T09:49:22.361Z",
     "updatedAt": "2017-05-26T09:49:22.361Z",
     "id": "27aab6d9-325c-4c88-be4a-5da516dc9613"
   },
   {
     "name": "对账单用户",
     "createdAt": "2017-05-26T09:52:15.061Z",
     "updatedAt": "2017-05-26T09:52:15.061Z",
     "id": "ba306957-9c80-4abb-89fd-17be828dd5f5"
   },
   {
     "name": "对账单管理员",
     "createdAt": "2017-05-26T09:52:26.914Z",
     "updatedAt": "2017-05-26T09:52:26.914Z",
     "id": "fc154424-2264-4de9-9a7c-1b1df048f802"
   },
   {
     "name": "超级管理员",
     "createdAt": "2017-05-26T09:52:39.894Z",
     "updatedAt": "2017-05-26T09:52:39.894Z",
     "id": "442cfc56-23a9-4cb9-85b5-641bc161c4c3"
   }
 ],
 "count": 4
}
```



2.修改角色

```
/api/acl_role/update
参数：
{
 id:xxx,
 name:xxx,
}
返回值：
{
code:"200",
msg:"修改成功！",
result:data.update
}
```



3.查询角色详情（含角色的权限列表）

```
/api/acl_role/getOne
参数：
id:27aab6d9-325c-4c88-be4a-5da516dc9613
返回值：
{
 "code": "200",
 "msg": "获取详情成功",
 "result": {
   "info": {
     "name": "经适房用户",
     "createdAt": "2017-05-26T09:49:22.361Z",
     "updatedAt": "2017-05-26T09:49:22.361Z",
     "id": "27aab6d9-325c-4c88-be4a-5da516dc9613"
   },
   "resources": {
     "1": ["*"],
     "74a7970a-d53e-494b-9671-4b7b415c3469":["*"],
     "15862997-acef-43c1-a1c3-3af4b8e6588b": ["*"],
     "d2da6e56-f005-43cf-b109-af3a966fb059": ["*"],
     "d336dd69-80c7-492f-aee7-78a651b8305e":["*"]
   }
 }
}
```



4.删除角色

```
/api/acl_role/delete
① db删除角色
② acl删除该角色和资源的关系removeAllow、删除角色removeRole
参数：
{
 id:xxx,
}
返回值：
{
code:"200",
msg:"删除成功！",
result:result
}
```



5.给角色添加资源

```
/api/acl_role/allow
① 删除角色和资源的关系acl.removeAllow
② 给角色和资源添加关系acl.allow
参数：
{
 role:xxx,
 resources:xxx
}
返回值：
{
code:"200",
msg:"成功！"
}
```

用户相关：

1.用户登录

```
/api/acl_user/login
参数：
{
 account:xxx,
 password:xxx
}
返回值：
{
code:200,
msg:"登录成功"
}
{
code:400,
msg:"密码错误"
}
{
code:400,
msg:"账号不存在"
}
```

1. 用户退出

```
/api/acl_user/logout
参数：{}
返回值：
{
code:200,
msg:"退出成功！"
}
```



3.添加用户

```
/api/acl_user/add
参数：
{
 name:xxx,
 account:xxx,
 password:xxx
}
返回值：
{
code:"200",
msg:"创建成功！",
result:data.save
}
```




4.修改用户

```
/api/acl_user/update
参数：
{
 id:xxx,
 name:xxx,
 account:xxx,
 password:xxx
}
返回值：
{
code:"200",
msg:"修改成功！",
result:data.save
}
```

5.查询用户详情（含用户权限列表）

```
/api/acl_user/getOne
① db获取用户信息
② acl获取用户权限allowedPermissions
参数：
{
  id:xxx,
  name:xxx,
  account:xxx,
  password:xxx
}
返回值：
{
code:"200",
msg:"修改成功！",
result:data.save
}
```

6.获取用户列表

```
/api/acl_user/getList
参数：
{
 
}
返回值：
{
  "code": "200",
  "msg": "获取详情成功",
  "result": [
    {
      "name": "wuwanyu",
      "createdAt": "2017-05-27T02:14:19.994Z",
      "updatedAt": "2017-05-27T02:50:56.309Z",
      "account": "120",
      "password": "123",
      "id": "7daa4635-9f9d-4c79-9f15-c827097ac15a"
    }
  ],
  "count": 1
}
```

7.删除用户

```
/api/acl_user/delete
① db删除用户
② acl删除用户角色关系removeUserRoles、删除用户removeUser

参数：
{
 id:xxx
}
返回值：
{
code:"200",
msg:"删除成功！",
result:result
}
```



8.获取用户权限

```
/api/acl_user/allowedPermissions
参数：
userId:xxx
resources:xxx
返回值：
{
code:"200",
msg:"成功！",
result:result
}
```

9.给用户添加角色

```
/api/acl_user/addUserRoles
① 获取用户所有角色acl.userRoles、删除用户所有角色acl.removeUserRoles
② 添加新的角色acl.addUserRoles
参数：
userId:xxx
roles:xxx
返回值：
{
code:"200",
msg:"成功！",
result:result
}
```

10.给用户添加角色

```
/api/acl_user/userRoles
① 获取用户所有角色acl.userRoles
参数：
userId:xxx
返回值：
{
code:"200",
msg:"成功！",
result:result
}
```

### nodejs开源权限管理框架参考：

node_acl(1373星):https://github.com/OptimalBits/node_acl
优点：支持express

Connect Roles（564星）： https://github.com/ForbesLindesay/connect-roles
点评：支持express，还需要引入passport.js

rbac（309星 ）：https://github.com/CherryProjects/rbac
优点：支持express





