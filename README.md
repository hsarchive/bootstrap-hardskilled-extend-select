# Extended Select for Bootstrap 4 (analog bootstrap-select)

[![npm version](https://badge.fury.io/js/bootstrap-hardskilled-extend-select.svg)](https://badge.fury.io/js/bootstrap-hardskilled-extend-select) [![](https://data.jsdelivr.com/v1/package/npm/bootstrap-hardskilled-extend-select/badge?style=rounded)](https://www.jsdelivr.com/package/npm/bootstrap-hardskilled-extend-select) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/hardskilled/bootstrap-hardskilled-extend-select/blob/master/LICENSE)

## [Demo and documentation](https://hardskilled.github.io/bootstrap-hardskilled-extend-select/docs/)

You can require bootstrap plugin via cdn or [download](https://github.com/hardskilled/bootstrap-hardskilled-extend-select/releases) the archive with release and unzip into assets directory.

For install via npm, use command:
```bash
npm i --save bootstrap-hardskilled-extend-select
```

**To use CDN:**
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-hardskilled-extend-select@1/css/select.min.css">
<script src="https://cdn.jsdelivr.net/npm/bootstrap-hardskilled-extend-select@1/js/select.min.js"></script>
```

**Example usage:**

```html
<link rel="stylesheet" href="css/select.min.css">
<script src="js/select.min.js"></script>
<script>
    $('select').extendSelect();
</script>
```

**Usage with options:**
```html
<link rel="stylesheet" href="css/select.min.css">
<script src="js/select.min.js"></script>
<script>
    $('select').extendSelect({
        // Search input placeholder:
        search: 'Find',
        // Title if option not selected:
        notSelectedTitle: 'Pls select',
        // Message if select list empty:
        empty: 'Empty',
        // Class to active element
        activeClass: 'active',
        // Class to disabled element
        disabledClass: 'disabled',
        // Custom error message for all selects (use placeholder %items)
        maxOptionMessage: 'Max %items elements',
        // Delay to hide message
        maxOptionMessageDelay: 2000,
        // Popover logic (resize or save height)
        popoverResize: true,
        // Auto resize dropdown by button width
        dropdownResize: true
    });
</script>
```

**To listen changes use .on('change') event:**
```javascript
$('select#basic').on('change', function () {
    const selected = $(this).find(':selected').text();
    $('#basicResult').text('Selected: ' + selected)
})
```

[Hire us via Upwork!](https://www.upwork.com/o/companies/_~01b5cde52d5f4ead84/) | [Our website](https://hardskilled.com)
