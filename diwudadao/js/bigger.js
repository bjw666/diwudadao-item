$(function(){
	// 获取地址传递的goods_id信息
	var str = window.location.search.substr(1);
	// 字符串截取数组
	var goodsIdArr = str.split("=");
	// 获取商品id信息
	var goodsId = goodsIdArr[1];
//	console.log(goodsId);
	$.ajax({
		"url": "http://h6.duchengjiu.top/shop/api_goods.php?goods_id=" + goodsId,
		"type": "GET",
		"dataType": "json",
		"success": function(response){
//			 console.log(response);
			$(".one-shopping").html(`<div class="container-fluid one-shopping">
										<ul class="row one-box" id="one-box">
						  					<li class="col-lg-4 col-md-6 col-sm-12 left-pic">
						  						<div class="detail-img">
						  							<img src="${response.data[0].goods_thumb}" />
						  							<div class="detail-zoom"></div>
						  						</div>
						  						<div class="bigImg">
						  							<img src="${response.data[0].goods_thumb}" />
						  						</div>
						  					</li>
						  					<li class="col-lg-4 col-md-6 col-sm-12 detail-show">
						  						<h3 class="one-name">${response.data[0].goods_name}</h3>
						  						<p class="one-dec">${response.data[0].goods_desc}</p>
						  						<p class="one-price">价格：<span>￥${response.data[0].price}元</span></p>
						  						<div class="one-count">
						  							数量：
						  							<button class="btnMinus">-</button>
						  							<input class="center" type="text" value="1"/>
						  							<button class="btnAdd">+</button>
						  						</div>
						  						<div class="buy">立即购买</div>
						  						<div class="addCart"><span><img src="img/v30cart.png"/>添加购物袋</span></div>
						  					</li>
						  					<li class="col-lg-4 col-md-12 col-sm-12 detail-hobby">
						  						<h5>猜你喜欢</h5>
						  						<ul class="hobby-ul" catId="${response.data[0].cat_id}"></ul>
						  					</li>
										</ul>
									</div>
									`)
			// 放大镜效果
			var detailImg = document.getElementsByClassName("detail-img")[0];
			var detailZoom = document.getElementsByClassName("detail-zoom")[0];
			var bigImg = document.getElementsByClassName("bigImg")[0];
			var oImg = bigImg.getElementsByTagName("img")[0];
			
			// 大图720*720 div360*360
			// 小图 盒子360*360  放大镜180*180
			// 所以放大镜总移动量 160    大图可移动量 360
			// rate计算的比例
			var rate = 360 / 180;
			
			// 鼠标移入商品显示，放大镜
			detailImg.onmouseover = function(){
				detailZoom.style.display = "block";
				bigImg.style.display = "block";
			}
			// 鼠标移出，商品隐藏
			detailImg.onmouseout = function(){
				detailZoom.style.display = "none";
				bigImg.style.display = "none";
			}
			// 鼠标移动事件监听
			detailImg.onmousemove = function(event){
				// 兼容性处理
				var event = event || window.event;
				
				//得到页面的卷动值
				var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
				var scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
				
				
				var x = event.clientX - (getAllLeft(detailImg) -scrollLeft )-90;
				var y = event.clientY - (getAllTop(detailImg) -scrollTop )-90;
				
				if(x < 0) x = 0;
				if(y < 0) y = 0;
				if(x > 180) x = 180;
				if(y > 180) y = 180;
				
				detailZoom.style.left = x + "px";
				detailZoom.style.top = y + "px";
				
				// 让大图移动
				oImg.style.left = -x * rate + "px";
				oImg.style.top = -y * rate + "px";	
			}
			
			
			var leftButton = document.getElementsByClassName("btnMinus")[0];
			var rightButton = document.getElementsByClassName("btnAdd")[0];
			var centerButton = document.getElementsByClassName("center")[0];
			
			// 减号按钮监听事件
			leftButton.onclick = function(){
				if(centerButton.value <= 1){
					centerButton.value = 1;
					return ;
				}
				centerButton.value--;
			}
			// 加号按钮监听事件
			rightButton.onclick = function(){
				if(centerButton.value >= 20){
					centerButton.value = 20;
					return ;
				}
				centerButton.value++;
			}	
			
			// 点击添加购物车效果
			var addCart = document.getElementsByClassName("addCart")[0];
			
			$(addCart).click(function(){
//				console.log(this);
				addCartShop(this);
//添加购物车
				$.ajax({
					"url":"http://h6.duchengjiu.top/shop/api_cart.php",
					"type":"GET",
					"datatype":"json",
					success:function(response){
						var obj = response;
						alert("1")
						for (var i = 0; i < obj.data.length; i++) {
							$("#cart-good").append('<li class="dropdown-menu-li"><img src="'
						         		+obj.data.goods_thumb+
						         		'"/ style="width: 50px;height: 50px;"><p>'
						         		+obj.data.goods_name+
						         		'</p></li>')
						}
					}
				})

			})
			
			
			var hobbyUl = document.getElementsByClassName("hobby-ul")[0];
			(function HobbyList(){
				addHobbyList(hobbyUl);
			})();
			
		}
		
	})
	
	//返回这个元素在页面的净位置
	function getAllTop(obj){
		//累加器
		//一会while开始，是从它父级累加
		var allTop = obj.offsetTop;
		//当前正在计算高度的元素
		var currentObj = obj;
		while(currentObj = currentObj.offsetParent){
			allTop += currentObj.offsetTop;
		}
		return allTop;
	}
	
	//返回这个元素在页面的净位置
	function getAllLeft(obj){
		//累加器
		//一会while开始，是从它父级累加
		var allLeft = obj.offsetLeft;
		//当前正在计算高度的元素
		var currentObj = obj;
		while(currentObj = currentObj.offsetParent){
			allLeft += currentObj.offsetLeft;
		}
		return allLeft;
	}
	
	function addCartShop(obj){
//		console.log(obj);
		// 判断当前是否为登录状态,不登录无法添加购物车 
		if(!localStorage.token){
			// 提示用户，并跳转到登录页面，把当前路径发送给登录页面
			alert("请登录后才能加入购物车!");
			window.location.href = "login.html#callback="+window.location.href;
		}
		var detailShow = obj.parentNode;
		var centerButton = detailShow.getElementsByClassName("center")[0];
		
		// 获取本地商品数量
		var goodsNumber = localStorage.getItem("cart"+goodsId);
		
		// 得到商品数量  如果有 则是买过！让之前的数量+1  如果没有就是第一次购买，那么数量是1
		goodsNumber = goodsNumber? parseInt(goodsNumber)+parseInt(centerButton.value) : centerButton.value;
		console.log(goodsNumber);
		
		// 数据存储进账号
		$.ajax({
			"url": "http://h6.duchengjiu.top/shop/api_cart.php?token=" + localStorage.getItem("token"),
			"type": "POST",
			"data": {
				"goods_id": goodsId,
				"goods_number": goodsNumber,
			},
			"dataType": "json",
			"success": function(response){
				console.log(response);
				// 成功后存储本地信息
				localStorage.setItem("cart"+goodsId, goodsNumber);
				// 跳转到购物车页面
				location.href = "cart.html";
			}
		})
	}
	
	// 猜你喜欢
	function addHobbyList(obj){
		
		var catId = $(obj).attr("catId");
		
		
		$.ajax({
			"url": "http://h6.duchengjiu.top/shop/api_goods.php?page=3&pagesize=4",
			"type": "GET",
			"data": {
				"cat_id": catId,
			},
			"dataType": "json",
			"success": function(response){
				console.log(response);
				for(var i = 0; i < response.data.length; i++){
					
					obj.innerHTML += `<li class="hobby-list"><a href="bigger.html?goods_id=${response.data[i].goods_id}">
											<img src="${response.data[i].goods_thumb}">
										</a>
										<h5 class="list-goods-name"><a href="bigger.html?goods_id=${response.data[i].goods_id}">${response.data[i].goods_name}</a></h5>
										<p class="list-goods-price">价格:<span>￥${response.data[i].price}元</span></p>
									</li>`
				}
				console.log(obj.innerHTML);					
			}
		})
	}
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
	
	

	
	
	
	
	
	
	
	
	
	
	
})
