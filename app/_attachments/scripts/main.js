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
		},
		error:			function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(errorThrown);
		}
	});
}