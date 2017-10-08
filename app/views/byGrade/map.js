//
function(doc) {
	if (doc.type = "student") {
		emit(doc.grade, doc);
	}
}