import DynamicBlogPage from "../[slug]/page";

export default function Blog10Page() {
  return <DynamicBlogPage params={Promise.resolve({ slug: "Blog10" })} />;
}