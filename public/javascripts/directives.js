angular.module('directives', [])
	.directive('history', function() {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				row: '=model'
			},
			template: '<td>hello wrld...</td>',
				// '<td ng-bind="row.created_at | date:\'dd/M (EEE)\'"></td>'
				// +'<td><img height="30" width="30" class="img-rounded" src="/img/dev.jpg"></td>'
				// +'<td ng-bind="row.name"></td>'
				// +'<td ng-bind="row.title"></td>'
				// +'<td ng-bind="row.team"></td>'
				// +'<td ng-bind="row.loc"></td>'
				// +'<td ng-bind="row.clock_in | date:\'shortTime\'"></td>'
				// +'<td ng-bind="row.clock_out | date:\'shortTime\'"></td>'
				// +'<td ng-bind="row.personal_time"></td>'
				// +'<td ng-bind="row.billed"></td>'
				// +'<td ng-bind="row.report"></td>'
				// +'<td><button ng-click="test()">test</button></td>',
			controller: function($scope) {
				$scope.test = function(){
					console.log($scope);
				}
			}
		}
	})