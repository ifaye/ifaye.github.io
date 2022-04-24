/*
 *   经过焦点图后显示顶部搜索
 *
 * */

$(window).scroll(showTopSearch);

function showTopSearch(){

    var cartPay1 = $('#cartPay1');

    var sTop = $(window).scrollTop();

    var cartPay = $('#cartPay').offset().top;

    var windowsHeight = $(window).height();

    var Who = cartPay-windowsHeight+60;

    if(sTop>=Who){

        cartPay1.css("display","none");

    }

    if(sTop<Who){

        cartPay1.css("display","block");

    }


}

showTopSearch();
