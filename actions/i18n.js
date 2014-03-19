exports.changeLanguage = function (req, res){
  var locale = 'vi';
	if(req.query.locale === 'en'){
    locale = 'en';
  } else {
    locale = 'vi';
  }
  res.cookie('locale', locale);
  // req.cookies.locale = locale;
  req.i18n.setLocaleFromCookie();
  // res.cookie('locale', locale);
  // req.i18n.setLocale(locale);
  res.redirect('back');
};
