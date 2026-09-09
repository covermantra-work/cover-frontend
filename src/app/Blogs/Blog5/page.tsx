import DynamicBlogPage from "../[slug]/page";

export default function Blog5Page() {
  return <DynamicBlogPage params={Promise.resolve({ slug: "Blog5" })} />;
}