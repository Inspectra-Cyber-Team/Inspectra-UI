import { ChevronRightIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Tree } from "react-arborist";
import { FaFolder } from "react-icons/fa6";
import { IoIosDocument } from "react-icons/io";

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
  selectedItem: string | null;
  onSelectItem: (item: string) => void;
}

const FileStructureViewer: React.FC<FileStructureViewerProps> = ({
  data,
  selectedItem,
  onSelectItem,
}) => {
  const [treeData, setTreeData] = useState<TreeNode[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setTreeData(transformData(data));
  }, [data]);

  useEffect(() => {
    const updateDimensions = () => {
      const container = document.getElementById("file-structure-container");
      if (container) {
        setDimensions({
          width: container.clientWidth,
          height: container.clientHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  function transformData(
    structure: FileStructure,
    parentPath = ""
  ): TreeNode[] {
    const result: TreeNode[] = [];

    // Add folders
    if (structure?.subdirectories) {
      structure.subdirectories.forEach((subdir) => {
        if (subdir && subdir.path !== "") {
          const fullPath = `${parentPath}/${subdir.path}`;
          const name = subdir.path.split("/").pop() || "Unnamed Folder";
          result.push({
            id: fullPath,
            name: name,
            children: transformData(subdir, fullPath),
            isFolder: true,
          });
        }
      });
    }

    // Add files
    if (structure?.files) {
      structure.files.forEach((file) => {
        if (file !== "") {
          result.push({
            id: `${parentPath}/${file}`,
            name: file,
            isFolder: false,
          });
        }
      });
    }

    return result;
  }

  const Node: React.FC<any> = ({ node, style, dragHandle }) => {
    const isFolder = node.data.isFolder;
    const displayName =
      node.data.name || (isFolder ? "Unnamed Folder" : "Unnamed File");

    return (
      <div
        style={style}
        ref={dragHandle}
        className={`flex items-center py-1 cursor-pointer ${
          selectedItem === displayName ? "bg-blue-100" : ""
        }`}
        onClick={() => {
          onSelectItem(displayName);
          if (isFolder) {
            node.toggle();
          }
        }}
      >
        {isFolder && (
          <ChevronRightIcon
            className={`w-4 h-4 mr-1 transition-transform ${
              node.isOpen ? "transform rotate-90" : ""
            }`}
          />
        )}
        {isFolder ? (
          <FaFolder className="w-5 h-5 mr-2 text-yellow-500" />
        ) : (
          <IoIosDocument className="w-5 h-5 mr-2 text-gray-500" />
        )}
        <span className="truncate">{displayName}</span>
      </div>
    );
  };

  return (
    <div
      id="file-structure-container"
      className="h-[200px] overflow-auto scrollbar-hide"
    >
      {treeData.length > 0 ? (
        <Tree
          data={treeData}
          width={dimensions.width}
          height={dimensions.height}
          indent={24}
          rowHeight={32}
          overscanCount={5}
          paddingTop={8}
          paddingBottom={8}
          openByDefault={false}
        >
          {Node}
        </Tree>
      ) : (
        <div className="flex mt-10 items-center justify-center h-full text-text_color_light">
          <div className="spinner-border  animate-spin inline-block w-6 h-6 border-2 rounded-full border-t-2 border-text_color_light border-t-transparent"></div>
        </div>
      )}
    </div>
  );
};

export default FileStructureViewer;
