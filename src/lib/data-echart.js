
var dataAxis = ['点', '击', '柱', '子', '或', '者', '两', '指', '在', '触', '屏', '上', '滑', '动', '能', '够', '自', '动', '缩', '放'];
var data = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220];
var yMax = 500;
var dataShadow = [];

for (var i = 0; i < data.length; i++) {
    dataShadow.push(yMax);
}

var option = {
  // title:{
  //   text:'交易额趋势'
  // },
  legend:{
    // data:[{name:'交易金额',textStyle:{color:'#333'}}],
    // backgroundColor:'#ccc'
  },
  color: ['#999'],
  tooltip : {
      trigger: 'axis',
      axisPointer : {            // 坐标轴指示器，坐标轴触发有效
          type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
  },
  grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
  },
  xAxis : [
      {
          type : 'category',
          data : ['一', '二', '三', '四', '五', '六', '七','八','九','十','十一','十二'],
          axisTick: {
              alignWithLabel: true
          }
      }
  ],
  yAxis : [
      {
          type : 'value'  
      }
  ],
  series : [
      {
          name:'直接访问',
          type:'bar',
          barWidth: '60%',
          data:[10, 52, 200, 334, 390, 330, 220,52, 200, 334, 390, 330]
      }
  ]
};

export default option