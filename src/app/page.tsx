import Hero from "@/components/hero";
import Product from "@/components/products";
import { ProductType } from "@/interface";

const HomePage = async () => {
  const data = await fetch("https://fakestoreapi.com/products");
  const products: ProductType[] = await data.json();

  return (
    <>
      <main className="min-h-screen max-w-7xl mx-auto px-8 xl:px-0 pt-16">
        {/* <Hero /> */}
        <section className="flex flex-col space-y-12 ">
          <h1 className="font-bold text-center text-5xl"> shopping</h1>
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((prod) => (
              <Product key={prod.id} product={prod} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default HomePage;
