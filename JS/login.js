
// input框动画
$('.login-input_input').focus(function(){
    // 当前获取焦点的input框的祖先元素添加类名
    $(this).parent().parent().parent().addClass('input_active')
    // label添加类名
    $(this).siblings().addClass('label_active')
})
// 获取每一个input框
let input = document.getElementsByClassName('login-input_input')
// 进行遍历
Array.from(input).forEach(item => {
    // 绑定input框输入事件
    item.oninput = function(){
        // 获取祖先元素
        let field = this.parentNode.parentNode.parentNode
        // 当input框的值大于0时
        if(this.value.length > 0){
            // 清楚请示信息
            field.nextElementSibling.innerHTML = ''
            // 改变祖先元素的背景颜色
            field.style.background = '#f9f9f9'
            // 修改label的颜色为没有问题
            this.nextElementSibling.style.color = 'rgba(0,0,0,.4)'
        }
    }
})

// 密码是否可见的状态
let sta = true
$('.login-password-field_icon').click(function(){
    // 点击之后切换状态
    sta  = !sta
    if(sta){
        // 切换眼睛图标
        $(this).children().attr({'d': 'M19.78 7.738a.964.964 0 00-1.488-1.227 10.567 10.567 0 01-2.159 1.98 10.487 10.487 0 01-5.958 1.848 10.514 10.514 0 01-2.826-.381 10.394 10.394 0 01-1.977-.776 10.612 10.612 0 01-3.646-3.095.964.964 0 00-1.547 1.15c.487.655 1.037 1.26 1.642 1.808a.955.955 0 00-.084.17l-1.01 2.692a.964.964 0 101.806.677l.868-2.32a12.316 12.316 0 002.632 1.298l-.528 2.696a.964.964 0 101.893.371l.504-2.569c1.358.25 2.747.275 4.113.072l.44 2.417a.964.964 0 101.898-.346l-.455-2.502a12.37 12.37 0 002.381-1.029l.993 2.333a.964.964 0 001.775-.756l-1.139-2.673a12.537 12.537 0 001.871-1.838z'})
        // 改变密码框为密码不可见
        $('.password_text').attr({'type': 'password'})
    }else {
        // 切换眼睛图标
        $(this).children().attr({'d': 'M10 3c4.003 0 7.53 2.102 9.593 5.291a2.53 2.53 0 010 2.75c-2.063 3.19-5.59 5.292-9.593 5.292s-7.53-2.101-9.593-5.29a2.53 2.53 0 010-2.752C2.47 5.101 5.997 3 10 3zm-.012 2.333a4.337 4.337 0 00-4.34 4.334A4.337 4.337 0 009.988 14c2.397 0 4.34-1.94 4.34-4.333a4.337 4.337 0 00-4.34-4.334zm0 1.334a3.002 3.002 0 013.004 3c0 1.657-1.345 3-3.004 3a3.002 3.002 0 01-3.005-3c0-1.657 1.345-3 3.005-3z'})
        // 为false时密码为可见状态
        $('.password_text').attr({'type': 'text'})
    }
})


// 数据悬浮checked改变border色彩
$('.login_terms_checkbox').hover(function(){
    $('.checkbox span').css({borderColor:'#ff5c00'})
},function(){
    $('.checkbox span').css({borderColor:'#ddd'})
})


// 页面加载时执行
$(document).ready(function(){
    tabLoginRegister()
    // 禁用button按钮
});



