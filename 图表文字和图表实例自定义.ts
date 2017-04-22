


/**
 * 公用 图表展示文字 自定义Html方法
 */
function formatter(text, item) {
  let proportion = item.point && item.point.value || 0;
  proportion = (proportion).toFixed(2) + '%';
  return '<div class="chat-label front-color2"><span class="chat-lable-title">' + text +
    '</span></div>'; // 自定义 html 模板
}
let Util = G2.Util;
let Stat = G2.Stat;

//自定义lengend 图例hTML
function createLegend(chart, $legend) {
  var geom = chart.getGeoms()[0]; // 获取所有的图形
  var items = geom.getData(); // 获取图形对应的数据
  console.log(items);
  var stash = {};
  for (var i = 0, l = items.length; i < l; i++) {
    var item = items[i];
    var itemData = item._origin;
    var color = item.color;
    var name = itemData.name;
    var value = itemData.value;
    var trHtml = '<ul class="legend-item" data-name="' + name + '">' +
      '<li><span class="dot" style="background:' + color + ';"></span>' + name + '</li></ul>';
    var dom = $(trHtml).appendTo($legend);
    stash[name] = {
      dotDom: dom.find('.dot'),
      item: item,
      color: color,
      name: name,
      isChecked: true
    }
  }

  $(".legend-item ").click(function () {
    var name = $(this).data('name');
    filter(name);
  });

  function filter(name) {
    var obj = stash[name];
    var filterNames = [];
    obj.isChecked = obj.isChecked ? false : true;
    Util.each(stash, function (v) {
      if (v.isChecked) {
        v.dotDom.css('background', v.color);
        filterNames.push(v.name);
      } else {
        v.dotDom.css('background', '#999');
      }
    });
    chart.filter('name', filterNames)
    chart.repaint();
  }
};


/**
 * 数据统计1
 */
//模拟数据
var data = [
  { name: '合作社', value: 54.05 },
  { name: '其他', value: 0.23 },
  { name: '龙头企业', value: 5.57 },
  { name: '种植大户', value: 12.11 },
  { name: '家庭农场', value: 28.04 }
];
var chart = new G2.Chart({
  id: 'c1',
  forceFit: true,
  height: 450,
  plotCfg: {
    margin: [10, 20, 20, 80]
  }
});
chart.source(data);
// 重要：绘制饼图时，必须声明 theta 坐标系
chart.coord('theta', {
  radius: 0.6 // 设置饼图的大小
});
chart.legend(false); // 关掉自带图例
chart.tooltip({
  title: null,
  map: {
    value: 'value'
  }
});
chart.intervalStack()
  .position(Stat.summary.percent('value'))
  .color('name')
  .label('name', {
    custom: true, // 使用自定义文本
    renderer: formatter, // 格式化文本的函数
    labelLine: true, // 不显示文本的连接线
    offset: 50 // 文本距离图形的距离复制代码
  });

chart.render();
// 设置默认选中
var geom = chart.getGeoms()[0]; // 获取所有的图形
var items = geom.getData(); // 获取图形对应的数据
geom.setSelected(items[1]); // 设置选中
createLegend(chart, $('#legend_c1'));

/**
 * 数据统计2
 */
var dataw = [
  { name: '农商厂资', value: 54.05 },
  { name: '农商经贸', value: 0.23 },
  { name: '农机厂商', value: 5.57 },
  { name: '托管服务商', value: 12.11 },
  { name: '食品加工企业', value: 28.04 },
  { name: '农产品销售企业', value: 54.05 },
  { name: '冷链物流企业', value: 0.23 },
  { name: '农业金融公司', value: 5.57 },
  { name: '其它', value: 12.11 },

];
var chart = new G2.Chart({
  id: 'c2',
  forceFit: true,
  height: 450,
  plotCfg: {
    margin: [110, 20, 20, 120]
  }
});
chart.source(dataw);
// 重要：绘制饼图时，必须声明 theta 坐标系
chart.coord('theta', {
  radius: 0.75 // 设置饼图的大小
});

chart.legend(false); // 关掉自带图例
chart.tooltip({
  title: null,
  map: {
    value: 'value'
  }
});
chart.intervalStack()
  .position(Stat.summary.percent('value'))
  .color('name')
  .label('name', {
    custom: true, // 使用自定义文本
    renderer: formatter, // 格式化文本的函数
    labelLine: true, // 不显示文本的连接线
    offset: 50 // 文本距离图形的距离复制代码
  });
chart.render();
// 设置默认选中
var geom = chart.getGeoms()[0]; // 获取所有的图形
var items = geom.getData(); // 获取图形对应的数据
geom.setSelected(items[1]); // 设置选中
createLegend(chart, $('#legend_c2'));



/*数据统计3 */
var datass = [
  { value: 335, name: '购买化肥' },
  { value: 310, name: '购买良种1' },
  { value: 274, name: '购买农业2' },
  { value: 235, name: '灌溉服务1' },
  { value: 400, name: '收购与销售服务2' },
  { value: 300, name: '水利设施提供服务1' },
  { value: 100, name: '农耕服务2' },
  { value: 150, name: '播种服务121' },
  { value: 180, name: '打药的技术服务2' },
  { value: 280, name: '人工服务1' },
];
var chart = new G2.Chart({
  id: 'c3',
  forceFit: true,
  height: 450,
  plotCfg: {
    margin: 100
  }
});
chart.source(datass);
chart.legend(false);
// 绘制外圈饼图
var view = chart.createView();
view.source(datass);
view.coord('theta', {
  inner: 0.4 // 设置空心部分的大小
});
view.intervalStack()
  .position(Stat.summary.percent('value'))
  .color('name')
  .label('name*type', {
    custom: true, // 使用自定义文本
    renderer: formatter, // 格式化文本的函数
    labelLine: true, // 不显示文本的连接线
    offset: 50 // 文本距离图形的距离复制代码
  })
chart.render();
createLegend(view, $('#legend_c3'));







/*数据统计4 */
var datas = [
  { value: 335, name: '购买化肥1' },
  { value: 310, name: '购买良种' },
  { value: 274, name: '购买农业' },
  { value: 235, name: '灌溉服务' },
  { value: 400, name: '收购与销售服务' },
  { value: 300, name: '水利设施提供服务' },
  { value: 100, name: '农耕服务' },
  { value: 150, name: '播种服务' },
  { value: 180, name: '打药的技术服务' },
  { value: 280, name: '人工服务' },
];
var chart = new G2.Chart({
  id: 'c4',
  forceFit: true,
  height: 450,
  plotCfg: {
     margin: [10, 20, 20, 80]
  }
});
chart.source(datas);
chart.legend(false); // 关掉自带图例

// 绘制外圈饼图
var view = chart.createView();
view.source(datas);
view.coord('theta', {
  inner: 0.4, // 设置空心部分的大小
  radius: 0.6 // 设置饼图的大小
});

view.intervalStack()
  .position(Stat.summary.percent('value'))
  .color('name')
  .label('name*type', {
    custom: true, // 使用自定义文本
    renderer: formatter, // 格式化文本的函数
    labelLine: true, // 不显示文本的连接线
    offset: 50 // 文本距离图形的距离复制代码
  })

chart.render();
createLegend(view, $('#legend_c4'));
