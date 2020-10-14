export const DEFAULT_THEME = {
    // colors: [
    //     '#dd7722',
    //     '#2288cc',
    //     '#dd3322',
    //     '#22aa99',
    //     '#bb4488',
    //     '#ddaa00',
    //     '#6655cc',
    //     '#99aa00'
    // ],
  
    chart: {
        backgroundColor: 'transparent',
        style: {
            fontFamily: 'Helvetica Neue',
            color: '#666666'
        },
        resetZoomButton: {
            theme: {
                fill: '#6accf1',
                style: {
                    color: 'white',
                    'text-transform': 'uppercase',
                    'border-radius': '2px',
                    stroke: 'white',
                    'stroke-width': 0.5,
                    'font-size': '12px'
                },
                'stroke-width': 0,
                states: {
                    hover: {
                        fill: '#4794b3',
                        style: {
                            color: 'white'
                        }
                    }
                }
            }
        }
    },
    title: {
        align: 'left',
        style: {
            fontFamily: 'Helvetica Neue',
            fontWeight: 'bold'
        }
    },
    subtitle: {
        align: 'left',
        style: {
            fontFamily: 'Helvetica Neue'
        }
    },
    legend: {
        align: 'right',
        verticalAlign: 'bottom'
    },
    xAxis: {
        gridLineWidth: 1,
        gridLineColor: '#efefef',
        lineColor: '#efefef',
        minorGridLineColor: '#efefef',
        tickColor: '#efefef',
        tickWidth: 1
    },
    yAxis: {
        gridLineColor: '#efefef',
        lineColor: '#efefef',
        minorGridLineColor: '#efefef',
        tickColor: '#efefef',
        tickWidth: 1
    },
    plotOptions: {
        line: {
            marker: {
                enabled: false
            }
        },
        spline: {
            marker: {
                enabled: false
            }
        },
        area: {
            marker: {
                enabled: false
            }
        },
        areaspline: {
            marker: {
                enabled: false
            }
        },
        bubble: {
            maxSize: '10%'
        }
    }
}