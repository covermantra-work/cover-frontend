import DynamicBlogPage from "../[slug]/page";

export default function Blog3Page() {
  return <DynamicBlogPage params={Promise.resolve({ slug: "Blog3" })} />;
}