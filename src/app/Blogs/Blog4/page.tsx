import DynamicBlogPage from "../[slug]/page";

export default function Blog4Page() {
  return <DynamicBlogPage params={Promise.resolve({ slug: "Blog4" })} />;
}