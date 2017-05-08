/**
 * ==============G2 自己构造的方法
 */
class G2_Utile {
    /**
     * 
     * 字体格式自定义设置
     * @param {any} text 
     * @param {any} item 
     * @returns 
     */
    static formatter(text, item): string {
        let proportion = item.point && item.point.value || 0;
        proportion = (proportion).toFixed(2) + '%';
        return '<div class="chat-label front-color2"><span class="chat-lable-title">' + text +
            '</span></div>'; // 自定义 html 模板
    }

    /**
     *
     *自定义Legend 
     * @param {any} chart 
     * @param {any} $legend 
     */
    static createLegend(chart, $legend, $_legendId): void {
        let geom = chart.getGeoms()[0]; // 获取所有的图形
        let items = geom.getData(); // 获取图形对应的数据
        let stash = {};
        for (let i = 0, l = items.length; i < l; i++) {
            let item = items[i];
            let itemData = item._origin;
            let color = item.color;
            let name
            if (itemData.name != undefined) {
                name = itemData.name;
            } else {
                name = item.shape;

            }
            let value = itemData.value;
            let trHtml = '<ul class="legend-item" data-name="' + name + '">' +
                '<li><span class="dot" style="background:' + color + ';"></span>' + name + '</li></ul>';
            let dom = $(trHtml).appendTo($legend);
            stash[name] = {
                dotDom: dom.find('.dot'),
                item: item,
                color: color,
                name: name,
                isChecked: true
            }
        }

        $($_legendId).click(function () {
            let name = $(this).data('name');
            filter(name);
        });

        function filter(name) {
            let obj = stash[name];
            let filterNames = [];
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
}

class Utitle {
    /**
 *双向数据绑定 
 */
    static DataBinder(objectId) {
        // 使用jQuery空对象作为监听对象
        let pubSub = jQuery({});
        //
        let dataAttr = 'bind-' + objectId;
        let message = objectId + ':change';
        // 监听dom中所有元素的 data-binding 属性变化。并由pubSub来处理。
        $(document).on('input change', '[data-' + dataAttr + ']', function (event) {
            let $ele = $(this);
            pubSub.trigger(message, [$ele.data(dataAttr), $ele.val()]);
        });
        // pubSub把数据变化推送给所有与之绑定的页面元素
        pubSub.on(message, function (event, proName, newValue) {
            $('[data-' + dataAttr + '=' + proName + ']').each(function () {
                let $ele = $(this);
                if ($ele.is('input, textarea, select')) {
                    $ele.val(newValue);
                } else {
                    $ele.html(newValue);
                }
            })
        });
        return pubSub;
    }
    static User(uid) {

        let binder = this.DataBinder(uid);
        let user = {
            attributes: {},
            set: function (attrName, val) {
                this.attributes[attrName] = val;
                binder.trigger(uid + ':change', [attrName, val, this]);
            },
            get: function (attrName) {
                return this.attributes[attrName];
            },
            _binder: binder
        }
        return user;
    }
}