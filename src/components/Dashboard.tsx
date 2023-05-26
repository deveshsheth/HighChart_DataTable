import React, { FC, useState, useEffect } from 'react';

//chart
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

//mui material
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

// prime react
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import 'primeicons/primeicons.css';
import { Dropdown } from 'primereact/dropdown';
import { useNavigate } from 'react-router-dom';
import { Chart } from 'primereact/chart';
import { log } from 'console';



const Dashboard: FC<any> = () => {
    const navigate = useNavigate();

    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [globalFilter, setGlobalFilter] = useState('');
    const [yearOptions, setYearOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [options, setOptions] = useState([]);
    const [monthlyUserCount, setmonthlyUserCount] = useState({ month: 0, user_count: 0, month_number: 0 });
    const [statusData, setStatusData] = useState({ active: 0, inactive: 0, disabled: 0 });


    const handleMenuItemClick = (path: string) => {
        navigate(path);
    };

    const lineOptions = {
        title: {
            text: 'My Line'
        },
        series: [{
            data: [
                { name: 'Active', y: statusData.active },
                { name: 'Inactive', y: statusData.inactive },
                { name: 'Disabled', y: statusData.disabled }
            ]
        }]
    }

    const pieOptions = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
        },
        title: {
            text: 'My Pie'
        },
        series: [{
            data: [
                { name: 'Active', y: statusData.active },
                { name: 'Inactive', y: statusData.inactive },
                { name: 'Disabled', y: statusData.disabled }
            ]
        }]
    }

    const items = [
        {
            label: 'Charts',
            icon: 'pi pi-chart-bar',
            command: () => handleMenuItemClick('./'),
        },
        {
            label: 'Data Table',
            icon: 'pi pi-table',
            command: () => handleMenuItemClick('./userstable'),
        },

    ];

    useEffect(() => {

        const getMonthlyUserCounts = () => {
            fetch('http://localhost:9696/api/getMonthlyUserCounts')
                .then(res => res.json())
                .then(results => {
                    setmonthlyUserCount(results.data)
                    console.log("mon:", results.data);
                })
                .catch(err => {
                    console.log(err);
                });
        }

        const bardata = {
            labels: ["jan"],
            datasets: [
                {
                    label: 'user Data',
                    data: [540, 325, 702, 620, 888, 960, 845, 75, 65, 258, 875, 564],
                    backgroundColor: [
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',

                    ],
                    borderColor: [
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                    ],
                    borderWidth: 1
                }
            ]
        };

        const options = {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        };
        setChartData(bardata);
        setChartOptions(options);


        const fetchData = () => {
            fetch('http://localhost:9696/api/getUsersStatus')
                .then(res => res.json())
                .then(responsedata => {
                    console.log("data;; ", responsedata);

                    setStatusData({
                        active: responsedata.data[0].active,
                        inactive: responsedata.data[1].inactive,
                        disabled: responsedata.data[2].disabled,
                    });

                })
                .catch(err => {
                    console.log(err);
                });
        }

        const filterYearData = () => {
            fetch('http://localhost:9696/api/getFilterYear')
                .then(res => res.json())
                .then(responsedata => {
                    setOptions(responsedata.data[0]);
                })
                .catch(err => {
                    console.log(err);
                });
        }

        getMonthlyUserCounts();
        filterYearData();
        fetchData();
    }, []);

    const start = <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2"></img>;


    return (
        <React.Fragment>
            <Menubar model={items} start={start} />

            <Grid container spacing={2} justifyContent="center"
                alignItems="center" style={{ marginTop: '10px' }}>
                <Grid item xs={7} style={{ padding: '20px 20px 20px 20px' }}>
                    <Card sx={{ minWidth: 275 }} >
                        <CardContent>
                            <Dropdown value={selectedOption}
                                onChange={(e) => setSelectedOption(e.value)}
                                options={options} optionLabel="year"
                                placeholder="Select a Year" className="w-full md:w-14rem" />
                            <HighchartsReact
                                highcharts={Highcharts}
                                options={lineOptions}
                            />
                        </CardContent>
                    </Card>


                </Grid>
                <Grid item xs={4} style={{ padding: '20px 20px 20px 20px' }}>
                    <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                            <HighchartsReact
                                highcharts={Highcharts}
                                options={pieOptions}
                            />
                        </CardContent>
                    </Card>

                </Grid>
            </Grid>

            <Grid container spacing={2} justifyContent="center"
                alignItems="center" style={{ marginTop: '10px' }}>
                <Grid item xs={11} style={{ padding: '20px 20px 20px 20px' }}>
                    <Card sx={{ minWidth: 275 }} >
                        <CardContent>
                            <Chart type="bar" data={chartData} options={chartOptions} />
                        </CardContent>
                    </Card>


                </Grid>

            </Grid>

        </React.Fragment>
    );
};

export default Dashboard;