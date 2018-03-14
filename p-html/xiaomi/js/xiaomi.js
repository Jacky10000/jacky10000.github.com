$(function () {
 	var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        slidesPerView: 1,
        paginationClickable: true,
        loop: true,
        effect:"fade"
    });
	
	
	
	
	
	//顶部区域购物车的动态效果
	$("#topbarCart").hover(function () {
		$("#topbarCart > div").eq(0).css({
			color:"#FF6700",
			backgroundColor:"white"
		})
		$("#topbarCart > div").eq(1).stop().slideDown("fast")
	},function () {
		$("#topbarCart > div").eq(0).css({
			color:"#b0b0b0",
			backgroundColor:"#424242"
		})
		$("#topbarCart > div").eq(1).stop().slideUp("fast")
	})
	
	//头部区域搜索框的动态效果
	$("#headerSearchText").focus(function () {
		$("#headerSearchList").show();
		$(this).css({
			borderColor:"#ff6700"
		}).next().css({
			borderColor:"#ff6700"
		})
	})
	
	$("#headerSearchText").blur(function () {
		$("#headerSearchList").hide();
		$(this).css({
			borderColor:"#e0e0e0"
		}).next().css({
			borderColor:"#e0e0e0"
		})
	})		
	
	//头部导航栏的效果
	var headerT,hedaerNavT;
	$("#hedaerNav>li").hover(function () {
		clearTimeout(headerT)
		$index = $(this).index();
		$("#headerNavList>div").eq($index).css("display","flex").siblings().css("display","none");
	},function () {
		headerT = setTimeout(function () {
			$("#headerNavList>div").eq($index).css("display","none");
		},400)
	})
	
	$("#hedaerNav").hover(function () {
		$("#headerNavListBox").stop().slideDown();
	},function () {
		hedaerNavT = setTimeout(function () {
			$("#headerNavListBox").stop().slideUp();
		},200)
	})	
	
	$("#headerNavListBox").hover(function () {
		clearTimeout(hedaerNavT);
		clearTimeout(headerT)
	},function () {
		$("#headerNavListBox").stop().slideUp();
	})	
	
	
	
//	轮播区菜单的动态效果
	var homeMenuT;
	$("#homeMenu>a").hover(function () {
		clearTimeout(homeMenuT);
		$index = $(this).index();
		$("#homeMenuBox>li").eq($index).css("display","flex").siblings().css("display","none");
	},function () {
		homeMenuT= setTimeout(function () {
			$("#homeMenuBox>li").eq($index).css("display","none");
		},200)
	})
	
	$("#homeMenuBox>li").hover(function () {
		clearTimeout(homeMenuT);
	},function () {
		$(this).css("display","none");
	})
	
//	明星商品区域
	$("#homeStarRight").click(function () {
		$("#homeStarMove").animate({
			left:"-1226px"
		})
		$(this).css({
			color:"#e0e0e0",
			cursor:"default"
		}).removeClass("active").siblings().css({
			color:"#888",
			cursor:"pointer"
		}).addClass("active")
	})
	
	$("#homeStarLeft").click(function () {
		$("#homeStarMove").animate({
			left:"0px"
		})
		$(this).css({
			color:"#e0e0e0",
			cursor:"default"
		}).removeClass("active").siblings().css({
			color:"#888",
			cursor:"pointer"
		}).addClass("active")
	})	
	
	
//	搭配区域的动态效果
	$("#siteMatchToggle>a").mouseenter(function () {
		$index=$(this).index();
		$(".site-match-box-right").eq($index).addClass("site-match-box-default").siblings().removeClass("site-match-box-default");
	})
	
	
//	内容区域的轮播效果

	$("#contentRight1").click(function () {
		if($("#siteContentMove1").is(":animated")){
			return;
		}
		$left = parseInt($("#siteContentMove1").css("left"));
		if($left>-592){
			$left = $left-296;
			$("#siteContentMove1").animate({
				left:$left
			},600)
			if($left==0){
				$(".content-page span").eq(0).css({backgroundColor:"red"}).siblings().css({backgroundColor:"gray"})
			}else if($left==-296){
				$(".content-page span").eq(1).css({backgroundColor:"red"}).siblings().css({backgroundColor:"gray"})
			}else{
				$(".content-page span").eq(2).css({backgroundColor:"red"}).siblings().css({backgroundColor:"gray"})}
		}
	})
	$("#contentLeft1").click(function () {
		if($("#siteContentMove1").is(":animated")){
			return;
		}
		$left = parseInt($("#siteContentMove1").css("left"));
		console.log($left)
		if($left<0){
			$left = $left+296;
			$("#siteContentMove1").animate({
				left:$left
			},600)
			if($left==0){
				$(".content-page span").eq(0).css({backgroundColor:"red"}).siblings().css({backgroundColor:"gray"})
			}else if($left==-296){
				$(".content-page span").eq(1).css({backgroundColor:"red"}).siblings().css({backgroundColor:"gray"})
			}else{
				$(".content-page span").eq(2).css({backgroundColor:"red"}).siblings().css({backgroundColor:"gray"})}
		}
	})	
	
	
	
	
})
