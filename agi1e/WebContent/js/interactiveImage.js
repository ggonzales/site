  //===========================//
 //      GLOBAL VARIABLES     //
//===========================//

var stage = null;					// the stage variable required for the Sprite3D to run
var elementsContainer = null;       // the container of the interactive elements
var arrowsImg            = null;
var detailBox            = null;
var storyWritingWorkshop = null;    // the interactive elements
var userStories          = null; 
var storyEstimation      = null;
var estimatedStories     = null;
var prioritizeByValue    = null;
var ideas                = null;
var sprintRetrospective  = null;
var sprintReviewMeeting  = null;
var productBacklog       = null;
var sprintPlanMeeting    = null;
var potentiallyShippable = null;
var sprintIteration      = null;
var sprintBacklog        = null;

var x = 0, y = 0;                   // the offset position of the mouse in the elementsContainer div
var currentHoveredElement = null;   // this is the currentHovered Element that will have the pulsate effect
var currentScaleSize = 1.0;         // this keeps track of the hovered scale size
var scaleAdder = 0.0015;            // this is the incremental scale step per animation of the hovered element
var elementClicked = false;			// flag the keep track if an element is already selected through click
var currentClickedElement = null;   // keeps track of the clicked element in the container (sprite3D)
var currentClickedDIV = null;       // keeps track of the clicked element (JQUERY DIV)
var performElementMove = false;     // this is used to flag the flipping and zooming in of the clicked element
var originalPos = 0;				// keeps track of the clicked original positions
var detailIndex = 0;                // keeps track of the corresponding clicked detail index

var details = [
               "<strong>Story Writing</strong> process is integral to understanding user stories. Product Owner writes the user stories, and prioritize them.  User stories has 2 parts, the name and its description.",
               "<strong>User Stories</strong> are the narrative texts that describe an interaction of the user and the system. User stories are used with agile software development methodologies as the basis for defining the functions a business system must provide, and to facilitate requirements management.",
               "<strong>Story Estimation</strong>. The team contributes by estimating Items and User Stories, either in Story points or in estimated hours.",
               "<strong>Estimated Stories</strong>. The number of hours that a Team member estimates to work on any task.",
               "<strong>Prioritize by Value and Risk.</strong>  The order of backlogs according to how they are blocking the team from productivity. The Product Backlog is often ordered by value and risk.",
               "<strong>Ideas.</strong>  During Retrospective meeting, the team collect ideas for improvement. The idea is to build a common understanding of what happened and what was important during the period.",
               "<strong>Sprint Retrospective.</strong> At the end of a sprint cycle, the team get together for the Sprint Retrospective meeting. All team members reflect on the past sprint and make continuous process improvements. Two main questions are asked in the sprint retrospective: What went well during the sprint? What could be improved in the next sprint?",
               "<strong>Sprint Review Meeting.</strong> At the end of a sprint cycle, the team get together for the Sprint Review Meeting. In this meeting, the team review the work that was completed and not completed.",
               "<strong>Product Backlog.</strong> The product backlog is an ordered list of 'requirements' that is maintained for a product. It consists of features, bug fixes, non-functional requirements, etc.",
               "<strong>Sprint Planning Meeting.</strong>  At the beginning of the sprint cycle, a 'Sprint planning meeting' is held. In this meeting, the team select what work is to be done, and prepare the Sprint Backlog that details the time it will take to do that work.",
               "<strong>Sprint Iteration.</strong> A time period in which development occurs on a set of backlog items that the team has committed to. ",
               "<strong>Potentially Shippable Increment.</strong> A completely developed increment that contains all of the parts of a completed product, except for the Product backlog items that the team selected for the sprint.<br><br>" +
               "<strong>Working Software.</strong> The most important is to have a working software delivered with each sprint.",
               "<strong>Sprint Backlog. </strong> The sprint backlog is the list of work the Development Team must address during the sprint.<br><br>"+
               "<strong>Stories Task.</strong> The stories/features are broken down into tasks by the Development Team. Task is a single small item of work that helps one particular story completion."
              ];











  //===========================//
 // THE JQUERY READY FUNCTION //
//===========================//

