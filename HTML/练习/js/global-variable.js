/**
 * 此代码是由51nod的夹克老爷写的程序生成的，所以不要手动修改，因为下次又会被覆盖
 */
var MainApp = angular.module('NodApp', ['ngSanitize']);

var Scope = null;
var MainData = null;
var PageHook = null;
var DataHook = null;
var ReadyFun = [];
var PageFun = [];
var TimeDiff = 0;
var FTimeDiff = false;
var Ladda = null;

var ModalCtrl = {
    List: [],
    Add: function (modalId) {
        this.List.push(modalId);
    },
    HideAll: function () {
        for (var i in this.List)
            $('#' + this.List[i]).modal('hide');
    },
};