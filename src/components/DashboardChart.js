import React from 'react'
import { GoogleCharts } from 'google-charts'

const DashboardChart = (props) => {
    const { data } = props
    const chartData = [['Total', 'Points'], ...data]

    GoogleCharts.load(drawChart);

    function drawChart() {
        const data = GoogleCharts.api.visualization.arrayToDataTable(chartData);
        var options = {
            title: 'Score',
            is3D: true,
            // slices: {
            //     0: { color: 'green' },
            //     1: { color: 'red' }
            //   }
        };
        const pie_1_chart = new GoogleCharts.api.visualization.PieChart(document.getElementById('chart1'));
        pie_1_chart.draw(data, options);
    }
    return (
        <div id='chart1' style={{ margin: '0px', padding: '0px', width: '650px', height: '400px' }}></div>
    )
}
export default DashboardChart