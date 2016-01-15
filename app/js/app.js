'use strict';


// Declare APP LEVEL MODULE which depends on filters, and services


angular.module('app', ['ngRoute','7minWorkout'])            //  CREATE (DECLARE) NEW MODULE:  ROOT MODULE named 'app'
                                                            //  MODULE LEVEL DEPENDENCY:  ['7minWorkout' MODULE and 'ngRoute' MODULE]

    // In Angular any configurations required before the app becomes usable are defined in the module API's config() METHOD

    .config(['$routeProvider', '$sceDelegateProvider', function ($routeProvider, $sceDelegateProvider) {          //  SERVICE PROVIDER -- Dependency ($routeProvider) and CALLBACK FUNCTION


        //  ROUTE to ng-view:

        $routeProvider.when('/start', { templateUrl: 'partials/start.html', controller: 'WorkoutController'});       //  $routeProvider API  .when()
        $routeProvider.when('/workout', { templateUrl: 'partials/workout.html', controller: 'WorkoutController' });
        $routeProvider.when('/finish', { templateUrl: 'partials/finish.html' });
        $routeProvider.otherwise({ redirectTo: '/start' });

        // ng-include DIRECTIVE like ng-view allows us to:  EMBED HTML content.
        //  ng-view is tied to the current ROUTE
        //  ng-view and ng-include can load template HTML from:  Remote Files + Embedded Scripts

        // $locationProvider.html5mode(true);


        $sceDelegateProvider.resourceUrlWhitelist(                //  Allow same origin resource loads - SCE:  Strict Contextual Escaping (Angular Security Feature)
            [
            'self',
            'http://*.youtube.com/**'                             //  Configure TRUST with youtube
            ]
        )

}]);

angular.module('7minWorkout', []);                              //  CREATE (DECLARE) NEW MODULE:  MODULE for our FEATURE
