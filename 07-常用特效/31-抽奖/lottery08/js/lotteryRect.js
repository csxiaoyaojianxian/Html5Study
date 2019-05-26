/**
 * lotteryRect
 * by sunjianfeng
 * 2019.05.24
 */
/*
【 1. 调用方式 】
lotteryRect.init('lottery12', { // dom-id
	prize: 6, // 中奖位置
	cycle: 50, // 最少基本次数
	callback: function () {
		alert('test');
	}
});
【 2. 特殊样式说明 】
.lottery-unit .lottery-unit-x.active
.submit-btn.btn-down
 */
(function (w) {
	var lottery = {
		prize: -1, // 中奖位置
		speed: 100, // 初始转动速度
		cycle: 30, // 转动前置次数
		callback: function () {}, // 回调
		index: -1, // 记录当前转动位置，起点
		count: 0, // 总个数
		timer: 0, // timer
		times: 0, // 转动次数
		click: false, // 是否进行中
		obj: null,
		init: function (id, config) {
			var that = this;
			that.index = config.index || -1
			that.speed = config.speed || 100
			that.cycle = config.cycle || 30
			that.prize = config.prize || 0
			that.callback = config.callback || function() {}
            that.obj = $('#' + id);
            var units = that.obj.find('.lottery-unit');
			if (units.length>0) {
                that.count = units.length;
                units.removeClass('active');
				that.obj.find('.lottery-unit-' + that.index).addClass('active');
				// 绑定按钮操作
				var btn = that.obj.find('.submit-btn');
				btn.click(function(){
					btn.addClass('btn-down');
					setTimeout(function(){	
						btn.removeClass('btn-down');
					},200);
					if (!that.click) {
						that.roll();
						that.click = true;
					}
				
				});
			};
		},
		rollNext: function() {
			var that = this;
			var index = that.index;
			var count = that.count;
			var obj = that.obj;
			$(obj).find('.lottery-unit-' + index).removeClass('active');
			if (++index > count-1) {
				index = 0;
			};
			$(obj).find('.lottery-unit-' + index).addClass('active');
			that.index = index;
		},
		roll: function() {
            var that = this;
			if (that.times > that.cycle && that.prize === that.index) {
				clearTimeout(that.timer);
				that.times = 0;
				that.click = false;
				that.speed = 100;
				that.callback();
			} else {
                that.times += 1;
			    that.rollNext();
				(that.times >= that.cycle - that.count) && (that.speed += 30);
				(that.speed > 250) && (that.speed = 250);
				that.timer = setTimeout(function() { that.roll() }, that.speed);
			}
		}
	};
	w.lotteryRect = lottery;
})(window);