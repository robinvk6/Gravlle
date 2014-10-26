$(document).ready(function() {

	// close alert message window
	//$('.alert').alert('close');
	//$("#errorBox").alert('close');
	// ICANJ directory dataTable setup
$("#directory").dataTable({
		"bJQueryUI": true,
		"sPaginationType": "full_numbers",
		"bRetrieve":true,
        "bDestroy": true,
		"fnInitComplete": function() {
				// adding styling to dataTable element to ensure the search and
				// entries-per-page drop down appear in order
				$("div#directory_filter").addClass(" pull-right");
				$("div#directory_length").addClass(" pull-left");
		}
	});
	

	/*function loggedUserProfile() {

	}*/
});

function getCurrentDate(){
	var d = new Date();
	return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
}