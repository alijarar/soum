import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { TreeNodeProps } from '@/types/types';

export const TreeNode: React.FC<TreeNodeProps> = ({ item, level, styles, onSelect, selectedItems }) => {
  const [expanded, setExpanded] = useState(false);

  const handlePress = () => {
    setExpanded(!expanded);
  };

  const handleSelect = () => {
    onSelect(item);
  };

  const isChecked = !!selectedItems[item.name]?.value;

  return (
    <View style={{ marginLeft: level * 20 }}>
      <View style={styles.nodeContainer}>
        <CheckBox value={isChecked} onValueChange={handleSelect} boxType={'square'} />
        <TouchableOpacity onPress={handlePress}>
          <Text style={[styles.nodeText, styles.customNodeText]}>{item.name}</Text>
        </TouchableOpacity>
      </View>
      {/* {expanded && item.children && ( */}
        <FlatList
          data={item.children}
          renderItem={({ item }) => (
            <TreeNode item={item} level={level + 1} styles={styles} onSelect={onSelect} selectedItems={selectedItems} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      {/* )} */}
    </View>
  );
};
