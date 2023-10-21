import { createSignal } from 'solid-js'
import { Line } from 'solid-chartjs'

export default function BatteryReleaseChartCard(props: {droneId: number}) {
    const [data] = createSignal({
        labels: Array.from({length: 10}, (_,i) => i + 1), //times in seconds
        datasets: [
            {
                label: 'Battery Voltage', 
                data: Array.from({length: 10}, () => Math.random() * 10), //Random voltage values
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tenson: 0.1
            }
        ]
    })
    return (
        <div>
            <Line data={data()} options = {{
                type: 'line',
                responsive: true, 
                scales: {
                    x: {
                        title: {
                            display: true, 
                            text: 'Time (seconds)'
                        }
                    },
                    y: {
                        title: {
                            display: true, 
                            text: 'Voltage (V)'
                        }
                    }
                }
            }} />
        </div>
    )    
}


// import { onMount } from 'solid-js'
// import { Chart, Title, Tooltip, Legend, Colors } from 'chart.js'
// import { Line } from 'solid-chartjs'
// export default function BatteryReleaseChartCard(props: {droneId: number}) {
//         /**
//          * You must register optional elements before using the chart,
//          * otherwise you will have the most primitive UI
//          */
//         onMount(() => {
//             Chart.register(Title, Tooltip, Legend, Colors)
//         })
    
//         const chartData = {
//             labels: ['January', 'February', 'March', 'April', 'May'],
//             datasets: [
//                 {
//                     label: 'Sales',
//                     data: [50, 60, 70, 80, 90],
//                 },
//             ],
//         }
//         const chartOptions = {
//             responsive: true,
//             maintainAspectRatio: false,
//         }
    
//         return (
//             <div>
//                 <Line data={chartData} options={chartOptions} width={500} height={500} />
//             </div>
//         )
        
// }
    