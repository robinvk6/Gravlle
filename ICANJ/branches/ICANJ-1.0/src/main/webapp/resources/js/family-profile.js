/**
 * Javascript for My Family Profile page
 */
$(document).ready(function() {
	// initialize date picker for DOB
	$('#member-dob').datepicker({
		format: 'mm-dd-yyyy'
	});

	// hide gender by default as we know it from the list of items selecte
	// by user from the drop-down
	$('.gender').hide();

	// masking input
	$("#phoneNumber").mask("(999) 999-9999");
	$("#workPhoneNumber").mask("(999) 999-9999? x99999");
	$("#dateOfBirth").mask("99-99-9999");

});