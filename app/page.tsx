import Slides from "../components/Header/Slides";
import Discounts from "../components/Home/Discounts";
import Widgets from "../components/Home/Widgets";
async function getSlides() {
  const res = await fetch("http://localhost:3000/api/Slides", {
    cache: "no-cache",
  });
  const Slides = await res.json();
  return Slides;
}
async function getDiscounts() {
  const res = await fetch(
    "http://localhost:3000/api/Products/Discounts?Percentage=50&Quantity=4",
    {}
  );
  const discounts = await res.json();
  if (!res.ok) {
    throw new Error(discounts.message || "Something went wrong!");
  }
  return discounts.products;
}
async function getWidgets() {
  const response = await fetch("http://localhost:3000/api/Widgets");
  const widgets = await response.json();
  return widgets;
}
export default async function Page() {
  const slides = await getSlides();
  const discounts = await getDiscounts();
  const widgets = await getWidgets();
  return (
    <div className=" w-5/6 flex flex-col items-center justify-center mx-auto ">
      <Slides data={slides} />
      <Discounts data={discounts} />
      <Widgets data={widgets} />
    </div>
  );
}