function tabLoginRegister(){
    // 获取主页跳转来时处在哪个页面的状态
    let url = location.href
    // 声明状态
    let result = ''
    if(url.includes('name')){
        let str = url.split('?')[1]
         // 登录注册页的标识
        result = str.split('=')[1]
    }else{
        result = 'login'
    }
    // 进入登录注册页时进行判断处在哪个页面
    // 规定默认动画
    if(result == 'login'){
        $('.border').css({left:0})
        $('.register').css({fontWeight: 400,color: '#bbb'})
        $('.login').css({fontWeight: 500,color: '#333'})
        // 进入登录页时隐藏注册页
        $('.tab_login_register').children().eq(0).show()
    }else if(result == 'register'){
        $('.border').css({left: '68px'})
        $('.login').css({fontWeight: 400,color: '#bbb '})
        $('.register').css({fontWeight: 500,color: '#333'})
        // 进入注册页时隐藏登录页
        $('.tab_login_register').children().eq(1).show()
    }
        // 注册页切换下方横条动画 注册登录页进行切换
    $('.register').click(function(){
        $('.border').css({transform: 'translate3d(68px, 0, 0)',left:0})
        $('.login').css({fontWeight: 400,color: '#bbb'})
        $(this).css({fontWeight: 500,color: '#333'})
        // 隐藏登录页
        $('.tab_login_register').children().eq(0).hide()
        // 添加注册页从左向右进入的动画效果并使元素显现
        $('.tab_login_register').children().eq(1).addClass('login_active').show()
        // 改变页面标识为注册
        result = 'register'
        // 切换页面是为切换之后的页面绑定事件
        hint(result)
    })
    $('.login').click(function(){
        $('.border').css({transform: 'translate3d(0, 0, 0)',left:0})
        $('.register').css({fontWeight: 400,color: '#bbb'})
        $(this).css({fontWeight: 500,color: '#333'})
        // 隐藏注册页
        $('.tab_login_register').children().eq(1).hide()
        // 添加登录页从右向左进入的动画效果并使元素显现
        $('.tab_login_register').children().eq(0).addClass('register_active').show()
        // 改变页面标识为登录
        result = 'login'
        // 切换页面是为切换之后的页面绑定事件
        hint(result)
    })
    hint(result)
}
// 声明用户名是否规范的状态
let userSta = false
// 声明密码是否规范的状态
let psdSta = false 
let text = ''
// 注册登录输入提示错误
function hint(result){
    if(result == 'login'){
        text = '请输入登陆密码'
        // 在登录页时
        loginRegisterBlur($('.login_submit'),result)
    }else if(result == 'register'){
        text = '注册密码不能为空'
        // 在注册页时
        loginRegisterBlur($('.register_submit'),result) 
    }
    
}

function loginRegisterBlur(ele,result){
    // 清楚上次的input框规范状态
    userSta = false
    psdSta = false 
    // 清楚上一个事件
    $('.login-input_input').off('blur')
    // 为input框绑定失去焦点事件
    $('.login-input_input').on('blur',function(){
        // 获取当前input框的祖先元素 以便对应元素进行改变
        let field =  $(this).parent().parent().parent()
        // 当前input框长度为0时并且为用户名时
        if($(this).val().length == 0  && $(this).prop('name') == 'account'){
            field.css({background: '#fcf2f3'}).siblings().html('请输入账号')
            $(this).siblings().removeClass('label_active').css({color:'#f04645'})
            // 改变用户名是否规范的状态为false
            $(this).prop({'userSta': 'false'})
            $('.register_submit').off('click')
            field.parent().siblings('button').addClass('submit_active')
            // 当长度大于0且为用户名框时
        } else if($(this).prop('name') == 'account'){
            // 用户在对应的页面执行用户名验证的函数并返回验证之后的规范状态
            userSta = accountReg($(this))
            // 登录页的登录按钮添加样式
            ele.addClass('submit_active')
            // 调用此函数判断用户名，密码，登录页 改变登录页登录按钮的状态
            lnrSubmit(userSta,psdSta,result)
            
        }
        if($(this).val().length == 0  && $(this).prop('name') == 'password'){
            field.css({background: '#fcf2f3'}).siblings().html(text)
            $(this).siblings().removeClass('label_active').css({color:'#f04645'})
            // 改变密码是否规范的状态为false
            $(this).prop({'psdSta': 'false'})
            $('.register_submit').off('click')
            field.parent().siblings('button').addClass('submit_active')
        } else if($(this).prop('name') == 'password'){
            // 用户在对应的页面执行密码验证的函数并返回验证之后的规范状态
            psdSta  = passwordReg($(this))
            // 注册页的注册按钮添加样式
            ele.addClass('submit_active')
            // 调用此函数判断用户名，密码，注册页 改变注册页按钮的状态
            lnrSubmit(userSta,psdSta,result)
        }
        // 失去焦点时清除input框外的样式
        field.removeClass('input_active')
    })
}

// 点击以阅读的选中或不选中的状态
let checkSta = false
$('.login_terms_checkbox').click(function(){
    // 登录页调用此函数改变复选框的样式
    checkStatus($(this))
})
$('.register_terms_checkbox').click(function(){
    // 注册页页调用此函数改变复选框的样式
    checkStatus($(this))
})

