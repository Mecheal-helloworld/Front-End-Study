/**
 * 此代码是由51nod的夹克老爷写的程序生成的，所以不要手动修改，因为下次又会被覆盖
 */
MainApp.filter('filterOdd', function () { //可以注入依赖
    return function (rows) {
        var tempRows = [];
        for (var i in rows) {
            if (parseInt(i) % 2 !== 0)
                tempRows.push(rows[i]);
        }
        return tempRows;
    };
});

MainApp.filter('filterEven', function () { //可以注入依赖
    return function (rows) {
        var tempRows = [];
        for (var i in rows) {
            if (parseInt(i) % 2 === 0)
                tempRows.push(rows[i]);
        }
        return tempRows;
    };
});

MainApp.filter('filterNumber', function () { //可以注入依赖
    return function (number) {
        var numberInt = parseInt(number);
        var numberStr = numberInt.toString();
        if (numberInt > 1000000) {
            numberInt = parseInt(numberInt / 1000000);
            numberStr = numberInt.toString() + 'M';
        } else if (numberInt > 1000) {
            numberInt = parseInt(numberInt / 1000);
            numberStr = numberInt.toString() + 'K';
        }

        return numberStr;
    };
});

MainApp.filter('filterReverse', function () { //可以注入依赖
    return function (items) {
        if (items === undefined)
            return null;
        return items.slice().reverse();
    };
});

MainApp.filter('filterAhead', function () { //可以注入依赖
    return function (rows, count) {
        var tempRows = [];
        var tt = 0;
        for (var i in rows) {
            if (tt > count - 1)
                tempRows.push(rows[i]);
            tt += 1;
        }
        return tempRows;
    };
});

MainApp.filter('filterEnd', function () { //可以注入依赖
    return function (rows, count) {
        var tempRows = [];
        var tt = 0;
        for (var i in rows) {
            if (tt < rows.length - count)
                tempRows.push(rows[i]);
            tt += 1;
        }
        return tempRows;
    };
});

MainApp.filter('filterToTrusted', ['$sce', function ($sce) {
    return function (text) {
        return text;
        //return $sce.trustAsHtml(text);
    };
}]);

MainApp.filter('filterToBrief', function () { //可以注入依赖
    return function (text) {
        if (text === undefined)
            return null;

        return text.replace(/<\/?.+?>/g, "");
    };
});

MainApp.filter('filterToLaTex', function () { //可以注入依赖
    return function (text) {
        if (text === undefined)
            return null;
        var tempText = "";
        var first = "lang=\"latex\"><span>";
        var last = "</span></span>";
        while (text.indexOf(first) !== -1) {
            tempText += text.substring(0, text.indexOf(first) + first.length) + '$';
            text = text.substring(text.indexOf(first) + first.length);
            tempText += text.substring(0, text.indexOf(last)) + '$' + text.substring(text.indexOf(last), text.indexOf(last) + last.length);
            text = text.substring(text.indexOf(last) + last.length);
        }
        tempText += text;
        return tempText;
    };
});

MainApp.filter('filterTime', function () { //可以注入依赖
    return function (time) {
        if (time === undefined)
            return null;
        var dateStr = "";
        var timeStamp = new Date().getTime();
        if (time < timeStamp - 604800000) {
            var date = new Date();
            date.setTime(time);
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var hour = date.getHours();
            var minute = date.getMinutes();
            if (minute < 10) {
                minute = "0" + minute;
            }
            var second = date.getSeconds();
            if (second < 10) {
                second = "0" + second;
            }
            dateStr = year + '/' + month + '/' + day + ' ' + hour + ':' + minute + ':' + second;
        }
        else if (time < timeStamp - 86400000) {
            dateStr = parseInt((timeStamp - time) / (86400000)) + '天前';
        }
        else if (time < timeStamp - 3600000) {
            dateStr = parseInt((timeStamp - time) / (3600000)) + '小时前';
        }
        else if (time < timeStamp - 60000) {
            dateStr = parseInt((timeStamp - time) / (60000)) + '分钟前';
        }
        else {
            dateStr = '刚刚';
        }

        return dateStr;
    };
});


MainApp.filter('filterTimeCost', function () { //可以注入依赖
    return function (time) {
        if (time === undefined)
            return null;
        var dateStr = "";
        var timeStamp = new Date().getTime();

        if (time < timeStamp - 86400000) {
            dateStr += parseInt((timeStamp - time) / 86400000) + '天';
        }

        if (time < timeStamp - 3600000) {
            dateStr += parseInt((timeStamp - time) / 3600000) + '小时';
        }

        if (time < timeStamp - 60000) {
            dateStr += parseInt((timeStamp - time) / 60000) + '分钟';
        }

        dateStr += parseInt((timeStamp - time) / 1000) + '秒';

        return dateStr;
    };
});

