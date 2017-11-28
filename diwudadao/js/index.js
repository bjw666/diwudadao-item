//购物车展示
/*$.ajax({
	"url":"http://h6.duchengjiu.top/shop/api_cart.php?token="+localStorage.getItem("token"),
	"type":"GET",
	"dataType":"json",
	"success":function(response){
		console.log(response);
		for(var i = 0;i < response.data.length;i++){
			$("#cart-good")append('<li><img src="'+response.data[i].goods_thumb+'"><p>'+ response.data[i].goods_name +'</p></li>')
		}
		var num = response.data.length;
		$("#cartNav").text("购物车("+num+")");
	}
})*/

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
//商品列表
$.get("http://h6.duchengjiu.top/shop/api_cat.php",function(response){
	console.log(response);
	var obj = response;
	for(var i=0;i<obj.data.length;i++){
		$("#index-list").append('<li class = "alone-list"><a href="list-details.html?cat_id='+obj.data[i].cat_id+'">' + obj.data[i].cat_name + '</a></li>');
				
	}
})

var str = location.search.substr(1);
var catId = str.split("=");
console.log(catId); 
$.ajax({
		"url": "http://h6.duchengjiu.top/shop/api_goods.php",
		"type": "GET",
		"data": {
			"cat_id": catId[1]
		},
		"dataType": "json",
		"success": function(response){
//				console.log(response);
			var obj = response;
			for(var i=0;i<obj.data.length;i++){
				$("#goodList").append('<li><img src="' + obj.data[i].goods_thumb + '" alt="" /><p><a href="bigger.html='+obj.data[i].goods_id+'">商品名称:' +obj.data[i].goods_name+ '</a></p><p>商品简介:' +obj.data[i].goods_desc+  '</p><p class="price">商品价格:￥' +obj.data[i].price+  '</p></li>');
				}
			}	
		})
	

//家居
$.ajax({
			"url": "http://h6.duchengjiu.top/shop/api_goods.php?page=1&pagesize=8",
			"type": "GET",
			"data": {
				"cat_id": 45
			},
			"dataType": "json",
			"success": function(response){
				var obj = response;
				console.log(obj);
				for(var i=0;i<obj.data.length;i++){
//					console.log(i);
					$(".home-good").append('<div class="col-sm-6 col-md-4 col-lg-3 shop-goodList"><div class="thumbnail list-thumb"><img src="' + obj.data[i].goods_thumb + '" alt="" /><div class="imgcover"><p class="price">￥' +obj.data[i].price+  '</p><p class="oBtn"><a href="cart.html" class="btn btn-primary" role="button">加入购物车</a></p><h3 class="shop-name"><a href="bigger.html?goods_id='+obj.data[i].goods_id+'">' +obj.data[i].goods_name+ '</a></h3><p class="shop-desc">' +obj.data[i].goods_desc+  '</p></div></div></div>')
			    	
				}
			}
		})
//家具
$.ajax({
			"url": "http://h6.duchengjiu.top/shop/api_goods.php?page=1&pagesize=8",
			"type": "GET",
			"data": {
				"cat_id": 55
			},
			"dataType": "json",
			"success": function(response){
				var obj = response;
				console.log(obj);
				for(var i=0;i<obj.data.length;i++){
//					console.log(i);
					$(".furniture").append('<div class="col-sm-6 col-md-4 col-lg-3 shop-goodList"><div class="thumbnail list-thumb"><img src="' + obj.data[i].goods_thumb + '" alt="" /><div class="imgcover"><p class="price">￥' +obj.data[i].price+  '</p><p class="oBtn"><a href="cart.html" class="btn btn-primary" role="button">加入购物车</a></p><h3 class="shop-name"><a href="bigger.html?goods_id='+obj.data[i].goods_id+'">' +obj.data[i].goods_name+ '</a></h3><p class="shop-desc">' +obj.data[i].goods_desc+  '</p></div></div></div>')
			    	
				}
			}
		})
//文具
$.ajax({
			"url": "http://h6.duchengjiu.top/shop/api_goods.php?page=1&pagesize=8",
			"type": "GET",
			"data": {
				"cat_id": 62
			},
			"dataType": "json",
			"success": function(response){
				var obj = response;
				console.log(obj);
				for(var i=0;i<obj.data.length;i++){
//					console.log(i);
					$(".stationery").append('<div class="col-sm-6 col-md-4 col-lg-3 shop-goodList"><div class="thumbnail list-thumb"><img src="' + obj.data[i].goods_thumb + '" alt="" /><div class="imgcover"><p class="price">￥' +obj.data[i].price+  '</p><p class="oBtn"><a href="cart.html" class="btn btn-primary" role="button">加入购物车</a></p><h3 class="shop-name"><a href="bigger.html?goods_id='+obj.data[i].goods_id+'">' +obj.data[i].goods_name+ '</a></h3><p class="shop-desc">' +obj.data[i].goods_desc+  '</p></div></div></div>')
			    	
				}
			}
		})
