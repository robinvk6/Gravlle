$(document).ready(function() {
    $("#editState").val("${family.address.state}");

    $('#homePhoneNumber')
            .mask("(999) 999-9999")
            .bind("blur", function() {
        // force revalidate on blur.

        var frm = $("#updateFamily");
        // if form has a validator
        if ($.data(frm[0], 'validate')) {
            var validator = $("#updateFamily").validate();
            validator.settings.onfocusout.apply(validator, [this]);
        }
    });

    $("#zip")
            .mask("99999")
            .bind("blur", function() {
        // force revalidate on blur.

        var frm = $("#updateFamily");
        var test = ($._data(frm[0]));
        // if form has a validator
        console.log($("#updateFamily").data('events'), function(i, event) {
            
        });
        if ($._data(frm[0], 'validator') || $._data(frm[0], 'validate')) {
            var validator = $("#updateFamily").validate();
            validator.settings.onfocusout.apply(validator, [this]);
        }
    });

    $('#updateFamily').validate({
        onChange: true,
        onKeyup: true,
        eachValidField: function() {
            $(this).closest('div.control-group').removeClass('error').addClass('success');
            $(this).find('.help-block').text('');
        },
        eachInvalidField: function() {
            $(this).closest('div.control-group').removeClass('success').addClass('error');
            $(this).find('.help-block').text('Incorrect value');
        }
    });



});

function getMemberInfo(memberId) {
    $("#memberId").attr({"value": memberId});
}