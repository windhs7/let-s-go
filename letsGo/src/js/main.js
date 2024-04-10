    /**
     * 常用JS变量:
     * agentEvent = 代理模式下自动点击模块
     * acEvent= 无障碍模式下自动点击模块
     * device = 设备信息模块
     * file = 文件处理模块
     * http = HTTP网络请求模块
     * shell = shell命令模块
     * thread= 多线程模块
     * image = 图色查找模块
     * utils= 工具类模块
     * global = 全局快捷方式模块
     * 常用java变量：
     *  context : Android的Context对象
     *  javaLoader : java的类加载器对象
     * 导入Java类或者包：
     *  importClass(类名) = 导入java类
     *      例如: importClass(java.io.File) 导入java的 File 类
     *  importPackage(包名) =导入java包名下的所有类
     *      例如: importPackage(java.util) 导入java.util下的类
     */


    function main() {
        //开始再这里编写代码了！！
        //如果自动化服务正常

        //*******************************************************************************************************
        logF = true;
        //检查激活码
        /*let kaMi = readConfigString("km");
        if("" == kaMi) {
            toast("请先在【使用设置】页面绑定激活码！");
            exit();
        }
        let loginResult = login(kaMi);
        let xtemp = JSON.parse(loginResult);
        if(1 == xtemp.code){
            toast("开始脚本运行！");
        }else {
            toast("错误，请在【使用设置】页面验证激活码！");
            exit();
        }*/

        if (!autoServiceStart(3)) {
            logdExt("自动化服务启动失败，无法执行脚本，退出脚本！！！")
            exit();
        }

        logdExt("开始执行脚本...")
        home();

        //------------------------------------------------测试区----------------------------------------------


        //------------------------------------------------测试区结束----------------------------------------------

        //重置变量
        ui.resetUIVar();

        //启动app
        //lunchAPP("com.ss.android.ugc.aweme");
        utils.openAppByName("抖音")
        sleep(3000);
        logdExt("启动完毕");
        sleep(4000);
        //执行操作
        initPinLun();
        logdExt("加载评论完毕");
        initLive();
        logdExt("加载直播间发言完毕");

        douCls.setUICount("0");
        douCls.setUIText("");


        let nameTemp = "";
        let iTemp = 0;
        let count = ui.getShareData("count");
        let fans = ui.getShareData("fans");
        let friend = ui.getShareData("friend");
        let forYou = ui.getShareData("forYou");
        let live = ui.getShareData("live");
        pingLunDianZan = ui.getShareData("dianZan");
        shop = ui.getShareData("shop");
        dataLog = ui.getShareData("log");

//************************************************************//
        while (iTemp < count){
            if("true" == fans){
                logdExt("做fans数据");
                if(!douCls.fans()) {
                    logdExt("未找到fans");
                }else { //找到fans
                    if (douCls.excuteData()) {//做了数据
                        iTemp++;
                        douCls.setUICount("fans数据统计：" + iTemp + "次");
                    }
                }
                douCls.swipe();
                continue;
            }
            if("true" == friend){
                logdExt("做friend数据");
                if(!douCls.friend()){
                    logdExt("未找到friend");
                }else {
                    if (douCls.excuteData()) {//做了数据
                        iTemp++;
                        douCls.setUICount("朋友数据统计：" + iTemp + "次");
                    }
                }
                douCls.swipe();
                continue;
            }
            if("true" == forYou){
                if(!douCls.forYou()) {
                    logdExt("未找到forYou数据");
                }else {
                    if(douCls.excuteData()) {
                        iTemp++;
                        douCls.setUICount("推荐数据统计：" + iTemp + "次");
                    }
                }
                douCls.swipe();
                continue;
            }
            if("true" == live){
                logdExt("做live数据");
                sleep(random(3000,6000));
                if(!douCls.live()){
                    logdExt("未做live数据");
                }else{
                    iTemp++;
                    douCls.setUICount("直播数据统计：" + iTemp + "次");
                }
                //点星星
                //sleep(random(1000,2000));
                //logdExt("判断是否点赞。");
                //if(random(1,4) > 2) {
                    //logdExt("点赞！！！");
                    //for (let liveDD = 1; liveDD <= random(1, 2); liveDD++) {
                        douCls.liveDianZan();
                    //}
                //}
                continue;
            }
        }

        logout(kaMi);
    }

    function logdExt(str){
        if(logF) {
            logd(str);
            toast((str));
        }
    }
    function autoServiceStart(time) {
        for (let i = 0; i < time; i++) {
            if (isServiceOk()) {
                return true;
            }
            let started = startEnv();
            logdExt("第" + (i + 1) + "次启动服务结果: " + started);
            if (isServiceOk()) {
                return true;
            }
        }
        return isServiceOk();
    }
    //登录
    function login(kaMi){

        let urlLogin = "http://125.124.139.53:6611/api/app/login";
        let dId = device.tcDeviceId();
        dId+="";
        let mMode = device.getBrand() + "&" + device.getModel();
        let pa = {"safecode":"87651", "key": kaMi, "mcode":dId, "mmode":mMode};
        return http.httpPost(urlLogin, pa, null, 10 * 1000, null);
        //状态码：0=错误，1=成功，2=机器码已绑定，3=软件已到期，9=软件不存在，8=数据异常，-1=激活码已封禁
    }
    //登出
    function logout(kaMi){

        let urlLogout = "http://125.124.139.53:6611/api/app/logout";
        let dId = device.tcDeviceId();
        dId+="";
        let pa = {"safecode":"87651", "key": kaMi, "mcode":dId};
        return http.httpPost(urlLogout, pa, null, 10 * 1000, null);
        //状态码：0=错误，1=成功，2=机器码已绑定，3=软件已到期，9=软件不存在，8=数据异常，-1=激活码已封禁
    }

    function initLive(){
        if(!file.exists("/sdcard/live.txt")){
            let create = file.create("/sdcard/live.txt");
            file.appendLine("主播优秀，为主播点赞！#","/sdcard/live.txt");
            file.appendLine("为主播加油！#","/sdcard/live.txt");
            file.appendLine("一直支持主播，加油！#","/sdcard/live.txt");
            file.appendLine("77777777#","/sdcard/live.txt");
        }
        let strLive = file.readFile("/sdcard/live.txt");
        strLive = strLive.replace(/^\s*|\s*$/g,"");
        //strLive = strLive.trim();
        //logd(strLive);
        arrLive = strLive.split("#");
    }

    function initPinLun(){
        if(!file.exists("/sdcard/pinglun.txt")){
            let create = file.create("/sdcard/pinglun.txt");
            file.appendLine("支持推荐哦，记得我#","/sdcard/pinglun.txt");
            file.appendLine("不错哦，喜欢喜欢。#","/sdcard/pinglun.txt");
            file.appendLine("支持支持，一起加油#","/sdcard/pinglun.txt");
            file.appendLine("五星好评，会再来的哦！#","/sdcard/pinglun.txt");
            file.appendLine("点赞好评#","/sdcard/pinglun.txt");
        }
        let strPinLun = file.readFile("/sdcard/pinglun.txt");
        strPinLun = strPinLun.replace(/^\s*|\s*$/g,"");
        //logdExt(strPinLun);
        arrPinLun = strPinLun.split("#");

    }

    let arrLive;
    let arrPinLun;
    let dataLog = "";//数据日志
    let pingLunDianZan = "";//评论点赞
    let shop = "";//推荐购物车
    //全局标志变量，是否打印log信息
    let logF = false;

    const x = device.getScreenWidth();
    const y = device.getScreenHeight();
    logd(y)

    main();