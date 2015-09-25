define(['jquery', 'underscore', 'jqueryui'], function ($, _) {

    $.widget("blackmarket.itemSearch", {
        _create: function () {
            var itemSearch = this;
            $("#search-button").on('click', function () {
                itemSearch._executeSearch();
            });
            $("#search-text").keyup(function (e) {
                if (e.keyCode === 13) {
                    itemSearch._executeSearch();
                }
            });
        },
        _search: function (searchText) {
            $("#item-result").itemResults('searchDisplayItems', searchText);
        },
        _executeSearch: function () {
            var searchText = $("#search-text").val();
            this._search(searchText);
            //reset all the filter
            $(".filter-option").prop("checked", false);
            $(".filter-option-reset").prop("checked", false);
        }
    });

});
