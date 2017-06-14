var waterline = require('../../config/waterline');
var ObjectID = require('mongodb').ObjectID;


module.exports = {
    //增加
    save: function(item, next){
        console.log("item:",item);
        waterline.models.acl_role
            .create(item, next);
    },
    //修改
    update:function(param, next){
        console.log(">> param:",param);
        waterline.models.acl_role
            .update({id:param.id},param)
            .exec(next);
    },

    //删除
    delete:function(param, next){
        waterline.models.acl_role
            .destroy({ id: param.id })
            .exec(next);
    },


    getOne:function( param, next){
        console.log("param:",param);
        waterline.models.acl_role
            .findOne(param)
            .exec(next);
    },

    //查询全部新闻
    getList: function( param, next){
        console.log("param:",param);
        waterline.models.acl_role
            .find(param)
            .exec(next);
    },


    //查询数量
    count:function(param,next){

        waterline.models.acl_role
            .count(param)
            .exec(next);
    }
};