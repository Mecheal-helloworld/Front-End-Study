/**
 * 此代码是由51nod的夹克老爷写的程序生成的，所以不要手动修改，因为下次又会被覆盖
 */
var WebsocketController = {
    /**
 * 此代码是由51nod的夹克老爷写的程序生成的，所以不要手动修改，因为下次又会被覆盖
 */
    WebsocketEnum: {
        Stat: 0,
        UserStat: 1,
        LiveMessage: 2,
        ContestRank: 3,
        Judge: 10,
        JudgeFinished: 11,
        ContestJudge: 12,
        ContestJudgeFinished: 13,
        CourseJudge: 14,
        CourseJudgeFinished: 15,
        TrainingJudge: 16,
        TrainingJudgeFinished: 17,
        TutorialJudge: 18,
        TutorialJudgeFinished: 19,
        TempJudge: 20,
        TempJudgeFinished: 21,
        UserCookie: 30,
        RunReportFinished: 35,
        PayOrder: 36,
    },
    WebsocketSwitch: {
        Stat: false,
        UserStat: false,
        LiveMessage: false,
        ContestRank: false,
        Judge: false,
        JudgeFinished: false,
        ContestJudge: false,
        ContestJudgeFinished: false,
        CourseJudge: false,
        CourseJudgeFinished: false,
        TrainingJudge: false,
        TrainingJudgeFinished: false,
        TutorialJudge: false,
        TutorialJudgeFinished: false,
        TempJudge: false,
        TempJudgeFinished: false,
        UserCookie: false,
        RunReportFinished: false,
        PayOrder: false,
        LiveMessageScrlToBom: false,
    },
    JudgeTypeEnum: {
        Judge: 0,
        ContestJudge: 1,
        CourseJudge: 2,
        TrainingJudge: 3,
        TutorialJudge: 4,
    },
    JudgeLock: false,
    ContestJudgeLock: false,
    CourseJudgeLock: false,
    TrainingJudgeLock: false,
    TutorialJudgeLock: false,
    TempJudgeLock: false,
    JudgeReg: function (id) {
        if (WebsocketController.WebsocketLink.readyState === 1) {
            WebsocketController.WebsocketSwitch.Judge = true;
            WebsocketController.WebsocketSwitch.JudgeFinished = true;
            WebsocketController.WebsocketLink.send(JSON.stringify({ Id: id, Type: WebsocketController.WebsocketEnum.Judge, }));
            Scope.refreshData();
        } else {
            WebsocketController.RegQueue.push({ fn: WebsocketController.JudgeReg, param1: id });
            WebsocketController.Init();
        }
    },
    ContestJudgeReg: function (id) {
        if (WebsocketController.WebsocketLink.readyState === 1) {
            WebsocketController.WebsocketSwitch.ContestJudge = true;
            WebsocketController.WebsocketSwitch.ContestJudgeFinished = true;
            WebsocketController.WebsocketLink.send(JSON.stringify({ Id: id, Type: WebsocketController.WebsocketEnum.ContestJudge, }));
            Scope.refreshData();
        } else {
            WebsocketController.RegQueue.push({ fn: WebsocketController.ContestJudgeReg, param1: id });
            WebsocketController.Init();
        }
    },
    CourseJudgeReg: function (id) {
        if (WebsocketController.WebsocketLink.readyState === 1) {
            WebsocketController.WebsocketSwitch.CourseJudge = true;
            WebsocketController.WebsocketSwitch.CourseJudgeFinished = true;
            WebsocketController.WebsocketLink.send(JSON.stringify({ Id: id, Type: WebsocketController.WebsocketEnum.CourseJudge, }));
            Scope.refreshData();
        } else {
            WebsocketController.RegQueue.push({ fn: WebsocketController.CourseJudgeReg, param1: id });
            WebsocketController.Init();
        }
    },
    TrainingJudgeReg: function (id) {
        if (WebsocketController.WebsocketLink.readyState === 1) {
            WebsocketController.WebsocketSwitch.TrainingJudge = true;
            WebsocketController.WebsocketSwitch.TrainingJudgeFinished = true;
            WebsocketController.WebsocketLink.send(JSON.stringify({ Id: id, Type: WebsocketController.WebsocketEnum.TrainingJudge, }));
            Scope.refreshData();
        } else {
            WebsocketController.RegQueue.push({ fn: WebsocketController.TrainingJudgeReg, param1: id });
            WebsocketController.Init();
        }
    },
    TutorialJudgeReg: function (id) {
        if (WebsocketController.WebsocketLink.readyState === 1) {
            WebsocketController.WebsocketSwitch.TutorialJudge = true;
            WebsocketController.WebsocketSwitch.TutorialJudgeFinished = true;
            WebsocketController.WebsocketLink.send(JSON.stringify({ Id: id, Type: WebsocketController.WebsocketEnum.TutorialJudge, }));
            Scope.refreshData();
        } else {
            WebsocketController.RegQueue.push({ fn: WebsocketController.TutorialJudgeReg, param1: id });
            WebsocketController.Init();
        }
    },
    TempJudgeReg: function (id) {
        if (WebsocketController.WebsocketLink.readyState === 1) {
            WebsocketController.WebsocketSwitch.TempJudge = true;
            WebsocketController.WebsocketSwitch.TempJudgeFinished = true;
            WebsocketController.WebsocketLink.send(JSON.stringify({ Id: id, Type: WebsocketController.WebsocketEnum.TempJudge, }));
            Scope.refreshData();
        } else {
            WebsocketController.RegQueue.push({ fn: WebsocketController.TempJudgeReg, param1: id });
            WebsocketController.Init();
        }
    },

    RegQueue: [],
    Init: function () {
        WebsocketController.StartWebsocket();

        WebsocketController.WebsocketLink.onopen = function () {
            console.log('WebSocket连接成功!');

            WebsocketController.StatReg();
            WebsocketController.UserStatReg();
            WebsocketController.UserCookieReg();

            while (WebsocketController.RegQueue.length) { var reg = WebsocketController.RegQueue.pop(); reg.fn(reg.param1); }

            if (WebsocketController.OnopenHook) {
                WebsocketController.OnopenHook();
                Scope.$apply();
            }
        }
        WebsocketController.WebsocketLink.onmessage = function (evt) {
            var data = JSON.parse(evt.data);
            console.log('WebSocket接收消息! 消息种类:' + data.Type);

            if (data.Type === WebsocketController.WebsocketEnum.Stat) {
                if (WebsocketController.WebsocketSwitch.Stat) {
                    var url = "/WebSocket/GetStat";
                    $.get(url, {}, function (data, status) {
                        if (status === 'success') {
                            Scope.$apply(function () {
                                Scope.Stat = data;
                            });
                        }
                    });
                }
                else
                    WebsocketController.UnRegister(data.Id, data.Type);
            }
            else if (data.Type === WebsocketController.WebsocketEnum.UserStat) {
                if (WebsocketController.WebsocketSwitch.UserStat) {
                    var url = "/WebSocket/GetUserStat";
                    $.get(url, {}, function (data, status) {
                        if (status === 'success') {
                            Scope.$apply(function () {
                                Scope.CurrentUserStat = data;
                            });
                        }
                    });
                }
                else
                    WebsocketController.UnRegister(data.Id, data.Type);
            }
            else if (data.Type === WebsocketController.WebsocketEnum.LiveMessage) {
                if (WebsocketController.WebsocketSwitch.LiveMessage) {
                    var url = "/WebSocket/GetLiveMessage";
                    var maxLiveMessageId = Scope.LiveMessages[0] ? Scope.LiveMessages[0].Id : 0;
                    $.get(url, { 'liveId': data.Id, 'maxIndex': maxLiveMessageId }, function (data, status) {
                        if (status === 'success' && data.length > 0) {
                            Scope.$apply(function () { Tools.ArrayConcat(Scope.LiveMessages, data, 'Id', true); });

                            if (WebsocketController.WebsocketSwitch.LiveMessageScrlToBom)
                                document.getElementById('LiveMessageListDom').scrollTop = document.getElementById('LiveMessageListDom').scrollHeight;
                        }
                    });
                }
                else
                    WebsocketController.UnRegister(data.Id, data.Type);
            }
            else if (data.Type === WebsocketController.WebsocketEnum.ContestRank) {
                if (WebsocketController.WebsocketSwitch.ContestRank) {
                    Scope.refreshData();
                }
                else
                    WebsocketController.UnRegister(data.Id, data.Type);
            }
            else if (data.Type === WebsocketController.WebsocketEnum.Judge) {
                if (WebsocketController.WebsocketSwitch.Judge) {
                    var url = "/WebSocket/GetJudge";
                    Scope.JudgeDetail.TestDetail = !Scope.JudgeDetail.TestDetail ? [] : Scope.JudgeDetail.TestDetail;
                    if (!WebsocketController.JudgeLock) {
                        WebsocketController.JudgeLock = true;
                        $.get(url, { 'judgeId': data.Id, 'index': Scope.JudgeDetail.TestDetail.length }, function (data, status) {
                            if (status === 'success' && data.length > 0) {
                                Scope.$apply(function () {
                                    Tools.ArrayConcat(Scope.JudgeDetail.TestDetail, data, 'TestId');
                                });
                            }
                            WebsocketController.JudgeLock = false;
                        });
                    }
                }
                else
                    WebsocketController.UnRegister(data.Id, data.Type);
            }
            else if (data.Type === WebsocketController.WebsocketEnum.JudgeFinished) {
                if (WebsocketController.WebsocketSwitch.JudgeFinished) {
                    var url = "/WebSocket/GetJudgeValue";
                    $.get(url, { 'judgeId': data.Id }, function (data, status) {
                        if (status === 'success') {
                            Scope.$apply(function () {
                                Scope.JudgeView.Judge = data;
                                Scope.JudgeView.UserView.IsAccepted = data.JudgeValue === NodEnum.JudgeValue.Accepted.Index;
                                Scope.JudgeView.UserView.CompileError = data.CompileMessage;
                                Scope.ProblemView.UserView.SubmitCount = Scope.ProblemView.UserView.SubmitCount + 1;
                                Scope.ProblemView.UserView.IsAccepted = data.JudgeValue === NodEnum.JudgeValue.Accepted.Index ? true : Scope.ProblemView.UserView.IsAccepted;
                                Scope.Running = false;
                            });

                            if (WebsocketController.JudgeFinishedHook) WebsocketController.JudgeFinishedHook();
                            if (Ladda) Ladda.stopAll();

                            Scope.JudgeDetail.TestDetail = !Scope.JudgeDetail.TestDetail ? [] : Scope.JudgeDetail.TestDetail;
                            if (Scope.JudgeDetail.TestDetail.length < Scope.ProblemView.Problem.TestCount) {
                                url = "/WebSocket/GetJudge";
                                $.get(url, { 'judgeId': data.Id, 'index': Scope.JudgeDetail.TestDetail.length }, function (data, status) {
                                    if (status === 'success' && data.length > 0) {
                                        Scope.$apply(function () {
                                            Tools.ArrayConcat(Scope.JudgeDetail.TestDetail, data, 'TestId');
                                            Tools.InitTestCanDown(Scope.JudgeDetail.TestDetail, true);
                                        });
                                    }
                                });
                            } else { Scope.$apply(function () { Tools.InitTestCanDown(Scope.JudgeDetail.TestDetail, true); }); }
                        }
                    });
                }
                else
                    WebsocketController.UnRegister(data.Id, data.Type);
            }
            else if (data.Type === WebsocketController.WebsocketEnum.ContestJudge) {
                if (WebsocketController.WebsocketSwitch.ContestJudge) {
                    var url = "/WebSocket/GetContestJudge";
                    Scope.ContestJudgeDetail.TestDetail = !Scope.ContestJudgeDetail.TestDetail ? [] : Scope.ContestJudgeDetail.TestDetail;
                    if (!WebsocketController.ContestJudgeLock) {
                        WebsocketController.ContestJudgeLock = true;
                        $.get(url, { 'judgeId': data.Id, 'index': Scope.ContestJudgeDetail.TestDetail.length }, function (data, status) {
                            if (status === 'success' && data.length > 0) {
                                Scope.$apply(function () {
                                    Tools.ArrayConcat(Scope.ContestJudgeDetail.TestDetail, data, 'TestId');
                                });
                            }
                            WebsocketController.ContestJudgeLock = false;
                        });
                    }
                }
                else
                    WebsocketController.UnRegister(data.Id, data.Type);
            }
            else if (data.Type === WebsocketController.WebsocketEnum.ContestJudgeFinished) {
                if (WebsocketController.WebsocketSwitch.ContestJudgeFinished) {
                    var url = "/WebSocket/GetContestJudgeValue";
                    $.get(url, { 'judgeId': data.Id }, function (data, status) {
                        if (status === 'success') {
                            Scope.$apply(function () {
                                Scope.ContestJudgeView.Judge = data;
                                Scope.ContestJudgeView.UserView.IsAccepted = data.JudgeValue === NodEnum.JudgeValue.Accepted.Index;
                                Scope.ContestJudgeView.UserView.CompileError = data.CompileMessage;
                                Scope.ContestProblemView.UserView.SubmitCount = Scope.ContestProblemView.UserView.SubmitCount + 1;
                                Scope.ContestProblemView.UserView.IsAccepted = data.JudgeValue === NodEnum.JudgeValue.Accepted.Index ? true : Scope.ContestProblemView.UserView.IsAccepted;
                                Scope.Running = false;
                            });

                            Scope.ContestJudgeDetail.TestDetail = !Scope.ContestJudgeDetail.TestDetail ? [] : Scope.ContestJudgeDetail.TestDetail;
                            if (Scope.ContestJudgeDetail.TestDetail.length < Scope.ContestProblemView.Problem.TestCount) {
                                url = "/WebSocket/GetContestJudge";
                                $.get(url, { 'judgeId': data.Id, 'index': Scope.ContestJudgeDetail.TestDetail.length }, function (data, status) {
                                    if (status === 'success' && data.length > 0) {
                                        Scope.$apply(function () {
                                            Tools.ArrayConcat(Scope.ContestJudgeDetail.TestDetail, data, 'TestId');
                                        });
                                    }
                                });
                            }
                        }
                    });
                }
                else
                    WebsocketController.UnRegister(data.Id, data.Type);
            }
            else if (data.Type === WebsocketController.WebsocketEnum.CourseJudge) {
                if (WebsocketController.WebsocketSwitch.CourseJudge) {
                    var url = "/WebSocket/GetCourseJudge";
                    Scope.CourseJudgeDetail.TestDetail = !Scope.CourseJudgeDetail.TestDetail ? [] : Scope.CourseJudgeDetail.TestDetail;
                    if (!WebsocketController.CourseJudgeLock) {
                        WebsocketController.CourseJudgeLock = true;
                        $.get(url, { 'judgeId': data.Id, 'index': Scope.CourseJudgeDetail.TestDetail.length }, function (data, status) {
                            if (status === 'success' && data.length > 0) {
                                Scope.$apply(function () {
                                    Tools.ArrayConcat(Scope.CourseJudgeDetail.TestDetail, data, 'TestId');
                                });
                            }
                            WebsocketController.CourseJudgeLock = false;
                        });
                    }
                }
                else
                    WebsocketController.UnRegister(data.Id, data.Type);
            }
            else if (data.Type === WebsocketController.WebsocketEnum.CourseJudgeFinished) {
                if (WebsocketController.WebsocketSwitch.CourseJudgeFinished) {
                    var url = "/WebSocket/GetCourseJudgeValue";
                    $.get(url, { 'judgeId': data.Id }, function (data, status) {
                        if (status === 'success') {
                            Scope.$apply(function () {
                                Scope.CourseJudgeView.Judge = data.Judge;
                                Scope.CourseProblemUserRank = data.CourseProblemUserRank;
                                Scope.CourseJudgeView.UserView.IsAccepted = data.Judge.JudgeValue === NodEnum.JudgeValue.Accepted.Index;
                                Scope.CourseJudgeView.UserView.CompileError = data.Judge.CompileMessage;
                                Scope.CourseProblemView.UserView.SubmitCount = Scope.CourseProblemView.UserView.SubmitCount + 1;
                                Scope.CourseProblemView.UserView.IsAccepted = data.Judge.JudgeValue === NodEnum.JudgeValue.Accepted.Index ? true : Scope.CourseProblemView.UserView.IsAccepted;
                                Scope.Running = false;
                            });
                            
                            if (WebsocketController.CourseJudgeFinishedHook) WebsocketController.CourseJudgeFinishedHook();
                            Scope.CourseJudgeDetail.TestDetail = !Scope.CourseJudgeDetail.TestDetail ? [] : Scope.CourseJudgeDetail.TestDetail;
                            if (Scope.CourseJudgeDetail.TestDetail.length < Scope.CourseProblemView.Problem.TestCount) {
                                url = "/WebSocket/GetCourseJudge";
                                $.get(url, { 'judgeId': data.Id, 'index': Scope.CourseJudgeDetail.TestDetail.length }, function (data, status) {
                                    if (status === 'success' && data.length > 0) {
                                        Scope.$apply(function () {
                                            Tools.ArrayConcat(Scope.CourseJudgeDetail.TestDetail, data, 'TestId');
                                            Tools.InitTestCanDown(Scope.CourseJudgeDetail.TestDetail, true);
                                        });
                                    }
                                });
                            } else
                                Scope.$apply(function () { Tools.InitTestCanDown(Scope.CourseJudgeDetail.TestDetail, true); });
                        }
                    });
                }
                else
                    WebsocketController.UnRegister(data.Id, data.Type);
            }
            else if (data.Type === WebsocketController.WebsocketEnum.TrainingJudge) {
                if (WebsocketController.WebsocketSwitch.TrainingJudge) {
                    var url = "/WebSocket/GetTrainingJudge";
                    Scope.TrainingJudgeDetail.TestDetail = !Scope.TrainingJudgeDetail.TestDetail ? [] : Scope.TrainingJudgeDetail.TestDetail;
                    if (!WebsocketController.TrainingJudgeLock) {
                        WebsocketController.TrainingJudgeLock = true;
                        $.get(url, { 'judgeId': data.Id, 'index': Scope.TrainingJudgeDetail.TestDetail.length }, function (data, status) {
                            if (status === 'success' && data.length > 0) {
                                Scope.$apply(function () {
                                    Tools.ArrayConcat(Scope.TrainingJudgeDetail.TestDetail, data, 'TestId');
                                });
                            }
                            WebsocketController.TrainingJudgeLock = false;
                        });
                    }
                }
                else
                    WebsocketController.UnRegister(data.Id, data.Type);
            }
            else if (data.Type === WebsocketController.WebsocketEnum.TrainingJudgeFinished) {
                if (WebsocketController.WebsocketSwitch.TrainingJudgeFinished) {
                    var url = "/WebSocket/GetTrainingJudgeValue";
                    $.get(url, { 'judgeId': data.Id }, function (data, status) {
                        if (status === 'success') {
                            Scope.$apply(function () {
                                Scope.TrainingJudgeView.Judge = data;
                                Scope.TrainingJudgeView.UserView.IsAccepted = data.JudgeValue === NodEnum.JudgeValue.Accepted.Index;
                                Scope.TrainingJudgeView.UserView.CompileError = data.CompileMessage;
                                Scope.ProblemView.UserView.SubmitCount = Scope.ProblemView.UserView.SubmitCount + 1;
                                Scope.ProblemView.UserView.IsAccepted = data.JudgeValue === NodEnum.JudgeValue.Accepted.Index ? true : Scope.ProblemView.UserView.IsAccepted;
                                Scope.Running = false;
                            });

                            Scope.TrainingJudgeDetail.TestDetail = !Scope.TrainingJudgeDetail.TestDetail ? [] : Scope.TrainingJudgeDetail.TestDetail;
                            if (Scope.TrainingJudgeDetail.TestDetail.length < Scope.ProblemView.Problem.TestCount) {
                                url = "/WebSocket/GetTrainingJudge";
                                $.get(url, { 'judgeId': data.Id, 'index': Scope.TrainingJudgeDetail.TestDetail.length }, function (data, status) {
                                    if (status === 'success' && data.length > 0) {
                                        Scope.$apply(function () {
                                            Tools.ArrayConcat(Scope.TrainingJudgeDetail.TestDetail, data, 'TestId');
                                        });
                                    }
                                });
                            }
                        }
                    });
                }
                else
                    WebsocketController.UnRegister(data.Id, data.Type);
            }
            else if (data.Type === WebsocketController.WebsocketEnum.TutorialJudge) {
                if (WebsocketController.WebsocketSwitch.TutorialJudge) {
                    var url = "/WebSocket/GetTutorialJudge";
                    Scope.TutorialJudgeDetail.TestDetail = !Scope.TutorialJudgeDetail.TestDetail ? [] : Scope.TutorialJudgeDetail.TestDetail;
                    if (!WebsocketController.TutorialJudgeLock) {
                        WebsocketController.TutorialJudgeLock = true;
                        $.get(url, { 'judgeId': data.Id, 'index': Scope.TutorialJudgeDetail.TestDetail.length }, function (data, status) {
                            if (status === 'success' && data.length) Scope.$apply(function () { Tools.ArrayConcat(Scope.TutorialJudgeDetail.TestDetail, data, 'TestId'); });
                            WebsocketController.TutorialJudgeLock = false;
                        });
                    }
                }
                else
                    WebsocketController.UnRegister(data.Id, data.Type);
            }
            else if (data.Type === WebsocketController.WebsocketEnum.TutorialJudgeFinished) {
                if (WebsocketController.WebsocketSwitch.TutorialJudgeFinished) {
                    var url = "/WebSocket/GetTutorialJudgeValue";
                    $.get(url, { 'judgeId': data.Id }, function (data, status) {
                        if (status === 'success') {
                            Scope.$apply(function () { Scope.TutorialJudgeView.Judge = data; Scope.Running = false; WebsocketController.TutorialJudgeLock = false; });
                            
                            if (WebsocketController.TutorialJudgeFinishedHook) WebsocketController.TutorialJudgeFinishedHook();
                            Ladda.stopAll();
                            Scope.TutorialJudgeDetail.TestDetail = !Scope.TutorialJudgeDetail.TestDetail ? [] : Scope.TutorialJudgeDetail.TestDetail;
                            if (Scope.TutorialJudgeDetail.TestDetail.length < Scope.TutorialJudgeView.Problem.TestCount) {
                                url = "/WebSocket/GetTutorialJudge";
                                $.get(url, { 'judgeId': data.Id, 'index': Scope.TutorialJudgeDetail.TestDetail.length }, function (data, status) {
                                    if (status === 'success' && data.length) {
                                        Scope.$apply(function () {
                                            Tools.ArrayConcat(Scope.TutorialJudgeDetail.TestDetail, data, 'TestId');
                                            Tools.InitTestCanDown(Scope.TutorialJudgeDetail.TestDetail, true);
                                        });
                                    }
                                });
                            } else
                                Scope.$apply(function () { Tools.InitTestCanDown(Scope.TutorialJudgeDetail.TestDetail, true); });
                        }
                    });
                }
                else
                    WebsocketController.UnRegister(data.Id, data.Type);
            }
            else if (data.Type === WebsocketController.WebsocketEnum.TempJudge) {
                if (WebsocketController.WebsocketSwitch.TempJudge) {
                    if (!Scope.TempJudgeOne) {
                        var url = "/WebSocket/GetTempJudge";
                        Scope.TempJudges = !Scope.TempJudges ? [] : Scope.TempJudges;
                        if (!WebsocketController.TempJudgeLock) {
                            WebsocketController.TempJudgeLock = true;
                            $.get(url, { 'judgeId': data.Id, 'index': Scope.TempJudges.length }, function (data, status) {
                                if (status === 'success' && data.length > 0) {
                                    Scope.$apply(function () { Tools.ArrayConcat(Scope.TempJudges, data, 'TestId'); });
                                }
                                WebsocketController.TempJudgeLock = false;
                            });
                        }
                    }

                    Scope.$apply(function () { Scope.TempJudgeShow = true; });
                }
                else
                    WebsocketController.UnRegister(data.Id, data.Type);
            }
            else if (data.Type === WebsocketController.WebsocketEnum.TempJudgeFinished) {
                if (WebsocketController.WebsocketSwitch.TempJudgeFinished) {
                    var url = "/WebSocket/GetTempJudgeValue";
                    $.get(url, { 'judgeId': data.Id }, function (data, status) {
                        if (status === 'success')
                            Scope.$apply(function () { Scope.TempJudgeView = data; Scope.TempJudges = data.Items; });

                        if (WebsocketController.TempJudgeFinishedHook) WebsocketController.TempJudgeFinishedHook();

                        Ladda.stopAll();
                        Scope.$apply(function () {
                            WebsocketController.TempJudgeLock = false;
                            Scope.TempJudgeShow = true;
                            Scope.Running = false;
                        });
                    });
                }
                else
                    WebsocketController.UnRegister(data.Id, data.Type);
            }
            else if (data.Type === WebsocketController.WebsocketEnum.UserCookie) {
                if (WebsocketController.WebsocketSwitch.UserCookie)
                    WebsocketController.GetUserCookie();
                else
                    WebsocketController.UnRegister(data.Id, data.Type);
            }
            else if (data.Type === WebsocketController.WebsocketEnum.RunReportFinished) {
                if (WebsocketController.WebsocketSwitch.RunReportFinished) {
                    var url = "/WebSocket/GetRunReportValue";
                    $.get(url, { 'reportId': data.Id }, function (data, status) {
                        if (status === 'success')
                            Scope.$apply(function () {
                                Scope.RunReport = data;
                                Scope.RunReportShow = true;
                                Scope.Running = false;
                            });

                        Ladda.stopAll();
                    });
                }
                else
                    WebsocketController.UnRegister(data.Id, data.Type);
            }
            else if (data.Type === WebsocketController.WebsocketEnum.PayOrder) {
                if (WebsocketController.WebsocketSwitch.PayOrder) {
                    if (WebsocketController.PayOrderHook)
                        WebsocketController.PayOrderHook();
                }
                else
                    WebsocketController.UnRegister(data.Id, data.Type);
            }
        }
        WebsocketController.WebsocketLink.onerror = function (evt) {
            console.log('WebSocket出错：' + JSON.stringify(evt));
        }
        WebsocketController.WebsocketLink.onclose = function () {
            console.log('WebSocket已经关闭!');
            //Tools.ToastrError('WebSocket关闭', '因为一些原因，WebSocket链接关闭，请尝试稍后刷新网页。');
            if (WebsocketController.OncloseHook) {
                WebsocketController.OncloseHook();
                Scope.$apply();
            }
        }
    },
    StartWebsocket: function () {
        Scope.TempJudgeOne = false;
        Scope.TempJudgeShow = false;
        if (window.location.protocol.substring(0, window.location.protocol.indexOf(':')).toLocaleLowerCase() === 'http')
            WebsocketController.WebsocketLink = new WebSocket('ws://www.' + document.domain + '/Socket/Link.ashx');
        else
            WebsocketController.WebsocketLink = new WebSocket('wss://www.' + document.domain + '/Socket/Link.ashx');

        //WebsocketController.WebsocketLink = new WebSocket('ws://localhost:55126/Socket/Link.ashx');

        console.log('WebSocket正在连接...');
    },
    KeepWebsocket: function () {
        if (WebsocketController.WebsocketLink.readyState !== 1) WebsocketController.Init();
    },
    StatReg: function () {
        if (WebsocketController.WebsocketLink.readyState === 1) {
            WebsocketController.WebsocketSwitch.Stat = true;
            WebsocketController.WebsocketLink.send(JSON.stringify({ Type: WebsocketController.WebsocketEnum.Stat }));
        } else {
            WebsocketController.RegQueue.push({ fn: WebsocketController.StatReg, param1: id });
            WebsocketController.Init();
        }
    },
    UserStatReg: function () {
        if (WebsocketController.WebsocketLink.readyState === 1) {
            WebsocketController.WebsocketSwitch.UserStat = true;
            WebsocketController.WebsocketLink.send(JSON.stringify({ Type: WebsocketController.WebsocketEnum.UserStat }));
        } else {
            WebsocketController.RegQueue.push({ fn: WebsocketController.UserStatReg, param1: id });
            WebsocketController.Init();
        }
    },
    LiveMessageReg: function (id) {
        if (WebsocketController.WebsocketLink.readyState === 1) {
            WebsocketController.WebsocketSwitch.LiveMessage = true;
            WebsocketController.WebsocketSwitch.LiveMessageScrlToBom = true;
            WebsocketController.WebsocketLink.send(JSON.stringify({ Id: id, Type: WebsocketController.WebsocketEnum.LiveMessage, }));
        } else {
            WebsocketController.RegQueue.push({ fn: WebsocketController.LiveMessageReg, param1: id });
            WebsocketController.Init();
        }
    },
    ContestRankReg: function (id) {
        if (WebsocketController.WebsocketLink.readyState === 1) {
            WebsocketController.WebsocketSwitch.ContestRank = true;
            WebsocketController.WebsocketLink.send(JSON.stringify({ Id: id, Type: WebsocketController.WebsocketEnum.ContestRank, }));
        } else {
            WebsocketController.RegQueue.push({ fn: WebsocketController.ContestRankReg, param1: id });
            WebsocketController.Init();
        }
    },
    TempJudgeReg: function (id) {
        if (WebsocketController.WebsocketLink.readyState === 1) {
            WebsocketController.WebsocketSwitch.TempJudge = true;
            WebsocketController.WebsocketSwitch.TempJudgeFinished = true;
            WebsocketController.WebsocketLink.send(JSON.stringify({ Id: id, Type: WebsocketController.WebsocketEnum.TempJudge, }));

            var url = "/WebSocket/GetTempJudgeValue";
            $.get(url, { 'judgeId': id }, function (data, status) {
                if (status === 'success') {
                    Scope.$apply(function () { Scope.TempJudgeView = data; Scope.TempJudges = data.Items; });

                    if (Scope.TempJudgeView.JudgeValue !== NodEnum.JudgeValue.Processing.Index) {
                        if (WebsocketController.TempJudgeFinishedHook) WebsocketController.TempJudgeFinishedHook();
                        Ladda.stopAll();
                        Scope.$apply(function () {
                            WebsocketController.TempJudgeLock = false;
                            Scope.TempJudgeShow = true;
                            Scope.Running = false;
                        });
                    }
                }
            });
        } else {
            WebsocketController.RegQueue.push({ fn: WebsocketController.TempJudgeReg, param1: id });
            WebsocketController.Init();
        }
    },
    UserCookieReg: function () {
        if (WebsocketController.WebsocketLink.readyState === 1) {
            WebsocketController.WebsocketSwitch.UserCookie = true;
            WebsocketController.WebsocketLink.send(JSON.stringify({ Type: WebsocketController.WebsocketEnum.UserCookie }));
        } else {
            WebsocketController.RegQueue.push({ fn: WebsocketController.UserCookieReg, param1: id });
            WebsocketController.Init();
        }
    },
    RunReportFinishedReg: function (id) {
        if (WebsocketController.WebsocketLink.readyState === 1) {
            WebsocketController.WebsocketSwitch.RunReportFinished = true;
            WebsocketController.WebsocketLink.send(JSON.stringify({ Id: id, Type: WebsocketController.WebsocketEnum.RunReportFinished, }));

            Scope.RunReport = Scope.RunReport ? Scope.RunReport : {};

            var url = "/WebSocket/GetRunReportValue";
            $.get(url, { 'reportId': id }, function (data, status) {
                if (status === 'success' && Scope.RunReport.IsFinished) {
                    Ladda.stopAll();
                    Scope.$apply(function () {
                        Scope.RunReport = data;
                        Scope.RunReportShow = true;
                        Scope.Running = false;
                    });
                }
            });
        } else {
            WebsocketController.RegQueue.push({ fn: WebsocketController.RunReportFinishedReg, param1: id });
            WebsocketController.Init();
        }
    },
    PayOrderReg: function () {
        if (WebsocketController.WebsocketLink.readyState === 1) {
            WebsocketController.WebsocketSwitch.PayOrder = true;
            WebsocketController.WebsocketLink.send(JSON.stringify({ Type: WebsocketController.WebsocketEnum.PayOrder, }));
        } else {
            WebsocketController.RegQueue.push({ fn: WebsocketController.PayOrderReg, param1: id });
            WebsocketController.Init();
        }
    },
    GetUserCookie: function () {
        var url = "/WebSocket/GetUserCookie";
        $.get(url, {}, function (data, status) {
            if (status === 'success')
                console.log('用户Cookie更新成功。');
        });
    },
    UnRegister: function (id, type) {
        var url = "/WebSocket/UnRegister";
        $.post(url, { 'Id': id, 'Type': type, });
    },
}


