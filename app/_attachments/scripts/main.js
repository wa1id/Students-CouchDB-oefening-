var ALL_DOCS = "../../_all_docs?include_docs=true";

function createDoc() {
	
	//get the value of our input fields by id
	var firstName = $("#firstName").val();
	var lastName = $("#lastName").val();
	var course = $("#course").val();
	var grade = $("#grade").val();
	var doc = {}; //array that will store the value of the input fields
	
	//fill array with value of input fields
	doc.firstName = firstName;
	doc.lastName = lastName;
	doc.course = course;
	doc.grade = parseInt(grade); //we expect this to be a number so we parse it to an int
	doc.type = "student"; //used to filter out design_app later, so only use documents that we created 
	var json = JSON.stringify(doc); //make valid json doc
	console.log(json);
	
	$.ajax({
		type:			"PUT",
		url:			"../../" + firstName + "_" + lastName,
		data:			json, // <-- var
		contentType:	"application/json", //Don't forget! Otherwise CouchDB says fuck you
		async:			true, //this is true by default
		success:		function(data) {
			console.log(data);
			buildOutput(ALL_DOCS);
		},
		error:			function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(errorThrown);
		}
	});
}

function buildOutput(view) {
	$("#output").html(""); //clear div
	$.ajax({
		type:			"GET",
		url:			view,
		contentType:	"application/json",
		async:			true,
		success:		function(data) {
			var arr = JSON.parse(data).rows; //convert text to object
			var htmlString = "<table>";
			
			//go through arr, find all student fields in documents and add it to the table htmlString
			for (var i = 0; i < arr.length; i++) {
				if(arr[i].doc.type === 'student') { //only get documents where type field is student
					var doc = arr[i].doc; //found document with type "students", store in var doc
					htmlString += "<tr><td>" + doc.firstName + "</td><td>" + doc.lastName + "</td><td>" + doc.course + "</td><td>" + doc.grade + "</td></tr>";
				}
			}
			htmlString += "</table>";
			$("#output").html(htmlString);
		},
		error:			function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(errorThrown);
		}
	});
}