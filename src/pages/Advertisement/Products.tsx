import React from "react";
import DefaultLayout from "../../layout/default_layout";
import FilterBar from "../../components/Advertisement/FilterBar";
import { Typography, Button } from "@material-tailwind/react";
import AdCard from "../../components/Advertisement/AdCard";
import Breadcrumb from "../../components/Advertisement/BreadCrumb";

const Products: React.FC = () => {
  const handleFilter = (filters: {
    searchTerm: string;
    category: string;
    priceRange: string;
    location: string;
  }) => {
    console.log("Filters received in HomePage:", filters);
  };
  return (
    <>
      <DefaultLayout>
        <Breadcrumb />
        <FilterBar onFilter={handleFilter} />
        <Typography
          type="h4"
          className="text-blue-gray-900 font-semibold text-2xl mb-6"
        >
          Category:
        </Typography>

        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <AdCard
            imageSrc="https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z29sZGZpc2h8ZW58MHx8MHx8fDA%3D"
            title="Gold Fish"
            description="Little Goldfish for Your Home - This small goldfish is the perfect pet! It’s easy to take care of and loves to swim around. With its bright color, it’s fun to watch and makes a great friend. It’s happy in a small bowl or tank and doesn’t need much space. Bring this little fish home and enjoy watching it every day!"
            rating={4.5}
            price="10.00"
          />
          <AdCard
            imageSrc="https://images.unsplash.com/photo-1578507065211-1c4e99a5fd24?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z29sZGZpc2h8ZW58MHx8MHx8fDA%3D"
            title="Fighters"
            description="Bold Fighter Fish: A Tiny Warrior for Your Tank - Meet our fighter fish, a small but mighty pet that’s full of life. With its bright colors and flowing fins, it’s a real eye-catcher. This little warrior is easy to care for and doesn’t need much room. It’s perfect for fish lovers who want a pet with spirit. Bring this fighter fish home and watch it bravely explore its new world!"
            rating={4.6}
            price="15.00"
          />
          <AdCard
            imageSrc="https://images.unsplash.com/photo-1628006020983-5f032bedb369?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGdvbGRmaXNofGVufDB8fDB8fHww"
            title="Black Goldfish"
            description="Black Goldfish: A Rare Beauty for Your Tank - This black goldfish is a rare beauty that will add a touch of elegance to your tank. With its sleek black scales and bright eyes, it’s a stunning fish that’s sure to impress. It’s easy to care for and loves to swim around, making it a joy to watch. Bring this black goldfish home and enjoy its beauty every day!"
            rating={5.0}
            price="20.00"
          />
          <AdCard
            imageSrc="https://images.unsplash.com/photo-1688826672294-31a21fa2192e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGNhdGZpc2h8ZW58MHx8MHx8fDA%3D"
            title="Yello Catfish"
            description="Yellow Catfish: A Bright Splash of Color for Your Tank - This yellow catfish is a bright splash of color that will liven up your tank. With its vibrant yellow scales and playful nature, it’s a fun fish to watch. It’s easy to care for and loves to explore, making it a great addition to any tank. Bring this yellow catfish home and enjoy its cheerful presence every day!"
            rating={4.2}
            price="25.00"
          />
          <AdCard
            imageSrc="https://images.unsplash.com/photo-1578771826615-739c533fa45b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b3NjYXIlMjBmaXNofGVufDB8fDB8fHww"
            title="Oscar Fish"
            description="Oscar Fish: A Majestic Beauty for Your Tank - This oscar fish is a majestic beauty that will add a touch of elegance to your tank. With its vibrant colors and flowing fins, it’s a stunning fish that’s sure to impress. It’s easy to care for and loves to swim around, making it a joy to watch. Bring this oscar fish home and enjoy its beauty every day!"
            rating={5.0}
            price="30.00"
          />
          <AdCard
            imageSrc="https://images.unsplash.com/photo-1540996772485-94e7e92bc1f0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG9zY2FyJTIwZmlzaHxlbnwwfHwwfHx8MA%3D%3D"
            title="Carf Fish"
            description="Carf Fish: A Rare Beauty for Your Tank - This carf fish is a rare beauty that will add a touch of elegance to your tank. With its sleek scales and bright eyes, it’s a stunning fish that’s sure to impress. It’s easy to care for and loves to swim around, making it a joy to watch. Bring this carf fish home and enjoy its beauty every day!"
            rating={4.8}
            price="35.00"
          />
        </div>
        <Button className="mx-auto mt-10 flex ontent-center" size="lg">
          See More
        </Button>
      </DefaultLayout>
    </>
  );
};

export default Products;
