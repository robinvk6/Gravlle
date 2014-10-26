$(document).ready(function () {
	$('#requestACheck').validate({
		onKeyup: true,
		onFocus: true,
		sendForm : false,
		eachValidField : function() {
			$(this).closest('div.control-group').removeClass('error').addClass('success');
		},
		eachInvalidField : function() {
			$(this).closest('div.control-group').removeClass('success').addClass('error');
		}
	});

	$('#mcheckDate').datepicker({
		format: 'yyyy-mm-dd',
		todayBtn: 'linked'
	});

	$('#checkDateControl').datepicker({
		format: 'yyyy-mm-dd',
		todayBtn: 'linked'
	});

	$("#amount").mask("000,000,000,000,000.00", {reverse: true});
	$("#checkDate").mask("9999-99-99");

});
function editInnerModal(transactStatus,recipientsName,recipientsAddress,date,tId,info,amount,memo){

	$("#mtransactStatus").attr({
		"value": transactStatus
	});

	$("#mrecipientsName").attr({
		"value": recipientsName
	});

	$("#mrecipientsAddress").attr({
		"value": recipientsAddress
	});

	$("#mamount").attr({
		"value": amount
	});

	$("#mamount").attr({
		"value": amount
	});


	$("#mtId").attr({
		"value": tId
	});

	$("#mcheckDate").attr({
		"value": date
	});

	$("#mcheckInfo").attr({
		"value": info
	});

	$("#mcheckMemo").attr({
		"value": memo
	});
}