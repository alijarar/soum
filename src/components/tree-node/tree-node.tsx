import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { TreeNodeProps } from '@/types/types';

// TreeNode component representing each node in the tree structure
export const TreeNode: React.FC<TreeNodeProps> = ({ item, level, styles, onSelect, selectedItems, testID }) => {
  // State to manage whether the node is expanded (showing its children) or not
  const [expanded, setExpanded] = useState(false);

  // Function to toggle the expanded state
  const handlePress = () => {
    setExpanded(!expanded);
  };

  // Function to handle the selection of the node
  const handleSelect = () => {
    onSelect(item);
  };
  
  // Check if the current item is selected
  const isChecked = !!selectedItems[item.name]?.value;

  return (
    <View style={{ marginLeft: level * 20 }} testID={testID}>
      <View style={styles.nodeContainer} testID={`node-container-${item.name}`}>
        <CheckBox
          value={isChecked}
          onValueChange={handleSelect}
          boxType={'square'}
          testID={`checkbox-${item.name}`}
        />
        <TouchableOpacity onPress={handlePress} testID={`node-text-${item.name}`}>
          <Text style={[styles.nodeText, styles.customNodeText]}>{item.name}</Text>
        </TouchableOpacity>
      </View>
      {expanded && item.children && (
        <FlatList
          data={item.children}
          renderItem={({ item }) => (
            <TreeNode
              item={item}
              level={level + 1}
              styles={styles}
              onSelect={onSelect}
              selectedItems={selectedItems}
              testID={`tree-node-${item.name}`}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
};
