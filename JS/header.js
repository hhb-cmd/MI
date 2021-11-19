// 购物车导航显示与隐藏
let timer = null
$('.top_bar_shopping').hover(function(){
    $(this).addClass('active')
    $(this).find('.cart_menu').css({height: 80})
    timer&&clearTimeout(timer)
},function(){
    timer = setTimeout(()=>{
        $(this).removeClass('active')
    },400)
    $(this).find('.cart_menu').css({height: 0})
})
// logo鼠标按下时缩小
$('.header_bar_logo').mousedown(function(){
    $(this).css({
        transform:'scale(0.85,0.85)'
    }).find('i').css({transform:'scale(0.85,0.85)'})
})
// logo鼠标松开时恢复
$('.header_bar_logo').mouseup(function(){
    $(this).css({
        transform:'scale(1,1)'
    }).find('i').css({transform:'scale(1,1)'})
})

// 搜索框边框线
$(':text').focus(function(){
    $(this).siblings('input').css({border:'#ff6700 solid 1px'}).siblings('div').css({display:'block'})
})

$(document).click(function(e){
    if(e.target.classList[0] == 'blur_list' || e.target.classList[0] == 'search_blur' ){
        console.log(e.target.classList[0] == 'blur_list')
    }else{
        $('.search_btn').css({border:'#e0e0e0 solid 1px'})
        $('.box_blur').css({display:'none'})
    }
})

let arr = ['手机','耳机','加湿器','空调','红米','净水机','显示器']
let index = 1

// 搜索空下方结构渲染
$(function(){
    let html = ''
    arr.forEach(function(item){
        html += `<li class="blur_list">${item}</li>`
    })
    $('#arr').html(html)
    // 搜索框定时切换内容
    setInterval(() => {
        index>arr.length ? index=1 : index++
        $(':text').prop({placeholder:arr[index]})
    }, 3000);
}())
// banner添加索引
$('.header_banner li').each((index) =>{
    $('.header_banner li').eq(index).attr({'data-index': index})
    
})

// banner hover 效果
$('.header_banner li').mouseover(function() {
    let index = $(this).attr('data-index')
    $(this).find('a').css({color: '#ff6700'}).parent().siblings().find('a').css({color: '#333'})
    if(index < 7){
        $('.header_bar_menu').height('229px').css({borderTop:'1px solid #e0e0e0'})
    }else{
        $('.header_bar_menu').height(0).css({borderTop:0})
    }
    $('.header_bar_menu').mouseout(() =>{
        $(this).find('a').css({color: '#333'})
    })
})

$('.header_bar_menu').mouseout(function(event) {
    $('.header_bar_menu').height(0).css({borderTop:0})
})
$('.top_bar').mouseover(function() {
    $('.header_bar_menu').height(0).css({borderTop:0})
})

$('#arr li').click(function(){
    let text = $(this).html()
    skipList(text)
})

$(':submit').click(function(){
    let val = $(this).siblings().val()
    skipList(val)
})

function skipList(val){
    $('.search_btn').css({border:'#e0e0e0 solid 1px'})
    $('.box_blur').css({display:'none'})
    console.log(val)
    location.href = `../HTML/list.html?${encodeURIComponent(val)}`
}

// 轮播图
let num = 0
let time
let $img = $("#swiper_index img");
let $dot = $(".swiper_radio a");
let flag = false
$("#swiper_index img").hide().eq(0).show();
function voluntarily() {
    clearInterval(time)
    time = setInterval(() => {
        num++
        play()
    }, 3000);
}
voluntarily()
function play() {
    num = num % $img.length;
    $img.eq(num).stop().fadeIn(800,function() {
        flag = false
    }).siblings().fadeOut(800);
    $dot.eq(num).addClass("active").siblings().removeClass("active");
}
$('.swiper_wrapper').hover(function() {
        clearInterval(time);        
    },function() {
        voluntarily();    
    });
$('.swiper_left').click(function () {
    if(flag) return false
        flag = true
        num--;
        play();
})
$('.swiper_right').click(function () {
    if(flag) return false
    flag = true
    num++;
    play();
})
$dot.click(function () {
    let index = $(this).index();
    num = index;
    $img.eq(num).stop().fadeIn(800).siblings().fadeOut(800);
    $dot.eq(num).addClass("active").siblings().removeClass();
})

$('.login_a').click(function(){
    location.href = `../HTML/login.html?name=login`
})
$('.register_a').click(function(){
    location.href = `../HTML/login.html?name=register`
})

let cookie = document.cookie;
    if (cookie) {
        var lgc = getCookie("lgc");
        if (lgc) {
            $('.login_a').hide().siblings('.x').hide()
            $('.register_a').hide()
            console.log(1)
            $('.my').show()
            $('.user span').html(lgc)
            $('.exit').click(function(){
                deleteCookie("lgc");
                location.reload();
            })
        }
    }else{
        $('.my').hide()
        $('.user').hide()
    }