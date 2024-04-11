
//*****************************************************************************//
//*************************************抖音类***********************************//
//*****************************************************************************//

let douCls = {
        fName : ""
    };

    douCls.fans = function (){
        sleep(random(1000,2000));
        if(!bounds(0,y/2,x/2,y-200).text("购物").getOneNodeInfo(1000)) return false;
        let fans = clz("android.widget.TextView").textMatch("@*?fans").getOneNodeInfo(1000);
        //let fans = clz("android.widget.TextView").textMatch("fans$").getOneNodeInfo(1000);
        if(fans){
            if(this.fName == fans.text) return false;
            this.fName = fans.text;
            logdExt("1");
            return true;
        }else{
            logdExt("2");
            return false;
        }
    };
    douCls.friend = function (){
        sleep(random(1400,2000));
        if(!bounds(0,y/2,x/2,y-200).text("购物").getOneNodeInfo(1000)){
            return false;
        } else {
            if("true" == dataLog){
                let friend = clz("android.widget.TextView").textMatch("^@").getOneNodeInfo(3000);
                if(friend){
                    //this.setUIText(friend.text);
                    if(this.fName == friend.text) return false;
                    this.fName = friend.text;
                    return true;
                }else {
                    return false;
                }
            }
            return true;
        }
    };
    douCls.shop = function (shop){
        //找到购物后，弹出商品单挡住了购物车和好友名字
        /*for(let i=0;i<friend.length;i++){
            logd(JSON.stringify(friend[i]));
        }*/
        logdExt("打开购物车");
        shop.click();
        sleep(random(3500, 5500));
        /*let guanShop;
        while (!(guanShop = clz("android.widget.FrameLayout").desc("关闭 ").getOneNodeInfo(1000))) {
            guanShop = clz("android.widget.ImageView").pkg("com.ss.android.ugc.aweme").clickable(true).getOneNodeInfo(1000);
            if (guanShop) {
                break;
            }
            removeNodeFlag(0);
            logdExt("关闭未找到---强制刷新");
        }
        logdExt("关闭购物车");
        //guanShop.clickEx();
        guanShop.click();
        let iTemp = 10;
        while(iTemp > 0){
            iTemp--;
            goods = clz("android.widget.TextView").text("视频中的商品").getOneNodeInfo(1000);
            if(goods) break;
            removeNodeFlag(0);
            sleep(1000);
        }*/
        this.swipeToClose();
        sleep(random(1600, 2200));
    };
    douCls.forYou = function () {
        sleep(random(1400,2000));
        let forYou = null;
        if(!(shopNode = bounds(0,y/2,x/2,y-200).text("购物").getOneNodeInfo(1000))) return false;
        if("true" == dataLog) forYou = clz("android.widget.TextView").textMatch("^@").getOneNodeInfo(1000);
        if("true" == shop && (random(1,4) > 2)) this.shop(shopNode);

        if("true" == dataLog){
            if(forYou){
                if(this.fName == forYou.text) return false;
                this.fName = forYou.text;
                return true;
            }else {
                return false;
            }
        }else {
            return true;
        }
    }
    douCls.dianZan = function () {
        sleep(random(1000,1400));
        let noDianZan = clz("android.widget.LinearLayout").descMatch("^未点赞").getOneNodeInfo(1000);

        if (noDianZan) {
            logdExt("点赞");
            return noDianZan.click();
        }else{
            logdExt("未找到点赞");
            return false;
        }
    };
    douCls.pinLunDianZan = function () {
        sleep(random(1000,1800));
        let noDZan = clz("android.widget.LinearLayout").descMatch("赞*?未选中").getNodeInfo(10000);
        if(!noDZan){
            logdExt("没找到评论点赞");
            return false;
        }
        for(let i=0; i<noDZan.length; i++){
            //logdExt("随机评论点赞");
            if(random(1,4) > 2) {
                //logd(JSON.stringify(noDZan[i]));
                if(nodeTemp = noDZan[i].parent()){
                    nodeTemp.clickEx();
                    sleep(random(500, 800));
                }
            }
        }
        return true;
    };
    douCls.pinLun = function (){
        sleep(random(800,1000));

        let pinLun = clz("android.widget.LinearLayout").descMatch("^评论").getOneNodeInfo(1000);
        if(!pinLun) return "评论未找到";
        //打开评论页
        pinLun.click();
        sleep(random(1400,2000));

        //找到评论框
        if(faYan = clz("android.widget.EditText").textMatch("\\S{5,}").getOneNodeInfo(1000)){
            if(nodeP = faYan.parent()){
                sX = nodeP.bounds.right - x/20;
                sY = nodeP.bounds.bottom - y/30;
            }
            if("true" == pingLunDianZan) this.pinLunDianZan();//评论点赞

            faYan.inputText(arrPinLun[random(0,arrPinLun.length-2)]);
            sleep(random(1000,1200));

            if(nodeP){
                //发送评论
                clickPoint(sX, sY);
            }

            /*if(faYan.bounds.bottom < y * 0.8){//首评
                clickPoint(x*0.9,(faYan.bounds.top + faYan.bounds.bottom)/2 + y/20);
            }else {
                clickPoint(x*0.9,(faYan.bounds.top + faYan.bounds.bottom)/2);
            }*/

            /*while(tempFlag){
                if(faSong =clz("android.widget.ImageView").desc("发送").getOneNodeInfo(1000)) {
                    tempFlag = false;
                    faSong.click();
                    //faSong.clickEx();
                }else{
                    removeNodeFlag(0);
                    logdExt("重新评论发送---强制刷新");
                    sleep(1000);
                }
            }*/
        }
        sleep(random(1200,1600));

        this.swipeToClose();
        sleep(random(1600,2000));                                                      
        return "评论完成";
    }
                                                                                            
    //----------------------------------------------------送星星----------------------------------------------------
    douCls.liveDianZan = function () {
        clickPoint(random(parseInt(x / 2) - 200, parseInt(x / 2) + 200), random(parseInt(y / 4), parseInt(y / 4) + 200));
        //sleep(random(300, 600));
        sleep(random(1000, 1600));
        clickPoint(random(parseInt(x / 2) - 200, parseInt(x / 2) + 200), random(parseInt(y / 4), parseInt(y / 4) + 200));
    }

    //----------------------------------------------------直播间发言--------------------------------------------------
    douCls.live = function (){
        try {
            /*let sendText = desc("说点什么...").getOneNodeInfo(2000);
            //click(desc("说点什么..."));
            if (sendText) {
                logdExt("点击发言");
                sendText.click()
            }else
                logdExt("没找到【说点什么...】");*/
            logdExt("点击发言");
            clickPoint(150,y-80);


            sleep(2000);

            if (!(sendText = clz("android.widget.EditText").getOneNodeInfo(3000))){
                logdExt("没找到发言位置");
                return false;
            }

            if (!sendText.inputText(arrLive[random(0, arrLive.length - 2)])) {
                logdExt("输入发言内容错误");
                return false;
            }
            //let sendX = x - x / 20;
            //let sendY = sendText.bounds.top + (sendText.bounds.bottom - sendText.bounds.top) / 2;

            sleep(random(1000, 1200));
            //直播发言
            logdExt("点击发送");
            return clickEx(text("发送"));

        }catch (e) {
            toast("e:" + e.toString());
            return false;
        }
    }
    douCls.excuteData = function (){
        if(this.dianZan()) {
            logdExt("3");
            this.pinLun();
            logdExt("4");
            if("true" === dataLog) this.setUIText(this.fName);
            logdExt("5");
            return true;
        }else{
            logdExt("6");
            return false;
        }
    }
    //myText 是HTML中暴露的方法
    //执行网页中的js方法调用ui方法
    douCls.setUIText = function (stemp){
        if (ui.web) {
            ui.web.quickCallJs("myText('" + stemp + "');");
            //ui.web.quickCallJs("myText('bbbbb');");
        }
    }
    douCls.setUICount = function (count){
        if (ui.web) {
            ui.web.quickCallJs("count('" + count + "');");
        }
    }
    douCls.swipe = function (){
        while(!swipeToPoint(x/2,y*4/5,x/2,y/5,random(400,500))){
            logdExt("滑屏翻页失败");
            sleep(1000);
        }
        logdExt("滑屏翻页成功");
        //sleep(random(800,1200));
    }
    douCls.swipeToClose= function (){
        //swipeToPoint(goods.bounds.left,goods.bounds.bottom,goods.bounds.left,y-200,random(400,500));
        while(!swipeToPoint(1080/2,2400*85/240,1080/2,2400*9/10,random(400,500))){
            logdExt("滑屏关闭失败");
            sleep(1000);
        }
        logdExt("滑屏关闭成功");
    }