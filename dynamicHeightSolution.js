/* dynamicHeightSolution.js */
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { FlatList, Text, View, StyleSheet, ViewPropTypes } from 'react-native';

const Item = ({ title }) => {
  const textRef = useRef(null);
  const [itemHeight, setItemHeight] = useState(0);

  useEffect(() => {
    const measureText = async () => {
      if (textRef.current) {
        textRef.current.measure((x, y, width, height, pageX, pageY) => {
          setItemHeight(height);
        });
      }
    };
    measureText();
  }, [title]);

  if (itemHeight === 0) {
    return null; // Or use a placeholder component
  }

  return (
    <View style={{ height: itemHeight, backgroundColor: '#f9c2ff' }}>
      <Text ref={textRef}>{title}</Text>
    </View>
  );
};

const DynamicHeightFlatList = () => {
  const data = [...Array(30)].map((_, index) => ({ id: index, title: `Item ${index + 1}` }));

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <Item title={item.title} />}
      keyExtractor={(item) => item.id}
    />
  );
};

export default DynamicHeightFlatList;

const styles = StyleSheet.create({});