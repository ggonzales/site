<?php
	session_start();
	
	if (isset($_POST['email']))
	{
			// passed data from the form
		$to = "swarren@agi1e.com";
		$email = $_POST['email'];
		$name = $_POST['name'];
		$phone= $_POST['phoneNumber'];
		$hearAboutUs = $_POST['hearAboutUs'];
		$skypeID = $_POST['skypeID'];
		$subject = $_POST['subject'];
		$message = $_POST['message'];
		$sendCopy = $_POST['sendCopy'];
		
			// headers for the email
		$headers = "MIME-Version: 1.0\n";
		$headers .= "Content-type: text/plain; charset=utf-8\n";
		$headers .= "To: ".$to." <".$to.">\n";
		$headers .= "From: Agile Assurance Group <inquiries@agi1e.com>\n";
		$headers .= "\n";
		
			// edit the message and include the skypeID
		$resultMessage = "SKYPE ID: " . $skypeID . "\n" .
		                 "Name: " . $name . "\n" .
		                 "Phone Number: " . $phone . "\n" . 
		                 "How did you hear about us?: " . $hearAboutUs . "\n" . 
		                 "MESSAGE: \n" . $message;
			// send the mail
		mail($to, $subject, $resultMessage, "From: " . $email);
		
			// if the sendCopy is true, then send the client a copy of the email
		if ($sendCopy) {
			mail($email, $subject, $resultMessage, $headers);
		}
	}
?>