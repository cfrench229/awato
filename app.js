//Module
var app = angular.module('myApp', ["ngRoute"]);
//Configuring the routing
app.config(function($routeProvider) {
    $routeProvider
    .when("/form", {
        templateUrl : "form.html"
    })
    .when("/table", {
        templateUrl : "table.html"
    })
    .otherwise({redirectTo:'/'});
});

//Controller that deals with adding breeds to the database
app.controller('addCtrl', function($scope, $http) {
//Function to eliminate lifespan dropdown numbers
	$scope.arr = [];
	$scope.lifeSwitch = true;
	$scope.checkNum = function(lifespanStart) {
	$scope.lifeSwitch=false;
	$scope.arr=[];
		for(var i = ++lifespanStart; i <= 20; i++) {
			$scope.arr.push(i);
		}	
	}

//Adds the breed to the database. Only is called when user clicks the submit button
	$scope.addBreed = function () {
//If we want to add to the database, then continue getting information about breed
		if (confirm('Are you sure you want to save this breed into the database?')) {
    		var jsondata = {breed: $scope.breed,description: $scope.description,size: $scope.size,
   					lifespan: $scope.lifespanStart+"-"+$scope.lifespanEnd+" Years"};
   			//The actual database call
    		$http({
    			async: true,
    			crossDomain: true,
    			url: "https://awatoproject-1698.restdb.io/rest/dogs",
   				method: "POST",
    			headers: {
    				"content-type": "application/json",
    				"x-apikey": "5b294cd346624c7b24444fbd",
    				"cache-control": "no-cache"
  				  		},
  				processData: false,
  				data: JSON.stringify(jsondata)
				})
       			.then(function mySuccess(response) {
       			//If our promise was fulfilled, then reload the page so it will update
       			//when we opne the index again
       				window.location.reload();
    			}, function myError(response) {  
			});	
		} else {
    		//Otherwise cancel the add request, and go back to the index 
		}
			//Either way, we go back to the index
			window.location.href = "https://cfrench229.github.io/awato/#!/table";	
   	} 	
});

//Controller to deal with the actual table information
app.controller('tableCtrl', function($scope) {
//Searches the table for breeds based on inputs *Taken from W3.Schools.com*
	$scope.Search = function() {
//Declare variables 
	var input, filter, table, tr, td, i;
  	input = document.getElementById("myInput");
  	filter = input.value.toUpperCase();
  	table = document.getElementById("dogs");
  	tr = table.getElementsByTagName("tr");

//Loop through all table rows, and hide those who don't match the search
  	for (i = 0; i < tr.length; i++) {
   		td = tr[i].getElementsByTagName("td")[2];
    		if (td) {
      			if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        			tr[i].style.display = "";
      			} else {
        			tr[i].style.display = "none";
      			}
    		} 
  		}
	};
//Show data about the selected dog breed
	$scope.breedName = null;
	$scope.breedSize = null;
	$scope.breedLife = null;
	$scope.breedDescript = null;
	$scope.Select = function(index) {
		var tabl = document.getElementById('dogs');
		$scope.breedName =  String(tabl.rows[index+1].cells[2].innerHTML);
		$scope.breedSize =  String(tabl.rows[index+1].cells[3].innerHTML);
		$scope.breedLife =  String(tabl.rows[index+1].cells[4].innerHTML);
		$scope.breedDescript =  String(tabl.rows[index+1].cells[5].innerHTML);    	
	};
});

//Controller that gets information from database, and deletes from the database
app.controller('getCtrl', function($scope, $http){
//Actual add call to the database
     $http({
        async: true,
        crossDomain: true,
        url: "https://awatoproject-1698.restdb.io/rest/dogs",
        method: "GET",
        headers: {
            "content-type": "application/json",
            "x-apikey": "5b294cd346624c7b24444fbd",
            "cache-control": "no-cache"
        }
    }).then(function mySuccess(response) {
//If our promise was fulfilled, then the return is our data we need
        $scope.success = response.data;
    }, function myError(response) {  
    }); 
//Deletes selected breed from the database
	$scope.Delete = function(index) {
//If we really want to, then continue
		if (confirm('Are you sure you want to delete this breed from the database?')) {
//Gets information from the selected row, and use object id to delete from the database	
    		var table = document.getElementById('dogs');
    		var objId = table.rows[index+1].cells[0].innerHTML;
    		var strId = String(objId);
    		var strUrl = strId.trim();
    		var del = String(strUrl);
				$http({
       				async: true,
 					crossDomain: true,
 					url: "https://awatoproject-1698.restdb.io/rest/dogs/"+del,
 					method: "DELETE",
 					headers: {
   			 		"content-type": "application/json",
   			 		"x-apikey": "5b294cd346624c7b24444fbd",
   			 		"cache-control": "no-cache"
 					}
    			}).then(function mySuccess(response) {
    				window.location.reload();
    			}, function myError(response) {  
    		});	
		} else {
//Otherwise, just stay on the index page
		}			
	};
});  
