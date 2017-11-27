angular.module('test')
.config(($stateProvider, $locationProvider, $urlRouterProvider) => {
    'ngInject';
    // @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
    // #how-to-configure-your-server-to-work-with-html5mode
    $locationProvider.html5Mode(true).hashPrefix('!');

    $urlRouterProvider.otherwise('/report');

    $stateProvider
    .state('report', {
        url: '/report',
        // data: { notAuth: true },
        component: 'report'
    })
});
