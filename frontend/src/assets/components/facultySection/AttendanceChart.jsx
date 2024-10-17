
// AttendanceChart.js
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title);

const AttendanceChart = () => {
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        const fetchAttendanceData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/performance/attendance-performance');
                if (!response.ok) throw new Error('Failed to fetch attendance data');
                const data = await response.json();

                // Prepare data for the chart
                const labels = data.map(student => student.name);
                const presentCounts = data.map(student => student.totalPresent);
                const absentCounts = data.map(student => student.totalAbsent);

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: 'Total Present',
                            data: presentCounts,
                            backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        },
                        {
                            label: 'Total Absent',
                            data: absentCounts,
                            backgroundColor: 'rgba(255, 99, 132, 0.6)',
                        },
                    ],
                });
            } catch (error) {
                console.error('Error fetching attendance data:', error);
            }
        };

        fetchAttendanceData();
    }, []);

    return (
        <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-xl font-bold text-center mb-4">Attendance Overview</h2>
            <Bar
                data={chartData}
                options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Attendance Statistics',
                        },
                    },
                }}
            />
        </div>
    );
};

export default AttendanceChart;
