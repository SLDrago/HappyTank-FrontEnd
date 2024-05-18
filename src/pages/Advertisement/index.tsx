import DefaultLayout from "../../layout/default_layout";
//import BackGround from "../../images/Backgrounds/fish-and-divers-on-blue-sea.svg";
import CategoryBanner from "../../components/Advertisement/CategoryBanner";
import Breadcrumb from "../../components/Advertisement/BreadCrumb";
import { Button, Typography } from "@material-tailwind/react";
import AdCard from "../../components/Advertisement/AdCard";
import SearchBox from "../../components/SearchBox/SearchBox";

export default function Advertisement() {
  const items = [
    {
      imageSrc:
        "https://images.unsplash.com/photo-1586947726958-3d329e3a5d7a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Z29sZGZpc2h8ZW58MHx8MHx8fDA%3D",
      imageAlt: "Fish",
      link: "",
      title: "Ornamental Fish",
      category: "Fish",
    },
    {
      imageSrc:
        "https://sa1s3optim.patientpop.com/assets/images/provider/photos/2494334.png",
      imageAlt: "Fish Tanks",
      link: "",
      title: "Fish Tanks",
      category: "Tanks",
    },
    {
      imageSrc:
        "https://i5.walmartimages.com/seo/Mascarry-300-Gallon-Adjustable-Silent-Air-Pump-for-Large-Aquarium-Fish-Tank_010f53c4-fe61-45e3-af24-e7ccfa419e1a.c4749756ee02e4d86a8249919706ed2d.jpeg",
      imageAlt: "Air pumps",
      link: "",
      title: "Air pumps",
      category: "Equipments",
    },
    {
      imageSrc:
        "https://cdn.shopify.com/s/files/1/0311/3149/files/small_xtremecommunitycrave_guppycommunitytank.webp?v=1676315792",
      imageAlt: "Fish Foods",
      link: "",
      title: "Fish Foods",
      category: "Food",
    },
    {
      imageSrc:
        "https://rukminim2.flixcart.com/image/850/1000/jwqpocw0/aquarium-plant-anchor/c/m/3/artificial-plants-for-aquarium-fish-tank-decorations-venus-aqua-original-imafhcychguuc9nb.jpeg?q=20&crop=false",
      imageAlt: "Artificial Plants",
      link: "",
      title: "Artificial Plants",
      category: "decoration",
    },
    {
      imageSrc:
        "https://fishfixsrilanka.lk/wp-content/uploads/2021/09/maxresdefaultfxgcxg.jpg",
      imageAlt: "Fish Treatments",
      link: "",
      title: "Fish Treatments",
      category: "Medicine",
    },
  ];
  const handleSearch = (query: string) => {
    console.log("Search query:", query);
  };

  return (
    // <div
    //   className="relative min-h-screen bg-cover bg-center"
    //   style={{ backgroundImage: `url(${BackGround})` }}
    // >
    <DefaultLayout>
      <div className="flex flex-col lg:flex-row justify-between p-4 gap-4 lg:gap-0">
        <Breadcrumb />
        <SearchBox onSearch={handleSearch} />
      </div>
      <CategoryBanner items={items} />
      <Typography
        as={"h1"}
        className="font-bold text-center mt-10 mb-16 text-5xl"
      >
        Best of the Best
      </Typography>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        <AdCard
          imageSrc="https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z29sZGZpc2h8ZW58MHx8MHx8fDA%3D"
          title="Gold Fish"
          description="Little Goldfish for Your Home - This small goldfish is the perfect pet! It’s easy to take care of and loves to swim around. With its bright color, it’s fun to watch and makes a great friend. It’s happy in a small bowl or tank and doesn’t need much space. Bring this little fish home and enjoy watching it every day!"
          rating={4.5}
        />
        <AdCard
          imageSrc="https://images.unsplash.com/photo-1578507065211-1c4e99a5fd24?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z29sZGZpc2h8ZW58MHx8MHx8fDA%3D"
          title="Fighters"
          description="Bold Fighter Fish: A Tiny Warrior for Your Tank - Meet our fighter fish, a small but mighty pet that’s full of life. With its bright colors and flowing fins, it’s a real eye-catcher. This little warrior is easy to care for and doesn’t need much room. It’s perfect for fish lovers who want a pet with spirit. Bring this fighter fish home and watch it bravely explore its new world!"
          rating={4.6}
        />
        <AdCard
          imageSrc="https://images.unsplash.com/photo-1628006020983-5f032bedb369?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGdvbGRmaXNofGVufDB8fDB8fHww"
          title="Black Goldfish"
          description="Black Goldfish: A Rare Beauty for Your Tank - This black goldfish is a rare beauty that will add a touch of elegance to your tank. With its sleek black scales and bright eyes, it’s a stunning fish that’s sure to impress. It’s easy to care for and loves to swim around, making it a joy to watch. Bring this black goldfish home and enjoy its beauty every day!"
          rating={5.0}
        />
        <AdCard
          imageSrc="https://images.unsplash.com/photo-1688826672294-31a21fa2192e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGNhdGZpc2h8ZW58MHx8MHx8fDA%3D"
          title="Yello Catfish"
          description="Yellow Catfish: A Bright Splash of Color for Your Tank - This yellow catfish is a bright splash of color that will liven up your tank. With its vibrant yellow scales and playful nature, it’s a fun fish to watch. It’s easy to care for and loves to explore, making it a great addition to any tank. Bring this yellow catfish home and enjoy its cheerful presence every day!"
          rating={4.2}
        />
        <AdCard
          imageSrc="https://images.unsplash.com/photo-1578771826615-739c533fa45b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b3NjYXIlMjBmaXNofGVufDB8fDB8fHww"
          title="Oscar Fish"
          description="Oscar Fish: A Majestic Beauty for Your Tank - This oscar fish is a majestic beauty that will add a touch of elegance to your tank. With its vibrant colors and flowing fins, it’s a stunning fish that’s sure to impress. It’s easy to care for and loves to swim around, making it a joy to watch. Bring this oscar fish home and enjoy its beauty every day!"
          rating={5.0}
        />
        <AdCard
          imageSrc="https://images.unsplash.com/photo-1540996772485-94e7e92bc1f0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG9zY2FyJTIwZmlzaHxlbnwwfHwwfHx8MA%3D%3D"
          title="Carf Fish"
          description="Carf Fish: A Rare Beauty for Your Tank - This carf fish is a rare beauty that will add a touch of elegance to your tank. With its sleek scales and bright eyes, it’s a stunning fish that’s sure to impress. It’s easy to care for and loves to swim around, making it a joy to watch. Bring this carf fish home and enjoy its beauty every day!"
          rating={4.8}
        />
      </div>
      <Button className="mx-auto mt-10 flex ontent-center" size="lg">
        See More
      </Button>
    </DefaultLayout>
    // </div>
  );
}
