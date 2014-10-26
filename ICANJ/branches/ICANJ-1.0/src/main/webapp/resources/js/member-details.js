
/**
 * JS file for member details edit page
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

	// display seperate input if relationship not found in drop-down
	$("#relationship").change( function() {
		var relSelected = $("#relationship option:selected").text();
		if( relSelected === 'Other' ) {
			$('.other, .gender').show();
			$('.other, .gender').addClass('required');
		} else {
			$('.other, .gender').hide();
			$('.other, .gender').removeClass('required');
		}
	});

	/**
	 * Apply validation to the elements on screen
	 */
	$('#memberDetail').validate({
		onKeyup : true,
		debug: true,
		eachValidField : function() {
			$(this).closest('div.control-group').removeClass('error').addClass('success');
			// $(this).find('.help-block').text('');
		},
		eachInvalidField : function() {
			$(this).closest('div.control-group').removeClass('success').addClass('error');
			// $(this).find('.help-block').text('Incorrect value');
		}
		/*
		 ,
		conditional : {
			confirmPassword : function() {
				return $(this).val() == $('#password1').val();
			},
			confirmEmail : function() {
				return $(this).val() == $('#emailAddress').val();
			}
			*/
	});

});
