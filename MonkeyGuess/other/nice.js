var randomData;
(function() {
    var AllTag = Nice.getTag("input"),
        RealInput = [],
        StartElement = Nice.$("start"),
        GoButton = Nice.$("go"),
        Remind = Nice.$("remind"),
        Result = Nice.$("Result"),
        Warn = Nice.$("warn"),
        warnStart = Nice.$("warnStart"),
        Success = Nice.$("success"),
        GameCollect = {
            init: function() {
                for (var i = 1; i < AllTag.length; i++) {
                    RealInput.push(AllTag[i]);
                }
                this.initEvent();
            },
            initEvent: function() {
                var me = this;
                Nice.event.addEventListener(StartElement, "click", function() {
                    me.StartGameHandler();
                });
                Nice.event.addEventListener(GoButton, "click", function() {
                    me.CompareGameResult();
                });
                for (var i = 0; i < RealInput.length; i++) {
                    Nice.event.addEventListener(RealInput[i],"keypress",function(){
                        var Index = RealInput.indexOf(this);
                        me.keyPressFocus(Index);
                    });
                }
            },
            keyPressFocus: function(index) {
                if(index!=3){
                    RealInput[index+1].focus();
                }
            },
            GenerateUniversalNumber: function() {
                var arr = [];
                for (var i = 0; i < 4; i++) {
                    arr.push(Math.floor(Math.random() * 10));
                }
                return arr;
            },
            GenerateOnlyNumber: function() {
                var arr = [],
                    len = 0,
                    n, obj = {};
                while (len < 4) {
                    n = Math.floor(Math.random() * 10);
                    if (!obj.hasOwnProperty(n)) {
                        obj[n] = n;
                        len++;
                    }
                }
                for (var data in obj) {
                    arr.push(parseInt(data, 10));
                }
                return arr;
            },
            CompareDeffArray: function(origin, nowdata) {
                var compareData = {};
                compareData.A = 0;
                compareData.B = 0;
                compareData.C = 0;
                for (var i = 0; i < origin.length; i++) {
                    for (var j = 0; j < nowdata.length; j++) {
                        if (i === j && origin[i] === nowdata[j]) {
                            compareData.A++;
                        }
                    }
                    if (nowdata.indexOf(origin[i]) != -1) {
                        compareData.C++;
                    }
                }
                compareData.B = compareData.C - compareData.A;
                return compareData;
            },
            JudgeandGetInputNumber: function() {
                var data = {};
                data.arr = [];
                data.flag = 1;
                Nice.Tools.forEach(RealInput, function(elem) {
                    if (elem.value.search(/[^0-9]{1}/) !== -1 || elem.value.length !== 1) {
                        data.flag = 0;
                    } else {
                        data.arr.push(parseInt(elem.value, 10));
                    }
                });
                return data;
            },
            StartGameHandler: function() {
                Result.innerHTML = "";
                if (AllTag[0].checked) {
                    randomData = this.GenerateOnlyNumber();
                } else {
                    randomData = this.GenerateUniversalNumber();
                }
                this.Show(Remind);
                this.Hiden(warnStart);
                RealInput[0].focus();
            },
            CompareGameResult: function() {
                var InputData = this.JudgeandGetInputNumber();
                if (randomData === undefined) {
                    this.Show(warnStart);
                    return;
                }
                if (InputData.flag === 0) {
                    this.Show(Warn);
                    return;
                }
                this.Hiden(Warn);
                this.Hiden(warnStart);
                var ResultCompareData = this.CompareDeffArray(randomData, InputData.arr);
                this.OutputToHtml(InputData.arr, ResultCompareData);

            },
            OutputToHtml: function(InputData, ResultCompareData) {
                var me = this;
                var stringdata = InputData.join("");
                var comResult = ResultCompareData.A + "A" + ResultCompareData.B + "B";
                var para = document.createElement("p");
                var SumString = stringdata + "   " + comResult;
                para.innerHTML = SumString;
                if (Result.firstChild === null) {
                    Result.appendChild(para);
                } else {
                    Result.insertBefore(para, document.getElementsByTagName("p")[0]);
                }
                if (ResultCompareData.A === 4) {
                    me.Show(Success);
                    Nice.event.doClick(StartElement);
                } else {
                    me.Hiden(Success);
                }
            },
            Hiden: function(elem) {
                elem.style.display = "none";
            },
            Show: function(elem) {
                elem.style.display = "inline";
            }

        };
    GameCollect.init();
})();