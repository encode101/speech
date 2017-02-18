var voice = angular.module("Voice",["ui.router","ui.bootstrap"])

.factory('message',function(){
	var msg = "Happy Holi";
	return msg;	
})

.config(function($stateProvider, $urlRouterProvider){
	
	$urlRouterProvider.otherwise("/info");	// Default Route

	$stateProvider
		.state("dash",{
			url:"/dash",
			templateUrl:"templates/home.html",
			controller:"HomeCtrl"
		})

		.state("info",{
			url:"/info",
			templateUrl:"templates/info.html",
			controller:"InfoCtrl"
		})

		.state("notes",{
			url:"/notes",
			templateUrl:"templates/notes.html",
			controller:"NotesCtrl"
		})
})

// Home Controller

.controller("homeCtrl",function($scope){
	$scope.message = "Hey There";
})

.controller("InfoCtrl",function($scope,$location){
	// $scope.document.getElementById("intro").innerHTML = "Hi There :)";
	var messages = [
	"Don't Manage Your Tasks, Command It",
	"Voice Controled Task Manager",
	"Click On The Mic To Start"
	]

	// $scope.message = message.msg;
	
	var count = 0;

	var flashMessages = window.setInterval(function(){
		$("#intro").fadeOut(1500,function(){
			$("#intro").html(messages[count]);	
		});
		$("#intro").fadeIn(1500);
		count++;
		if(count == messages.length){
			count = 0
		}
	},5000);

	flashMessages;

	$scope.switchMicOn = function(){
		$("#switchMic").attr("src","images/microphone-active.png");
	}

	$scope.switchMicOff = function(){
		$("#switchMic").attr("src","images/microphone-on.png");
	}

	function capitalize(s) {
	  return s.replace(first_char, function(m) { return m.toUpperCase(); });
	}
	var first_char = /\S/;
	var two_line = /\n\n/g;
	var one_line = /\n/g;
	function linebreak(s) {
	  return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
	}

	if (!('webkitSpeechRecognition' in window)) {
	   //upgrade();
	} else {
	  recognition = new webkitSpeechRecognition();
	  recognition.continuous = true;
	  recognition.interimResults = true;
	  var recognizing = false;

	  $scope.seekpermission = function(){
	  	alert("Raghav");
	  }

	  $scope.onstart = function() {

	  }
	  
	  recognition.onerror = function(event) {}
	  recognition.onend = function() {
	  	$("#results").html("Done");
	  }

	  // Start Event
	  
	 $scope.startButton = function (event) {
	  $location.path('/notes')
	  if (recognizing) {
	    recognition.stop();
	    return;
	  }
	  final_transcript = '';
	  // recognition.lang = select_dialect.value;
	  recognition.start();
	  ignore_onend = false;
	  //final_span.innerHTML = '';
	  //interim_span.innerHTML = '';
	}

	// Done, Show Me The Results

	recognition.onresult = function(event) {
    var interim_transcript = '';
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_transcript = event.results[i][0].transcript;
        takeCommand(event.results[i][0].transcript)
      } else {
        interim_transcript += event.results[i][0].transcript;
        // takeCommand(event.results[i][0].transcript)
      }
    }
    final_transcript = capitalize(final_transcript);
    // console.log(final_transcript)
    // console.log(interim_transcript)
    
    final_span.innerHTML = linebreak(final_transcript);
    interim_span.innerHTML = linebreak(interim_transcript)
    
    if (final_transcript || interim_transcript) {
      // showButtons('inline-block');
    }
  };
	}
})

.controller("NotesCtrl",function($scope){

	var msg = new SpeechSynthesisUtterance("Hi, What's Up?");
    window.speechSynthesis.speak(msg);

	/*var showCommand = function(command){
		$("#displayCommand").html(command);
		$("#displayCommand").fadeIn()
		setTimeout(function(){
			$("#displayCommand").fadeOut()
		},3000)
		
	}*/
	takeCommand = function(command){
		var msg = new SpeechSynthesisUtterance('Alright! Task : '+command+" Done.");
    	window.speechSynthesis.speak(msg);
		// showCommand(command)
		if(command == "create note"){
			alert("New Note Created")
		}
		// localStorage.setItem("command",command);
	}
})