(function ($) {
    const elementContainer = 'select-extended-element';
    const pureElement = 'select-extend';
    const selectSearch = 'select-search';
    const lastElement = 'select-last-element';
    let options = {
        search: 'Search',
        notSelectedTitle: 'Nothing to shown',
        empty: 'Nothing to shown',
        activeClass: 'active',
        disabledClass: 'disabled',
        maxOptionMessage: 'Limit reached (%items items max)',
        maxOptionMessageDelay: 2000,
        popoverResize: false,
        dropdownResize: false,
    };

    function rendPopperPosition(element) {
        if (element.attr('x-placement') !== 'top-start') return;

        const elementPosition = element.outerHeight(true);
        element.css('transform', `translate3d(0px, -${elementPosition}px, 0px)`);
    }

    function rendDropdown(menu, items, disabled) {
        $(menu).find('.dropdown-header, .dropdown-item').remove();

        const appendItem = (element) => {
            const label = element.innerText;
            const item = $('<a href="#" class="dropdown-item" />').text(label);

            item.attr('data-index', $(element).data('index'));

            if ($(element).is('option:selected')) {
                item.addClass(options.activeClass)
            }

            if ($(element).is('option:disabled')) {
                item.addClass(options.disabledClass)
            }

            menu.append(item)
        };

        const appendHeader = (element) => {
            const label = $(element).attr('label');
            const item = $('<span class="dropdown-header"/>').text(label);
            menu.append(item)
        };

        const appendNotSownElement = () => {
            const item = $('<span class="dropdown-header"/>').text(options.empty);
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

    function showDropdown(event) {
        const select = $(this).next(`.${pureElement}`);
        const menu = $(this).find('.dropdown-menu');
        const button = $(this).find('.btn');
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

            if (!options.popoverResize) {
                menu.css('height', menu.outerHeight())
            }

            rendDropdown(menu, elements, select.data('hide-disabled'));
            options.popoverResize && rendPopperPosition(menu);
        }

        if (liveSearch) {
            const searchPlaceholder = $(select).data('live-search-placeholder') || options.search;
            const item = $('<input class="form-control" type="text" autofocus>').addClass(selectSearch).attr('placeholder', searchPlaceholder);

            $(`.${selectSearch}`).remove();

            menu.append(item);
            menu.find(`.${selectSearch}`).on('input', changeSearch)
        }

        rendDropdown(menu, select.children(), select.data('hide-disabled'));
        setTimeout(() => $('[autofocus]', event.target).focus(), 100)

        if (options.dropdownResize) {
            menu.css('min-width', button.outerWidth())
        }
    }

    function hideDropdown() {
        $(this).find('.dropdown-menu .select-search').off('change');
    }

    function toggleElement(event) {
        event.preventDefault();

        const select = $(this).parents(2).next(`.${pureElement}`);
        const dropdown = $(this).parent();
        const multiple = select.attr('multiple');
        const maxOptions = select.data('max-options');
        const maxOptionsMessage = select.data('max-options-message') || options.maxOptionMessage;
        const selectedCount = select.find("option:selected").length;
        const index = $(this).data('index');
        const option = select.find('option[data-index="'+index+'"]');

        if (multiple) {
            event.stopPropagation();
        }

        if ($(this).hasClass(options.disabledClass) || $(this).hasClass('dropdown-header') || $(this).hasClass(selectSearch)) {
            return;
        }

        if (maxOptions && !$(option).attr('selected') && selectedCount >= maxOptions) {
            const selectExtendAlert = $(dropdown).find('.select-extend-alert');

            $(selectExtendAlert).text(maxOptionsMessage.replace('%items', maxOptions));
            $(selectExtendAlert).fadeIn(200);

            setTimeout(() => $(selectExtendAlert).fadeOut(200), options.maxOptionMessageDelay);
            return;
        }

        if (!multiple) {
            select.find('option').attr('selected', false);
            dropdown.find(`.${options.activeClass}`).removeClass(options.activeClass);
        }

        $(option).attr('selected', !$(option).attr('selected')).trigger("change");
        $(this).toggleClass(options.activeClass);

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
        const selectExtendedElement = $(selectElement).prev(`.${elementContainer}`);

        updateElement(selectElement, selectExtendedElement)
    }

    function createSelectElement(element) {
        if (!$(element).is('select')) {
            throw new Error('Only <select /> elements are allowed')
        }

        if ($(element).hasClass(pureElement)) {
            return;
        }

        const group = $(element).data('input-group') ? ' input-group-prepend' : '';
        const btnClasses = $(element).data('btn-class') || 'btn-secondary';
        const label = getSelectedLabel(element);
        const button = $('<button class="btn dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"/>').addClass(btnClasses);
        const alert = $('<div class="alert alert-danger select-extend-alert" role="alert"/>');
        const dropdown = $('<div class="dropdown-menu"/>').append(alert);
        const select = $('<div class="dropdown"/>').addClass(elementContainer + group);

        $(element).find('option').each((index, option) => $(option).attr('data-index', index));

        $(element).addClass(pureElement);
        $(element).before(select.append(button.text(label), dropdown));

        if ($(element).data('input-group')) {
            $(element).parent().children(':visible:last').addClass(lastElement)
        }
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
                options = Object.assign(options, overrideOptions);
            }

            $(this).each((index, element) => createSelectElement(element));
        } catch (e) {
            console.error(e);
        }
    };
})(jQuery);
