/**
 * lotteryRect
 * by sunjianfeng
 * 2019.06.04
 */
/*
【 1. 调用方式 】
var obj = new Lottery({
	id: 'lottery12', // id
	prefix: 'lottery-unit-', // class前缀，编号从0开始
	circle: 1, // 最少圈数
	onStart: function () {
		doAmsAction(1,2);
	},
	callback: function (msg) {
		alert(msg);
	}
});
function doAmsAction (amsId, flowid) {
	// xxx
	obj.rollStop(3, 'msgInfo'); // 成功回调中调用
	obj.reset(); // 失败回调
}
【 2. 特殊样式说明 】
td.lottery-unit .lottery-unit-x.active
.submit-btn.btn-down
 */
function Lottery (config) {
	var that = {};
	var obj = {};
	var btnObj = null;
	var id = 0;
	var prefix = '';
	var circle = config.circle || 2;
	var units = null;
	var count = 0; // 总个数
	var speed = 50; // 初始转动速度
	var index = -1; // 记录当前转动位置，起点
	var prize = -1; // 中奖位置
	var times = 0; // 转动次数
	var status = 0; // 是否进行中
	var cycle = 0; // 转动前置次数，圈数 * 每圈个数
	var timer = 0; // timer
	this.onStart = config.onStart || function () {}; // 前置事件
	this.callback = config.callback || function (index, msg) {}; // 回调
  this.initCheck = function () {
		if (!window.console) {
			window.console = function () {};
		}
		id = config.id
		prefix = config.prefix
		if (!id || !prefix) {
			console.log('Lottery init failed!');
			return that;
		}
		window.lubanLotteryIds || (window.lubanLotteryIds = []);
		if (window.lubanLotteryIds.indexOf(id) >= 0) {
			console.log('sign id failed!');
			return that;
		} else {
			window.lubanLotteryIds.push(id);
		}
		obj = $('#' + id);
		if (obj.size() === 0) {
			console.log('config id error!');
			return that;
		}
		units = obj.find('td[class*="'+prefix+'"]');
		count = units.size()
		if (count === 0) {
			console.log('config prefix or dom error!');
			return that;
		}
		btnObj = obj.find('.submit-btn');
		if (btnObj.size() === 0) {
			console.log('dom btn error!');
			return that;
		}
		return this.init()
	},
	this.init = function () {
		// init data
		index = -1;
		prize = -1;
		times = 0;
		status = 0;
		cycle = circle * count;
		speed = 50;
		timer = 0; // timer
		// bind submit
		btnObj.off('click').click(function(){
			if (status === 0) {
				units.removeClass('active');
				status = 1;
				that.onStart();
			}
		});
		return that = this;
	},
	this.rollStop = function (index, msg) {
		prize = index;
		if (prize >= count) {
			console.log('prize index error');
			clearTimeout(timer);
			return false;
		}
		this.roll(msg);
	}
	this.rollNext = function () {
		units.removeClass('active');
		if (++index > count-1) {
			index = 0;
		};
		var selector = '.' + prefix + index;
		obj.find(selector).addClass('active');
	},
	this.roll = function(msg) {
		if (times > cycle && prize === index) {
			clearTimeout(timer);
			that.init();
			that.callback(msg);
		} else {
			times += 1;
			that.rollNext();
			(times >= cycle - count) && (speed += 30);
			(speed > 250) && (speed = 250);
			timer = setTimeout(function() { that.roll(msg) }, speed);
		}
	}
	this.reset = function () {
		status = 0;
	};
	return this.initCheck()
}
