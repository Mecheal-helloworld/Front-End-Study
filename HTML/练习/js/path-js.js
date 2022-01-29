/**
 * 此代码是由51nod的夹克老爷写的程序生成的，所以不要手动修改，因为下次又会被覆盖
 */

function ReplaceUrl(url, pathMap, obj) {
    if (url.indexOf('#') === -1)
        return url;

    var newUrl = url.substring(0, url.indexOf('#'));
    var paramList = url.substring(url.indexOf('#') + 1).split('&');
    var paramCount = 0, first = true, paramDict = {};

    for (var paramKey in paramList) {
        var tempStr = paramList[paramKey].split('=');
        var paramStr = tempStr[0] + '=';
        var varName = tempStr[1].substring(tempStr[1].indexOf('(') + 1, tempStr[1].indexOf(')'));
        var paramFlag = false;

        if (typeof (obj) === 'object') {
            for (var pathKey in pathMap) {
                var flag = false;
                if (pathMap[pathKey].Key == varName) {
                    for (var valueKey in pathMap[pathKey].Values) {
                        for (var key in obj) {
                            if (paramDict[key] === undefined && pathMap[pathKey].Values[valueKey] == key) {
                                if(obj[key] != 0){
                                    paramStr += encodeURIComponent(obj[key]);
                                    paramFlag = true;
                                }

                                paramDict[key] = true;
                                flag = true;
                                break;
                            }
                        }
                        if (flag) break;
                    }
                }
                if (flag) break;
            }
        }
        else if (obj !== undefined) {
            return newUrl += '#' + paramStr + encodeURIComponent(obj);
        }
        else break;

        if (paramFlag) {
            if (paramCount === 0) newUrl += '#';
            else newUrl += '&';
            newUrl += paramStr;
            paramCount++;
        }
    }

    return newUrl;
}

