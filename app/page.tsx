import Slides from "@/components/Header/Slides";
import Discounts from "@/components/Discounts/Discounts";

async function getSlides() {
  const res = await fetch("http://localhost:3000/api/Slides", {});
  const slides = await res.json();
  if (!res.ok) {
    throw new Error(slides.message || "Something went wrong!");
  }
  return slides.Slides;
}
async function getDiscounts() {
  const res = await fetch(
    "http://localhost:3000/api/Products/Discounts?Percentage=50&Quantity=4",
    {}
  );
  /// get products from api
  const discounts = await res.json();
  if (!res.ok) {
    throw new Error(discounts.message || "Something went wrong!");
  }
  return discounts.products;
}

export default async function Page() {
  const data = await getSlides();
  const discounts = await getDiscounts();
  return (
    <div className=" w-5/6 flex flex-col items-center justify-center mx-auto">
      <Slides data={data} />
      <Discounts data={discounts} />
    </div>
  );
}
