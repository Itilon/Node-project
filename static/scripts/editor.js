/* globals $ */
$(() => {
    fetch('/api/categories')
        .then((cats) => {
            return cats.json();
        })
        .then((categories) => {
            $('#category').typeahead({ source: categories });
        });
});
