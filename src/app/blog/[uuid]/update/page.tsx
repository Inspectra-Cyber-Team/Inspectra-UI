import UpdateBlogComponent from "@/components/BlogComponent/UpdateBlogComponent";
import { Metadata } from "next";
import { Params } from "@/types/Params";

export const metadata: Metadata ={
    title: "Blog update - Inspectra",
    description:
        "Blog update of Inspectra, a leading platform from Cambodia that strengthens secure development with advanced source code analysis tools.",
    openGraph: {
        title: "Blog update - Inspectra",
        description:
            "Blog update of Inspectra, a leading platform from Cambodia that strengthens secure development with advanced source code analysis tools.",
        siteName: "Inspectra",
        url: 'https://inspectra.istad.co/',
        images: [
          {
            url: 'http://136.228.158.126:4011/images/3639a448-5eb8-43f4-bba9-a7f98c27792e.png',
            width: 1200,
            height: 630,
            alt: 'Inspectra',
          },
        ],
    },
}

export default function UpdateBlogPage(prod: Params) {

    const blogUuid = prod?.params?.uuid;
 
    return (
        <section>
            <UpdateBlogComponent uuid={blogUuid}/>
        </section>
    )

}
