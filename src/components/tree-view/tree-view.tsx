import React, { useState } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import { Category, TreeNodeData, TreeViewProps } from "@/types/types";
import { TreeNode } from "../tree-node";
import { SelectedVariants } from "../selected-variants";

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

export const TreeView: React.FC<TreeViewProps> = () => {
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: any }>(
    {}
  );

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

  const handleSelect = (item: TreeNodeData) => {
    setSelectedItems((prevSelectedItems) => {
      const newSelectedItems = { ...prevSelectedItems };
      if (newSelectedItems[item.name]) {
        delete newSelectedItems[item.name];
      } else {
        newSelectedItems[item.name] = { ...item, value: true };
      }
      return newSelectedItems;
    });
  };

  const treeData = transformData(products);
  // console.log("treeData",JSON.stringify(treeData))

  return (
    <View style={styles.container}>
      <Text style={styles.selectedHeader}>Browser Products</Text>
      <View style={styles.listContainer}>
        <FlatList
          data={treeData}
          renderItem={({ item }) => (
            <TreeNode
              item={item}
              level={0}
              styles={styles}
              onSelect={handleSelect}
              selectedItems={selectedItems}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          style={styles.listStyle}
          contentContainerStyle={{ flexGrow: 1 }}
          nestedScrollEnabled={true}
        />
      </View>
      <View style={styles.selectedContainer}>
        <Text style={styles.selectedHeader}>Selected Variants</Text>
        <SelectedVariants selectedItems={selectedItems} />
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
