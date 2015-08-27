$(function () {
    $.widget("blackmarket.itemSearch", {
        options: {

        },
        _create: function () {
            var itemSearch = this;
            $("#search-button").on('click', function () {
                console.log("CLICKING");
                var searchText = $("#search-text").val();
                console.log(searchText);
                itemSearch._search(searchText);
            });
            $("#search-text").keyup(function (e) {
                if (e.keyCode === 13) {
                    console.log("CLICKING");
                    var searchText = $("#search-text").val();
                    console.log(searchText);
                    itemSearch._search(searchText);
                }
            });
        },
        _search: function (searchText) {
            $("#item-result").itemResults('filterDisplayItems', searchText);
        }
    });
});
