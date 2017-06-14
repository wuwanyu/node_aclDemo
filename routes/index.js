var express = require('express');
var router = express.Router();
var resourceCtroller = require('../app/controllers/acl_resource');
var async = require('async');

router.get("/login",function(req,res){
  res.render('login');
});

router.get('/logout', function(req,res) {
  req.session.destroy();
  res.redirect('/');
})


router.get('/*', function(req, res, next) {
  console.log(">> session user:",req.session.curUserId,req.sessionID );
  //console.log(">> session userPerms:",req.session.curUser );
  //console.log(">> session userPerms:",req.session.curUserPerms );

  if(req.session.curUserId){
    async.auto({
      //获取资源
      resources:function(cb){
        resourceCtroller.getList({},function(err,resources){
          var resourceList = [];
          if(resources){
            resources.forEach(function(item){
              resourceList.push(item.id);
            });
          }
          cb(err,resourceList);
        });
      },
      //获取权限
      permissions:["resources",function(data,cb){
        //console.log("resources:",data.resources);
        global.acl.allowedPermissions(req.session.curUserId,data.resources,cb);
      }],
    },function(err,data){
      req.session.curUserPerms = data.permissions;
      next();
    })
  }else{
    res.redirect('/login');
  }


});

router.get('/', function(req, res, next) {

  res.render('pages/home', {     layout: 'layout',     perms:req.session.curUserPerms,     user:req.session.curUser   });


});


router.get("/pages/page11",function(req,res){
  res.render('pages/page11', {     layout: 'layout',     perms:req.session.curUserPerms,     user:req.session.curUser   });
});

router.get("/pages/page12",function(req,res){
  res.render('pages/page12', {     layout: 'layout',     perms:req.session.curUserPerms,     user:req.session.curUser   });
});


router.get("/pages/page21",function(req,res){

  res.render('pages/page21', {     layout: 'layout',     perms:req.session.curUserPerms,     user:req.session.curUser   });
  
});

router.get("/pages/page22",function(req,res){

  res.render('pages/page22', {     layout: 'layout',     perms:req.session.curUserPerms,     user:req.session.curUser   });

});

router.get("/dzd/manage",function(req,res){

  res.render('dzd/manage', {     layout: 'layout',     perms:req.session.curUserPerms,     user:req.session.curUser   });

});


router.get("/sys/user",function(req,res){

  res.render('sys/user', {     layout: 'layout',     perms:req.session.curUserPerms,     user:req.session.curUser   });
});


router.get("/sys/role",function(req,res){

  res.render('sys/role', {     layout: 'layout',     perms:req.session.curUserPerms,     user:req.session.curUser   });

});


router.get("/sys/resource",function(req,res){

  res.render('sys/resource', {     layout: 'layout',     perms:req.session.curUserPerms,     user:req.session.curUser   });
});





module.exports = router;
