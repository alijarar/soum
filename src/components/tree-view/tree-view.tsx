import React, { useState } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import { Category, TreeNodeData, TreeViewProps } from "@/types/types";
import { TreeNode } from "../tree-node";
import { SelectedVariants } from "../selected-variants";


// Example data structure for products
const products: Category[] = [
  {
    name: "Mobile Phones",
    brands: [
      {
        name: "Apple",
        models: [
          {
            name: "iPhone 6",
            variants: [
              { name: "128 GB" },
              { name: "256 GB" },
              { name: "512 GB" },
            ],
          },
          {
            name: "iPhone 7",
            variants: [{ name: "64 GB" }, { name: "256 GB" }],
          },
        ],
      },
      {
        name: "Samsung",
        models: [
          {
            name: "Samsung S8",
            variants: [{ name: "32 GB" }, { name: "64 GB" }],
          },
        ],
      },
    ],
  },
  {
    name: "Watches",
    brands: [
      {
        name: "Rolex",
        models: [
          {
            name: "Submariner",
            variants: [{ name: "Black" }, { name: "Blue" }],
          },
          {
            name: "Daytona",
            variants: [{ name: "Gold" }, { name: "Platinum" }],
          },
        ],
      },
    ],
  },
  {
    name: "Computers",
    brands: [
      {
        name: "Dell",
        models: [
          {
            name: "XPS",
            variants: [{ name: "Core i5" }, { name: "Core i7" }],
          },
        ],
      },
    ],
  },
  {
    name: "TVs",
    brands: [
      {
        name: "LG",
        models: [
          {
            name: "OLED",
            variants: [{ name: "55-inch" }, { name: "65-inch" }],
          },
        ],
      },
    ],
  },
];
export const TreeView: React.FC<TreeViewProps> = ({ testID }) => {
  // State to keep track of selected items
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: any }>({});

  // Function to transform the original data into a tree structure
  const transformData = (data: Category[]): TreeNodeData[] => {
    return data.map((category) => ({
      name: category.name,
      type: "category",
      children: category.brands.map((brand) => ({
        name: brand.name,
        type: "brand",
        category: category.name,
        children: brand.models.map((model) => ({
          name: model.name,
          type: "model",
          brand: brand.name,
          children: model.variants.map((variant) => ({
            name: `${model.name} ${variant.name}`,
            type: "variant",
            model: model.name,
          })),
        })),
      })),
    }));
  };
  
  // Function to update the selection state
  const updateSelection = (items:TreeNodeData[], selected:boolean) => {
    let updatedSelection = { ...selectedItems };
    
    // Recursive function to toggle selection for an item and its children
    const toggleSelection = (item:TreeNodeData, value:boolean) => {
      if (value) {
        updatedSelection[item.name] = { ...item, value: true };
      } else {
        delete updatedSelection[item.name];
      }

      if (item.children) {
        item.children.forEach((child) => toggleSelection(child, value));
      }
    };

    items.forEach((item) => toggleSelection(item, selected));
    return updatedSelection;
  };

  // Handler for when an item is selected
  const handleSelect = (item: TreeNodeData) => {
    setSelectedItems((prevSelectedItems) => {
      const isSelected = !!prevSelectedItems[item.name];
      return updateSelection([item], !isSelected);
    });
  };
  
  // Transforming the data into a tree structure
  const treeData = transformData(products);

  return (
    <View style={styles.container} testID={testID ? `${testID}-container` : 'tree-view-container'}>
      <Text style={styles.selectedHeader} testID="browser-products-header">Browser Products</Text>
      <View style={styles.listContainer} testID="list-container">
        <FlatList
          data={treeData}
          renderItem={({ item }) => (
            <TreeNode
              item={item}
              level={0}
              styles={styles}
              onSelect={handleSelect}
              selectedItems={selectedItems}
              testID={`tree-node-${item.name}`}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          style={styles.listStyle}
          contentContainerStyle={{ flexGrow: 1 }}
          nestedScrollEnabled={true}
        />
      </View>
      <View style={styles.selectedContainer} testID="selected-variants-container">
        <Text style={styles.selectedHeader} testID="selected-variants-header">Selected Variants</Text>
        <SelectedVariants selectedItems={selectedItems} testID="selected-variants" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  listContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  listStyle: {
    width: "90%",
    height: 600,
    borderColor: "lightblue",
    borderWidth: 2,
    backgroundColor: "#C4C4C4",
  },
  nodeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  nodeText: {
    fontSize: 16,
    padding: 5,
  },
  selectedContainer: {
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  selectedHeader: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
