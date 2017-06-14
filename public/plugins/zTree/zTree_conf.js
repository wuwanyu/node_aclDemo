var tree_setting = {
    check: {
        enable: true
    },
    data: {
        simpleData: {
            enable: true
        }
    }
};

var tree_nodes =[
    { id:1, pId:0, name:"经适房查询",value:"jsf",open:true},
    { id:11, pId:1, name:"查询操作页",value:"jsf_index",open:true},
    { id:12, pId:1, name:"历史记录页",value:"jsf_his",open:true},

    { id:2, pId:0, name:"对账单查询",value:"dzd", open:true},  //资源
    { id:21, pId:2, name:"对账单",value:'dzd_index',open:true},   //权限
    { id:22, pId:2, name:"对公客户管理",value:"dzd_manage",open:true},

    { id:3, pId:0, name:"系统设置",value:"sys",open:true},  //资源
    { id:31, pId:3, name:"用户管理",value:'sys_user',open:true},   //权限
    { id:32, pId:3, name:"角色管理",value:"sys_role",open:true},

    { id:111, pId:11, name:"增加",value:"add",open:true},
    { id:112, pId:11, name:"删除",value:"delete",open:true},
    { id:211, pId:21, name:"增加",value:"add",open:true},
    { id:212, pId:21, name:"删除",value:"delete",open:true},

];


var nodes = [
    {
        createdAt:"2017-05-25T08:27:10.798Z",
        eng_name:"home",
        id:"2cf55014-ac3f-433e-b680-bb6987a65c11",
        name:"首页",
        pId:"0",
        updatedAt:"2017-05-26T01:40:12.037Z",open:true
    },
    {
        createdAt:"2017-05-25T08:27:10.798Z",
        eng_name:"JSF",
        id:"2cf55014-ac3f-433e-b680-bb6987a65c11",
        name:"经适房查询",
        pId:"0",
        updatedAt:"2017-05-26T01:40:12.037Z",open:true
    },
]