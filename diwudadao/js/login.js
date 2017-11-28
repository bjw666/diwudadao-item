//回到顶部
$("#top").click(function(){
	$("body,html").animate({scrollTop: 0})
})

//点击"账户登录"显示登录页面,同时左边的消失
$(".texthead>div").eq(2).click(function(){
	$(".border>.right").show()
	$(".border>.left").hide()
	$(this).css("color","#000000")
	$(".texthead>div").eq(0).css("color","#9999A5")
})

//点击"扫码登录"显示扫码页面，同时右边消失
$(".texthead>div").eq(0).click(function(){
	$(".border>.right").hide()
	$(".border>.left").show()
	$(this).css("color","#000000")
	$(".texthead>div").eq(2).css("color","#9999A5")
})

$("button").click(function(){
	var url = "http://h6.duchengjiu.top/shop/api_user.php";
	var data = {
		status: "login",
		username: $("#number").val(),
		password: $("#password").val()
	}
	$.post(url, data, function(obj) {
		console.log(obj.data);
		var data = obj.data;
		if (obj.code == 0) {
			alert("登陆成功!")
//			localStorage.username=$("#number").val();
			for(var property in data){
				localStorage.setItem(property,data[property]);
			}
			
//			console.log($("#number").val())
			window.location.href="index.html"
		}else{
			alert("用户名或密码输入错误!")
		}
	})
})