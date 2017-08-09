import {companyNameCheckIsRg} from './getData'

/**
 * 只能输入中文和数字
 */
export const isChineseNumber = (rule,value,callback,message) => {
  if(!/^[0-9\u4E00-\u9FA5]+$/.test(value)){
    callback(new Error(message));
  }else{
    callback();
  }
};

/**
 * 只能输入中文
 */
export const isChinese = (rule,value,callback,message) => {
  if(!/^[\u0391-\uFFE5]+$/.test(value)){
    callback(new Error(message));
  }else{
    callback();
  }
};

/**
 * 是否为手机号码
 */
export const isTelphone = (rule,value,callback,message) => {
  if(!(value.length == 11 && /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(14[0-9]{1}))+\d{8})$/.test(value))){
    callback(new Error(message));
  }else{
    callback();
  }
};

/**
 * 密码必须包含字母、大小写、数字、特殊字符其中两种规则
 */
export const strongPsw = (rule,value,callback,message) => {
  if(passwordLevel(value)==1){
    callback(new Error(message));
  }else{
    callback();
  }

  function passwordLevel(password) {
    var Modes = 0;
    for (var i = 0; i < password.length; i++) {
      Modes |= CharMode(password.charCodeAt(i));
    }
    return bitTotal(Modes);
    //CharMode函数
    function CharMode(iN) {
      if (iN >= 48 && iN <= 57)//数字
        return 1;
      if (iN >= 65 && iN <= 90) //大写字母
        return 2;
      if ((iN >= 97 && iN <= 122) || (iN >= 65 && iN <= 90))
      //大小写
        return 4;
      else
        return 8; //特殊字符
    }
    //bitTotal函数
    function bitTotal(num) {
      var modes = 0;
      for (var i = 0; i < 4; i++) {
        if (num & 1) modes++;
        num >>>= 1;
      }
      return modes;
    }
  }
};

/**
 * 验证是否已经注册
 */
export const companyNameCheck = (rule,value,callback,message) => {
  companyNameCheckIsRg(value).then(function(res){
    if(res.statusCode == 2000000){
      if(res.data == '0'){
        callback(new Error(message));
      }else{
        callback();
      }
    }
  });
};

/**
 * 验证email
 */
export const isEmail = (rule,value,callback,message) => {
  if(!/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value)){
    callback(new Error(message));
  }else{
    callback();
  }
};
