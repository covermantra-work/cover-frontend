import DynamicBlogPage from "../[slug]/page";

export default function Blog1Page() {
  return <DynamicBlogPage params={Promise.resolve({ slug: "Blog1" })} />;
}