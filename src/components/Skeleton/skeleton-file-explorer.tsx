import { Folder, File } from 'lucide-react'

const SkeletonItem = ({ isFolder }: { isFolder: boolean }) => (
  <div className="flex items-center space-x-2 mb-2">
    <div className="w-4 h-4  rounded-sm animate-pulse">
      {isFolder ? <Folder className="w-4 h-4 text-gray-300" /> : <File className="w-4 h-4 text-gray-300" />}
    </div>
    <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
  </div>
)

const SkeletonFolder = ({ depth = 0 }: { depth?: number }) => (
  <div className={`ml-${depth * 4}`}>
    <SkeletonItem isFolder={true} />
    {depth < 2 && (
      <>
        <SkeletonItem isFolder={false} />
        <SkeletonFolder depth={depth + 1} />
        <SkeletonItem isFolder={false} />
      </>
    )}
  </div>
)

export default function SkeletonFileExplorer() {
  return (
    <div className="p-4 mt-5 w-full mx-auto  rounded-xl  overflow-hidden">
      <div className="animate-pulse space-y-4">
        <div className="h-4  rounded w-1/4"></div>
        <SkeletonFolder />
        <SkeletonItem isFolder={false} />
        <SkeletonFolder />
      </div>
    </div>
  )
}

