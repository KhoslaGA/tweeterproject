$(document).ready(function () {

    $("#tweet-text").on('input', function () {
        const inputTextLength = $(this).val().length;
        const remainingChars = 140 - inputTextLength;

        //Add a class in HTML when triggered that will change the
        if (remainingChars < 0) {
            $("output").addClass('counterLimit');

        } else {
            $("output").removeClass('counterLimit');
        }
        //re-writes the char counter
        $("output").val(remainingChars);


    })
});