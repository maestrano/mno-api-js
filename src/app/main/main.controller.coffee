@AppViews.controller 'MainController', ($log, ApiSvc) ->
  'ngInject'
  vm = this

  vm.endpoints = []
  vm.selectedResource = 'company'
  vm.apiKey = 'API Key'
  vm.apiSecret = 'API Secret'
  vm.groupId = 'Group ID'
  vm.apiEndpoint = 'https://api-connec.maestrano.com/api/v2'

  vm.getEndpoints = ->
    resourceApi = ApiSvc(vm.apiKey, vm.apiSecret, vm.apiEndpoint, vm.groupId).all('')
    resourceApi.doGET().then (data) ->
      vm.endpoints = []
      # Transform to [{resource: 'accounts', link: '/api/v2/group_id/accounts'}, {...}]
      angular.forEach data['_links'], ((resourceLink) ->
        resourceName = Object.keys(resourceLink)[0]
        resourceLink = resourceLink[resourceName]['href']
        vm.endpoints.push({resource: resourceName, link: resourceLink})
        return
      )

  vm.getResources = ->
    resourceApi = ApiSvc(vm.apiKey, vm.apiSecret, vm.apiEndpoint, vm.groupId).all(vm.selectedResource)
    resourceApi.doGET().then (data) ->
      vm.response = JSON.stringify(data, null, 2)

  vm.createResource = ->
    entity_hash = {}
    entity_hash[vm.selectedResource] = JSON.parse(vm.payload)
    resourceApi = ApiSvc(vm.apiKey, vm.apiSecret, vm.apiEndpoint, vm.groupId).all(vm.selectedResource)
    resourceApi.post(angular.toJson(entity_hash)).then (data) ->
      vm.getResources(vm.selectedResource)

  vm.exampleResource = ->
    resourceApi = ApiSvc(vm.apiKey, vm.apiSecret, vm.apiEndpoint, vm.groupId).all(vm.selectedResource + "/example")
    resourceApi.doGET().then (data) ->
      vm.payload = JSON.stringify(data[vm.selectedResource], null, 2)

  vm.changeResource = ->
    vm.getEndpoints()
    vm.exampleResource()

  vm.changeResource()

  return
