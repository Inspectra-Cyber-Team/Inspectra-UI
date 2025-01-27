
import { Metadata } from "next";
import { Params } from "@/types/Params";
import BlogDetailsComponent from "@/components/BlogComponent/BlogDetailsComponent";


export async function generateMetadata(prod:Params): Promise<Metadata> {

    const blogUuid = prod?.params?.uuid;
    // Fetch blog details based on UUID
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${blogUuid}`);

    const blogResponse = await response.json();

    const defaultTitle = "Blog Details - Inspectra";

    const defaultDescription ="Blog details of Inspectra, a leading platform from Cambodia that strengthens secure development with advanced source code analysis tools.";

    const defaultImage ="https://api-inspectra.istad.co/images/1b42a22a-897f-4bd0-b4f2-ba1a9e9e3659.png";

    const blogData = blogResponse?.data || {};
    return {
        title: blogData.title || defaultTitle,
        description: blogData.description
            ? blogData.description.replace(/<[^>]+>/g, "").substring(0, 160) + "..."
            : defaultDescription,
        keywords: ["ChatGPT", "DeepSeek", "AI Titans", "Artificial Intelligence", "Technology"].join(", "),
        authors: { name: `${blogData.user.firstName} ${blogData.user.lastName}` },
        publisher: "Inspectra",
        openGraph: {
            title: blogData.title,
            description: blogData.description.replace(/<[^>]+>/g, "").substring(0, 160) + "...",
            siteName: "Inspectra",
            locale: "en_KH",
            type: "article",
            url: `https://inspectra.istad.co/blog/${blogUuid}`,
            images: blogData.thumbnail.map((url: string) => ({
                url,
                width: 1200,
                height: 630,
                alt: blogData.title,
            })) || [{ url: defaultImage, width: 1200, height: 630, alt: defaultTitle }],
        },
        twitter: {
            card: "summary_large_image",
            title: blogData.title,
            description: blogData.description.replace(/<[^>]+>/g, "").substring(0, 160) + "...",
            images: blogData.thumbnail[0],
        },
    };
}

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