PathMap = {
    Path_Answer_AgreeList : [
	{
		Key : "answerId",
		Values : new Array("AnswerId","Id"),
	},
    ],
    Path_Answer_Index : [
	{
		Key : "answerId",
		Values : new Array("AnswerId","Id"),
	},
    ],
    Path_Answer_UserAnswerList : [
	{
		Key : "userId",
		Values : new Array("UserId","Id"),
	},
    ],
    Path_Blog_AgreeList : [
	{
		Key : "blogId",
		Values : new Array("BlogId","Id"),
	},
    ],
    Path_Blog_BlogEdit : [
	{
		Key : "blogId",
		Values : new Array("BlogId","Id"),
	},
    ],
    Path_Blog_Index : [
	{
		Key : "blogId",
		Values : new Array("BlogId","Id"),
	},
    ],
    Path_Blog_UserBlogList : [
	{
		Key : "userId",
		Values : new Array("UserId","Id"),
	},
    ],
    Path_Challenge_AcceptedRank : [
	{
		Key : "problemId",
		Values : new Array("ProblemId","Id"),
	},
    ],
    Path_Challenge_BeginnerIndex : [
	{
		Key : "userId",
		Values : new Array("UserId","Id"),
	},
    ],
    Path_Challenge_BeginnerProblemList : [
	{
		Key : "level",
		Values : new Array("Level"),
	},
    ],
    Path_Challenge_BeginnerTopicList : [
	{
		Key : "topicId",
		Values : new Array("TopicId","Id"),
	},
    ],
    Path_Challenge_EfficiencyRank : [
	{
		Key : "problemId",
		Values : new Array("ProblemId","Id"),
	},
    ],
    Path_Challenge_GroupProblemList : [
	{
		Key : "groupId",
		Values : new Array("GroupId","Id"),
	},
    ],
    Path_Challenge_ProblemCollection : [
	{
		Key : "problemCollectionId",
		Values : new Array("ProblemCollectionId","Id"),
	},
    ],
    Path_Challenge_ProblemList : [
	{
		Key : "level",
		Values : new Array("Level"),
	},
    ],
    Path_Challenge_Problem : [
	{
		Key : "problemId",
		Values : new Array("ProblemId","Id"),
	},
	{
		Key : "judgeId",
		Values : new Array("JudgeId","Id"),
	},
    ],
    Path_Challenge_ProblemSolution : [
	{
		Key : "problemId",
		Values : new Array("ProblemId","Id"),
	},
    ],
    Path_Challenge_ProblemSubmitDetail : [
	{
		Key : "judgeId",
		Values : new Array("JudgeId","Id"),
	},
    ],
    Path_Challenge_ProblemSubmitList : [
	{
		Key : "problemId",
		Values : new Array("ProblemId","Id"),
	},
    ],
    Path_Challenge_TopicProblemList : [
	{
		Key : "topicId",
		Values : new Array("TopicId","Id"),
	},
    ],
    Path_Challenge_UserFocusProblemList : [
	{
		Key : "userId",
		Values : new Array("CurrentUserId","UserId","Id"),
	},
    ],
    Path_Challenge_UserIndex : [
	{
		Key : "userId",
		Values : new Array("UserId","Id"),
	},
    ],
    Path_Challenge_UserMedalList : [
	{
		Key : "userId",
		Values : new Array("UserId","Id"),
	},
    ],
    Path_Challenge_UserProblemSubmitList : [
	{
		Key : "problemId",
		Values : new Array("Id","ProblemId"),
	},
	{
		Key : "userId",
		Values : new Array("CurrentUserId","UserId","Id"),
	},
    ],
    Path_Challenge_UserSubmitList : [
	{
		Key : "userId",
		Values : new Array("CurrentUserId","UserId","Id"),
	},
    ],
    Path_Contest_ContestDescription : [
	{
		Key : "contestId",
		Values : new Array("ContestId","Id"),
	},
	{
		Key : "randomCode",
		Values : new Array("Code"),
	},
    ],
    Path_Contest_ContestList : [
	{
		Key : "type",
		Values : new Array("Id"),
	},
    ],
    Path_Contest_ContestRankList : [
	{
		Key : "contestId",
		Values : new Array("ContestId","Id"),
	},
	{
		Key : "randomCode",
		Values : new Array("Code"),
	},
    ],
    Path_Contest_ContestSubmitList : [
	{
		Key : "contestId",
		Values : new Array("ContestId","Id"),
	},
	{
		Key : "randomCode",
		Values : new Array("Code"),
	},
    ],
    Path_Contest_ProblemEfficiencyRank : [
	{
		Key : "contestProblemId",
		Values : new Array("ContestProblemId","Id"),
	},
    ],
    Path_Contest_ProblemList : [
	{
		Key : "contestId",
		Values : new Array("ContestId","Id"),
	},
	{
		Key : "randomCode",
		Values : new Array("Code"),
	},
    ],
    Path_Contest_Problem : [
	{
		Key : "contestProblemId",
		Values : new Array("ContestProblemId","Id"),
	},
	{
		Key : "contestJudgeId",
		Values : new Array("ContestJudgeId","Id"),
	},
    ],
    Path_Contest_ProblemScoreRank : [
	{
		Key : "contestProblemId",
		Values : new Array("ContestProblemId","Id"),
	},
    ],
    Path_Contest_ProblemSolution : [
	{
		Key : "contestProblemId",
		Values : new Array("ContestProblemId","Id"),
	},
    ],
    Path_Contest_ProblemSubmitDetail : [
	{
		Key : "judgeId",
		Values : new Array("JudgeId","Id"),
	},
    ],
    Path_Contest_ProblemSubmitList : [
	{
		Key : "contestProblemId",
		Values : new Array("ContestProblemId","Id"),
	},
    ],
    Path_Contest_RegisterList : [
	{
		Key : "contestId",
		Values : new Array("ContestId","Id"),
	},
	{
		Key : "randomCode",
		Values : new Array("Code"),
	},
    ],
    Path_Contest_UserContestList : [
	{
		Key : "userId",
		Values : new Array("UserId","Id"),
	},
    ],
    Path_Contest_UserContestSubmitList : [
	{
		Key : "contestId",
		Values : new Array("ContestId","Id"),
	},
	{
		Key : "userId",
		Values : new Array("CurrentUserId","UserId","Id"),
	},
    ],
    Path_Contest_UserIndex : [
	{
		Key : "userId",
		Values : new Array("UserId","Id"),
	},
    ],
    Path_Contest_UserProblemSubmitList : [
	{
		Key : "contestProblemId",
		Values : new Array("ContestProblemId","Id"),
	},
	{
		Key : "userId",
		Values : new Array("CurrentUserId","UserId","Id"),
	},
    ],
    Path_Contest_UserSubmitList : [
	{
		Key : "userId",
		Values : new Array("UserId","Id"),
	},
    ],
    Path_Favorite_Index : [
	{
		Key : "favoriteId",
		Values : new Array("FavoriteId","Id"),
	},
    ],
    Path_Home_MessageList : [
	{
		Key : "userId",
		Values : new Array("UserId","Id"),
	},
    ],
    Path_Home_NoticeList : [
	{
		Key : "isSystem",
		Values : new Array("isSystem"),
	},
    ],
    Path_Live_Index : [
	{
		Key : "liveId",
		Values : new Array("LiveId","Id"),
	},
    ],
    Path_Live_LiveDescription : [
	{
		Key : "liveId",
		Values : new Array("LiveId","Id"),
	},
    ],
    Path_Live_LiveEdit : [
	{
		Key : "liveId",
		Values : new Array("LiveId","Id"),
	},
    ],
    Path_Live_RegisterList : [
	{
		Key : "liveId",
		Values : new Array("LiveId","Id"),
	},
    ],
    Path_Live_UserLiveList : [
	{
		Key : "userId",
		Values : new Array("UserId","Id"),
	},
    ],
    Path_Live_UserRegLiveList : [
	{
		Key : "userId",
		Values : new Array("UserId","Id"),
	},
    ],
    Path_Paper_Answer : [
	{
		Key : "paperId",
		Values : new Array("PaperId","Id"),
	},
    ],
    Path_Paper_Index : [
	{
		Key : "paperId",
		Values : new Array("PaperId","Id"),
	},
    ],
    Path_Paper_Report : [
	{
		Key : "paperId",
		Values : new Array("PaperId","Id"),
	},
    ],
    Path_Paper_Submit : [
	{
		Key : "paperId",
		Values : new Array("PaperId","Id"),
	},
    ],
    Path_Paper_UserList : [
	{
		Key : "paperId",
		Values : new Array("PaperId","Id"),
	},
    ],
    Path_Question_FocusList : [
	{
		Key : "questionId",
		Values : new Array("QuestionId","Id"),
	},
    ],
    Path_Question_Index : [
	{
		Key : "questionId",
		Values : new Array("QuestionId","Id"),
	},
    ],
    Path_Question_UserFocusQuestionList : [
	{
		Key : "userId",
		Values : new Array("UserId","Id"),
	},
    ],
    Path_Question_UserQuestionList : [
	{
		Key : "userId",
		Values : new Array("UserId","Id"),
	},
    ],
    Path_Paste : [
	{
		Key : "key",
		Values : new Array("Key","Id"),
	},
    ],
    Path_Training_Index : [
	{
		Key : "trainingId",
		Values : new Array("TrainingId","Id"),
	},
    ],
    Path_Training_MySubmitList : [
	{
		Key : "trainingId",
		Values : new Array("TrainingId","Id"),
	},
    ],
    Path_Training_ProblemSubmitDetail : [
	{
		Key : "judgeId",
		Values : new Array("JudgeId","Id"),
	},
    ],
    Path_Training_Share : [
	{
		Key : "trainingId",
		Values : new Array("TrainingId","Id"),
	},
	{
		Key : "userId",
		Values : new Array("UserId"),
	},
    ],
    Path_Training_TotalRankList : [
	{
		Key : "trainingId",
		Values : new Array("TrainingId","Id"),
	},
    ],
    Path_Training_TrainingLog : [
	{
		Key : "trainingId",
		Values : new Array("TrainingId","Id"),
	},
	{
		Key : "userId",
		Values : new Array("UserId"),
	},
    ],
    Path_Tutorial_ChapterIndex : [
	{
		Key : "chapterId",
		Values : new Array("ChapterId","Id"),
	},
	{
		Key : "tutorialId",
		Values : new Array("TutorialId"),
	},
    ],
    Path_Tutorial_TutorialIndex : [
	{
		Key : "tutorialId",
		Values : new Array("TutorialId","Id"),
	},
    ],
    Path_User_FocusByUserList : [
	{
		Key : "userId",
		Values : new Array("UserId","Id"),
	},
    ],
    Path_User_FocusUserList : [
	{
		Key : "userId",
		Values : new Array("UserId","Id"),
	},
    ],
    Path_User_Index : [
	{
		Key : "userId",
		Values : new Array("UserId","Id"),
	},
    ],
};
Path = {
    Path: {
    Answer: {
    AgreeList: function (obj) {
            return ReplaceUrl("/Answer/AgreeList.html#answerId=(answerId)", PathMap.Path_Answer_AgreeList, obj);
        },
    Index: function (obj) {
            return ReplaceUrl("/Answer/Index.html#answerId=(answerId)", PathMap.Path_Answer_Index, obj);
        },
    UserAnswerList: function (obj) {
            return ReplaceUrl("/Answer/UserAnswerList.html#userId=(userId)", PathMap.Path_Answer_UserAnswerList, obj);
        },
    },
    Blog: {
    AgreeList: function (obj) {
            return ReplaceUrl("/Blog/AgreeList.html#blogId=(blogId)", PathMap.Path_Blog_AgreeList, obj);
        },
    BlogEdit: function (obj) {
            return ReplaceUrl("/Blog/BlogEdit.html#blogId=(blogId)", PathMap.Path_Blog_BlogEdit, obj);
        },
    BlogList: function (obj) {
            return "/Blog/BlogList.html";
        },
    Index: function (obj) {
            return ReplaceUrl("/Blog/Index.html#blogId=(blogId)", PathMap.Path_Blog_Index, obj);
        },
    UserBlogList: function (obj) {
            return ReplaceUrl("/Blog/UserBlogList.html#userId=(userId)", PathMap.Path_Blog_UserBlogList, obj);
        },
    },
    Challenge: {
    AcceptedRank: function (obj) {
            return ReplaceUrl("/Challenge/AcceptedRank.html#problemId=(problemId)", PathMap.Path_Challenge_AcceptedRank, obj);
        },
    BeginnerIndex: function (obj) {
            return ReplaceUrl("/Challenge/BeginnerIndex.html#userId=(userId)", PathMap.Path_Challenge_BeginnerIndex, obj);
        },
    BeginnerProblemList: function (obj) {
            return ReplaceUrl("/Challenge/BeginnerProblemList.html#level=(level)", PathMap.Path_Challenge_BeginnerProblemList, obj);
        },
    BeginnerTopicList: function (obj) {
            return ReplaceUrl("/Challenge/BeginnerTopicList.html#topicId=(topicId)", PathMap.Path_Challenge_BeginnerTopicList, obj);
        },
    EfficiencyRank: function (obj) {
            return ReplaceUrl("/Challenge/EfficiencyRank.html#problemId=(problemId)", PathMap.Path_Challenge_EfficiencyRank, obj);
        },
    ExpiredProblemList: function (obj) {
            return "/Challenge/ExpiredProblemList.html";
        },
    GroupProblemList: function (obj) {
            return ReplaceUrl("/Challenge/GroupProblemList.html#groupId=(groupId)", PathMap.Path_Challenge_GroupProblemList, obj);
        },
    ProblemCollection: function (obj) {
            return ReplaceUrl("/Challenge/ProblemCollection.html#problemCollectionId=(problemCollectionId)", PathMap.Path_Challenge_ProblemCollection, obj);
        },
    ProblemList: function (obj) {
            return ReplaceUrl("/Challenge/ProblemList.html#level=(level)", PathMap.Path_Challenge_ProblemList, obj);
        },
    Problem: function (obj) {
            return ReplaceUrl("/Challenge/Problem.html#problemId=(problemId)&judgeId=(judgeId)", PathMap.Path_Challenge_Problem, obj);
        },
    ProblemSolution: function (obj) {
            return ReplaceUrl("/Challenge/ProblemSolution.html#problemId=(problemId)", PathMap.Path_Challenge_ProblemSolution, obj);
        },
    ProblemSubmitDetail: function (obj) {
            return ReplaceUrl("/Challenge/ProblemSubmitDetail.html#judgeId=(judgeId)", PathMap.Path_Challenge_ProblemSubmitDetail, obj);
        },
    ProblemSubmitList: function (obj) {
            return ReplaceUrl("/Challenge/ProblemSubmitList.html#problemId=(problemId)", PathMap.Path_Challenge_ProblemSubmitList, obj);
        },
    SubmitTools: function (obj) {
            return "/Challenge/SubmitTools.html";
        },
    TopicProblemList: function (obj) {
            return ReplaceUrl("/Challenge/TopicProblemList.html#topicId=(topicId)", PathMap.Path_Challenge_TopicProblemList, obj);
        },
    TotalRankList: function (obj) {
            return "/Challenge/TotalRankList.html";
        },
    TotalSubmitList: function (obj) {
            return "/Challenge/TotalSubmitList.html";
        },
    UserFocusProblemList: function (obj) {
            return ReplaceUrl("/Challenge/UserFocusProblemList.html#userId=(userId)", PathMap.Path_Challenge_UserFocusProblemList, obj);
        },
    UserIndex: function (obj) {
            return ReplaceUrl("/Challenge/UserIndex.html#userId=(userId)", PathMap.Path_Challenge_UserIndex, obj);
        },
    UserMedalList: function (obj) {
            return ReplaceUrl("/Challenge/UserMedalList.html#userId=(userId)", PathMap.Path_Challenge_UserMedalList, obj);
        },
    UserProblemSubmitList: function (obj) {
            return ReplaceUrl("/Challenge/UserProblemSubmitList.html#problemId=(problemId)&userId=(userId)", PathMap.Path_Challenge_UserProblemSubmitList, obj);
        },
    UserSubmitList: function (obj) {
            return ReplaceUrl("/Challenge/UserSubmitList.html#userId=(userId)", PathMap.Path_Challenge_UserSubmitList, obj);
        },
    },
    Contest: {
    ContestDescription: function (obj) {
            return ReplaceUrl("/Contest/ContestDescription.html#contestId=(contestId)&randomCode=(randomCode)", PathMap.Path_Contest_ContestDescription, obj);
        },
    ContestList: function (obj) {
            return ReplaceUrl("/Contest/ContestList.html#type=(type)", PathMap.Path_Contest_ContestList, obj);
        },
    ContestRankList: function (obj) {
            return ReplaceUrl("/Contest/ContestRankList.html#contestId=(contestId)&randomCode=(randomCode)", PathMap.Path_Contest_ContestRankList, obj);
        },
    ContestSubmitList: function (obj) {
            return ReplaceUrl("/Contest/ContestSubmitList.html#contestId=(contestId)&randomCode=(randomCode)", PathMap.Path_Contest_ContestSubmitList, obj);
        },
    ProblemEfficiencyRank: function (obj) {
            return ReplaceUrl("/Contest/ProblemEfficiencyRank.html#contestProblemId=(contestProblemId)", PathMap.Path_Contest_ProblemEfficiencyRank, obj);
        },
    ProblemList: function (obj) {
            return ReplaceUrl("/Contest/ProblemList.html#contestId=(contestId)&randomCode=(randomCode)", PathMap.Path_Contest_ProblemList, obj);
        },
    Problem: function (obj) {
            return ReplaceUrl("/Contest/Problem.html#contestProblemId=(contestProblemId)&contestJudgeId=(contestJudgeId)", PathMap.Path_Contest_Problem, obj);
        },
    ProblemScoreRank: function (obj) {
            return ReplaceUrl("/Contest/ProblemScoreRank.html#contestProblemId=(contestProblemId)", PathMap.Path_Contest_ProblemScoreRank, obj);
        },
    ProblemSolution: function (obj) {
            return ReplaceUrl("/Contest/ProblemSolution.html#contestProblemId=(contestProblemId)", PathMap.Path_Contest_ProblemSolution, obj);
        },
    ProblemSubmitDetail: function (obj) {
            return ReplaceUrl("/Contest/ProblemSubmitDetail.html#judgeId=(judgeId)", PathMap.Path_Contest_ProblemSubmitDetail, obj);
        },
    ProblemSubmitList: function (obj) {
            return ReplaceUrl("/Contest/ProblemSubmitList.html#contestProblemId=(contestProblemId)", PathMap.Path_Contest_ProblemSubmitList, obj);
        },
    RegisterList: function (obj) {
            return ReplaceUrl("/Contest/RegisterList.html#contestId=(contestId)&randomCode=(randomCode)", PathMap.Path_Contest_RegisterList, obj);
        },
    TotalRankList: function (obj) {
            return "/Contest/TotalRankList.html";
        },
    UserContestList: function (obj) {
            return ReplaceUrl("/Contest/UserContestList.html#userId=(userId)", PathMap.Path_Contest_UserContestList, obj);
        },
    UserContestSubmitList: function (obj) {
            return ReplaceUrl("/Contest/UserContestSubmitList.html#contestId=(contestId)&userId=(userId)", PathMap.Path_Contest_UserContestSubmitList, obj);
        },
    UserIndex: function (obj) {
            return ReplaceUrl("/Contest/UserIndex.html#userId=(userId)", PathMap.Path_Contest_UserIndex, obj);
        },
    UserProblemSubmitList: function (obj) {
            return ReplaceUrl("/Contest/UserProblemSubmitList.html#contestProblemId=(contestProblemId)&userId=(userId)", PathMap.Path_Contest_UserProblemSubmitList, obj);
        },
    UserSubmitList: function (obj) {
            return ReplaceUrl("/Contest/UserSubmitList.html#userId=(userId)", PathMap.Path_Contest_UserSubmitList, obj);
        },
    },
    Favorite: {
    Index: function (obj) {
            return ReplaceUrl("/Favorite/Index.html#favoriteId=(favoriteId)", PathMap.Path_Favorite_Index, obj);
        },
    UserFavoriteList: function (obj) {
            return "/Favorite/UserFavoriteList.html";
        },
    },
    Home: {
    MentionList: function (obj) {
            return "/Home/MentionList.html";
        },
    MessageList: function (obj) {
            return ReplaceUrl("/Home/MessageList.html#userId=(userId)", PathMap.Path_Home_MessageList, obj);
        },
    Message: function (obj) {
            return "/Home/Message.html";
        },
    NoticeList: function (obj) {
            return ReplaceUrl("/Home/NoticeList.html#isSystem=(isSystem)", PathMap.Path_Home_NoticeList, obj);
        },
    Payment: function (obj) {
            return "/Home/Payment.html";
        },
    PaymentRMB: function (obj) {
            return "/Home/PaymentRMB.html";
        },
    },
    Live: {
    Index: function (obj) {
            return ReplaceUrl("/Live/Index.html#liveId=(liveId)", PathMap.Path_Live_Index, obj);
        },
    LiveDescription: function (obj) {
            return ReplaceUrl("/Live/LiveDescription.html#liveId=(liveId)", PathMap.Path_Live_LiveDescription, obj);
        },
    LiveEdit: function (obj) {
            return ReplaceUrl("/Live/LiveEdit.html#liveId=(liveId)", PathMap.Path_Live_LiveEdit, obj);
        },
    LiveList: function (obj) {
            return "/Live/LiveList.html";
        },
    RegisterList: function (obj) {
            return ReplaceUrl("/Live/RegisterList.html#liveId=(liveId)", PathMap.Path_Live_RegisterList, obj);
        },
    UserLiveList: function (obj) {
            return ReplaceUrl("/Live/UserLiveList.html#userId=(userId)", PathMap.Path_Live_UserLiveList, obj);
        },
    UserRegLiveList: function (obj) {
            return ReplaceUrl("/Live/UserRegLiveList.html#userId=(userId)", PathMap.Path_Live_UserRegLiveList, obj);
        },
    },
    Paper: {
    Answer: function (obj) {
            return ReplaceUrl("/Paper/Answer.html#paperId=(paperId)", PathMap.Path_Paper_Answer, obj);
        },
    Index: function (obj) {
            return ReplaceUrl("/Paper/Index.html#paperId=(paperId)", PathMap.Path_Paper_Index, obj);
        },
    Report: function (obj) {
            return ReplaceUrl("/Paper/Report.html#paperId=(paperId)", PathMap.Path_Paper_Report, obj);
        },
    Submit: function (obj) {
            return ReplaceUrl("/Paper/Submit.html#paperId=(paperId)", PathMap.Path_Paper_Submit, obj);
        },
    UserList: function (obj) {
            return ReplaceUrl("/Paper/UserList.html#paperId=(paperId)", PathMap.Path_Paper_UserList, obj);
        },
    },
    Question: {
    FocusList: function (obj) {
            return ReplaceUrl("/Question/FocusList.html#questionId=(questionId)", PathMap.Path_Question_FocusList, obj);
        },
    Index: function (obj) {
            return ReplaceUrl("/Question/Index.html#questionId=(questionId)", PathMap.Path_Question_Index, obj);
        },
    QuestionList: function (obj) {
            return "/Question/QuestionList.html";
        },
    UserFocusQuestionList: function (obj) {
            return ReplaceUrl("/Question/UserFocusQuestionList.html#userId=(userId)", PathMap.Path_Question_UserFocusQuestionList, obj);
        },
    UserQuestionList: function (obj) {
            return ReplaceUrl("/Question/UserQuestionList.html#userId=(userId)", PathMap.Path_Question_UserQuestionList, obj);
        },
    },
    Focus: function (obj) {
            return "/Focus.html";
        },
    ForgotPassword: function (obj) {
            return "/ForgotPassword.html";
        },
    Index: function (obj) {
            return "/Index.html";
        },
    LoginQuick: function (obj) {
            return "/LoginQuick.html";
        },
    Login: function (obj) {
            return "/Login.html";
        },
    Paste: function (obj) {
            return ReplaceUrl("/Paste.html#key=(key)", PathMap.Path_Paste, obj);
        },
    RegisterEmail: function (obj) {
            return "/RegisterEmail.html";
        },
    Register: function (obj) {
            return "/Register.html";
        },
    Search: function (obj) {
            return "/Search.html";
        },
    Setting: {
    ModifyPassword: function (obj) {
            return "/Setting/ModifyPassword.html";
        },
    MyInformation: function (obj) {
            return "/Setting/MyInformation.html";
        },
    MyResume: function (obj) {
            return "/Setting/MyResume.html";
        },
    NoticeSetting: function (obj) {
            return "/Setting/NoticeSetting.html";
        },
    },
    Training: {
    Index: function (obj) {
            return ReplaceUrl("/Training/Index.html#trainingId=(trainingId)", PathMap.Path_Training_Index, obj);
        },
    MySubmitList: function (obj) {
            return ReplaceUrl("/Training/MySubmitList.html#trainingId=(trainingId)", PathMap.Path_Training_MySubmitList, obj);
        },
    ProblemSubmitDetail: function (obj) {
            return ReplaceUrl("/Training/ProblemSubmitDetail.html#judgeId=(judgeId)", PathMap.Path_Training_ProblemSubmitDetail, obj);
        },
    Share: function (obj) {
            return ReplaceUrl("/Training/Share.html#trainingId=(trainingId)&userId=(userId)", PathMap.Path_Training_Share, obj);
        },
    TotalRankList: function (obj) {
            return ReplaceUrl("/Training/TotalRankList.html#trainingId=(trainingId)", PathMap.Path_Training_TotalRankList, obj);
        },
    TrainingLog: function (obj) {
            return ReplaceUrl("/Training/TrainingLog.html#trainingId=(trainingId)&userId=(userId)", PathMap.Path_Training_TrainingLog, obj);
        },
    },
    Tutorial: {
    ChapterIndex: function (obj) {
            return ReplaceUrl("/Tutorial/ChapterIndex.html#chapterId=(chapterId)&tutorialId=(tutorialId)", PathMap.Path_Tutorial_ChapterIndex, obj);
        },
    TutorialIndex: function (obj) {
            return ReplaceUrl("/Tutorial/TutorialIndex.html#tutorialId=(tutorialId)", PathMap.Path_Tutorial_TutorialIndex, obj);
        },
    TutorialList: function (obj) {
            return "/Tutorial/TutorialList.html";
        },
    },
    User: {
    FocusByUserList: function (obj) {
            return ReplaceUrl("/User/FocusByUserList.html#userId=(userId)", PathMap.Path_User_FocusByUserList, obj);
        },
    FocusUserList: function (obj) {
            return ReplaceUrl("/User/FocusUserList.html#userId=(userId)", PathMap.Path_User_FocusUserList, obj);
        },
    Index: function (obj) {
            return ReplaceUrl("/User/Index.html#userId=(userId)", PathMap.Path_User_Index, obj);
        },
    },
    },
};

