$(function () {
    //This widget will be doing logical ANDS with the tags in the list
    $.widget("blackmarket.filterItems", {
        _filters: [],
        _create: function () {
            //listen for any filter click
            var filterItems = this;
            //reset the filter option if all-items is selected
            $(".filter-option-reset").on("click", function () {
                if ($(this).prop("checked")) {
                    $(".filter-option").prop("checked", false);
                    //reset the filterlist
                    filterItems._filters = [];
                    filterItems._filter();
                    //clean out any text in the search
                    $("#search-text").val("");
                }
            });
            $(".filter-option").on('click', function () {
                $(".filter-option-reset").prop("checked", false);
                var filterTag = $(this).attr("id");
                //check if is checked or unchecked and pop or push accordingly
                if ($(this).prop("checked")) {
                    filterItems._filters.push(filterTag);
                } else {
                    //index to remove
                    var index = filterItems._filters.indexOf(filterTag);
                    filterItems._filters.splice(index, 1);
                }
                //clean out any text in the search
                $("#search-text").val("");
                filterItems._filter();
            });
        },
        _filter: function () {
            $("#item-result").itemResults('filterDisplayItems', this._filters);
        }
    });
});
