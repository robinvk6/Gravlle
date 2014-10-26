$(document).ready(function() {
		$('#rcvdDateControl, #checkDateControl').datepicker({
		format: 'yyyy-mm-dd',
		todayBtn: 'linked'
	});
		$('#fromDateControl, #toDateControl').datepicker({
			format: 'yyyy-mm-dd',
			todayBtn: 'linked'
		});
			

	 $("#rcvdDate, #checkDate").mask("9999-99-99");

	$("#amount, #subAmount1, #subAmount2, #subAmount3, #subAmount4, #subAmount5").mask("000,000,000,000,000.00", {reverse: true});
	
	
	
	$('#paymentType').change(function(){
		selectedTranType = $(this).val()
		if( selectedTranType == 'Cash' ) {
			$('#checkInfo').closest('.control-group').hide();

		} else {
			$('#checkInfo').closest('.control-group').show();
			$('#checkDate').closest('.control-group').show();
		}
	});
	
	$('#transactStatus').change(function(){
		selectedTranStatus = $(this).val()
		if( selectedTranStatus == 'T_SIGNOFF' ) {
			$('#signoffStatDIV').show();
		} else{
			$('#signoffStatDIV').hide();
		}
	});
	
	

	$('#receiptManagement').validate({
		onKeyup: true,
		onFocus: true,
		eachValidField : function() {
			$(this).closest('div.control-group').removeClass('error').addClass('success');
		},
		eachInvalidField : function() {
			$(this).closest('div.control-group').removeClass('success').addClass('error');
		}
	});

});


function showMember(str)
{
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
		{
			document.getElementById("txtHint").innerHTML = xmlhttp.responseText;
		}
	}
	xmlhttp.open("GET", "/Directory/SearchMember?function=createTitheModal&modal=titheModal&srchMember=" + str, true);
	xmlhttp.send();
}

function createTitheModal(memberId, familyId) {

	$("#setMemberId").attr({"value": memberId});
	$("#setFamilyId").attr({"value": familyId});

}

function activateDatePicker() {
	$('#dp2').datepicker();
}
