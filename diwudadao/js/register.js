//回到顶部
$("#top").click(function(){
	$("body,html").animate({scrollTop: 0})
})
//取消勾选
$(".agree").click(function(){
	if($("input").is(":checked")){
		$("#oBtn").css("background-color","#25292E")
	}else{
		$("#oBtn").css("background-color","#CCCCCC")
	}
})

//手机号用户名输入
$("#number").change( function() { 
	var reg = /^((13[0-9])|(15[^4])|(18[0,2,3,5-9])|(17[0-8])|(147))\d{8}$/;
	var str = $("#number").val();
	if ( reg.test(str) == true ) { 
		$("#p1").html("手机号码输入成功！")
//		alert("手机号码输入成功！")
	}else{
		alert("您输入了错误的手机号码！")
		$("#number").val("")
	}
})

//检测手机用户名是否存在
$("#number").change( function() { 	
	var url = "http://h6.duchengjiu.top/shop/api_user.php";
	var data = {
		status: "check",
		username: $("#number").val(),
	}
	$.post(url, data, function(obj){
		alert(obj.message);//若用户名已经存在，则显示"用户名已经存在"
	})
})

//验证码输入
	$.idcode.setCode();
	$("#Txtidcode").change(function() {
		var r = $.idcode.validateCode();
		if (r == true) {
			alert("验证成功！")
		} else {
			alert("验证失败！")
		}
	})

//密码和确认密码的判断
$("#passwordconfirm").change(function(){
	if(  $("#creatpassword").val() != $("#passwordconfirm").val()  ){
		$("#creatpassword").val("") && $("#passwordconfirm").val("")
		alert("两次密码输入不一致，请重新输入！")
	}
})
//立即注册
$("button").click(function(){
	if($.idcode.validateCode()==true){
		if( $(".agree").is(":checked") ){
			var url = "http://h6.duchengjiu.top/shop/api_user.php";
			var data = {
				status: "register",
				username: $("#number").val(),
				password: $("#creatpassword").val()
			}
			if( $("#number").val() != ""){
				var reg1 = /^[0-9a-zA-Z_]{6,20}$/
				var str1 = $("#creatpassword").val();
				if(reg1.test(str1) == true){
					$.post(url, data, function(obj){
						alert(obj.message);//若登录成功则显示 "注册成功！"
						window.location.href="login.html"//跳转到登录页面
					})
				}else{
					alert("密码必须为6~20为由英文，字母，下划线组成，区分大小写！")
				}
			}else{
				alert("手机号码不能为空！请重新输入！")
			}	
		}else{
			alert("您还没有同意良仓注册条款，请同意后再注册！")
		}
	}else{
		$("#Txtidcode").val("");
		alert("验证码输入错误，请重新输入！")
	}
})