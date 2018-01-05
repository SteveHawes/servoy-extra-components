angular.module('servoyextraDaynavigator', ['servoy']).directive('servoyextraDaynavigator', ['$log', '$timeout',
function($log, $timeout) {
    return {
        restrict: 'E',
        scope: {
            model: '=svyModel',
            handlers: '=svyHandlers',
            api: '=svyApi',
            svyServoyapi: '='
        },
        link: function($scope, $element, $attrs) {
            var datepaginatorElement = null;
            var selectedMonth = '';
            $timeout(function() {
                datepaginatorElement = $element.find('.svy-extra-daynavigator');
                datepaginatorElement.datepaginator({
                    showCalendar: false,
                    onSelectedDateChanged: function(event, date) {
                        selectedMonth = date.format('MMM')
                        $timeout(function() {
                            addCustomDayClasses();
                        });
                        if($scope.handlers.onChange) {
                            $scope.handlers.onChange(date);
                        }
                    },
                    selectedDate: selectedDateToMomentDate(),
					// TODO expose this properties to the model ?
					text: "DD",
					textSelected: "DD",
					width: 240,
					selectedItemWidth: 40,
					itemWidth: 40
                });
                addCustomDayClasses();
            });

            $scope.$watch("model.selectedDate", function(newValue, oldValue) {
                var momentDate = selectedDateToMomentDate();
                selectedMonth = momentDate.format('MMM');
                if(datepaginatorElement) {
                    datepaginatorElement.datepaginator('setSelectedDate', momentDate);
                }
            });

            $scope.getMonth = function() {
                return selectedMonth;
            }

            function selectedDateToMomentDate() {
                return $scope.model.selectedDate ? moment($scope.model.selectedDate) : moment();
            }

            function addCustomDayClasses() {
                var items = $element.find('.dp-item');
                var halfLength = Math.floor(items.length / 2);
                for(var i = 0; i < halfLength; i++) {
                    var className = 'day-item-' + (halfLength - i);
                    $(items[i]).addClass(className);
                    $(items[items.length - 1 - i]).addClass(className);
                }
            }
        },
        templateUrl: 'servoyextra/daynavigator/daynavigator.html'
    }
}]);