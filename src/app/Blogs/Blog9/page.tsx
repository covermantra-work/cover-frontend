import DynamicBlogPage from "../[slug]/page";

export default function Blog9Page() {
  return <DynamicBlogPage params={Promise.resolve({ slug: "Blog9" })} />;
}