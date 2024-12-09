import UpdateBlogComponent from "@/components/BlogComponent/UpdateBlogComponent";
import { Metadata } from "next";
import { Params } from "@/types/Params";

export const metadata: Metadata = {
    title: "Update Blog- Inspectra",
    description:
        "Update your blog here",
};

export default function UpdateBlogPage(prod: Params) {

    const blogUuid = prod?.params?.uuid;
 
    return (
        <section>
            <UpdateBlogComponent uuid={blogUuid}/>
        </section>
    )

}
