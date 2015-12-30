(function(){
    'use strict'

    angular.module("scheduleApp").controller("HomeController", ['$scope', "$state", "$localstorage", "_", "$ionicPopup", HomeController]);

    function HomeController($scope, $state, $localstorage, _, $ionicPopup) {
        var vm = this;
        var dateSplitterFunction = function (chosedTime) {
            vm.obligationsForSelectedDate = _.filter($localstorage.getObject("all-obligations").allObligations, function (obligation) {
                return new Date(obligation.startTime).getMonth() === new Date(chosedTime).getMonth() &&
                    new Date(obligation.startTime).getDay() === new Date(chosedTime).getDay() &&
                    new Date(obligation.startTime).getYear() === new Date(chosedTime).getYear();
            });
        };
        dateSplitterFunction($localstorage.getObject("searched-date").date);

        $scope.addNewEvent = function () {
            $state.go('event.newEvent')
        }

        vm.deleteObligation = function (obligationToDelete)
        {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Izbrisi obavezu',
                template: 'Jesi siguran da zelis maknit ovo?'
            });

            confirmPopup.then(function (res) {
                if (res) {
                    var allObligations = $localstorage.getObject("all-obligations").allObligations;
                    console.log(allObligations.splice(allObligations.indexOf(obligationToDelete), 1));
                    $localstorage.setObject("all-obligations", {
                        allObligations: allObligations.splice(allObligations.indexOf(obligationToDelete), 1)
                    });
                    $state.reload();
                } else {
                    $state.reload();
                }
            });
        }

        var datePickerCallback = function (val) {
            if (!val) {
                 //Nista nije izabrano
            } else {
                $scope.datepickerObject.inputDate = val;
                $localstorage.setObject("searched-date", {
                    date: val
                });
                dateSplitterFunction(val);
            }
        };

        $scope.datepickerObject = {
            titleLabel: 'Datum', 
            todayLabel: 'Danas',  
            closeLabel: 'Zatvori',  
            setLabel: 'Izaberi',  
            setButtonType: 'button-energized',  
            todayButtonType: 'button-assertive',  
            closeButtonType: 'button-energized', 
            inputDate: new Date($localstorage.getObject("searched-date").date), 
            mondayFirst: true,  
            weekDaysList: ["P", "U", "S", "C", "P", "S", "N"], 
            monthList: ["Sijecanj", "Veljaca", "Ozujak", "Travanj", "Svibanj", "Lipanj", "Srpanj", "Kolovoz", "Rujan", "Listopad", "Studeni", "Prosinac"], 
            templateType: 'modal', 
            showTodayButton: 'true', 
            modalHeaderColor: 'bar-positive', 
            modalFooterColor: 'bar-positive', 
            from: new Date(2012, 8, 2), 
            to: new Date(2018, 8, 25),  
            callback: function (val) {  
                datePickerCallback(val);
            },
            dateFormat: 'dd-MM-yyyy',
            closeOnSelect: false, 
        };   
    }

})();