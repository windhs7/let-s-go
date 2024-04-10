function main() {
    // 参数设置 = main.html
    // 使用说明 = intr.html
    // 定时任务 = timer.html
    // 其他 = other.html
    ui.layout("参数", "main.html");
    ui.layout("日志", "other.xml");
    ui.layout("评论", "pingLun.html");
    ui.layout("直播", "live.html");
    //ui.layout("设置", "config.xml");

    //UI中进行注入新的扩展
    ui.registeH5Function("readPingLun",function(){
        //logd("h5 call-> test");
        //返回给网页的数据
        //return readResString("pinlun.txt");
        if(!file.exists("/sdcard/pinglun.txt")){
            let create = file.create("/sdcard/pinglun.txt");
            file.appendLine("支持推荐，记得我#","/sdcard/pinglun.txt");
            file.appendLine("不错哦，喜欢喜欢。#","/sdcard/pinglun.txt");
            file.appendLine("支持支持，一起加油#","/sdcard/pinglun.txt");
            file.appendLine("给你五星好评，会再来的哦！#","/sdcard/pinglun.txt");
            file.appendLine("点赞好评#","/sdcard/pinglun.txt");
        }
        toast("读取评论文件完毕！");
        return file.readFile("/sdcard/pinglun.txt");
    })
    ui.registeH5Function("savePingLun",function(strPingLun){

        //返回网页的数据保存
        //return readResString("pinlun.txt");
        strPingLun = strPingLun.replace(/^\s*|\s*$/g,"");
        if("" == strPingLun){
            toast("评论文件内容为空！");
            return;
        }
        file.writeFile(strPingLun,"/sdcard/pinglun.txt");
        toast("保存评论文件完毕！");
    })
    ui.registeH5Function("readLive",function(){

        if(!file.exists("/sdcard/live.txt")){
            let create = file.create("/sdcard/live.txt");
            file.appendLine("主播优秀，为主播点赞！#","/sdcard/live.txt");
            file.appendLine("满满的祝福，为主播加油！#","/sdcard/live.txt");
            file.appendLine("一直支持主播，加油！#","/sdcard/live.txt");
            file.appendLine("77777777#","/sdcard/live.txt");
        }
        toast("读取直播发言文件完毕！");
        return file.readFile("/sdcard/live.txt");
    })
    ui.registeH5Function("saveLive",function(strLive){

        //返回网页的数据保存

        strLive = strLive.replace(/^\s*|\s*$/g,"");
        //logd(strLive);
        if("" == strLive){
            toast("直播发言文件内容为空！");
            return;
        }
        file.writeFile(strLive,"/sdcard/live.txt");
        toast("保存直播发言文件完毕！");
    })
    ui.registeH5Function("checkKaMi",function (kaMi){
        //不带文件的请求
        let urlLogin = "http://125.124.139.53:6611/api/app/login";
        let dId = device.tcDeviceId();
        dId+="";
        let mMode = device.getBrand() + "---" + device.getModel();

        let pa = {"safecode":"87651","key":kaMi ,"mcode":dId,"mmode":mMode};
        let result = http.httpPost(urlLogin, pa, null, 10 * 1000, null);
        //logd(result);
        return result
        //状态码：0=错误，1=成功，2=机器码已绑定，3=软件已到期，9=软件不存在，8=数据异常，-1=激活码已封禁

    })
}

main();