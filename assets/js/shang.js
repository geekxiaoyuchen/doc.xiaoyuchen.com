$(function(){
	$(".shang").click(function(){
        layer.open({
		  type: 1,
		  skin: 'layui-layer-rim', //加上边框
		  area: ['300px', '620px'], //宽高
		  title: '打赏',
		  content: '<div style="text-align:center;"><img src="http://cdn.xiaoyuchen.com/band/shang_alipay.png"><div>支付宝打赏</div></div><hr style="width:90%"><div style="text-align: center;"><img src="http://cdn.xiaoyuchen.com/band/shang_wechat.png"><div>微信打赏</div></div>'
		});
	});
})