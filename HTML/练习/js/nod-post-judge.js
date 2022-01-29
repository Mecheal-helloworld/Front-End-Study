var RunInit = function (isOne) {
    Scope.TempJudgeShow = false;
    Scope.TempJudgeOne = isOne;
    Scope.TempJudgeView = null;
    Scope.TempJudges = [];
    Scope.Running = true;
}

NodPost.Judge = {
    Append: function (ProblemId, Language, IsPublic) {
        if (!AceEditor.SubmitHook()) { Ladda.stopAll(); return; }

        var url = "/JudgeWriter/Append";
        $.post(url, {
            'ProblemId': ProblemId,
            'Language': Language,
            'IsPublic': IsPublic,
            'ProgramContent': AceEditor.GetValue()
        }, function (data, status) {
            if (NodPostTool.OpSucceed(data)) {
                window.location.href = Path.Path.Challenge.ProblemSubmitDetail(data);
            }
            else {
                Tools.SweetAlert('提交代码', NodPostTool.ErrorPrompt(data, '提交代码'), 'error');
                Ladda.stopAll();
            }
        });
    },
    ReJudge: function (Ids) {
        var url = "/JudgeWriter/ReJudge";
        $.post(url, {
            'Ids': Ids,
            'Idata': NodEnum.JudgeType.Judge.Index,
        }, function (data, status) {
            Tools.ToastrSuccess('ReJudge', 'ReJudge申请成功。', true);
        });
    },
    Run: function (ProblemId, Language) {
        if (!AceEditor.SubmitHook()) { Ladda.stopAll(); return; }
        RunInit(true);

        var url = "/JudgeWriter/Run";
        $.post(url, {
            'ProblemId': ProblemId,
            'Language': Language,
            'ProgramContent': AceEditor.GetValue(),
        }, function (data, status) {
            if (NodPostTool.OpSucceed(data)) {
                WebsocketController.TempJudgeReg(data);
            }
            else {
                Tools.SweetAlert('运行代码', NodPostTool.ErrorPrompt(data, '运行代码'), 'error');
                Ladda.stopAll();
                Scope.$apply(function () { Scope.Running = false; });
            }
        });
    },
    RunAll: function (ProblemId, Language) {
        if (!AceEditor.SubmitHook()) { Ladda.stopAll(); return; }
        RunInit(false);

        var url = "/JudgeWriter/RunAll";
        $.post(url, {
            'ProblemId': ProblemId,
            'Language': Language,
            'ProgramContent': AceEditor.GetValue(),
        }, function (data, status) {
            if (NodPostTool.OpSucceed(data)) {
                WebsocketController.TempJudgeReg(data);
                Scope.TempJudgeShow = true;
            }
            else {
                Tools.SweetAlert('运行代码', NodPostTool.ErrorPrompt(data, '运行代码'), 'error');
                Ladda.stopAll();
                Scope.$apply(function () { Scope.Running = false; });
            }
        });
    },
    RunAllNotLimited: function (ProblemId, Language) {
        if (!AceEditor.SubmitHook()) { Ladda.stopAll(); return; }
        RunInit(false);

        var url = "/JudgeWriter/RunAllNotLimited";
        $.post(url, {
            'ProblemId': ProblemId,
            'Language': Language,
            'ProgramContent': AceEditor.GetValue()
        }, function (data, status) {
            if (NodPostTool.OpSucceed(data)) {
                WebsocketController.TempJudgeReg(data);
                Scope.TempJudgeShow = true;
            }
            else {
                Tools.SweetAlert('运行代码', NodPostTool.ErrorPrompt(data, '运行代码'), 'error');
                Ladda.stopAll();
                Scope.$apply(function () { Scope.Running = false; });
            }
        });
    },
    RunTest: function (ProblemId, Language, testIds) {
        if (!AceEditor.SubmitHook()) { Ladda.stopAll(); return; }
        RunInit(false);

        var url = "/JudgeWriter/RunTest";
        $.post(url, {
            'ProblemId': ProblemId,
            'Language': Language,
            'ProgramContent': AceEditor.GetValue(),
            'testIds': testIds
        }, function (data, status) {
            if (NodPostTool.OpSucceed(data)) {
                WebsocketController.TempJudgeReg(data);
                Scope.TempJudgeShow = true;
            }
            else {
                Tools.SweetAlert('运行代码', NodPostTool.ErrorPrompt(data, '运行代码'), 'error');
                Ladda.stopAll();
                Scope.$apply(function () { Scope.Running = false; });
            }
        });
    },
    SetPublic: function (Judge) {
        var url = "/JudgeWriter/SetPublic";
        $.post(url, {
            'Id': Judge.Id,
        }, function (data, status) {
            if (NodPostTool.OpSucceed(data)) {
                Getter.RemoteGet(Judge);
            }
            else {
                Tools.ToastrError('公开代码', NodPostTool.ErrorPrompt(data, '公开代码'));
            }
        });
    },
}

