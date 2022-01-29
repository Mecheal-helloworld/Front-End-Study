/**
 * 此代码是由51nod的夹克老爷写的程序生成的，所以不要手动修改，因为下次又会被覆盖
 */
var ControllerTools = {
    GetUrl: function (url, data, location) {
        Scope.IsDataReady = false;
        Scope.IsWatchHash = false;

        if (!url.length) return '/Root/Index';

        if (url.lastIndexOf('/') === 0) {
            url = '/Root' + url;
            if (jQuery.isEmptyObject(data)) return url;
        }

        var strs = [];
        for (var p in data) strs.push(encodeURIComponent(p) + "=" + encodeURIComponent(data[p]));

        url = strs.length ? (url + '?' + strs.join("&")) : url;

        if (location) {
            var tempstr = [];
            for (var p in data) if (data[p] != 0) tempstr.push(p + "=" + data[p]);
            //Scope.Title = '' + Scope.Title;
            document.title = Scope.Title;
            location.hash(tempstr.join("&"));
        }

        return url;
    },
    GetUrlItem: function (url, data, ready) {
        if (ready) Scope.IsDataReady = ready;

        if (url.length === 0) return '/Root/Index';

        if (url.lastIndexOf('/') === 0) {
            url = '/Root' + url;

            if (jQuery.isEmptyObject(data))
                return url;
        }

        var strs = [];
        for (var p in data) strs.push(encodeURIComponent(p) + "=" + encodeURIComponent(data[p]));

        url = strs.length ? (url + '?' + strs.join("&")) : url;

        return url;
    },
    ConvertData: function () {
        //最后的replace是PCQQ点击跳转会在hash里面乱加带转义的东西
        var search = window.location.search.substring(window.location.search.lastIndexOf('?') + 1).replace(/([\?#&]|(%(25)*3F))?tdsourcetag(=s_pctim_aiomsg)?/gi, '');
        var hash = window.location.hash.substring(window.location.hash.lastIndexOf('#') + 1).replace(/([\?#&]|(%(25)*3F))?tdsourcetag(=s_pctim_aiomsg)?/gi, '');
        var data = {};

        if (search.length > 0) {
            var strs = search.split("&");
            for (var key in strs) {
                var idx = strs[key].indexOf("=");
                if (idx == -1) continue;
                var temp0 = strs[key].substring(0, idx);
                var temp1 = decodeURIComponent(strs[key].substring(idx + 1));

                if (temp1 == 'true')
                    temp1 = true;
                else if (temp1 == 'false')
                    temp1 = false;
                else if (Tools.CheckNumber(temp1))
                    temp1 = parseInt(temp1);

                data[temp0] = temp1;
            }
        }

        if (hash.length > 0) {
            var strs = hash.split("&");
            for (var key in strs) {
                var idx = strs[key].indexOf("=");
                if (idx == -1) continue;
                var temp0 = strs[key].substring(0, idx);
                var temp1 = decodeURIComponent(strs[key].substring(idx + 1));

                if (temp1 == 'true')
                    temp1 = true;
                else if (temp1 == 'false')
                    temp1 = false;
                else if (Tools.CheckNumber(temp1))
                    temp1 = parseInt(temp1);

                data[temp0] = temp1;
            }
        }

        return data;
    },

    SafePage: function (page, pageCount) {
        page = page < 1 ? 1 : page;
        page = page > pageCount ? pageCount : page;
        return page;
    },
    PageSet: function (page, pageCount) {
        var pageSize = Math.floor(5 / 2);

        var i = (page - pageSize) < 1 ? 1 : (page - pageSize);
        var pageMax = (page + pageSize) > pageCount ? pageCount : (page + pageSize);
        var rows = [];
        for (; i <= pageMax; i++) {
            rows.push(i);
        }

        return rows;
    },
    DataReadyFirst: function () {
        WebsocketController.Init();
        Scope.Path = Path.Path;
        Scope.IsDataReadyFirst = true;
        this.DataReady();
        Scope.LoaclNow = new Date().getTime();
    },
    DataReady: function () {
        Scope.IsDataReady = true;
        Scope.IsWatchHash = true;
        for (var i in ReadyFun) ReadyFun[i]();
        if (DataHook) DataHook();
        Getter.DfsObj(MainData);
    },
    PageDataReady: function () {
        Scope.IsDataReady = true;
        for (var i in ReadyFun) ReadyFun[i]();
        if (DataHook) DataHook();
        Getter.DfsObj(MainData);
        Scope.$apply();
    },
    InitScope: function (thisScope) {
        Scope = thisScope;

        thisScope.IsWatchHash = true;

        thisScope.Global = {};
        thisScope.data = ControllerTools.ConvertData();
        thisScope.Tools = Tools;
        thisScope.Getter = Getter;
        thisScope.NodEnum = NodEnum;
        thisScope.NodPost = NodPost;
        thisScope.ModalCtrl = ModalCtrl;
        thisScope.Permission = Permission;
        thisScope.LanguageList = LanguageList;
        thisScope.JudgeValueList = JudgeValueList;
        thisScope.JudgeResultList = JudgeResultList;
        thisScope.WebsocketController = WebsocketController;

        thisScope.PageKey = Tools.RandomString(8);

        for (var i in PageFun) PageFun[i]();
        if (PageHook) PageHook();
    },
    InitUndefined: function (obj, name, initValue) {
        if (!obj[name]) obj[name] = initValue;
    },
    ClearData: function (thisScope, data) {
        for (var key in data) {
            thisScope[key] = null;
        }
    },
}


ControllerTools.DataError = function (response) {
    // 请求失败执行代码
    if (NodEnum.ReturnValue[response.data])
        console.log('数据请求失败!\n 返回信息: ' + NodEnum.ReturnValue[response.data].Display);
    else
        console.log('数据请求失败!\n Message: ' + response.data ? response.data.Message : '' + '\n StackTrace: ' + response.data ? response.data.StackTrace : '');

    var oldhref = window.location.origin + window.location.pathname + window.location.search
        + window.location.hash.substring(window.location.hash.lastIndexOf('#'));

    encodeURIComponent(window.location.origin + window.location.pathname + window.location.search
        + window.location.hash.substring(window.location.hash.lastIndexOf('#')))
    //因为angularJs的源码，这里用search存网址...
    oldhref = '?oldhref=' + encodeURIComponent(oldhref);

    if (response.status === 404) {
        if (!ControllerTools.DataErrorHook) {
            if (response.data === NodEnum.ReturnValue.NotLogin.Index)
                window.location.href = Path.Path.Login();
            else {
                var href = '/404.html' + oldhref;
                if (NodEnum.ReturnValue[response.data])
                    href += '&prompt=' + NodEnum.ReturnValue[response.data].Display;
                window.location.href = href;
            }
        }
        else {
            ControllerTools.DataErrorHook(response);
        }
    }
    else {
        var href = '/404.html' + oldhref;
        window.location.href = href;
    }

}