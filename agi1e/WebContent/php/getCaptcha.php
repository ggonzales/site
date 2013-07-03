<?php
	session_start();
	
	$string = '';
	
	for ($i = 0; $i < 5; $i++) {
		$string .= chr(rand(97, 122));
	}
	
	$_SESSION['random_string'] = $string;
	
	$dir = '../fonts/captchaFont/';
	$image = imagecreatetruecolor(170, 40);
	$font = "captchaFont.ttf";
	
	// random number 1 or 2
	$num2 = rand(1,2);
	if($num2==1) {
		$color = imagecolorallocate($image, 113, 193, 217);// color
	}
	else {
		$color = imagecolorallocate($image, 163, 197, 82);// color
	}
	
	$white = imagecolorallocate($image, 225, 225, 225); // background color white
	imagefilledrectangle($image,0,0,399,99,$white);
	imagettftext ($image, 30, 0, 5, 33, $color, $dir.$font, $_SESSION['random_string']);
	header("Content-type: image/png");
	imagepng($image);

?>