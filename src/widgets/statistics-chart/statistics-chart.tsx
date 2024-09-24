'use client';

import { ComponentPropsWithoutRef, FC } from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

export type StatisticsData = {
    userId: string;
    statistics: Array<{
        name: string;
        examPosition: number;
        wrongCount: number;
        correctCount: number;
    }>;
};

type StatisticsChartProps = ComponentPropsWithoutRef<'div'> & {
    data: StatisticsData;
};

export const StatisticsChart: FC<StatisticsChartProps> = (props) => {
    const { data } = props;

    return (
        <div className="h-96 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    width={500}
                    height={300}
                    data={data.statistics}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                        name="Решено верно"
                        dataKey="correctCount"
                        stackId="a"
                        fill="#65a30d"
                    />
                    <Bar
                        name="Решено неверно"
                        dataKey="wrongCount"
                        stackId="a"
                        fill="#f87171"
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};
