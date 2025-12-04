import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface VoteChartProps {
  voteData: {
    option: string;
    count: number;
  }[];
  chartType?: 'pie' | 'bar';
  title?: string;
}

const VoteChart: React.FC<VoteChartProps> = ({
  voteData,
  chartType = 'pie',
  title = '投票结果'
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // 初始化图表实例
    chartInstanceRef.current = echarts.init(chartRef.current);

    // 窗口大小变化时，重新调整图表大小
    const handleResize = () => {
      chartInstanceRef.current?.resize();
    };

    window.addEventListener('resize', handleResize);

    // 清理函数
    return () => {
      window.removeEventListener('resize', handleResize);
      chartInstanceRef.current?.dispose();
    };
  }, []);

  useEffect(() => {
    if (!chartInstanceRef.current || !voteData || voteData.length === 0) return;

    // 准备图表数据
    const optionNames = voteData.map(item => item.option);
    const optionCounts = voteData.map(item => item.count);

    // 图表配置
    let option: echarts.EChartsOption;

    if (chartType === 'pie') {
      // 饼图配置
      option = {
        title: {
          text: title,
          left: 'center',
          textStyle: {
            fontSize: 18,
            fontWeight: 'bold'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        // 饼图不需要坐标轴，明确设置不显示
        xAxis: {
          show: false
        },
        yAxis: {
          show: false
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: optionNames
        },
        series: [
          {
            name: '投票数',
            type: 'pie',
            radius: '50%',
            center: ['50%', '60%'],
            data: voteData.map(item => ({
              value: item.count,
              name: item.option
            })),
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            label: {
              formatter: '{b}: {c} ({d}%)'
            }
          }
        ]
      };
    } else {
      // 柱状图配置
      option = {
        title: {
          text: title,
          left: 'center',
          textStyle: {
            fontSize: 18,
            fontWeight: 'bold'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: '{b}: {c}'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: optionNames,
            axisTick: {
              alignWithLabel: true
            },
            show: true
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '投票数',
            axisLabel: {
              formatter: '{value}'
            },
            show: true
          }
        ],
        series: [
          {
            name: '投票数',
            type: 'bar',
            barWidth: '60%',
            data: optionCounts,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#83bff6' },
                { offset: 0.5, color: '#188df0' },
                { offset: 1, color: '#188df0' }
              ]),
              borderRadius: [4, 4, 0, 0]
            },
            label: {
              show: true,
              position: 'top',
              formatter: '{c}'
            }
          }
        ]
      };
    }

    // 设置图表配置
    chartInstanceRef.current.setOption(option);
  }, [voteData, chartType, title]);

  return (
    <div
      ref={chartRef}
      style={{ width: '100%', height: '400px', margin: '20px 0' }}
    />
  );
};

export default VoteChart;