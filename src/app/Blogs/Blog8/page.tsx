import DynamicBlogPage from "../[slug]/page";

export default function Blog8Page() {
  return <DynamicBlogPage params={Promise.resolve({ slug: "Blog8" })} />;
}