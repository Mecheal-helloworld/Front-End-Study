var path2Obj = function (scope, path) {
    var obj = {};
    if (!scope || path === undefined || path === null) return obj;
    last = path.lastIndexOf('.');
    obj.val = getValue(scope, path);
    obj.valName = path.substring(last + 1);
    obj.parent = getValue(scope, path.substring(0, last));
    return obj;
}

var getValue = function (base, path) {
    if (path === undefined || path === null)
        return undefined;

    var strs = path.replace(new RegExp(']', 'gm'), '', '').split(/[\.\[]/);
    var value = base;

    for (var i in strs)
        if (value[strs[i]] === undefined || value[strs[i]] === null)
            return value[strs[i]];
        else
            value = value[strs[i]];

    return value;
}

var blk = {
    ngMath: function (scope, ele, att) {
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, ele[0]]);
        scope.$watch(att.ngBindHtml, function () { MathJax.Hub.Queue(["Typeset", MathJax.Hub, ele[0]]); });
    },
    codeExhibitor: function (scope, ele, att) {
        var code = path2Obj(scope, att.ngData);
        Object.defineProperty(code.parent, code.valName, {
            get: function () { return code.val; },
            set: function (value) {
                if (!value) return;
                code.val = value;
                ele[0].innerText = value;
                ele[0].innerHTML = ele[0].innerHTML.replaceAll('<br>', '\n');
                ele[0].classList.length && hljs.highlightBlock(ele[0]);
            },
            enumerable: true,
        });
        code.parent[code.valName] = code.val;
    },
    codeExhibitor: function (scope, ele, att) {
        var code = path2Obj(scope, att.ngData);
        Object.defineProperty(code.parent, code.valName, {
            get: function () { return code.val; },
            set: function (value) {
                if (!value) return;
                code.val = value;
                ele[0].innerText = value;
                ele[0].innerHTML = ele[0].innerHTML.replaceAll('<br>', '\n');
                ele[0].classList.length && hljs.highlightBlock(ele[0]);
            },
            enumerable: true,
        });
        code.parent[code.valName] = code.val;
    },
    codeEditor: function (scope, ele, att) {
        ele[0].classList.add("ace_editor", "code-editor");
        var editor = ace.edit(ele[0]);

        editor.setTheme("ace/theme/clouds");
        editor.session.setMode("ace/mode/c_cpp");
        editor.setFontSize(18);
        editor.setReadOnly(false);//设置只读（true时只读，用于展示代码）
        editor.setOption("wrap", "free");//自动换行,设置为off关闭
        editor.setShowPrintMargin(false);//关闭编辑器那条奇怪的竖线
        ace.require("/js/ace/ext/language_tools");//启用提示菜单
        editor.setOptions({ enableBasicAutocompletion: true, enableSnippets: true, enableLiveAutocompletion: true });

        //代码
        var code = path2Obj(scope, att.ngData);
        Object.defineProperty(code.parent, code.valName, {
            get: function () { return editor.getValue(); },
            set: function (value) { if (value !== undefined && value !== null) editor.setValue(value, 1); else editor.setValue("", 1); },
            enumerable: true,
        });
        code.parent[code.valName] = code.val;
        Object.defineProperty(code.parent, "editor", { value: editor });

        //语言
        var lang = path2Obj(scope, att.ngLang);
        Object.defineProperty(lang.parent, lang.valName, {
            get: function () { return lang.val; },
            set: function (value) {
                if (value !== undefined) {
                    lang.val = value;
                    editor.session.setMode("ace/mode/" + LanguageList.byLang[lang.val].AceName);
                }
            },
            enumerable: true,
        });
        lang.parent[lang.valName] = lang.val;

        //绑定一个提交检测
        Object.defineProperty(code.parent, "SubmitHook", { value: function () { return CodeEditor.SubmitHook(editor.getValue(), LanguageList.byLang[lang.val].Language); } });

        if (att.ngSaveid) {//自动存储
            var saveid = path2Obj(scope, att.ngSaveid);
            editor.saveId = saveid.val;
            editor.saveFlag = false;
            Object.defineProperty(saveid.parent, saveid.valName, {
                get: function () { return editor.saveId; },
                set: function (value) {
                    if (editor.saveId === value) return;
                    editor.saveFlag = false;
                    editor.saveId = value;
                },
                enumerable: true,
            });
            saveid.parent[saveid.valName] = saveid.val;
            editor.on("change", function () {
                if (editor.saveId && !editor.saveFlag) {
                    editor.saveFlag = true;
                    setTimeout(function () { NodPost.ProgramDraft.SaveLazyDraft(editor.saveId, editor.getValue(), lang.val); editor.saveFlag = false; }, 15000);
                }
            });
        }

        if (att.ngReadonly) {//只读
            var readonly = path2Obj(scope, att.ngReadonly);
            Object.defineProperty(readonly.parent, readonly.valName, {
                get: function () { return readonly.val; },
                set: function (value) {
                    readonly.val = value;
                    editor.setReadOnly(readonly.val);
                },
                enumerable: true,
            });
            readonly.parent[readonly.valName] = readonly.val;
        }

        //绑定一个数据修改
        Object.defineProperty(code.parent, "Update", {
            value: function (_code, _lang, _saveid, _readonly) {
                if (_code) code.parent[code.valName] = _code;
                if (_lang) lang.parent[lang.valName] = _lang;
                if (att.ngSaveid && _saveid) saveid.parent[saveid.valName] = _saveid;
                if (att.ngReadonly && _readonly) readonly.parent[readonly.valName] = _readonly;
            }
        });

        Object.defineProperty(code.parent, "GetAttr", {
            value: function () {
                return {
                    code: code.parent[code.valName],
                    lang: lang.parent[lang.valName],
                    saveid: att.ngSaveid ? saveid.parent[saveid.valName] : 0,
                    readonly: att.ngReadonly ? readonly.parent[readonly.valName] : false,
                }
            }
        });
    },
    videoReg: function (scope, att) {
        if (!att.videoId || att.videoId == 0) return;
        var wrap = Tools.VideoJs.wraps['VideoJs'];

        var videoJson = path2Obj(scope, att.videoJson);
        Object.defineProperty(videoJson.parent, videoJson.valName, {
            get: function () { return videoJson.val; },
            set: function (value) { videoJson.val = value; },
            enumerable: true,
        });
        videoJson.parent[videoJson.valName] = !sEmpty(videoJson.val) ? JSON.parse(videoJson.val) : { CurrentTime: 0 };

        var id = path2Obj(scope, att.videoId);
        Object.defineProperty(id.parent, id.valName, {
            get: function () { return id.val; },
            set: function (value) {
                if (!value) return;
                if (wrap.videoId == 0) {
                    wrap.videoId = value;
                    wrap.player.src(Tools.VideoJs.GetSrc(value));
                    wrap.player.sTime = videoJson.val.CurrentTime / 1000;
                }
                id.val = value;
            },
            enumerable: true,
        });
        id.parent[id.valName] = id.val;

        wrap.regs.push({ Id: id, Json: videoJson });
        wrap.ele.classList.remove("hide");

        id.parent.play = function (sTime) {
            sTime = sTime ? sTime : 0;
            if (!wrap) return;
            if (wrap.videoId != id.val) {
                wrap.videoId = id.val;
                wrap.player.src(Tools.VideoJs.GetSrc(id.val));
            }

            wrap.player.sTime = sTime;
            wrap.player.play();
        }
    },
    videoWrap: function (scope, ele, att, compile) {
        var id = 'VideoJs';
        if (!Tools.VideoJs.wraps[id]) Tools.VideoJs.wraps[id] = {};

        var wrap = Tools.VideoJs.wraps[id];
        var src = '';

        if (compile) ele[0].innerHTML = CreChapterNode.VideoWrap(id);

        wrap.ele = ele[0];
        wrap.top = ele[0].children[0];
        wrap.video = ele[0].children[1];
        wrap.placeholder = ele[0].children[2];
        wrap.bottom = ele[0].children[3];

        wrap.videoId = 0;
        //主要是去重，怕之后有同一个视频多个片段
        wrap.videos = function () {
            var arr = [];
            for (var i in wrap.regs) {
                var flag = true;
                for (var j in arr)
                    if (arr[j] == wrap.regs[i].Id.val) {
                        flag = false;
                        break;
                    }
                if (flag) arr.push(wrap.regs[i].Id.val);
            }
            return arr;
        };

        wrap.regs = [];
        ReadyFun.push(function () {
            wrap.regs = [];
            wrap.videoId = 0;
            ele[0].classList.add("hide");
        });

        $('#' + id).bind('contextmenu', function () { return false; });
        autoplay = att.videoAutoPlay ? true : false;

        wrap.player = videojs(id, Tools.VideoJs.setting(src, autoplay));
        var player = wrap.player;

        player.sTime = 0;
        player.on('loadedmetadata', function () {
            console.log('loadedmetadata-视频源数据加载完成')
            player.currentTime(player.sTime);
        });

        var getReg = function (videoId) {
            for (var i in wrap.regs)
                if (videoId == wrap.regs[i].Id.val)
                    return wrap.regs[i];
        }

        player.lastRecTime = 0;
        player.on("play", function () {
            console.log("视频开始播放" + player.id_);
            player.isPlaying = true;
            if (player.timer) clearInterval(player.timer);
            player.timer = setInterval(function () {
                player.lastRecTime = player.currentTime();
                Tools.VideoJs.Play(getReg(wrap.videoId), player.lastRecTime);
            }, 15000);
        });

        player.on("pause", function () {
            console.log("视频暂停播放" + player.id_);
            if (player.timer) clearInterval(player.timer);
            player.isPlaying = false;
        });

        player.on("ended", function () {
            console.log("视频播放结束" + player.id_);

            var arr = wrap.videos();
            if (wrap.videoId == 0) wrap.videoId = arr[0];
            else {
                for (var i in arr) {
                    if (arr[i] == wrap.videoId) {
                        wrap.videoId = arr[(i + 1) % arr.length];
                        break;
                    }
                }
            }

            player.src(Tools.VideoJs.GetSrc(wrap.videoId));
            player.play();
        });

        scope.canFVideo = true;

        scope.playVideo = function () { if (!player.isPlaying) player.play(); }
        scope.pauseVideo = function () { if (player.isPlaying) player.pause(); }
        scope.toTop = function () { window.scrollTo(0, 0); }

        if (compile) compile(ele.contents())(scope);
    },
};