$(document).ready(function() {
	// date masks
	$("#fromDate, #toDate").mask("9999-99-99");


	$('#fromDateControl, #toDateControl').datepicker({
		format: 'yyyy-mm-dd',
		todayBtn: 'linked'
	});

	$("#PrintinPopup").click(function() {
		printElem({overrideElementCSS: ['/resources/css/bootstrap.css']});
	});


	function printElem(options) {
		$('#toPrint').printElement(options);
	}

});

