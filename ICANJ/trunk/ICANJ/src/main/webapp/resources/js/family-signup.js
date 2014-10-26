$(document).ready(function() {

	$('#familySignup').validate({
		onKeyup : true,
		onFocus: true,
		eachValidField : function() {
			$(this).closest('div.control-group').removeClass('error').addClass('success');
		},
		eachInvalidField : function() {
			$(this).closest('div.control-group').removeClass('success').addClass('error');
		}
	});

});