Path.Path.Management = {
    ProblemList: function (obj) {
        return "//Management." + document.domain + "/Problem/ProblemList.html";
    },
    UserProblemList: function (obj) {
        return "//Management." + document.domain + "/Problem/UserProblemList.html";
    },
    TestProblemList: function (obj) {
        return "//Management." + document.domain + "/Problem/TestProblemList.html";
    },
    ProblemEdit: function (obj) {
        return ReplaceUrl("//Management." + document.domain + "/Problem/ProblemEdit.html#problemId=(problemId)", PathMap.Path_Challenge_Problem, obj);;
    },
};

Path.Path.Contest.ContestEdit  = function (obj) {
    return ReplaceUrl("//Management." + document.domain + "/Contest/ContestEdit.html#contestId=(contestId)", PathMap.Path_Contest_ContestDescription, obj);
};

Path.Path.Login = function (obj) {
    var path = window.location.pathname.toLocaleLowerCase();
    if (path === "/login.html" || path === "/register.html")
        return "/Login.html";
    else return "/Login.html?oldhref=" + encodeURIComponent(window.location.origin + window.location.pathname + window.location.search
        + window.location.hash.substring(window.location.hash.lastIndexOf('#')));
};
Path.Path.Register = function (obj) {
    var path = window.location.pathname.toLocaleLowerCase();
    if (path === "/login.html" || path === "/register.html")
        return "/Register.html";
    else return "/Register.html?oldhref=" + encodeURIComponent(window.location.origin + window.location.pathname + window.location.search
        + window.location.hash.substring(window.location.hash.lastIndexOf('#')));
};
Path.Path.LoginQuick = function (obj) {
    var path = window.location.pathname.toLocaleLowerCase();
    if (path === "/login.html" || path === "/register.html")
        return "/loginQuick.html";
    else return "/loginQuick.html?oldhref=" + encodeURIComponent(window.location.origin + window.location.pathname + window.location.search
        + window.location.hash.substring(window.location.hash.lastIndexOf('#')));
};