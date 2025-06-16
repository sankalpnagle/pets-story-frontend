import React from 'react';
import Chart from 'react-apexcharts';

const LineChart: React.FC = () => {
    
    const series = [
        {
            name: 'Rent',
            data: [1200, 1500, 1300, 1400, 1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300]
        },
    ];

    const options = {
        chart: {
            type: 'line',
            toolbar: {
                show: false,
            }
        },
        stroke: {
            curve: 'smooth'
        },
        markers: {
            size: 5,
            colors: ['#FFA41B'],
            strokeColors: '#fff',
            strokeWidth: 2,
            hover: {
                size: 7,
            }
        },
        xaxis: {
            categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        },
        yaxis: {
            title: {
                text: 'Rent Amount'
            }
        },
        legend: {
            position: 'top',
            horizontalAlign: 'left',
            offsetX: 10
        },
        dataLabels: {
            enabled: false
        },
    };

    return (
        <div id="chart">
            <Chart options={options} series={series} type="line" height={400}/>
        </div>
    );
};

export default LineChart;