$(document).ready(function()
{
		// initialize the stage
	stage = Sprite3D.stage( document.getElementById("projectCycleContainer") );
		// initializes and adds the elements to stage
	initElementsToStage();
		// initializes the hover of elements to scale
	initHoverPulsateElements();
		// initializes the click events of the elements
	initClickElements();
	
		// create the main animation loop
	setInterval(initMainLoop, 60 / 1000);
		
});









  //===========================//
 //     PUBLIC FUNCTIONS      //
//===========================//

	// initializes and adds the elements into the Sprite3D stage
function initElementsToStage()
{
		// add the element Container
	elementsContainer = stage.appendChild(Sprite3D.create(document.getElementById("elementsContainer")));
	arrowsImg = elementsContainer.appendChild(Sprite3D.create(document.getElementById("arrowsImg")));
	detailBox = stage.appendChild(Sprite3D.create(document.getElementById("detailBox")));
		// add the interactive elements
	storyWritingWorkshop = elementsContainer.appendChild(Sprite3D.create(document.getElementById("storyWritingWorkshop")));
	userStories = elementsContainer.appendChild(Sprite3D.create(document.getElementById("stories")));
	storyEstimation = elementsContainer.appendChild(Sprite3D.create(document.getElementById("storyEstimation")));
	estimatedStories = elementsContainer.appendChild(Sprite3D.create(document.getElementById("estimatedStories")));
	prioritizeByValue = elementsContainer.appendChild(Sprite3D.create(document.getElementById("prioritizeByValueAndRisk")));
	ideas = elementsContainer.appendChild(Sprite3D.create(document.getElementById("ideas")));	
	sprintRetrospective = elementsContainer.appendChild(Sprite3D.create(document.getElementById("sprintRetrospective")));	
	sprintReviewMeeting = elementsContainer.appendChild(Sprite3D.create(document.getElementById("sprintReviewMeeting")));	
	productBacklog = elementsContainer.appendChild(Sprite3D.create(document.getElementById("productBacklog")));	
	sprintPlanMeeting = elementsContainer.appendChild(Sprite3D.create(document.getElementById("sprintPlanningMeeting")));	
	potentiallyShippable = elementsContainer.appendChild(Sprite3D.create(document.getElementById("potentiallyShippable")));	
	sprintIteration = elementsContainer.appendChild(Sprite3D.create(document.getElementById("sprintIteration")));	
	sprintBacklog = elementsContainer.appendChild(Sprite3D.create(document.getElementById("sprintBacklog")));	
	
		// update the z position of the arrows and detailbox
	arrowsImg.position(0, 0, -100).scale(1.1).update();
	elementsContainer.position(0, 0, -20).update();
	detailBox.position(0, 0, 0).update();

		// update the stage after adding the elements
	stage.update();
}


	// initializes the pulsate mouse hover of the elements in the container
function initHoverPulsateElements()
{
	$("div#storyWritingWorkshop").mouseover(function(){ currentHoveredElement = storyWritingWorkshop; });
	$("div#storyWritingWorkshop").mouseout(function(){ currentHoveredElement.scale(1).update(); currentHoveredElement = null; currentScaleSize = 1; });
	$("div#stories").mouseover(function(){ currentHoveredElement = userStories; });
	$("div#stories").mouseout(function(){ currentHoveredElement.scale(1).update(); currentHoveredElement = null; currentScaleSize = 1; });
	$("div#storyEstimation").mouseover(function(){ currentHoveredElement = storyEstimation; });
	$("div#storyEstimation").mouseout(function(){ currentHoveredElement.scale(1).update(); currentHoveredElement = null; currentScaleSize = 1; });
	$("div#estimatedStories").mouseover(function(){ currentHoveredElement = estimatedStories; });
	$("div#estimatedStories").mouseout(function(){ currentHoveredElement.scale(1).update(); currentHoveredElement = null; currentScaleSize = 1; });
	$("div#prioritizeByValueAndRisk").mouseover(function(){ currentHoveredElement = prioritizeByValue; });
	$("div#prioritizeByValueAndRisk").mouseout(function(){ currentHoveredElement.scale(1).update(); currentHoveredElement = null; currentScaleSize = 1; });
	$("div#ideas").mouseover(function(){ currentHoveredElement = ideas; });
	$("div#ideas").mouseout(function(){ currentHoveredElement.scale(1).update(); currentHoveredElement = null; currentScaleSize = 1; });
	$("div#sprintRetrospective").mouseover(function(){ currentHoveredElement = sprintRetrospective; });
	$("div#sprintRetrospective").mouseout(function(){ currentHoveredElement.scale(1).update(); currentHoveredElement = null; currentScaleSize = 1; });
	$("div#sprintReviewMeeting").mouseover(function(){ currentHoveredElement = sprintReviewMeeting; });
	$("div#sprintReviewMeeting").mouseout(function(){ currentHoveredElement.scale(1).update(); currentHoveredElement = null; currentScaleSize = 1; });
	$("div#productBacklog").mouseover(function(){ currentHoveredElement = productBacklog; });
	$("div#productBacklog").mouseout(function(){ currentHoveredElement.scale(1).update(); currentHoveredElement = null; currentScaleSize = 1; });
	$("div#sprintPlanningMeeting").mouseover(function(){ currentHoveredElement = sprintPlanMeeting; });
	$("div#sprintPlanningMeeting").mouseout(function(){ currentHoveredElement.scale(1).update(); currentHoveredElement = null; currentScaleSize = 1; });
	$("div#potentiallyShippable").mouseover(function(){ currentHoveredElement = potentiallyShippable; });
	$("div#potentiallyShippable").mouseout(function(){ currentHoveredElement.scale(1).update(); currentHoveredElement = null; currentScaleSize = 1; });
	$("div#sprintIteration").mouseover(function(){ currentHoveredElement = sprintIteration; });
	$("div#sprintIteration").mouseout(function(){ currentHoveredElement.scale(1).update(); currentHoveredElement = null; currentScaleSize = 1; });
	$("div#sprintBacklog").mouseover(function(){ currentHoveredElement = sprintBacklog; });
	$("div#sprintBacklog").mouseout(function(){ currentHoveredElement.scale(1).update(); currentHoveredElement = null; currentScaleSize = 1; });
}


	// this initializes the click function of the elements in the container
