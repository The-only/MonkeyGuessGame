(function() {
	var start = xhong.$('start');
	var description = xhong.$('description');
	var norepeat = xhong.$('norepeat');

	var num1 = -1;
	var num2 = -1;
	var num3 = -1;
	var num4 = -1;

	var ensure = xhong.$('ensure');
	var showresult = xhong.$('showresult');

	var correct = [];

	var inputs = xhong.$('content').getElementsByTagName('input');

	var gameApp = {
		init: function() {
			this.bindEvent();
		},
		bindEvent: function() {
			var self = this;
			xhong.event.addEventListener(start, 'click', function() {
				self.startClick();
			});
			xhong.event.addEventListener(ensure, 'click', function() {
				self.ensureClick();
			});
			for (var i = 0; i < inputs.length; i++) {
				/*为什么不用keypress 因为keydown和keypress都是在文本框发生变化之前被触发的
				   而keyup事件则是在文本框已经发生变化之后被触发的。
				   keypress不同浏览器默认反应不一样
				   还有个问题：为什么用keypress 第四个数字丢了
				 */
				xhong.event.addEventListener(inputs[i], 'keyup', function() {

					var index = Array.prototype.indexOf.call(inputs,this);
					if(index != 4){
						if(index !==3){
							 inputs[index+1].value="";
						}
						inputs[index+1].focus();
					}
					if(index === 4){
						index = 0;
						inputs[index].focus();					}
				});
			}
		},
		/*随机产生数字*/
		selectFrom: function(lowerValue, upperValue) {
			var choices = upperValue - lowerValue + 1;
			return Math.floor(Math.random() * choices + lowerValue);
		},
		initData: function() {
			description.innerText = "新游戏开始啦~~~";
			description.style.color = '#29A23E';
			num1 = num2 = num3 = num4 = "";
			showresult.innerHTML = "";
			correct = [];
		},
		norepeatNumber: function() {
			var a = -1;
			for (var i = 0; i < 4; i++) {
				a = this.selectFrom(0, 9);
				while (correct.indexOf(a) != -1) {
					a = this.selectFrom(0, 9);
				}
				correct[correct.length] = a;
			}

			/*  第二种优化方法 
                var len = 0,
                    n, obj = {};
                while (len < 4) {
                    n = Math.floor(Math.random() * 10);
                    if (!obj.hasOwnProperty(n)) {
                        obj[n] = n;
                        len++;
                    }
                }
                for (var data in obj) {
                    correct.push(parseInt(data, 10));
                }*/

		},
		startClick: function() {
			this.initData();
			if (!norepeat.checked) {
				for (var i = 0; i < 4; i++) {
					correct[i] = this.selectFrom(0, 9);

				}
			} else {
				this.norepeatNumber();
			}
		},
		ensureClick: function() {
			if (correct.length === 0) {
				description.innerText = "请先点击开始~~~";
				description.style.color = '##FFA700';
				return;
			}
			num1 = xhong.$('num1').value;
			num2 = xhong.$('num2').value;
			num3 = xhong.$('num3').value;
			num4 = xhong.$('num4').value;
			if (isNaN(parseInt(num1)) || isNaN(parseInt(num2)) || isNaN(parseInt(num3)) || isNaN(parseInt(num4))) {
				return;
			}
			var input = [num1, num2, num3, num4];
			var a = 0,
				b = 0,
				flag = [0, 0, 0, 0];
			/*判断A的个数*/
			for (var i in input) {
				if (input[i] == correct[i]) {
					a++;
					flag[i] = 1;
				}
			}
			/*判断B的个数  注意理解这块代码*/
			for (var i in input) {
				for (var j in correct) {
					if (flag[i] == 1) break;
					if (flag[j] == 1) continue;
					if (input[i] == correct[j]) {
						b++;
						break;
					}
				}
			}
			if (a == 4) {
				showresult.innerHTML = '<p>' + input[0] + input[1] + input[2] + input[3] + ' ' + a + 'A' + b + 'B' + '&nbsp;&nbsp;' + '恭喜您，成功了~~</p>';
				description.innerText = "赶快点击游戏吧~~";
				return;
			} else {
				var p = document.createElement("p");
				p.appendChild(document.createTextNode('' + input[0] + input[1] + input[2] + input[3] + ' ' + a + 'A' + b + 'B'));
				showresult.insertBefore(p, showresult.firstChild);
			}
		}
	}
	gameApp.init();
})();