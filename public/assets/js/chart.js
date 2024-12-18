$(function () { 
    var myChart = Highcharts.chart('container', {
      chart: {
        type: 'areaspline',
        zoomType: 'x',
         resetZoomButton: {
            position: {
                x: -70,
                y: 10
            },
            relativeTo: 'chart',
            theme: {
                fill: 'white',
                style: {
                    color: '#719e19',
                    text: {
                        y: '15'
                    },

                },
                stroke: 'silver',
                r: 1,
                states: {
                    hover: {
                        fill: '#F5F7DC'
                    }
                }
            }
        },
      },
      title: {
        text: 'Bid Views'
      },
      xAxis: {
         categories: ['1D', '5D', '1M', '3M', '6M', '1Y', '2Y']
      },
      yAxis: {
        title: {
            text: 'Bid Views'
          }
      },
      legend: {
          enabled: false
      },
      plotOptions: {
        area: {
          marker: {
              radius: 2
          },
          lineWidth: 1,
          states: {
              hover: {
                  lineWidth: 1
              }
          },
          threshold: null
        }
      },
      series: [{
        type: 'area',
        name: 'usd to uah',
        data: [29.9, 30.0, 29.75, 29.5, 28.5, 28.0]
      }],
      navigation: {
        buttonOptions: {
          enabled: false
        }
      }
    });
  });

 // Initialize Flatpickr with the "range" mode
 flatpickr("#dateRangePicker", {
    mode: "range",
    dateFormat: "Y-m-d", // Set date format (adjust as needed)
    onChange: function(selectedDates, dateStr, instance) {
        console.log("Selected Dates: ", selectedDates); // Selected start and end dates
        console.log("Formatted Date Range: ", dateStr); // Output the range as a string
    }
});