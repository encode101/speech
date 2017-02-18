voice.service("speech",function(){
	
})

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

	  var seekpermission = function(){
	  	alert("Raghav");
	  }

	  var onstart = function() {

	  }
	  
	  recognition.onerror = function(event) {}
	  recognition.onend = function() {
	  	// recognition.start();
	  }

	  // Start Event
	  
	 var startButton = function (event) {
	  //$location.path('/notes')
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
        final_transcript += event.results[i][0].transcript;
        takeCommand(event.results[i][0].transcript)
      } else {
        interim_transcript += event.results[i][0].transcript;
        // takeCommand(event.results[i][0].transcript)
      }
    }
    final_transcript = capitalize(final_transcript);
    // console.log(final_transcript)
    // console.log(interim_transcript)
    
    // final_span.innerHTML = linebreak(final_transcript);
    // interim_span.innerHTML = linebreak(interim_transcript)
    
    if (final_transcript || interim_transcript) {
      // showButtons('inline-block');
    }
  };
	}