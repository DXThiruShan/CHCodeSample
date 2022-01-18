import React from 'react';
import { View } from 'react-native';

import Svg from 'react-native-svg';
import { VictoryPie, VictoryLabel } from "victory-native";
/**
 * Component
 * 
 */
const PieChartComponent = ({pieChartData, pieChartColor}) => {
    return (
        <View>
            <Svg viewBox="0 0 400 400" >
                <VictoryPie colorScale={pieChartColor}
                    standalone={false}
                    width={450} height={450}
                    data={pieChartData}
                    innerRadius={0} labelRadius={60}
                    style={{ labels: { fontSize: 45 } }}
                />

                <VictoryLabel
                    textAnchor="end" verticalAnchor="middle"
                    x={200} y={200}
                    style={{ fontSize: 30 }}
                />
            </Svg>
        </View>
    );
}

export default PieChartComponent;