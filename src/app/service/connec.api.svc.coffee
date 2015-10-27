@AppServices.factory 'ConnecApiSvc', ($log, $base64, Restangular) ->
  (apiKey, apiSecret, url, groupId) ->
    return Restangular.withConfig((RestangularProvider) ->
      RestangularProvider.setBaseUrl(url + "/" + groupId)
      RestangularProvider.setDefaultHeaders
        'Accept': 'application/json'
        'Content-Type': 'application/vnd.api+json'
        'Authorization': 'Basic ' + $base64.encode(apiKey + ":" + apiSecret)

      RestangularProvider.addResponseInterceptor(
        (data, operation, what, url, response, deferred) ->
          extractedData = null
          if (operation == 'getList')
            extractedData = data[what]
          else
            extractedData = data
          return extractedData
      )

      # RestangularProvider.setErrorInterceptor (response) ->
      #   if response.status == 401
      #     dialogs.error('Unauthorized - Error 401', 'You must be authenticated in order to access this content.').result.then ->
      #       $location.path '/login'
      #       return
      #   else
      #     # Some other unknown Error.
      #     console.log response
      #     dialogs.error response.statusText + ' - Error ' + response.status, 'An unknown error has occurred.<br>Details: ' + response.data
      #   # Stop the promise chain.
      #   false

    )