function initClickElements()
{
		// this is for clicking the small X button to close the detail
	$("div#closeButton").click(function() {
			// scale to 0 the detail box
		$("div#detailBox").animate({top: "-50px", left: "-120px"}, 500);
		$({scaleXY: 1}).animate({scaleXY: 0}, {
			duration: 500,
			step: function(now, fx) {detailBox.scale(now).update();},
				// this returns the currentClickedDIV to the original saved Position
			complete: function() {
				currentClickedDIV.animate({top: originalPos.top+"px", left: originalPos.left+"px"}, 700, function() {
					elementClicked = false;
					currentClickedElement.position(0, 0, 0);
					currentClickedElement.scale(1);
					currentClickedElement.update();
					elementsContainer.appendChild(currentClickedElement);
						// reset some flag variables
					currentClickedElement = null;
					detailIndex = null;
						// fade in the elements Container
					$("div#elementsContainer").animate({opacity: "1"}, 500);
				});
			}
		});
	});
	
		//--------------------------
		// ELEMENTS CLICK EVENT
		//--------------------------
		// this is for the clicking of the elements
	$("div#storyWritingWorkshop").click(function() {
		if (!elementClicked) {
			currentClickedElement = storyWritingWorkshop;
			currentClickedDIV = $(this);
			originalPos = {top: 25, left: 40}; 
			detailIndex = 0;
			elementClicked = true;
			$(this).animate({top: '80px', left: '120px'}, 700, showDetailBox);
		} 
	});
	$("div#stories").click(function() {
		if (!elementClicked) {
			currentClickedElement = stories;
			currentClickedDIV = $(this);
			originalPos = {top: 35, left: 205}; 
			detailIndex = 1;
			elementClicked = true;
			$(this).animate({top: '80px', left: '140px'}, 700, showDetailBox);
		} 
	});
	$("div#storyEstimation").click(function() {
		if (!elementClicked) {
			currentClickedElement = storyEstimation;
			currentClickedDIV = $(this);
			originalPos = {top: 25, left: 290}; 
			detailIndex = 2;
			elementClicked = true;
			$(this).animate({top: '70px', left: '120px'}, 700, showDetailBox);
		} 
	});
	$("div#estimatedStories").click(function() {
		if (!elementClicked) {
			currentClickedElement = estimatedStories;
			currentClickedDIV = $(this);
			originalPos = {top: 42, left: 470}; 
			detailIndex = 3;
			elementClicked = true;
			$(this).animate({top: '80px', left: '140px'}, 700, showDetailBox);
		} 
	});
	$("div#prioritizeByValueAndRisk").click(function() {
		if (!elementClicked) {
			currentClickedElement = prioritizeByValue;
			currentClickedDIV = $(this);
			originalPos = {top: 55, left: 600}; 
    		performElementMove = true;
			detailIndex = 4;
			elementClicked = true;
			$(this).animate({top: '60px', left: '120px'}, 700, showDetailBox);
		} 
	});
	$("div#ideas").click(function() {
		if (!elementClicked) {
			currentClickedElement = ideas;
			currentClickedDIV = $(this);
			originalPos = {top: 245, left: 50}; 
			detailIndex = 5;
			elementClicked = true;
			$(this).animate({top: '100px', left: '140px'}, 700, showDetailBox);
		} 
	});
	$("div#sprintRetrospective").click(function() {
		if (!elementClicked) {
			currentClickedElement = sprintRetrospective;
			currentClickedDIV = $(this);
			originalPos = {top: 285, left: 90}; 
			detailIndex = 6;
			elementClicked = true;
			$(this).animate({top: '65px', left: '120px'}, 700, showDetailBox);
		} 
	});
	$("div#sprintReviewMeeting").click(function() {
		if (!elementClicked) {
			currentClickedElement = sprintReviewMeeting;
			currentClickedDIV = $(this);
			originalPos = {top: 360, left: 290}; 
			detailIndex = 7;
			elementClicked = true;
			$(this).animate({top: '60px', left: '120px'}, 700, showDetailBox);
		} 
	});
	$("div#productBacklog").click(function() {
		if (!elementClicked) {
			currentClickedElement = productBacklog;
			currentClickedDIV = $(this);
			originalPos = {top: 135, left: 336}; 
			detailIndex = 8;
			elementClicked = true;
			$(this).animate({top: '80px', left: '60px'}, 700, showDetailBox);
		} 
	});
	$("div#sprintPlanningMeeting").click(function() {
		if (!elementClicked) {
			currentClickedElement = sprintPlanMeeting;
			currentClickedDIV = $(this);
			originalPos = {top: 190, left: 490}; 
			detailIndex = 9;
			elementClicked = true;
			$(this).animate({top: '60px', left: '120px'}, 700, showDetailBox);
		} 
	});
	$("div#sprintIteration").click(function() { 
		if (!elementClicked) {
			currentClickedElement = sprintIteration;
			currentClickedDIV = $(this);
			originalPos = {top: 290, left: 660};
			detailIndex = 10;
			elementClicked = true;
			$(this).animate({top: '60px', left: '120px'}, 700, showDetailBox); 
		} 
	});
	$("div#potentiallyShippable").click(function() {
		if (!elementClicked) {
			currentClickedElement = potentiallyShippable;
			currentClickedDIV = $(this);
			originalPos = {top: 370, left: 475}; 
			detailIndex = 11;
			elementClicked = true;
			$(this).animate({top: '60px', left: '120px'}, 700, showDetailBox);
		} 
	});
	$("div#sprintBacklog").click(function() {
		if (!elementClicked) {
			currentClickedElement = sprintBacklog;
			currentClickedDIV = $(this);
			originalPos = {top: 170, left: 710}; 
			detailIndex = 12;
			elementClicked = true;
			$(this).animate({top: '70px', left: '120px'}, 700, showDetailBox);
		} 
	});

}


	// this shows the detail box, it's used after the animation of the element moving
function showDetailBox()
{
		// animate the showing of the detailbox
	$("div#detailBox").show();
	$("div#detailBox div#content").html(details[detailIndex]);
	$("div#detailBox").animate({top: "100px", left: "150px"}, 500);
	$({scaleXY: 0}).animate({scaleXY: 1}, {
		duration: 500,
		step: function(now, fx) {detailBox.scale(now).update();}
	});
	stage.appendChild(currentClickedElement);
		// fade the element container
	$("div#elementsContainer").animate({opacity: "0.2"}, 500);
}




	//---------------
	// MAIN LOOP
	//---------------
	// this initializes the main loop of this interactive agile/scrum project cycle
function initMainLoop()
{
    	// this pulsates the currentHovered Element size if it is not null or empty
    if (currentHoveredElement != null && !elementClicked) {
    	if (currentScaleSize < 1.10) {
	    	currentHoveredElement.scale(currentScaleSize);
	    	currentHoveredElement.update();
	    	currentScaleSize += scaleAdder;
    	}
    }
}