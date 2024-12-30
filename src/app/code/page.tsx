"use client";
import ShowCodeComponent from "@/components/codeComponent/ShowCodeComponent";
import React from "react";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();

  const projectName = searchParams.get("project") as string;

  const componentKey = searchParams.get("key") as string;

  return (
    <ShowCodeComponent projectName={projectName} componentKey={componentKey} />
  );
}
