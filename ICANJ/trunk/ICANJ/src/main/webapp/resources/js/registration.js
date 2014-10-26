/**
 * Set value for postback
 */
function createAccountModal(memberID){
	$("#setMemberId").attr({
		"value": memberID
	});
}


$(document).ready(function() {
	$('#pswd_info').hide();
	$('#password1, #password2').attr('disabled', 'true');

	/**
	 * Apply jQuery validation to the elements on screen
	 *
	 * Plugin: https://github.com/DiegoLopesLima/Validate
	 */
	$('#createAccount').validate({
		onChange : true,
		onBlur: true,
                onKeyup: true,
		eachValidField : function() {
			$(this).closest('div.control-group').removeClass('error').addClass('success');
			$(this).find('.help-block').text('');
		},
		eachInvalidField : function() {
			$(this).closest('div.control-group').removeClass('success').addClass('error');
			$(this).find('.help-block').text('Incorrect value');
		},
		conditional : {
			confirmPassword : function() {
				return $(this).val() == $('#password1').val();
			},
			confirmEmail : function() {
				pwd1 = $(this).val();
				pwd2 = $('#emailAddress').val();
				if( ( pwd1 != '' && pwd2 != '' ) && ( pwd1 == pwd2 ) ) {
					$('#password1, #password2').removeAttr('disabled');
					$('#password1').focus();
					return true;
				} else {
					$('#password1, #password2').attr('disabled', 'true');
					$('#pswd_info').hide();
				}
			}
		}
	});

	/**
	 * jQuery validate extension to check if password meets strength criteria
	 *
	 * Plugin: https://github.com/DiegoLopesLima/Validate
	 */
	jQuery.validateExtend({
		password1: {
			required: true,
			conditional: function( value ) {

				// set password variable
				var pswd = $(this).val();
				overAllTrue = true;
				whatWasWrong = '';

				if ( pswd.length > 7 && pswd.length < 40 ) {
					$('#length').removeClass('invalid').addClass('valid');
				} else {
					overAllTrue = false;
					whatWasWrong = 'length ';
					$('#length').removeClass('valid').addClass('invalid');
				}

				//validate letter
				if ( pswd.match(/[A-z]/g) ) {
					$('#letter').removeClass('invalid').addClass('valid');
				} else {
					overAllTrue = false;
					whatWasWrong = whatWasWrong + 'letter ';
					$('#letter').removeClass('valid').addClass('invalid');
				}

				//validate capital letter
				if ( pswd.match(/[A-Z]/g) ) {
					$('#capital').removeClass('invalid').addClass('valid');
				} else {
					whatWasWrong = whatWasWrong + 'Capital letter ';
					overAllTrue = false;
					$('#capital').removeClass('valid').addClass('invalid');
				}

				//validate number
				if ( pswd.match(/[0-9]/g)) {
					$('#number').removeClass('invalid').addClass('valid');
				} else {
					whatWasWrong = whatWasWrong + 'Number ';
					overAllTrue = false;
					$('#number').removeClass('valid').addClass('invalid');
				}

				if( pswd.match(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15})/gm)) {
					overAllTrue = true;
				}


				if( overAllTrue == true ) {
					$(this).closest('div.control-group').removeClass('error').addClass('success');
					return true;
				} else {
					$(this).closest('div.control-group').removeClass('success').addClass('error');
				}
			}
		}
	});


	$('#password1').focus(function() {
		$('#pswd_info').show();
	}).blur(function() {
		$('#pswd_info').hide();
	});

	$('#accountModal').on('hide', function(){
		$('input#password1').val('');
		$('input#password2').val('');
		$('input#emailAddress').val('');
		$('input#emailAddress2' ).val('');
	});

});

