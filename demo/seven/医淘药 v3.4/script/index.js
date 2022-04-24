/*
 *   经过焦点图后显示顶部搜索
 *
 * */

$(window).scroll(showTopSearch);

function showTopSearch(){

    var totalContainer = $('#total-container');

    var sTop = $(window).scrollTop();

    var recommend = $('#recommend').offset().top;

    if(sTop<recommend){

        totalContainer.slideUp("500");
        totalContainer.removeClass('show');
    }
    if(sTop>=recommend){

        totalContainer.addClass('show');
        totalContainer.slideDown("500");

    }

}

showTopSearch();