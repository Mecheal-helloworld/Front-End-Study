/**
 * 此代码是由51nod的夹克老爷写的程序生成的，所以不要手动修改，因为下次又会被覆盖
 */
/**
 * 此代码是由51nod的夹克老爷写的程序生成的，所以不要手动修改，因为下次又会被覆盖
 */
var Permission = {
	IsProblemEditor : function (per) {
		return (per & 1) === 1;
	},
	IsProblemReviewer : function (per) {
		return (per & 2) === 2;
	},
	IsTutorialEditor : function (per) {
		return (per & 4) === 4;
	},
	IsProblemAdmin : function (per) {
		return (per & 8) === 8;
	},
	IsContestEditor : function (per) {
		return (per & 16) === 16;
	},
	IsLiveEditor : function (per) {
		return (per & 32) === 32;
	},
	IsLiveReviewer : function (per) {
		return (per & 64) === 64;
	},
	IsLiveAdmin : function (per) {
		return (per & 128) === 128;
	},
	IsContestReviewer : function (per) {
		return (per & 256) === 256;
	},
	IsContestAdmin : function (per) {
		return (per & 512) === 512;
	},
	IsTutorialAdmin : function (per) {
		return (per & 1024) === 1024;
	},
	IsExamEditor : function (per) {
		return (per & 2048) === 2048;
	},
	IsExamReviewer : function (per) {
		return (per & 4096) === 4096;
	},
	IsExamAdmin : function (per) {
		return (per & 8192) === 8192;
	},
	IsCourseReviewer : function (per) {
		return (per & 16384) === 16384;
	},
	IsCourseAdmin : function (per) {
		return (per & 32768) === 32768;
	},
	IsClassInfoReviewer : function (per) {
		return (per & 65536) === 65536;
	},
	IsClassInfoAdmin : function (per) {
		return (per & 131072) === 131072;
	},
	IsPaperEditor : function (per) {
		return (per & 262144) === 262144;
	},
	IsPaperReviewer : function (per) {
		return (per & 524288) === 524288;
	},
	IsPaperAdmin : function (per) {
		return (per & 1048576) === 1048576;
	},
	IsSchoolReviewer : function (per) {
		return (per & 2097152) === 2097152;
	},
	IsSchoolAdmin : function (per) {
		return (per & 4194304) === 4194304;
	},
	IsProductAdmin : function (per) {
		return (per & 8388608) === 8388608;
	},
	IsTextbookReviewer : function (per) {
		return (per & 16777216) === 16777216;
	},
	IsTextbookAdmin : function (per) {
		return (per & 33554432) === 33554432;
	},
	IsAgent : function (per) {
		return (per & 1073741824) === 1073741824;
	},
	IsAdmin : function (per) {
		return (per & 2147483647) === 2147483647;
	},

    Powers : [0, 0, 1, 26, 2, 23, 27, 0, 3, 16, 24, 30, 28, 11, 0, 13, 4, 7, 17, 0, 25, 22, 31, 15, 29, 10, 12, 6, 0, 21, 14, 9, 5, 20, 8, 19, 18],

    Lowbit: function (pre) {
		if(pre == 2147483647)
			return 0;
        
		return this.Powers[pre % 37];
    },
	
	Max : 30,
};