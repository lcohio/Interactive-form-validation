$(document).ready(function(){

    // Focus the first field on DOMload
    $('#name').focus();


    // Hide dynamically displayed input #other-title
    $('#other-title').hide();

    
    // Display and hide #other-title depending on #title selection
    $('#title').change(function(){
        if($(this).val() == 'other'){
            $('#other-title').show();
        } else {
            $('#other-title').hide();
        }
    });


    // Hide shirt color selector until user picks a theme
    if($('#design').val() == 'Select Theme') {
        $('#colors-js-puns label').text('Please select a T-shirt theme');
        $('#color').hide();
    }


    // Display and hide correspnding shirt colors to theme user chooses
    $('#design').change(function(){
        if($(this).val() == 'js puns') {
            $('#color').show();
            $('#color').find('option:contains(Cornflower), option:contains(Gold), option:contains(Slate)').show();
            $('#color').find('option:contains(Tomato), option:contains(Steel), option:contains(Dim)').hide();
            $('#colors-js-puns label').text($('#design option:selected').text());
            $('#color').val('cornflowerblue');
        } else if($(this).val() == 'heart js') {
            $('#color').show();
            $('#color').find('option:contains(Cornflower), option:contains(Gold), option:contains(Slate)').hide();
            $('#color').find('option:contains(Tomato), option:contains(Steel), option:contains(Dim)').show();
            $('#colors-js-puns label').text($('#design option:selected').text());
            $('#color').val('tomato');
        } else {
            $('#color').hide();
            $('#colors-js-puns label').text('Please select a T-shirt theme');
        }
    });


    // Require user to choose events that don't have time conflicts
    $('.activities input').change(function(){
        if($('input[name=js-frameworks]').prop('checked')) {
            $('input[name=express]').attr('disabled', true);
            $('input[name=express]').parent().addClass('disable');
        } else {
            $('input[name=express]').removeAttr('disabled');
            $('input[name=express]').parent().removeClass('disable');
        }
        if($('input[name=express]').prop('checked')) {
            $('input[name=js-frameworks]').attr('disabled', true);
            $('input[name=js-frameworks]').parent().addClass('disable');
        } else {
            $('input[name=js-frameworks]').removeAttr('disabled');
            $('input[name=js-frameworks]').parent().removeClass('disable');
        }
        if($('input[name=js-libs]').prop('checked')) {
            $('input[name=node]').attr('disabled', true);
            $('input[name=node]').parent().addClass('disable');
        } else {
            $('input[name=node]').removeAttr('disabled');
            $('input[name=node]').parent().removeClass('disable'); 
        }
        if($('input[name=node]').prop('checked')) {
            $('input[name=js-libs]').attr('disabled', true);
            $('input[name=js-libs]').parent().addClass('disable');
        } else {
            $('input[name=js-libs]').removeAttr('disabled');
            $('input[name=js-libs]').parent().removeClass('disable');
        }
        
    });


    // Tally chosen event costs and display total under options
    $('.activities input').change(function(){
        let total = 0;
        $('#cost').remove();
        if($("input[name=all]").is(':checked')){
            total += 200;
        }
        $('.activities input:not([name=all])').each(function(){
            if($(this).is(':checked')){
                total += 100;
            }
        });
        if(total > 0){
            $('.activities').append("<p id='cost'>Total cost: $" + total + " </p>");
        }
    });


    //Set the default payment option to Credit Card on DOMload
    $('#payment').val('credit card');
    // Disable placeholder as a selectable option
    $('#payment option:first').attr("disabled", "true");
    // Hide Bitcoin and Paypal tips on DOMload
    $('#paypal').hide();
    $('#bitcoin').hide();


    // Show and hide tips corresponding to chosen payment method
    $('#payment').change(function(){
        if($(this).val() == 'paypal'){
            $('#paypal').show();
            $('#bitcoin').hide();
            $('#credit-card').hide();
        } else if($(this).val() == 'bitcoin') {
            $('#bitcoin').show();
            $('#paypal').hide();
            $('#credit-card').hide();
        } else {
            $('#paypal').hide();
            $('#bitcoin').hide();
            $('#credit-card').show();
        }
    });


    // Validate Name, email address, checkbox selection, and payment details when form is submitted
    $('button').click(function(e){
        if(!isValidName($('#name').val()) || $('#name').val() == '') {
            e.preventDefault();
            $('label[for=name]').text('Please enter a valid first and last name.').css('color', 'red');
            $('#name').addClass('submission-error');
        } else {
            $('label[for=name]').text('Name:').css('color', '#000');
            $('#name').removeClass('submission-error');
        }
        if(!isValidEmail($('#mail').val())) {
            e.preventDefault();
            $('label[for=mail]').text('Make sure your email address is correct.').css('color', 'red');
            $('#mail').addClass('submission-error');
        } else {
            $('label[for=mail]').text('Email:').css('color', '#000');
            $('#mail').removeClass('submission-error');
        }
        if($(".activities input:checked").length == 0) {
            e.preventDefault();
            $('.activities').addClass('submission-error');
            $('.activities legend').text('You must choose at least one presentation.').addClass('submission-error-text').css('padding-left', '5px');
        } else {
            $('.activities').removeClass('submission-error');
            $('.activities legend').text('Register for Activities').removeClass('submission-error-text').css('padding-left', '0px');
        }
        if(!isValidCredit($('#cc-num').val())) {
            e.preventDefault();
            $('label[for=cc-num]').text('Please verify your card number.').css('color', 'red');
            $('#cc-num').addClass('submission-error');
        }
        if(!isValidZip($('#zip').val())) {
            e.preventDefault();
            $('label[for=zip]').text('Invalid ZIP').css('color', 'red');
            $('#zip').attr('placeholder', 'Invalid ZIP');
            $('#zip').addClass('submission-error');
        } else {
            $('label[for=zip]').text('Zip Code:').css('color', '#000');
            $('#zip').removeClass('submission-error');
            $('#zip').removeAttr('placeholder');
        }
        if($('#cvv').val() == '') {
            e.preventDefault();
            $('#cvv').attr('placeholder', 'Required.');
            $('label[for=cvv]').text('Required.').css('color', 'red');
            $('#cvv').addClass('submission-error');
        } else if(!isValidCvv($('#cvv').val())) {
            e.preventDefault();
            $('#cvv').attr('placeholder', 'Invalid CVV');
            $('label[for=cvv]').text('Invalid CVV').css('color', 'red');
            $('#cvv').addClass('submission-error');
        }  else {
            $('label[for=cvv]').text('CVV:').css('color', '#000');
            $('#cvv').removeClass('submission-error');
            $('#cvv').removeAttr('placeholder');
        }
        if($('#payment').val() == 'paypal' || $('#payment').val() == 'bitcoin'){
            $('form').submit();
        }
    });


    // Validate email input in real time against regex as user types an email address
    $('#mail').on('input',function(){
        var $regexname = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!$(this).val().match($regexname)) {
            $(this).addClass('submission-error');
            $('label[for=mail]').text('Make sure your email address is correct.').css('color', 'red');
        }
        else {
            $('label[for=mail]').text('Email:').css('color', '#000');
            $(this).removeClass('submission-error');
        }
    });


    // Validate credit card input in real time against regex as user types an email address
    $('#cc-num').on('input',function(){
        var $regexcc = /^[1-9][0-9]{12,15}$/;
        if(!$(this).val().match($regexcc)) {
            $(this).addClass('submission-error');
            $('label[for=cc-num]').text('Verify your credit card number.').css('color', 'red');
        }
        else {
            $(this).removeClass('submission-error');
            $('label[for=cc-num]').text('Card Number:').css('color', '#000');
        }
    });


    // Function tests user's name against regex
    function isValidName($name) {
        var nameReg = /^[a-z ,.'-]+$/i;
        return nameReg.test($name);
    }


    // Function tests email against regex
    function isValidEmail($email) {
        var emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailReg.test($email);
    }

    // Function tests credit card against regex
    function isValidCredit($credit) {
        var creditReg = /^[1-9][0-9]{12,15}$/;
        return creditReg.test($credit);
    }
    

    // Function tests user supplied Zip code against regex
    function isValidZip($zip) {
        var zipReg = /^\d{5}$/;
        return zipReg.test($zip);
    }


    // Function tests user supplied CVV against regex
    function isValidCvv($cvv) {
        var cvvReg = /[0-9]{3}/;
        return cvvReg.test($cvv);
    }

});


