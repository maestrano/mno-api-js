angular.module 'mnoApiJs', [
  'ngMessages',
  'ngAria',
  'restangular',
  'ui.router',
  'ui.bootstrap',
  'toastr',
  'base64',

  'mnoApiJs.views',
  'mnoApiJs.services'
]

# Create global modules
@AppServices  = angular.module 'mnoApiJs.services', []
@AppViews = angular.module 'mnoApiJs.views', []