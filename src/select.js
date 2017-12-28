(function ($) {
    const elementContainer = 'select-extended-element';
    const pureElement = 'select-extend';

    function openDropdown() {
        const children = $(this).prev(`.${pureElement}`).children();
        const menu = $(this).find('.dropdown-menu');

        $(menu).children().remove();

        const appendItem = (element) => {
            const label = element.innerText;
            const active = $(element).is('option:selected') ? 'active' : '';
            const item = $('<a href="#" class="dropdown-item"></a>').text(label).addClass(active);
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
        }

        randElements(children);
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
        const selectElement = $(select.currentTarget);
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


        $(element).addClass(pureElement);
        $(element).after(select.append(button.text(label), dropdown))
    }

    // jQuery plugin with options
    $.fn.extendSelect = function() {
        try {
            $(this).each((index, element) => createSelectElement(element));

            // Listeners
            $(`.${elementContainer}`)
                .off('show.bs.dropdown')
                .on('show.bs.dropdown', openDropdown);

            $(`.${pureElement}`)
                .off('change')
                .on('change', changeOption);
        } catch (e) {
            console.error(e);
        }
    };
})(jQuery);
