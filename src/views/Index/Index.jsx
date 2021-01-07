import React, { useEffect } from 'react';
import store from 'store/index'
import CountUp from 'react-countup';
import './Index.scss'
import { Card } from 'antd';
const echarts = require('echarts');

const Index = () => {
  let barChart = null
  let lineChart = null
  let pieChart = null
  let funnelChart = null
  function drawBar() {

    barChart = echarts.init(document.getElementById('bar_chart'))
    barChart.setOption({
      title: {
        text: 'ECharts 条形统计图'
      },
      // "backgroundColor": "rgb(20, 58, 110)",
      "color": [store.getState().config.theme],
      "tooltip": {},
      "grid": {
        "containLabel": false
      },
      "xAxis": [{
        "type": "category",
        "data": ["01月", "02月", "03月", "04月", "05月", "06月", "07月", "08月", "09月", "10月", "11月", "12月"],
        "axisTick": {
          "alignWithLabel": true
        },
        // "nameTextStyle": {
        //   "color": "#82b0ec"
        // },
        // "axisLine": {
        //   "lineStyle": {
        //     "color": "#82b0ec"
        //   }
        // },
        // "axisLabel": {
        //   "textStyle": {
        //     "color": "#82b0ec"
        //   }
        // }
      }],
      "yAxis": [{
        "type": "value",
        "axisLabel": {
          // "textStyle": {
          //   "color": "#82b0ec"
          // },
          "formatter": "{value}%"
        },
        "splitLine": {
          "lineStyle": {
            "color": "#0c2c5a"
          }
        },
        "axisLine": {
          "show": false
        }
      }],
      "series": [{
        "name": "",
        "type": "pictorialBar",
        "symbolSize": [20, 10],
        "symbolOffset": [0, -5],
        "symbolPosition": "end",
        "z": 12,
        "label": {
          "normal": {
            "show": true,
            "position": "top",
            "formatter": "{c}%"
          }
        },
        "data": [60, 70, 80, 90, 60, 70, 80, 90, 120, 50, 60, 80]
      }, {
        "name": "",
        "type": "pictorialBar",
        "symbolSize": [20, 10],
        "symbolOffset": [0, 5],
        "z": 12,
        "data": [60, 70, 80, 90, 60, 70, 80, 90, 120, 50, 60, 80]
      }, {
        "type": "bar",
        "itemStyle": {
          "normal": {
            "opacity": 0.7
          }
        },
        "barWidth": "20",
        "data": [60, 70, 80, 90, 60, 70, 80, 90, 120, 50, 60, 80],
        // "markLine": {
        //   "silent": true,
        //   "symbol": "none",
        //   "label": {
        //     "position": "middle",
        //     "formatter": "{b}"
        //   },
        //   "data": [{
        //     "name": "目标值",
        //     "yAxis": 80,
        //     "lineStyle": {
        //       "color": store.getState().config.theme
        //     },
        //     "label": {
        //       "position": "end",
        //       "formatter": "{b}\n {c}%"
        //     }
        //   }]
        // }
      },
      {
        type: 'effectScatter',
        silent: true,
        tooltip: {
          show: false
        },
        zlevel: 3,
        symbolSize: 10,
        showEffectOn: 'render',
        rippleEffect: {
          brushType: 'stroke',
          // color: '#3cefff',
          color: store.getState().config.theme,
          scale: 5
        },
        itemStyle: {
          color: store.getState().config.theme,
          // color: '#3cefff'
        },
        hoverAnimation: true,
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      },
      ]
    });
  }
  function drawLine() {

    lineChart = echarts.init(document.getElementById('line_chart'))
    lineChart.setOption({
      title: {
        text: 'ECharts 折线统计图'
      },
      color: [store.getState().config.theme],
      tooltip: {},
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
      }]
    });
  }
  function drawPie() {

    pieChart = echarts.init(document.getElementById('pie_chart'))
    var scaleData = [{
      'name': '红灯 14',
      'value': 14,
      'radius1': [108, 110],
      'radius2': '25%',
    }, {
      'name': '黄灯 32',
      'value': 32,
      'radius1': [130, 132],
      'radius2': '30%',
    }, {
      'name': '绿灯 288',
      'value': 288,
      'radius1': [152, 154],
      'radius2': '35%',
    }, {
      'name': '挂起 463',
      'value': 463,
      'radius1': [174, 176],
      'radius2': '40%'
    }
    ];
    var placeHolderStyle = {
      normal: {
        label: {
          show: false
        },
        labelLine: {
          show: false
        },
        color: 'rgba(0, 0, 0, 0)',
        borderColor: 'rgba(0, 0, 0, 0)',
        borderWidth: 0
      }
    };
    var seriesObj = [];
    var color = ['#FF647C', '#FFBE75', '#3EE2A5', '#6C77FD']
    for (var i = 0; i < scaleData.length; i++) {
      // console.log(scaleData[i].name)
      seriesObj.push({
        name: '',
        type: 'pie',
        radius: scaleData[i].radius1,
        hoverAnimation: false,
        itemStyle: {
          normal: {
            label: {
              show: false,
              color: '#ddd',
            },
          }
        },
        data: [{
          value: scaleData[i].value,
          name: scaleData[i].name,
          itemStyle: {
            normal: {
              borderWidth: 5,
              borderColor: color[i]
            }
          }
        }, {
          value: 200,
          name: '',
          itemStyle: placeHolderStyle
        }]
      }, {
        name: '',
        type: 'gauge',
        detail: false,
        splitNumber: 10, //刻度数量
        radius: scaleData[i].radius2, //图表尺寸
        center: ['50%', '50%'],
        startAngle: 0, //开始刻度的角度
        endAngle: -356, //结束刻度的角度
        axisLine: {
          show: false,
          lineStyle: {
            width: 0,
            shadowBlur: 0,
          }
        },
        axisTick: {
          show: true,
          lineStyle: {
            color: store.getState().config.theme,
            width: 5
          },
          length: 5,
          splitNumber: 5
        },
        splitLine: {
          show: false,
          length: 5,
          lineStyle: {
            color: 'rgba(220,220,220,0.1)',
          }
        },
        axisLabel: {
          show: false
        },
      });
    }
    pieChart.setOption({
      // backgroundColor: '#04243E',
      title: {
        text: 'ECharts 饼图'
      },
      color: color,
      tooltip: {
        show: false
      },
      legend: {
        orient: 'vertical',
        x: '100',
        y: 'center',
        itemGap: 35,
        data: ['挂起 463', '红灯 14', '黄灯 32', '绿灯 288'],
        show: true,
        textStyle: {
          color: store.getState().config.theme
        },
      },
      toolbox: {
        show: false
      },
      series: seriesObj
    });
  }
  function drawFunnel() {

    funnelChart = echarts.init(document.getElementById('funnel_chart'))
    funnelChart.setOption({
      // backgroundColor: {
      //   type: 'linear',
      //   x: 0,
      //   y: 0,
      //   x2: 0,
      //   y2: 1,
      //   colorStops: [{
      //     offset: 0,
      //     color: '#0c0d2b'
      //   }, {
      //     offset: 0.5,
      //     color: '#0a0c3d'
      //   }, {
      //     offset: 1,
      //     color: '#111629'
      //   }],
      //   globalCoord: false
      // },
      title: {
        text: 'ECharts 漏斗图'
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c}%"
      },

      legend: {
        data: ['A', 'B', 'C', 'D', 'E'],
        x: 'center',
        y: '92%',
        textStyle: {
          color: store.getState().config.theme
        }
      },

      color: ['#c2c1bd', '#00a1e5', '#23c768', '#e5ce10', '#ff7e00', '#fe0000',],

      series: [

        {
          name: 'TIT',
          type: 'funnel',
          left: 'center',
          width: '90%',
          sort: 'ascending',
          label: {
            normal: {
              formatter: '{b}',
            },

          },
          labelLine: {
            normal: {
              show: true,
              length: 30
            }
          },
          itemStyle: {
            normal: {
              opacity: 0.3
            }
          },
          tooltip: {
            show: false
          },

          data: [{
            value: 10,
            name: 'A'
          }, {
            value: 20,
            name: 'B'
          },
          {
            value: 40,
            name: 'C'
          },
          {
            value: 60,
            name: 'D'
          },
          {
            value: 80,
            name: 'E'
          },
          {
            value: 100,
            name: 'F'
          }
          ]
        },

        {
          name: 'TIT',
          type: 'funnel',
          left: 'center',
          width: '80%',
          maxSize: '80%',
          sort: 'ascending',
          label: {
            normal: {
              position: 'inside',
              formatter: '{c}%',
              textStyle: {
                color: '#fff',
                fontSize: 14,
              }
            },
            emphasis: {
              position: 'inside',
              formatter: '{b}: {c}%'
            }
          },
          itemStyle: {
            normal: {
              opacity: 0.8,
              borderColor: 'rgba(12, 13, 43, .9)',
              borderWidth: 3,
              shadowBlur: 5,
              shadowOffsetX: 0,
              shadowOffsetY: 5,
              shadowColor: 'rgba(0, 0, 0, .6)'
            }
          },

          data: [{
            value: 2,
            name: 'A'
          }, {
            value: 5,
            name: 'B'
          },
          {
            value: 12,
            name: 'C'
          },
          {
            value: 18,
            name: 'D'
          },
          {
            value: 25,
            name: 'E'
          },
          {
            value: 40,
            name: 'F'
          }
          ]
        }
      ]
    })
  }
  function callback() {
    barChart.resize()
    lineChart.resize()
    pieChart.resize()
    funnelChart.resize()
  }
  useEffect(() => {
    setTimeout(() => {
      drawBar()
      drawLine()
      drawPie()
      drawFunnel()
    }, 0);

    const reduxListener = store.subscribe(() => {
      drawBar()
      drawLine()
      drawPie()
      drawFunnel()
      setTimeout(() => {
        callback()
      }, 250);
    })
    window.onresize = () => {
      var timer;
      if (timer) { clearTimeout(timer) }
      timer = setTimeout(() => {
        callback()
      }, 100);
    }
    return () => {
      reduxListener()
      window.onresize = null
    }
    // eslint-disable-next-line
  }, [])
  return (
    <div>
      <div className="data_area">
        <Card title="总销售额" className="header_data_card">
          <CountUp
            start={0}
            end={330482}
            duration={3}
            separator=","
            decimals={0}
            decimal=","
            className="number_count"
          // prefix="EUR "
          // suffix=" left"
          >
          </CountUp>
        </Card>
        <Card title="访问量" className="header_data_card">
          <CountUp
            start={0}
            end={996}
            duration={3}
            separator=","
            decimals={0}
            decimal=","
            className="number_count"
          // prefix="EUR "
          // suffix=" left"
          >
          </CountUp>
        </Card>
        <Card title="支付笔数" className="header_data_card">

          <CountUp
            start={0}
            end={985}
            duration={3}
            separator=","
            decimals={0}
            decimal=","
            className="number_count"
          // prefix="EUR "
          // suffix=" left"
          >
          </CountUp>
        </Card>
        <Card title="运营效果" className="header_data_card">
          <CountUp
            start={0}
            end={211}
            duration={3}
            separator=","
            decimals={0}
            decimal=","
            className="number_count"
          // prefix="EUR "
          // suffix=" left"
          >
          </CountUp>
        </Card>
      </div>
      <div className="chart_area">
        <Card className="chart_card">
          <div id="bar_chart" style={{ width: '100%', height: '400px' }}></div>
        </Card>
        <Card className="chart_card">
          <div id="line_chart" style={{ width: '100%', height: '400px' }}></div>
        </Card>
        <Card className="chart_card">
          <div id="pie_chart" style={{ width: '100%', height: '400px' }}></div>
        </Card>
        <Card className="chart_card">
          <div id="funnel_chart" style={{ width: '100%', height: '400px' }}></div>
        </Card>
      </div>
    </div>
  );
};

export default Index;