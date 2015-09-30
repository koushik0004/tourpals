var app = angular.module('uiRouterWithContacts', [
	'uiRouterWithContacts.contactDetails',
	'ui.router'
]);
app.run([
	'$rootScope',
	'$state',
	'$stateParams',
	function($rootScope, $state, $stateParams){
		$rootScope.$state = $state;
		$rootScope.$stateParams = $stateParams;
	}
	
]);
app.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider){
		$urlRouterProvider
			.otherwise('/')
			.when('/user/:id', '/contacts/:id')
			.when('/c?id', '/contacts/:id');
		
		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: 'templates/home-contact.html'
			})
			.state('contacts', {
				//abstract: true,
				url: '/contacts',
				templateUrl: 'templates/contacts/contacts.html',
				resolve: {
					contacts: ['contacts',
						function(contacts){
							return contacts.all();
						}]
				},
				controller: 'contactDetails',
				/*controller:[
					'$scope',
					'$state',
					'contacts',
					function($scope, $state, contacts){
						console.log("test");
						$scope.contacts = contacts;
						console.log(contacts)
					}
				]*/
			})
			.state('contacts.details', {
				url: '/{contactId:[0-9]{1,4}}',
				views: {
					'': {
						templateUrl: 'templates/contacts/contacts.details.html',
						controller: 'ViewDetalisController'
					},
					'menuTip': {
						templateProvider: ['$stateParams',
							function($stateParams){
								return '<hr><small class="muted">Contact ID: ' + $stateParams.contactId + '</small><hr>';
							}
						]
					}
				}
			})
			.state('contacts.details.item', {
				url: '/item/:itemId',
				templateUrl: 'templates/contacts/contacts.details.item.html',
				controller: 'ItemController'
				
			})
			.state('contacts.details.item.edit', {
				views: {
					'@contacts.details': {
						templateUrl: 'templates/contacts/contacts.details.item.edit.html',
						controller: 'EditOperationController'
					}
				}
				
			})
			.state('add-contact', {
				url: '/addcontact',
				templateUrl: 'templates/contact-form-add.html'
			})	
	}
]);

app.controller('contactDetails', [
					'$scope',
					'$state',
					'contacts',
					function($scope, $state, contacts){
						//console.log("test");
						$scope.contacts = contacts;
						//console.log(contacts)
					}
				]);
app.controller('ViewDetalisController', [
				'$scope',
				'$stateParams',
				'contacts',
				function($scope, $stateParams, contacts){
					//$scope.individualContact = contacts.findById($stateParams.contactId);
					//console.log('test');
					
					var _self = this;
					_self.findById = function(contacts, contactId){
						for(var i=0; i<contacts.length; i++){
							if(contactId == contacts[i].id)
								return contacts[i];
						}
						
						return null;
					};
					$scope.individualContact = _self.findById(contacts, $stateParams.contactId);
				}
			]);
app.controller('ItemController', [
			'$scope',
			'$stateParams',
			'$state',
			function($scope, $stateParams, $state){
				var _self = this;
				_self.findById = function(contacts, contactId){
					for(var i=0; i<contacts.length; i++){
						if(contactId == contacts[i].id)
							return contacts[i];
					}
					
					return null;
				};
				$scope.item = _self.findById($scope.individualContact.items, $stateParams.itemId);
				
				$scope.edit = function(){
					$state.go('.edit', $stateParams);
				}
			}
]);
app.controller('EditOperationController', [
				'$scope',
				'$state',
				'$stateParams',
				function($scope, $state, $stateParams){
					var _self = this;
					_self.findById = function(contacts, contactId){
						for(var i=0; i<contacts.length; i++){
							if(contactId == contacts[i].id)
								return contacts[i];
						}
						
						return null;
					};
					$scope.item = _self.findById($scope.individualContact.items, $stateParams.itemId);	
					$scope.makeDone = function(){
						$state.go('^', $stateParams);
					};
				}
]);
