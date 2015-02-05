<?php


// Mobile
if ( 
	strstr($_SERVER['HTTP_USER_AGENT'],'iPhone')
	 || 
	strstr($_SERVER['HTTP_USER_AGENT'],'iPad')
	 || 
	strstr($_SERVER['HTTP_USER_AGENT'],'iPod')
	 || 
	strstr($_SERVER['HTTP_USER_AGENT'],'Android')
	 || 
	strstr($_SERVER['HTTP_USER_AGENT'],'Bblackberry')
	 || 
	strstr($_SERVER['HTTP_USER_AGENT'], 'OperaMobi') 
	 || 
	strstr($_SERVER['HTTP_USER_AGENT'], 'Opera Mini') 
	 || 
	strstr($_SERVER['HTTP_USER_AGENT'], 'IEMobile') 
	 || 
	strstr($_SERVER['HTTP_USER_AGENT'], 'Jasmine') 
	 || 
	strstr($_SERVER['HTTP_USER_AGENT'], 'Fennec') 
	 || 
	strstr($_SERVER['HTTP_USER_AGENT'], 'Blazer') 
	 || 
	strstr($_SERVER['HTTP_USER_AGENT'], 'Minimo') 
	 || 
	strstr($_SERVER['HTTP_USER_AGENT'], 'MOT-') 
	 || 
	strstr($_SERVER['HTTP_USER_AGENT'], 'Nokia') 
	 || 
	strstr($_SERVER['HTTP_USER_AGENT'], 'SAMSUNG') 
	 || 
	strstr($_SERVER['HTTP_USER_AGENT'], 'Polaris') 
	 || 
	strstr($_SERVER['HTTP_USER_AGENT'], 'LG-') 
	 || 
	strstr($_SERVER['HTTP_USER_AGENT'], 'SonyEricsson') 
	 || 
	strstr($_SERVER['HTTP_USER_AGENT'], 'SIE-') 
	 || 
	strstr($_SERVER['HTTP_USER_AGENT'], 'AUDIOVOX') 
	 || 
	strstr($_SERVER['HTTP_USER_AGENT'], 'mobile') 
	 || 
	strstr($_SERVER['HTTP_USER_AGENT'], 'webOS')
	 || 
	strstr($_SERVER['HTTP_USER_AGENT'],'Windows Phone')
	 || 
	strstr($_SERVER['HTTP_USER_AGENT'],'symbian')
	 || 
	strstr($_SERVER['HTTP_USER_AGENT'],'series60')
	 || 
	strstr($_SERVER['HTTP_USER_AGENT'],'palm')
)
{
	header('Location: http://thomasfischer.me/lab/yoyo/src/mobile');
}


// if IE < 8
elseif(strstr($_SERVER['HTTP_USER_AGENT'],'MSIE 6') 
	  ||
   	 strstr($_SERVER['HTTP_USER_AGENT'],'MSIE 7') 
   	  ||
    strstr($_SERVER['HTTP_USER_AGENT'],'MSIE 8')

)
{
	header('Location: http://thomasfischer.me/lab/yoyo/src/oldBrowser');
}


// if IE 10, and Chrome
elseif(strstr($_SERVER['HTTP_USER_AGENT'],'MSIE 10') 
	  ||
   	 strstr($_SERVER['HTTP_USER_AGENT'],'Chrome') 

)
{
	header('Location:http://thomasfischer.me/lab/yoyo/src/');
}


//  FFX Opera
else{
	 header("Location:http://thomasfischer.me/lab/yoyo/src/");
}

?>

