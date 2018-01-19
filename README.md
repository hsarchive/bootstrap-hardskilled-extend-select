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
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-hardskilled-extend-select@latest/css/select.min.css">
<script src="https://cdn.jsdelivr.net/npm/bootstrap-hardskilled-extend-select@latest/js/select.min.js"></script>
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
        // Class to active element:
        activeClass: 'active',
        // Class to disabled element:
        disabledClass: 'disabled',
        // Custom error message for all selects (use placeholder %items):
        maxOptionMessage: 'Max %items elements',
        // Delay to hide message
        maxOptionMessageDelay: 2000,
        // Popover logic (resize or save height):
        popoverResize: true,
        // Auto resize dropdown by button width:
        dropdownResize: true
    });
</script>
```

| Key | Description | Default value |
| --- | --- | --- |
| search | Search input placeholder | Search |
| notSelectedTitle | Title if option not selected | Nothing to shown |
| empty | Message if select list empty | Nothing to shown |
| activeClass | Class to active element | `active` |
| disabledClass | Class to disabled element | `diabled` |
| maxOptionMessage | Custom error message for all selects (use placeholder %items) | Limit reached (%items items max) |
| maxOptionMessageDelay | Delay to hide message | 2000 |
| popoverResize | Popover logic (resize or save height) | `false` |
| dropdownResize | Auto resize dropdown by button width | `false` |

**To listen changes use .on('change') event:**
```javascript
$('select#basic').on('change', function () {
    const selected = $(this).find(':selected').text();
    $('#basicResult').text('Selected: ' + selected)
})
```

**HTML attributes to select:**
```html
<select 
    id="extendedSelect" 
    class="form-control" 
    data-live-search="true"
    data-max-options="2"
    data-max-options-message="Max items"
    data-live-search-placeholder="Find"
    data-hide-disabled="true"
    data-btn-class="btn-danger btn-block"
    data-input-group="true"
    data-not-selected="Select is empty"
    data-empty="Items not found"
    multiple
>
    <option selected>Rabbit</option>
    <option>Cat</option>
    <option class="get-class" disabled>Owl</option>
    <optgroup label="test" data-subtext="another test">
        <option>Spider</option>
        <option selected>Worm</option>
        <option>Fly</option>
    </optgroup>
</select>
```

| Attribute | Description | Default value |
| --- | --- | --- |
| data-live-search | Live search | `false` |
| data-max-options | Max selected options | Nothing to shown |
| data-max-options-message | Message if select limit overflow | Limit reached (%items items max) |
| data-live-search-placeholder | Search input placeholder | Search |
| data-hide-disabled | Hide disabled elements | `false` |
| data-btn-class | Button class for dropdown | btn-secondary |
| data-not-selected | Title if option not selected | Nothing to shown |
| data-empty | Message if select list empty | Nothing to shown |
| multiple | Enable multiple selections | `false` |


[Hire us via Upwork!](https://www.upwork.com/o/companies/_~01b5cde52d5f4ead84/) | [Our website](https://hardskilled.com)
