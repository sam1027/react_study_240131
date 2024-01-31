import {useQuery} from 'react-query';
import { fetchCoinHistory } from '../api';
import ApexCharts from "react-apexcharts";

interface ChartProps{
    coinId: string;
}

interface IHistorical {
    time_open: number;
    time_close: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}

function Chart({coinId}: ChartProps) {
    const {isLoading, data} = useQuery<IHistorical[]>(
        ["chart", coinId], 
        () => fetchCoinHistory(coinId),
        {
            refetchInterval: 10000,
        }
    );
    return (
        <div>
            {isLoading ? 
                "Loading Chart..." : 
                <ApexCharts 
                    type='line' 
                    series={[
                        {
                            name: "Price",
                            data: data?.map(price => price.close) ?? [],
                        }
                    ]}
                    options={{
                        theme: {
                            mode: 'dark',
                        },
                        chart: {
                            height: 300,
                            width: 500,
                            toolbar: {
                                show: false,
                            },
                            background: "transparent",
                        },
                        stroke: {
                            curve: 'smooth',
                            width: 3,
                        },
                        grid: {
                            show: false,
                        },
                        yaxis: {
                            show: false,
                        },
                        xaxis: {
                            labels: {
                                show: false,
                            },
                            axisTicks: {
                                show: false,
                            },
                            axisBorder: {
                                show: false,
                            },
                            categories: data?.map(price => new Date(price.time_close * 1000).toDateString()),
                            type: "datetime",
                        },
                        fill: {
                            type: "gradient",
                            gradient: {
                                gradientToColors: ["#fff200"],
                                stops: [0, 100],
                            },
                        },
                        colors: ["#7158e2"],
                        tooltip: {
                            y: {
                                formatter: (value) => `$${value.toFixed(2)}`,
                            }
                        }
                    }}
                />
            }
        </div>
    );
}

export default Chart;