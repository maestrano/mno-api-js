@AppViews.controller 'ImpacController', ($log, ImpacApiSvc, EndpointSvc) ->
  'ngInject'
  vm = this

  vm.widgets = []
  vm.selectedWidget = 'accounts/balance'
  vm.apiEndpoint = 'https://api-impac.maestrano.com/api/v1'

  vm.getWidgets = ->
    vm.widgets = []
    vm.widgets.push({name: 'Accounts Balance', engine: 'accounts/balance'})
    vm.widgets.push({name: 'Accounts Summary', engine: 'accounts/assets_summary'})
    vm.widgets.push({name: 'Payable / Receivable', engine: 'accounts/payable_receivable'})
    vm.widgets.push({name: 'EBITDA', engine: 'accounts/accounting_values/ebitda'})

  vm.fetchData = ->
    payload = {metadata:{organization_ids:[EndpointSvc.groupid]}, engine:vm.selectedWidget}
    resourceApi = ImpacApiSvc(EndpointSvc.apikey, EndpointSvc.apisecret, vm.apiEndpoint).all('get_widget')
    resourceApi.post(angular.toJson(payload)).then (data) ->
      vm.response = JSON.stringify(data, null, 2)

  vm.changeCredentials = ->
    if EndpointSvc.apikey == '' || EndpointSvc.apisecret == '' || EndpointSvc.groupid == ''
      vm.alerts = [{message: 'API Credentials are required'}]
    else
      vm.alerts = []

  vm.getWidgets()
  vm.changeCredentials()

  return