NodPost.ContestJudge = {
    Append: function (ContestId, ProblemId, Language) {
        if (!AceEditor.SubmitHook()) { Ladda.stopAll(); return; }

        var url = "/ContestJudgeWriter/Append";
        $.post(url, {
            'ContestId': ContestId,
            'ProblemId': ProblemId,
            'Language': Language,
            'ProgramContent': AceEditor.GetValue(),
        }, function (data, status) {
            if (NodPostTool.OpSucceed(data)) {
                window.location.href = Path.Path.Contest.ProblemSubmitDetail(data);
            }
            else {
                Tools.SweetAlert('提交代码', NodPostTool.ErrorPrompt(data, '提交代码'), 'error');
                Ladda.stopAll();
            }
        });
    },
    ReJudge: function (Ids) {
        var url = "/JudgeWriter/ReJudge";
        $.post(url, {
            'Ids': Ids,
            'Idata': NodEnum.JudgeType.ContestJudge.Index,
        }, function (data, status) {
            Tools.ToastrSuccess('ReJudge', 'ReJudge申请成功。', true);
        });
    },
    Run: function (ContestId, ProblemId, Language) {
        if (!AceEditor.SubmitHook()) { Ladda.stopAll(); return; }
        RunInit(true);

        var url = "/ContestJudgeWriter/Run";
        $.post(url, {
            'ContestId': ContestId,
            'ProblemId': ProblemId,
            'Language': Language,
            'ProgramContent': AceEditor.GetValue()
        }, function (data, status) {
            if (NodPostTool.OpSucceed(data)) {
                WebsocketController.TempJudgeReg(data);
            }
            else {
                Tools.SweetAlert('运行代码', NodPostTool.ErrorPrompt(data, '运行代码'), 'error');
                Ladda.stopAll();
                Scope.$apply(function () { Scope.Running = false; });
            }
        });
    },
    RunAll: function (ContestId, ProblemId, Language) {
        if (!AceEditor.SubmitHook()) { Ladda.stopAll(); return; }
        RunInit(false);

        var url = "/ContestJudgeWriter/RunAll";
        $.post(url, {
            'ContestId': ContestId,
            'ProblemId': ProblemId,
            'Language': Language,
            'ProgramContent': AceEditor.GetValue()
        }, function (data, status) {
            if (NodPostTool.OpSucceed(data)) {
                WebsocketController.TempJudgeReg(data);
                Scope.TempJudgeShow = true;
            }
            else {
                Tools.SweetAlert('运行代码', NodPostTool.ErrorPrompt(data, '运行代码'), 'error');
                Ladda.stopAll();
                Scope.$apply(function () { Scope.Running = false; });
            }
        });
    },
}

