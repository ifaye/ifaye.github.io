/*
 *   回到顶部
 *
 * */
function goTop(Who,Speed){

    Who.click(function(){
        $('body,html').animate({scrollTop:0},Speed)
    })
}




/*
 *   鼠标经过显示，离开隐藏
 *
 * */
function onlyHover(Who){

    Who.hover(function(){

        $(this).addClass("cur");

    },function(){

        $(this).removeClass("cur");
    });
}




/*
 *   主页类左侧导航分类鼠标经过显示右侧子菜单
 *
 * */
function navShow(Nav,NavSon){

    Nav.find(NavSon).each(function() {

        $(this).hover(function () {

            $(this).addClass("cur").siblings().removeClass("cur");

        }, function () {

            $(this).removeClass("cur");

        });
    });
}




/*
 *   鼠标经过切换子区域
 *
 * */
function hoverTab(Nav,NavSon,Cont,ContSon){

    Nav.find(NavSon).each(function(i){

        $(this).hover(function(){

            $(this).addClass("cur").siblings().removeClass("cur");
            Cont.find(ContSon).siblings().removeClass("cur").eq(i).addClass("cur");

        });

    });

}




/*
 *     平移式或闪光式焦点图效果(适合区域切换)
 *
 *      indexPage   初始化 第一页
 *      xyz         x是x轴方向平移,y是y轴方向平移,z是闪光弹
 *      who         谁要偏移(ul)(获取id或class)
 *      whoSon      谁的儿子(li)(获取id或class)
 *      isPN        是否有上下页切换按钮(1是,0否,2.鼠标经过图片才显示)
 *      Prev        上一页按钮(获取id或class)
 *      Next        下一页按钮(获取id或class)
 *      isSL        是否有底部Slider(1是,0否)
 *      slider      底部Slider(获取id或class)
 *      slSon       底部Slider的儿子(获取id或class)
 *      isNUM       是否显示页码(1是,0否)
 *      nowNUM      当前页码(获取id或class)
 *      allNUM      总页码(获取id或class)
 *      onePage     一页多少个儿子
 *      OfferTo     偏移位移(px)
 *      Speed       偏移速度(1000为一秒)
 *      Auto        是否自动播放(1自动,0否)
 *      AutoSpeed   自动轮播速度(1000为一秒)(要加上偏移速度,否则重叠)
 *
 * */

function TabLT(indexPage,xyz,who,whoSon,isPN,Prev,Next,isSL,slider,slSon,isNUM,nowNUM,allNUM,onePage,OfferTo,Speed,Auto,AutoSpeed){

    var indexPageDefault = indexPage;

    var listNum = whoSon.length;//计算总儿子数

    var allPage = Math.ceil(listNum/onePage);//计算出总页数

    if(isNUM){

        allNUM.html(allPage);
    }

    if(Auto){

        var AutoChange = setInterval(function(){

            if(indexPage<allPage){

                indexPage++;

            }else{

                indexPage = indexPageDefault;
            }

            changeTo(indexPage,OfferTo,Speed,xyz);

        },AutoSpeed);

        whoSon.each(function(){

            $(this).hover(function(){

                clearInterval(AutoChange);

                if(isPN==2){

                    Prev.css("display","block");
                    Next.css("display","block");

                }

            },function(){

                AutoChangeAgain();

               if(isPN==2){

                    Prev.css("display","none");
                    Next.css("display","none");

                }

            });

        });

        if(isPN){

            Prev.hover(function(){

                Prev.css("display","block");
                Next.css("display","block");
                clearInterval(AutoChange);

            },function(){

                Prev.css("display","none");
                Next.css("display","none");
                AutoChangeAgain();

            });

            Next.hover(function(){

                Prev.css("display","block");
                Next.css("display","block");
                clearInterval(AutoChange);

            },function(){

                Prev.css("display","none");
                Next.css("display","none");
                AutoChangeAgain();

            });

        }

        if(isSL){

            slider.find(slSon).each(function(item){

                $(this).hover(function(){

                    clearInterval(AutoChange);

                    var indexPage1 = item+1;

                    changeTo(indexPage1,OfferTo,Speed,xyz);

                    indexPage = indexPage1;

                },function(){

                    AutoChangeAgain();

                });
            });

        }

        function AutoChangeAgain(){

            AutoChange = setInterval(function(){

                if(indexPage<allPage){

                    indexPage++;

                }else{

                    indexPage = 1;
                }

                changeTo(indexPage,OfferTo,Speed,xyz);

            },AutoSpeed);

        }

    }

    if(isPN){

        Prev.click(function(){

            indexPage = (indexPage > 1) ? (indexPage - 1) : allPage;

            changeTo(indexPage,OfferTo,Speed,xyz);
        });


        Next.click(function(){

            indexPage = (indexPage < allPage) ? (indexPage + 1) : 1;

            changeTo(indexPage,OfferTo,Speed,xyz);
        });
    }

    if(isSL){

        slider.find(slSon).each(function(item){

            $(this).hover(function(){

                var indexPage1 = item+1;

                changeTo(indexPage1,OfferTo,Speed,xyz);

                indexPage = indexPage1;
            });
        });

    }

    function changeTo(indexPage,OfferTo,Speed,xyz){

        var goTL = (indexPage-1) * OfferTo;

        var Tl = xyz;

        if(Tl=="x"){

            who.animate({marginLeft: "-" + goTL + "px"},Speed);

        }

        if(Tl=="y"){

            who.animate({marginTop: "-" + goTL + "px"},Speed);
        }

        if(Tl=="z"){

            whoSon.eq(indexPage-1).animate({ zIndex:'1', opacity:'1'},500).siblings().animate({ zIndex:'0', opacity:'0'},500);

        }

        if(isSL){

            slider.find(slSon).removeClass("cur").eq(indexPage-1).addClass("cur");
        }

        if(isNUM){

            nowNUM.html(indexPage);

        }

    }
}