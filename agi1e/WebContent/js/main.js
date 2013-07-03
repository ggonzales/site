  //===========================//
 //      GLOBAL VARIABLES     //
//===========================//

var headerDatas = [$("div#headerContentSpace div#content1"),
                   $("div#headerContentSpace div#content2"),
                   $("div#headerContentSpace div#content3")	
                  ];

var headerBG1 = [$("div#headerBackground div#bg1"),
                 $("div#headerBackground div#bg2"),
                 $("div#headerBackground div#bg3")
                ];

var headerBG2 = [$("div#wrapperHeader div#headerGadgetBG"),
                 $("div#wrapperHeader div#headerCloudsBG"),
                 $("div#wrapperHeader div#headerManBG")
                ];


var headerInterval = null;						// the global interval variable of the header animation
var currentHeaderData = null;					// data used for the header animation
var currentHeaderIndex = null;
var MAX_WORKS_IMAGES = 7;                       // the max images in the works content section
var currentWorksImage = 1;						// flag used to track
var currentHeaderBG = 0;						// flag used to track the current Header Background










  //===========================//
 // THE JQUERY READY FUNCTION //
//===========================//

$(document).ready(function()
{
		// initializes the web tracking code from google
	initWebsiteTrackingCode();
		// initializes the header content animation
	initHeaderContentAnimation();
		// initializes the works content events
	initWorksContentEvents();	
		// initializes the div button events
	initDivButtonEvents();
		// initializes the skype code
	initSkypeCode();
});









//===========================//
//    WEB TRACKING CODE      //
//===========================//

function initWebsiteTrackingCode() 
{
	 (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments);},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m);
	})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

	ga('create', 'UA-42039507-1', 'agi1e.com');
	ga('send', 'pageview');
}


//===========================//
//     SKYPE CALL CODE       //
//===========================//

function initSkypeCode() {
	Skype.ui({
	      "name": "call",
	      "element": "SkypeButton_Call_stephen.warren.agile_1",
	      "participants": ["stephen.warren.agile"],
	      "imageSize": 24
	});
}






  //===========================//
 //     PUBLIC FUNCTIONS      //
//===========================//

	// this initializes the header content animation
function initHeaderContentAnimation()
{
	currentHeaderData = headerDatas[0];
		// show the first data after the loading of the page
	headerDatas[0].show();

		// init the selectors click events
	$("div#selector1").click(function() { if (currentHeaderIndex != 0) {showHeaderData(0); clearInterval(headerInterval); setHeaderIntervalAnimation(); }});
	$("div#selector2").click(function() { if (currentHeaderIndex != 1) {showHeaderData(1); clearInterval(headerInterval); setHeaderIntervalAnimation(); }});
	$("div#selector3").click(function() { if (currentHeaderIndex != 2) {showHeaderData(2); clearInterval(headerInterval); setHeaderIntervalAnimation(); }});
	
		// run the interval loop for the continuous animation of the header Data
	setHeaderIntervalAnimation();
}


	//this is used to set the header interval animation in the headerInterval variable
function setHeaderIntervalAnimation() 
{
	headerInterval = setInterval(function() { showHeaderData(++currentHeaderIndex % 3); }, 5000);
}

	
	// this is used to show the data given the data index 
function showHeaderData(index) 
{
	currentHeaderData.hide("fade", 500);
	currentHeaderData = headerDatas[index];
	currentHeaderIndex = index;
	headerDatas[index].show("fade", 500);
		// this will change the header background
	headerBG1[currentHeaderBG].hide("fade", 600);
	headerBG2[currentHeaderBG].hide("fade", 400);
	currentHeaderBG = index;
	headerBG1[currentHeaderBG].show("fade", 400);
	headerBG2[currentHeaderBG].show("fade", 600);
		// reset the content selectors and add a selected class associated with the index
	$("div#wrapperContentSelector div").attr("class", "grid_1 unselectedCircle");
	$("#wrapperContentSelector div#selector"+(index+1)).attr("class", "grid_1 selectedCircle");
}


	// this initializes the next and back buttons of the works page
