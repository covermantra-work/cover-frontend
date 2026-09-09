import DynamicBlogPage from "../[slug]/page";

export default function Blog2Page() {
  return <DynamicBlogPage params={Promise.resolve({ slug: "Blog2" })} />;
}