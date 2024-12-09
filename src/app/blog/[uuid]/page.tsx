
import { Metadata } from "next";
import { Params } from "@/types/Params";
import BlogDetailsComponent from "@/components/BlogComponent/BlogDetailsComponent";

export const metadata: Metadata = {
    title: "Blog details - Inspectra",
    description:
        "Learn more about Inspectra, a white-box testing platform designed to review source code and identify security weaknesses. Discover our mission, values, and commitment to secure development.",
};

export default function BlogDetailsPage(props: Params) {

    const blogUuid = props?.params?.uuid;

    return (
        <section>
            <div>
                <BlogDetailsComponent uuid={blogUuid} />
            </div>
        </section>
    );
}



