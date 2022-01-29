/**
 * 此代码是由51nod的夹克老爷写的程序生成的，所以不要手动修改，因为下次又会被覆盖
 */
/*
    * angular directive ng-icheck
    *
    * @description icheck is a plugin of jquery for beautifying checkbox &amp; radio, now I complied it with angular directive
    * @require jquery, icheck
    * @example &lt;input type="radio" ng-model="paomian" value="kangshifu" ng-icheck&gt;
    *          &lt;input type="checkbox" class="icheckbox" name="mantou" ng-model="mantou" ng-icheck checked&gt;
    */
MainApp.directive('ngIcheck', function ($document) {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function ($scope, element, $attrs, ngModel) {
            var value = $attrs['ngValue'] ? $scope.$eval($attrs['ngValue']) : $attrs['value'];

            $scope.$watch($attrs['ngChecked'], function (newValue) {
                $(element).iCheck('update');
            })

            $scope.$watch($attrs['ngModel'], function (newValue) {
                $(element).iCheck('update');
                //ngModel.$viewValue 有时候因为数据类型可能会是字符串，所以这里不用严格匹配...
                if ($(element).attr('type') === 'radio' && $attrs['ngModel']) {
                    if (ngModel.$viewValue == value)
                        $(element).iCheck('check');
                    else
                        $(element).iCheck('uncheck');
                }
            })

            //using iCheck
            $(element).iCheck({
                labelHover: false,
                cursor: true,
                checkboxClass: 'icheckbox_square-green',
                radioClass: 'iradio_square-green',
                increaseArea: '20%'
            }).on('ifChanged', function (event) {
                if ($(element).attr('type') === 'checkbox' && $attrs['ngModel']) {
                    ngModel.$setViewValue(event.target.checked);
                }
            }).on('ifClicked', function (event) {
                if ($(element).attr('type') === 'radio' && $attrs['ngModel'] && ngModel.$viewValue != value) {
                    ngModel.$setViewValue(value);
                }
            });

            if ($attrs['ngShow']) {
                $scope.$watch(function () { return $scope.$eval($attrs['ngShow']); }, function (newValue, oldValue) {
                    var fa = element.parent()[0];
                    if (newValue) {
                        fa.setAttribute('class', fa.getAttribute('class').replace(' ng-hide', ''));
                    } else {
                        fa.setAttribute('class', fa.getAttribute('class').concat(' ng-hide'));
                    }
                })
            }
        },
    };
});
