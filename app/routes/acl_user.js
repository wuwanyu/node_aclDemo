/**
 * Created by wuwy on 2016/2/17.
 */
var express = require('express');
var router = express.Router();
var async = require('async');
var userController = require('../controllers/acl_user');
var resourceController = require('../controllers/acl_resource');
var util = require('../../config/public.js');

router.post('/login', function(req,res){
    try{
        var arg = req.body;
        async.auto({
            login:function(cb){
                userController.getOne(arg,function(err,data){
                    if(data){  //存在
                        req.session.curUserId = data.id;
                        req.session.curUser = data;
                        //console.log(">>logined session user:",req.session.curUserId,req.sessionID );
                        //console.log(">>logined session userPerms:",typeof req.session.curUser );
                        //console.log(">>logined session userPerms:",typeof req.session.curUserPerms );
                        cb({
                            code:200,
                            msg:"登录成功",
                            //result:data
                        });
                    }else{
                        cb(null);
                    }
                });
            },
            hasAccount:["login",function(data,cb){
                userController.getOne({account:arg.account},function(err,data){
                    if(data){  //存在
                        cb({
                            code:400,
                            msg:"密码错误"
                        });
                    }else{
                        cb({
                            code:400,
                            msg:"账号不存在"
                        });
                    }
                });
            }]
        },function(err,data){
            //console.log("login:",err,data);
            res.send(err);

        });
    }catch(err){
        res.end(err.stack);
    }

});


router.post('/logout', function(req,res){
    try{
        var sid = req.sessionID;
        console.log("logout sid:",sid)
        delete req.session.curUserId;
        delete req.session.curUser;
        delete req.session.curUserPerms;
        res.send({
            code:200,
            msg:"退出成功！"
        });

    }catch(err){
        res.end(err.stack);
    }

});


//增加一条
router.post('/add', function(req,res){
    try{
        async.auto({
            formParse:function(cb){
                util.formParse(req,cb);
            },
            save:["formParse",function(data,cb){
                userController.save(data.formParse,cb);
            }]
        },function(err,data){
            res.send({
                code:"200",
                msg:"创建成功！",
                result:data.save
            });
        });
    }catch(err){
        res.end(err.stack);
    }

});

//修改信息
router.post('/update',function(req,res){
    try{
        async.auto({
            formParse:function(cb){
                util.formParse(req,cb);
            },
            update:["formParse",function(result,cb){
                userController.update(result.formParse,cb);
            }]
        },function(err,data){
            res.send({
                code:"200",
                msg:"修改成功！",
                result:data.update
            });
        });

    }catch(err){
        res.end(err.stack);
    }
});

//根据id查询一条
router.post('/getOne',function(req,res){
    var param = req.body;
    try{
        async.auto({
            info:function(cb){
                userController.getOne(param,cb);
            },
            allowedPermissions:function(cb){
                userController.allowedPermissions(param,cb);
            },
        } ,function(err,data){
            res.send({
                code:"200",
                msg:"获取详情成功",
                result:{
                    info:data.info,
                    permissions:data.allowedPermissions
                }
            });
        });
    }catch(err){
        res.end(err.stack);
    }
});

//根据id查询一条
router.post('/getList',function(req,res){
    var param = req.body;
    try{
        async.auto({
            list:function(cb){
                userController.getList(param,cb);
            },
            count:function(cb){
                userController.count(param,cb);
            },
        } ,function(err,data){
            res.send({
                code:"200",
                msg:"获取详情成功",
                result: data.list,
                count:data.count
            });
        });
    }catch(err){
        res.end(err.stack);
    }
});



//删除
router.post('/delete',function(req,res){
    try{
        var param = req.body;
        async.auto({
            delete:function(cb){
                userController.delete(param,cb);
            },
            userRoles:function(cb){
                global.acl.userRoles(param.id,cb)
            },
            removeUserRoles:["userRoles",function(data,cb){
                console.log("roles:",data.userRoles);
                global.acl.removeUserRoles(param.id,data.userRoles,cb)
            }],
            removeUser:["removeUserRoles",function(data,cb){
                global.acl.removeUser(param.id,cb);
            }],
        } ,function(err,data){
            res.send({
                code:"200",
                msg:"删除成功！",
                result:data
            });
        });
    }catch(err){
        res.end(err.stack);
    }

});

router.post('/allowedPermissions',function(req,res){
    var arg = req.body;
    console.log('arg:',arg,arg.userId);
    async.auto({
        permission:function(data,cb) {
            global.acl.allowedPermissions(arg.userId,JSON.parse(arg.resources),cb)
        },
    },function(err,result){
        res.send({
            code:200,
            msg:"成功",
            result:result.permission
        });
    });
});

router.post('/addUserRoles',function(req,res){
    var arg = req.body;
    console.log("arg:",arg,arg.userId,JSON.parse(arg.roles));

    async.auto({
        userRoles:function(cb){
            global.acl.userRoles(arg.userId,cb)
        },
        removeUserRoles:["userRoles",function(data,cb){
            console.log(data.userRoles);
            if(data.userRoles.length>0){
                console.log("remove");
                global.acl.removeUserRoles(arg.userId,data.userRoles,cb)
            }else{
                cb();
            }

        }],
        addUserRoles:["removeUserRoles",function(data,cb){
            global.acl.addUserRoles(arg.userId,JSON.parse(arg.roles),cb)
        }],
    },function(err,data){
        res.send({
            code:"200",
            msg:"创建成功！",
            result:data
        });
    });
});

router.post('/userRoles',function(req,res){
    var arg = req.body;
    console.log('userRoles arg:',arg,arg.userId);
    global.acl.userRoles(arg.userId,function(err,data){
        console.log(err,data);
        res.send({
            code:200,
            msg:"成功",
            result:data
        });
    })
});
module.exports = router;


