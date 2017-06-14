/**
 * Created by wuwy on 2016/2/17.
 */
var express = require('express');
var router = express.Router();
var async = require('async');
var roleController = require('../controllers/acl_role');
var resourceController = require('../controllers/acl_resource');
var util = require('../../config/public.js');

//增加一条
router.post('/add', function(req,res){
    try{
        async.auto({
            formParse:function(cb){
                util.formParse(req,cb);
            },
            save:["formParse",function(data,cb){
                roleController.save(data.formParse,cb);
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
                roleController.update(result.formParse,cb);
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
                roleController.getOne(param,cb);
            },
            whatResources:function(cb){
                global.acl.whatResources(param.id,cb)
            },
      } ,function(err,data){
            res.send({
                code:"200",
                msg:"获取详情成功",
                result:{
                    info:data.info,
                    resources:data.whatResources
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
                roleController.getList(param,cb);
            },
            count:function(cb){
                roleController.count(param,cb);
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
                roleController.delete(param,cb);
            },
            resources:function(cb) {
                resourceController.getList({},function(err,resources){
                    var resourceList = [];
                    resources.forEach(function(item){
                        resourceList.push(item.id);
                    });
                    cb(err,resourceList);
                });
            },
            removeAllow:["resources",function(data,cb){
                console.log(">> resources:",data.resources);
                global.acl.removeAllow(param.id,data.resources,'*',cb)
            }],
            removeRole:["removeAllow",function(data,cb){
                global.acl.removeRole(param.id,cb)
            }],
        } ,function(err,data){
            res.send({
                code:"200",
                msg:"删除成功！",
                result: data
            });
        });
    }catch(err){
        res.end(err.stack);
    }

});

router.post('/allow',function(req,res){
    var arg = req.body;
    console.log('arg:',arg);
    console.log(arg.role,JSON.parse(arg.resources));
    async.auto({
        resources:function(cb) {
            resourceController.getList({},function(err,resources){
                var resourceList = [];
                resources.forEach(function(item){
                    resourceList.push(item.id);
                });
                cb(err,resourceList);
            });
        },
        remove:["resources",function(data,cb) {
            console.log("resources:",data.resources);
            global.acl.removeAllow(arg.role,data.resources,'*',function(err){
                cb(err)
            })
        }],
        add:["remove",function(data,cb) {
            global.acl.allow(arg.role,JSON.parse(arg.resources),'*',function(err){
                cb(err)
            })
        }],
    },function(err,result){
        res.send({
            code:200,
            msg:"成功"
        });
    });
});

module.exports = router;


