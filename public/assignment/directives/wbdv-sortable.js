/**
 * Created by Naomi on 7/5/17.
 */
(function () {
    angular
        .module("sortable", [])
        .directive("wbdvSortable", wbdvSortable);


    function wbdvSortable(widgetService) {

        function linkFunction(scope, element) {
            var start = 0;
            var stop = 0;
            $(element).sortable({
                start: function( event, ui ) {
                  start = $(ui.item).index();
                },
                stop: function (event, ui) {
                    stop = $(ui.item).index();

                    widgetService.sort(start, stop)
                        .then(function (data) {
                            return;
                        });
                }
            });
        }

        return {
            link: linkFunction
        }
    }
})();