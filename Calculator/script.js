$(document).ready(function() {
    let currentInput = '';
    let expression = '';
    let calculationDone = false;

    function updateDisplay() {
        $('#display').text(calculationDone ? currentInput : `${expression} ${currentInput}`);
    }

    function addPressEffect($button) {
        $button.addClass('pressed');
        setTimeout(() => $button.removeClass('pressed'), 100);
    }

    $('.digit').click(function() {
        currentInput = calculationDone ? $(this).text() : currentInput + $(this).text();
        calculationDone = false;
        updateDisplay();
        addPressEffect($(this));
    });

    $('.operator').click(function() {
        if (currentInput) {
            expression = expression ? `${expression} ${currentInput}` : currentInput;
            expression += ` ${$(this).text()}`;
            currentInput = '';
            calculationDone = false;
            updateDisplay();
            addPressEffect($(this));
        }
    });

    $('.equals').click(function() {
        if (currentInput) {
            expression += ` ${currentInput}`;
        }
        if (expression) {
            try {
                let result = math.evaluate(expression);
                currentInput = (result === Infinity || result === -Infinity) ? 'Error' : result.toString();
                expression = '';
                calculationDone = true;
            } catch (e) {
                currentInput = 'Error';
            }
            updateDisplay();
            addPressEffect($(this));
        } else {
            $('#display').text('');
        }
    });

    $('.clear').click(function() {
        currentInput = '';
        expression = '';
        $('#display').text('');
        calculationDone = false;
        addPressEffect($(this));
    });
});
