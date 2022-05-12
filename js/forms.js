function inputPlaceholder(params) {    
    $input = $(params.input);    
    $input.each(function() {
        let $thisInput = $(this);

        if ($thisInput.is('input') && $thisInput.attr('type') != 'checkbox' && $thisInput.attr('type') != 'radio' || $thisInput.is('textarea')) {
            if (!$thisInput.hasClass('is-init') && $thisInput.val().length > 0) {
                $thisInput.parent('.input-field').addClass('has-value');
            }

            if (!$thisInput.hasClass('is-init')) {
                $thisInput.addClass('is-init');

                $thisInput.on({
                    focus: function() {
                        let $this = $(this);

                        $this.parent('.input-field').addClass('is-focused');
                    },
                    focusout: function() {
                        let $this = $(this);

                        $this.parent('.input-field').removeClass('is-focused');
                    },
                    keypress: function(e) {
                        let $this = $(this);
                        let keycode = e.keyCode || e.charCode;
                        let numbersRegex = new RegExp('^[0-9\+\ \b\(\)\-]+$');
                        let keycodeString = String.fromCharCode(keycode);

                        if ($this.hasClass('only-numeric') && $this.attr('type') != 'tel') {
                            if ($this.data('numeric') == 'postal') {
                                numbersRegex = new RegExp('^[0-9\-\ \b]+$');
                            } else {
                                numbersRegex = new RegExp('^[0-9\ \b]+$');
                            }
                        }

                        if ($this.val().length == 0 && keycode == 32 || e.target.selectionStart == 0 && keycode == 32 || $this.hasClass('only-numeric') && !numbersRegex.test(keycodeString)) {
                            return false;
                        }
                    }
                });

                $thisInput.on('change paste keyup', function(e) {
                    let $this = $(this);
                    let value = $this.val();
                    let formattedValue = value.replace(/ +(?= )/g, '').trimStart();

                    if (e.type == 'paste' && $this.hasClass('only-numeric')) {
                        return false;
                    }

                    $this.val(formattedValue);

                    if (formattedValue.length > 0) {
                        $this.parent('.input-field').addClass('has-value');
                    } else {
                        $this.parent('.input-field').removeClass('has-value');
                    }
                });

                if ($thisInput.is('textarea')) {
                    $thisInput.scroll(function() {
                        if ($(this).scrollTop() > 0) {
                            $thisInput.parent('.input-field').addClass('text-hidden');
                        } else {
                            $thisInput.parent('.input-field').removeClass('text-hidden');
                        }
                    });
                }
            }
        } else if ($thisInput.attr('type') == 'checkbox' || $thisInput.attr('type') == 'radio') {
            console.log('Error: Object is checkbox or radio. Placeholder is compatible only with other types of inputs.');
            console.log($thisInput);
            console.log('_______________________________________');
        } else {
            console.log('Error: Object is not an input or textarea.');
            console.log($thisInput);
            console.log('_______________________________________');
        }
    });
}