import client from "../../../../prisma/client";
type Data = {
  message?: string;
  products?: any;
};
export default async function GET(
  req: { method: string },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: { message: string; products?: any }): void; new (): any };
    };
  }
) {
  try {
    const products = await client.product.findMany({
      select: {
        id: true,
        Title: true,
        Subtitle: true,
        Title_ku: true,
        Subtitle_ku: true,
        Title_ar: true,
        Subtitle_ar: true,
        Image: true,
      },
    });
    res.status(200).json({
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {
    console.log(error);
  }
}