MainApp.filter('filterVideoTime', function () { //可以注入依赖
    return function (time) {
        if (time === undefined)
            return null;
        var dateStr = "";
        var hour = 0;
        var minute = 0;
        if (time >= 3600) {
            hour = parseInt(time / 3600);
            dateStr += hour + '小时';
            time -= hour * 3600;
            minute = parseInt(time / 60);
            dateStr += minute + '分';
            time -= minute * 60;
            dateStr += time + '秒';
        }
        else if (time >= 60) {
            minute = parseInt(time / 60);
            dateStr += minute + '分';
            time -= minute * 60;
            dateStr += time + '秒';
        }
        else {
            dateStr += time + '秒';
        }

        return dateStr;
    };
});

MainApp.filter('filterIconUrl', function () { //可以注入依赖
    return function (iconUrl) {
        if (!iconUrl || iconUrl.length === 0)
            return ' ';
        if (iconUrl.indexOf('http://') === 0)
            return iconUrl;
        return Tools.UploadServer + iconUrl;
    };
});

MainApp.filter('filterUserIconUrl', function () { //可以注入依赖
    //多Icon入参，是为了防止被filter掉
    return function (user, icon) {
        if (user === undefined)
            return '/images/default/male.jpg';
        if (icon === undefined || icon.length === 0) {
            if (user.Sex !== 2)
                return '/images/default/male.jpg';
            else
                return '/images/default/female.jpg';
        }
        else if (icon.indexOf('http') === 0)
            return icon;
        else
            return Tools.UploadServer + icon;
    };
});

MainApp.filter('filterSchoolIconUrl', function () { //可以注入依赖
    //多Icon入参，是为了防止被filter掉
    return function (school, icon) {
        if (school === undefined || icon === undefined || icon.length === 0)
            return '/images/default/school.jpg';
        else if (icon.indexOf('http') === 0)
            return icon;
        else
            return Tools.UploadServer + icon;
    };
});

MainApp.filter('filterTrustAsResourceUrl', ['$sce', function ($sce) {
    return function (val) {
        val = encodeURI(val);
        return $sce.trustAsResourceUrl(val);
    };
}]);

MainApp.filter('filterByType', function () { //可以注入依赖
    return function (rows, typeName, type) {
        if (!type) return rows;

        var tempRows = [];
        for (var i in rows) {
            var _eval = 'rows[i].' + typeName + ' === type';
            if (eval(_eval))
                tempRows.push(rows[i]);
        }
        return tempRows;
    };
});

MainApp.filter('filterByBool', function () { //可以注入依赖
    return function (rows, typeName, type) {
        if (!type) return rows;

        type = type === NodEnum.BoolNull.True.Index;
        var tempRows = [];
        for (var i in rows) {
            var _eval = 'rows[i].' + typeName + ' === type';
            if (eval(_eval))
                tempRows.push(rows[i]);
        }
        return tempRows;
    };
});

MainApp.filter('filterCreateArray', function () { //可以注入依赖
    return function (rows, start, end) {
        var tempRows = [];
        for (var i = start; i <= end; i++) {
            tempRows.push(i);
        }
        return tempRows;
    };
});

MainApp.filter('filterClassIdUrl', function () { //可以注入依赖
    return function (baseUrl, classId) {
        if (classId) {
            if (baseUrl.lastIndexOf('#') !== -1) {
                baseUrl += '&classId=' + classId;
            } else {
                baseUrl += '#classId=' + classId;
            }
        }

        return baseUrl;
    };
});

MainApp.filter('filterTextbookIdUrl', function () { //可以注入依赖
    return function (baseUrl, textbookId) {
        if (textbookId) {
            if (baseUrl.lastIndexOf('#') !== -1) {
                baseUrl += '&textbookId=' + textbookId;
            } else {
                baseUrl += '#textbookId=' + textbookId;
            }
        }

        return baseUrl;
    };
});

MainApp.filter('filterLogBulletin', function () { //可以注入依赖
    return function (LogViews, BulletinViews) {
        if (BulletinViews === undefined)
            return LogViews;

        var bulletinIndex = [2, 12, 22, 32];

        var newLogViews = [];
        var bulletinCount = 0;
        for (var key in LogViews) {
            if (key == bulletinIndex[bulletinCount]) {
                if (BulletinViews[bulletinCount] !== undefined)
                    newLogViews.push(BulletinViews[bulletinCount]);
                bulletinCount++;
            }
            newLogViews.push(LogViews[key]);
        }

        return newLogViews;
    };
});

MainApp.filter('filterSchoolBulletin', function () { //可以注入依赖
    return function (LogViews, BulletinViews) {
        if (BulletinViews === undefined)
            return LogViews;

        return BulletinViews.concat(LogViews);
    };
});

MainApp.filter('filterOrder', function () { //可以注入依赖
    return function (rows, typeName, desc) {
        if (!rows) return;

        rows.sort(function (a, b) {
            var _eval = 'a.' + typeName + (desc ? ' > ' : ' < ') + 'b.' + typeName;

            if (eval(_eval)) return -1;
            return 1;
        });

        return rows;
    };
});