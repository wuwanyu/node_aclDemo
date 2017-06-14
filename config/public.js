/**
 * Created by wuwanyu on 2017/5/23.
 */
var multiparty = require('multiparty'),
    fs = require('fs'),
    fs_extra = require('fs-extra');


var splitstr = String.fromCharCode(0x01);
exports.splitstr = splitstr;

//表单参数转为json
exports.formParse=function(req, next){
    var form = new multiparty.Form({
        encoding:"utf-8",
        uploadDir:"public/upload/",
        keepExtensions:true //保留后缀
    });

    form.parse(req,function(err,fields,files){
        console.log("fields:",fields);
        console.log("files:",files);
        var obj = {},temp = [];
        if(fields){
            Object.keys(fields).forEach(function(name){
                obj[name] = fields[name].join(",");
            });
        }
        if(files){
            Object.keys(files).forEach(function(name){
                //console.log("name:",name,"files[name]",files[name],"length:",files[name].length);
                if(files[name].length>0 && files[name][0].size>0){
                    temp[name] = [];
                    files[name].forEach(function(file){
                        fs.rename(file.path,form.uploadDir + file.originalFilename,function(err){
                            if(err) next(err);
                            fs_extra.removeSync(file.path);
                        });
                        file.path = file.originalFilename;
                        temp[name].push(file.path);
                    });
                    if(files[name].length==1){
                        obj[name+"_size"]= files[name][0].size;
                    }
                    obj[name] = temp[name].join(splitstr);
                }

            });
        }
        console.log("obj:",obj);
        next(err,obj);
    });
}

