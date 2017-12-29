(function ($) {
    const elementContainer = 'select-extended-element';
    const pureElement = 'select-extend';

    function rendDropdown() {
        const select = $(this).prev(`.${pureElement}`);
        const menu = $(this).find('.dropdown-menu');

        $(menu).children().remove();

        const appendItem = (element) => {
            const label = element.innerText;
            const item = $('<a href="#" class="dropdown-item"></a>').text(label);

            item.attr('data-index', $(element).data('index'))

            if ($(element).is('option:selected')) {
                item.addClass('active')
            }

            if ($(element).is('option:disabled')) {
                item.addClass('disabled')
            }

            menu.append(item)
        };

        const appendHeader = (element) => {
            const label = $(element).attr('label');
            const item = $('<span class="dropdown-header"></span>').text(label);
            menu.append(item)
        };

        const randElements = (elements) => {
            elements.each((index, element) => {
                if ($(element).is('optgroup')) {
                    const childElements = $(element).children();

                    appendHeader(element);
                    randElements(childElements)
                }

                if ($(element).is('option')) {
                    appendItem(element);
                }
            })
        };

        randElements(select.children());
    }

    function toggleElement(event) {
        event.preventDefault();

        const select = $(this).parents(2).prev(`.${pureElement}`);
        const dropdown = $(this).parent().parent();
        const multiple = select.attr('multiple');

        if (multiple) {
            event.stopPropagation();
        }

        if ($(this).hasClass('disabled') || $(this).hasClass('dropdown-header')) {
            return;
        }

        if (!multiple) {
            select.find('option').attr('selected', false);
            dropdown.find('.active').removeClass('active');
        }

        const index = $(this).data('index');

        const option = select.find('option[data-index="'+index+'"]');
        $(option).attr('selected', !$(option).attr('selected'));

        rendDropdown.call(dropdown);
        changeOption(select);
    }

    function getSelectedLabel(element) {
        const selected = $(element).find("option:selected");
        const selectedArray = [];

        selected.each((index, option) => {
            selectedArray.push(option.innerText)
        });

        return selected.length !== 0 ? selectedArray.join(', ') : 'Nothing selected'
    }

    function updateElement(select, extended) {
        const label = getSelectedLabel(select);
        $(extended).find('.btn').text(label)
    }

    function changeOption(select) {
        const selectElement = $(select);
        const selectExtendedElement = $(selectElement).next(`.${elementContainer}`);

        updateElement(selectElement, selectExtendedElement)
    }

    function createSelectElement(element) {
        if (!$(element).is('select')) {
            throw new Error('Only <select /> elements are allowed')
        }

        if ($(element).hasClass(pureElement)) {
            return;
        }

        const label = getSelectedLabel(element);
        const button = $('<button class="btn btn-secondary btn-block dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>');
        const dropdown = $('<div class="dropdown-menu"></div>');
        const select = $('<div class="dropdown"></div>').addClass(elementContainer);

        $(element).find('option').each((index, option) => $(option).attr('data-index', index));

        $(element).addClass(pureElement);
        $(element).after(select.append(button.text(label), dropdown))
    }

    $('body')
        .on('click', `.${elementContainer} .dropdown-menu > *`, toggleElement)
        .on('show.bs.dropdown', `.${elementContainer}`, rendDropdown)
        .on('change', `.${pureElement}`, function () {
            changeOption(this);
        });

    // jQuery plugin with options
    $.fn.extendSelect = function() {
        try {
            $(this).each((index, element) => createSelectElement(element));
        } catch (e) {
            console.error(e);
        }
    };
})(jQuery);
