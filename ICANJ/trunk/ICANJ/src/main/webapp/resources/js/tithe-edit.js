//$(document).ready(function() {
//	$("#paymentType").val("${tithe.paymentType}");
//	$("#transactStatus").val("${tithe.transactStatus}");
//
//	$('#rcvdDateControl, #checkDateControl').datepicker({
//		format: 'yyyy-mm-dd',
//		todayBtn: 'linked'
//	});
//
//	$("#amount").mask("000,000,000,000,000.00", {reverse: true});
//
//});

$(document).ready(function(){
	$("#paymentType").val("${payment.paymentType}");
	$("#transactStatus").val("${payment.transactStatus}");
	$("#subTransactType").val("${payment.memo}");

	$('#checkDate').datepicker({
		format: 'yyyy-mm-dd',
        todayBtn: 'linked'
	});
});