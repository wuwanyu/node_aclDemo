var waterline = require('../../config/waterline');


module.exports = {
    //增加
    save: function(item, next){
        console.log("item:",item);

        waterline.models.acl_resource
            .create(item, next);
    },
    findOrCreate: function(param, next){
        console.log("item:",param);
        waterline.models.acl_resource
            .findOrCreate({id:param.id},param, next);
    },

    //修改
    update:function(item, next){
        console.log(">> item:",item);

        waterline.models.acl_resource
            .update({id:item.id},item)
            .exec(next);
    },

    //删除
    delete:function(param, next){
        waterline.models.acl_resource
            .destroy({ id: param.id })
            .exec(next);
    },


    getOne:function( param, next){
        waterline.models.acl_resource
            .findOne(param)
            .exec(next);
    },

    //查询全部新闻
    getList: function( param, next){
        console.log("param:",param);

        waterline.models.acl_resource
            .find(param)
            .exec(next);

    },


    //查询数量
    count:function(param,next){

        waterline.models.acl_resource
            .count(param)
            .exec(next);
    }
};