NodPost.CourseJudge = {
    Append: function (CourseId, ProblemId, Language, ClassId) {
        if (!AceEditor.SubmitHook()) { Ladda.stopAll(); return; }

        var url = "/CourseJudgeWriter/Append";
        $.post(url, {
            'CourseId': CourseId,
            'ProblemId': ProblemId,
            'Language': Language,
            'ProgramContent': AceEditor.GetValue(),
            'ClassId': ClassId,
        }, function (data, status) {
            if (NodPostTool.OpSucceed(data)) {
                window.location.href = Path.Path.Classes.ProblemSubmitDetail(data);
            }
            else {
                Tools.SweetAlert('提交代码', NodPostTool.ErrorPrompt(data, '提交代码'), 'error');
                Ladda.stopAll();
            }
        });
    },
    ReJudge: function (Ids) {
        var url = "/JudgeWriter/ReJudge";
        $.post(url, {
            'Ids': Ids,
            'Idata': NodEnum.JudgeType.CourseJudge.Index,
        }, function (data, status) {
            Tools.ToastrSuccess('ReJudge', 'ReJudge申请成功。', true);
        });
    },
    Run: function (CourseId, ProblemId, Language) {
        if (!AceEditor.SubmitHook()) { Ladda.stopAll(); return; }
        RunInit(true);

        var url = "/CourseJudgeWriter/Run";
        $.post(url, {
            'CourseId': CourseId,
            'ProblemId': ProblemId,
            'Language': Language,
            'ProgramContent': AceEditor.GetValue()
        }, function (data, status) {
            if (NodPostTool.OpSucceed(data)) {
                WebsocketController.TempJudgeReg(data);
            }
            else {
                Tools.SweetAlert('运行代码', NodPostTool.ErrorPrompt(data, '运行代码'), 'error');
                Ladda.stopAll();
                Scope.$apply(function () { Scope.Running = false; });
            }
        });
    },
}


NodPost.TrainingJudge = {
    Append: function (ProblemId, TrainingId, Language) {
        if (!AceEditor.SubmitHook()) { Ladda.stopAll(); return; }

        var url = "/TrainingJudgeWriter/Append";
        $.post(url, {
            'ProblemId': ProblemId,
            'TrainingId': TrainingId,
            'Language': Language,
            'ProgramContent': AceEditor.GetValue(),
        }, function (data, status) {
            if (NodPostTool.OpSucceed(data)) {
                window.location.href = Path.Path.Training.ProblemSubmitDetail(data);
            }
            else {
                Tools.SweetAlert('提交代码', NodPostTool.ErrorPrompt(data, '提交代码'), 'error');
                Ladda.stopAll();
            }
        });
    },
    ReJudge: function (Ids) {
        var url = "/JudgeWriter/ReJudge";
        $.post(url, {
            'Ids': Ids,
            'Idata': NodEnum.JudgeType.TrainingJudge.Index,
        }, function (data, status) {
            Tools.ToastrSuccess('ReJudge', 'ReJudge申请成功。', true);
        });
    },
    Run: function (ProblemId, TrainingId, Language) {
        if (!AceEditor.SubmitHook()) { Ladda.stopAll(); return; }
        RunInit(true);

        var url = "/TrainingJudgeWriter/Run";
        $.post(url, {
            'ProblemId': ProblemId,
            'TrainingId': TrainingId,
            'Language': Language,
            'ProgramContent': AceEditor.GetValue()
        }, function (data, status) {
            if (NodPostTool.OpSucceed(data)) {
                WebsocketController.TempJudgeReg(data);
            }
            else {
                Tools.SweetAlert('运行代码', NodPostTool.ErrorPrompt(data, '运行代码'), 'error');
                Ladda.stopAll();
                Scope.$apply(function () { Scope.Running = false; });
            }
        });
    },
}

NodPost.RunReport = {
    Append: function (Input, Language) {
        if (!AceEditor.SubmitHook()) { Ladda.stopAll(); return; }

        var url = "/RunReportWriter/Append";
        Scope.RunReportShow = false;
        Scope.RunReport = null;
        Scope.Running = true;
        $.post(url, {
            'Input': Input,
            'Language': Language,
            'ProgramContent': AceEditor.GetValue(),
        }, function (data, status) {
            if (NodPostTool.OpSucceed(data)) {
                WebsocketController.RunReportFinishedReg(data);
            }
            else {
                Tools.SweetAlert('代码测试', NodPostTool.ErrorPrompt(data, '代码测试'), 'error');
                Ladda.stopAll();
                Scope.$apply(function () { Scope.Running = false; });
            }
        });
    },
} 