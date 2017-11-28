var address_id = 0;
			
addressAjax();
function addressAjax(){
	
	$.ajax({
		"url":"http://h6.duchengjiu.top/shop/api_useraddress.php?token="+localStorage.token,
		"type":"GET",
		"dataType": "json",
		"success": function(response){
			
			if(response.code === 0){
//							console.log(response);
				
				
				var htmlData = '';
				for(var i=0;i<response.data.length;i++){
					var obj = response.data[i];
					
					htmlData += '<span class="address-item" data-id="' +obj.address_id+ '">收货人：'
							 +  obj.address_name+"&nbsp;&nbsp;&nbsp;&nbsp;"
							 +  '省份：' + obj.province+"&nbsp;&nbsp;&nbsp;&nbsp;"
							 +  '市：' + obj.city+"&nbsp;&nbsp;&nbsp;&nbsp;"
							 +  '区：' + obj.district+"&nbsp;&nbsp;&nbsp;&nbsp;"
							 +  '街道：' + obj.address+"&nbsp;&nbsp;&nbsp;&nbsp;"
							 +  '手机号：' + obj.mobile+"&nbsp;&nbsp;"
							 +  '<span class="remove">删除</span></span>'
					
				}
				$("#fill-address").html(htmlData);
				
				
				//添加点击事件
				$(".address-item").click(function(event){
					
					$(this).addClass("active").siblings().removeClass("active");
					
//								console.log(event.target);
					if(event.target){
						address_id = event.target.getAttribute("data-id");
//									console.log(address_id);
					}
				})
				
				//删除地址事件
				$(".remove").click(function(event){
					
					console.log(this.parentNode);
					var remmoveLi = this.parentNode;
					remmoveLi.parentNode.removeChild(remmoveLi);
					
					//调用删除的ajax
					removeAjax(remmoveLi);
				})
				
			}
			
			
		}
	});
	
}


//显示新增地址
$(".newAddress").click(function(){
	$("#add").show();
})

//隐藏新增地址
$(".close").click(function(){
	$("#add").hide();
})

//新建收货人地址信息
$("#btn").click(function(){
	//获取地址信息
	var data = $("form").serialize();
				console.log(data);
	

	console.log(localStorage.token);
	
	$.ajax({
		"url":"http://h6.duchengjiu.top/shop/api_useraddress.php?token="+localStorage.token + "&status=add",
		"type":"POST",
		"dataType": "json",
		"data": data,
		"success": function(response){
			
			
			
			
			if(response.code === 0){
							console.log(response);
				$("#add").hide();
				addressAjax();
			}
			
			
		}
	});
})

//删除地址事件
function removeAjax(obj){
	//获取地址的id
	console.log( $(obj).attr("data-id") );
	var address_id = $(obj).attr("data-id");
	
	$.ajax({
		"url":"http://h6.duchengjiu.top/shop/api_useraddress.php?token="+localStorage.token + "&status=delete&address_id="+ address_id,
		"type":"GET",
		"dataType": "json",
		"success": function(response){
			console.log(response);
		}
	});
}

//获取总金额放入div元素
//通过location.search 获取get传过来数据,截取？ 在通过分割 = 
var str = location.search.substr(1);
//用分割方法得到 = 号两边的内容
var sum = str.split("=");
//用下标找到金额
//console.log(sum[1]);

$("#sum").html("<span>当前订单的总金额是￥" +sum[1]+ "元</span>")


//下订单事件
$("#order").click(function(){
	//判断地址是否选中
	if( address_id === 0){
		alert("请选择地址后在下单！");
		return;
	}
	
	//ajax调用
	$.ajax({
		"url":"http://h6.duchengjiu.top/shop/api_order.php?token="+localStorage.token + "&status=add",
		"type":"POST",
		"dataType": "json",
		"data": {
			"address_id": address_id,
			"total_prices": sum[1]
		},
		"success": function(response){
			console.log(response);
			if(response.code === 0){
				alert("提交订单成功！");
				//跳转到查询订单页面
				location.href = "order.html";
			}
		}
	});
	
	//跳转到订单页
})
$("#top").click(function(){
	$("body,html").animate({scrollTop: 0})
})