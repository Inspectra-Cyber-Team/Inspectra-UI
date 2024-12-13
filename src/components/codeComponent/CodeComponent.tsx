"use client";

import * as React from "react";
import { FaFolder, FaFileAlt } from "react-icons/fa";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, ChevronDown } from "lucide-react";
import { useGetCodeQuery } from "@/redux/service/code";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type CodeMetric = {
  key: string;
  name: string;
  line: string;
  coverage: number;
  security: number;
  reliability: number;
  maintainability: number;
  securityHotspots: number;
  duplications: number;
  isBaseComponent: boolean;
  qualifier: string;
};

const columns: ColumnDef<CodeMetric>[] = [
  {
    accessorKey: "name",
    header: "Component",
    cell: ({ row }) => {
      const isBase = row.original.isBaseComponent;
      const qualifier = row.original.qualifier;

      return (
        <div
          className={
            isBase
              ? "font-bold flex items-center group"
              : "flex items-center group cursor-pointer"
          }
        >
          {qualifier === "DIR" && (
            <FaFolder className={isBase?"mr-2 text-orange-400":"mr-2 text-orange-400 group-hover:underline"} />
          )}
          {qualifier === "FIL" && (
            <FaFileAlt className="mr-2 text-gray-600 group-hover:text-blue-500" />
          )}
          <span
            className={
              qualifier === "DIR"
                ? "group-hover:underline"
                : "group-hover:text-blue-500"
            }
          >
            {row.getValue("name")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "line",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Line
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("line")}</div>,
    enableHiding: true,
  },
  {
    accessorKey: "coverage",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Coverage
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("coverage")}%</div>,
  },
  {
    accessorKey: "security",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Security
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("security") || 0}</div>,
  },
  {
    accessorKey: "reliability",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Reliability 
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("reliability")}</div>,
  },
  {
    accessorKey: "maintainability",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Maintainability
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("maintainability")}</div>,
  },
  {
    accessorKey: "securityHotspots",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Security Hotspots
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("securityHotspots")}</div>,
  },
  {
    accessorKey: "duplications",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Duplications
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("duplications")}%</div>,
  },
];

type CodeComponentProps = Readonly<{
  projectName: string;
}>;

export default function CodeComponent({ projectName }: CodeComponentProps) {
  
  const router = useRouter();

  const [componentName, setComponentName] = React.useState<string>("");

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const [rowSelection, setRowSelection] = React.useState({});

  React.useEffect(() => {
    if (!componentName && projectName) {
      setComponentName(projectName);
    }
  }, [componentName, projectName]);

  const {
    data: codeData,
    error: codeError,
    isLoading: codeIsLoading,
  } = useGetCodeQuery({ projectName: componentName, page: 1, size: 10 });

  const metrics: CodeMetric[] = React.useMemo(() => {
    if (!codeData) return [];

    const baseComponent = codeData?.[0]?.baseComponent;
    const components = codeData?.[0]?.components || [];

    const baseMetric = {
      key: baseComponent?.key || "",
      name: baseComponent?.name || "Base Component",
      coverage: parseFloat(
        baseComponent?.measures.find((m: any) => m.metric === "coverage")
          ?.value || "0"
      ),
      security: parseInt(
        baseComponent?.measures.find((m: any) => m.metric === "bugs")?.value ||
          "0"
      ),
      reliability:
        JSON.parse(
          baseComponent?.measures.find(
            (m: any) => m.metric === "reliability_issues"
          )?.value || "{}"
        ).total || 0,
      maintainability:
        JSON.parse(
          baseComponent?.measures.find(
            (m: any) => m.metric === "maintainability_issues"
          )?.value || "{}"
        ).total || 0,
      securityHotspots: parseInt(
        baseComponent?.measures.find(
          (m: any) => m.metric === "security_hotspots"
        )?.value || "0"
      ),
      line:
        baseComponent?.measures.find((m: any) => m.metric === "ncloc")?.value ||
        "0",
      duplications: parseFloat(
        baseComponent?.measures.find(
          (m: any) => m.metric === "duplicated_lines_density"
        )?.value || "0"
      ),
      qualifier: baseComponent?.qualifier,
      isBaseComponent: true,
    };

    const componentMetrics = components.map((comp: any) => ({
      key: comp.key,
      name: comp.name,
      coverage: parseFloat(
        comp.measures.find((m: any) => m.metric === "coverage")?.value || "0"
      ),
      reliability:
        JSON.parse(
          comp.measures.find((m: any) => m.metric === "reliability_issues")
            ?.value || "{}"
        ).total || 0,
      maintainability:
        JSON.parse(
          comp.measures.find((m: any) => m.metric === "maintainability_issues")
            ?.value || "{}"
        ).total || 0,
      securityHotspots: parseInt(
        comp.measures.find((m: any) => m.metric === "security_hotspots")
          ?.value || "0"
      ),
      duplications: parseFloat(
        comp.measures.find((m: any) => m.metric === "duplicated_lines_density")
          ?.value || "0"
      ),
      line: comp.measures.find((m: any) => m.metric === "ncloc")?.value || "0",
      qualifier: comp.qualifier,
      isBaseComponent: false,
    }));

    return [baseMetric, ...componentMetrics];
  }, [codeData]);

  const table = useReactTable({
    data: metrics,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const debounce = <T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ) => {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>): void => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const handleRowClick = debounce((row: any) => {
    const qualifier = row.original.qualifier;
    if (qualifier === "DIR" && row.original.key !== componentName) {
      setComponentName(row.original.key);
    } else if (qualifier === "FIL") {
      router.push(
        `/code/${encodeURIComponent(row?.original?.key)}`
      );
    }
  }, 300);

  if (codeIsLoading) return <div>Loading...</div>;

  if (codeError) return <div>Error loading data</div>;

  return (
    <div>
      <div className="w-full">
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter component ..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter(
                  (column) =>
                    typeof column.accessorFn !== "undefined" &&
                    column.getCanHide()
                )
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell className="font-bold h-16 mx-auto" key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className={
                  row.original.isBaseComponent ? "bg-gray-100 mx-auto rounded-sm " : ""
                }
                onClick={() => handleRowClick(row)}
              >
                {row.getVisibleCells().map((cell, index) => (
                  <TableCell
                    key={cell.id}
                    className={index === 0 ? "w-[70%] h-16 " : "w-[10%] h-16 mx-auto text-center"}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