//数码
$.ajax({
			"url": "http://h6.duchengjiu.top/shop/api_goods.php?page=1&pagesize=8",
			"type": "GET",
			"data": {
				"cat_id": 69
			},
			"dataType": "json",
			"success": function(response){
				var obj = response;
				console.log(obj);
				for(var i=0;i<obj.data.length;i++){
//					console.log(i);
					$(".digital").append('<div class="col-sm-6 col-md-4 col-lg-3 shop-goodList"><div class="thumbnail list-thumb"><img src="' + obj.data[i].goods_thumb + '" alt="" /><div class="imgcover"><p class="price">￥' +obj.data[i].price+  '</p><p class="oBtn"><a href="cart.html" class="btn btn-primary" role="button">加入购物车</a></p><h3 class="shop-name"><a href="bigger.html?goods_id='+obj.data[i].goods_id+'">' +obj.data[i].goods_name+ '</a></h3><p class="shop-desc">' +obj.data[i].goods_desc+  '</p></div></div></div>')
			    	
				}
			}
		})
//玩乐
$.ajax({
			"url": "http://h6.duchengjiu.top/shop/api_goods.php?page=1&pagesize=8",
			"type": "GET",
			"data": {
				"cat_id": 77
			},
			"dataType": "json",
			"success": function(response){
				var obj = response;
				console.log(obj);
				for(var i=0;i<obj.data.length;i++){
//					console.log(i);
					$(".ploy").append('<div class="col-sm-6 col-md-4 col-lg-3 shop-goodList"><div class="thumbnail list-thumb"><img src="' + obj.data[i].goods_thumb + '" alt="" /><div class="imgcover"><p class="price">￥' +obj.data[i].price+  '</p><p class="oBtn"><a href="cart.html" class="btn btn-primary" role="button">加入购物车</a></p><h3 class="shop-name"><a href="bigger.html?goods_id='+obj.data[i].goods_id+'">' +obj.data[i].goods_name+ '</a></h3><p class="shop-desc">' +obj.data[i].goods_desc+  '</p></div></div></div>')
			    	
				}
			}
		})
//厨卫
$.ajax({
			"url": "http://h6.duchengjiu.top/shop/api_goods.php?page=1&pagesize=8",
			"type": "GET",
			"data": {
				"cat_id": 82
			},
			"dataType": "json",
			"success": function(response){
				var obj = response;
				console.log(obj);
				for(var i=0;i<obj.data.length;i++){
//					console.log(i);
					$(".kitchen").append('<div class="col-sm-6 col-md-4 col-lg-3 shop-goodList"><div class="thumbnail list-thumb"><img src="' + obj.data[i].goods_thumb + '" alt="" /><div class="imgcover"><p class="price">￥' +obj.data[i].price+  '</p><p class="oBtn"><a href="cart.html" class="btn btn-primary" role="button">加入购物车</a></p><h3 class="shop-name"><a href="bigger.html?goods_id='+obj.data[i].goods_id+'">' +obj.data[i].goods_name+ '</a></h3><p class="shop-desc">' +obj.data[i].goods_desc+  '</p></div></div></div>')
			    	
				}
			}
		})
//美食
$.ajax({
			"url": "http://h6.duchengjiu.top/shop/api_goods.php?page=1&pagesize=8",
			"type": "GET",
			"data": {
				"cat_id": 92
			},
			"dataType": "json",
			"success": function(response){
				var obj = response;
				console.log(obj);
				for(var i=0;i<obj.data.length;i++){
//					console.log(i);
					$(".cate").append('<div class="col-sm-6 col-md-4 col-lg-3 shop-goodList"><div class="thumbnail list-thumb"><img src="' + obj.data[i].goods_thumb + '" alt="" /><div class="imgcover"><p class="price">￥' +obj.data[i].price+  '</p><p class="oBtn"><a href="cart.html" class="btn btn-primary" role="button">加入购物车</a></p><h3 class="shop-name"><a href="bigger.html?goods_id='+obj.data[i].goods_id+'">' +obj.data[i].goods_name+ '</a></h3><p class="shop-desc">' +obj.data[i].goods_desc+  '</p></div></div></div>')
			    	
				}
			}
		})
//童装
$.ajax({
			"url": "http://h6.duchengjiu.top/shop/api_goods.php?page=1&pagesize=8",
			"type": "GET",
			"data": {
				"cat_id": 125
			},
			"dataType": "json",
			"success": function(response){
				var obj = response;
				console.log(obj);
				for(var i=0;i<obj.data.length;i++){
//					console.log(i);
					$(".kidSwear").append('<div class="col-sm-6 col-md-4 col-lg-3 shop-goodList"><div class="thumbnail list-thumb"><img src="' + obj.data[i].goods_thumb + '" alt="" /><div class="imgcover"><p class="price">￥' +obj.data[i].price+  '</p><p class="oBtn"><a href="cart.html" class="btn btn-primary" role="button">加入购物车</a></p><h3 class="shop-name"><a href="bigger.html?goods_id='+obj.data[i].goods_id+'">' +obj.data[i].goods_name+ '</a></h3><p class="shop-desc">' +obj.data[i].goods_desc+  '</p></div></div></div>')
			    	
				}
			}
		})
//回到顶部
$("#top").click(function(){
	$("body,html").animate({scrollTop: 0})
})



