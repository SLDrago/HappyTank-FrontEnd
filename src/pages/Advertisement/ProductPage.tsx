import {
  Card,
  Button,
  IconButton,
  Rating,
  Typography,
} from "@material-tailwind/react";
import { HeartIcon } from "@heroicons/react/24/outline";
import AdCard from "../../components/Advertisement/AdCard";
import CardReview from "../../components/Advertisement/CardReview";
import Breadcrumb from "../../components/Advertisement/BreadCrumb";
import DefaultLayout from "../../layout/default_layout";
import SearchBox from "../../components/SearchBox/SearchBox";
import ProductImage from "../../components/Advertisement/ProductImage";
import MapCard from "../../components/Advertisement/MapCard";

const CONTENTS = [
  {
    title: "This tool has made my workflow seamless",
    name: "Ryan Samuel",
    feedback:
      "I've been using this for a while now, and it's become an essential part of my daily routine. It's incredibly user-friendly and has greatly improved my productivity.",
    date: "03 March 2024",
  },
  {
    title: "It's made my job so much easier",
    name: "Emma Roberts",
    feedback:
      "This tool has been a game-changer for me. From managing my tasks to collaborating with my team, it's made everything so much easier. Highly recommended!",
    date: "14 February 2023",
  },
  {
    title: "It's my go-to solution for staying organized.",
    name: "Bruce Mars",
    feedback:
      "I've been using this for a while now, and it's become an essential part of my daily routine. It's incredibly user-friendly and has greatly improved my productivity.",
    date: "10 February 2023",
  },
];

export function ProductPage() {
  const handleSearch = (query: string) => {
    console.log("Search query:", query);
  };
  return (
    <>
      <DefaultLayout>
        <div className="flex flex-col lg:flex-row justify-between p-4 gap-4 lg:gap-0">
          <Breadcrumb />
          <SearchBox onSearch={handleSearch} />
        </div>
        <section className="py-16 px-8">
          <div className="mx-auto container grid grid-cols-1 md:grid-cols-2">
            <ProductImage />
            <div className="container mx-auto p-4">
              <Typography className="mb-4" variant="h3">
                Gold Fish
              </Typography>
              <Typography variant="h5" color="green">
                Rs. 490
              </Typography>
              <Typography variant="h6">for 10 pieces (1 inch size)</Typography>
              <Typography className="!mt-4 text-base font-normal leading-[27px] !text-gray-500">
                As we live, our hearts turn colder. Cause pain is what we go
                through as we become older. We get insulted by others, lose
                trust for those others. We get back stabbed by friends. It
                becomes harder for us to give others a hand. We get our heart
                broken by people we love, even that we give them all we have.
                Then we lose family over time. What else could rust the heart
                more over time? Blackgold.
              </Typography>
              <div className="my-8 flex items-center gap-2">
                <Rating value={4} className="text-amber-500" />
                <Typography className="!text-sm font-bold !text-gray-700">
                  4.0/5 (100 reviews)
                </Typography>
              </div>
              <div className="mb-4 flex w-full items-center gap-3 md:w-1/2 ">
                <Button color="gray" className="w-52">
                  Contact Shop
                </Button>
                <IconButton color="gray" variant="text" className="shrink-0">
                  <HeartIcon className="h-6 w-6" />
                </IconButton>
              </div>
            </div>
            <div className="container mx-auto p-4">
              {/* Product Description */}
              <div className="mt-6">
                <Typography variant="h5" color="gray" className="mb-3">
                  Product Description
                </Typography>
                <Typography variant="paragraph" color="gray">
                  There's nothing I really wanted to do in life that I wasn't
                  able to get good at. That's my skill. I'm not really
                  specifically talented at anything except for the ability to
                  learn. That's what I do. That's what I'm here for. Don't be
                  afraid to be wrong because you can't learn anything from a
                  compliment.
                </Typography>
              </div>

              {/* Benefits */}
              <div className="mt-6">
                <Typography variant="h6" color="gray" className="mb-2">
                  Benefits
                </Typography>
                <Typography variant="paragraph" color="gray" className="mb-2">
                  The jacket could be made from a weather-resistant or
                  waterproof fabric, such as Gore-Tex or a similar technology,
                  to keep the wearer dry and comfortable in rainy or windy
                  conditions.
                </Typography>
                <Typography variant="paragraph" color="gray" className="mb-2">
                  Including multiple pockets with different sizes and
                  functionalities, such as zippered pockets for secure storage,
                  interior pockets for valuables.
                </Typography>
                <Typography variant="paragraph" color="gray" className="mb-2">
                  The jacket could feature adjustable cuffs and a drawstring
                  hem, allowing the wearer to customize the fit and seal out
                  cold drafts, making it suitable for various weather
                  conditions.
                </Typography>
              </div>

              {/* More about Product */}
              <div className="mt-6">
                <Typography variant="h6" color="gray" className="mb-2">
                  More about product
                </Typography>
                <Typography variant="paragraph" color="gray">
                  There's nothing I really wanted to do in life that I wasn't
                  able to get good at. That's my skill. I'm not really
                  specifically talented at anything except for the ability to
                  learn.
                </Typography>
              </div>
            </div>
            <div className="container mx-auto p-4">
              <MapCard position={{ lat: 6.542368, lng: 80.949656 }} />
            </div>
          </div>
        </section>
        <section className="py-20 px-8">
          <div className="mx-auto container">
            <div className="text-center">
              <Typography variant="h6" className="mb-3 uppercase">
                Reviews
              </Typography>
              <Typography variant="h3">Customer&apos;s Opinion</Typography>
              <Typography className="mt-3 text-center text-[18px] font-normal text-gray-500">
                From general feedback to detailed accounts, find out what our
                users tell about this product.
              </Typography>
            </div>
            <div className="mt-32 grid lg:grid-cols-3 grid-cols-1 gap-y-6">
              {CONTENTS.map(({ name, feedback, title, date }, index) => (
                <CardReview
                  key={index}
                  title={title}
                  name={name}
                  feedback={feedback}
                  date={date}
                />
              ))}
            </div>
          </div>
          <Button className="mx-auto mt-10 flex ontent-center" size="lg">
            See More
          </Button>
        </section>
        <section className="py-10 px-8">
          <div className="mx-auto text-center mb-16">
            <Typography className="font-medium text-lg">
              Tailored Product Recomendation
            </Typography>
            <Typography variant="h1" className="my-4 text-4xl">
              Find What You Need
            </Typography>
            <Typography className="!font-normal text-gray-500 mx-auto max-w-2xl">
              Simplify your shopping experience with our intuitive filter
              system. Whether you&apos;re looking for specific features, price
              ranges, or brands.
            </Typography>
          </div>
          <div className="mx-auto container">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 md:grid-cols-2">
              <AdCard
                imageSrc="https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z29sZGZpc2h8ZW58MHx8MHx8fDA%3D"
                title="Gold Fish"
                description="Little Goldfish for Your Home - This small goldfish is the perfect pet! It’s easy to take care of and loves to swim around. With its bright color, it’s fun to watch and makes a great friend. It’s happy in a small bowl or tank and doesn’t need much space. Bring this little fish home and enjoy watching it every day!"
                rating={4.5}
                price="20.00"
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
            </div>
          </div>
          <Button className="mx-auto mt-10 flex ontent-center" size="lg">
            See More
          </Button>
        </section>
      </DefaultLayout>
    </>
  );
}

export default ProductPage;
