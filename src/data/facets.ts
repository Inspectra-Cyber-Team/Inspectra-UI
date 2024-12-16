import { FacetsData } from "@/types/ProjectType";

export const facetsData: FacetsData = {
  facets: [
    {
      property: "Coverage",
      values: [
        { val: "NO_DATA", count: 0 },
        { val: "*-30.0", count: 10 },
        { val: "30.0-50.0", count: 0 },
        { val: "50.0-70.0", count: 0 },
        { val: "70.0-80.0", count: 0 },
        { val: "80.0-*", count: 0 },
      ],
    },
    {
      property: "Reliability",
      values: [
        { val: "1", count: 6 },
        { val: "2", count: 1 },
        { val: "3", count: 3 },
        { val: "4", count: 0 },
        { val: "5", count: 0 },
      ],
    },
    {
      property: "Duplicated",
      values: [
        { val: "*-3.0", count: 8 },
        { val: "3.0-5.0", count: 0 },
        { val: "5.0-10.0", count: 0 },
        { val: "10.0-20.0", count: 1 },
        { val: "20.0-*", count: 1 },
        { val: "NO_DATA", count: 0 },
      ],
    },
    {
      property: "Security",
      values: [
        { val: "1", count: 9 },
        { val: "2", count: 0 },
        { val: "3", count: 0 },
        { val: "4", count: 0 },
        { val: "5", count: 1 },
      ],
    },
    {
      property: "Security Review",
      values: [
        { val: "1", count: 5 },
        { val: "2", count: 0 },
        { val: "3", count: 0 },
        { val: "4", count: 0 },
        { val: "5", count: 5 },
      ],
    },
  ],
  values: [
    { grade: "A", result: "Excellent", borderColor: "#B9FF66" },
    { grade: "B", result: "Good", borderColor: "#60935D" },
    { grade: "C", result: "Average", borderColor: "#F7DC6F" },
    { grade: "D", result: "Poor", borderColor: "#F9B800" },
    { grade: "F", result: "Fail", borderColor: "#EA4335" },
  ],
  coverage: [
    { percent: "> 80%", image: "/images/80percent.png" },
    { percent: "70% - 80%", image: "/images/70percent.png" },
    { percent: "50% - 70%", image: "/images/60percent.png" },
    { percent: "30% - 50%", image: "/images/40percent.png" },
    { percent: "< 30%", image: "/images/20percent.png" },
  ],
  duplication: [
    { percent: "< 3%", image: "/images/3percent.png" },
    { percent: "3% - 5%", image: "/images/5percent.png" },
    { percent: "5% - 10%", image: "/images/10percent.png" },
    { percent: "10% - 20%", image: "/images/15percent.png" },
    { percent: "> 20%", image: "/images/20percentUp.png" },
    { percent: "No Data", image: "" },
  ],
};
