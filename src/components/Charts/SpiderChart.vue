<template>
  <div class="chart">
    <div id="container" style="width:80%; height:400px;"></div>

  </div>
</template>
<script>
export default {
  name: 'spider-chart',
  props: {
    categories: {
      type: Array
    },
    series: {
      Type: Array
    }
  },
  methods: {
    renderChart(categories, series) {
      (function () {
        {
          Highcharts.chart('container', {

            chart: {
              polar: true,
              type: 'line'
            },

            accessibility: {
              description: 'Valence: A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry). Acousticness: A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic. Danceability: Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable. Energy: Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy.'
            },

            title: {
              text: 'Track audio features',
              x: -80
            },

            pane: {
              size: '80%'
            },

            xAxis: {
              categories,
              tickmarkPlacement: 'on',
              lineWidth: 0
            },

            yAxis: {
              gridLineInterpolation: 'polygon',
              lineWidth: 0,
              min: 0
            },

            tooltip: {
              shared: true,
              pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y}</b><br/>'
            },

            legend: {
              align: 'right',
              verticalAlign: 'middle',
              layout: 'vertical'
            },

            series,

            responsive: {
              rules: [{
                condition: {
                  maxWidth: 500
                },
                chartOptions: {
                  legend: {
                    align: 'center',
                    verticalAlign: 'bottom',
                    layout: 'horizontal'
                  },
                  pane: {
                    size: '70%'
                  }
                }
              }]
            }

          });

        }
      })()
    }
  },
  mounted() {
    this.renderChart(this.categories, this.series)
  },
}
</script>

<style>
.chart {
  display: flex;
  width: 100%;
  justify-content: center;
}
</style>