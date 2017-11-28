
//商品列表
$.get("http://h6.duchengjiu.top/shop/api_cat.php",function(response){
//	console.log(response);
	var obj = response;
	for(var i=0;i<obj.data.length;i++){
		$("#index-list").append('<li class = "alone-list"><a href="list-details.html?goods_id='+obj.data[i].cat_id+'">' + obj.data[i].cat_name + '</a></li>');
				
	}
})
//通过url内容，得到分类id，查询分类商品，并展示到页面中
	var str = location.search.substr(1);
	
	var catId = str.split("=");
	
	console.log(catId);  //69是数组的下标1
		
// 信号量
var page = 1;
	showShop(page);
	
	
function showShop(page){
	$.ajax({
		"url": "http://h6.duchengjiu.top/shop/api_goods.php?page=" +page+ "&pagesize=60",
		"type": "GET",
		"data": {
			"cat_id": catId[1]
		},
		"dataType": "json",
		"success": function(response){
			
			var obj = response;
		
			for(var i=0;i<obj.data.length;i++){
				
				$("#goodList").append('<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 shop-goodList"><div class="thumbnail list-thumb"><img src="' + obj.data[i].goods_thumb + '" alt="" /><div class="imgcover"><p class="price">￥' +obj.data[i].price+  '</p><p class="oBtn"><a href="cart.html" class="btn btn-primary" role="button">加入购物车</a></p><h3 class="shop-name"><a href="bigger.html?goods_id='+obj.data[i].goods_id+'">' +obj.data[i].goods_name+ '</a></h3><p class="shop-desc">' +obj.data[i].goods_desc+  '</p></div></div></div>')
		    	
			}
			//分页
			for(var j=0;j<response.page.page_count;j++){
				$("#ButtonCenter").append( $('<span>'+(j+1)+'</span>') );
				
			}
		}
	})
}

	$("#ButtonPrev").click(function(){
		//信号量增加
		page--;
		//范围
		if(page <= 1) page = 1;
		//清空数据
		$("#goodList").html("");
		$("#ButtonCenter").html('');
		showShop(page);
		
		ButtonCenter.style.marginLeft = (page-1)* -52 + "px";
	})
	
	$("#ButtonNext").click(function(){
		//信号量增加
		page++;
		//范围
		
		//清空数据
		$("#goodList").html("");
		$("#ButtonCenter").html('');
		showShop(page);
		
		ButtonCenter.style.marginLeft = (page-1)* -52 + "px";
	})
	
	//分页的点击事件
	$("#ButtonCenter").click(function(event){
		event = event || window.event;
		var target = event.target || event.srcElement;
//				console.log(target.nodeName)
		if( target.nodeName === "SPAN" ){
			//得到当前分页的内容，存入信号量
			page = target.innerText;
			$("#goodList").html('');
			$("#ButtonCenter").html('');
			ButtonCenter.style.marginLeft = (page-1) * -52 +"px";
			showShop(page);
			
		}
		
		
	})
	$()
//回到顶部
$("#top").click(function(){
	$("body,html").animate({scrollTop: 0})
})
if(localStorage.username){
	  		var html=""
			$("#zhuxiao").css("display","block")
			$(".login1").css("color","white")
                          
			$(".login1").html('<a href="index.html">'+localStorage.username+'</a>')

			console.log($(".login1"))
			}
var oDiv=document.getElementById("zhuxiao");
		oDiv.onclick=function(){
			localStorage.clear()
		}