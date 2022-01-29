/**
 * 此代码是由51nod的夹克老爷写的程序生成的，所以不要手动修改，因为下次又会被覆盖
 */
var Tools = {
    IsMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    IsWeixin: /MicroMessenger/i.test(navigator.userAgent),
    IsQQ: /MQQBrowser/i.test(navigator.userAgent) && /\sQQ/i.test((navigator.userAgent).split('MQQBrowser')),
    IsAli: /Ali(App|Pay)/i.test(navigator.userAgent),
    UploadServer: "//upload." + document.domain + '/',
    QuickUploadServer: "//upload." + document.domain + '/QuickUpload.html',
    GetCookie: function (cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i].trim();
            if (c.indexOf(name) == 0) {
                var temp = c.substring(name.length, c.length);
                if (temp === "true")
                    return true;
                if (temp === "false")
                    return false;
                return temp;
            }
        }
        return;
    },
    SetCookie: function (cname, cvalue, exdays, isPrimaryDomain) {
        exdays = !exdays ? 1 : exdays;
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toGMTString();
        if (isPrimaryDomain) {
            document.cookie = cname + "=" + cvalue + ";" + expires + ";domain=." + document.domain + ";path=/;";
            this.DelCookie(cname, false, true);
            this.DelCookie(cname, false, false);
        }
        else {
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;";
            this.DelCookie(cname, false, false);
        }
    },
    DelCookie: function (cname, isPrimaryDomain, isPrimaryPath) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = this.GetCookie(cname);
        if (cval != null) {
            if (isPrimaryDomain)
                document.cookie = cname + "=" + cval + ";expires=" + exp.toGMTString() + ";domain=." + document.domain + ";path=/;";
            else if (isPrimaryPath)
                document.cookie = cname + "=" + cval + ";expires=" + exp.toGMTString() + ";path=/;";
            else if (window.location.pathname.lastIndexOf('/') !== 0)
                document.cookie = cname + "=" + cval + ";expires=" + exp.toGMTString();

            return true;
        }
        return false;
    },
    CutImage: function (imgD, iWidth, iHeight, inputId) {
        //参数(图片,允许的宽度,允许的高度)
        var image = new Image();
        image.src = imgD.src;
        if (image.width > 0 && image.height > 0) {
            if (image.width / image.height >= iWidth / iHeight) {
                imgD.width = iWidth;
                imgD.height = image.height * iWidth / image.width;
            }
            else {
                imgD.height = iHeight;
                imgD.width = image.width * iHeight / image.height;
            }
        }
    },
    ToLaTex: function (id) {
        var doc = document.getElementById(id);
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, doc]);
        var pres = doc.querySelectorAll('pre');
        for (var i = 0; i < pres.length; i++) {
            for (var j = 0; j < pres[i].children.length; j++)
                if (pres[i].children[j].tagName === "CODE") {
                    hljs.highlightBlock(pres[i]);
                    break;
                }
        }
    },
    IntToChar: function (i) {
        return String.fromCharCode(i);
    },
    PriceToString: function (Price) {
        var price = (Price / 100).toString();
        if (price.indexOf('.') == -1)
            price += '.00';
        else if (price.indexOf('.') + 2 === price.length)
            price += '0';
        return price;
    },
    LongToDateTime: function (time, defaultDay, onlyDate) {
        defaultDay = defaultDay == null ? 1 : defaultDay;
        // 1262275200000 = 2010-01-01 00:00:00
        // 946656000000 = 2000-01-01 000:00:00
        if (time == null || time < 946656000000) {
            var date = new Date();
            date.setTime(date.getTime() + 86400000 * defaultDay);
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            month = month < 10 ? "0" + month : month;
            var day = date.getDate();
            day = day < 10 ? "0" + day : day;
            var hour = '08';
            var minute = '00';

            var result = year + '/' + month + '/' + day + ' ' + hour + ':' + minute;
            if (onlyDate)
                result = year + '/' + month + '/' + day;
            return result;
        } else {
            var date = new Date();
            date.setTime(time);
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            month = month < 10 ? "0" + month : month;
            var day = date.getDate();
            day = day < 10 ? "0" + day : day;
            var hour = date.getHours();
            hour = hour < 10 ? "0" + hour : hour;
            var minute = date.getMinutes();
            minute = minute < 10 ? "0" + minute : minute;


            var result = year + '/' + month + '/' + day + ' ' + hour + ':' + minute;
            if (onlyDate)
                result = year + '/' + month + '/' + day;

            return result;
        }
    },
    Random: function () {
        return Math.floor(Math.random() * 1000000000);
    },
    RandomString: function (len) {
        len = len ? len : 6;
        var str = "";
        for (var i = 0; i < len; i++) {
            var num = Math.floor(Math.random() * 1000000000);
            while (num) {
                var temp = 0;
                var op = num % 10 % 3;
                num = Math.floor(num / 10);
                switch (op) {
                    case 0:
                        temp = temp * 10 + num % 10; num = Math.floor(num / 10);
                        str += String.fromCharCode(48 + temp % 10);
                        break;
                    case 1:
                        temp = temp * 10 + num % 10; num = Math.floor(num / 10);
                        temp = temp * 10 + num % 10; num = Math.floor(num / 10);
                        str += String.fromCharCode(97 + temp % 26);
                        break;
                    case 2:
                        temp = temp * 10 + num % 10; num = Math.floor(num / 10);
                        temp = temp * 10 + num % 10; num = Math.floor(num / 10);
                        str += String.fromCharCode(65 + temp % 26);
                        break;
                }
            }
        }
        return str;
    },
    CompareGreaterNow: function (time, addDays) {
        addDays = addDays == null ? 0 : addDays;
        var timeStamp = new Date().getTime();
        time += addDays * 24 * 60 * 60 * 1000;
        return time > timeStamp;
    },
    TimeCount: function (time) {
        var day = 0, hour = 0, minute = 0, second = 0;//时间默认值

        day = Math.floor(time / (60 * 60 * 24));
        time %= 60 * 60 * 24;
        hour = Math.floor(time / (60 * 60));
        time %= 60 * 60;
        minute = Math.floor(time / 60);
        time %= 60;
        second = Math.floor(time);

        if (!day) day = '';
        else if (day <= 9) day = '0' + day + '天 ';
        else day += '天 ';

        if (hour <= 9) hour = '0' + hour;
        hour += '小时 ';

        if (minute <= 9) minute = '0' + minute;
        minute += '分钟 ';

        if (second <= 9) second = '0' + second;
        second += '秒';

        return day + hour + minute + second;
    },
    GetServerTime: function () {
        if (FTimeDiff) return;
        $.get("/ServerReader/Time", {}, function (data, status) {
            if (status == 'success') { TimeDiff = data - new Date().getTime(); FTimeDiff = true; }
        });
    },
    CountDown: function (lastTime, eId) {
        eId = eId ? eId : 'CountDown';
        var timeEle = document.getElementById(eId);
        if (!timeEle || !lastTime) return;
        Tools.GetServerTime();

        if (!Tools.Timer) Tools.Timer = {};
        if (Tools.Timer[eId]) { Tools.Timer[eId].lastTime = lastTime; return; }
        Tools.Timer[eId] = { lastTime: lastTime, timeCount: (lastTime - new Date().getTime() - TimeDiff) / 1000 + 1, };

        Tools.Timer[eId].timer = setInterval(function () {
            if (!timeEle || (Tools.Timer[eId].timeCount <= 1 && Tools.Timer[eId].timeCount >= -1)) {
                if (Tools.CountDownFun) Tools.CountDownFun();
                clearInterval(Tools.Timer[eId].timer); Scope.refreshData(); return;
            }

            timeEle.innerHTML = Tools.TimeCount(Tools.Timer[eId].timeCount);
            Tools.Timer[eId].timeCount = (Tools.Timer[eId].lastTime - new Date().getTime() - TimeDiff) / 1000 + 1;
        }, 1000);
    },
    CountUp: function (startTime, eId) {
        eId = eId ? eId : 'CountUp';
        var timeEle = document.getElementById(eId);
        if (!timeEle) return;

        if (!Tools.Timer) Tools.Timer = {};
        if (Tools.Timer[eId]) { Tools.Timer[eId].timeCount = (new Date().getTime() - startTime) / 1000; return; }
        Tools.Timer[eId] = { timeCount: (new Date().getTime() - startTime) / 1000, };

        Tools.Timer[eId].timer = setInterval(function () {
            if (!timeEle) { clearInterval(Tools.Timer[eId].timer); return; }

            timeEle.innerHTML = Tools.TimeCount(Tools.Timer[eId].timeCount);
            Tools.Timer[eId].timeCount++;
        }, 1000);
    },
    TypeaHeadMatcher: function (obj) {
        //var item = JSON.parse(obj);
        //return ~item.name.toLowerCase().indexOf(this.query.toLowerCase());
        return true;
    },
    TypeaHeadHighLighter: function (obj) {
        var item = JSON.parse(obj);
        var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
        var flags = [];
        if (item.name) {
            for (var i in item.name) flags.push(0);
            for (var i in query)
                for (var j in item.name)
                    if (!flags[j] && query[i] == item.name[j]) {
                        flags[j] = 1;
                        break;
                    }

            var res = item.name;
            item.name = "";
            for (var i in res) {
                if (flags[i])
                    item.name += '<strong class="text-danger">' + res[i] + '</strong>';
                else
                    item.name += res[i];
            }
        }

        return item.name;
    },
    InitSearch: function () {
        var $input = $("#mySearch");
        $input.typeahead({
            items: 'all',
            delay: 300,
            autoSelect: false,
            source: function (query, process) {
                this.query = query = query.replace(/(^\s*)|(\s*$)/g, "");
                return $.ajax({
                    url: '/SearchReader/TitleOnly?searchStr=' + query,
                    type: 'Get',
                    success: function (result) {
                        var rList = [];
                        for (var i in result) {
                            item = result[i];
                            if (item.ContentType === NodEnum.ContentType.ProblemTitle.Index || item.ContentType === NodEnum.ContentType.QuestionTitle.Index || item.ContentType === NodEnum.ContentType.User.Index) {
                                var name = "";
                                if (item.ContentType === NodEnum.ContentType.QuestionTitle.Index)
                                    name = '问题-' + item.Content;
                                //else if (item.ContentType === 3)
                                //    name = '博客-' + item.Content;
                                else if (item.ContentType === NodEnum.ContentType.User.Index)
                                    name = '用户-' + item.Content;
                                else if (item.ContentType === NodEnum.ContentType.ProblemTitle.Index)
                                    name = '题目-' + item.Content;
                                //else if (item.ContentType === 11)
                                //    name = '话题-' + item.Content;

                                rList.push(JSON.stringify({ id: item.LinkId, name: name, type: item.ContentType }));
                            }
                        }
                        return process(rList);
                    }
                });
            },
            matcher: Tools.TypeaHeadMatcher,
            highlighter: Tools.TypeaHeadHighLighter,
            updater: function (obj) { return this.query; },
            followLinkOnSelect: true,
            itemLink: function (obj) {
                var item = JSON.parse(obj);
                var link = "";
                if (item.type === NodEnum.ContentType.QuestionTitle.Index)
                    link = Path.Path.Question.Index(item.id);
                //else if (item.type === 3)
                //    link = Path.Path.Blog.Index(item.id);
                else if (item.type === NodEnum.ContentType.User.Index)
                    link = Path.Path.User.Index(item.id);
                else if (item.type === NodEnum.ContentType.ProblemTitle.Index)
                    link = Path.Path.Challenge.Problem(item.id);
                //else if (item.type === 11)
                //    link = Path.Path.Challenge.TopicProblemList(item.id);
                return link;
            },

        })
        //$input.bind('keyup', function (event) {
        //    if (event.keyCode == "13") {
        //        window.location.href = Path.Path.Search() + "?searchStr=" + $input.val().replace(/\s/g, "");
        //    }
        //});
    },
    InitSearchByType: function (inputDomId, ouputParam, ContentType, Hook) {
        var $input = $("#" + inputDomId);
        $input.typeahead({
            items: 'all',
            delay: 300,
            autoSelect: false,
            source: function (query, process) {
                this.query = query = query.replace(/(^\s*)|(\s*$)/g, "");
                return $.ajax({
                    url: '/SearchReader/SearchByType?searchStr=' + query + '&contentType=' + ContentType,
                    type: 'Get',
                    success: function (result) {
                        var resultList = result.map(function (item) {
                            var aItem = { id: item.LinkId, name: item.Content, type: item.ContentType };
                            return JSON.stringify(aItem);
                        });
                        return process(resultList);
                    }
                });
            },
            matcher: Tools.TypeaHeadMatcher,
            highlighter: Tools.TypeaHeadHighLighter,
            updater: function (obj) {
                var item = JSON.parse(obj);
                var tempstr = ouputParam.split('.');
                var tempobj = Scope;
                for (var i = 0; i < tempstr.length - 1; i++) tempobj = tempobj[tempstr[i]];
                Scope.$apply(function () { tempobj[tempstr[tempstr.length - 1]] = item.id; });
                if (Hook != null) Hook(item.id);
            }
        })
    },
    InitSearchSchool: function () {
        var $input = $("#SearchSchool");
        $input.typeahead({
            items: 'all',
            delay: 300,
            autoSelect: false,
            source: function (query, process) {
                this.query = query.replace(/(^\s*)|(\s*$)/g, "");
                return $.ajax({
                    url: '/SearchReader/SearchSchool?query=' + this.query,
                    type: 'Get',
                    success: function (result) {
                        return process(result.map(function (item) {
                            return JSON.stringify({
                                id: item.Code,
                                name: item.Title,
                                province: item.Province,
                                sId: item.SourceId,
                                sName: item.SourceTitle
                            });
                        }));
                    }
                });
            },
            matcher: function (obj) { return true; },
            highlighter: function (obj) {
                var item = JSON.parse(obj);
                var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
                var flags = [];
                if (item.name) {
                    for (var i in item.name) flags.push(0);
                    for (var i in query)
                        for (var j in item.name)
                            if (!flags[j] && query[i] == item.name[j]) {
                                flags[j] = 1;
                                break;
                            }

                    var res = item.name;
                    item.name = "";
                    for (var i in res) {
                        if (flags[i])
                            item.name += '<strong class="text-danger">' + res[i] + '</strong>';
                        else
                            item.name += res[i];
                    }
                }

                return item.name + '（' + item.province + '）';
            },
            updater: function (obj) {
                var item = JSON.parse(obj);
                Scope.$apply(function () { Scope.SchoolView.School.Code = item.id; Scope.SchoolView.School.Title = item.sId ? item.sName : item.name; });
                return Scope.SchoolView.School.Title;
            }
        })
    },
    InitSearchFile: function (inputDomId, type) {
        var $input = $("#" + inputDomId);
        $input.typeahead({
            items: 'all',
            delay: 300,
            autoSelect: false,
            source: function (query, process) {
                this.query = query = query.replace(/(^\s*)|(\s*$)/g, "");
                return $.ajax({
                    url: '/DownloadReader/Get' + type + 'Names',
                    type: 'Get',
                    success: function (result) {
                        var resultList = result.map(function (item) {
                            var aItem = { id: item, name: item, };
                            return JSON.stringify(aItem);
                        });
                        return process(resultList);
                    }
                });
            },
            matcher: Tools.TypeaHeadMatcher,
            highlighter: Tools.TypeaHeadHighLighter,
            updater: function (obj) {
                var item = JSON.parse(obj);
                return item.name;
            }
        })
    },
    InitSearchReviewer: function (Id) {
        var $input = $("#SearchReviewer");
        $input.typeahead({
            items: 'all',
            delay: 300,
            autoSelect: false,
            source: function (query, process) {
                this.query = query = query.replace(/(^\s*)|(\s*$)/g, "");
                return $.ajax({
                    url: '/Search/Reviewer?questionId=' + Id + '&searchStr=' + query,
                    type: 'Get',
                    success: function (result) {
                        if (result.Reviewers === undefined) {
                            return process({});

                        }
                        var resultList = result.Reviewers.map(function (item) {
                            var icon = '';
                            if (item.User.Icon !== undefined) {
                                icon = item.User.Icon;
                                if (item.User.Icon.indexOf('http://') !== 0)
                                    icon = Tools.UploadServer + icon;
                            }
                            else if (item.User.Sex !== 2)
                                icon = '/images/default/male.jpg';
                            else
                                icon = '/images/default/female.jpg';

                            var aItem = { id: item.User.Id, name: item.User.Name, icon: icon, isReviewer: item.IsReviewer };
                            return JSON.stringify(aItem);
                        });
                        return process(resultList);
                    }
                });
            },
            matcher: Tools.TypeaHeadMatcher,
            highlighter: Tools.TypeaHeadHighLighter,
            updater: function (obj) {
                var item = JSON.parse(obj);
                if (item.isReviewer) {
                    alert(item.name + "已被选过本问题的评审人员！");
                }
                else {
                    $('#SearchReviewerId').attr('value', item.id);
                    return item.name;
                }
            }
        })
    },
    InitSearchTopic: function (obj) {
        var tempSearchStr;
        $('#mySelect').select2({
            ajax: {
                url: '/SearchReader/TopicTitle',
                data: function (params) {
                    var query = {
                        searchStr: params.term.replace(/(^\s*)|(\s*$)/g, "")
                    }
                    tempSearchStr = query.searchStr;
                    return query;
                },
                processResults: function (data) {
                    var rows = [];
                    var flag = true;
                    for (var i in data) {
                        rows[i] = {
                            'id': data[i].LinkId,
                            'text': data[i].Content,
                        };
                        if (tempSearchStr.toLowerCase() == rows[i].text.toLowerCase())
                            flag = false;
                    }
                    if (flag)
                        rows.unshift({
                            'id': 0,
                            'text': tempSearchStr,
                        });
                    return {
                        results: rows
                    };
                },
                cache: true,
                delay: 300
            },
            language: 'zh-CN',
            width: '100%',
            placeholder: '搜索话题',
            minimumInputLength: 1,
            maximumSelectionLength: 5,
            closeOnSelect: false,
            templateResult: function (data) {
                if (data.id === undefined) {
                    return;
                }
                if (data.id === 0) {
                    return $('<span><strong>' + '添加新话题：' + data.text + '</strong></span>');
                }
                else {
                    var query = tempSearchStr.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
                    return $('<span>' + data.text.replace(new RegExp('(' + query + ')', 'ig'), function ($1, match) {
                        return '<strong class="text-danger">' + match + '</strong>'
                    }) + '</span>');
                }
            },
        });

        $("#mySelect").on("change", function () {
            if ($(this).val().length >= 5) {
                $(this).select2('close');
            }
        })

        $("#mySelect").on("select2:selecting", function (e) {
            if (e.params.args.data.id === 0) {
                NodPost.Topic.Append(e.params.args.data.text);
                return false;
            }
        });

        for (var key in obj) {
            if (!Tools.CheckNumber(key))
                continue;
            var newOption = new Option(obj[key].Title, obj[key].Id, false, true);
            $('#mySelect').append(newOption).trigger('change');
        }
    },
    InitCKEditor: function (id, data, needSave, obj) {
        if (!Tools[id]) {
            Tools[id] = CKEDITOR.replace(id, {
                filebrowserBrowseUrl: Tools.UploadServer + 'ckfinder.html',
                //filebrowserUploadUrl: Tools.UploadServer + 'ckfinder/connector?command=QuickUpload&type=Files&responseType=json',
            });

            $.fn.modal.Constructor.prototype.enforceFocus = function () {
                modal_this = this;
                $(document).on('focusin.modal', function (e) {
                    if (modal_this.$element[0] !== e.target && !modal_this.$element.has(e.target).length
                        && !$(e.target.parentNode).hasClass('cke_dialog_ui_input_select')
                        && !$(e.target.parentNode).hasClass('cke_dialog_ui_input_text')
                        && !$(e.target.parentNode).hasClass('cke_dialog_ui_input_textarea')) {
                        modal_this.$element.focus();
                    }
                })
            };
        }

        Tools[id].removeListener('change', id.autoSave);
        Tools[id].setData(data);

        if (needSave && obj) {
            Tools[id].saveFlag = false;
            Tools[id].obj = obj;

            if (id == 'CreateQuestionCKEditor') {
                Tools[id].autoSave = function () {
                    if (Tools[id].obj && !Tools[id].saveFlag) {
                        Tools[id].saveFlag = true;
                        var timer = setTimeout(function () {
                            NodPost.QuestionDraft.Save(Tools[id].obj);
                            Tools[id].saveFlag = false;
                        }, 15000);
                    }
                };

                Tools[id].on('change', Tools[id].autoSave);
            } else if (id == 'CreateAnswerCKEditor') {
                Tools[id].autoSave = function () {
                    if (Tools[id].obj && !Tools[id].saveFlag) {
                        Tools[id].saveFlag = true;
                        var timer = setTimeout(function () {
                            NodPost.Answer.SaveDraft(Tools[id].obj);
                            Tools[id].saveFlag = false;
                        }, 15000);
                    }
                };

                Tools[id].on('change', Tools[id].autoSave);
            } else if (id == 'BlogCKEditor') {
                Tools[id].autoSave = function () {
                    if (Tools[id].obj && !Tools[id].saveFlag) {
                        Tools[id].saveFlag = true;
                        var timer = setTimeout(function () {
                            NodPost.BlogDraft.Save(Tools[id].obj);
                            Tools[id].saveFlag = false;
                        }, 15000);
                    }
                };

                Tools[id].on('change', Tools[id].autoSave);
            }
        }
    },
    InitDatePicker: function (datePickerId, format, maxView, minView) {
        format = format == null ? 'yyyy/mm/dd hh:ii' : format;
        maxView = maxView == null ? 4 : maxView;
        minView = minView == null ? 0 : minView;
        $('#' + datePickerId).datetimepicker({
            todayBtn: "linked",
            keyboardNavigation: false,
            forceParse: true,
            language: "zh-CN",
            maxView: maxView,
            minView: minView,
            minuteStep: 5,
            format: format,
            autoclose: true
        });
    },
    SweetAlert: function (title, text, type) {
        swal({
            title: title,
            text: text,
            type: type,
            buttonsStyling: false,
            confirmButtonText: "确定",
            confirmButtonClass: "btn btn-primary m-l-xs m-r-xs",
        });
    },
    SweetAlertReload: function (title, text, type) {
        swal({
            title: title,
            text: text,
            type: type,
            buttonsStyling: false,
            confirmButtonText: "确定",
            confirmButtonClass: "btn btn-primary m-l-xs m-r-xs",
        }).then(function (result) {
            Scope.refreshData();
        });
    },
    SweetAlertRedirect: function (title, text, type, href) {
        swal({
            title: title,
            text: text,
            type: type,
            buttonsStyling: false,
            confirmButtonText: "确定",
            confirmButtonClass: "btn btn-primary m-l-xs m-r-xs",
        }).then(function (result) {
            window.location.href = href;
        });
    },
    SweetAlertWarn: function (linkFun, param1, title, text) {
        swal({
            title: title,
            text: text,
            type: "warning",
            buttonsStyling: false,
            confirmButtonText: "确定",
            confirmButtonClass: "btn btn-danger m-l-xs m-r-xs",
            showCancelButton: true,
            cancelButtonText: "取消",
            cancelButtonClass: "btn btn-white m-l-xs m-r-xs",
            reverseButtons: true,
        }).then(function (result) {
            if (result.value === true) {
                linkFun(param1);
            }
        });
    },
    SweetAlertDelete: function (linkFun, param1, title, text) {
        swal({
            title: title,
            text: text,
            type: "warning",
            buttonsStyling: false,
            confirmButtonText: "删除",
            confirmButtonClass: "btn btn-danger m-l-xs m-r-xs",
            showCancelButton: true,
            cancelButtonText: "取消",
            cancelButtonClass: "btn btn-white m-l-xs m-r-xs",
            reverseButtons: true,
        }).then(function (result) {
            if (result.value === true) {
                linkFun(param1);
            }
        });
    },
    SweetAlertDeleteParam2: function (linkFun, param1, param2, title, text) {
        swal({
            title: title,
            text: text,
            type: "warning",
            buttonsStyling: false,
            confirmButtonText: "删除",
            confirmButtonClass: "btn btn-danger m-l-xs m-r-xs",
            showCancelButton: true,
            cancelButtonText: "取消",
            cancelButtonClass: "btn btn-white m-l-xs m-r-xs",
            reverseButtons: true,
        }).then(function (result) {
            if (result.value === true) {
                linkFun(param1, param2);
            }
        });
    },
    SweetAlertDeleteParam3: function (linkFun, param1, param2, param3, title, text) {
        swal({
            title: title,
            text: text,
            type: "warning",
            buttonsStyling: false,
            confirmButtonText: "删除",
            confirmButtonClass: "btn btn-danger m-l-xs m-r-xs",
            showCancelButton: true,
            cancelButtonText: "取消",
            cancelButtonClass: "btn btn-white m-l-xs m-r-xs",
            reverseButtons: true,
        }).then(function (result) {
            if (result.value === true) {
                linkFun(param1, param2, param3);
            }
        });
    },
    SweetAlertConfirm: function (linkFun, param1, title, text) {
        swal({
            title: title,
            text: text,
            type: "warning",
            buttonsStyling: false,
            confirmButtonText: "确定",
            confirmButtonClass: "btn btn-primary m-l-xs m-r-xs",
            showCancelButton: true,
            cancelButtonText: "取消",
            cancelButtonClass: "btn btn-white m-l-xs m-r-xs",
            reverseButtons: true,
        }).then(function (result) {
            if (result.value === true) {
                linkFun(param1);
            }
        });
    },
    SweetAlertConfirmParam2: function (linkFun, param1, param2, title, text) {
        swal({
            title: title,
            text: text,
            type: "warning",
            buttonsStyling: false,
            confirmButtonText: "确定",
            confirmButtonClass: "btn btn-primary m-l-xs m-r-xs",
            showCancelButton: true,
            cancelButtonText: "取消",
            cancelButtonClass: "btn btn-white m-l-xs m-r-xs",
            reverseButtons: true,
        }).then(function (result) {
            if (result.value === true) {
                linkFun(param1, param2);
            }
        });
    },
    SweetAlertConfirmParam3: function (linkFun, param1, param2, param3, title, text) {
        swal({
            title: title,
            text: text,
            type: "warning",
            buttonsStyling: false,
            confirmButtonText: "确定",
            confirmButtonClass: "btn btn-primary m-l-xs m-r-xs",
            showCancelButton: true,
            cancelButtonText: "取消",
            cancelButtonClass: "btn btn-white m-l-xs m-r-xs",
            reverseButtons: true,
        }).then(function (result) {
            if (result.value === true) {
                linkFun(param1, param2, param3);
            }
        });
    },
    MultiSelectInit: function (objects) {
        if (objects == null) return;

        objVal(objects, 'MultiSelectAllBtn', false, true, false);

        for (var i = 0; i < objects.length; i++) objVal(objects[i], 'IsMultiSelected', false, true, false);

        objVal(objects, 'getMultiSelectList', function (path) {
            path = path === undefined ? 'Id' : path;
            var list = [];
            for (var i in this)
                if (this[i].IsMultiSelected)
                    list.push(getValue(this[i], path));

            return list;
        }, true, false);

        objVal(objects, 'setMultiSelectAll', function (path) {
            path = path === undefined ? 'Id' : path;
            var list = [];
            for (var i in this)
                if (this[i].IsMultiSelected)
                    list.push(getValue(this[i], path));

            return list;
        }, true, false);

        Object.defineProperty(objects, 'setMultiSelectAll', {
            value: function () {
                if (this.MultiSelectAllBtn) {
                    for (var i in this) {
                        this[i].IsMultiSelected = false;
                    }
                }
                else {
                    for (var i in this) {
                        this[i].IsMultiSelected = true;
                    }
                }
                this.MultiSelectAllBtn = !this.MultiSelectAllBtn;
            },
            writable: true,
            enumerable: false
        });
    },
    ArrayConcat: function (arr1, arr2, indexStr, isReverse) {
        if (arr1 == null || arr2 == null)
            return;
        if (isReverse)
            arr1 = arr1.reverse();

        for (var item2 in arr2) {
            var flag = true;
            for (var item1 in arr1) {
                if (arr2[item2][indexStr] == arr1[item1][indexStr]) {
                    flag = false;
                    break;
                }
            }
            if (flag)
                arr1.push(arr2[item2]);
        }

        if (isReverse)
            arr1 = arr1.reverse();
    },
    //深拷贝对象的值，而不是拷贝对象引用
    DeepCopy: function (object) {
        var result = {};
        for (var key in object) {
            result[key] = typeof object[key] === 'object' ? this.DeepCopy(object[key]) : object[key];

        }
        return result;
    },
    //将 nodes2 覆盖至 nodes1
    DeepCover: function (nodes1, nodes2) {
        for (var i in nodes1) {
            if (nodes2[i] === undefined) { delete nodes1[i] && nodes1.length && nodes1.length--; }
            else if (typeof nodes1[i] === "object" && nodes1[i] !== null && typeof nodes2[i] === "object" && nodes2[i] !== null) this.DeepCover(nodes1[i], nodes2[i]);
            else nodes1[i] = nodes2[i];
        }
        for (var i in nodes2) if (nodes1[i] === undefined) nodes1[i] = nodes2[i];
    },
    ToastrSuccess: function (title, text, reload, hidemodal) {
        toastr.success(text, title);

        if (reload) Scope.refreshData();
        if (hidemodal) ModalCtrl.HideAll();
    },
    ToastrError: function (title, text, reload, hidemodal) {
        toastr.error(text, title);

        if (reload) Scope.refreshData();
        if (hidemodal) ModalCtrl.HideAll();
    },
    ToastrWarning: function (title, text, reload, hidemodal) {
        toastr.warning(text, title);

        if (reload) Scope.refreshData();
        if (hidemodal) ModalCtrl.HideAll();
    },
    //键盘钩子
    KeyHook: function (keyCode, bottonId, needCtrl) {
        needCtrl = needCtrl === undefined ? false : needCtrl;
        var kCode = event.keyCode || event.which || event.charCode;
        var ctrlKey = event.ctrlKey || event.metaKey;

        if (kCode == keyCode && ctrlKey == needCtrl)
            document.getElementById(bottonId).click();
    },
    //获取浏览器信息
    GetBrowserInfo: function () {
        var Sys = {};
        var ua = navigator.userAgent.toLowerCase();
        var re = /(msie|firefox|chrome|opera|version).*?([\d.]+)/;
        var m = ua.match(re);
        Sys.browser = m[1].replace(/version/, "'safari");
        Sys.ver = m[2];
        return Sys;
    },
    //根据对象和字符串设置子对象的值
    //SetChildValue: function (fa, path, value) {
    //    var strs = path.split('.');
    //    var value = fa;

    //    for (var i in strs) {
    //        if (i === strs.length - 1) {
    //            value[strs[i]] = value;
    //        } else {
    //            if (value[strs[i]])
    //                value = value[strs[i]];
    //            else
    //                value[strs[i]] = {};
    //        }
    //    }
    //},
    //判断一个字符串是不是null/undefined/empty
    IsStringEmpty: function (obj) {
        //这里谨慎修改
        return obj === undefined || obj === null || (typeof (obj) == 'string' && obj.trim().length === 0);
    },
    InputToPwd: function (inputId) {
        $("#" + inputId).attr("type", "password");
    },
    InputToText: function (inputId) {
        $("#" + inputId).attr("type", "text");
    },
    Child2Null: function (obj) {
        for (var i in obj) {
            if (i.toLocaleLowerCase() === 'id')
                continue;
            if (typeof (obj[i]) === 'boolean')
                obj[i] = false;
            else if (typeof (obj[i]) === 'number')
                obj[i] = 0;
            else
                obj[i] = null;
        }
    },
    CheckNumber: function (number) {
        var re = /^\d+$/;//判断字符串是否为数字
        if (re.test(number))
            return true;
        else
            return false;
    },
    InitTrainDif: function (trainingLevels, userLevel) {
        if (!trainingLevels || !userLevel) return;

        var curName, curLevel = -1;
        Scope.TrainDif = {};
        for (var i = 0; i < trainingLevels.length; i++) {
            if (trainingLevels[i].Id === userLevel.Id) { curLevel = i; curName = userLevel.LevelName; };

            if (!Scope.TrainDif[trainingLevels[i].LevelName]) {
                Scope.TrainDif[trainingLevels[i].LevelName] = {};
                Scope.TrainDif[trainingLevels[i].LevelName].Display = trainingLevels[i].LevelName;
            }

            var temp = Scope.TrainDif[trainingLevels[i].LevelName];
            temp.Default = curLevel < i && trainingLevels[i].LevelName !== curName;
            temp.Primary = trainingLevels[i].LevelName === curName;
            temp.Success = i < curLevel && trainingLevels[i].LevelName !== curName;
        }
    },
    InitTrainLev: function (trainingLevels, userLevel) {
        if (!trainingLevels || !userLevel) return;

        Scope.TrainLev = {};
        for (var i = 0; i < trainingLevels.length; i++) {
            if (trainingLevels[i].LevelName !== userLevel.LevelName) continue;

            Scope.TrainLev[trainingLevels[i].Title] = {};
            var temp = Scope.TrainLev[trainingLevels[i].Title];

            temp.Display = trainingLevels[i].Title;
            temp.Default = trainingLevels[i].SortId > userLevel.SortId || trainingLevels[i].Id > userLevel.Id;
            temp.Primary = trainingLevels[i].Id === userLevel.Id;
            temp.Success = trainingLevels[i].SortId < userLevel.SortId || trainingLevels[i].Id < userLevel.Id;
        }
    },
    InitTestCanDown: function (tests, cDown) {
        for (var i in tests) {
            tests[i].CanDownload = false;
            if (tests[i].Result !== NodEnum.JudgeResult.Accepted.Index && cDown) {
                tests[i].CanDownload = true;
                cDown = false;
            }
        }
    },
    //#region 准备废弃
    UrlEqual: function (str) {
        //不区分大小写
        if (window.location.pathname.toLowerCase() === str.substring(0, str.indexOf('#')).toLowerCase())
            return true; // 正确
        else if (window.location.pathname.toLowerCase() === str.substring(0, str.indexOf('?')).toLowerCase())
            return true;
        else
            return false; // 错误
    },
    //#endregion
    SyncTimer: function (time, fun) {
        if (!time || !fun || !flag) return;
    },
    Redirect: function (url, newWindow) {
        if (!sEmpty(url))
            if (newWindow) window.open(url);
            else window.location.href = url;
    },
    CloseIval: function (val, left, right) {
        var val = parseInt(val);
        var left = parseInt(left);
        var right = parseInt(right);
        if (isNaN(val) || isNaN(left) || isNaN(right))
            return false;
        else
            return left <= val && val <= right
    },
    ObjectFun: function (obj, name, get, set, enu, conf) {
        if (obj[name] !== undefined && !Object.getOwnPropertyDescriptor(obj, name).writable) return;
        Object.defineProperty(obj, name, {
            get: get,
            set: set,
            enumerable: enu,
            configurable: conf
        });
    },
    ObjectValue: function (obj, name, val, wri, enu, conf) {
        if (obj[name] !== undefined && !Object.getOwnPropertyDescriptor(obj, name).writable) return;
        Object.defineProperty(obj, name, {
            value: val,
            writable: wri,
            enumerable: enu,
            configurable: conf
        });
    },
}
var sEmpty = Tools.IsStringEmpty;
var objFun = Tools.ObjectFun;
var objVal = Tools.ObjectValue;