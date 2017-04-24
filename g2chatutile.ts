
var G2 = G2;
/**
 * =========G2数据绑定加载
 * =========
 */


G2.track(false);
let Util = G2.Util;
let Stat = G2.Stat;
class G2Chates {

  /**
   * 
   * 饼图参数设置
   * @static
   * @param {*} _data 
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
  static _chatPie(_data: any, _margin: number[], $_id: string, _forceFit: boolean, _height: number, _radius: number, _islegend: boolean, $_legend_Id: string) {
    let chart = new G2.Chart({
      id: $_id,
      forceFit: _forceFit,
      height: _height,
      plotCfg: {
        margin: _margin
      }
    });
    chart.source(_data);
    // 重要：绘制饼图时，必须声明 theta 坐标系
    chart.coord('theta', {
      radius: _radius // 设置饼图的大小
    });
    chart.legend(_islegend); // 是否关掉图例
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
        renderer: G2_Utile.formatter, // 格式化文本的函数
        labelLine: true, // 不显示文本的连接线
        offset: 50 // 文本距离图形的距离复制代码
      });

    chart.render();
    // 设置默认选中
    var geom = chart.getGeoms()[0]; // 获取所有的图形
    var items = geom.getData(); // 获取图形对应的数据
    geom.setSelected(items[1]); // 设置选中
    G2_Utile.createLegend(chart, $($_legend_Id), '.legend-item');
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
  static _chatPieAnnular(_data: any, _margin: number[], $_id: string, _forceFit: boolean, _height: number, _radius: number, _islegend: boolean, _inner: number, $_legend_Id: string) {
    var chart = new G2.Chart({
      id: $_id,
      forceFit: _forceFit,
      height: _height,
      plotCfg: {
        margin: _margin
      }
    });
    chart.source(_data);
    chart.legend(_islegend);
    // 绘制外圈饼图
    var view = chart.createView();
    view.source(_data);
    view.coord('theta', {
      inner: _inner,// 设置空心部分的大小
      radius: _radius // 设置饼图的大小
    });
    view.intervalStack()
      .position(Stat.summary.percent('value'))
      .color('name')
      .label('name*type', {
        custom: true, // 使用自定义文本
        renderer: G2_Utile.formatter, // 格式化文本的函数
        labelLine: true, // 不显示文本的连接线
        offset: 50 // 文本距离图形的距离复制代码
      })
    chart.render();
    G2_Utile.createLegend(view, $($_legend_Id), '.legend-item');
  }
}