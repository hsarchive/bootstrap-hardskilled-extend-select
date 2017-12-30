(function ($) {
    const elementContainer = 'select-extended-element';
    const pureElement = 'select-extend';
    const selectSearch = 'select-search';
    const options = {
        search: 'Search',
        notSelectedTitle: 'Nothing to shown',
        empty: 'Nothing to shown',
    };

    function rendDropdown(menu, items, disabled) {
        $(menu).find('.dropdown-header, .dropdown-item').remove();
        
        const appendItem = (element) => {
            const label = element.innerText;
            const item = $('<a href="#" class="dropdown-item"></a>').text(label);

            item.attr('data-index', $(element).data('index'));

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

        const appendNotSownElement = () => {
            const item = $('<span class="dropdown-header"></span>').text(options.empty);
            menu.append(item)
        };

        const randElements = (elements) => {
            $(elements).each((index, element) => {
                if (disabled && $(element).is(':disabled')) {
                    return;
                }

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

        items = items.filter((index, item) => disabled ? $(item).is(':enabled') : true);

        if (items.length === 0) {
            appendNotSownElement();
            return;
        }

        randElements(items);
    }

    function showDropdown() {
        const select = $(this).prev(`.${pureElement}`);
        const menu = $(this).find('.dropdown-menu');
        const liveSearch = $(select).data('live-search');

        function optionFilter(search) {
            return function (index, item) {
                return $(item).text().toLowerCase().includes(search.toLowerCase());
            };
        }

        function changeSearch() {
            const search = $(this).val();

            const filtered = select.find('option').filter(optionFilter(search));
            const elements = search ? filtered : select.children();

            rendDropdown(menu, elements, select.data('hide-disabled'));
        }

        if (liveSearch) {
            const searchPlaceholder = $(select).data('live-search-placeholder') || options.search;
            const item = $('<input class="form-control" type="text">').addClass(selectSearch).attr('placeholder', searchPlaceholder);

            $(`.${selectSearch}`).remove();

            menu.append(item);
            menu.find(`.${selectSearch}`).focus().on('input', changeSearch)
        }

        rendDropdown(menu, select.children(), select.data('hide-disabled'));
    }
    
    function hideDropdown() {
        $(this).find('.dropdown-menu .select-search').off('change');
    }

    function toggleElement(event) {
        event.preventDefault();

        const select = $(this).parents(2).prev(`.${pureElement}`);
        const dropdown = $(this).parent();
        const multiple = select.attr('multiple');

        if (multiple) {
            event.stopPropagation();
        }

        if ($(this).hasClass('disabled') || $(this).hasClass('dropdown-header') || $(this).hasClass(selectSearch)) {
            return;
        }

        if (!multiple) {
            select.find('option').attr('selected', false);
            dropdown.find('.active').removeClass('active');
        }

        const index = $(this).data('index');

        const option = select.find('option[data-index="'+index+'"]');
        $(option).attr('selected', !$(option).attr('selected'));
        $(this).toggleClass('active');

        changeOption(select);
    }

    function getSelectedLabel(element) {
        const selected = $(element).find("option:selected");
        const selectedArray = [];

        selected.each((index, option) => {
            selectedArray.push(option.innerText)
        });

        return selected.length !== 0 ? selectedArray.join(', ') : options.notSelectedTitle
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

        const btnClasses = $(element).data('btn-class') || 'btn-secondary';
        const label = getSelectedLabel(element);
        const button = $('<button class="btn btn-block dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>').addClass(btnClasses);
        const dropdown = $('<div class="dropdown-menu"></div>');
        const select = $('<div class="dropdown"></div>').addClass(elementContainer);

        $(element).find('option').each((index, option) => $(option).attr('data-index', index));

        $(element).addClass(pureElement);
        $(element).after(select.append(button.text(label), dropdown))
    }

    $('body')
        .on('click', `.${elementContainer} .dropdown-menu > *`, toggleElement)
        .on('show.bs.dropdown', `.${elementContainer}`, showDropdown)
        .on('hide.bs.dropdown', `.${elementContainer}`, hideDropdown)
        .on('change', `.${pureElement}`, function () {
            changeOption(this);
        });

    // jQuery plugin with options
    $.fn.extendSelect = function(overrideOptions) {
        try {
            if (overrideOptions) {
                options.search = overrideOptions.search || options.search;
                options.notSelectedTitle = overrideOptions.notSelectedTitle || options.notSelectedTitle;
                options.empty = overrideOptions.empty || options.empty;
            }

            $(this).each((index, element) => createSelectElement(element));
        } catch (e) {
            console.error(e);
        }
    };
})(jQuery);
