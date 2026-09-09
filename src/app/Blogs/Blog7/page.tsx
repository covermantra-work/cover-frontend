import DynamicBlogPage from "../[slug]/page";

export default function Blog7Page() {
  return <DynamicBlogPage params={Promise.resolve({ slug: "Blog7" })} />;
}