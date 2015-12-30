    (function () {
    'use strict'

    angular.module("scheduleApp").controller("NewEventController", ['$scope', '$state', '$localstorage', '$ionicPopup', NewEventController]);

    function NewEventController($scope, $state, $localstorage, $ionicPopup) {
        var vm = this;
        this.description = {};
        var now = new Date(Date.now());

        function getTwoDatesDiffrenceInTime(firstDate, secondDate) {
            var diffrence = Math.abs(secondDate - firstDate);
            var minutesDiffrence = Math.floor((diffrence / 1000) / 60);
            return minutesDiffrence;
        }

        vm.authorizationForm = {
            startTime: new Date(now.getFullYear(), now.getMonth(), now.getUTCDate(), now.getHours(), now.getMinutes()),
            endTime: new Date(now.getFullYear(), now.getMonth(), now.getUTCDate(), now.getHours(), now.getMinutes()),
            duration: getTwoDatesDiffrenceInTime(Date.now(), Date.now())
        };


        $scope.$watch(angular.bind(this, function () {
            return this.authorizationForm.startTime;
        }), function (newVal) {
            if(newVal > vm.authorizationForm.endTime)
            {
                vm.authorizationForm.endTime = newVal;
            }
            vm.authorizationForm.duration = getTwoDatesDiffrenceInTime(vm.authorizationForm.endTime, vm.authorizationForm.startTime);
        });

        $scope.$watch(angular.bind(this, function () {
            return this.authorizationForm.endTime; 
        }), function (newVal) {
            if (newVal > vm.authorizationForm.endTime) {
                vm.authorizationForm.endTime = newVal;
            }
        });

        vm.addPreparedObligation = function (preparedObligationKey)
        {
            var clickedObligation = $localstorage.getObject(preparedObligationKey);
            var startTime = new Date(clickedObligation.startTime);
            var endTime = new Date(clickedObligation.endTime);

            vm.authorizationForm = {
                description: clickedObligation.description,
                startTime: new Date(startTime.getFullYear(), startTime.getMonth(), startTime.getUTCDate(), startTime.getHours(), startTime.getMinutes()),
                endTime: new Date(endTime.getFullYear(), endTime.getMonth(), endTime.getUTCDate(), endTime.getHours(), endTime.getMinutes()),
                duration: clickedObligation.duration
            };
        }

        vm.goBack = function()
        {
            if (!!vm.authorizationForm.description)
            {
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Odustani',
                    template: 'Jeste sigurni da zelite odustat od dodavanja?'
                });

                confirmPopup.then(function (res) {
                    if (res) {
                        $state.go('home.main');
                    } else {

                    }
                });
            } else
            {
                $state.go('home.main');
            }
        }


        vm.addNewEvent = function(submitedForm)
        {
            if (submitedForm.$valid)
            {
                var newObligation = {
                    startTime: vm.authorizationForm.startTime,
                    endTime: vm.authorizationForm.endTime,
                    duration: vm.authorizationForm.duration,
                    description: vm.authorizationForm.description
                }
                
                var allObligations = $localstorage.getObject('all-obligations');
                allObligations.allObligations.push(newObligation);
                $localstorage.setObject('all-obligations', {
                    allObligations: allObligations.allObligations
                })
                $state.transitionTo('home.main', [], { reload: true, inherit: true, notify: true});
            } else {
                console.log("Nije poslano");
            }
        }

    };
})();