function AppConfig($httpProvider, $stateProvider, $locationProvider, $urlRouterProvider, $provide) {
    'ngInject';

    // $locationProvider.html5Mode(true);

    $stateProvider
        .state('app', {
            abstract: true,
            templateUrl: 'view-models/layout/app-view.html'
        });

    $urlRouterProvider.otherwise('/');

    if (window.config && !window.config.debug) {
        $compileProvider.debugInfoEnabled(false);
    }

    $provide
        .decorator('$exceptionHandler', ['$delegate', extendExceptionHandler]);

    function extendExceptionHandler($delegate) {
        var appErrorPrefix = '[' + window.config.appName + '] ';

        return function(exception, cause) {
            var errorData, msg;

            $delegate(exception, cause);
            if (appErrorPrefix && exception.message.indexOf(appErrorPrefix) === 0) {
                return; }

            errorData = { exception: exception, cause: cause };
            msg = appErrorPrefix + exception.message;

            console.error(msg, errorData);
        };
    }
}

export default AppConfig;
