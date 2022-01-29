/**
 * 此代码是由51nod的夹克老爷写的程序生成的，所以不要手动修改，因为下次又会被覆盖
 */
MainApp.controller('PageController', function ($scope, $http, $location) {
    ControllerTools.InitScope($scope);

    var str = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('.'));
    var url = ControllerTools.GetUrl(str, $scope.data, $location);

    $http({
        method: 'GET',
        url: url,
    }).then(function successCallback(response) {
        // 请求成功执行代码
        MainData = response.data;
        for (var key in MainData) {
            $scope[key] = MainData[key];
        }
        $scope.pageSet = ControllerTools.PageSet($scope.PageInfo.Page, $scope.PageInfo.PageCount);

        ControllerTools.DataReadyFirst();
    }, function errorCallback(response) {
        ControllerTools.DataError(response);
    });

    $scope.togglePage = function (page) {
        $scope.data['page'] = ControllerTools.SafePage(page, $scope.PageInfo.PageCount);
        url = ControllerTools.GetUrl(str, $scope.data, $location);
        $http({
            method: 'GET',
            url: url,
        }).then(function successCallback(response) {
            // 请求成功执行代码
            MainData = response.data;
            for (var key in MainData) $scope[key] = MainData[key];

            $scope.pageSet = ControllerTools.PageSet($scope.PageInfo.Page, $scope.PageInfo.PageCount);
            window.scrollTo(0, 0);

            ControllerTools.DataReady();
        }, function errorCallback(response) {
            ControllerTools.DataError(response);
        });
    };

    $scope.refreshData = function () {
        url = ControllerTools.GetUrl(str, $scope.data, $location);
        $http({
            method: 'GET',
            url: url,
        }).then(function successCallback(response) {
            //ControllerTools.ClearData($scope, MainData);
            //// 请求成功执行代码
            //MainData = response.data;
            //for (var key in MainData) {
            //    $scope[key] = MainData[key];
            //}

            Tools.DeepCover(MainData, response.data);
            $scope.pageSet = ControllerTools.PageSet($scope.PageInfo.Page, $scope.PageInfo.PageCount);

            ControllerTools.DataReady();
        }, function errorCallback(response) {
            ControllerTools.DataError(response);
        });
    };

    $scope.setValue = function (name, value, page) {
        page = page ? page : 1;
        for (var i in $scope.data)
            if (i.toLowerCase() == name.toLowerCase())
                if (i != name) delete $scope.data[i];

        $scope.data[name] = value;
        $scope.data['page'] = page;
        url = ControllerTools.GetUrl(str, $scope.data, $location);
        $http({
            method: 'GET',
            url: url,
        }).then(function successCallback(response) {
            ControllerTools.ClearData($scope, MainData);
            // 请求成功执行代码
            MainData = response.data;
            for (var key in MainData) {
                $scope[key] = MainData[key];
            }
            $scope.pageSet = ControllerTools.PageSet($scope.PageInfo.Page, $scope.PageInfo.PageCount);
            window.scrollTo(0, 0);

            ControllerTools.DataReady();
        }, function errorCallback(response) {
            ControllerTools.DataError(response);
        });
    };

    $scope.location = window.location;
    $scope.$watch('location.hash', function (newValue, oldValue) {
        if (!$scope.IsWatchHash) {
            return;
        }

        var regLetter = /[a-zA-Z]/;
        if (newValue.substring(newValue.search(regLetter)) === oldValue.substring(oldValue.search(regLetter))) { return; }

        $scope.data = ControllerTools.ConvertData();
        url = ControllerTools.GetUrl(str, $scope.data, $location);
        $http({
            method: 'GET',
            url: url,
        }).then(function successCallback(response) {
            ControllerTools.ClearData($scope, MainData);
            // 请求成功执行代码
            MainData = response.data;
            for (var key in MainData) {
                $scope[key] = MainData[key];
            }
            $scope.pageSet = ControllerTools.PageSet($scope.PageInfo.Page, $scope.PageInfo.PageCount);
            window.scrollTo(0, 0);

            ControllerTools.DataReady();
        }, function errorCallback(response) {
            ControllerTools.DataError(response);
        });
    });

    //在360浏览器上，自动填充时angularJs的ngModel会获取不到值
    $scope.getDomValue = function (domName) {
        return $('#' + domName)[0].value;
    };

});