// 是否阅读条约的样式与状态
function checkStatus(_this){
    // 对阅读复选框的状态取反
    checkSta = !checkSta
    if(checkSta){
        // 状态为true时添加样式
        _this.children('span').eq(0).children('input').attr({'checked': checkSta})
        _this.children('span').eq(0).children('span').addClass('span_active')
    }else{
        // 状态为false时清楚样式
        _this.children('span').eq(0).children('input').attr({'checked': checkSta})
        _this.children('span').eq(0).children('span').removeClass('span_active')
    }
}
// 对用户输入的id 手机号 邮箱 进行验证
function accountReg(_this){
    let field =  _this.parent().parent().parent()
    let val = _this.val()
    let account = /^[a-zA-Z_]\w{5,11}$/
    var phone = /^1[3-9]\d{9}$/;
    var email = /^\w+@\w+\.(com|cn|edu)$/;
    if(!account.test(val) && !phone.test(val) && !email.test(val) ){
        // 输入不规范时进行提示
        field.css({background: '#fcf2f3'}).siblings().html('ID，手机号，邮箱格式不正确')
        // 并改变用户名规范的状态为false
        _this.prop({'userSta': 'false'})
        // 当输入不规范时改变对应页面的按钮样式
        field.parent().siblings('button').addClass('submit_active')
        $('.register_submit').off('click')
        // 返回状态
        return _this.prop('userSta')
    }else{
        // 用户输入的id正确时改变状态为true
        _this.prop({'userSta': 'true'})
        // 返回状态
        return _this.prop('userSta')
    }
}
// 密码验证
function passwordReg(_this){
    let field =  _this.parent().parent().parent()
    let val = _this.val()
    let password = /^\w{6,12}$/
    if(!password.test(val)){
        field.css({background: '#fcf2f3'}).siblings().html('密码长度至少6位最长12位')
         // 并改变密码规范的状态为false
        _this.prop({'psdSta': false})
        // 当输入不规范时改变对应页面的按钮样式
        field.parent().siblings('button').addClass('submit_active')
        $('.register_submit').off('click')
        return _this.prop('psdSta')
    } else {
        // 用户输入的密码格式正确时改变状态为true
        _this.prop({'psdSta': true})
        return _this.prop('psdSta')
    }
}

function lnrSubmit(userSta,psdSta,result){
    if(userSta && psdSta && result =='login'){
        // 登录页时 用户输入都规范时 改变登录按钮样式成功
        $('.login_submit').off('click')
        $('.login_submit').on('click',function(){
             // 在登录页的阅读进行提示
            let sta = disabled($(this))
            ring($(this),sta)
        })
        $('.login_submit').removeClass('submit_active')
    }
    if(userSta && psdSta && result == 'register'){
         // 注册页时 用户输入都规范时 改变登录按钮样式成功
        $('.register_submit').off('click')
        console.log(2)
        $('.register_submit').on('click',function(){
            console.log(1)
            // 在注册页的阅读进行提示
            let sta = disabled($(this))
            sign($(this),sta)
        })
        $('.register_submit').removeClass('submit_active')
    }
}

// 防抖的状态
let antiShake = false

// 阅读条约注册或者登录时如果未勾选进行提示
function disabled(_this){
    if(antiShake) return false
    antiShake = true
    // 获取阅读复选框的状态
    let checkedStatus = _this.siblings('.login_terms').children().eq(0).children().children(':checked').attr('checked')
    let timer = null
    // 判断复选框状态不为true时
    if(!checkedStatus){
        clearTimeout(timer)
        // 进行用户未阅读的提示
        _this.siblings('.login_terms').children('.error').show()
        setTimeout(function(){
            _this.siblings('.login_terms').children('.error').hide()
            antiShake = false
        },2000)
    }else{
        // 状态成功时改回为false
        antiShake = false
        // 状态返回出去
        return checkedStatus
        
    }
}

    

async function sign(_this,sta){
    if(!sta) return false
    let password = _this.siblings('.login_password').children().children().children().children('input').val()
    let user = _this.siblings('.login_user').children().children().children().children('input').val()
    let {status,msg} = await new Promise((resolve, reject) => {
        $.ajax({
            type:'post',
            url:'../php/register.php',
            data:{
                password,
                user
            },
            success: function (result) {
                resolve(result)
            },
            error: function (err) {
                reject(err)
            }
        })
    })
    if(!status){
        $('.register_text').html('该账号已注册')
    }else{
        alert(msg)
    }
}

async function ring(_this,sta){
    if(!sta) return false
    let password = _this.siblings('.login_password').children().children().children().children('input').val()
    let user = _this.siblings('.login_user').children().children().children().children('input').val()
    let {status,msg} = await new Promise((resolve, reject) => {
        $.ajax({
            type:'post',
            url:'../php/login.php',
            data:{
                password,
                user
            },
            success: function (result) {
                resolve(result)
            },
            error: function (err) {
                reject(err)
            }
        })
    })
    if(!status){
        $('.psd_text').html(msg)
    }else{
        location.href = '../HTML/main.html'
        setCookie("lgc", user, 7);
    }
}