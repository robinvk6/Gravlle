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
	// disable search button
/*	$('#searchReceipt').attr('disabled', 'disabled');

	// do not enable search button until either one of the date fields are filled
	$("#fromDate, #toDate").live(function() {
		fromDateVal = $('#fromDate').val();
		toDateVal = $('#toDate').val();
		alert(fromDateVal);
		alert(toDateVal);
		if (fromDateVal != '' && toDateVal != '') {
			$('#searchReceipt').removeAttr('disabled');
		}
	});
*/
	

});

function listMember(str)
{	$('#memberSelect').empty();
	var xmlhttp;
	if (str == "")
	{
		document.getElementById("txtHint").innerHTML = "";
		return;
	}
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function()
	{
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
		{	var data = JSON.parse(xmlhttp.responseText);
		
			if(data){
				for(var index in data){
					var member = data[index];
					$('#memberSelect').append($('<option>').text(member.firstName +" "+ member.lastName).val(member.memberId));
				}
			}
			//document.getElementById("txtHint").innerHTML = xmlhttp.responseText;
		}
	}
	xmlhttp.open("GET", "/Directory/ListMember/" + str, true);
	xmlhttp.send();
}