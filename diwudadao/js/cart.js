$.ajax({
	"url":"http://h6.duchengjiu.top/shop/api_cart.php?token="+localStorage.getItem("token"),
	"type":"GET",
	"dataType":"json",
	"success":function(response){
//		console.log(response);
		if(response.data.length>0){
			for(var i=0;i<response.data.length;i++){
				var obj = response.data[i];
				var html = `<div class="goods">
								<div class="goods-box">
									<input type="checkbox" class="checkbox"/>
									<input type="hidden" class="goods_id" value="${obj.goods_id}"/>
									<img src="${obj.goods_thumb}" alt=""/>
									<p>${obj.goods_name}</p>
								</div>
								<div class="goods-one">${obj.goods_price}</div>
								<div class="goods-list">
									<span class="left-button">-</span>
									<input type="text" class="center-text" value="${obj.goods_number}"/>
									<span class="right-button">+</span>
								</div>
								<div class="goods-sum">${obj.goods_price*obj.goods_number}</div>
								<div class="goods_op">
									<span>删除</span>
								</div>
							</div>`;
							$("#Shop").html($("Shop").html()+html);
			}
			//添加商品 删除商品
			$(".goods-op").click(function(){
				alert("确认将此商品删除?");
				var goods = this.parentNode;
				console.log(goods);
				//删除Dom节点
				$(goods).remove();
				//删除数据库数据
				updataCartAjax(this,0);
			})
			//加号监听事件
			$(".right-button").click(function(){
				upDataCart(this,"+1")
			})
			//减号监听事件
			$(".left-button").click(function(){
				upDataCart(this,"+1")
			})
			//输入数字,失去焦点触发改变商品数量事件
			$(".center-text").blur(function(){
				setGoods(this);
			})
		}
	}
});
//选中元素删除商品信息
$("#Delete").click(function(){
	//找到商品信息goods中被选中的商品
	var inputs = $(".goods input:checked");
	for(var i=0;i<inputs.length;i++){
		var goodsL = inputs[i].parentNode.parentNode;
		var objPa = inputs[i].parentNode;
		//删除数据库中的相应内容
		updataCartAjax(objPa,0);
		goodsL.parentNode.removeChild(goodsL);
	}
})
$("#Shop").click(function(event){
	//全选
	if(event.target.id==="selectAll"){
		//得到全选按钮的当前选中状态存入变量
		var selected = event.target.checked;
		//通过类名得到商品复选框的类数组
		var checkboxs = document.getElementsByClassName("checkbox");
//		console.log(checkboxs);
		for(var i=0;i<checkboxs.length;i++){
			//将已选中的复选框进行赋值和全选按钮一致
			checkboxs[i].checked = selected;
		}
		showSum();
		return;
	}
	//除了全选复选框的事件
	if(event.target.type==="checkbox"){
		showSum();
	}
})
//计算总价和数量
function showSum(){
	//得到数据类数组
	var goods = document.getElementsByClassName("goods");
	//累加   信号量
	var sum = 0;  //总价
	var num = 0;  //总数量
	for(var i=0;i<goods.length;i++){
		var objGoods = goods[i];
		//判断是否选中
		if($(objGoods).children("div:first").children("input").is(":checked")){
			//进行累加
			sum += parseInt($(objGoods).children("div:eq(3)").text());
			num += parseInt($(objGoods).children("div:eq(2)").children("input").val());
		}
	}
	$("#Money").text("￥" + sum);
	$("#Amount").text(num);
}
//改变购物车中商品数量的业务函数
function upDataCart(obj,num){
	//找对象
	var Good = obj.parentNode.parentNode;
	//找到商品数量
	var goods_id = Good.getElementsByClassName("goods_id")[0].value;
	var goods_number = Good.getElementsByClassName("center-text")[0];
	var goods_number_value = parseInt(goods_number.value);
	//找到商品单价
	var goods_price = Good.getElementsByClassName("goods-one")[0];
	var goods_price_value = parseInt(goods_price.innerText);
	//找到商品合计金额元素
	var goods_subtotal = Good.getElementsByClassName("goods-sum")[0];
	//判断范围   1——20
	if(num == "-1" && goods_number_value <= 1){
		return;
	}
	if(num == "+1" && goods_number_value >= 20){
		return;
	}
	if(num == "-1"){
		goods_number_value--;
	}else if(num == "+1"){
		goods_number_value++;
	}else if(num>0){
		goods_number_value = num;
	}else{
		goods_number_value = 0;
	}
	//当前商品的值     信号量改变
	goods_number.value = goods_number_value;
	//算出合计金额
	var subtotal = goods_number_value * goods_price_value;
	//将合计金额写入页面
	goods_subtotal.innerText = subtotal;
	showSum();
}
//上下按钮监听
function stepSetGoods(obj,event){
	var event = event || window.event;
	event.preventDefault();
	if(event.keyCode===40){
		upDataCart(obj,"-1")
	}else if(event.keyCode===40){
		upDataCart(obj,"+1")
	}
}
//设置某件商品的数量
function setGoods(obj){
	//获取商品数量
	var num = parseInt($(obj).val());
	//判断商品数量的值,以及范围1-20
	if(num<1 || isNaN(num)){
		$(obj).val(1);
	}
	if(num>20){
		$(obj).val(20);
	}
	//金额合计变化
	upDataCart(obj,$(obj).val());
}
//跳转到订单页,并把金额带过去
$("#checkout").click(function(){
	var sum = $("#Money").text().substr(1);
	location.href = "address.html?sum="+sum;
})
//删除商品通过ajax
function updataCartAjax(obj,num){
	var goods = obj.parentNode;
	var goods_id = goods.getElementsByClassName("goods_id")[0].value;
	$.ajax({
		"url":"http://h6.duchengjiu.top/shop/api_cart.php?token="+localStorage.token,
		"type":"POST",
		"type":"json",
		"data":{
			"goods_id":goods_id,
			"number":num
		},
		"success":function(response){
			console.log(response);
		}
	});
}
//回到顶部
$("#top").click(function(){
	$("body,html").animate({scrollTop: 0})
})






