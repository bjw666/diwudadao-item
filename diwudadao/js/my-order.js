//回到顶部
$("#top").click(function(){
	$("body,html").animate({scrollTop: 0})
})

//获取总金额放入div元素
//通过location.search 获取get传过来数据,截取？ 在通过分割 = 
var str = location.search.substr(1);
//用分割方法得到 = 号两边的内容
var sum = str.split("=");
//用下标找到金额
console.log(sum[1]);

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
				location.href = "index.html";
			}
		}
	});
	
	//跳转到订单页
})