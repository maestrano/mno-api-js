angular.module 'mnoApiJs'
  .run ($log) ->
    'ngInject'
    $log.debug 'runBlock end'

  .run ($rootScope, EndpointSvc) ->
    $rootScope.endpointSvc = EndpointSvc