import { ChevronRightIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Tree } from "react-arborist";
import { FaFolder, FaFolderOpen } from "react-icons/fa6";
import { IoIosDocument } from "react-icons/io";

import SkeletonFileExplorer from "../Skeleton/skeleton-file-explorer";

interface FileStructure {
  path: string;
  files: string[];
  subdirectories: FileStructure[] | null;
}

interface TreeNode {
  id: string;
  name: string;
  children?: TreeNode[];
  isFolder: boolean;
}

interface FileStructureViewerProps {
  data: FileStructure;
  selectedItems: string[]; // Updated to accept an array of selected paths
  onSelectItem: (item: string) => void;
  isFetchLoading: boolean;
  status: boolean;
}

const FileStructureViewer: React.FC<FileStructureViewerProps> = ({
  data,
  selectedItems, // Updated prop name to reflect it's an array
  onSelectItem,
  isFetchLoading,
  status,
}) => {
  const [treeData, setTreeData] = useState<TreeNode[]>([]);

  useEffect(() => {
    setTreeData(transformData(data));
  }, [data]);

  function transformData(
    structure: FileStructure,
    parentPath = "",
    visitedPaths = new Set<string>() // Track processed paths
  ): TreeNode[] {
    const result: TreeNode[] = [];

    // Normalize the parentPath to ensure no trailing slashes
    const normalizedParentPath = parentPath.replace(/\/+$/, "");

    // Add folders
    if (structure?.subdirectories) {
      structure.subdirectories.forEach((subdir) => {
        if (subdir && subdir.path !== "") {
          const folderName = subdir.path.split("/").pop() || "Unnamed Folder";
          const fullPath = `${normalizedParentPath}/${folderName}`.replace(
            /\/+/g,
            "/"
          );

          // Skip adding if this path is already processed
          if (!visitedPaths.has(fullPath)) {
            visitedPaths.add(fullPath); // Mark the path as visited
            result.push({
              id: fullPath,
              name: folderName,
              children: transformData(subdir, fullPath, visitedPaths), // Pass visitedPaths recursively
              isFolder: true,
            });
          }
        }
      });
    }

    // Add files
    if (structure?.files) {
      structure.files.forEach((file) => {
        if (file !== "") {
          const fullPath = `${normalizedParentPath}/${file}`.replace(
            /\/+/g,
            "/"
          );

          // Skip adding if this path is already processed
          if (!visitedPaths.has(fullPath)) {
            visitedPaths.add(fullPath); // Mark the path as visited
            result.push({
              id: fullPath,
              name: file,
              isFolder: false,
            });
          }
        }
      });
    }

    return result;
  }

  const Node: React.FC<any> = ({ node, style, dragHandle }) => {
    const isFolder = node.data.isFolder;
    const displayName =
      node.data.name || (isFolder ? "Unnamed Folder" : "Unnamed File");
    const fullPath = node.id;
    const isSelected = selectedItems.includes(fullPath); // Check if the item is in the selectedItems array

    const handleClick = () => {
      onSelectItem(fullPath); // Notify the parent of the selected item
      if (isFolder && !node.isOpen) {
        node.toggle();
      }
    };

    return (
      <div
        style={style}
        ref={dragHandle}
        className={`flex items-center py-1 cursor-pointer transition-colors ${
          isSelected ? "bg-slate-200 text-black" : "hover:bg-gray-100"
        }`}
        onClick={handleClick}
      >
        {isFolder && (
          <ChevronRightIcon
            className={`w-4 h-4 mr-1 transition-transform ${
              node.isOpen ? "transform rotate-90" : ""
            }`}
            onClick={() => {
              node.toggle();
            }}
          />
        )}
        {isFolder ? (
          node.isOpen ? (
            <FaFolderOpen
              className={`w-5 h-5 mr-2 ${
                isSelected ? "text-yellow-500" : "text-yellow-500"
              }`}
            />
          ) : (
            <FaFolder
              className={`w-5 h-5 mr-2 ${
                isSelected ? "text-yellow-500" : "text-yellow-500"
              }`}
            />
          )
        ) : (
          <IoIosDocument
            className={`w-5 h-5 mr-2 ${
              isSelected ? "text-gray-500" : "text-gray-500"
            }`}
          />
        )}
        <span className="truncate">{displayName}</span>
      </div>
    );
  };

  return (
    <div
      className={`scrollbar-hide overflow-auto  text-text_color_desc_light dark:text-text_color_desc_dark transition-all duration-300 ${
        status === false ? "h-[100px]" : "h-[300px]"
      }`}
    >
      {isFetchLoading ? (
        <div className="flex  items-center justify-center  h-full">
          <SkeletonFileExplorer />
        </div>
      ) : treeData.length > 0 ? (
        <Tree
          data={treeData}
          width="100vw"
          indent={24}
          rowHeight={32}
          overscanCount={5}
          paddingTop={8}
          paddingBottom={8}
          openByDefault={false}
          className="scrollbar-hide"
        >
          {Node}
        </Tree>
      ) : (
        <div className="flex h-full items-center justify-center  text-center  text-text_color_desc_light dark:text-text_color_desc_dark">
          <p> No files or folders found</p>
        </div>
      )}
    </div>
  );
};

export default FileStructureViewer;