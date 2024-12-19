import CreateBlogComponen from "@/components/BlogComponent/CreateBlogComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Blog",
  description: "Create Blog",
};

export default function page() {
  return (
    <section>
      <CreateBlogComponen />
    </section>
  );
}
