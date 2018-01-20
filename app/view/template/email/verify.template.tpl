<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <meta http-equiv="content-type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="format-detection" content="telephone=no" />
  <style>
    body {
      margin: 0;
      padding: 0;
      min-width: 100%;
      width: 100% !important;
      height: 100% !important;
    }

    body,
    table,
    td,
    div,
    p,
    a {
      -webkit-font-smoothing: antialiased;
      text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
      line-height: 100%;
    }

    #tip {
      line-height: 60px;
      text-align: center;
    }

    table,
    td {
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
      border-collapse: collapse !important;
      border-spacing: 0;
    }

    img {
      border: 0;
      line-height: 100%;
      outline: none;
      text-decoration: none;
      -ms-interpolation-mode: bicubic;
    }

    #outlook a {
      padding: 0;
    }

    .ReadMsgBody {
      width: 100%;
    }

    .ExternalClass {
      width: 100%;
    }

    .ExternalClass,
    .ExternalClass p,
    .ExternalClass span,
    .ExternalClass font,
    .ExternalClass td,
    .ExternalClass div {
      line-height: 100%;
    }

    @media all and (min-width: 560px) {
      .container {
        border-radius: 8px;
        -webkit-border-radius: 8px;
        -moz-border-radius: 8px;
        -khtml-border-radius: 8px;
      }
    }

    a,
    a:hover {
      color: #FFFFFF;
    }

    .footer a,
    .footer a:hover {
      color: #828999;
    }
  </style>

  <title>iMap | 旅行地图</title>

</head>

<body topmargin="0" rightmargin="0" bottommargin="0" leftmargin="0" marginwidth="0" marginheight="0" width="100%" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; width: 100%; height: 100%; -webkit-font-smoothing: antialiased; text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; line-height: 100%;
	background-color: #302F33;
  color: #FFFFFF;" bgcolor="#302F33" text="#FFFFFF">
  <div class=" container">
    <h3 id="tip" style="display:none"></h3>
  </div>
  <script src="https://dn-avoscloud.qbox.me/statics/jquery.min.js"></script>
  <script src="https://dn-avoscloud.qbox.me/statics/jquery.jsonp.js"></script>

  <script type="text/javascript">
    var url = "https://api.imap.trevor.top/template/email/verify/";
    var tip_err ="邮箱验证出错";
    var tip_success ="邮箱验证成功";
    function getParam() {
      var prmstr = window.location.search.substr(1);
      var prmarr = prmstr.split("&");
      var params = {};

      for (var i = 0; i < prmarr.length; i++) {
        var tmparr = prmarr[i].split("=");
        params[tmparr[0]] = tmparr[1];
      }
      return params;
    }

    //获得token,以验证邮件合法性
    var token = location.search.match(/token=(\w*)/);
    if(token&&token[1]){
      token = token[1];
    }
    function verify(){
      if(!token){
        return;
      }
      $.jsonp({
          url:url+token,
          callbackParameter: "callback",
          cache: false,
          success:function(result){
            $("#tip").show();
            if(result.error){
              $("#tip").text(result.error).css('background', '#ed3f14');
            }else{
              $("#tip").text(tip_success).css('background', '#19be6b');
            }
          },
          error:function(result,text){
            $("#tip").text("服务器发生错误");
          }
        });
    }

    $(function(){
      verify();
    })

  </script>
</body>

</html>
