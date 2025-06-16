import React from 'react';
import Chart from 'react-apexcharts';

const RentedChart: React.FC = () => {
    
    const series = [
        {
            name: 'Full Houses',
            data: [120, 150, 300, 200, 100, 80, 220]
        },
        {
            name: 'Empty Houses',
            data: [180, 250, 400, 300, 150, 100, 300]
        },
       
    ];

    const options = {
        chart: {
            type: 'bar',
            stacked: true,
            toolbar: {
                show: false,
            }
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '20%',
                // endingShape: 'rounded'
                
                borderRadius: 8,     
                endingShape: 'flat'  
            },
        },
        xaxis: {
            categories: ['vijay Nagar', 'Kanadiya', 'Lig', 'Palasiya', 'Bangali', 'Khajarana', 'Nipaniya'],
        },
        yaxis: {
            title: {
                text: 'Amount'
            }
        },
        fill: {
            opacity: 0.8
        },
        legend: {
            position: 'top',
            horizontalAlign: 'left',
            offsetX: 10
        },
        dataLabels: {
            enabled: false
        },
        // colors: ['#1E90FF', '#FF6347'] 
    };

    return (
        
        <div id="chart">
            <Chart options={options} series={series} type="bar" height={400}/>
        </div>
    );
};

export default RentedChart;
