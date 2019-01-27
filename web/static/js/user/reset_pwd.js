;

var user_pwd_ops = {
    init:function(){
        this.eventBind();
    },
    eventBind:function(){
        $("#save").click(function(){
            var btn_target = $(this);
            if (btn_target.hasClass("disabled")){
                common_ops.alert("正在处理！！请不要重复提交～～");
                return;
            }

            var old_password = $("#old_password").val();
            var new_password = $("#new_password").val();

            var email_target = $(".user_edit_wrap input[name=email]");
            var email = email_target.val();

            if(!old_password){
                common_ops.alert("请输入原始密码～～");
                return false;
            }

            if(!new_password || new_password.length < 6){
                common_ops.alert("请输入不少于6位的新密码～～");
                return false;
            }

            btn_target.addClass("disabled");

            var data = {
                old_password: old_password,
                new_password: new_password
            };

            $.ajax({
                url: common_ops.buildUrl("/user/reset-pwd"),
                type:"POST",
                data:data,
                dataType:'json',
                success:function(res){
                    btn_target.removeClass("disabled");
                    var callback = null;
                    // 如果正常返回，刷新当前页面
                    if (res.code == 200){
                        callback = function(){
                            window.location.href = window.location.href;
                        }
                    }
                    common_ops.alert(res.msg,callback);
                }
            })

        });

    }


};

$(document).ready(function(){
    user_pwd_ops.init();

})