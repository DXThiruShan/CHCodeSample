import React from 'react';
import { View, Text, ScrollView } from 'react-native';

import { StackedBarChart } from "react-native-chart-kit";
/**
 * Component
 * 
 */
const StackedBarComponent = ({ types, count, colors }) => {
  let data;
  if (types !== undefined && count !== undefined && colors !== undefined) {
    data = {
      labels: types,
      legend: [],
      data: count,
      barColors: colors
    };
  }
  return (
    <View>
      <ScrollView horizontal={true} style={{ marginTop: 5, marginRight: 15, marginLeft: 15, marginBottom: 5 }}>
        <StackedBarChart
          data={data}
          withHorizontalLabels={false}
          width={(types !== undefined && types.length > 0) ? (types.length * 115 + 230) : (10 * 105 + 230)}
          height={210}
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, style: {
              borderRadius: 5,
            },
            propsForBackgroundLines: {
              strokeWidth: 0,
            }
          }}
          style={{
            marginVertical: 5,
            borderRadius: 10,
          }}
        />
      </ScrollView>
    </View>
  )
}

export default StackedBarComponent;