function initWorksContentEvents()
{
	$("div#wrapperWorksContent div#nextButton").click(function(){
			// check if the last image is at the 300px position, if not then update the images to move to left
		if (currentWorksImage < MAX_WORKS_IMAGES-1) {
			$("div#worksImgContainer div").animate({left: "-=405"}, 1000);
				// update the flag
			currentWorksImage++;
		}
	});
	
	$("div#wrapperWorksContent div#backButton").click(function(){
			// check if the first image is at the 25px position, if not then update the images to move to right
		if (currentWorksImage > 1) {
			$("div#worksImgContainer div").animate({left: "+=405"}, 1000);
				// update the flag
			currentWorksImage--;
		}
	});
}


	// this initializes the clickable div buttons of its events
function initDivButtonEvents()
{
		// social network links
	$("div#socialNetworkLinks div#facebookLink").click(function() {
		window.location.href = "https://www.facebook.com/pages/Agile-Assurance-Group-Limited/170620536452813";
	});
	$("div#socialNetworkLinks div#twitterLink").click(function() {
		window.location.href = "https://twitter.com/Agi1eAssurance";
	});
	
	
		// this is for the refresh captcha button event
	 $("div#wrap img#refresh").click(function() {  
		 document.getElementById('captcha').src="../php/getCaptcha.php?rnd=" + Math.random();
	 });
	 
	
	
		//===========================
		// SEND EMAIL BUTTON EVENT
		//===========================
		// this is the event for the send mail button in contact us page
	$("div#sendMailButton").click(function() {
			// flag variable to successfully send the email
		var continueToSend = true; 
			// form variables
		var email = "";
		var skypeID = "NONE";
		var name = "NONE";
		var phoneNumber = "NONE";
		var hearAboutUs = "NONE";
		var subject = "";
		var message = "";
		var code = "";
		var sendCopy = false;
			// get the sendCopy value in the checkbox
		sendCopy = $("#sendCopy").prop("checked");
			// get the optional values if there is any
		if ($("div#column1Form #skypeID").val() != null) skypeID = $("div#column1Form #skypeID").val();
		if ($("div#column1Form #name").val() != null) phoneNumber = $("div#column1Form #name").val();
		if ($("div#column1Form #phone").val() != null) phoneNumber = $("div#column1Form #phone").val();
		if ($("div#column1Form #hearAboutUs").val() != null) hearAboutUs = $("div#column1Form #hearAboutUs").val();
		if ($("div#column1Form #code").val() != null) code = $("div#column1Form #code").val();
			// first validate the form values
			// validate the email address
		email = $("div#column1Form #email").val();
		var atpos=email.indexOf("@");
		var dotpos=email.lastIndexOf(".");
		if (atpos<1 || dotpos<atpos+2 || dotpos+2>=email.length) {
				// shake the textbox if it is not a valid email address and outline it to red
			$("div#column1Form #email").addClass("error");
			$("div#column1Form #email").effect("shake", {distance: 4}, 200);
			continueToSend = false;
		}
		else {
			$("div#column1Form #email").removeClass("error");
		}
			// validate the subject if it is empty
		subject = $("div#column1Form #subject").val();
		if (subject == "" || subject === null) {
			$("div#column1Form #subject").addClass("error");
			$("div#column1Form #subject").effect("shake", {distance: 4}, 200);
			continueToSend = false;
		}
		else {
			$("div#column1Form #subject").removeClass("error");
		}
			// validate the message if it is empty
		message = $("div#column1Form #message").val();
		if (message == "" || message === null) {
			$("div#column1Form #message").addClass("error");
			$("div#column1Form #message").effect("shake", {distance: 4}, 200);
			continueToSend = false;
		}
		else {
			$("div#column1Form #message").removeClass("error");
		}
		
			// this will send the ajax request if the datas are all valid
		if (continueToSend) {
			var dataString = "email=" + email + "&name=" + name + "&phoneNumber=" + phoneNumber + "&hearAboutUs=" + hearAboutUs + 
			                 "&skypeID=" + skypeID + "&subject=" + subject + "&message=" + message + "&code=" + code + "&sendCopy=" + sendCopy;
			$.ajax({
				type: "POST",
				url: "../php/emailProcess.php",
				data: dataString,
				success: function(res) {
						// reset the mail form
					$("div#column1Form #email").val("");
					$("div#column1Form #name").val("");
					$("div#column1Form #phone").val("");
					$("div#column1Form #hearAboutUs").val("");
					$("div#column1Form #skypeID").val("");
					$("div#column1Form #subject").val("");
					$("div#column1Form #message").val("");
					$("#sendCopy").prop("checked", false);
				
				}
			});
		}
	});

}

