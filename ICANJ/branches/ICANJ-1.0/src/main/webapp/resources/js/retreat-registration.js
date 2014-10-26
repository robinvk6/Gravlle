/**
 * @param roomType
 * @param ageGroup
 * @returns
 */
function calculateTotal(memberRow) {

    var personTotalCost = 0;
    var totalCost = 0;

    retreatStatus = $(memberRow).find('input#isGoing').is(':checked');
    roomType = $(memberRow).find('select#roomType').val();
    ageGroup = $(memberRow).find('select#ageGroup').val();

    var roomPrice = 0;
    switch (roomType) {
        case 'none':
            roomPrice = 0;
            break;
        case 'deluxe':
            roomPrice = 125;
            break;
        case 'standard1':
            roomPrice = 118;
            break;
        case 'standard2':
            roomPrice = 118;
            break;
    }

    switch (ageGroup) {
        case 'between5And12':
            roomPrice = 73;
            break;
        case 'below5':
            roomPrice = 0;
            break;
    }


    if (retreatStatus) {
        personTotalCost = roomPrice;
        console.log('Cost of room is based on selection ' + roomPrice);
    }

    $(memberRow).find('input.personTotalCost').val(personTotalCost);


    $('input.personTotalCost').each(function() {
        cost = parseInt($(this).val());
        if (!isNaN(cost)) {
            totalCost = totalCost + parseInt($(this).val());
        }
    });

    console.log('Final cost for all members is' + totalCost);

    $('input#totalCost').val(totalCost);
    $('label#totalCostLabel').html(totalCost);
}

$(document).ready(function() {

    // disable form submit on start
    $('#submitRetreatForm').attr('disabled', 'disabled');
    
    /**
     * Recalculate total amount on age group selection.
     */
    $('select#ageGroup').change(function() {
        memberRow = $(this).closest('tr');
        // if something other than none is selected
        if ($(this).val() == 'none') {
            $(memberRow).find('select#roomType').val('none');
            if($(memberRow).find('input#isGoing').val() == 'on') {
                $(memberRow).find('input#isGoing').trigger('click');
            }
        } else {
            // turn is going checkbox to on.
            if ($(memberRow).find('input#isGoing').val() == 'off') {
                // $(memberRow).find('input#isGoing').prop('checked', true);
                $(memberRow).find('input#isGoing').trigger('click');
            }

            // turn room type to delux if nothing is selected
            if ($(memberRow).find('select#roomType').val() == 'none') {
                $(memberRow).find('select#roomType').val('deluxe');
            }
        }
        
        // re-calculate total amount
        calculateTotal(memberRow);
    });

    /**
     * Recalculate total amount on room type selection.
     */
    $('select#roomType').change(function() {
        memberRow = $(this).closest('tr');
        // if something other than none is selected
        if ($(this).val() == 'none') {
            $(memberRow).find('select#ageGroup').val('none');
            if($(memberRow).find('input#isGoing').val() == 'on') {
                $(memberRow).find('input#isGoing').trigger('click');
            }
        } else {
            // turn is going checkbox to on.
            if ($(memberRow).find('input#isGoing').val() == 'off') {
                // $(memberRow).find('input#isGoing').prop('checked', true);
                $(memberRow).find('input#isGoing').trigger('click');
            }

            // turn room type to above12 if nothing is selected
            if ($(memberRow).find('select#ageGroup').val() == 'none') {
                $(memberRow).find('select#ageGroup').val('above12');
            }
        }
        
        // re-calculate total amount
        calculateTotal(memberRow);
    });

    /**
     * Explicity setting checkbox value to be sent in POST
     * Recalculate total amount on is-going selection.
     */
    $('input#isGoing').click(function() {
        memberRow = $(this).closest('tr');
        if ($(this).val() == 'off') {
            $(this).val('on');
            // turn room type to above12 if nothing is selected
            if ($(memberRow).find('select#ageGroup').val() == 'none') {
                $(memberRow).find('select#ageGroup').val('above12');
            }
            // turn room type to deluxe if nothing is selected
            if ($(memberRow).find('select#roomType').val() == 'none') {
                $(memberRow).find('select#roomType').val('deluxe');
            }

        } else {
            $(this).val('off');
            $(memberRow).find('select#roomType').val('none');
            $(memberRow).find('select#ageGroup').val('none');
        }
        
        // re-calculate total amount
        calculateTotal(memberRow);
    });
    
    // enable submit button when user has agreed to conditions
    $('input#iAgree').click(function() {
      if( $(this).is(':checked') ) {
          $('button#submitRetreatForm').removeAttr('disabled');
      } else {
          $('button#submitRetreatForm').attr('disabled', 'disabled');
      }
    });

});
