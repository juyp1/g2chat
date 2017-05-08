
var G2=G2;

/**  
 * =========G2数据绑定加载
 * ========= 
 */


G2.track(false);
let Util = G2.Util;
let Stat = G2.Stat;
let Frame = G2.Frame;
  class  G2Chates {

  /**
   * 
   * 饼图参数设置
   * @static
   * @param {*} _data 需要的数据值
   * @param {number[]} _margin 
   * @param {string} $_id 
   * @param {boolean} _forceFit 
   * @param {number} _height 
   * @param {number} _radius 
   * @param {boolean} _islegend 
   * @param {string} $_legend_Id 
   * 
   * @memberOf G2Chates
   */
  static _chatPie(_data: any, _margin: number[], $_id: string, _forceFit: boolean, _height: number, _radius: number, _islegend: boolean, $_legend_Id: string, _property: string) {
    let chart = new G2.Chart({
      id: $_id,
      forceFit: _forceFit,
      height: _height,
      plotCfg: {
        margin: _margin
      }
    });

    let frame = new Frame(_data);
    frame = Frame.sort(frame, _property); // 将数据按照属性 进行排序，由大到小
    chart.source(frame);
    // 重要：绘制饼图时，必须声明 theta 坐标系
    chart.coord('theta', {
      radius: _radius // 设置饼图的大小
    });
    chart.legend(_islegend); // 是否关掉图例
    chart.tooltip({
      title: null,
      map: {
        value: _property
      }
    });
    chart.intervalStack()
      .position(Stat.summary.percent(_property))
      .color('name')
      .label('name', {
        custom: true, // 使用自定义文本
        renderer: G2_Utile.formatter, // 格式化文本的函数
        labelLine: true, // 不显示文本的连接线
        offset: 50 // 文本距离图形的距离复制代码
      });

    chart.render();
    // 设置默认选中
    let geom = chart.getGeoms()[0]; // 获取所有的图形
    let items = geom.getData(); // 获取图形对应的数据
    geom.setSelected(items[1]); // 设置选中
    if (!_islegend) {
      G2_Utile.createLegend(chart, $($_legend_Id), '.legend-item');
    }
  }

  /**
   * 空心饼图参数设置
   * 
   * @static
   * @param {*} _data 
   * @param {number[]} _margin 
   * @param {string} $_id 
   * @param {boolean} _forceFit 
   * @param {number} _height 
   * @param {number} _radius 
   * @param {boolean} _islegend 
   * @param {number} _inner 
   * @param {string} $_legend_Id 
   * 
   * @memberOf G2Chates
   */
  static _chatPieAnnular(_data: any, _margin: number[], $_id: string, _forceFit: boolean, _height: number, _radius: number, _islegend: boolean, _inner: number, $_legend_Id: string, _property: string) {
    let chart = new G2.Chart({
      id: $_id,
      forceFit: _forceFit,
      height: _height,
      plotCfg: {
        margin: _margin
      }
    });
    let frame = new Frame(_data);
    frame = Frame.sort(frame, _property); // 将数据按照属性 进行排序，由大到小
    chart.source(frame);
    chart.legend(_islegend);
    // 绘制外圈饼图
    let view = chart.createView();
    view.source(_data);
    view.coord('theta', {
      inner: _inner,// 设置空心部分的大小
      radius: _radius // 设置饼图的大小
    });
    chart.tooltip({
      title: _property,
      map: {
        value: _property
      }
    });
    view.intervalStack()
      .position(Stat.summary.percent(_property))
      .color('name')
      .label('name*type', {
        custom: true, // 使用自定义文本
        renderer: G2_Utile.formatter, // 格式化文本的函数
        labelLine: true, // 不显示文本的连接线
        offset: 50 // 文本距离图形的距离复制代码
      })
    chart.render();
    if (!_islegend) {
      G2_Utile.createLegend(view, $($_legend_Id), '.legend-item');
    }
  }

  /**
   * 南丁格尔玫瑰图
   * @param _data 
   * @param _margin 
   * @param _id 
   * @param _forceFit 
   * @param _height 
   * @param _islegend 
   * @param _inner 
   * @param _legend_Id 
   * @param property 
   */
  static _chatPolar(_data: any, _margin: number[], $_id: string, _forceFit: boolean, _height: number, _islegend: boolean, $_legend_Id: string, _property: string) {
    let chart = new G2.Chart({
      id: $_id,
      forceFit: _forceFit,
      height: _height,
      plotCfg: {
        margin: _margin
      }
    });
    chart.source(_data, {
      'cost': {
        min: 0
      }
    });
    chart.coord('polar');
    chart.axis('cost', {
      labels: null
    });
    chart.axis(_property, {
      gridAlign: 'middle',
      labelOffset: 10,
      labels: {
        label: {
          textAlign: 'center' // 设置坐标轴 label 的文本对齐方向
        }
      }
    });
    chart.legend(_islegend); // 是否关掉图例
    chart.interval().position(_property + '*cost')
      .color(_property, 'rgb(252,143,72)-rgb(255,215,135)')
      .label('cost', { offset: -15, label: { textAlign: 'center', fontWeight: 'bold' } })
      .style({
        lineWidth: 1,
        stroke: '#fff'
      });
    chart.render();
    if (!_islegend) {
      G2_Utile.createLegend(chart, $($_legend_Id), '.legend-item');
    }
  }

  /**
   * 
   * 横向柱状图
   * @static
   * @param {*} _data 
   * @param {number[]} _margin 
   * @param {string} $_id 
   * @param {boolean} _forceFit 
   * @param {number} _height 
   * @param {boolean} _islegend 
   * @param {string} $_legend_Id 
   * @param {string} property 
   * 
   * @memberOf G2Chates
   */
  static _chatBar(_data: any, _margin: number[], $_id: string, _forceFit: boolean, _height: number, _islegend: boolean, $_legend_Id: string, _property: string, _value: string) {
    let frame = new Frame(_data);
    frame = Frame.sort(frame, _value); // 将数据按照对应的属性 进行排序，由大到小
    let chart = new G2.Chart({
      id: $_id,
      forceFit: _forceFit,
      height: _height,
      plotCfg: {
        margin: _margin
      }
    });
    chart.source(frame);
    chart.legend(_islegend); // 是否关掉默认图例开启自定义图例
    chart.axis('province', {
      title: null
    });
    chart.coord('rect').transpose();
    chart.interval().position(`${_property}*${_value}`);
    chart.render();
    // if(!false){
    //  G2_Utile.createLegend(chart, $($_legend_Id), '.legend-item');
    // }

  }


  /**
   * 环形图
   * @param _data 
   * @param _margin 
   * @param _id 
   * @param _forceFit 
   * @param _height 
   * @param _radius 
   * @param _islegend 
   * @param _inner 
   * @param _legend_Id 
   * @param _property 
   */
  static _chatAnnular(_data: any, _margin: number[], $_id: string, _forceFit: boolean, _height: number, _radius: number, _islegend: boolean, _inner: number, $_legend_Id: string, _property: string, _value: string) {
    let frame = new Frame(_data);
    frame = Frame.sort(frame, _value); // 将数据按照对应的属性 进行排序，由大到小
    let chart = new G2.Chart({
      id: $_id,
      forceFit: _forceFit,
      height: _height,
      plotCfg: {
        margin: _margin
      }
    });
    chart.source(frame);
    chart.legend(_islegend); // 是否关掉默认图例开启自定义图例
    chart.coord('theta', {
      inner: _inner,// 设置空心部分的大小
      radius: _radius // 设置饼图的大小
    });
    chart.tooltip({
      title: null
    });
    chart.intervalStack().position(Stat.summary.percent(_value))
      .color(_property)
      .label('..percent', {
        offset: -2,
      })
      .style({
        lineWidth: 1
      });
    chart.render();
    if (!_islegend) {
      G2_Utile.createLegend(chart, $($_legend_Id), '.legend-item');
    }
  }

  /**
   * 折线叠线图
   * @param _data 
   * @param _Id 
   * @param _forceFit 
   * @param _height 
   * @param _margin 
   * @param _islegend 
   * @param _typename 
   * @param _legend_Id 
   */
  static _chatLine(_data: any, $_Id: string, _forceFit: boolean, _height: number, _margin: number[], _islegend: boolean, _typename: string[], $_legend_Id: string) {
    var chart = new G2.Chart({
      id: $_Id,
      forceFit: _forceFit,
      height: _height,
      plotCfg: {
        margin: _margin
      }
    });
    chart.legend(_islegend); // 是否关掉默认图例开启自定义图例
    chart.source(_data);
    chart.line().position('x*y').color('name').size(3).shape('name', _typename); // 展示不同的 step 算法
    chart.render();
    if (!_islegend) {
      G2_Utile.createLegend(chart, $($_legend_Id), '.legend-item');
    }
  }


  /**
   * 雷达图
   * @param _data 数据
   * @param $_Id 要显示的位置ID
   * @param _foceFit 是否动态跟随大小变化
   * @param _height 高度
   * @param _margin 位置
   * @param _min 最小值
   * @param _max 最大值
   * @param _tickCount 总数
   * @param _legend 配置具体字段对应的图例属性
   * @param _islegend 是否启用自带图例
   * @param _item  配置具体字段对应的图例属性
   * @param _value 设置坐标系栅格样式
   * @param _type 圆形栅格，可以改成
   * @param $_legend_Id 自定义图例显示的位置
   */
  static _chatRadar(_data: any, $_Id: string, _foceFit: boolean, _height: number,
    _margin: number[], _min: number, _max: number, _tickCount: number, _legend: string, _islegend: boolean, _item: string,
    _value: string, _type: string, $_legend_Id: string) {

    let chart = new G2.Chart({
      id: $_Id,
      forceFit: _foceFit,
      height: _height,
      plotCfg: {
        margin: _margin
      }
    });
    chart.source(_data, {
      'value': {
        min: _min,
        max: _max,
        tickCount: _tickCount
      }
    });
    chart.coord('polar');
    chart.legend(_islegend); // 是否关掉默认图例开启自定义图例
    chart.axis(_item, { // 设置坐标系栅格样式
      line: null
    });
    chart.axis(_value, { // 设置坐标系栅格样式
      grid: {
        type: _type //圆形栅格，可以改成
      }
    });
    chart.line().position(`${_item}*${_value}`).color(_legend);
    chart.point().position(`${_item}*${_value}`).color(_legend).shape('circle');
    chart.area().position(`${_item}*${_value}`).color(_legend);
    chart.render();
    if (!_islegend) {
      G2_Utile.createLegend(chart, $($_legend_Id), '.legend-item');
    }
  }

  /**
   * 
   * @param _data 显示的数据结构
   * @param _frame 排序字段
   * @param _Id 要显示的位置
   * @param _forceFit 是否自适用
   * @param _height 高度
   * @param _margin 位置
   * @param _axis 显示的头部字段信息
   * @param _color 柱状图颜色
   * @param _stroke 字体Lable颜色
   * @param _islegend 是否显示图例
   * @param _legend_Id 图例显示的位置
   */
  static _chatBar_Transverse(_data: any, _frame: string, $_Id: string, _forceFit: boolean,
    _height: number, _margin: number[],
    _axis: string, _color: string[], _stroke: string,
    _islegend: boolean, $_legend_Id: string, _ytitle: string, _xtitle: string) {
    var frame = new Frame(_data);
    frame = Frame.sort(frame, _frame); //排序，由大到小
    var chart = new G2.Chart({
      id: $_Id,
      forceFit: _forceFit,
      height: _height,
      plotCfg: {
        margin: _margin
      }
    });
    chart.source(frame, {
      'value': {
        alias: _ytitle
      }, 'name': {
        tickInterval: 5,
        alias: _xtitle
      }
    });
    chart.legend(_islegend); // 是否关掉默认图例开启自定义图例

    let _position = `${_axis}*${_frame}`;
    chart.interval().position(_position)
      .color(_axis, _color)
      .label(12121)
      .style({
        stroke: _stroke,
        lineWidth: 2
      });
    chart.render();
    if (!_islegend) {
      G2_Utile.createLegend(chart, $($_legend_Id), '.legend-item');
    }
  }
}

