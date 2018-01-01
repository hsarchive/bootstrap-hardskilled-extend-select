# Bootstrap extended select

## [Demo and documentation](https://hardskilled.github.io/bootstrap-hardskilled-extend-select/docs/)

You can require bootstrap plugin via cdn or [download](https://github.com/hardskilled/bootstrap-hardskilled-extend-select/releases) the archive with release and unzip into assets directory.

For install via npm, use command:
```bash
npm i --save bootstrap-hardskilled-extend-select
```

**Example usage:**

```html
<link rel="stylesheet" href="../select.min.css">
<script src="./select.min.js"></script>
<script>
    $('select').extendSelect();
</script>
```

**Usage with options:**
```html
<link rel="stylesheet" href="../select.min.css">
<script src="./select.min.js"></script>
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
        maxOptionMessageDelay: 2000
    });
</script>
```

[Hire us via Upwork!](https://www.upwork.com/o/companies/_~01b5cde52d5f4ead84/) | [Our website](https://hardskilled.com)