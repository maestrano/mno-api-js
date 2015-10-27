angular.module 'mnoApiJs'
  .config ($stateProvider, $urlRouterProvider) ->
    'ngInject'
    $stateProvider
      .state 'connec',
        url: '/'
        templateUrl: 'app/connec/connec.html'
        controller: 'ConnecController'
        controllerAs: 'vm'
      .state 'impac',
        url: '/impac'
        templateUrl: 'app/impac/impac.html'
        controller: 'ImpacController'
        controllerAs: 'vm'

    $urlRouterProvider.otherwise '/'
