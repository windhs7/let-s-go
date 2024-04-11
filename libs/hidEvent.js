function HidEventWrapper() {
}

let hidEvent = new HidEventWrapper();

/**
 * 设置HID主控地址
 * 适配版本 EC 安卓 9.15.0+
 * @param hidCenterUrl HID主控程序运行的网址
 * @return {string} null 代表成功，其他代表错误消息
 */
HidEventWrapper.prototype.setHidCenter = function (hidCenterUrl) {
    let result = hidEventWrapper.setHidCenter(hidCenterUrl,"2")
    return result;
};

/**
 * 初始化HID设备
 * 适配版本 EC 安卓 9.15.0+
 * @return {string} null 代表成功，其他代表错误消息
 */
HidEventWrapper.prototype.initUsbDevice = function () {
    let result = hidEventWrapper.initUsbDevice()
    if (result == null || result == undefined || result== "") {
        return null;
    }
    return result;
};
/**
 * 矫正HID坐标
 * 调用 initUsbDevice 再调用这个函数
 * 适配版本 EC 安卓 9.15.0+
 * @return {string} null 代表成功，其他代表错误消息
 */
HidEventWrapper.prototype.checkFirstPoint = function () {
    let result = hidEventWrapper.checkFirstPoint()
    if (result == null || result == undefined || result == "") {
        return null;
    }
    return result;
};






/**
 * 关闭HID设备
 * 适配版本 EC 安卓 9.15.0+
 * @return {string} null 代表成功，其他代表错误消息
 */
HidEventWrapper.prototype.closeUsbDevice = function () {
    let x = hidEventWrapper.closeUsbDevice()
    if (x == null || x == undefined || x == "") {
        return null;
    }
    return x;
};
/**
 * 点击坐标
 * 适配版本 EC 安卓 9.15.0+
 * @param x x坐标
 * @param y y坐标
 * @return {string} null 代表成功，其他代表错误消息
 */
HidEventWrapper.prototype.clickPoint = function (x,y) {
    let result = hidEventWrapper.click(x,y)
    if (result == null || result == undefined || result == "") {
        return null;
    }
    return result;
};

/**
 * 双击坐标
 * 适配版本 EC 安卓 9.15.0+
 * @param x x坐标
 * @param y y坐标
 * @return {string} null 代表成功，其他代表错误消息
 */
HidEventWrapper.prototype.doubleClickPoint = function (x,y) {
    let result = hidEventWrapper.doubleClick(x,y,150)
    if (result == null || result == undefined || result == "") {
        return null;
    }
    return result;
};


/**
 * 长按坐标
 * 适配版本 EC 安卓 9.15.0+
 * @param x x坐标
 * @param y y坐标
 * @param delay 按住时间，单位是毫秒
 * @return {string} null 代表成功，其他代表错误消息
 */
HidEventWrapper.prototype.press = function (x,y,delay) {
    let result = hidEventWrapper.press(x,y,delay)
    if (result == null || result == undefined || result == "") {
        return null;
    }
    return result;
};


/**
 * 多点触摸
  * 适配版本 EC 安卓 9.15.0+
 * 触摸参数: action :一般情况下 按下为0，弹起为1，移动为2
 * x: X坐标
 * y: Y坐标
 * pointer：设置第几个手指触摸点，分别是 1，2，3等，代表第n个手指
 * delay: 该动作延迟多少毫秒执行
 * @param touch1 第1个手指的触摸点数组,例如：[{"action":0,"x":1,"y":1,"pointer":1,"delay":20},{"action":2,"x":1,"y":1,"pointer":1,"delay":20}]
 * @param timeout 多点触摸执行的超时时间，单位是毫秒
 * @return boolean|布尔型
 */
HidEventWrapper.prototype.multiTouch = function (touch1, timeout) {
    var data = JSON.stringify(touch1);
    return hidEventWrapper.multiTouch(data, timeout);
};


/**
 * 移动鼠标到坐标点
 * 适配版本 EC 安卓 9.15.0+
 * @param x x坐标
 * @param y y坐标
 * @return {string} null 代表成功，其他代表错误消息
 */
HidEventWrapper.prototype.mouseMove = function (x,y) {
    let result = hidEventWrapper.mouseMove(x,y)
    if (result == null || result == undefined || result == "") {
        return null;
    }
    return result;
};


/**
 * 按下
 * 适配版本 EC 安卓 9.19.0+
 * @param x x坐标
 * @param y y坐标
 * @return {string} null 代表成功，其他代表错误消息
 */
HidEventWrapper.prototype.touchDown = function (x,y) {
    let result = hidEventWrapper.touchDown(x,y)
    if (result == null || result == undefined || result == "") {
        return null;
    }
    return result;
};

/**
 * 移动
 * 适配版本 EC 安卓 9.19.0+
 * @param x x坐标
 * @param y y坐标
 * @return {string} null 代表成功，其他代表错误消息
 */
HidEventWrapper.prototype.touchMove = function (x,y) {
    let result = hidEventWrapper.touchMove(x,y)
    if (result == null || result == undefined || result == "") {
        return null;
    }
    return result;
};

/**
 * 弹起
 * 适配版本 EC 安卓 9.19.0+
 * @param x x坐标
 * @param y y坐标
 * @return {string} null 代表成功，其他代表错误消息
 */
HidEventWrapper.prototype.touchUp = function (x,y) {
    let result = hidEventWrapper.touchUp(x,y)
    if (result == null || result == undefined || result == "") {
        return null;
    }
    return result;
};


/**
 * 鼠标参数设置
 * 适配版本 EC 安卓 9.19.0+
 * @param mouseStep 鼠标移动的每次距离，默认是50，不超过127
 * @param mouseSleep 移动间隔单位是毫秒。默认是50
 * @return {string} null 代表成功，其他代表错误消息
 */
HidEventWrapper.prototype.setting = function (mouseStep,mouseSleep) {
    let result = hidEventWrapper.setting(mouseStep,mouseSleep)
    if (result == null || result == undefined || result == "") {
        return null;
    }
    return result;
};