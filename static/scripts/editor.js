/* globals $ */
$(function() {
    fetch('/api/categories')
        .then((cats) => {
            return cats.json();
        })
        // const cats = ['action', 'work'];
        .then((categories) => {
            $('#category').typeahead({ source: categories });
        });
});
