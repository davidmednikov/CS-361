//Global variables and objects
var postControls;
//var postId = 0;
var tempPost;

var Post = function (){
	this.user = "";
	this.date = "";
	this.message = "";
	this.image = ""; 
	this.lnk = ""; 
	this.privSetting = "";
	this.isFake = false;
}


//Functions
//Event listeners
window.addEventListener("message", receiveMessage);
window.addEventListener("load", OnPageLoad);

function ELByID(id){
	return document.getElementById(id);
}

function OnPageLoad(){
	//Saving all dom reference for Create Post form
	postControls = new Post();
	postControls.user = ELByID("userInput");
	postControls.date = ELByID("dateInput");
	postControls.message = ELByID("msgInput");
	postControls.image = ELByID("imageInput");
	postControls.lnk = ELByID("linkInput");
	postControls.privSetting = ELByID("privInput");
	postControls.isFake = ELByID("fakeInput");

	//Adding click listener to submit button to start 
	//new Post DOM addition to page
	var submitBtn = ELByID("submitInput");
	submitBtn.addEventListener("click", AddPost);
}

function GetPostData(){
	postData = new Post();
	postData.user = postControls.user.value;
	postData.date = postControls.date.value;
	postData.message = postControls.message.value;
	postData.image = postControls.image.value;
	postData.lnk = postControls.lnk.value;
	postData.privSetting = postControls.privSetting.value;
	postData.isFake = postControls.isFake.checked;
	return postData;
}

function AddPost(){
	console.log("adding new post to page");
	var newData = GetPostData();
	var insertLocation = ELByID("createPost");
	//Creating post as a fragment, not part of page DOM yet
	var newPost = CreatePost(postData);

	//TODO: Add function to send form data to server via Ajax

	//Opening warning popup
	if(newData.isFake){
		OpenFakeWarning("warning.html", 400, 300);
		tempPost = newPost;
		return;
	}
	//Finally adding newly built post to page at insertLocation
	insertAfter(newPost, insertLocation);
}

function CreatePost(postData){
	var elements = new Array(8);	// array of 8 DOM elements for post to be added
	var fragment = document.createDocumentFragment();
	var container = document.createElement("div");	
	//Color post container based on fake status
	elements[0] = document.createElement("span");
	elements[0].textContent = postData.user;
	elements[1]  = document.createElement("span");
	elements[1].textContent = postData.date;
	elements[2] = CreateLink(postData.lnk, "Link");
	elements[3]  = document.createElement("div");
	elements[3].textContent = "Image: " + postData.image;
	elements[4] = document.createElement("p");
	elements[4].className = "PostText";
	elements[4].textContent = postData.message;
	elements[5] = CreateButton("Like", null, postData.isFake);
	elements[6] = CreateButton("Reply", null, postData.isFake);
	elements[7] = CreateButton("Report", OpenPostReport, postData.isFake);
	if(postData.isFake){
		container.className = "FakePost";	
	}
	else {
		container.className = "Post";	
	}
	//Adding elements to container , this doesn't add them to the page yet
	for(var i = 0; i < elements.length; i++){
		container.appendChild(elements[i]);
	}
	fragment.appendChild(container);
	return fragment;	
}

function CreateLink(link, text){
	var linkElm  = document.createElement("a");
	var linkText = document.createTextNode(text);
	linkElm.appendChild(linkText);
	linkElm.href = link;
	return linkElm;
}
function CreateButton(btnText, listener, isFake){
	var btnElm  = document.createElement("input");
	btnElm.setAttribute("type", "button");
	btnElm.value = btnText;
	if(isFake && listener != null){
		btnElm.addEventListener("click", listener);
	}
	return btnElm;
}
function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function OpenFakeWarning(url, width, height){
	var child = OpenWindow(url, "_blank", window, width, height); 

 	//Poll for response from child window
    var interval = setInterval(function() {
	    if (child.closed){
	    	clearInterval(interval);	//Stop polling for reponse
	        return; 
	    }
	    //Ask for result from child window
	    else {
	    	child.postMessage({ message: "requestResult" }, "*");
	    }
    }, 500);
 }

function OpenPostReport(){

}
function OpenWindow(url, title, win, w, h){
	var y = win.top.outerHeight / 2 + win.top.screenY - ( h / 2);
    var x = win.top.outerWidth / 2 + win.top.screenX - ( w / 2);
    var options = 'toolbar=no, location=no, directories=no, status=no,';
        options +='menubar=no, scrollbars=no, resizable=no, copyhistory=no,';
        options +='width='+ w.toString() +', height='+ h.toString()+ ', ';
        options +='top=' + y.toString() + ', left=' + x.toString();
   var child = win.open(url, title, options);	//Opening new window
   return child;
}

function receiveMessage(event)
{
  // event.source is popup, event.data is data from popup
  //console.log("Received data from popup:");
  if (event.data.message == "deliverResult") {
        console.log("Warning popup button: " + event.data.result);       
        event.source.close();
        if(event.data.result == "Post"){
        	//Creating the post
        	var insertLocation = ELByID("createPost");
        	insertAfter(tempPost, insertLocation);
        }
    }
}





