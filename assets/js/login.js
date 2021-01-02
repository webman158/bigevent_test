$(function () {
  // ================= 登录注册的切换 =================
  // 去注册
  $("#gotoRegi").click(function () {
    // 显示注册
    $(".register").show();
    // 隐藏登录
    $(".login").hide();
  });

  // 去注册
  $("#gotoLogin").click(function () {
    // 隐藏注册
    $(".register").hide();
    // 显示登录
    $(".login").show();
  });

  // ================= 添加表单的校验规则 =================
  // 表示从layui中获取到form表单校验的相关功能
  let form = layui.form;
  form.verify({
    // 我们既支持上述函数式的方式，也支持下述数组的形式
    // 数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    // 密码的校验规则
    // pass 就是自定义的校验名字，需要写到lay-verify属性中
    pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],

    // 自定义校验规则: 两次输入的密码必须完全一致
    // 对请再次输入密码做校验
    repwd: function (value) {
      // console.log(value); // 再次输入密码的内容
      // 思路：需要获取到密码框的内容和再次密码框比较内容，如果不一致，需要弹框提示
      // 函数内的return的内容就是提示框的消息
      // return "没通过";

      let pwd = $(".register input[name=password]").val();
      if (value !== pwd) {
        return "两次输入的密码不一致！";
      }
    },
  });

  // ================== 实现注册功能 ===================
  let layer = layui.layer;

  $("#regiForm").on("submit", function (e) {
    e.preventDefault();

    let data = $(this).serialize();

    $.ajax({
      type: "POST",
      url: "/api/reguser",
      data,
      success: (res) => {
        console.log(res);

        if (res.status !== 0) {
          // console.log("注册失败");
          layer.msg(res.message);
          return;
        }

        // console.log("注册成功");
        layer.msg("注册成功");

        // 切换到登录界面
        $("#gotoLogin").click();
      },
    });
  });

  // ================== 实现登录功能 ===================
  $("#loginForm").on("submit", function (e) {
    e.preventDefault();

    let data = $(this).serialize();

    $.ajax({
      type: "POST",
      url: "/api/login",
      data,
      success: (res) => {
        console.log(res);

        if (res.status !== 0) {
          return layer.msg("登录失败");
        }

        // 将token信息存储到本地存储中
        localStorage.setItem("token", res.token);

        // layer.msg("登录成功");

        layer.msg(
          "登录成功",
          {
            time: 200,
          },
          () => {
            location.href = "/home/index.html";
          }
        );
      },
    });
  });
});
