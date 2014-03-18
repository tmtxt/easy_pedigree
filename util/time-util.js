// return the moment object with pre-config for locale
// the input argument is the language (vi, en, ...)
module.exports = function (language){
  var moment = require('moment');

  if(language === "vi"){
    moment.lang("vi", {
      months: ["Tháng một", "Tháng hai", "Tháng ba", "Tháng tư", "Tháng năm", "Tháng sáu",
               "Tháng bảy", "Tháng tám", "Tháng chín", "Tháng mười", "Tháng mười một", "Tháng mười hai"],
      weekdays : [ "Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy" ],
      longDateFormat : {
        LL: "dddd, [ngày] DD MMMM [năm] YYYY"
      }
    });
  } else {
    moment.lang(language);
  }
  
  return moment;
};
