var NodPostTool = {
    OpSucceed: function (data) {
        if (data === true || data == NodEnum.ReturnValue.Success.Index || data == 'true' || data > 0)
            return true;

        return false;
    },
    ErrorPrompt: function (data, str) {
        if (data < 0) return NodEnum.ReturnValue[data] ? NodEnum.ReturnValue[data].Display + "，请稍后重试。" : "未定义错误，请稍后重试。";

        return str + "失败，请稍后重试。";
    },
}
var NodPost = {
    Account: {
        AdminAppend: function (Amount, Ids) {
            var url = "/AccountWriter/AdminAppend";
            $.post(url, {
                'Idata': Amount,
                'Ids': Ids,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('调整人民币', '调整人民币成功。', true);
                }
                else {
                    Tools.ToastrError('调整人民币', '调整人民币失败，请稍后重试。');
                }
            });
        },
        AccountToNodAccount: function (BillType) {
            if (sEmpty(BillType)) {
                Tools.ToastrError('购买点头盾', '订单种类不可为空。');
                return;
            }
            var url = "/AccountWriter/AccountToNodAccount";
            $.get(url, {
                'billType': BillType,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('购买点头盾', '购买点头盾成功。', true);
                }
                else {
                    Tools.ToastrError('购买点头盾', NodPostTool.ErrorPrompt(data, '购买点头盾'));
                }
            });
        },
    },
    NodAccount: {
        AdminAppend: function (Amount, Ids) {
            var url = "/NodAccountWriter/AdminAppend";
            $.post(url, {
                'Idata': Amount,
                'Ids': Ids,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('调整点头盾', '调整点头盾成功。', true);
                }
                else {
                    Tools.ToastrError('调整点头盾', '调整点头盾失败，请稍后重试。');
                }
            });
        },
    },
    Answer: {
        Append: function (QuestionId, Answer) {
            var url = "/AnswerWriter/Save";
            $.post(url, {
                'QuestionId': QuestionId,
                'Content': Tools['CreateAnswerCKEditor'].getData(),
                'Anonymous': Answer.Anonymous
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('添加回答', '添加回答成功。', true, true);
                }
                else {
                    Tools.ToastrError('添加回答', NodPostTool.ErrorPrompt(data, '添加回答'));
                }
            });
        },
        SaveDraft: function (AnswerDraft) {
            var url = "/AnswerWriter/SaveDraft";
            $.post(url, {
                'QuestionId': AnswerDraft.QuestionId,
                'Content': Tools['CreateAnswerCKEditor'].getData(),
                'Anonymous': AnswerDraft.Anonymous
            });
        },
        Rework: function (Answer) {
            var url = "/AnswerWriter/Save";
            $.post(url, {
                'Id': Answer.Id,
                'Content': Tools['AnswerEditCKEditor'].getData(),
                'Anonymous': Answer.Anonymous,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('修改回答', '修改回答成功。', true, true);
                }
                else {
                    Tools.ToastrError('修改回答', NodPostTool.ErrorPrompt(data, '修改回答'));
                }
            });
        },
        SetDelete: function (Id, IsDelete) {
            var url = "/AnswerWriter/SetDelete";
            $.post(url, {
                'Id': Id,
                'IsDelete': IsDelete
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('设置回答', '设置回答成功。', true);
                }
                else {
                    Tools.ToastrError('设置回答', NodPostTool.ErrorPrompt(data, '设置回答'));
                }
            });
        },
    },
    AnswerReward: {
        Append: function (Amount) {
            var url = "/AnswerRewardWriter/Append";
            $.post(url, {
                'LinkId': NodPost.RewardView.Answer.Id,
                'Amount': Amount
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    //Getter.RemoteGet(NodPost.RewardView);
                    //Getter.RemoteGet(Scope.UserRealTime);
                    Tools.ToastrSuccess('赞赏回答', '赞赏回答成功。', true);
                }
                else {
                    Tools.ToastrError('赞赏回答', NodPostTool.ErrorPrompt(data, '赞赏回答'));
                }
            });
        },
    },
    Agent: {
        Append: function (Agent) {
            var url = "/AgentWriter/Append";
            $.post(url, {
                'Tags': Agent.Tags,
                'Title': Agent.Title,
                'Content': Tools['AgentContentCKEditor'].getData(),
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.SweetAlertRedirect("创建机构", '创建机构成功。', "success", Path.Path.Agent.AgentEdit(data));
                }
                else {
                    Tools.SweetAlert('创建机构', NodPostTool.ErrorPrompt(data, '创建机构'), 'error');
                }
            });
        },
        Rework: function (Agent) {
            var url = "/AgentWriter/Rework";
            $.post(url, {
                'Id': Agent.Id,
                'Tags': Agent.Tags,
                'Title': Agent.Title,
                'Content': Tools['AgentContentCKEditor'].getData(),
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('修改机构', '修改机构成功。', true);
                }
                else {
                    Tools.SweetAlert('修改机构', NodPostTool.ErrorPrompt(data, '修改机构'), 'error');
                }
            });
        },
    },
    Blog: {
        Append: function (Blog) {
            var url = "/BlogWriter/Append";
            $.post(url, {
                'Title': Blog.Title,
                'Content': Tools['BlogCKEditor'].getData(),
                'SourceType': Blog.SourceType,
                'ShowType': 1
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    var url = "/BlogDraftWriter/Clear";
                    $.post(url, {
                        'Id': 0
                    });
                    Tools.SweetAlertRedirect("创建博文", '您的博文创建成功。您可以选择发布或者继续修改。', "success", Path.Path.Blog.BlogEdit(data));
                }
                else {
                    Tools.SweetAlert('创建博文', NodPostTool.ErrorPrompt(data, '创建博文'), 'error');
                }
            });
        },
        Rework: function (Blog, ShowType) {
            var url = "/BlogWriter/Rework";
            $.post(url, {
                'Id': Blog.Id,
                'Title': Blog.Title,
                'Content': Tools['BlogCKEditor'].getData(),
                'SourceType': Blog.SourceType,
                'ShowType': ShowType
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    if (Blog.ShowType != ShowType)
                        Tools.SweetAlertRedirect('发布博文', '您的博文发布成功。', 'success', Path.Path.Blog.Index(data));
                    else
                        Tools.ToastrSuccess('修改博文', '博文修改成功。', true);
                }
                else {
                    if (Blog.ShowType != ShowType)
                        Tools.SweetAlert('发布博文', NodPostTool.ErrorPrompt(data, '发布博文'), 'error');
                    else
                        Tools.SweetAlert('修改博文', NodPostTool.ErrorPrompt(data, '修改博文'), 'error');
                }
            });
        },
    },
    BlogDraft: {
        Save: function (BlogDraft) {
            var url = "/BlogDraftWriter/Save";
            $.post(url, {
                'Title': BlogDraft.Title,
                'Content': Tools['BlogCKEditor'].getData(),
                'SourceType': BlogDraft.SourceType
            });
        },
    },
    BlogReward: {
        Append: function (Amount) {
            var url = "/BlogRewardWriter/Append";
            $.post(url, {
                'LinkId': NodPost.RewardView.Blog.Id,
                'Amount': Amount
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    //Getter.RemoteGet(NodPost.RewardView);
                    //Getter.RemoteGet(Scope.UserRealTime);
                    Tools.ToastrSuccess('赞赏博客', '赞赏博客成功。', true);
                }
                else {
                    Tools.ToastrError('赞赏博客', NodPostTool.ErrorPrompt(data, '赞赏博客'));
                }
            });
        },
    },
    Bulletin: {
        Append: function (Bulletin) {
            var url = "/BulletinWriter/Append";
            $.post(url, {
                'Title': Bulletin.Title,
                'Content': Tools['BulletinContentCKEditor'].getData(),
                'SchoolId': Bulletin.SchoolId,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.SweetAlertRedirect("创建公告", '创建公告成功。', "success", Path.Path.Bulletin.BulletinEdit(data));
                }
                else {
                    Tools.SweetAlert('创建公告', NodPostTool.ErrorPrompt(data, '创建公告'), 'error');
                }
            });
        },
        Rework: function (Bulletin) {
            var url = "/BulletinWriter/Rework";
            $.post(url, {
                'Id': Bulletin.Id,
                'Title': Bulletin.Title,
                'Content': Tools['BulletinContentCKEditor'].getData(),
                'ShowType': Bulletin.ShowType,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('修改公告', '修改公告成功。', true);
                }
                else {
                    Tools.SweetAlert('修改公告', NodPostTool.ErrorPrompt(data, '修改公告'), 'error');
                }
            });
        },
    },
    Chapter: {
        Append: function (Chapter) {
            var url = "/ChapterWriter/Append";
            $.post(url, {
                'Tags': Chapter.Tags,
                'Title': Chapter.Title,
                'Price': parseFloat(Chapter.Price) * 100,
                'Level': Chapter.Level,
                'Content': Tools['ChapterContentCKEditor'].getData(),
                'VideoJson': Chapter.VideoJson,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.SweetAlertRedirect('创建章节', '创建章节成功。', 'success', Path.Path.Tutorial.ChapterEdit(data));
                }
                else {
                    Tools.ToastrError('创建章节', NodPostTool.ErrorPrompt(data, '创建章节'));
                }
            });
        },
        Rework: function (Chapter) {
            var url = "/ChapterWriter/Rework";
            $.post(url, {
                'Id': Chapter.Id,
                'Tags': Chapter.Tags,
                'Title': Chapter.Title,
                'Price': parseFloat(Chapter.Price) * 100,
                'Level': Chapter.Level,
                'Content': Tools['ChapterContentCKEditor'].getData(),
                'VideoJson': Chapter.VideoJson,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('修改章节', '修改章节成功。', true);
                }
                else {
                    Tools.ToastrError('修改章节', NodPostTool.ErrorPrompt(data, '修改章节'));
                }
            });
        },
    },
    ChapterUser: {
        Append: function (ChapterId) {
            var url = "/ChapterUserWriter/Append";
            $.post(url, {
                'ChapterId': ChapterId,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('购买章节', '购买章节成功。', true);
                }
                else {
                    Tools.ToastrError('购买章节', NodPostTool.ErrorPrompt(data, '购买章节'));
                }
            });
        },
        AdminAppend: function (ChapterId, UserId) {
            var url = "/ChapterUserWriter/AdminAppend";
            $.post(url, {
                'ChapterId': ChapterId,
                'UserId': UserId,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('添加学生', '添加学生成功。', true);
                }
                else {
                    Tools.ToastrError('添加学生', NodPostTool.ErrorPrompt(data, '添加学生'));
                }
            });
        },
        AdminAppendArray: function (ChapterId, UserIds) {
            var url = "/ChapterUserWriter/AdminAppendArray";
            $.post(url, {
                'Ids': UserIds,
                'Idata': ChapterId,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('批量添加学生', '批量添加学生成功' + data + '个。', true, true);
                }
                else {
                    Tools.ToastrError('批量添加学生', NodPostTool.ErrorPrompt(data, '批量添加学生'));
                }
            });
        },
        BatchAppend: function (TutorialId) {
            var url = "/ChapterUserWriter/BatchAppend";
            $.post(url, {
                'Id': TutorialId,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('打包购买课程', '打包购买课程章节成功' + data + '个。', true, true);
                }
                else {
                    Tools.ToastrError('打包购买课程', NodPostTool.ErrorPrompt(data, '打包购买课程'));
                }
            });
        },
    },
    ClassApply: {
        Append: function (ClassId, ClassApply) {
            var url = "/ClassApplyWriter/Append";
            $.post(url, {
                'ClassId': ClassId,
                'Content': ClassApply.Content,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('提交课程申请', '提交课程申请成功。', true);
                    //Tools.SweetAlertReload('提交课程申请', '提交课程申请成功。', 'success');
                }
                else {
                    Tools.ToastrError('提交课程申请', NodPostTool.ErrorPrompt(data, '提交课程申请'));
                    //Tools.SweetAlert('提交课程申请', NodPostTool.ErrorPrompt(data, '提交课程申请'), 'error');
                }
            });
        },
        Accepted: function (ClassApplyId) {
            var url = "/ClassApplyWriter/Accepted";
            $.post(url, {
                'Id': ClassApplyId,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('通过课程申请', '通过课程申请成功。', true);
                }
                else {
                    Tools.ToastrError('通过课程申请', NodPostTool.ErrorPrompt(data, '通过课程申请'));
                }
            });
        },
        AcceptedArray: function (ClassApplyIds) {
            var url = "/ClassApplyWriter/AcceptedArray";
            $.post(url, {
                'Ids': ClassApplyIds,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('批量通过课程申请', '批量通过课程申请成功' + data + '个。', true);
                }
                else {
                    Tools.ToastrError('批量通过课程申请', NodPostTool.ErrorPrompt(data, '批量通过课程申请'));
                }
            });
        },
        Refuse: function (ClassApplyId) {
            var url = "/ClassApplyWriter/Refuse";
            $.post(url, {
                'Id': ClassApplyId,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('拒绝课程申请', '拒绝课程申请成功。', true);
                }
                else {
                    Tools.ToastrError('拒绝课程申请', NodPostTool.ErrorPrompt(data, '拒绝课程申请'));
                }
            });
        },
        RefuseArray: function (ClassApplyIds) {
            var url = "/ClassApplyWriter/RefuseArray";
            $.post(url, {
                'Ids': ClassApplyIds,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('批量拒绝课程申请', '课程申请批量拒绝成功' + data + '个。', true);
                }
                else {
                    Tools.ToastrError('批量拒绝课程申请', NodPostTool.ErrorPrompt(data, '批量拒绝课程申请'));
                }
            });
        },
    },
    ClassContest: {
        Append: function (ClassId, ContestId) {
            var url = "/ClassContestWriter/Append";
            $.post(url, {
                'ClassId': ClassId,
                'ContestId': ContestId,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('添加比赛', '比赛添加成功。', true);
                }
                else {
                    Tools.ToastrError('添加比赛', NodPostTool.ErrorPrompt(data, '添加比赛'));
                }
            });
        },
        Delete: function (Ids) {
            var url = "/ClassContestWriter/Delete";
            if (typeof (Ids) === 'number') {
                $.post(url, {
                    'Id': Ids,
                }, function (data, status) {
                    if (NodPostTool.OpSucceed(data)) {
                        Tools.ToastrSuccess('删除比赛', '比赛删除成功。', true);
                    }
                    else {
                        Tools.ToastrError('删除比赛', NodPostTool.ErrorPrompt(data, '删除比赛'));
                    }
                });
            }
            else {
                var fail = 0, succeed = 0;
                for (var i in Ids) {
                    $.post(url, {
                        'Id': Ids[i],
                    }, function (data, status) {
                        if (NodPostTool.OpSucceed(data)) succeed++;
                        else fail++;
                        if (succeed + fail === Ids.length) {
                            if (fail === 0)
                                Tools.ToastrSuccess('批量删除比赛', '比赛批量删除成功。', true);
                            else
                                Tools.ToastrError('批量删除比赛', '比赛批量删除失败 ' + fail + '个，请稍后重试。', true);
                        }
                    });
                }
            }
        },
    },
    ClassCourse: {
        Save: function (ClassId, NewCourse) {
            var url = "/ClassCourseWriter/Save";
            $.post(url, {
                'ClassId': ClassId,
                'CourseId': NewCourse.Id,
                'SortId': NewCourse.SortId,
                'ClassTime': new Date(NewCourse.ClassTime).getTime(),
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('保存章节设置', '保存章节设置成功。', true);
                }
                else {
                    Tools.ToastrError('保存章节设置', NodPostTool.ErrorPrompt(data, '保存章节设置'));
                }
            });
        },
        CopyAppend: function (ClassId, TargetClass) {
            var url = "/ClassCourseWriter/Append";

            var fail = 0, succeed = 0;
            for (var i = 0; i < TargetClass.CourseIds.length; i++) {
                $.post(url, {
                    'ClassId': ClassId,
                    'CourseId': TargetClass.CourseIds[i],
                    'SortId': TargetClass.CourseSortIds[i],
                }, function (data, status) {
                    if (NodPostTool.OpSucceed(data)) succeed++;
                    else fail++;

                    if (succeed + fail === TargetClass.CourseIds.length) {
                        if (fail === 0)
                            Tools.ToastrSuccess('批量添加章节', '章节批量添加成功。', true, true);
                        else
                            Tools.ToastrError('批量添加章节', '章节批量添加失败 ' + fail + '个，请稍后重试。', true);
                    }
                });
            }
        },
        MoocCourseCopy: function (TargetClassId, CurrentClassId) {
            var url = "/ClassCourseWriter/CourseCopy?tarClassId=" + TargetClassId + "&curClassId=" + CurrentClassId + "&courseType=" + 1;
            $.post(url, {}, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('批量复制章节', '批量复制章节成功' + data + '个。', true, true);
                }
                else {
                    Tools.ToastrError('批量复制章节', NodPostTool.ErrorPrompt(data, '批量复制章节'));
                }
            });
        },
        LiveCourseCopy: function (TargetClassId, CurrentClassId) {
            var url = "/ClassCourseWriter/CourseCopy?tarClassId=" + TargetClassId + "&curClassId=" + CurrentClassId + "&courseType=" + 2;
            $.post(url, {}, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('批量复制章节', '批量复制章节成功' + data + '个。', true, true);
                }
                else {
                    Tools.ToastrError('批量复制章节', NodPostTool.ErrorPrompt(data, '批量复制章节'));
                }
            });
        },
        Delete: function (Ids) {
            var url = "/ClassCourseWriter/Delete";
            if (typeof (Ids) === 'number') {
                $.post(url, {
                    'Id': Ids,
                }, function (data, status) {
                    if (NodPostTool.OpSucceed(data)) {
                        Tools.ToastrSuccess('删除章节', '章节删除成功。', true);
                    }
                    else {
                        Tools.ToastrError('删除章节', NodPostTool.ErrorPrompt(data, '删除章节'));
                    }
                });
            }
            else {
                var fail = 0, succeed = 0;
                for (var i in Ids) {
                    $.post(url, {
                        'Id': Ids[i],
                    }, function (data, status) {
                        if (NodPostTool.OpSucceed(data)) succeed++;
                        else fail++;
                        if (succeed + fail === Ids.length) {
                            if (fail === 0)
                                Tools.ToastrSuccess('批量删除章节', '章节批量删除成功。', true);
                            else
                                Tools.ToastrError('批量删除章节', '章节批量删除失败 ' + fail + '个，请稍后重试。', true);
                        }
                    });
                }
            }
        },
    },
    ClassDetail: {
        Append: function (ClassDetail) {
            var url = "/ClassDetailWriter/Append";
            $.post(url, {
                'Title': ClassDetail.Title,
                'Json': ClassDetail.Json,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.SweetAlertRedirect('添加课程Detail', '添加课程Detail成功。', 'success', Path.Path.Tutorial.ClassDetailEdit(data));
                }
                else {
                    Tools.ToastrError('添加课程Detail', NodPostTool.ErrorPrompt(data, '添加课程Detail'));
                }
            });
        },
        Rework: function (ClassDetail) {
            var url = "/ClassDetailWriter/Rework";
            $.post(url, {
                'Id': ClassDetail.Id,
                'Title': ClassDetail.Title,
                'Json': ClassDetail.Json,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('修改课程Detail', '修改课程Detai成功。', true);
                }
                else {
                    Tools.ToastrError('修改课程Detai', NodPostTool.ErrorPrompt(data, '修改课程Detai'));
                }
            });
        },
    },
    ClassEnroll: {
        Append: function (ClassEnroll) {
            var url = "/ClassEnrollWriter/Append";
            $.post(url, {
                'ClassId': ClassEnroll.ClassId,
                'School': ClassEnroll.School,
                'RecommendUserId': ClassEnroll.RecommendUserId,
                'Province': ClassEnroll.Province,
                'Role': ClassEnroll.Role,
                'Json': ClassEnroll.Json,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('提交报名申请', '提交报名申请成功。', true);
                }
                else {
                    Tools.ToastrError('提交报名申请', NodPostTool.ErrorPrompt(data, '提交报名申请'));
                }
            });
        },
        Rework: function (ClassEnroll) {
            var url = "/ClassEnrollWriter/Rework";
            $.post(url, {
                'Id': ClassEnroll.Id,
                'ClassId': ClassEnroll.ClassId,
                'School': ClassEnroll.School,
                'RecommendUserId': ClassEnroll.RecommendUserId,
                'Province': ClassEnroll.Province,
                'Role': ClassEnroll.Role,
                'Json': ClassEnroll.Json,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('修改报名申请', '修改报名申请成功。', true);
                }
                else {
                    Tools.ToastrError('修改报名申请', NodPostTool.ErrorPrompt(data, '修改报名申请'));
                }
            });
        },
        Accepted: function (ClassEnrollId) {
            var url = "/ClassEnrollWriter/Accepted";
            $.post(url, {
                'Id': ClassEnrollId,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('通过报名申请', '通过报名申请成功。', true);
                }
                else {
                    Tools.ToastrError('通过报名申请', NodPostTool.ErrorPrompt(data, '通过报名申请'));
                }
            });
        },
        AutoAccepted: function (ClassId) {
            var url = "/ClassEnrollWriter/AutoAccepted";
            $.post(url, {
                'ClassId': ClassId,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('自动通过报名申请', '自动通过报名申请成功' + data + '个。', true);
                }
                else {
                    Tools.ToastrError('自动通过报名申请', NodPostTool.ErrorPrompt(data, '自动通过报名申请'));
                }
            });
        },
        AcceptedArray: function (ClassEnrollIds) {
            var url = "/ClassEnrollWriter/AcceptedArray";
            $.post(url, {
                'Ids': ClassEnrollIds,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('批量通过报名申请', '批量通过报名申请成功' + data + '个。', true);
                }
                else {
                    Tools.ToastrError('批量通过报名申请', NodPostTool.ErrorPrompt(data, '批量通过报名申请'));
                }
            });
        },
        RefuseSingle: function (ClassEnrollId, Reason) {
            var url = "/ClassEnrollWriter/RefuseSingle";
            $.post(url, {
                'Id': ClassEnrollId,
                'Content': Reason,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('拒绝报名申请', '拒绝报名申请成功。', true);
                }
                else {
                    Tools.ToastrError('拒绝报名申请', NodPostTool.ErrorPrompt(data, '拒绝报名申请'));
                }
            });
        },
        RefuseArray: function (ClassEnrollIds, Reason) {
            var url = "/ClassEnrollWriter/RefuseArray";
            $.post(url, {
                'Ids': ClassEnrollIds,
                'Content': Reason,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('批量拒绝报名申请', '报名申请批量拒绝成功' + data + '个。', true);
                }
                else {
                    Tools.ToastrError('批量拒绝报名申请', NodPostTool.ErrorPrompt(data, '批量拒绝报名申请'));
                }
            });
        },
    },
    ClassFile: {
        Append: function (ClassFile) {
            var url = "/ClassFileWriter/Append";
            $.post(url, {
                'ClassId': ClassFile.ClassId,
                'Filename': ClassFile.Filename,
                'Json': ClassFile.Json,
                'Type': ClassFile.Type,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.SweetAlertRedirect('添加课程File', '添加课程File成功。', 'success', Path.Path.Class.ClassFileEdit(data));
                }
                else {
                    Tools.ToastrError('添加课程File', NodPostTool.ErrorPrompt(data, '添加课程File'));
                }
            });
        },
        Delete: function (ClassFile) {
            var url = "/ClassFileWriter/Delete";
            $.post(url, {
                'Id': ClassFile.Id,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('删除课程File', '删除课程File成功。', true);
                }
                else {
                    Tools.ToastrError('删除课程File', NodPostTool.ErrorPrompt(data, '删除课程File'));
                }
            });
        },
        Update: function (ClassFile) {
            var url = "/ClassFileWriter/Update";
            $.post(url, {
                'Id': ClassFile.Id,
                'ClassId': ClassFile.ClassId,
                'Filename': ClassFile.Filename,
                'Json': ClassFile.Json,
                'Type': ClassFile.Type,
                'WarningContent': ClassFile.WarningContent,
                'RequestContent': ClassFile.RequestContent,
                'IsOk': ClassFile.IsOk,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('修改课程File', '修改课程File成功。', true);
                }
                else {
                    Tools.ToastrError('修改课程File', NodPostTool.ErrorPrompt(data, '修改课程File'));
                }
            });
        },
        Transfer: function (ClassFile) {
            var url = "/ClassFileWriter/Transfer";
            $.post(url, {
                'Id': ClassFile.Id,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('转化课程File', '转化课程File成功。', true);
                }
                else {
                    Tools.ToastrError('转化课程File', NodPostTool.ErrorPrompt(data, '转化课程File'));
                }
            });
        },
        TransferArray: function (Ids) {
            var url = "/ClassFileWriter/TransferArray";
            $.post(url, {
                'Ids': Ids,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('批量转化课程File', '批量转化课程File成功' + data + '个。', true);
                }
                else {
                    Tools.ToastrError('批量转化课程File', NodPostTool.ErrorPrompt(data, '批量转化课程File'));
                }
            });
        },
        Check: function (ClassFile) {
            var url = "/ClassFileWriter/Check";
            $.post(url, {
                'Id': ClassFile.Id,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('检测课程File', '检测课程File成功。', true);
                }
                else {
                    Tools.ToastrError('检测课程File', NodPostTool.ErrorPrompt(data, '检测课程File'));
                }
            });
        },
        CheckArray: function (Ids) {
            var url = "/ClassFileWriter/CheckArray";
            $.post(url, {
                'Ids': Ids,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('批量检测课程File', '批量检测课程File成功' + data + '个。', true);
                }
                else {
                    Tools.ToastrError('批量检测课程File', NodPostTool.ErrorPrompt(data, '批量检测课程File'));
                }
            });
        },
        Import: function (ClassFile) {
            var url = "/ClassFileWriter/Import";
            $.post(url, {
                'Id': ClassFile.Id,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('导入课程File', '导入课程File成功。', true);
                }
                else {
                    Tools.ToastrError('导入课程File', NodPostTool.ErrorPrompt(data, '导入课程File'));
                }
            });
        },
        ImportArray: function (Ids) {
            var url = "/ClassFileWriter/ImportArray";
            $.post(url, {
                'Ids': Ids,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('批量导入课程File', '批量批量导入课程File成功' + data + '个。', true);
                }
                else {
                    Tools.ToastrError('批量导入课程File', NodPostTool.ErrorPrompt(data, '批量导入课程File'));
                }
            });
        },
        SetOk: function (Id, IsOk) {
            var url = "/ClassFileWriter/SetOk";
            $.post(url, {
                'Id': Id,
                'IsOk': IsOk,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('设置处理类型', '设置处理类型成功。', true);
                }
                else {
                    Tools.ToastrError('设置处理类型', NodPostTool.ErrorPrompt(data, '设置处理类型'));
                }
            });
        },
        SetOkArray: function (Ids, Flag) {
            var url = "/ClassFileWriter/SetOkArray";
            $.post(url, {
                'Ids': Ids,
                'Bdata': Flag,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('批量设置处理类型', '批量设置处理类型成功' + data + '个。', true);
                }
                else {
                    Tools.ToastrError('批量设置处理类型', NodPostTool.ErrorPrompt(data, '批量设置处理类型'));
                }
            });
        },
    },
    ClassLive: {
        Append: function (ClassId, LiveId) {
            var url = "/ClassLiveWriter/Append";
            $.post(url, {
                'ClassId': ClassId,
                'LiveId': LiveId,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('添加直播', '直播添加成功。', true);
                }
                else {
                    Tools.ToastrError('添加直播', NodPostTool.ErrorPrompt(data, '添加直播'));
                }
            });
        },
        Delete: function (Ids) {
            var url = "/ClassLiveWriter/Delete";
            if (typeof (Ids) === 'number') {
                $.post(url, {
                    'Id': Ids,
                }, function (data, status) {
                    if (NodPostTool.OpSucceed(data)) {
                        Tools.ToastrSuccess('删除直播', '直播删除成功。', true);
                    }
                    else {
                        Tools.ToastrError('删除直播', NodPostTool.ErrorPrompt(data, '删除直播'));
                    }
                });
            }
            else {
                var fail = 0, succeed = 0;
                for (var i in Ids) {
                    $.post(url, {
                        'Id': Ids[i],
                    }, function (data, status) {
                        if (NodPostTool.OpSucceed(data)) succeed++;
                        else fail++;
                        if (succeed + fail === Ids.length) {
                            if (fail === 0)
                                Tools.ToastrSuccess('批量删除直播', '直播批量删除成功。', true);
                            else
                                Tools.ToastrError('批量删除直播', '直播批量删除失败 ' + fail + '个，请稍后重试。', true);
                        }
                    });
                }
            }
        },
    },
    ClassInfo: {
        Append: function (ClassInfo) {
            var url = "/ClassInfoWriter/Append";
            $.post(url, {
                'Tags': ClassInfo.Tags,
                'Title': ClassInfo.Title,
                'Type': ClassInfo.Type,
                'ClassDetailId': ClassInfo.ClassDetailId,
                'Icon': $('#uploadInputSimple').val(),
                'Content': Tools['ClassContentCKEditor'].getData(),
                'StartTime': new Date(ClassInfo.StartTime).getTime(),
                'Price': parseFloat(ClassInfo.Price) * 100,
                'Hours': ClassInfo.Hours,
                'Level': ClassInfo.Level,
                'ShowType': ClassInfo.ShowType,
                'Json': ClassInfo.Json,
                'MaxCount': ClassInfo.MaxCount,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.SweetAlertRedirect('创建课程', '课程创建成功。', 'success', Path.Path.Class.ClassEdit(data));
                }
                else {
                    Tools.SweetAlert('创建课程', NodPostTool.ErrorPrompt(data, '创建课程'), 'error');
                }
            });
        },
        Rework: function (ClassInfo) {
            var url = "/ClassInfoWriter/Rework";
            $.post(url, {
                'Id': ClassInfo.Id,
                'Tags': ClassInfo.Tags,
                'Title': ClassInfo.Title,
                'Type': ClassInfo.Type,
                'ClassDetailId': ClassInfo.ClassDetailId,
                'Icon': $('#uploadInputSimple').val(),
                'Content': Tools['ClassContentCKEditor'].getData(),
                'StartTime': new Date(ClassInfo.StartTime).getTime(),
                'Price': parseFloat(ClassInfo.Price) * 100,
                'Hours': ClassInfo.Hours,
                'Level': ClassInfo.Level,
                'ShowType': ClassInfo.ShowType,
                'IsEnd': ClassInfo.IsEnd,
                'IsShowInList': ClassInfo.IsShowInList,
                'IsApply': ClassInfo.IsApply,
                'Json': ClassInfo.Json,
                'MaxCount': ClassInfo.MaxCount,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('修改课程', '课程修改成功。', true);
                }
                else {
                    Tools.ToastrError('修改课程', NodPostTool.ErrorPrompt(data, '修改课程'));
                }
            });
        },
        ReworkJson: function (ClassInfo) {
            var url = "/ClassInfoWriter/ReworkJson";
            $.post(url, {
                'Id': ClassInfo.Id,
                'Json': ClassInfo.ClassJson,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('修改课程Json', '修改课程Json成功。', true);
                }
                else {
                    Tools.ToastrError('修改课程Json', NodPostTool.ErrorPrompt(data, '修改课程Json'));
                }
            });
        },
        SetShow: function (Id, ShowType) {
            var url = "/ClassInfoWriter/SetShow";
            $.post(url, {
                'Id': Id,
                'ShowType': ShowType,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('设置课程发布类型', '设置课程发布类型成功。', true);
                }
                else {
                    Tools.ToastrError('设置课程发布类型', NodPostTool.ErrorPrompt(data, '设置课程发布类型'));
                }
            });
        },
        SetShowArray: function (Ids, Type) {
            var url = "/ClassInfoWriter/SetShowArray";
            $.post(url, {
                'Ids': Ids,
                'Idata': Type,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('批量设置课程发布类型', '批量设置课程发布类型成功' + data + '个。', true);
                }
                else {
                    Tools.ToastrError('批量设置课程发布类型', NodPostTool.ErrorPrompt(data, '批量设置课程发布类型'));
                }
            });
        },
        SetEndArray: function (Ids, IsEnd) {
            var url = "/ClassInfoWriter/SetEndArray";
            $.post(url, {
                'Ids': Ids,
                'Bdata': IsEnd,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('批量设置课程结束', '批量设置课程结束成功' + data + '个。', true);
                }
                else {
                    Tools.ToastrError('批量设置课程结束', NodPostTool.ErrorPrompt(data, '批量设置课程结束'));
                }
            });
        },
        SetTypeArray: function (Ids, Type) {
            var url = "/ClassInfoWriter/SetTypeArray";
            $.post(url, {
                'Ids': Ids,
                'Idata': Type,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('批量设置课程类型', '批量设置课程类型成功' + data + '个。', true);
                }
                else {
                    Tools.ToastrError('批量设置课程类型', NodPostTool.ErrorPrompt(data, '批量设置课程类型'));
                }
            });
        },
        SendWorkSms: function (ClassId, sProblemIds, sUserIds) {
            if (sEmpty(sProblemIds)) { Tools.ToastrError('发送本日作业短信', '题号不可为空。'); return; }
            Tools.ToastrWarning('开始发送本日作业短信', '课程Id：' + ClassId);
            var url = "/ClassInfoWriter/SendWorkSms";
            $.get(url, {
                'classId': ClassId,
                'sProblemIds': sProblemIds,
                'sUserIds': sUserIds,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('发送本日作业短信', '本日作业短信发送成功。' + data + '条。', true, true);
                }
                else {
                    Tools.ToastrError('发送本日作业短信', NodPostTool.ErrorPrompt(data, '发送本日作业短信'));
                }
            });
        },
        SendCourseSms: function (ClassId, CourseId, sUserIds) {
            Tools.ToastrWarning('开始发送本章作业短信', '课程Id：' + ClassId + ' 章节Id：' + CourseId);
            var url = "/ClassInfoWriter/SendCourseSms";
            $.get(url, {
                'classId': ClassId,
                'courseId': CourseId,
                'sUserIds': sUserIds,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('发送本章作业短信', '发送本章作业情况成功' + data + '条。', true, true);
                }
                else {
                    Tools.ToastrError('发送本章作业短信', NodPostTool.ErrorPrompt(data, '发送本章作业短信'));
                }
            });
        },
        RegisterContest: function (Id) {
            var url = "/ClassInfoWriter/RegisterContest";
            $.post(url, {
                'Id': Id,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('学生注册比赛', '学生注册比赛成功' + data + '人。', true, true);
                }
                else {
                    Tools.ToastrError('学生注册比赛', NodPostTool.ErrorPrompt(data, '学生注册比赛'));
                }
            });
        },
        FixSchooolName: function (Id, Content) {
            var url = "/ClassInfoWriter/FixSchooolName";
            $.post(url, {
                'Id': Id,
                'Content': Content,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('更正学校名称', '更正学校名称成功' + data + '人。', true, true);
                }
                else {
                    Tools.ToastrError('更正学校名称', NodPostTool.ErrorPrompt(data, '更正学校名称'));
                }
            });
        },
    },
    ClassOwner: {
        Save: function (ClassId, User) {
            var url = "/ClassOwnerWriter/Save";
            $.post(url, {
                'ClassId': ClassId,
                'UserId': User.Id,
                'IsManager': User.IsManager,
                'AgentId': User.AgentId,
                'OwnerRole': User.OwnerRole,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('添加课程管理者', '添加课程管理者成功。', true);
                }
                else {
                    Tools.ToastrError('添加课程管理者', NodPostTool.ErrorPrompt(data, '添加课程管理者'));
                }
            });
        },
        //Rework: function (ClassOwner) {
        //    var url = "/ClassOwnerWriter/Rework";
        //    $.post(url, {
        //        'Id': ClassOwner.Id,
        //        'ClassId': ClassOwner.ClassId,
        //        'UserId': ClassOwner.UserId,
        //        'IsManager': ClassOwner.IsManager,
        //        'OrgId': ClassOwner.OrgId,
        //        'OwnerRole': ClassOwner.OwnerRole,
        //    }, function (data, status) {
        //        if (NodPostTool.OpSucceed(data)) {
        //            Tools.ToastrSuccess('修改课程管理者权限', '修改课程管理者权限成功。', true, true);
        //        }
        //        else {
        //            Tools.ToastrError('修改课程管理者权限', NodPostTool.ErrorPrompt(data, '修改课程管理者权限'));
        //        }
        //    });
        //},
        CopyClassOwner: function (DesClassId, TarClassId) {
            var url = "/ClassOwnerWriter/CopyClassOwner";
            $.post(url, {
                'Id': DesClassId,
                'UserId': TarClassId,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('批量复制管理员', '批量复制管理员成功' + data + '个。', true);
                }
                else {
                    Tools.ToastrError('批量复制管理员', NodPostTool.ErrorPrompt(data, '批量复制管理员'));
                }
            });
        },
        Delete: function (Ids) {
            var url = "/ClassOwnerWriter/Delete";
            if (typeof (Ids) === 'number') {
                $.post(url, {
                    'Id': Ids,
                }, function (data, status) {
                    if (NodPostTool.OpSucceed(data)) {
                        Tools.ToastrSuccess('删除课程管理', '删除课程管理成功。', true);
                    }
                    else {
                        Tools.ToastrError('删除课程管理', NodPostTool.ErrorPrompt(data, '删除课程管理'));
                    }
                });
            }
            else {
                var fail = 0, succeed = 0;
                for (var i in Ids) {
                    $.post(url, {
                        'Id': Ids[i],
                    }, function (data, status) {
                        if (NodPostTool.OpSucceed(data)) succeed++;
                        else fail++;
                        if (succeed + fail === Ids.length) {
                            if (fail === 0)
                                Tools.ToastrSuccess('批量删除课程管理', '课程管理批量删除成功。', true);
                            else
                                Tools.ToastrError('批量删除课程管理', '课程管理批量删除失败 ' + fail + '个，请稍后重试。', true);
                        }
                    });
                }
            }
        },
        AppendClassUser: function (Ids) {
            var url = "/ClassOwnerWriter/AppendClassUser";
            $.post(url, {
                'Ids': Ids,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('添加管理者为学生', '批量添加管理者为学生成功' + data + '个。', true);
                }
                else {
                    Tools.ToastrError('添加管理者为学生', NodPostTool.ErrorPrompt(data, '添加管理者为学生'));
                }
            });
        },
    },
    ClassPaper: {
        Append: function (ClassId, PaperId) {
            var url = "/ClassPaperWriter/Append";
            $.post(url, {
                'ClassId': ClassId,
                'PaperId': PaperId,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('添加试卷', '添加试卷成功。', true);
                }
                else {
                    Tools.ToastrError('添加试卷', NodPostTool.ErrorPrompt(data, '添加试卷'));
                }
            });
        },
        Delete: function (Ids) {
            var url = "/ClassPaperWriter/Delete";
            if (typeof (Ids) === 'number') {
                $.post(url, {
                    'Id': Ids,
                }, function (data, status) {
                    if (NodPostTool.OpSucceed(data)) {
                        Tools.ToastrSuccess('删除试卷', '删除试卷成功。', true);
                    }
                    else {
                        Tools.ToastrError('删除试卷', NodPostTool.ErrorPrompt(data, '删除试卷'));
                    }
                });
            }
            else {
                var fail = 0, succeed = 0;
                for (var i in Ids) {
                    $.post(url, {
                        'Id': Ids[i],
                    }, function (data, status) {
                        if (NodPostTool.OpSucceed(data)) succeed++;
                        else fail++;
                        if (succeed + fail === Ids.length) {
                            if (fail === 0)
                                Tools.ToastrSuccess('批量删除试卷', '批量删除试卷成功。', true);
                            else
                                Tools.ToastrError('批量删除试卷', '批量删除试卷失败 ' + fail + '个，请稍后重试。', true);
                        }
                    });
                }
            }
        },
    },
    ClassReport: {
        Report: function (Id) {
            var url = "/ClassReportWriter/Report";
            $.post(url, {
                'Id': Id,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('生成课程报告', '生成课程报告成功。', true);
                }
                else {
                    Tools.ToastrError('生成课程报告', NodPostTool.ErrorPrompt(data, '生成课程报告'));
                }
            });
        },
        ClassInfoReport: function (Id) {
            var url = "/ClassReportWriter/ClassInfoReport";
            $.post(url, {
                'Id': Id,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('导出课程信息报告', '导出课程信息报告成功。', true);
                }
                else {
                    Tools.ToastrError('导出课程信息报告', NodPostTool.ErrorPrompt(data, '导出课程信息报告'));
                }
            });
        },
        ClassEnrollReport: function (Id) {
            var url = "/ClassReportWriter/ClassEnrollReport";
            $.post(url, {
                'Id': Id,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('导出报名信息报告', '导出报名信息报告成功。', true);
                }
                else {
                    Tools.ToastrError('导出报名信息报告', NodPostTool.ErrorPrompt(data, '导出报名信息报告'));
                }
            });
        },
        ReportArray: function (Ids) {
            var url = "/ClassReportWriter/ReportArray";
            $.post(url, {
                'Ids': Ids,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('批量生成课程报告', '批量生成课程报告成功' + data + '个。', true);
                }
                else {
                    Tools.ToastrError('批量生成课程报告', NodPostTool.ErrorPrompt(data, '批量生成课程报告'));
                }
            });
        },
        UnionReport: function (Ids) {
            var url = "/ClassReportWriter/UnionReport";
            $.post(url, {
                'Json': Ids,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('合并课程报告', '合并课程报告成功。', true);
                }
                else {
                    Tools.ToastrError('合并课程报告', NodPostTool.ErrorPrompt(data, '合并课程报告'));
                }
            });
        },
    },
    ClassSchedule: {
        Append: function (ClassSchedule) {
            var url = "/ClassScheduleWriter/Append";
            $.post(url, {
                'Title': ClassSchedule.Title,
                'StartTime': new Date(ClassSchedule.StartTime).getTime(),
                'EndTime': new Date(ClassSchedule.EndTime).getTime(),
                'ClassCourseId': ClassSchedule.ClassCourseId,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('添加课程安排', '添加课程安排成功。', true);
                }
                else {
                    Tools.ToastrError('添加课程安排', NodPostTool.ErrorPrompt(data, '添加课程安排'));
                }
            });
        },
        Rework: function (ClassSchedule) {
            var url = "/ClassScheduleWriter/Rework";
            $.post(url, {
                'Id': ClassSchedule.Id,
                'Title': ClassSchedule.Title,
                'StartTime': new Date(ClassSchedule.StartTime).getTime(),
                'EndTime': new Date(ClassSchedule.EndTime).getTime(),
                //'ClassCourseId': ClassSchedule.ClassCourseId,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('修改课程安排', '修改课程安排成功。', true);
                }
                else {
                    Tools.ToastrError('修改课程安排', NodPostTool.ErrorPrompt(data, '修改课程安排'));
                }
            });
        },
        Delete: function (Ids) {
            var url = "/ClassScheduleWriter/Delete";
            if (typeof (Ids) === 'number') {
                $.post(url, {
                    'Id': Ids,
                }, function (data, status) {
                    if (NodPostTool.OpSucceed(data)) {
                        Tools.ToastrSuccess('删除课程安排', '删除课程安排成功。', true);
                    }
                    else {
                        Tools.ToastrError('删除课程安排', NodPostTool.ErrorPrompt(data, '删除课程安排'));
                    }
                });
            }
            else {
                var fail = 0, succeed = 0;
                for (var i in Ids) {
                    $.post(url, {
                        'Id': Ids[i],
                    }, function (data, status) {
                        if (NodPostTool.OpSucceed(data)) succeed++;
                        else fail++;
                        if (succeed + fail === Ids.length) {
                            if (fail === 0)
                                Tools.ToastrSuccess('批量删除试卷', '批量删除试卷成功。', true);
                            else
                                Tools.ToastrError('批量删除试卷', '批量删除试卷失败 ' + fail + '个，请稍后重试。', true);
                        }
                    });
                }
            }
        },
    },
    ClassUser: {
        Append: function (ClassId, UserId) {
            var url = "/ClassUserWriter/Append";
            $.post(url, {
                'ClassId': ClassId,
                'UserId': UserId,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('参加课程', '参加课程成功，请点击按钮开始学习。', true);
                }
                else {
                    Tools.ToastrError('参加课程', NodPostTool.ErrorPrompt(data, '参加课程'));
                }
            });
        },
        AdminAppend: function (ClassId, UserId, ExpiredTime) {
            var url = "/ClassUserWriter/AdminAppend";
            $.post(url, {
                'ClassId': ClassId,
                'UserId': UserId,
                'ExpiredTime': new Date(ExpiredTime).getTime(),
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('添加学生', '添加学生成功。', true);
                }
                else {
                    Tools.ToastrError('添加学生', NodPostTool.ErrorPrompt(data, '添加学生'));
                }
            });
        },
        AdminAppendArray: function (ClassId, UserIds, ExpiredTime) {
            var url = "/ClassUserWriter/AdminAppendArray";
            $.post(url, {
                'Ids': UserIds,
                'Idata': ClassId,
                'Ldata': new Date(ExpiredTime).getTime(),
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('批量添加学生', '批量添加学生成功' + data + '个。', true, true);
                }
                else {
                    Tools.ToastrError('批量添加学生', NodPostTool.ErrorPrompt(data, '批量添加学生'));
                }
            });
        },
        AdminDeleteArray: function (ClassId, UserIds) {
            var url = "/ClassUserWriter/AdminDeleteArray";
            $.post(url, {
                'Ids': UserIds,
                'Idata': ClassId,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('批量删除学生', '批量删除学生成功' + data + '个。', true, true);
                }
                else {
                    Tools.ToastrError('批量删除学生', NodPostTool.ErrorPrompt(data, '批量删除学生'));
                }
            });
        },
        OwnerAppend: function (ClassId) {
            var url = "/ClassUserWriter/OwnerAppend";
            $.post(url, {
                'ClassId': ClassId,
                'ExpiredTime': 0,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('注册课程', '注册课程成功。', true);
                }
                else {
                    Tools.ToastrError('注册课程', NodPostTool.ErrorPrompt(data, '注册课程'));
                }
            });
        },
        Rework: function (ClassUser, ExpiredTime) {
            var url = "/ClassUserWriter/Rework";
            $.post(url, {
                'Id': ClassUser.Id,
                'ClassId': ClassUser.ClassId,
                'UserId': ClassUser.UserId,
                'IsDeleted': ClassUser.IsDeleted,
                'ExpiredTime': new Date(ExpiredTime).getTime(),
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('修改学生课程信息', '修改学生课程信息成功。', true, true);
                }
                else {
                    Tools.ToastrError('修改学生课程信息', NodPostTool.ErrorPrompt(data, '修改学生课程信息'));
                }
            });
        },
        ReworkJson: function (ClassUser, ClassUserJson) {
            var url = "/ClassUserWriter/ReworkJson";
            $.post(url, {
                'Id': ClassUser.Id,
                'Json': ClassUserJson,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('修改课程Json信息', '修改课程Json信息成功。', true, true);
                }
                else {
                    Tools.ToastrError('修改课程Json信息', NodPostTool.ErrorPrompt(data, '修改课程Json信息'));
                }
            });
        },
        ImportClassUserJson: function (ClassId, UserJsons) {
            var url = "/ClassUserWriter/ImportClassUserJson";
            $.post(url, {
                'Idata': ClassId,
                'Ids': UserJsons,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('导入用户Json', '导入用户Json成功' + data + '个。', true, true);
                }
                else {
                    Tools.ToastrError('导入用户Json', NodPostTool.ErrorPrompt(data, '导入用户Json'));
                }
            });
        },
        ReworkAttendInfo: function (ClassId, AttendInfos) {
            var url = "/ClassUserWriter/ReworkAttendInfo";
            $.post(url, {
                'Idata': ClassId,
                'Ids': AttendInfos,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('修改考勤信息', '修改考勤信息成功' + data + '个。', true, true);
                }
                else {
                    Tools.ToastrError('修改考勤信息', NodPostTool.ErrorPrompt(data, '修改考勤信息'));
                }
            });
        },
    },
    ClassUserScore: {
        ImportClassUserScores: function (ClassPaperId, Scores) {
            var url = "/ClassUserScoreWriter/ImportClassUserScores";
            $.post(url, {
                'Idata': ClassPaperId,
                'Ids': Scores,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('导入试卷成绩', '导入试卷成绩成功。', true, true);
                }
                else {
                    Tools.SweetAlert('导入试卷成绩', NodPostTool.ErrorPrompt(data, '导入试卷成绩'), 'error');
                }
            });
        },
    },
    Contest: {
        Append: function (Contest) {
            var url = "/ContestWriter/Append";
            $.post(url, {
                'Tags': Contest.Tags,
                'Title': Contest.Title,
                'StartTime': new Date(Contest.StartTime).getTime(),
                'EndTime': new Date(Contest.EndTime).getTime(),
                'Description': Tools['ContestDescriptionCKEditor'].getData(),
                'IsRegister': Contest.IsRegister,
                'IsRating': Contest.IsRating,
                'AllowRegister': Contest.AllowRegister,
                'IsShowInList': Contest.IsShowInList,
                'IsHideUrl': Contest.IsHideUrl,
                'ScoreType': Contest.ScoreType,
                'ShowType': Contest.ShowType,
                'LinkId': Contest.LinkId,
                'Type': Contest.Type,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.SweetAlertRedirect('创建比赛', '创建比赛成功。', 'success', Path.Path.Contest.ContestEdit(data));
                }
                else {
                    Tools.SweetAlert('创建比赛', NodPostTool.ErrorPrompt(data, '创建比赛'), 'error');
                }
            });
        },
        Rework: function (Contest) {
            var url = "/ContestWriter/Rework";
            $.post(url, {
                'Id': Contest.Id,
                'Tags': Contest.Tags,
                'Title': Contest.Title,
                'StartTime': new Date(Contest.StartTime).getTime(),
                'EndTime': new Date(Contest.EndTime).getTime(),
                'Description': Tools['ContestDescriptionCKEditor'].getData(),
                'IsRegister': Contest.IsRegister,
                'IsRating': Contest.IsRating,
                'AllowRegister': Contest.AllowRegister,
                'IsShowInList': Contest.IsShowInList,
                'IsHideUrl': Contest.IsHideUrl,
                'ScoreType': Contest.ScoreType,
                'ShowType': Contest.ShowType,
                'Type': Contest.Type,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('修改比赛', '修改比赛成功。', true);
                }
                else {
                    Tools.ToastrError('修改比赛', NodPostTool.ErrorPrompt(data, '修改比赛'));
                }
            });
        },
        ReworkJson: function (Contest) {
            var url = "/ContestWriter/ReworkJson";
            $.post(url, {
                'Id': Contest.Id,
                'Json': Contest.ContestJson,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('修改比赛Json', '修改比赛Json成功。', true);
                }
                else {
                    Tools.ToastrError('修改比赛Json', NodPostTool.ErrorPrompt(data, '修改比赛Json'));
                }
            });
        },
        ImportExamScore: function (Contest) {
            var url = "/ContestWriter/ImportExamScore";
            $.post(url, {
                'Id': Contest.Id,
                'Json': Contest.ContestJson,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('导入联训成绩', '导入联训成绩成功。', true, true);
                }
                else {
                    Tools.ToastrError('导入联训成绩', NodPostTool.ErrorPrompt(data, '导入联训成绩'));
                }
            });
        },
        ReJudge: function (Id) {
            var url = "/ContestWriter/ReJudge";
            $.post(url, {
                'Id': Id,
            }, function (data, status) {
                Tools.ToastrSuccess('ReJudge', 'ReJudge申请成功。', true);
            });
        },
        SchoolAppend: function (Contest) {
            var url = "/ContestWriter/SchoolAppend";
            $.post(url, {
                'Title': Contest.Title,
                'StartTime': new Date(Contest.StartTime).getTime(),
                'EndTime': new Date(Contest.EndTime).getTime(),
                'Description': Tools['ContestDescriptionCKEditor'].getData(),
                'ScoreType': Contest.ScoreType,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.SweetAlertRedirect('创建比赛', '创建比赛成功。', 'success', Path.Path.School.ContestEdit(data));
                }
                else {
                    Tools.SweetAlert('创建比赛', NodPostTool.ErrorPrompt(data, '创建比赛'), 'error');
                }
            });
        },
        ExamSchoolAppend: function (Contest) {
            var url = "/ContestWriter/ExamSchoolAppend";
            $.post(url, {
                'Title': Contest.Title,
                'StartTime': new Date(Contest.StartTime).getTime(),
                'EndTime': new Date(Contest.EndTime).getTime(),
                'Description': Tools['ContestDescriptionCKEditor'].getData(),
                'Id': Scope.data.examId,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.SweetAlertRedirect('创建联训测验', '创建联训测验成功。', 'success', Path.Path.School.ExamContestEdit(data));
                }
                else {
                    Tools.SweetAlert('创建联训测验', NodPostTool.ErrorPrompt(data, '创建联训测验'), 'error');
                }
            });
        },
        SchoolRework: function (Contest) {
            var url = "/ContestWriter/SchoolRework";
            $.post(url, {
                'Id': Contest.Id,
                'Title': Contest.Title,
                'StartTime': new Date(Contest.StartTime).getTime(),
                'EndTime': new Date(Contest.EndTime).getTime(),
                'Description': Tools['ContestDescriptionCKEditor'].getData(),
                'ScoreType': Contest.ScoreType,
                'ShowType': Contest.ShowType,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('修改比赛', '修改比赛成功。', true);
                }
                else {
                    Tools.ToastrError('修改比赛', NodPostTool.ErrorPrompt(data, '修改比赛'));
                }
            });
        },
        SetTypeArray: function (Ids, Type) {
            var url = "/ContestWriter/SetTypeArray";
            $.post(url, {
                'Ids': Ids,
                'Idata': Type,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('批量设置比赛类型', '批量设置比赛类型成功' + data + '个。', true);
                }
                else {
                    Tools.ToastrError('批量设置比赛类型', NodPostTool.ErrorPrompt(data, '批量设置比赛类型'));
                }
            });
        },
    },
    ContestOwner: {
        Append: function (ContestId, UserId) {
            var url = "/ContestOwnerWriter/Append";
            $.post(url, {
                'ContestId': ContestId,
                'UserId': UserId,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('添加比赛管理者', '添加比赛管理者成功。', true);
                }
                else {
                    Tools.ToastrError('添加比赛管理者', NodPostTool.ErrorPrompt(data, '添加比赛管理者'));
                }
            });
        },
        Delete: function (ContestId, UserId) {
            var url = "/ContestOwnerWriter/Delete";
            $.post(url, {
                'ContestId': ContestId,
                'UserId': UserId,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('删除比赛管理者', '删除比赛管理者成功。', true);
                }
                else {
                    Tools.ToastrError('删除比赛管理者', NodPostTool.ErrorPrompt(data, '删除比赛管理者'));
                }
            });
        },
    },
    ContestUser: {
        Append: function (ContestId, IsRegister, RegisterContest) {
            if (IsRegister && (RegisterContest === undefined || sEmpty(RegisterContest.Name) || sEmpty(RegisterContest.Sex) || sEmpty(RegisterContest.City))) {
                Tools.ToastrError("比赛注册", "姓名、性别、所在地不可为空。");
                return;
            }

            var url = "/ContestUserWriter/Append";
            $.post(url, {
                'ContestId': ContestId,
                'Json': JSON.stringify(RegisterContest)
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('比赛注册', '您已成功注册比赛。', true, true);
                }
                else {
                    Tools.ToastrError('比赛注册', NodPostTool.ErrorPrompt(data, '比赛注册'));
                }
            });
        },
        AdminAppendArray: function (ClassId, UserIds) {
            var url = "/ContestUserWriter/AdminAppendArray";
            $.post(url, {
                'Ids': UserIds,
                'Idata': ClassId,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('批量注册比赛', '批量注册比赛成功' + data + '个。', true, true);
                }
                else {
                    Tools.ToastrError('批量注册比赛', NodPostTool.ErrorPrompt(data, '批量注册比赛'));
                }
            });
        },
    },
    ContestProblem: {
        Append: function (ContestId, ProblemId, Point) {
            var url = "/ContestProblemWriter/Append";
            $.post(url, {
                'ContestId': ContestId,
                'ProblemId': ProblemId,
                'Point': Point,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('添加赛题', '添加赛题成功。', true);
                }
                else {
                    Tools.ToastrError('添加赛题', NodPostTool.ErrorPrompt(data, '添加赛题'));
                }
            });
        },
        CopyAppend: function (ContestId, TargetContest) {
            var url = "/ContestProblemWriter/Append";
            var fail = 0, succeed = 0;
            for (var i = 0; i < TargetContest.ProblemIds.length; i++) {
                $.post(url, {
                    'ContestId': ContestId,
                    'ProblemId': TargetContest.ProblemIds[i],
                    'Point': TargetContest.ProblemPoints[i],
                }, function (data, status) {
                    if (NodPostTool.OpSucceed(data)) succeed++;
                    else fail++;

                    if (succeed + fail === TargetContest.ProblemIds.length) {
                        if (fail === 0)
                            Tools.ToastrSuccess('批量添加赛题', '赛题批量添加成功。', true, true);
                        else
                            Tools.ToastrError('批量添加赛题', '赛题批量添加失败 ' + fail + '个，请稍后重试。', true);
                    }
                });
            }
        },
        Delete: function (Ids) {
            var url = "/ContestProblemWriter/SafeDelete";
            if (typeof (Ids) === 'number') {
                $.post(url, {
                    'Id': Ids,
                }, function (data, status) {
                    if (NodPostTool.OpSucceed(data)) {
                        Tools.ToastrSuccess('删除赛题', '删除赛题成功。', true);
                    }
                    else {
                        Tools.ToastrError('删除赛题', NodPostTool.ErrorPrompt(data, '删除赛题'));
                    }
                });
            }
            else {
                var fail = 0, succeed = 0;
                for (var i in Ids) {
                    $.post(url, {
                        'Id': Ids[i],
                    }, function (data, status) {
                        if (NodPostTool.OpSucceed(data)) succeed++;
                        else fail++;
                        if (succeed + fail === Ids.length) {
                            if (fail === 0)
                                Tools.ToastrSuccess('批量删除赛题', '赛题批量删除成功。', true);
                            else
                                Tools.ToastrError('批量删除赛题', '赛题批量删除失败 ' + fail + '个，请稍后重试。', true);
                        }
                    });
                }
            }
        },
        ReJudge: function (Id) {
            var url = "/ContestProblemWriter/ReJudge";
            $.post(url, {
                'Id': Id,
            }, function (data, status) {
                Tools.ToastrSuccess('ReJudge', 'ReJudge申请成功。', true);
            });
        },
    },
    Coupon: {
        ArrayAppend: function (Coupon, Count) {
            var url = "/CouponWriter/ArrayAppend?count=" + Count;
            $.post(url, {
                'ProductId': Coupon.ProductId,
                'Amount': parseFloat(Coupon.Amount) * 100,
                'ExpireTime': new Date(Coupon.ExpireTime).getTime(),
                'Json': Coupon.Json,
            }, function (data, status) {
                if (data.length) {
                    Tools.ToastrSuccess('批量添加优惠卷', '批量添加优惠卷成功。');
                    Scope.$apply(function () { Scope.SnKeys = data; });
                }
                else {
                    Tools.ToastrError('批量添加优惠卷', NodPostTool.ErrorPrompt(data, '批量添加优惠卷'));
                }
            });
        },
        ArrayReworkExpireTime: function (ExpireTime, Ids) {
            var url = "/CouponWriter/ArrayReworkExpireTime";
            $.post(url, {
                'Ids': Ids,
                'Ldata': new Date(ExpireTime).getTime(),
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('修改优惠卷过期时间', '修改优惠卷过期时间成功。', true, true);
                }
                else {
                    Tools.ToastrError('修改优惠卷过期时间', NodPostTool.ErrorPrompt(data, '修改优惠卷过期时间'));
                }
            });
        },
        ArrayReworkJson: function (Json) {
            var url = "/CouponWriter/ArrayReworkJson";
            $.post(url, {
                'Content': Json,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('修改优惠卷Json', '修改优惠卷Json成功。', true, true);
                }
                else {
                    Tools.ToastrError('修改优惠卷Json', NodPostTool.ErrorPrompt(data, '修改优惠卷Json'));
                }
            });
        },
    },
    Course: {
        Append: function (Course) {
            var url = "/CourseWriter/Append";
            $.post(url, {
                'Tags': Course.Tags,
                'Title': Course.Title,
                'CourseCode': Course.CourseCode,
                'Icon': $('#uploadInputSimple').val(),
                'Content': Tools['CourseContentCKEditor'].getData(),
                'CourseType': Course.CourseType,
                'AutoUpdate': Course.AutoUpdate,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.SweetAlertRedirect('创建章节', '章节创建成功。', 'success', Path.Path.Course.CourseEdit(data));
                }
                else {
                    Tools.SweetAlert('创建章节', NodPostTool.ErrorPrompt(data, '创建章节'), 'error');
                }
            });
        },
        Rework: function (Course) {
            var url = "/CourseWriter/Rework";
            $.post(url, {
                'Id': Course.Id,
                'Tags': Course.Tags,
                'Title': Course.Title,
                'CourseCode': Course.CourseCode,
                'BaseCourseId': Course.BaseCourseId,
                'Icon': $('#uploadInputSimple').val(),
                'Content': Tools['CourseContentCKEditor'].getData(),
                'CourseType': Course.CourseType,
                'ShowType': Course.ShowType,
                'AutoUpdate': Course.AutoUpdate,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('修改章节', '修改章节成功。', true);
                }
                else {
                    Tools.ToastrError('修改章节', NodPostTool.ErrorPrompt(data, '修改章节'));
                }
            });
        },
        SetShow: function (Id, ShowType) {
            var url = "/CourseWriter/SetShow";
            $.post(url, {
                'Id': Id,
                'ShowType': ShowType,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess("设置章节发布类型", "设置章节发布类型成功。", true);
                }
                else {
                    Tools.ToastrError('设置章节发布类型', NodPostTool.ErrorPrompt(data, '设置章节发布类型'));
                }
            });
        },
        SetShowArray: function (Ids, Type) {
            var url = "/CourseWriter/SetShowArray";
            $.post(url, {
                'Ids': Ids,
                'Idata': Type,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('批量设置章节发布类型', '批量设置章节发布类型成功' + data + '个。', true);
                }
                else {
                    Tools.ToastrError('批量设置章节发布类型', NodPostTool.ErrorPrompt(data, '批量设置章节发布类型'));
                }
            });
        },
        SetAutoUpdateArray: function (Ids, AutoUpdate) {
            var url = "/CourseWriter/SetAutoUpdateArray";
            $.post(url, {
                'Ids': Ids,
                'Bdata': AutoUpdate,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('批量设置自动更新', '批量设置自动更新成功' + data + '个。', true);
                }
                else {
                    Tools.ToastrError('批量设置自动更新', NodPostTool.ErrorPrompt(data, '批量设置自动更新'));
                }
            });
        },
        ReJudge: function (Id) {
            var url = "/CourseWriter/ReJudge";
            $.post(url, {
                'Id': Id,
            }, function (data, status) {
                Tools.ToastrSuccess('ReJudge', 'ReJudge申请成功。', true);
            });
        },
        Export: function (DestCourseId, SourceCourseId) {
            var url = "/CourseWriter/Export?destCourseId=" + DestCourseId + "&sourceCourseId=" + SourceCourseId;
            $.post(url, {}, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('导入章节信息', '导入章节信息成功。', true, true);
                }
                else {
                    Tools.ToastrError('导入章节信息', NodPostTool.ErrorPrompt(data, '导入章节信息'));
                }
            });
        },
    },
    CourseScore: {
        Append: function (CourseId, Score, UserView) {
            var url = "/CourseScoreWriter/Append";
            $.post(url, {
                'CourseId': CourseId,
                'Score': Score,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    //Getter.RemoteGet(UserView);
                    Tools.ToastrSuccess('章节评分', '章节评分成功。', true);
                }
                else {
                    Tools.ToastrError('章节评分', NodPostTool.ErrorPrompt(data, '章节评分'));
                }
            });
        },
    },
    CourseDocument: {
        Save: function (CourseId, NewDocument) {
            var url = "/CourseDocumentWriter/Save";
            $.post(url, {
                'CourseId': CourseId,
                'DocumentId': NewDocument.Id,
                'SortId': NewDocument.SortId,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('保存文档设置', '保存文档设置成功。', true);
                }
                else {
                    Tools.ToastrError('保存文档设置', NodPostTool.ErrorPrompt(data, '保存文档设置'));
                }
            });
        },
        Delete: function (Ids) {
            var url = "/CourseDocumentWriter/Delete";
            if (typeof (Ids) === 'number') {
                $.post(url, {
                    'Id': Ids,
                }, function (data, status) {
                    if (NodPostTool.OpSucceed(data)) {
                        Tools.ToastrSuccess('删除文档', '删除文档成功。', true);
                    }
                    else {
                        Tools.ToastrError('删除文档', NodPostTool.ErrorPrompt(data, '删除文档'));
                    }
                });
            }
            else {
                var fail = 0, succeed = 0;
                for (var i in Ids) {
                    $.post(url, {
                        'Id': Ids[i],
                    }, function (data, status) {
                        if (NodPostTool.OpSucceed(data)) succeed++;
                        else fail++;
                        if (succeed + fail === Ids.length) {
                            if (fail === 0)
                                Tools.ToastrSuccess('批量删除文档', '文档批量删除成功。', true);
                            else
                                Tools.ToastrError('批量删除文档', '文档批量删除失败 ' + fail + '个，请稍后重试。', true);
                        }
                    });
                }
            }
        },
    },
    CourseProblem: {
        Save: function (CourseId, NewProblem) {
            var url = "/CourseProblemWriter/Save";
            $.post(url, {
                'CourseId': CourseId,
                'ProblemId': NewProblem.Id,
                'Type': NewProblem.Type,
                'Point': NewProblem.Point,
                'SortId': NewProblem.SortId,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('保存题目设置', '保存题目设置成功。', true);
                }
                else {
                    Tools.ToastrError('保存题目设置', NodPostTool.ErrorPrompt(data, '保存题目设置'));
                }
            });
        },
        Rework: function (CourseProblem) {
            var url = "/CourseProblemWriter/Rework";
            $.post(url, {
                'Id': CourseProblem.Id,
                'ProblemId': CourseProblem.ProblemId,
                'CourseId': CourseProblem.CourseId,
                'Point': CourseProblem.Point,
                'SortId': CourseProblem.SortId,
                'Type': CourseProblem.Type,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('修改试题', '修改试题成功。', true, true);
                }
                else {
                    Tools.ToastrError('修改试题', NodPostTool.ErrorPrompt(data, '修改试题'));
                }
            });
        },
        Delete: function (Ids) {
            var url = "/CourseProblemWriter/Delete";
            if (typeof (Ids) === 'number') {
                $.post(url, {
                    'Id': Ids,
                }, function (data, status) {
                    if (NodPostTool.OpSucceed(data)) {
                        Tools.ToastrSuccess('删除试题', '删除试题成功。', true);
                    }
                    else {
                        Tools.ToastrError('删除试题', NodPostTool.ErrorPrompt(data, '删除试题'));
                    }
                });
            }
            else {
                var fail = 0, succeed = 0;
                for (var i in Ids) {
                    $.post(url, {
                        'Id': Ids[i],
                    }, function (data, status) {
                        if (NodPostTool.OpSucceed(data)) succeed++;
                        else fail++;
                        if (succeed + fail === Ids.length) {
                            if (fail === 0)
                                Tools.ToastrSuccess('批量删除试题', '试题批量删除成功。', true);
                            else
                                Tools.ToastrError('批量删除试题', '试题批量删除失败 ' + fail + '个，请稍后重试。', true);
                        }
                    });
                }
            }
        },
    },
    CourseUser: {
        ClassAppend: function (CourseId, ClassId) {
            var url = "/CourseUserWriter/ClassAppend";
            $.post(url, {
                'Id': ClassId,
                'CourseId': CourseId,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('开始章节学习', '开始章节学习成功，请点击按钮开始学习。', true);
                    //window.location.href = Path.Path.Course.CourseIndex(CourseId);
                }
                else {
                    Tools.ToastrError('开始章节学习', NodPostTool.ErrorPrompt(data, '开始章节学习'));
                }
            });
        },
        SchoolAppend: function (CourseId) {
            var url = "/CourseUserWriter/SchoolAppend";
            $.post(url, {
                'CourseId': CourseId,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('开始章节学习', '开始章节学习成功，请点击按钮开始学习。', true);
                    //window.location.href = Path.Path.Course.CourseIndex(CourseId);
                }
                else {
                    Tools.ToastrError('开始章节学习', NodPostTool.ErrorPrompt(data, '开始章节学习'));
                }
            });
        },
    },
    CourseVideo: {
        Save: function (CourseId, NewVideo) {
            var url = "/CourseVideoWriter/Save";
            $.post(url, {
                'CourseId': CourseId,
                'VideoId': NewVideo.Id,
                'SortId': NewVideo.SortId,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('保存视频设置', '保存视频设置成功。', true);
                }
                else {
                    Tools.ToastrError('保存视频设置', NodPostTool.ErrorPrompt(data, '保存视频设置'));
                }
            });
        },
        Delete: function (Ids) {
            var url = "/CourseVideoWriter/Delete";
            if (typeof (Ids) === 'number') {
                $.post(url, {
                    'Id': Ids,
                }, function (data, status) {
                    if (NodPostTool.OpSucceed(data)) {
                        Tools.ToastrSuccess('删除视频', '删除视频成功。', true);
                    }
                    else {
                        Tools.ToastrError('删除视频', NodPostTool.ErrorPrompt(data, '删除视频'));
                    }
                });
            }
            else {
                var fail = 0, succeed = 0;
                for (var i in Ids) {
                    $.post(url, {
                        'Id': Ids[i],
                    }, function (data, status) {
                        if (NodPostTool.OpSucceed(data)) succeed++;
                        else fail++;
                        if (succeed + fail === Ids.length) {
                            if (fail === 0)
                                Tools.ToastrSuccess('批量删除视频', '视频批量删除成功。', true);
                            else
                                Tools.ToastrError('批量删除视频', '视频批量删除失败 ' + fail + '个，请稍后重试。', true);
                        }
                    });
                }
            }
        },
    },
    Document: {
        Append: function (Document) {
            var url = "/DocumentWriter/Append";
            $.post(url, {
                'Tags': Document.Tags,
                'Title': Document.Title,
                'Filename': Document.Filename,
                'Type': Document.Type,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.SweetAlertRedirect('添加文件', '添加文件成功。', 'success', Path.Path.Tutorial.DocumentEdit(data));
                }
                else {
                    Tools.SweetAlert('添加文件', NodPostTool.ErrorPrompt(data, '添加文件'), 'error');
                }
            });
        },
        Save: function (Document) {
            var url = '/DocumentWriter/Save';
            $.post(url, {
                'Id': Document.Id,
                'Tags': Document.Tags,
                'Title': Document.Title,
                'Filename': Document.Filename,
                'Type': Document.Type,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('添加文件', '添加文件成功。', true);
                }
                else {
                    Tools.ToastrError('添加文件', NodPostTool.ErrorPrompt(data, '添加文件'));
                }
            });
        },
    },
    Exam: {
        Append: function (Exam) {
            var url = "/ExamWriter/Append";
            $.post(url, {
                'Tags': Exam.Tags,
                'Title': Exam.Title,
                'Content': Tools['ExamContentCKEditor'].getData(),
                'Level': Exam.Level,
                'Price': parseFloat(Exam.Price) * 100,
                'ShowType': Exam.ShowType,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.SweetAlertRedirect('创建联训', '创建联训成功。', 'success', Path.Path.Exam.ExamEdit(data));
                }
                else {
                    Tools.SweetAlert('创建联训', NodPostTool.ErrorPrompt(data, '创建联训'), 'error');
                }
            });
        },
        Rework: function (Exam) {
            var url = "/ExamWriter/Rework";
            $.post(url, {
                'Id': Exam.Id,
                'Tags': Exam.Tags,
                'Title': Exam.Title,
                'Content': Tools['ExamContentCKEditor'].getData(),
                'Level': Exam.Level,
                'Price': parseFloat(Exam.Price) * 100,
                'ShowType': Exam.ShowType,
                'IsShowInList': Exam.IsShowInList,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('修改联训', '修改联训成功。', true);
                }
                else {
                    Tools.ToastrError('修改联训', NodPostTool.ErrorPrompt(data, '修改联训'));
                }
            });
        },
        ReworkJson: function (Exam) {
            var url = "/ExamWriter/ReworkJson";
            $.post(url, {
                'Id': Exam.Id,
                'Json': Exam.ExamJson,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('修改联训Json', '修改联训Json成功。', true);
                }
                else {
                    Tools.ToastrError('修改联训Json', NodPostTool.ErrorPrompt(data, '修改联训Json'));
                }
            });
        },
        SetShowArray: function (Ids, Type) {
            var url = "/ExamWriter/SetShowArray";
            $.post(url, {
                'Ids': Ids,
                'Idata': Type,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('批量设置联训发布类型', '批量设置联训发布类型成功' + data + '个。', true);
                }
                else {
                    Tools.ToastrError('批量设置联训发布类型', NodPostTool.ErrorPrompt(data, '批量设置联训发布类型'));
                }
            });
        },
        SetShowInListArray: function (Ids, Type) {
            var url = "/ExamWriter/SetShowInListArray";
            $.post(url, {
                'Ids': Ids,
                'Bdata': Type,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('批量设置联训显示类型', '批量设置联训显示类型成功' + data + '个。', true);
                }
                else {
                    Tools.ToastrError('批量设置联训显示类型', NodPostTool.ErrorPrompt(data, '批量设置联训显示类型'));
                }
            });
        },
        GenExamPdfArray: function (Ids, Type) {
            var url = "/ExamWriter/GenExamPdfArray";
            $.post(url, {
                'Ids': Ids,
                'Idata': Type,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('批量生成联训PDF', '批量生成联训PDF成功' + data + '个。', true);
                }
                else {
                    Tools.ToastrError('批量生成联训PDF', NodPostTool.ErrorPrompt(data, '批量生成联训PDF'));
                }
            });
        },
    },
    ExamProblem: {
        Save: function (ExamId, NewProblem) {
            var url = "/ExamProblemWriter/Save";
            $.post(url, {
                'ExamId': ExamId,
                'ProblemId': NewProblem.Id,
                'Point': NewProblem.Point,
                'SortId': NewProblem.SortId,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('保存试题设置', '保存试题设置成功。', true);
                }
                else {
                    Tools.ToastrError('保存试题设置', NodPostTool.ErrorPrompt(data, '保存试题设置'));
                }
            });
        },
        Delete: function (Ids) {
            var url = "/ExamProblemWriter/Delete";
            if (typeof (Ids) === 'number') {
                $.post(url, {
                    'Id': Ids,
                }, function (data, status) {
                    if (NodPostTool.OpSucceed(data)) {
                        Tools.ToastrSuccess('删除试题', '删除试题成功。', true);
                    }
                    else {
                        Tools.ToastrError('删除试题', NodPostTool.ErrorPrompt(data, '删除试题'));
                    }
                });
            }
            else {
                var fail = 0, succeed = 0;
                for (var i in Ids) {
                    $.post(url, {
                        'Id': Ids[i],
                    }, function (data, status) {
                        if (NodPostTool.OpSucceed(data)) succeed++;
                        else fail++;
                        if (succeed + fail === Ids.length) {
                            if (fail === 0)
                                Tools.ToastrSuccess('批量删除试题', '试题批量删除成功。', true);
                            else
                                Tools.ToastrError('批量删除试题', '试题批量删除失败 ' + fail + '个，请稍后重试。', true);
                        }
                    });
                }
            }
        },
    },
    ExamSchool: {
        Append: function (ExamId, SchoolId) {
            var url = "/ExamSchoolWriter/Append";
            $.post(url, {
                'ExamId': ExamId,
                'SchoolId': SchoolId,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('参加联训', '参加联训成功。', true, true);
                }
                else {
                    Tools.ToastrError('参加联训', NodPostTool.ErrorPrompt(data, '参加联训'));
                }
            });
        },
        AdminAppendArray: function (ExamId, SchoolIds) {
            var url = "/ExamSchoolWriter/AdminAppendArray";
            $.post(url, {
                'Idata': ExamId,
                'Ids': SchoolIds,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('批量添加学校', '批量添加学校成功' + data + '个。', true, true);
                }
                else {
                    Tools.ToastrError('批量添加学校', NodPostTool.ErrorPrompt(data, '批量添加学校'));
                }
            });
        },
        AdminAppendArraySchool: function (SchoolId, ExamIds) {
            var url = "/ExamSchoolWriter/AdminAppendArraySchool";
            $.post(url, {
                'Idata': SchoolId,
                'Ids': ExamIds,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('批量添加联训', '批量添加联训成功' + data + '个。', true, true);
                }
                else {
                    Tools.ToastrError('批量添加联训', NodPostTool.ErrorPrompt(data, '批量添加联训'));
                }
            });
        },
        SetResultReview: function (Id) {
            var url = "/ExamSchoolWriter/SetResultReview";
            $.post(url, {
                'Id': Id,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('审核成绩', '审核成绩成功。', true);
                }
                else {
                    Tools.ToastrError('审核成绩', NodPostTool.ErrorPrompt(data, '审核成绩'));
                }
            });
        },
        SetResultReviewArray: function (Ids) {
            var url = "/ExamSchoolWriter/SetResultReviewArray";
            $.post(url, {
                'Ids': Ids,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('批量审核成绩', '批量审核成绩成功' + data + '个。', true);
                }
                else {
                    Tools.ToastrError('批量审核成绩', NodPostTool.ErrorPrompt(data, '批量审核成绩'));
                }
            });
        },
    },
    ExamResult: {
        ImportExamScore: function (ExamId, ExamScoreJson) {
            var url = "/ExamResultWriter/ImportExamScore";
            $.post(url, {
                'Idata': ExamId,
                'Ids': ExamScoreJson,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('导入考试成绩', '导入考试成绩成功' + data + '个。', true, true);
                }
                else {
                    Tools.ToastrError('导入考试成绩', NodPostTool.ErrorPrompt(data, '导入考试成绩'));
                }
            });
        },
        ImportExamSchoolScore: function (ExamSchoolId, ExamScoreJson) {
            var url = "/ExamResultWriter/ImportExamSchoolScore";
            $.post(url, {
                'Idata': ExamSchoolId,
                'Ids': ExamScoreJson,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('导入考试成绩', '导入考试成绩成功' + data + '个。', true, true);
                }
                else {
                    Tools.ToastrError('导入考试成绩', NodPostTool.ErrorPrompt(data, '导入考试成绩'));
                }
            });
        },
        DeleteScore: function (ExamSchoolId, Number) {
            var url = "/ExamResultWriter/DeleteScore";
            $.post(url, {
                'ExamSchoolId': ExamSchoolId,
                'Number': Number,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('删除 ' + Number + ' 的考试成绩', '删除 ' + Number + ' 的考试成绩成功。');
                }
                else {
                    Tools.ToastrError('删除 ' + Number + ' 的考试成绩', NodPostTool.ErrorPrompt(data, '删除 ' + Number + ' 的考试成绩'));
                }
            });
        },
    },
    Favorite: {
        Append: function (Name, Type) {
            var url = "/FavoriteWriter/Append";
            $.post(url, {
                'Name': Name,
                'Type': Type
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Scope.FavoriteScope.refreshData();
                    Tools.ToastrSuccess('新增收藏夹', '新增收藏夹成功。');
                }
                else {
                    Tools.ToastrError('新增收藏夹', NodPostTool.ErrorPrompt(data, '新增收藏夹'));
                }
            });
        },
        Delete: function (Id) {
            var url = "/FavoriteWriter/Delete";
            $.post(url, {
                'Id': Id
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    window.location.href = Path.Path.Favorite.UserFavoriteList();
                }
                else {
                    Tools.ToastrError('删除收藏夹', NodPostTool.ErrorPrompt(data, '删除收藏夹'));
                }
            });
        },
        Rework: function (Id, Name) {
            var url = "/FavoriteWriter/Rework";
            $.post(url, {
                'Id': Id,
                'Name': Name
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('修改收藏夹', '修改收藏夹成功。', true);
                }
                else {
                    Tools.ToastrError('修改收藏夹', NodPostTool.ErrorPrompt(data, '修改收藏夹'));
                }
            });
        },
    },
    Favorites: {
        Append: function (FavoriteItem, LinkId) {
            var url = "/FavoritesWriter/Append";
            $.post(url, {
                'FavoriteId': FavoriteItem.FavoriteView.Id,
                'LinkId': LinkId
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Scope.$apply(function () { FavoriteItem.hasItem = true; });
                }
                else {
                    Tools.ToastrError('添加收藏', NodPostTool.ErrorPrompt(data, '添加收藏'));
                }
            });
        },
        Delete: function (FavoriteItem, LinkId) {
            var url = "/FavoritesWriter/Delete";
            $.post(url, {
                'FavoriteId': FavoriteItem.FavoriteView.Id,
                'LinkId': LinkId
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Scope.$apply(function () { FavoriteItem.hasItem = false; });
                }
                else {
                    Tools.ToastrError('删除收藏', NodPostTool.ErrorPrompt(data, '删除收藏'));
                }
            });
        },
    },
    FocusAnswer: {
        Save: function (AnswerView, Type) {
            var url = "/FocusAnswerWriter/Save";
            $.post(url, {
                'FocusId': AnswerView.Id,
                'Type': Type
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Getter.RemoteGet(AnswerView);
                }
                else {
                    if (Type == NodEnum.FocusTypeEnum.Agree.Index)
                        Tools.ToastrError('赞同回答', NodPostTool.ErrorPrompt(data, '赞同回答'));
                    else if (Type == NodEnum.FocusTypeEnum.Oppose.Index)
                        Tools.ToastrError('反对回答', NodPostTool.ErrorPrompt(data, '反对回答'));
                }
            });
        },
        Delete: function (AnswerView, Type) {
            var url = "/FocusAnswerWriter/Delete";
            $.post(url, {
                'FocusId': AnswerView.Id,
                'Type': Type
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Getter.RemoteGet(AnswerView);
                }
                else {
                    if (Type == NodEnum.FocusTypeEnum.Agree.Index)
                        Tools.ToastrError('取消赞同回答', NodPostTool.ErrorPrompt(data, '取消赞同回答'));
                    else if (Type == NodEnum.FocusTypeEnum.Oppose.Index)
                        Tools.ToastrError('取消反对回答', NodPostTool.ErrorPrompt(data, '取消反对回答'));
                }
            });
        },
    },
    FocusAnswerComment: {
        Append: function (CommentView) {
            var url = "/FocusAnswerCommentWriter/Append";
            $.post(url, {
                'FocusId': CommentView.Id
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Getter.RemoteGet(CommentView);
                }
                else {
                    Tools.ToastrError('点赞评论', NodPostTool.ErrorPrompt(data, '点赞评论'));
                }
            });
        },
        Delete: function (CommentView) {
            var url = "/FocusAnswerCommentWriter/Delete";
            $.post(url, {
                'FocusId': CommentView.Id
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Getter.RemoteGet(CommentView);
                }
                else {
                    Tools.ToastrError('取消点赞评论', NodPostTool.ErrorPrompt(data, '取消点赞评论'));
                }
            });
        },
    },
    FocusBlog: {
        Append: function (BlogView) {
            var url = "/FocusBlogWriter/Append";
            $.post(url, {
                'FocusId': BlogView.Id
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Getter.RemoteGet(BlogView);
                }
                else {
                    Tools.ToastrError('点赞博客', NodPostTool.ErrorPrompt(data, '点赞博客'));
                }
            });
        },
        Delete: function (BlogView) {
            var url = "/FocusBlogWriter/Delete";
            $.post(url, {
                'FocusId': BlogView.Id
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Getter.RemoteGet(BlogView);
                }
                else {
                    Tools.ToastrError('取消点赞博客', NodPostTool.ErrorPrompt(data, '取消点赞博客'));
                }
            });
        },
    },
    FocusBlogComment: {
        Append: function (CommentView) {
            var url = "/FocusBlogCommentWriter/Append";
            $.post(url, {
                'FocusId': CommentView.Id
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Getter.RemoteGet(CommentView);
                }
                else {
                    Tools.ToastrError('点赞评论', NodPostTool.ErrorPrompt(data, '点赞评论'));
                }
            });
        },
        Delete: function (CommentView) {
            var url = "/FocusBlogCommentWriter/Delete";
            $.post(url, {
                'FocusId': CommentView.Id
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Getter.RemoteGet(CommentView);
                }
                else {
                    Tools.ToastrError('取消点赞评论', NodPostTool.ErrorPrompt(data, '取消点赞评论'));
                }
            });
        },
    },
    FocusJudge: {
        Append: function (JudgeView) {
            var url = "/FocusJudgeWriter/Append";
            $.post(url, {
                'FocusId': JudgeView.Id
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Getter.RemoteGet(JudgeView);
                }
                else {
                    Tools.ToastrError('点赞代码', NodPostTool.ErrorPrompt(data, '点赞代码'));
                }
            });
        },
        Delete: function (JudgeView) {
            var url = "/FocusJudgeWriter/Delete";
            $.post(url, {
                'FocusId': JudgeView.Id
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Getter.RemoteGet(JudgeView);
                }
                else {
                    Tools.ToastrError('取消点赞代码', NodPostTool.ErrorPrompt(data, '取消点赞代码'));
                }
            });
        },
    },
    FocusJudgeComment: {
        Append: function (CommentView) {
            var url = "/FocusJudgeCommentWriter/Append";
            $.post(url, {
                'FocusId': CommentView.Id
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Getter.RemoteGet(CommentView);
                }
                else {
                    Tools.ToastrError('点赞评论', NodPostTool.ErrorPrompt(data, '点赞评论'));
                }
            });
        },
        Delete: function (CommentView) {
            var url = "/FocusJudgeCommentWriter/Delete";
            $.post(url, {
                'FocusId': CommentView.Id
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Getter.RemoteGet(CommentView);
                }
                else {
                    Tools.ToastrError('取消点赞评论', NodPostTool.ErrorPrompt(data, '取消点赞评论'));
                }
            });
        },
    },
    FocusProblem: {
        Append: function (ProblemView) {
            var url = "/FocusProblemWriter/Append";
            $.post(url, {
                'FocusId': ProblemView.Id
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Getter.RemoteGet(ProblemView);
                }
                else {
                    Tools.ToastrError('关注题目', NodPostTool.ErrorPrompt(data, '关注题目'));
                }
            });
        },
        Delete: function (ProblemView) {
            var url = "/FocusProblemWriter/Delete";
            $.post(url, {
                'FocusId': ProblemView.Id
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Getter.RemoteGet(ProblemView);
                }
                else {
                    Tools.ToastrError('取消关注题目', NodPostTool.ErrorPrompt(data, '取消关注题目'));
                }
            });
        },
    },
    FocusProblemSolution: {
        Append: function (FocusId, ContestId) {
            var url = "/FocusProblemSolutionWriter/Append";
            $.post(url, {
                'FocusId': FocusId,
                'ContestId': ContestId,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Scope.refreshData();
                }
                else {
                    Tools.ToastrError('查看题解', NodPostTool.ErrorPrompt(data, '查看题解'));
                }
            });
        },
    },
    FocusCode: {
        Append: function (CodeId) {
            var url = "/FocusCodeWriter/Append";
            $.post(url, {
                'FocusId': CodeId,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Scope.refreshData();
                }
                else {
                    Tools.ToastrError('查看标程', NodPostTool.ErrorPrompt(data, '查看标程'));
                }
            });
        },
    },
    FocusQuestion: {
        Append: function (QuestionView) {
            var url = "/FocusQuestionWriter/Append";
            $.post(url, {
                'FocusId': QuestionView.Id
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Getter.RemoteGet(QuestionView);
                }
                else {
                    Tools.ToastrError('关注问题', NodPostTool.ErrorPrompt(data, '关注问题'));
                }
            });
        },
        Delete: function (QuestionView) {
            var url = "/FocusQuestionWriter/Delete";
            $.post(url, {
                'FocusId': QuestionView.Id
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Getter.RemoteGet(QuestionView);
                }
                else {
                    Tools.ToastrError('取消关注问题', NodPostTool.ErrorPrompt(data, '取消关注问题'));
                }
            });
        },
    },
    FocusQuestionAnonymous: {
        Append: function (QuestionView) {
            var url = "/FocusQuestionAnonymousWriter/Append";
            $.post(url, {
                'FocusId': QuestionView.Id
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('开启匿名', '开启匿名成功', true);
                }
                else {
                    Tools.ToastrError('开启匿名', NodPostTool.ErrorPrompt(data, '开启匿名'));
                }
            });
        },
        Delete: function (QuestionView) {
            var url = "/FocusQuestionAnonymousWriter/Delete";
            $.post(url, {
                'FocusId': QuestionView.Id
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('关闭匿名', '关闭匿名成功', true);
                }
                else {
                    Tools.ToastrError('关闭匿名', NodPostTool.ErrorPrompt(data, '关闭匿名'));
                }
            });
        },
    },
    FocusQuestionComment: {
        Append: function (CommentView) {
            var url = "/FocusQuestionCommentWriter/Append";
            $.post(url, {
                'FocusId': CommentView.Id
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Getter.RemoteGet(CommentView);
                }
                else {
                    Tools.ToastrError('点赞评论', NodPostTool.ErrorPrompt(data, '点赞评论'));
                }
            });
        },
        Delete: function (CommentView) {
            var url = "/FocusQuestionCommentWriter/Delete";
            $.post(url, {
                'FocusId': CommentView.Id
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Getter.RemoteGet(CommentView);
                }
                else {
                    Tools.ToastrError('取消点赞评论', NodPostTool.ErrorPrompt(data, '取消点赞评论'));
                }
            });
        },
    },
    FocusUser: {
        Append: function (UserRelationView) {
            var url = "/FocusUserWriter/Append";
            $.post(url, {
                'FocusId': UserRelationView.Id
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Getter.RemoteGet(UserRelationView);
                }
                else {
                    Tools.ToastrError('关注用户', NodPostTool.ErrorPrompt(data, '关注用户'));
                }
            });
        },
        Delete: function (UserRelationView) {
            var url = "/FocusUserWriter/Delete";
            $.post(url, {
                'FocusId': UserRelationView.Id
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Getter.RemoteGet(UserRelationView);
                }
                else {
                    Tools.ToastrError('取关用户', NodPostTool.ErrorPrompt(data, '取关用户'));
                }
            });
        },
    },
    Live: {
        Append: function (Live) {
            var url = "/LiveWriter/Append";
            $.post(url, {
                'Title': Live.Title,
                'StartTime': new Date(Live.StartTime).getTime(),
                'Price': parseFloat(Live.Price) * 100,
                'Level': Live.Level,
                'Icon': $('#uploadInputSimple').val(),
                'Description': Tools['LiveDescriptionCKEditor'].getData(),
                'TeacherRemark': Tools['LiveTeacherRemarkCKEditor'].getData()
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.SweetAlertRedirect('创建直播', '直播创建成功。', 'success', Path.Path.Live.LiveEdit(data));
                }
                else {
                    Tools.SweetAlert('创建直播', NodPostTool.ErrorPrompt(data, '创建直播'), 'error');
                }
            });
        },
        Rework: function (Live) {
            var url = "/LiveWriter/Rework";
            $.post(url, {
                'Id': Live.Id,
                'Title': Live.Title,
                'StartTime': new Date(Live.StartTime).getTime(),
                'Price': parseFloat(Live.Price) * 100,
                'Level': Live.Level,
                'Icon': $('#uploadInputSimple').val(),
                'Description': Tools['LiveDescriptionCKEditor'].getData(),
                'TeacherRemark': Tools['LiveTeacherRemarkCKEditor'].getData()
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('修改直播', '修改直播成功。', true);
                }
                else {
                    Tools.ToastrError('修改直播', NodPostTool.ErrorPrompt(data, '修改直播'));
                }
            });
        },
        ReworkEnd: function (Live) {
            var url = "/LiveWriter/ReworkEnd";
            $.post(url, {
                'Id': Live.Id,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('结束直播', '结束直播成功。', true);
                }
                else {
                    Tools.ToastrError('结束直播', NodPostTool.ErrorPrompt(data, '结束直播'));
                }
            });
        },
        AdminAppend: function (Live) {
            var url = "/LiveWriter/AdminAppend";
            $.post(url, {
                'UserId': Live.UserId,
                'Title': Live.Title,
                'StartTime': new Date(Live.StartTime).getTime(),
                'Icon': $('#uploadInputSimple').val(),
                'VideoType': Live.VideoType,
                'Level': Live.Level,
                'Price': parseFloat(Live.Price) * 100,
                'Description': Tools['LiveDescriptionCKEditor'].getData(),
                'TeacherRemark': Tools['LiveTeacherRemarkCKEditor'].getData(),
                'Video': Live.Video,
                'VideoScript': Live.VideoScript,
                'AccountInfo': Live.AccountInfo,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.SweetAlertRedirect('创建直播', '直播创建成功。', 'success', Path.Path.Live.LiveEdit(data));
                }
                else {
                    Tools.SweetAlert('创建直播', NodPostTool.ErrorPrompt(data, '创建直播'), 'error');
                }
            });
        },
        AdminRework: function (Live) {
            var url = "/LiveWriter/AdminRework";
            $.post(url, {
                'Id': Live.Id,
                'Title': Live.Title,
                'StartTime': new Date(Live.StartTime).getTime(),
                'Icon': $('#uploadInputSimple').val(),
                'VideoType': Live.VideoType,
                'Level': Live.Level,
                'Price': parseFloat(Live.Price) * 100,
                'Description': Tools['LiveDescriptionCKEditor'].getData(),
                'TeacherRemark': Tools['LiveTeacherRemarkCKEditor'].getData(),
                'Video': Live.Video,
                'VideoScript': Live.VideoScript,
                'AccountInfo': Live.AccountInfo,
                'CreateResponse': Live.CreateResponse,
                'IsEnd': Live.IsEnd,
                'IsShowInList': Live.IsShowInList,
                'ShowType': Live.ShowType,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('修改直播', '修改直播成功。', true);
                }
                else {
                    Tools.ToastrError('修改直播', NodPostTool.ErrorPrompt(data, '修改直播'));
                }
            });
        },
        GetPolyVideo: function (Live) {
            var url = "/LiveWriter/GetPolyVideo";
            $.post(url, {
                'Id': Live.Id,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('下载回放至服务器', '开始下载...', true);
                }
                else {
                    Tools.ToastrError('下载回放至服务器', NodPostTool.ErrorPrompt(data, '下载回放至服务器'));
                }
            });
        },
    },
    LiveMessage: {
        Append: function (LiveId) {
            WebsocketController.KeepWebsocket();
            var url = "/LiveMessageWriter/Append";
            $.post(url, {
                'LiveId': LiveId,
                'Content': Tools['LiveCommentCKEditor'].getData(),
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    document.querySelector('#LiveComment').innerHTML = '';
                }
                else {
                    Tools.ToastrError('发送消息', NodPostTool.ErrorPrompt(data, '发送消息'));
                }
            });
        },
    },
    LiveScore: {
        Append: function (LiveId, Score, UserView) {
            var url = "/LiveScoreWriter/Append";
            $.post(url, {
                'LiveId': LiveId,
                'Score': Score,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    //Getter.RemoteGet(UserView);
                    Tools.ToastrSuccess('直播评分', '直播评分成功。', true);
                }
                else {
                    Tools.ToastrError('直播评分', NodPostTool.ErrorPrompt(data, '直播评分'));
                }
            });
        },
    },
    LiveUser: {
        Append: function (LiveId) {
            var url = "/LiveUserWriter/Append";
            $.post(url, {
                'LiveId': LiveId
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('参加直播', '您已成功参加直播，点击按钮观看。', true, true);
                }
                else {
                    Tools.ToastrError('参加直播', NodPostTool.ErrorPrompt(data, '参加直播'));
                }
            });
        },
        AdminAppend: function (LiveId, UserId) {
            var url = "/LiveUserWriter/AdminAppend";
            $.post(url, {
                'LiveId': LiveId,
                'UserId': UserId,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('添加用户', '添加用户成功。', true);
                }
                else {
                    Tools.ToastrError('添加用户', NodPostTool.ErrorPrompt(data, '添加用户'));
                }
            });
        },
        AdminAppendArray: function (LiveId, UserIds) {
            var url = "/LiveUserWriter/AdminAppendArray";
            $.post(url, {
                'Ids': UserIds,
                'Idata': LiveId,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('批量添加用户', '批量添加用户成功' + data + '个。', true, true);
                }
                else {
                    Tools.ToastrError('批量添加用户', NodPostTool.ErrorPrompt(data, '批量添加用户'));
                }
            });
        },
        AppendByClass: function (ClassId, LiveId) {
            var url = "/LiveUserWriter/AppendByClass";
            $.post(url, {
                'Id': ClassId,
                'LiveId': LiveId,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('参加直播', '您已成功参加直播，点击按钮观看。', true);
                }
                else {
                    Tools.ToastrError('参加直播', NodPostTool.ErrorPrompt(data, '参加直播'));
                }
            });
        },
        SetForbid: function (LiveId, UserId, IsForbid) {
            var url = "/LiveUserWriter/SetForbid";
            $.post(url, {
                'LiveId': LiveId,
                'UserId': UserId,
                'IsForbid': IsForbid,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    if (IsForbid)
                        Tools.ToastrSuccess('禁言操作', '禁言成功。');
                    else
                        Tools.ToastrSuccess('解除禁言', '解除禁言成功。');
                    Scope.$apply(function () {
                        for (var i in Scope.LiveMessages) {
                            if (Scope.LiveMessages[i].UserId === UserId)
                                Scope.LiveMessages[i].IsForbid = IsForbid;
                        }
                    });
                }
                else {
                    if (IsForbid)
                        Tools.ToastrError('禁言操作', NodPostTool.ErrorPrompt(data, '禁言操作'));
                    else
                        Tools.ToastrError('解除禁言', NodPostTool.ErrorPrompt(data, '解除禁言'));
                }
            });
        },
    },
    Mail: {//Admin
        Append: function (Mail) {
            var url = "/MailWriter/Append";
            $.post(url, {
                'Title': Mail.Title,
                'Content': Mail.Content,
                'JsonType': Mail._JsonType,
                'MessageType': Mail.MessageType,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.SweetAlertRedirect('添加邮件模板', '添加邮件模板成功。', 'success', Path.Path.Tools.Mail(data));
                }
                else {
                    Tools.SweetAlert('添加邮件模板', NodPostTool.ErrorPrompt(data, '添加邮件模板'), 'error');
                }
            });
        },
        Rework: function (Mail) {
            var url = "/MailWriter/Rework";
            $.post(url, {
                'Id': Mail.Id,
                'Title': Mail.Title,
                'Content': Mail.Content,
                'JsonType': Mail._JsonType,
                'MessageType': Mail.MessageType,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('修改邮件模板', '邮件模板修改成功。', true);
                }
                else {
                    Tools.ToastrError('修改邮件模板', NodPostTool.ErrorPrompt(data, '修改邮件模板'));
                }
            });
        },
        Delete: function (Id) {
            var url = "/MailWriter/Delete";
            $.post(url, {
                'Id': Id,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('删除邮件模板', '删除邮件模板成功。', true);
                }
                else {
                    Tools.ToastrError('删除邮件模板', NodPostTool.ErrorPrompt(data, '删除邮件模板'));
                }
            });
        },
    },
    Message: {
        Append: function (ReceiveId, Content) {
            var url = "/MessageWriter/Append";
            $.post(url, {
                'ReceiveId': ReceiveId,
                'Content': Content
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Scope.refreshData();
                    Scope.$apply(function () {
                        Scope.MessageText = '';
                    });
                }
                else {
                    Tools.ToastrError('发送消息', NodPostTool.ErrorPrompt(data, '发送消息'));
                }
            });
        },
    },
    Order: {
        SetReviewArray: function (Ids, Flag) {
            var url = "/OrderWriter/SetReviewArray";
            $.post(url, {
                'Ids': Ids,
                'Bdata': Flag,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('批量设置订单审核类型', '批量设置订单审核类型成功' + data + '个。', true);
                }
                else {
                    Tools.ToastrError('批量设置订单审核类型', NodPostTool.ErrorPrompt(data, '批量设置订单审核类型'));
                }
            });
        },
        RefundPart: function (OrderId, RefundAmount) {
            var url = "/OrderWriter/RefundPart";
            $.post(url, {
                'Id': OrderId,
                'CreateTime': RefundAmount,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('部分退款标记', '部分退款标记成功。', true, true);
                }
                else {
                    Tools.ToastrError('部分退款标记', NodPostTool.ErrorPrompt(data, '部分退款标记'));
                }
            });
        },
    },
    TempJson: {
        AppendPaste: function (PasteData) {
            var url = "/TempJsonWriter/AppendPaste";
            $.post(url, {
                'Input': PasteData.Input,
                'Program': AceEditor.GetValue(),
                'Language': PasteData.Language,
                'CanSave': PasteData.CanSave,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.SweetAlertRedirect('分享代码', '生成成功，请复制以下地址分享代码。\n' + location.origin + Path.Path.Paste(data), 'success', Path.Path.Paste(data));
                }
                else {
                    Tools.ToastrError('分享代码', NodPostTool.ErrorPrompt(data, '分享代码'));
                }
            });
        },
        ReworkPaste: function (PasteData) {
            var url = "/TempJsonWriter/ReworkPaste";
            $.post(url, {
                'Key': PasteData.Key,
                'Input': PasteData.Input,
                'Program': AceEditor.GetValue(),
                'Language': PasteData.Language,
                'CanSave': PasteData.CanSave,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('修改代码', '修改代码成功。', true);
                }
                else {
                    Tools.ToastrError('修改代码', NodPostTool.ErrorPrompt(data, '修改代码'));
                }
            });
        },
        AppendPasteSimple: function (Input, Language) {
            var url = "/TempJsonWriter/AppendPaste";
            $.post(url, {
                'Input': Input,
                'Program': AceEditor.GetValue(),
                'Language': Language,
                'CanSave': false,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    window.location.href = Path.Path.Paste(data);
                }
                else {
                    Tools.ToastrError('分享代码', NodPostTool.ErrorPrompt(data, '分享代码'));
                }
            });
        },
    },
    TempList: {
        Delete: function (ClassId) {
            var url = "/TempListWriter/Delete";
            $.post(url, {
                'LinkId': ClassId,
                'Type': 2,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('刷新学员Cache', '刷新学员Cache成功。', true);
                }
                else {
                    Tools.ToastrError('刷新学员Cache', NodPostTool.ErrorPrompt(data, '刷新学员Cache'));
                }
            });
        },
    },
    ThirdLogin: {
        Remove: function (ThirdLoginId) {
            if (!Scope.CurrentUser.HasMobile || !Scope.HasPwd) {
                Tools.ToastrError('解绑账号', '没有设置手机与密码之前不能解绑第三方账号，防止账号无法登录。');
                return;
            }
            var url = "/ThirdLoginWriter/Remove";
            $.post(url, {
                'Id': ThirdLoginId,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('解除绑定', '解除绑定成功。', true);
                }
                else {
                    Tools.ToastrError('解除绑定', NodPostTool.ErrorPrompt(data, '解除绑定'));
                }
            });
        },
    },
    Paper: {
        Append: function (Paper) {
            var url = "/PaperWriter/Append";
            $.post(url, {
                'Title': Paper.Title,
                'Type': Paper.Type,
                'StartTime': new Date(Paper.StartTime).getTime(),
                'EndTime': new Date(Paper.EndTime).getTime(),
                'Content': Tools['ContentCKEditor'].getData(),
                'Json': Paper.Json,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.SweetAlertRedirect('添加试卷', '添加试卷成功。', 'success', Path.Path.Paper.PaperEdit(data));
                }
                else {
                    Tools.SweetAlert('添加试卷', NodPostTool.ErrorPrompt(data, '添加试卷'), 'error');
                }
            });
        },
        Rework: function (Paper) {
            var url = "/PaperWriter/Rework";
            $.post(url, {
                'Id': Paper.Id,
                'Title': Paper.Title,
                'Type': Paper.Type,
                'StartTime': new Date(Paper.StartTime).getTime(),
                'EndTime': new Date(Paper.EndTime).getTime(),
                'Content': Tools['ContentCKEditor'].getData(),
                'ShowType': Paper.ShowType,
                'Json': Paper.Json,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('修改试卷', '修改试卷成功。', true);
                }
                else {
                    Tools.ToastrError('修改试卷', NodPostTool.ErrorPrompt(data, '修改试卷'));
                }
            });
        },
        SetShowArray: function (Ids, Type) {
            var url = "/PaperWriter/SetShowArray";
            $.post(url, {
                'Ids': Ids,
                'Idata': Type,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('批量设置试卷发布类型', '批量设置试卷发布类型成功' + data + '个。', true);
                }
                else {
                    Tools.ToastrError('批量设置试卷发布类型', NodPostTool.ErrorPrompt(data, '批量设置试卷发布类型'));
                }
            });
        },
        CopyPaperQuestions: function (DesPaperId, TarPaperId) {
            var url = "/PaperWriter/CopyPaperQuestions";
            $.post(url, {
                'Id': DesPaperId,
                'UserId': TarPaperId,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('批量复制试卷题目', '批量复制试卷题目成功' + data + '个。', true);
                }
                else {
                    Tools.ToastrError('批量复制试卷题目', NodPostTool.ErrorPrompt(data, '批量复制试卷题目'));
                }
            });
        },
        ReJudge: function (PaperId) {
            var url = "/PaperWriter/ReJudge";
            $.post(url, {
                'Id': PaperId,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('Rejudge试卷', 'Rejudge试卷成功。', true);
                }
                else {
                    Tools.ToastrError('Rejudge试卷', NodPostTool.ErrorPrompt(data, 'Rejudge试卷'));
                }
            });
        },
    },
    PaperAnswerUser: {
        Save: function (PaperAnswerUser) {
            var url = "/PaperAnswerUserWriter/Save";
            $.post(url, {
                'PaperQuestionsId': PaperAnswerUser.PaperQuestionsId,
                'UserId': PaperAnswerUser.UserId,
                'Answer': PaperAnswerUser.Answer,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    console.log('自动保存试题答案成功。');
                }
                else {
                    console.log(NodPostTool.ErrorPrompt(data, '自动保存试题答案'));
                }
            });
        },
        Submit: function (PaperId, PaperAnswerUsers) {
            var url = "/PaperAnswerUserWriter/Submit";
            $.post(url, {
                'PaperId': PaperId,
                'PaperAnswerUsers': PaperAnswerUsers,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('提交试卷', '提交试卷成功。', true);
                }
                else {
                    Tools.ToastrError('提交试卷', NodPostTool.ErrorPrompt(data, '提交试卷'));
                }
            });
        },
        AutoSave: function (PaperId, PaperAnswerUsers) {
            var url = "/PaperAnswerUserWriter/AutoSave";
            $.post(url, {
                'PaperId': PaperId,
                'PaperAnswerUsers': PaperAnswerUsers,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    console.log('自动保存试题答案成功。');
                }
                else {
                    console.log(NodPostTool.ErrorPrompt(data, '自动保存试题答案'));
                }
            });
        },
    },
    PaperQuestion: {
        Append: function (PaperQuestion) {
            var url = "/PaperQuestionWriter/Append";
            $.post(url, {
                'Title': PaperQuestion.Title,
                'QuestionType': PaperQuestion.QuestionType,
                'Content': Tools['ContentCKEditor'].getData(),
                'RightAnswer': PaperQuestion.RightAnswer,
                'Answers': PaperQuestion.Answers,
                'Json': PaperQuestion.Json,
                'Solution': Tools['SolutionCKEditor'].getData(),
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.SweetAlertRedirect('添加试题', '添加试题成功。', 'success', Path.Path.Paper.PaperQuestionEdit(data));
                }
                else {
                    Tools.SweetAlert('添加试题', NodPostTool.ErrorPrompt(data, '添加试题'), 'error');
                }
            });
        },
        Rework: function (PaperQuestion) {
            var url = "/PaperQuestionWriter/Rework";
            $.post(url, {
                'Id': PaperQuestion.Id,
                'Title': PaperQuestion.Title,
                'QuestionType': PaperQuestion.QuestionType,
                'Content': Tools['ContentCKEditor'].getData(),
                'RightAnswer': PaperQuestion.RightAnswer,
                'Answers': PaperQuestion.Answers,
                'Json': PaperQuestion.Json,
                'Solution': Tools['SolutionCKEditor'].getData(),
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('修改试题', '修改试题成功。', true);
                }
                else {
                    Tools.ToastrError('修改试题', NodPostTool.ErrorPrompt(data, '修改试题'));
                }
            });
        },
    },
    PaperQuestions: {
        Save: function (PaperId, NewPaperQuestion) {
            var url = "/PaperQuestionsWriter/Save";
            $.post(url, {
                'PaperId': PaperId,
                'PaperQuestionId': NewPaperQuestion.Id,
                'Point': NewPaperQuestion.Point,
                'SortId': NewPaperQuestion.SortId,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('保存试题设置', '保存试题设置成功。', true);
                }
                else {
                    Tools.ToastrError('保存试题设置', NodPostTool.ErrorPrompt(data, '保存试题设置'));
                }
            });
        },
        Delete: function (Ids) {
            var url = "/PaperQuestionsWriter/Delete";
            if (typeof (Ids) === 'number') {
                $.post(url, {
                    'Id': Ids,
                }, function (data, status) {
                    if (NodPostTool.OpSucceed(data)) {
                        Tools.ToastrSuccess('删除试题', '删除试题成功。', true);
                    }
                    else {
                        Tools.ToastrError('删除试题', NodPostTool.ErrorPrompt(data, '删除试题'));
                    }
                });
            }
            else {
                var fail = 0, succeed = 0;
                for (var i in Ids) {
                    $.post(url, {
                        'Id': Ids[i],
                    }, function (data, status) {
                        if (NodPostTool.OpSucceed(data)) succeed++;
                        else fail++;
                        if (succeed + fail === Ids.length) {
                            if (fail === 0)
                                Tools.ToastrSuccess('批量删除试题', '批量删除试题成功。', true);
                            else
                                Tools.ToastrError('批量删除试题', '批量删除试题失败 ' + fail + '个，请稍后重试。', true);
                        }
                    });
                }
            }
        },
    },
    Problem: {
        Append: function (Problem) {
            var url = "/ProblemWriter/Append";
            $.post(url, {
                'Title': Problem.Title,
                'ProblemType': Problem.ProblemType,
                'TimeLimit': Problem.TimeLimit,
                'MemoryLimit': Problem.MemoryLimit,
                'Level': Problem.Level,
                'BasePoint': Problem.BasePoint,
                'Source': Problem.Source,
                'SourceLink': Problem.SourceLink,
                'EnName': Problem.EnName,
                'Description': Tools['ProblemDescriptionCKEditor'].getData(),
                'InputDescription': Problem.InputDescription,
                'OutputDescription': Problem.OutputDescription,
                'InputSample': Problem.InputSample,
                'OutputSample': Problem.OutputSample,
                'SampleDescription': Tools['SampleDescriptionCKEditor'].getData(),
                'InputFormat': Problem.InputFormat,
                'DataDescription': Problem.DataDescription,
                'SchoolId': Problem.SchoolId,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.SweetAlertRedirect('添加题目', '添加题目成功。', 'success', Path.Path.Problem.ProblemEdit(data));
                }
                else {
                    Tools.SweetAlert('添加题目', NodPostTool.ErrorPrompt(data, '添加题目'), 'error');
                }
            });
        },
        Rework: function (Problem) {
            var url = "/ProblemWriter/Rework";
            $.post(url, {
                'Id': Problem.Id,
                'Title': Problem.Title,
                'ProblemType': Problem.ProblemType,
                'TimeLimit': Problem.TimeLimit,
                'MemoryLimit': Problem.MemoryLimit,
                'Level': Problem.Level,
                'BasePoint': Problem.BasePoint,
                'Source': Problem.Source,
                'SourceLink': Problem.SourceLink,
                'EnName': Problem.EnName,
                'Description': Tools['ProblemDescriptionCKEditor'].getData(),
                'InputDescription': Problem.InputDescription,
                'OutputDescription': Problem.OutputDescription,
                'InputSample': Problem.InputSample,
                'OutputSample': Problem.OutputSample,
                'SampleDescription': Tools['SampleDescriptionCKEditor'].getData(),
                'InputFormat': Problem.InputFormat,
                'DataDescription': Problem.DataDescription,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('修改题目', '修改题目成功。', true);
                }
                else {
                    Tools.ToastrError('修改题目', NodPostTool.ErrorPrompt(data, '修改题目'));
                }
            });
        },
        ReworkJudgeSetting: function (Problem) {
            var url = "/ProblemWriter/ReworkJudgeSetting";
            $.post(url, {
                'Id': Problem.Id,
                'DoubleTolerance': Problem.DoubleTolerance,
                'ShowType': Problem.ShowType,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('修改判题设置', '判题设置修改成功。', true);
                }
                else {
                    Tools.ToastrError('修改判题设置', NodPostTool.ErrorPrompt(data, '修改判题设置'));
                }
            });
        },
        ReworkStandardProgram: function (ProblemId) {
            var url = "/ProblemWriter/ReworkStandardProgram";
            $.post(url, {
                'Id': ProblemId,
                'StandardProgramLanguage': AceEditor.LastLang,
                'StandardProgram': AceEditor.LastGetValue,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.SweetAlertReload('替换标程', '标程替换成功。', 'success');
                }
                else {
                    Tools.SweetAlert('替换标程', NodPostTool.ErrorPrompt(data, '替换标程'), 'error');
                }
            });
        },
        ReworkTestProgram: function (ProblemId) {
            var url = "/ProblemWriter/ReworkTestProgram";
            $.post(url, {
                'Id': ProblemId,
                'TestProgramLanguage': AceEditor.LastLang,
                'TestProgram': AceEditor.LastGetValue,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.SweetAlertReload('提交测试程序', '测试程序提交成功。', 'success');
                }
                else {
                    Tools.SweetAlert('提交测试程序', NodPostTool.ErrorPrompt(data, '提交测试程序'), 'error');
                }
            });
        },
        ReworkSpecialProgram: function (ProblemId, Language) {
            var url = "/ProblemWriter/ReworkSpecialProgram";
            $.post(url, {
                'Id': ProblemId,
                'SpecialProgramLanguage': Language,
                'SpecialProgram': AceEditor.GetValue(),
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.SweetAlertReload('提交特判程序', '特判程序提交成功。', 'success');
                }
                else {
                    Tools.SweetAlert('提交特判程序', NodPostTool.ErrorPrompt(data, '提交特判程序'), 'error');
                }
            });
        },
        DeleteSpecialProgram: function (ProblemId) {
            var url = "/ProblemWriter/DeleteSpecialProgram";
            $.post(url, {
                'Id': ProblemId,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('删除特判程序', '特判程序删除成功。', true);
                    AceEditor.ClearValue();
                }
                else {
                    Tools.ToastrError('删除特判程序', NodPostTool.ErrorPrompt(data, '删除特判程序'));
                }
            });
        },
        ReworkTestUser: function (ProblemView, TestUserId) {
            var url = "/ProblemWriter/ReworkTestUser";
            $.post(url, {
                'Id': ProblemView.Id,
                'TestUserId': TestUserId,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('选择验题人', '选择验题人成功。', true, true);
                }
                else {
                    Tools.ToastrError('选择验题人', NodPostTool.ErrorPrompt(data, '选择验题人'));
                }
            });
        },
        ReworkSolution: function (Problem) {
            var url = "/ProblemWriter/ReworkSolution";
            $.post(url, {
                'Id': Problem.Id,
                'Solution': Tools['ProblemSolutionCKEditor'].getData(),
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('修改题解', '修改题解成功。', true);
                }
                else {
                    Tools.ToastrError('修改题解', NodPostTool.ErrorPrompt(data, '修改题解'));
                }
            });
        },
        SetPay: function (Id, IsPay) {
            var url = "/ProblemWriter/SetPay";
            $.post(url, {
                'Id': Id,
                'IsPay': IsPay,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('设置题目付款类型', '设置题目付款类型成功。', true);
                }
                else {
                    Tools.ToastrError('设置题目付款类型', NodPostTool.ErrorPrompt(data, '设置题目付款类型'));
                }
            });
        },
        SetPayArray: function (Ids, Flag) {
            var url = "/ProblemWriter/SetPayArray";
            $.post(url, {
                'Ids': Ids,
                'Bdata': Flag,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('批量设置题目付款类型', '批量设置题目付款类型成功' + data + '个。', true);
                }
                else {
                    Tools.ToastrError('批量设置题目付款类型', NodPostTool.ErrorPrompt(data, '批量设置题目付款类型'));
                }
            });
        },
        SetReview: function (Id, IsReview) {
            var url = "/ProblemWriter/SetReview";
            $.post(url, {
                'Id': Id,
                'IsReview': IsReview,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('设置题目审核类型', '设置题目审核类型成功。', true);
                }
                else {
                    Tools.ToastrError('设置题目审核类型', NodPostTool.ErrorPrompt(data, '设置题目审核类型'));
                }
            });
        },
        SetReviewArray: function (Ids, Flag) {
            var url = "/ProblemWriter/SetReviewArray";
            $.post(url, {
                'Ids': Ids,
                'Bdata': Flag,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('批量设置题目审核类型', '批量设置题目审核类型成功' + data + '个。', true);
                }
                else {
                    Tools.ToastrError('批量设置题目审核类型', NodPostTool.ErrorPrompt(data, '批量设置题目审核类型'));
                }
            });
        },
        SetShow: function (Id, ShowType) {
            var url = "/ProblemWriter/SetShow";
            $.post(url, {
                'Id': Id,
                'ShowType': ShowType,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('设置题目发布类型', '设置题目发布类型成功。', true);
                }
                else {
                    Tools.ToastrError('设置题目发布类型', NodPostTool.ErrorPrompt(data, '设置题目发布类型'));
                }
            });
        },
        SetShowArray: function (Ids, Type) {
            var url = "/ProblemWriter/SetShowArray";
            $.post(url, {
                'Ids': Ids,
                'Idata': Type,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('批量设置题目发布类型', '批量设置题目发布类型成功' + data + '个。', true);
                }
                else {
                    Tools.ToastrError('批量设置题目发布类型', NodPostTool.ErrorPrompt(data, '批量设置题目发布类型'));
                }
            });
        },
        SetProblemType: function (Id, ProblemType) {
            var url = "/ProblemWriter/SetProblemType";
            $.post(url, {
                'Id': Id,
                'ProblemType': ProblemType,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('设置题目类型', '设置题目类型成功。', true);
                }
                else {
                    Tools.ToastrError('设置题目类型', NodPostTool.ErrorPrompt(data, '设置题目类型'));
                }
            });
        },
        SetProblemTypeArray: function (Ids, ProblemType) {
            var url = "/ProblemWriter/SetProblemTypeArray";
            $.post(url, {
                'Ids': Ids,
                'Idata': ProblemType,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('批量设置题目类型', '批量设置题目类型成功' + data + '个。', true);
                }
                else {
                    Tools.ToastrError('批量设置题目类型', NodPostTool.ErrorPrompt(data, '批量设置题目类型'));
                }
            });
        },
        AutoShow: function (Ticks, Ids) {
            var url = "/ProblemWriter/AutoShow";
            $.post(url, {
                'Ids': Ids,
                'Ldata': new Date(Ticks).getTime(),
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('设置题目自动发布', '设置题目自动发布成功。', true);
                }
                else {
                    Tools.ToastrError('设置题目自动发布', NodPostTool.ErrorPrompt(data, '设置题目自动发布'));
                }
            });
        },
        AutoShowArray: function (Ticks, Ids) {
            var url = "/ProblemWriter/AutoShowArray";
            $.post(url, {
                'Ids': Ids,
                'Ldata': new Date(Ticks).getTime(),
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('批量设置题目自动发布', '批量设置题目自动发布成功。', true);
                }
                else {
                    Tools.ToastrError('批量设置题目自动发布', NodPostTool.ErrorPrompt(data, '批量设置题目自动发布'));
                }
            });
        },
    },
    ProblemGroup: {
        Append: function (NewProblemGroup) {
            var url = "/ProblemGroupWriter/Append";
            $.post(url, {
                'Title': NewProblemGroup.Title,
                'GroupType': NewProblemGroup.GroupType,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('添加题目集合', '题目集合添加成功。', true);
                }
                else {
                    Tools.ToastrError('添加题目集合', NodPostTool.ErrorPrompt(data, '添加题目集合'));
                }
            });
        },
        Rework: function (ProblemGroup) {
            var url = "/ProblemGroupWriter/Rework";
            $.post(url, {
                'Id': ProblemGroup.Id,
                'Title': ProblemGroup.Title,
                'GroupType': ProblemGroup.GroupType,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('修改题目集合', '修改题目集合成功。', true, true);
                }
                else {
                    Tools.ToastrError('修改题目集合', NodPostTool.ErrorPrompt(data, '修改题目集合'));
                }
            });
        },
        Delete: function (Id) {
            var url = "/ProblemGroupWriter/Delete";
            $.post(url, {
                'Id': Id,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('删除题目集合', '删除题目集合成功。', true);
                }
                else {
                    Tools.ToastrError('删除题目集合', NodPostTool.ErrorPrompt(data, '删除题目集合'));
                }
            });
        },
    },
    ProblemGroups: {
        Append: function (ProblemGroupId, ProblemId) {
            var url = "/ProblemGroupsWriter/Append";
            $.post(url, {
                'ProblemGroupId': ProblemGroupId,
                'ProblemId': ProblemId,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('添加题目', '添加题目成功。', true);
                }
                else {
                    Tools.ToastrError('添加题目', NodPostTool.ErrorPrompt(data, '添加题目'));
                }
            });
        },
        Delete: function (ProblemGroupId, ProblemId) {
            var url = "/ProblemGroupsWriter/Delete";
            $.post(url, {
                'ProblemGroupId': ProblemGroupId,
                'ProblemId': ProblemId,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('删除题目', '删除题目成功。', true);
                }
                else {
                    Tools.ToastrError('删除题目', NodPostTool.ErrorPrompt(data, '删除题目'));
                }
            });
        },
    },
    ProblemOwner: {
        Append: function (ProblemId, User) {
            var url = "/ProblemOwnerWriter/Append";
            $.post(url, {
                'ProblemId': ProblemId,
                'UserId': User.Id,
                'CanSubmit': User.CanSubmit,
                'CanSolution': User.CanSolution,
                'CanDownloadZip': User.CanDownloadZip,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('添加题目管理者', '添加题目管理者成功。', true);
                }
                else {
                    Tools.ToastrError('添加题目管理者', NodPostTool.ErrorPrompt(data, '添加题目管理者'));
                }
            });
        },
        Rework: function (ProblemOwner) {
            var url = "/ProblemOwnerWriter/Rework";
            $.post(url, {
                'Id': ProblemOwner.Id,
                'ProblemId': ProblemOwner.ProblemId,
                'UserId': ProblemOwner.UserId,
                'CanSubmit': ProblemOwner.CanSubmit,
                'CanSolution': ProblemOwner.CanSolution,
                'CanDownloadZip': ProblemOwner.CanDownloadZip,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('修改题目管理者权限', '修改题目管理者权限成功。', true, true);
                }
                else {
                    Tools.ToastrError('修改题目管理者权限', NodPostTool.ErrorPrompt(data, '修改题目管理者权限'));
                }
            });
        },
        Delete: function (ProblemOwnerId) {
            var url = "/ProblemOwnerWriter/Delete";
            $.post(url, {
                'Id': ProblemOwnerId,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('删除题目管理者', '删除题目管理者成功。', true);
                }
                else {
                    Tools.ToastrError('删除题目管理者', NodPostTool.ErrorPrompt(data, '删除题目管理者'));
                }
            });
        },
    },
    ProblemTestData: {
        Save: function (TempTestData, ProblemId) {
            var url = "/ProblemTestDataWriter/Save";
            $.post(url, {
                'TestId': TempTestData.TestId,
                'ProblemId': ProblemId,
                'Input': TempTestData.Input,
                'Output': TempTestData.Output,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('保存数据', '保存数据成功。', true);
                }
                else {
                    Tools.ToastrError('保存数据', NodPostTool.ErrorPrompt(data, '保存数据'));
                }
            });
        },
        ClearOutput: function (TestId, ProblemId) {
            var url = "/ProblemTestDataWriter/ClearOutput";
            $.post(url, {
                'TestId': TestId,
                'ProblemId': ProblemId,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('清空Output', '清空Output成功。', true);
                }
                else {
                    Tools.ToastrError('清空Output', NodPostTool.ErrorPrompt(data, '清空Output'));
                }
            });
        },
        Delete: function (Ids) {
            var url = "/ProblemTestDataWriter/Delete";
            if (typeof (Ids) === 'number') {
                $.post(url, {
                    'Id': Ids,
                }, function (data, status) {
                    if (NodPostTool.OpSucceed(data)) {
                        Tools.ToastrSuccess('删除测试数据', '测试数据删除成功。', true);
                    }
                    else {
                        Tools.ToastrError('删除测试数据', NodPostTool.ErrorPrompt(data, '删除测试数据'));
                    }
                });
            }
            else {
                var fail = 0, succeed = 0;
                for (var i in Ids) {
                    $.post(url, {
                        'Id': Ids[i],
                    }, function (data, status) {
                        if (NodPostTool.OpSucceed(data)) succeed++;
                        else fail++;
                        if (succeed + fail === Ids.length) {
                            if (fail === 0)
                                Tools.ToastrSuccess('批量删除测试数据', '测试数据批量删除成功。', true);
                            else
                                Tools.ToastrError('批量删除测试数据', '测试数据批量删除失败 ' + fail + '个，请稍后重试。', true);
                        }
                    });
                }
            }
        },
        GenOutput: function (TempTestDataId) {
            var url = "/ProblemTestDataWriter/GenOutput";
            $.post(url, {
                'Id': TempTestDataId,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('生成输出数据', '生成输出数据成功。', true);
                }
                else {
                    Tools.ToastrError('生成输出数据', NodPostTool.ErrorPrompt(data, '生成输出数据'));
                }
            });
        },
        GenOutputArray: function (TempTestDataIds) {
            var url = "/ProblemTestDataWriter/GenOutputArray";
            $.post(url, {
                'Ids': TempTestDataIds,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.SweetAlertReload('批量生成输出数据', '批量生成输出数据成功。', 'success');
                }
                else {
                    Tools.ToastrError('批量生成输出数据', NodPostTool.ErrorPrompt(data, '批量生成输出数据'));
                }
            });
        },
    },
    Product: {
        Append: function (Product) {
            var url = "/ProductWriter/Append";
            $.post(url, {
                'Title': Product.Title,
                'Price': parseFloat(Product.Price) * 100,
                'Description': Tools['ProductDescriptionCKEditor'].getData(),
                'EndDescription': Tools['ProductEndDescriptionCKEditor'].getData(),
                'Json': Product.Json,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.SweetAlertRedirect('创建产品', '创建产品成功。', 'success', Path.Path.Account.ProductEdit(data));
                }
                else {
                    Tools.SweetAlert('创建产品', NodPostTool.ErrorPrompt(data, '创建产品'), 'error');
                }
            });
        },
        Rework: function (Product) {
            var url = "/ProductWriter/Rework";
            $.post(url, {
                'Id': Product.Id,
                'Title': Product.Title,
                'Price': parseFloat(Product.Price) * 100,
                'Description': Tools['ProductDescriptionCKEditor'].getData(),
                'EndDescription': Tools['ProductEndDescriptionCKEditor'].getData(),
                'Json': Product.Json,
                'ShowType': Product.ShowType,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('修改产品', '修改产品成功。', true);
                }
                else {
                    Tools.ToastrError('修改产品', NodPostTool.ErrorPrompt(data, '修改产品'));
                }
            });
        },
        SetShowArray: function (Ids, Type) {
            var url = "/ProductWriter/SetShowArray";
            $.post(url, {
                'Ids': Ids,
                'Idata': Type,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('批量设置产品发布类型', '批量设置产品发布类型成功' + data + '个。', true);
                }
                else {
                    Tools.ToastrError('批量设置产品发布类型', NodPostTool.ErrorPrompt(data, '批量设置产品发布类型'));
                }
            });
        },
    },
    ProgramDraft: {
        Save: function (ProblemId, Content, Language) {
            var url = "/ProgramDraftWriter/Save";
            $.post(url, {
                'ProblemId': ProblemId,
                'Content': Content,
                'Language': Language
            });
        },
        SaveLazyDraft: function (ProblemId, Content, Language) {
            var url = "/ProgramDraftWriter/SaveLazyDraft";
            $.post(url, {
                'ProblemId': ProblemId,
                'Content': Content,
                'Language': Language
            });
        },
    },
    Question: {
        Append: function (QuestionDraft) {
            var url = "/QuestionWriter/Append";
            $.post(url, {
                'Title': QuestionDraft.Title,
                'Content': Tools['CreateQuestionCKEditor'].getData(),
                'Reward': QuestionDraft.Reward,
                'RewardPoint': QuestionDraft.RewardPoint,
                'Valid': QuestionDraft.Valid,
                'Anonymous': QuestionDraft.Anonymous
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    var url = "/QuestionDraftWriter/Clear";
                    $.post(url, {
                        'Id': 0
                    });
                    Tools.SweetAlertRedirect('添加问题', '您的问题添加成功。', 'success', Path.Path.Question.Index(data));
                }
                else {
                    Tools.SweetAlert('添加问题', NodPostTool.ErrorPrompt(data, '添加问题'), 'error');
                }
            });
        },
        Rework: function (Question) {
            var url = "/QuestionWriter/Rework";
            $.post(url, {
                'Id': Question.Id,
                'Title': Question.Title,
                'Content': Tools['QuestionEditCKEditor'].getData()
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('修改问题', '修改问题成功。', true, true);
                }
                else {
                    Tools.ToastrError('修改问题', NodPostTool.ErrorPrompt(data, '修改问题'));
                }
            });
        },
        AdminRework: function (Question) {
            var url = "/QuestionWriter/AdminRework";
            $.post(url, {
                'Id': Question.Id,
                'Title': Question.Title,
                'Content': Tools['QuestionEditCKEditor'].getData(),
                'ShowType': Question.ShowType,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('修改问题', '修改问题成功。', true);
                }
                else {
                    Tools.ToastrError('修改问题', NodPostTool.ErrorPrompt(data, '修改问题'));
                }
            });
        },
        ReworkEnd: function (questionId) {
            var url = "/QuestionWriter/ReworkEnd";
            $.post(url, {
                'Id': questionId,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('结束问题悬赏', '结束问题悬赏成功。', true);
                }
                else {
                    Tools.ToastrError('结束问题悬赏', NodPostTool.ErrorPrompt(data, '结束问题悬赏'));
                }
            });
        },
        SetShow: function (questionId, showType) {
            var url = "/QuestionWriter/SetShow";
            $.post(url, {
                'Id': questionId,
                'ShowType': showType,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('修改问题显示', '修改问题显示成功。', true);
                }
                else {
                    Tools.ToastrError('修改问题显示', NodPostTool.ErrorPrompt(data, '修改问题显示'));
                }
            });
        },
    },
    QuestionDraft: {
        Save: function (QuestionDraft) {
            var url = "/QuestionDraftWriter/Save";
            QuestionDraft.Content = Tools['CreateQuestionCKEditor'].getData();
            $.post(url, {
                'Title': QuestionDraft.Title,
                'Content': Tools['CreateQuestionCKEditor'].getData(),
                'Reward': QuestionDraft.Reward,
                'RewardPoint': QuestionDraft.RewardPoint,
                'Valid': QuestionDraft.Valid,
                'Anonymous': QuestionDraft.Anonymous
            });
        },
    },
    QuestionReviewer: {
        Rework: function (Type, QuestionId, AnswerId) {
            var url = "/QuestionReviewerWriter/Rework";
            var FriendId = 0;
            if (Type === NodEnum.ReviewerOperateEnum.ToFriend.Index)
                FriendId = $('#SearchReviewerId').val();
            $.post(url, {
                'Type': Type,
                'QuestionId': QuestionId,
                'AnswerId': AnswerId,
                'FriendId': FriendId
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('评审问题', '评审问题成功。', true);
                }
                else {
                    if (Type === NodEnum.ReviewerOperateEnum.Answer.Index)
                        Tools.ToastrError('问题评审', NodPostTool.ErrorPrompt(data, '设置最佳回答'));
                    else if (Type === NodEnum.ReviewerOperateEnum.NoAnswer.Index)
                        Tools.ToastrError('问题评审', NodPostTool.ErrorPrompt(data, '认为没有最佳回答'));
                    else if (Type === NodEnum.ReviewerOperateEnum.ToFriend.Index)
                        Tools.ToastrError('问题评审', NodPostTool.ErrorPrompt(data, '转让问题评审'));
                    else if (Type === NodEnum.ReviewerOperateEnum.Cancel.Index)
                        Tools.ToastrError('问题评审', NodPostTool.ErrorPrompt(data, '放弃问题评审'));
                }
            });
        },
    },
    School: {
        Append: function (School) {
            var url = "/SchoolWriter/Append";
            $.post(url, {
                'Title': School.Title,
                'Icon': $('#uploadInputSimple').val(),
                'Content': Tools['SchoolContentCKEditor'].getData(),
                'Detail': School._Detail,
                'Province': School.Province,
                'Code': School.Code,
                'IsOpen': School.IsOpen,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.SweetAlertRedirect('创建学校', '学校创建成功。', 'success', Path.Path.School.SchoolEdit(data));
                }
                else {
                    Tools.SweetAlert('创建学校', NodPostTool.ErrorPrompt(data, '创建学校'), 'error');
                }
            });
        },
        AdminAppend: function (School) {
            var url = "/SchoolWriter/AdminAppend";
            $.post(url, {
                'Title': School.Title,
                'Icon': $('#uploadInputSimple').val(),
                'Content': Tools['SchoolContentCKEditor'].getData(),
                'Detail': School._Detail,
                'Province': School.Province,
                'IsOpen': School.IsOpen,
                'Code': School.Code,
                'UserId': School.UserId,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.SweetAlertRedirect('创建学校', '学校创建成功。', 'success', Path.Path.School.SchoolEdit(data));
                }
                else {
                    Tools.SweetAlert('创建学校', NodPostTool.ErrorPrompt(data, '创建学校'), 'error');
                }
            });
        },
        Rework: function (School) {
            var url = "/SchoolWriter/Rework";
            $.post(url, {
                'Id': School.Id,
                'Icon': $('#uploadInputSimple').val(),
                'Detail': School._Detail,
                'IsOpen': School.IsOpen,
                //'Content': Tools['SchoolContentCKEditor'].getData(),
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('修改学校', '学校修改成功。', true);
                }
                else {
                    Tools.ToastrError('修改学校', NodPostTool.ErrorPrompt(data, '修改学校'));
                }
            });
        },
        AdminRework: function (School) {
            var url = "/SchoolWriter/AdminRework";
            $.post(url, {
                'Id': School.Id,
                'Title': School.Title,
                'Icon': $('#uploadInputSimple').val(),
                'Content': Tools['SchoolContentCKEditor'].getData(),
                'Detail': School._Detail,
                'Province': School.Province,
                'IsOpen': School.IsOpen,
                'Code': School.Code,
                'UserId': School.UserId,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('修改学校', '学校修改成功。', true);
                }
                else {
                    Tools.ToastrError('修改学校', NodPostTool.ErrorPrompt(data, '修改学校'));
                }
            });
        },
        ReworkReview: function (School) {
            var url = "/SchoolWriter/ReworkReview";
            $.post(url, {
                'Id': School.Id,
                'ReviewState': School.ReviewState,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('修改审核状态', '修改审核状态成功。', true);
                }
                else {
                    Tools.ToastrError('修改审核状态', NodPostTool.ErrorPrompt(data, '修改审核状态'));
                }
            });
        },
        AppendUser: function (UserId, SchoolId) {
            var url = "/SchoolWriter/AppendUser";
            $.post(url, {
                'Id': UserId,
                'SchoolId': SchoolId,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('添加学生', '学生添加成功。', true, true);
                }
                else {
                    Tools.ToastrError('添加学生', NodPostTool.ErrorPrompt(data, '添加学生'));
                }
            });
        },
        DeleteUser: function (UserId, SchoolId) {
            var url = "/SchoolWriter/DeleteUser";
            $.post(url, {
                'Id': UserId,
                'SchoolId': SchoolId,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('删除学生', '删除学生成功。', true);
                }
                else {
                    Tools.ToastrError('删除学生', NodPostTool.ErrorPrompt(data, '删除学生'));
                }
            });
        },
        DeleteOwn: function (UserId, SchoolId) {
            var url = "/SchoolWriter/DeleteUser";
            $.post(url, {
                'Id': UserId,
                'SchoolId': SchoolId,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('退出学校', '退出学校成功。', true);
                }
                else {
                    Tools.ToastrError('退出学校', NodPostTool.ErrorPrompt(data, '退出学校'));
                }
            });
        },
    },
    SchoolAccount: {
        AdminAppend: function (Amount, Ids) {
            var url = "/SchoolAccountWriter/AdminAppend";
            $.post(url, {
                'Idata': Amount,
                'Ids': Ids,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('调整学校余额', '调整学校余额成功。', true);
                }
                else {
                    Tools.ToastrError('调整学校余额', '调整学校余额失败，请稍后重试。');
                }
            });
        },
    },
    SchoolApply: {
        SubmitRequest: function (SchoolApply) {
            var url = "/SchoolApplyWriter/SubmitRequest";
            $.post(url, {
                'Id': SchoolApply.Id,
                'Content': SchoolApply.Content,
                'SchoolId': SchoolApply.SchoolId,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('提交入学申请', '提交入学申请成功。', true);
                }
                else {
                    Tools.ToastrError('提交入学申请', NodPostTool.ErrorPrompt(data, '提交入学申请'));
                }
            });
        },
        CancelRequest: function (SchoolApply) {
            var url = "/SchoolApplyWriter/CancelRequest";
            $.post(url, {
                'Id': SchoolApply.Id,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('取消入学申请', '取消入学申请成功。', true);
                }
                else {
                    Tools.ToastrError('取消入学申请', NodPostTool.ErrorPrompt(data, '取消入学申请'));
                }
            });
        },
        Accepted: function (SchoolApply) {
            var url = "/SchoolApplyWriter/Accepted";
            $.post(url, {
                'Id': SchoolApply.Id,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('通过入学申请', '通过入学申请成功。', true);
                }
                else {
                    Tools.ToastrError('通过入学申请', NodPostTool.ErrorPrompt(data, '通过入学申请'));
                }
            });
        },
        Refuse: function (SchoolApply) {
            var url = "/SchoolApplyWriter/Refuse";
            $.post(url, {
                'Id': SchoolApply.Id,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('拒绝入学申请', '拒绝入学申请成功。', true);
                }
                else {
                    Tools.ToastrError('拒绝入学申请', NodPostTool.ErrorPrompt(data, '拒绝入学申请'));
                }
            });
        },
    },
    SchoolAuthority: {
        Rework: function (SchoolAuthorityPost) {
            var url = "/SchoolAuthorityWriter/Rework";
            $.post(url, {
                'Id': SchoolAuthorityPost.Id,
                'MaxUser': SchoolAuthorityPost.MaxUser,
                'AuthorityLevel': SchoolAuthorityPost.AuthorityLevel,
                'ExpiredTime': new Date(SchoolAuthorityPost.ExpiredTime).getTime(),
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('修改学校权限', '学校权限修改成功。', true);
                }
                else {
                    Tools.ToastrError('修改学校权限', NodPostTool.ErrorPrompt(data, '修改学校权限'));
                }
            });
        },
        ReworkArray: function (SchoolAuthority, Ids) {
            var url = "/SchoolAuthorityWriter/ReworkArray";
            $.post(url, {
                'Ids': Ids,
                'Idata': SchoolAuthority.MaxUser,
                'Content': SchoolAuthority.AuthorityLevel,
                'Ldata': new Date(SchoolAuthority.ExpiredTime).getTime(),
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('修改学校权限', '学校权限修改成功。', true);
                }
                else {
                    Tools.ToastrError('修改学校权限', NodPostTool.ErrorPrompt(data, '修改学校权限'));
                }
            });
        },
    },
    SchoolOwner: {
        AppendUser: function (SchoolId, UserId) {
            var url = "/SchoolOwnerWriter/AppendUser";
            $.post(url, {
                'SchoolId': SchoolId,
                'UserId': UserId,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('添加学校管理者', '添加学校管理者成功。', true);
                }
                else {
                    Tools.ToastrError('添加学校管理者', NodPostTool.ErrorPrompt(data, '添加学校管理者'));
                }
            });
        },
        Delete: function (SchoolId, UserId) {
            var url = "/SchoolOwnerWriter/Delete";
            $.post(url, {
                'SchoolId': SchoolId,
                'UserId': UserId,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('删除学校管理者', '删除学校管理者成功。', true);
                }
                else {
                    Tools.ToastrError('删除学校管理者', NodPostTool.ErrorPrompt(data, '删除学校管理者'));
                }
            });
        },
    },
    SchoolUser: {
        AdminAppendArray: function (ClassId, UserIds) {
            var url = "/SchoolUserWriter/AdminAppendArray";
            $.post(url, {
                'Ids': UserIds,
                'Idata': ClassId,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('批量添加学生', '批量添加学生成功' + data + '个。', true, true);
                }
                else {
                    Tools.ToastrError('批量添加学生', NodPostTool.ErrorPrompt(data, '批量添加学生'));
                }
            });
        },
    },
    Storm: {
        Append: function (Storm) {
            var url = "/StormWriter/Append";
            $.post(url, {
                'Title': Storm.Title,
                'Json': Storm.Json,
                'VideoId': Storm.VideoId,
                'Content': Tools['StormContentCKEditor'].getData(),
                'Solution': Tools['StormSolutionCKEditor'].getData(),
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.SweetAlertRedirect('创建头脑风暴', '创建头脑风暴成功。', 'success', Path.Path.Tutorial.StormEdit(data));
                }
                else {
                    Tools.ToastrError('创建头脑风暴', NodPostTool.ErrorPrompt(data, '创建头脑风暴'));
                }
            });
        },
        Rework: function (Storm) {
            var url = "/StormWriter/Rework";
            $.post(url, {
                'Id': Storm.Id,
                'Title': Storm.Title,
                'Json': Storm.Json,
                'VideoId': Storm.VideoId,
                'Content': Tools['StormContentCKEditor'].getData(),
                'Solution': Tools['StormSolutionCKEditor'].getData(),
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('修改头脑风暴', '修改头脑风暴成功。', true);
                }
                else {
                    Tools.ToastrError('修改头脑风暴', NodPostTool.ErrorPrompt(data, '修改头脑风暴'));
                }
            });
        },
    },
    Textbook: {
        Append: function (Textbook) {
            var url = "/TextbookWriter/Append";
            $.post(url, {
                'Tags': Textbook.Tags,
                'Title': Textbook.Title,
                'Icon': $('#uploadInputSimple').val(),
                'Content': Tools['TextbookContentCKEditor'].getData(),
                'AuthorityLevel': Textbook.AuthorityLevel,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.SweetAlertRedirect('创建课程', '课程创建成功。', 'success', Path.Path.Course.TextbookEdit(data));
                }
                else {
                    Tools.SweetAlert('创建课程', NodPostTool.ErrorPrompt(data, '创建课程'), 'error');
                }
            });
        },
        Rework: function (Textbook) {
            var url = "/TextbookWriter/Rework";
            $.post(url, {
                'Id': Textbook.Id,
                'Tags': Textbook.Tags,
                'Title': Textbook.Title,
                'Icon': $('#uploadInputSimple').val(),
                'Content': Tools['TextbookContentCKEditor'].getData(),
                'AuthorityLevel': Textbook.AuthorityLevel,
                'Level': Textbook.Level,
                'ShowType': Textbook.ShowType,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('修改课程', '修改课程成功。', true);
                }
                else {
                    Tools.ToastrError('修改课程', NodPostTool.ErrorPrompt(data, '修改课程'));
                }
            });
        },
        SetShow: function (Id, ShowType) {
            var url = "/TextbookWriter/SetShow";
            $.post(url, {
                'Id': Id,
                'ShowType': ShowType,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('设置课程发布类型', '设置课程发布类型成功。', true);
                }
                else {
                    Tools.ToastrError('设置课程发布类型', NodPostTool.ErrorPrompt(data, '设置课程发布类型'));
                }
            });
        },
        SetShowArray: function (Ids, Type) {
            var url = "/TextbookWriter/SetShowArray";
            $.post(url, {
                'Ids': Ids,
                'Idata': Type,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('批量设置课程发布类型', '批量设置课程发布类型成功' + data + '个。', true);
                }
                else {
                    Tools.ToastrError('批量设置课程发布类型', NodPostTool.ErrorPrompt(data, '批量设置课程发布类型'));
                }
            });
        },
    },
    TextbookChapter: {
        Save: function (TextbookId, NewChapter) {
            var url = "/TextbookChapterWriter/Save";
            $.post(url, {
                'TextbookId': TextbookId,
                'ChapterId': NewChapter.Id,
                'SortId': NewChapter.SortId,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('保存章节设置', '保存章节设置成功。', true);
                }
                else {
                    Tools.ToastrError('保存章节设置', NodPostTool.ErrorPrompt(data, '保存章节设置'));
                }
            });
        },
        //CopyAppend: function (TextbookId, TargetTextbook) {
        //    var url = "/TextbookChapterWriter/Append";
        //    var fail = 0, succeed = 0;
        //    for (var i = 0; i < TargetTextbook.CourseIds.length; i++) {
        //        $.post(url, {
        //            'TextbookId': TextbookId,
        //            'CourseId': TargetTextbook.CourseIds[i],
        //            'SortId': TargetTextbook.CourseSortIds[i],
        //        }, function (data, status) {
        //            if (NodPostTool.OpSucceed(data)) succeed++;
        //            else fail++;

        //            if (succeed + fail === TargetTextbook.CourseIds.length) {
        //                if (fail === 0)
        //                    Tools.ToastrSuccess('批量添加章节', '章节批量添加成功。', true, true);
        //                else
        //                    Tools.ToastrError('批量添加章节', '章节批量添加失败 ' + fail + '个，请稍后重试。', true);
        //            }
        //        });
        //    }
        //},
        Delete: function (Ids) {
            var url = "/TextbookChapterWriter/Delete";
            if (typeof (Ids) === 'number') {
                $.post(url, {
                    'Id': Ids,
                }, function (data, status) {
                    if (NodPostTool.OpSucceed(data)) {
                        Tools.ToastrSuccess('删除章节', '删除章节成功。', true);
                    }
                    else {
                        Tools.ToastrError('删除章节', NodPostTool.ErrorPrompt(data, '删除章节'));
                    }
                });
            }
            else {
                var fail = 0, succeed = 0;
                for (var i in Ids) {
                    $.post(url, {
                        'Id': Ids[i],
                    }, function (data, status) {
                        if (NodPostTool.OpSucceed(data)) succeed++;
                        else fail++;
                        if (succeed + fail === Ids.length) {
                            if (fail === 0)
                                Tools.ToastrSuccess('批量删除章节', '章节批量删除成功。', true);
                            else
                                Tools.ToastrError('批量删除章节', '章节批量删除失败 ' + fail + '个，请稍后重试。', true);
                        }
                    });
                }
            }
        },
    },
    Tools: {
        ReJudgeArray: function (ReJudge, type) {
            if (sEmpty(ReJudge.StartId) || sEmpty(ReJudge.EndId)) {
                Tools.ToastrError('批量ReJudge', '起止ID不可为空。');
                return;
            }
            var url = '/ToolsWriter/ReJudgeArray';
            $.get(url, {
                'startId': ReJudge.StartId,
                'endId': ReJudge.EndId,
                'type': type,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('批量ReJudge', '批量ReJudge成功。', true);
                }
                else {
                    Tools.ToastrError('批量ReJudge', NodPostTool.ErrorPrompt(data, '批量ReJudge'));
                }
            });
        },
        SendMail: function (Mail, TargetType) {
            var url = '/ToolsWriter/SendMail';
            $.post(url, {
                'Title': Mail.Title,
                'Content': Mail.Content,
                'Data': Mail.Data,
                'TargetType': TargetType,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    //这个页面发送成功也不刷新
                    Tools.ToastrSuccess('邮件发送', '邮件发送成功。');
                }
                else {
                    Tools.ToastrError('邮件发送', NodPostTool.ErrorPrompt(data, '邮件发送'));
                }
            });
        },
        SendSms: function (Mail, TargetType) {
            var url = '/ToolsWriter/SendSms';
            $.post(url, {
                'Title': Mail.Title,
                'Content': Mail.Content,
                'Data': Mail.Data,
                'TargetType': TargetType,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    //这个页面发送成功也不刷新
                    Tools.ToastrSuccess('短信发送', '短信发送成功' + data + '条。');
                }
                else {
                    Tools.ToastrError('短信发送', NodPostTool.ErrorPrompt(data, '短信发送'));
                }
            });
        },
    },
    Topic: {
        Append: function (Title) {
            var url = "/TopicWriter/Append";
            $.post(url, {
                'Title': Title
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    var newOption = new Option(Title, data, false, true);
                    $('#mySelect').append(newOption).trigger('change');
                }
                else {
                    Tools.ToastrError('添加话题', NodPostTool.ErrorPrompt(data, '添加话题'));
                }
            });
        },
        Rework: function (TopicView, Type) {
            var url = '/' + Type + 'TopicWriter/Rework';
            $.post(url, {
                'LinkId': TopicView.Id,
                'Topic': $('#mySelect').val()
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Getter.RemoteGet(TopicView);
                }
                else {
                    Tools.ToastrError('修改话题', NodPostTool.ErrorPrompt(data, '修改话题'));
                }
            });
        },
    },
    Training: {
        Append: function (Training) {
            var url = "/TrainingWriter/Append";
            $.post(url, {
                'Title': Training.Title,
                'Icon': $('#uploadInputSimple').val(),
                'Description': Tools['TrainingDescriptionCKEditor'].getData(),
                'Json': Training.Json,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.SweetAlertRedirect('添加训练', '添加训练成功。', 'success', Path.Path.Training.TrainingEdit(data));
                }
                else {
                    Tools.SweetAlert('添加训练', NodPostTool.ErrorPrompt(data, '添加训练'), 'error');
                }
            });
        },
        Rework: function (Training) {
            var url = "/TrainingWriter/Rework";
            $.post(url, {
                'Id': Training.Id,
                'Title': Training.Title,
                'Icon': $('#uploadInputSimple').val(),
                'Description': Tools['TrainingDescriptionCKEditor'].getData(),
                'Json': Training.Json,
                'ShowType': Training.ShowType,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('修改训练', '修改训练成功。', true);
                }
                else {
                    Tools.ToastrError('修改训练', NodPostTool.ErrorPrompt(data, '修改训练'));
                }
            });
        },
    },
    TrainingLevel: {
        Append: function (TrainingLevel) {
            var url = "/TrainingLevelWriter/Append";
            $.post(url, {
                'Title': TrainingLevel.Title,
                'LevelName': TrainingLevel.LevelName,
                'TrainingId': TrainingLevel.TrainingId,
                'CertIcon': $('#uploadInputSimple').val(),
                'CertContent': Tools['TrainingCertContentCKEditor'].getData(),
                'SortId': TrainingLevel.SortId,
                'GroupId': TrainingLevel.GroupId,
                'MaxScore': TrainingLevel.MaxScore,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.SweetAlertRedirect('添加训练等级', '添加训练等级成功。', 'success', Path.Path.Training.TrainingLevelEdit(data));
                }
                else {
                    Tools.SweetAlert('添加训练等级', NodPostTool.ErrorPrompt(data, '添加训练等级'), 'error');
                }
            });
        },
        Rework: function (TrainingLevel) {
            var url = "/TrainingLevelWriter/Rework";
            $.post(url, {
                'Id': TrainingLevel.Id,
                'Title': TrainingLevel.Title,
                'LevelName': TrainingLevel.LevelName,
                'TrainingId': TrainingLevel.TrainingId,
                'CertIcon': $('#uploadInputSimple').val(),
                'CertContent': Tools['TrainingCertContentCKEditor'].getData(),
                'SortId': TrainingLevel.SortId,
                'GroupId': TrainingLevel.GroupId,
                'MaxScore': TrainingLevel.MaxScore,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('修改训练等级', '修改训练等级成功。', true);
                }
                else {
                    Tools.ToastrError('修改训练等级', NodPostTool.ErrorPrompt(data, '修改训练等级'));
                }
            });
        },
        ReworkTrainingId: function (TrainingLevelId, TrainingId, SortId) {
            var url = '/TrainingLevelWriter/ReworkTrainingId';
            $.post(url, {
                'Id': TrainingLevelId,
                'TrainingId': TrainingId,
                'SortId': SortId,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    if (TrainingId)
                        Tools.ToastrSuccess('增加分级', '增加分级成功。', true);
                    else
                        Tools.ToastrSuccess('删除分级', '删除分级成功。', true);
                }
                else {
                    if (TrainingId)
                        Tools.ToastrError('增加分级', NodPostTool.ErrorPrompt(data, '增加分级'));
                    else
                        Tools.ToastrError('删除分级', NodPostTool.ErrorPrompt(data, '删除分级'));
                }
            });
        },
    },
    TrainingUser: {
        Append: function (TrainingId) {
            var url = "/TrainingUserWriter/Append";
            $.post(url, {
                'TrainingId': TrainingId,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('开始评测', '开始评测成功。', true);
                }
                else {
                    Tools.ToastrError('开始评测', NodPostTool.ErrorPrompt(data, '开始评测'));
                }
            });
        },
        ChangeProblem: function (Id) {
            var url = "/TrainingUserWriter/ChangeProblem";
            $.post(url, {
                'Id': Id,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('更换题目', '更换题目成功。', true, true);
                }
                else {
                    Tools.ToastrError('更换题目', NodPostTool.ErrorPrompt(data, '更换题目'));
                }
            });
        },
    },
    Tutorial: {
        Append: function (Tutorial) {
            var url = "/TutorialWriter/Append";
            $.post(url, {
                'Tags': Tutorial.Tags,
                'Title': Tutorial.Title,
                'Icon': $('#uploadInputSimple').val(),
                'Content': Tools['TutorialContentCKEditor'].getData(),
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.SweetAlertRedirect('创建教程', '创建教程成功。', 'success', Path.Path.Tutorial.TutorialEdit(data));
                }
                else {
                    Tools.ToastrError('创建教程', NodPostTool.ErrorPrompt(data, '创建教程'));
                }
            });
        },
        Rework: function (Tutorial) {
            var url = "/TutorialWriter/Rework";
            $.post(url, {
                'Id': Tutorial.Id,
                'Tags': Tutorial.Tags,
                'Title': Tutorial.Title,
                'Icon': $('#uploadInputSimple').val(),
                'Content': Tools['TutorialContentCKEditor'].getData(),
                'ShowType': Tutorial.ShowType,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('修改教程', '修改教程成功。', true);
                }
                else {
                    Tools.ToastrError('修改教程', NodPostTool.ErrorPrompt(data, '修改教程'));
                }
            });
        },
    },
    TutorialChapter: {
        Save: function (TutorialId, Chapter) {
            var url = "/TutorialChapterWriter/Save";
            $.post(url, {
                'TutorialId': TutorialId,
                'ChapterId': Chapter.Id,
                'SortId': Chapter.SortId,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('保存章节设置', '保存章节设置成功。', true);
                }
                else {
                    Tools.ToastrError('保存章节设置', NodPostTool.ErrorPrompt(data, '保存章节设置'));
                }
            });
        },
        Delete: function (Ids) {
            var url = "/TutorialChapterWriter/Delete";
            if (typeof (Ids) === 'number') {
                $.post(url, { 'Id': Ids, }, function (data, status) {
                    if (NodPostTool.OpSucceed(data)) {
                        Tools.ToastrSuccess('删除章节', '章节删除成功。', true);
                    }
                    else {
                        Tools.ToastrError('删除章节', NodPostTool.ErrorPrompt(data, '删除章节'));
                    }
                });
            }
            else {
                var fail = 0, succeed = 0;
                for (var i in Ids) {
                    $.post(url, { 'Id': Ids[i], }, function (data, status) {
                        if (NodPostTool.OpSucceed(data)) succeed++; else fail++;
                        if (succeed + fail === Ids.length) {
                            if (fail === 0) Tools.ToastrSuccess('批量删除章节', '章节批量删除成功。', true);
                            else Tools.ToastrError('批量删除章节', '章节批量删除失败 ' + fail + '个，请稍后重试。', true);
                        }
                    });
                }
            }
        },
    },
    TutorialUser: {
        Append: function (TutorialId) {
            var url = "/TutorialUserWriter/Append";
            $.post(url, {
                'TutorialId': TutorialId
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('注册教程', '注册教程成功，请点击按钮开始学习。', true);
                    //window.location.href = Path.Path.Tutorial.Index(TutorialId);
                }
                else {
                    Tools.ToastrError('注册教程', NodPostTool.ErrorPrompt(data, '注册教程'));
                }
            });
        },
        Rework: function (TutorialId, UserView) {
            var url = "/TutorialUserWriter/Rework";
            $.post(url, {
                'TutorialId': TutorialId,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Getter.RemoteGet(UserView);
                }
                else {
                    Tools.ToastrError('学习教程', NodPostTool.ErrorPrompt(data, '网络通讯'));
                }
            });
        },
    },
    User: {
        Rework: function (Name, Remark, Description) {
            var url = "/UserWriter/Rework";
            $.post(url, {
                'Name': Name,
                'Remark': Remark,
                'Description': Description
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('修改基本信息', '修改基本信息成功。', true);
                }
                else {
                    Tools.ToastrError('修改基本信息', NodPostTool.ErrorPrompt(data, '修改基本信息'));
                }
            });
        },
        ReworkIcon: function () {
            var url = "/UserWriter/ReworkIcon";
            $.post(url, {
                'Icon': $('#uploadInputUser').val(),
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('修改头像', '修改头像成功。', true);
                }
                else {
                    Tools.ToastrError('修改头像', NodPostTool.ErrorPrompt(data, '修改头像'));
                }
            });
        },
        ReworkPermission: function (User) {
            var url = "/UserWriter/ReworkPermission";
            $.post(url, {
                'Id': User.Id,
                'Name': User.Name,
                'Type': User.Type,
                'Permission': User._Permission,
                'ContestDescription': User.ContestDescription,
                'AgentId': User.AgentId,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('修改用户信息', '修改用户信息成功。', true);
                }
                else {
                    Tools.ToastrError('修改用户信息', NodPostTool.ErrorPrompt(data, '修改用户信息'));
                }
            });
        },
        ReworkPassword: function (nowPassword, newPassword) {
            var url = "/UserWriter/ReworkPassword";
            $.post(url, {
                'NowPassword': RSAEncrypt(nowPassword),
                'NewPassword': RSAEncrypt(newPassword),
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('修改密码', '您的密码修改成功。', true);
                }
                else {
                    Tools.ToastrError('修改密码', NodPostTool.ErrorPrompt(data, '修改密码'));
                }
            });
        },
        ClearRegisterVerify: function (UserId) {
            var url = "/UserWriter/ClearRegisterVerify";
            $.post(url, {
                'Id': UserId,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('清空RegisterVerify', '清空RegisterVerify成功。', true);
                }
                else {
                    Tools.ToastrError('清空RegisterVerify', NodPostTool.ErrorPrompt(data, '清空RegisterVerify'));
                }
            });
        },
        //#region 登录
        Login: function (Username, Password, IsPersistent) {
            var url = "/UserWriter/Login";
            $.post(url, {
                'Username': Username,
                'Password': RSAEncrypt(Password),
                'IsPersistent': IsPersistent
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    if (window.location.pathname.toLocaleLowerCase() === '/login.html') {
                        if (window.location.search.length) {
                            var searchStrs = window.location.search.substring(1).split('&');
                            for (var item in searchStrs)
                                if (searchStrs[item].split('=')[0] === 'oldhref') {
                                    window.location.href = decodeURIComponent(searchStrs[item].split('=')[1]);
                                    break;
                                }
                        }
                        else window.location.href = Path.Path.Index();
                    }
                    else Tools.ToastrSuccess('登录', '登录成功!', true, true);
                }
                else Tools.ToastrError('登录', NodPostTool.ErrorPrompt(data, '登录'));
            });
        },
        LoginOut: function () {
            if (Tools.DelCookie('.ASPXAUTH', true)) window.location.href = Path.Path.Login();
        },
        SendLoginMobiCode: function (Mobile, Captcha) {
            if (sEmpty(Mobile) || sEmpty(Captcha)) {
                Tools.ToastrError('发送登录短信', '手机、计算验证不可为空。');
                return;
            }
            var url = "/UserWriter/SendLoginMobiCode";
            $.get(url, {
                'mobile': Mobile,
                'key': Scope.PageKey,
                'captcha': Captcha,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('发送登录短信', '发送登录短信成功，请查看短信获得验证码！', false, true);
                    Scope.$apply(function () { Scope.CaptchaTurn = Scope.CaptchaRandom; });
                }
                else {
                    Scope.$apply(function () { Scope.CaptchaRandom = Scope.CaptchaRandom + 1; });
                    Tools.ToastrError('发送登录短信', NodPostTool.ErrorPrompt(data, '发送登录短信'));
                }
            });
        },
        SubmitLoginMobiCode: function (Mobile, VerifyCode, IsPersistent) {
            var url = "/UserWriter/SubmitLoginMobiCode";
            $.post(url, {
                'Username': Mobile,
                'Password': VerifyCode,
                'IsPersistent': IsPersistent,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    if (window.location.pathname.toLocaleLowerCase() === '/login.html') {
                        if (window.location.search.length) {
                            var searchStrs = window.location.search.substring(1).split('&');
                            for (var item in searchStrs)
                                if (searchStrs[item].split('=')[0] === 'oldhref') {
                                    window.location.href = decodeURIComponent(searchStrs[item].split('=')[1]);
                                    break;
                                }
                        }
                        else window.location.href = Path.Path.Index();
                    }
                    else Tools.ToastrSuccess('短信验证登录', '短信验证登录成功!', true, true);
                }
                else Tools.ToastrError('短信验证登录', NodPostTool.ErrorPrompt(data, '短信验证登录'));
            });
        },
        //#endregion
        //#region 注册
        //SendRegEmailCode: function (Email, Captcha) {
        //    if (sEmpty(Email) || sEmpty(Captcha)) {
        //        Tools.ToastrError('发送注册邮件', '邮箱、计算验证不可为空。');
        //        return;
        //    }
        //    var url = "/UserWriter/SendRegEmailCode";
        //    $.get(url, {
        //        'email': Email,
        //        'captcha': Captcha,
        //    }, function (data, status) {
        //        if (NodPostTool.OpSucceed(data)) {
        //            Tools.ToastrSuccess('发送注册邮件', '发送注册邮件成功，请访问邮箱获得验证码！', false, true);
        //        }
        //        else {
        //            Scope.$apply(function () { Scope.CaptchaRandom = Scope.CaptchaRandom + 1; });
        //            Tools.ToastrError('发送注册邮件', NodPostTool.ErrorPrompt(data, '发送注册邮件'));
        //        }
        //    });
        //},
        //SubmitRegEmailCode: function (Email, Name, Password, VerifyCode) {
        //    if (sEmpty(Email) || sEmpty(Name) || sEmpty(Password) || sEmpty(VerifyCode)) {
        //        Tools.ToastrError('邮件注册', '邮箱、姓名、密码、邮件验证码不可为空。');
        //        return;
        //    }
        //    var url = "/UserWriter/SubmitRegEmailCode";
        //    $.post(url, {
        //        'Name': Name,
        //        'Email': Email,
        //        'Password': RSAEncrypt(Password),
        //        'RegisterTime': VerifyCode,
        //    }, function (data, status) {
        //        if (NodPostTool.OpSucceed(data)) {
        //            if (window.location.pathname.toLocaleLowerCase() === '/register.html') {
        //                if (window.location.search.length) {
        //                    var searchStrs = window.location.search.substring(1).split('&');
        //                    for (var item in searchStrs)
        //                        if (searchStrs[item].split('=')[0] === 'oldhref') {
        //                            window.location.href = decodeURIComponent(searchStrs[item].split('=')[1]);
        //                            break;
        //                        }
        //                }
        //                else window.location.href = Path.Path.Index();
        //            }
        //            else Tools.ToastrSuccess('邮件注册', '注册成功，欢迎来到51Nod程序员社区！', true, true);
        //        }
        //        else {
        //            Scope.$apply(function () { Scope.CaptchaRandom = Scope.CaptchaRandom + 1; });
        //            Tools.ToastrError('邮件注册', NodPostTool.ErrorPrompt(data, '邮件注册'));
        //        }
        //    });
        //},
        SendRegMobiCode: function (Mobile, Captcha) {
            if (sEmpty(Mobile) || sEmpty(Captcha)) {
                Tools.ToastrError('发送注册短信', '手机、计算验证不可为空。');
                return;
            }
            var url = "/UserWriter/SendRegMobiCode";
            $.get(url, {
                'mobile': Mobile,
                'key': Scope.PageKey,
                'captcha': Captcha,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('发送注册短信', '发送注册短信成功，请查看短信获得验证码！', false, true);
                    Scope.$apply(function () { Scope.CaptchaTurn = Scope.CaptchaRandom; });
                }
                else {
                    Scope.$apply(function () { Scope.CaptchaRandom = Scope.CaptchaRandom + 1; });
                    Tools.ToastrError('发送注册短信', NodPostTool.ErrorPrompt(data, '发送注册短信'));
                }
            });
        },
        SubmitRegMobiCode: function (Mobile, Name, Password, VerifyCode) {
            if (sEmpty(Mobile) || sEmpty(Name) || sEmpty(Password) || sEmpty(VerifyCode)) {
                Tools.ToastrError('短信注册', '手机、姓名、密码、短信验证码不可为空。');
                return;
            }
            var url = "/UserWriter/SubmitRegMobiCode";
            $.post(url, {
                'Name': Name,
                'Mobile': Mobile,
                'Password': RSAEncrypt(Password),
                'RegisterTime': VerifyCode,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    if (window.location.pathname.toLocaleLowerCase() === '/register.html') {
                        if (window.location.search.length) {
                            var searchStrs = window.location.search.substring(1).split('&');
                            for (var item in searchStrs)
                                if (searchStrs[item].split('=')[0] === 'oldhref') {
                                    window.location.href = decodeURIComponent(searchStrs[item].split('=')[1]);
                                    break;
                                }
                        }
                        else window.location.href = Path.Path.Index();
                    }
                    else Tools.ToastrSuccess('短信注册', '注册成功，欢迎来到51Nod程序员社区！', true, true);

                }
                else {
                    Scope.$apply(function () { Scope.CaptchaRandom = Scope.CaptchaRandom + 1; });
                    Tools.ToastrError('短信注册', NodPostTool.ErrorPrompt(data, '短信注册'));
                }
            });
        },
        //#endregion
        //#region 重置密码
        SendEmailRSetPwdCode: function (Email, Captcha) {
            if (sEmpty(Email) || sEmpty(Captcha)) {
                Tools.ToastrError('发送重置密码邮件', '邮箱、计算验证不可为空。');
                return;
            }
            var url = "/UserWriter/SendEmailRSetPwdCode";
            $.get(url, {
                'email': Email,
                'key': Scope.PageKey,
                'captcha': Captcha,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('发送重置密码邮件', '发送重置密码邮件成功，请访问邮箱获得验证码！', false, true);
                    Scope.$apply(function () { Scope.CaptchaTurn = Scope.CaptchaRandom; });
                }
                else {
                    Scope.$apply(function () { Scope.CaptchaRandom = Scope.CaptchaRandom + 1; });
                    Tools.ToastrError('发送重置密码邮件', NodPostTool.ErrorPrompt(data, '发送重置密码邮件'));
                }
            });
        },
        SubmitEmailRSetPwdCode: function (Email, Password, VerifyCode) {
            var url = "/UserWriter/SubmitEmailRSetPwdCode";
            $.post(url, {
                'Email': Email,
                'Password': RSAEncrypt(Password),
                'RegisterTime': VerifyCode,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('重置密码', '重置密码成功！', false, true);
                }
                else {
                    Scope.$apply(function () { Scope.CaptchaRandom = Scope.CaptchaRandom + 1; });
                    Tools.ToastrError('重置密码', NodPostTool.ErrorPrompt(data, '重置密码'));
                }
            });
        },
        SendMobiRSetPwdCode: function (Mobile, Captcha) {
            if (sEmpty(Mobile) || sEmpty(Captcha)) {
                Tools.ToastrError('发送重置密码短信', '手机、计算验证不可为空。');
                return;
            }
            var url = "/UserWriter/SendMobiRSetPwdCode";
            $.get(url, {
                'mobile': Mobile,
                'key': Scope.PageKey,
                'captcha': Captcha,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('发送重置密码短信', '发送重置密码短信成功，请查看短信获得验证码！', false, true);
                    Scope.$apply(function () { Scope.CaptchaTurn = Scope.CaptchaRandom; });
                }
                else {
                    Scope.$apply(function () { Scope.CaptchaRandom = Scope.CaptchaRandom + 1; });
                    Tools.ToastrError('发送重置密码短信', NodPostTool.ErrorPrompt(data, '发送重置密码短信'));
                }
            });
        },
        SubmitMobiRSetPwdCode: function (Mobile, Password, VerifyCode) {
            var url = "/UserWriter/SubmitMobiRSetPwdCode";
            $.post(url, {
                'Mobile': Mobile,
                'Password': RSAEncrypt(Password),
                'RegisterTime': VerifyCode,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('重置密码', '重置密码成功！', false, true);
                }
                else {
                    Scope.$apply(function () { Scope.CaptchaRandom = Scope.CaptchaRandom + 1; });
                    Tools.ToastrError('重置密码', NodPostTool.ErrorPrompt(data, '重置密码'));
                }
            });
        },
        //#endregion
        //#region 第三方登录绑定
        SendBindEmailCode: function (BindEmail) {
            if (sEmpty(BindEmail.Email) || sEmpty(BindEmail.Password)) {
                Tools.ToastrError('发送邮件验证码', '邮箱和密码不可为空。');
                return;
            }

            var url = "/UserWriter/SendBindEmailCode";
            $.get(url, {
                'email': BindEmail.Email,
                'password': RSAEncrypt(BindEmail.Password),
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('发送邮件验证码', '发送邮件验证码成功，请通过邮件查看。', true);
                }
                else {
                    Tools.ToastrError('发送邮件验证码', NodPostTool.ErrorPrompt(data, '发送邮件验证码'));
                }
            });
        },
        SubmitBindEmailCode: function (BindEmail) {
            if (sEmpty(BindEmail.Password)) {
                Tools.ToastrError("绑定邮箱", "密码不可为空。");
                return;
            }

            var url = "/UserWriter/SubmitBindEmailCode";
            $.post(url, {
                'Email': BindEmail.Email,
                'Password': RSAEncrypt(BindEmail.Password),
                'RegisterTime': BindEmail.Code,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('绑定邮箱', '绑定邮箱成功。', true, true);
                }
                else {
                    Tools.ToastrError('绑定邮箱', NodPostTool.ErrorPrompt(data, '绑定邮箱'));
                }
            });
        },
        SendBindMobiCode: function (BindMobile) {
            if (sEmpty(BindMobile.Mobile) || sEmpty(BindMobile.Password)) {
                Tools.ToastrError('发送短信验证码', '手机和密码不可为空。');
                return;
            }

            var url = "/UserWriter/SendBindMobiCode";
            $.get(url, {
                'mobile': BindMobile.Mobile,
                'password': RSAEncrypt(BindMobile.Password),
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('发送短信验证码', '发送短信验证码成功，请于手机上查看。', true);
                }
                else {
                    Tools.ToastrError('发送短信验证码', NodPostTool.ErrorPrompt(data, '发送短信验证码'));
                }
            });
        },
        SubmitBindMobiCode: function (BindMobile) {
            if (sEmpty(BindMobile.Password)) {
                Tools.ToastrError("绑定手机", "密码不可为空。");
                return;
            }

            var url = "/UserWriter/SubmitBindMobiCode";
            $.post(url, {
                'Mobile': BindMobile.Mobile,
                'Password': RSAEncrypt(BindMobile.Password),
                'RegisterTime': BindMobile.Code,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('绑定手机', '绑定手机成功。', true, true);
                }
                else {
                    Tools.ToastrError('绑定手机', NodPostTool.ErrorPrompt(data, '绑定手机'));
                }
            });
        },
        SendThirdBindMobiCode: function (Mobile, Captcha) {
            if (sEmpty(Mobile) || sEmpty(Captcha)) {
                Tools.ToastrError('发送短信验证码', '手机、计算验证不可为空。');
                return;
            }

            var url = "/UserWriter/SendThirdBindMobiCode";
            $.get(url, {
                'mobile': Mobile,
                'key': Scope.PageKey,
                'captcha': Captcha,
                'jsonKey': Scope.data.key,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('发送短信验证码', '发送短信验证码成功，请于手机上查看。', true);
                    if (data == 1) Scope.NeedPwd = true;
                    Scope.$apply(function () { Scope.CaptchaTurn = Scope.CaptchaRandom; });
                }
                else {
                    Scope.$apply(function () { Scope.CaptchaRandom = Scope.CaptchaRandom + 1; });
                    Tools.ToastrError('发送短信验证码', NodPostTool.ErrorPrompt(data, '发送短信验证码'));
                }
            });
        },
        SubmitThirdBindMobiCode: function (Mobile, Code, BindPwd) {
            if (sEmpty(Mobile) || sEmpty(Code)) {
                Tools.ToastrError("绑定手机", "手机、短信验证码不可为空。");
                return;
            }
            if (Scope.NeedPwd && sEmpty(BindPwd)) {
                Tools.ToastrError("绑定手机", "密码不可为空。");
                return;
            }

            var url = "/UserWriter/SubmitThirdBindMobiCode";
            $.post(url, {
                'Mobile': Mobile,
                'RegisterTime': Code,
                'Password': RSAEncrypt(BindPwd),
                'Remark': Scope.data.key,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    if (window.location.pathname.toLocaleLowerCase() === "/user/bind.html") {
                        if (window.location.search.length) {
                            var searchStrs = window.location.search.substring(1).split('&');
                            for (var item in searchStrs)
                                if (searchStrs[item].split('=')[0] === "oldhref") {
                                    window.location.href = decodeURIComponent(searchStrs[item].split('=')[1]);
                                    break;
                                }
                        }
                        else window.location.href = Path.Path.Index();
                    }
                    else Tools.ToastrSuccess('绑定手机', '绑定成功，欢迎来到51Nod程序员社区！', true, true);

                }
                else {
                    Scope.$apply(function () { Scope.CaptchaRandom = Scope.CaptchaRandom + 1; });
                    Tools.ToastrError('绑定手机', NodPostTool.ErrorPrompt(data, '绑定手机'));
                }
            });
        },
        SendLoginQuickCode: function (Mobile, Captcha) {
            if (sEmpty(Mobile) || sEmpty(Captcha)) {
                Tools.ToastrError('发送短信验证码', '手机、计算验证不可为空。');
                return;
            }

            var url = "/UserWriter/SendLoginQuickCode";
            $.get(url, {
                'mobile': Mobile,
                'key': Scope.PageKey,
                'captcha': Captcha,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('发送短信验证码', '发送短信验证码成功，请于手机上查看。', true);
                    if (data == 1) Scope.NeedPwd = true;
                    Scope.$apply(function () { Scope.CaptchaTurn = Scope.CaptchaRandom; });
                }
                else {
                    Scope.$apply(function () { Scope.CaptchaRandom = Scope.CaptchaRandom + 1; });
                    Tools.ToastrError('发送短信验证码', NodPostTool.ErrorPrompt(data, '发送短信验证码'));
                }
            });
        },
        SubmitLoginQuickCode: function (Mobile, Code, RegName, RegPwd) {
            if (sEmpty(Mobile) || sEmpty(Code)) {
                Tools.ToastrError("快速登录", "手机、短信验证码不可为空。");
                return;
            }
            if (Scope.NeedPwd && sEmpty(RegPwd) && sEmpty(RegName)) {
                Tools.ToastrError("快速登录", "密码、昵称不可为空。");
                return;
            }

            var url = "/UserWriter/SubmitLoginQuickCode";
            $.post(url, {
                'Mobile': Mobile,
                'RegisterTime': Code,
                'Name': RegName,
                'Password': RSAEncrypt(RegPwd),
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    if (window.location.pathname.toLocaleLowerCase() === "/loginquick.html") {
                        if (window.location.search.length) {
                            var searchStrs = window.location.search.substring(1).split('&');
                            for (var item in searchStrs)
                                if (searchStrs[item].split('=')[0] === "oldhref") {
                                    window.location.href = decodeURIComponent(searchStrs[item].split('=')[1]);
                                    break;
                                }
                        }
                        else window.location.href = Path.Path.Index();
                    }
                    else Tools.ToastrSuccess('快速登录', '快速登录成功，欢迎来到51Nod程序员社区！', true, true);

                }
                else {
                    Scope.$apply(function () { Scope.CaptchaRandom = Scope.CaptchaRandom + 1; });
                    Tools.ToastrError('快速登录', NodPostTool.ErrorPrompt(data, '快速登录'));
                }
            });
        },
        //#endregion
        BatchAddUser: function (BatchUser) {
            var url = "/UserWriter/BatchAddUser";
            $.post(url, {
                'pre': BatchUser.Pre,
                'start': BatchUser.Start,
                'count': BatchUser.Count,
                'password': RSAEncrypt(BatchUser.Password),
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('批量创建用户', '批量创建用户成功。', true);
                }
                else {
                    Tools.ToastrError('批量创建用户', NodPostTool.ErrorPrompt(data, '批量创建用户'));
                }
            });
        },
        AppendUserStringArray: function (UserStringArray, UserSendMsg) {
            var url = "/UserWriter/AppendUserStringArray";
            var userNum = UserStringArray.split('\n').length;
            $.post(url, {
                'Ids': UserStringArray,
                'Bdata': UserSendMsg,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    if (userNum === data)
                        Tools.ToastrSuccess('批量添加用户', '批量添加用户全部成功。', true);
                    else
                        Tools.ToastrError('批量添加用户', '批量添加用户部分成功，失败' + (userNum - data) + '个。', true);
                }
                else {
                    Tools.ToastrError('批量添加用户', NodPostTool.ErrorPrompt(data, '批量添加用户'));
                }
            });
        },
        AdminAppend: function (User) {
            var url = "/UserWriter/AdminAppend";
            $.post(url, {
                'Name': User.Name,
                'Mobile': User.Mobile,
                'Email': User.Email,
                'Password': RSAEncrypt(User.Password),
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('添加新用户', '添加新用户成功。', true);
                }
                else {
                    Tools.ToastrError('添加新用户', NodPostTool.ErrorPrompt(data, '添加新用户'));
                }
            });
        },
        AdminSynchronizeName: function (UserId, Name) {
            var url = "/UserWriter/AdminRework";
            $.post(url, {
                'Id': UserId,
                'Name': Name,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('修改用户姓名', '修改用户姓名成功。', true);
                }
                else {
                    Tools.ToastrError('修改用户姓名', NodPostTool.ErrorPrompt(data, '修改用户姓名'));
                }
            });
        },
    },
    UserResume: {
        Save: function (UserResume) {
            var url = "/UserResumeWriter/Save";
            $.post(url, {
                'RealName': UserResume.RealName,
                'IDNumber': UserResume.IDNumber,
                'Birthday': UserResume.Birthday,
                'SchoolName': UserResume.SchoolName,
                'CompanyName': UserResume.CompanyName,
                'JobTitle': UserResume.JobTitle,
                'Education': UserResume.Education,
                'City': UserResume.City,
                'Award': UserResume.Award,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('修改简历信息', '您的简历信息修改成功。', true);
                }
                else {
                    Tools.ToastrError('修改简历信息', NodPostTool.ErrorPrompt(data, '修改简历信息'));
                }
            });
        },
        ReworkContent: function (UserId, Content, ClassId) {
            var url = "/UserResumeWriter/ReworkContent";
            $.post(url, {
                'Id': UserId,
                'Content': Content,
                'IDNumber': ClassId,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('修改用户Content', '修改用户Content成功。', true);
                }
                else {
                    Tools.ToastrError('修改用户Content', NodPostTool.ErrorPrompt(data, '修改用户Content'));
                }
            });
        },
    },
    UserSetting: {
        Save: function (UserSetting) {
            var url = "/UserSettingWriter/Save";
            $.post(url, {
                'AutoFocusQuestion': UserSetting.AutoFocusQuestion,
                'MessageFlag': UserSetting.MessageFlag,
                'NoticeFlags': UserSetting._NoticeFlags
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('修改提醒设置', '修改提醒设置成功。', true);
                }
                else {
                    Tools.ToastrError('修改提醒设置', NodPostTool.ErrorPrompt(data, '修改提醒设置'));
                }
            });
        },
        ReworkRemittance: function (UserSetting) {
            var url = "/UserSettingWriter/ReworkRemittance";
            $.post(url, {
                'ReceiverName': UserSetting.ReceiverName,
                'MailAddress': UserSetting.MailAddress,
                'ClothesSize': UserSetting.ClothesSize,
                'Remittance': UserSetting.Remittance,
                'RemittanceName': UserSetting.RemittanceName,
                'RemittanceAccount': UserSetting.RemittanceAccount,
                'RemittanceBank': UserSetting.RemittanceBank,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('修改发奖信息', '您的发奖信息修改成功。', true);
                }
                else {
                    Tools.ToastrError('修改发奖信息', NodPostTool.ErrorPrompt(data, '修改发奖信息'));
                }
            });
        },
    },
    Video: {
        Append: function (Video) {
            var url = "/VideoWriter/Append";
            $.post(url, {
                'Tags': Video.Tags,
                'Title': Video.Title,
                'Filename': Video.Filename,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.SweetAlertRedirect('创建课程视频', '创建课程视频成功。', 'success', Path.Path.Tutorial.VideoEdit(data));
                }
                else {
                    Tools.SweetAlert('创建课程视频', NodPostTool.ErrorPrompt(data, '创建课程视频'), 'error');
                }
            });
        },
        Rework: function (Video) {
            var url = '/VideoWriter/Rework';
            $.post(url, {
                'Id': Video.Id,
                'Tags': Video.Tags,
                'Title': Video.Title,
                'Filename': Video.Filename,
                'TimeLong': Video.TimeLong,
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('修改课程视频', '修改课程视频。', true);
                }
                else {
                    Tools.ToastrError('修改课程视频', NodPostTool.ErrorPrompt(data, '修改课程视频'));
                }
            });
        },
        ReworkTimeLong: function (Video, TimeLong) {
            var url = '/VideoWriter/ReworkTimeLong';
            $.post(url, {
                'Id': Video.Id,
                'TimeLong': parseInt(TimeLong),
            }, function (data, status) {
                if (NodPostTool.OpSucceed(data)) {
                    Tools.ToastrSuccess('修改视频时长', '修改视频时长成功。', true);
                }
                else {
                    Tools.ToastrError('修改视频时长', NodPostTool.ErrorPrompt(data, '修改视频时长'));
                }
            });
        },
    }
}
