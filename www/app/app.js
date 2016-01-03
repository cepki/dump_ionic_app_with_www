angular.module("scheduleApp", ["ionic", "ngMessages", 'ionic-datepicker', 'ionic.utils', 'underscore'])

.run(function ($ionicPlatform, $localstorage) {
    $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
    var now = new Date(Date.now());
    (function () { //add offten obligations
        if (!$localstorage.getObject('jutarnje-plivanje'))
        {
            $localstorage.setObject('jutarnje-plivanje', {
                startTime: new Date(now.getFullYear(), now.getMonth(), now.getUTCDate(), 10, 0),
                endTime: new Date(now.getFullYear(), now.getMonth(), now.getUTCDate(), 13, 0),
                duration: 3,
                description: "Jutarnje rekreacijsko plivanje"
            });
            $localstorage.setObject('popodnevno-plivanje', {
                startTime: new Date(now.getFullYear(), now.getMonth(), now.getUTCDate(), 17, 20),
                endTime: new Date(now.getFullYear(), now.getMonth(), now.getUTCDate(), 19, 10),
                duration: 110,
                description: "Popodnevno rekreacijsko plivanje"
            })
            $localstorage.setObject('fakultet', {
                startTime: new Date(now.getFullYear(), now.getMonth(), now.getUTCDate(), 8, 0),
                endTime: new Date(now.getFullYear(), now.getMonth(), now.getUTCDate(), 14, 0),
                duration: 360,
                description: "Fakultet"
            })
        }


        if(!$localstorage.getObject('all-obligations'))
        {
            $localstorage.setObject('all-obligations', {
                allObligations: []
            });

            $localstorage.setObject('searched-date', {
                date: new Date(Date.now())
            });
        }
    })();
})

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state('home', {
        abstract: true,
        url: "/home",
        templateUrl: "/app/home/home-layout.html",
        controller: "HomeController as vm",
        cache: false
    })
    
    .state('home.main', {
        url: "/main",
        views: {
            "mainContentForHome": {
                templateUrl: "/app/home/home.html"
            }
        },
        cache: false
    })

    .state('event', {
        abstract: true,
        url: "/event",
        templateUrl: "/app/event/event-layout.html",
        controller: "NewEventController as vm",
        cache: false,
    })

    .state('event.newEvent', {
        url: '/newevent',
        views: {
            "mainContent": {
                templateUrl: "/app/event/newEvent/new-event.html"
            }
        },
        cache: false,
    });
    $urlRouterProvider.otherwise('/home/main');
});