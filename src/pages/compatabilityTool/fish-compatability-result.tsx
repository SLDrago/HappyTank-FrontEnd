import DefaultLayout from "../../layout/default_layout";
import { useState, useEffect } from "react";
import AdCard from "../../components/Advertisement/AdCard";
import HappyTankAPISvc from "../../services/happyTank-svc";

const adverticement = [
  {
    imageSrc:
      "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z29sZGZpc2h8ZW58MHx8MHx8fDA%3D",
    title: "Gold Fish",
    description:
      "Little Goldfish for Your Home - This small goldfish is the perfect pet! It’s easy to take care of and loves to swim around. With its bright color, it’s fun to watch and makes a great friend. It’s happy in a small bowl or tank and doesn’t need much space. Bring this little fish home and enjoy watching it every day!",
    rating: 4.5,
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1578507065211-1c4e99a5fd24?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z29sZGZpc2h8ZW58MHx8MHx8fDA%3D",
    title: "Fighters",
    description:
      "Bold Fighter Fish: A Tiny Warrior for Your Tank - Meet our fighter fish, a small but mighty pet that’s full of life. With its bright colors and flowing fins, it’s a real eye-catcher. This little warrior is easy to care for and doesn’t need much room. It’s perfect for fish lovers who want a pet with spirit. Bring this fighter fish home and watch it bravely explore its new world!",
    rating: 4.6,
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1628006020983-5f032bedb369?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGdvbGRmaXNofGVufDB8fDB8fHww",
    title: "Black Goldfish",
    description:
      "Black Goldfish: A Rare Beauty for Your Tank - This black goldfish is a rare beauty that will add a touch of elegance to your tank. With its sleek black scales and bright eyes, it’s a stunning fish that’s sure to impress. It’s easy to care for and loves to swim around, making it a joy to watch. Bring this black goldfish home and enjoy its beauty every day!",
    rating: 5.0,
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1688826672294-31a21fa2192e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGNhdGZpc2h8ZW58MHx8MHx8fDA%3D",
    title: "Yello Catfish",
    description:
      "Yellow Catfish: A Bright Splash of Color for Your Tank - This yellow catfish is a bright splash of color that will liven up your tank. With its vibrant yellow scales and playful nature, it’s a fun fish to watch. It’s easy to care for and loves to explore, making it a great addition to any tank. Bring this yellow catfish home and enjoy its cheerful presence every day!",
    rating: 4.2,
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1578771826615-739c533fa45b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b3NjYXIlMjBmaXNofGVufDB8fDB8fHww",
    title: "Oscar Fish",
    description:
      "Oscar Fish: A Majestic Beauty for Your Tank - This oscar fish is a majestic beauty that will add a touch of elegance to your tank. With its vibrant colors and flowing fins, it’s a stunning fish that’s sure to impress. It’s easy to care for and loves to swim around, making it a joy to watch. Bring this oscar fish home and enjoy its beauty every day!",
    rating: 5.0,
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1540996772485-94e7e92bc1f0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG9zY2FyJTIwZmlzaHxlbnwwfHwwfHx8MA%3D%3D",
    title: "Carf Fish",
    description:
      "Carf Fish: A Rare Beauty for Your Tank - This carf fish is a rare beauty that will add a touch of elegance to your tank. With its sleek scales and bright eyes, it’s a stunning fish that’s sure to impress. It’s easy to care for and loves to swim around, making it a joy to watch. Bring this carf fish home and enjoy its beauty every day!",
    rating: 4.8,
  },
];

const result = {
  prex: 60,
  prexStatus: "Average",
  temperament: 2,
  size: 10,
  ph: 7.5,
};

export function FIshCompatibilityResult() {
  const [adverticements, setAdverticement] = useState(adverticement || []);
  const [resultInfo, setResultInfo] = useState(result || {});

  useEffect(() => {
    const authResult = new URLSearchParams(window.location.search);
    const query = {
      name1: authResult.get("name1"),
      name2: authResult.get("name2"),
      name3: authResult.get("name3"),
    };
    console.log(query);
    // getCompitibilityInfo(query);
  }, []);

  const getCompitibilityInfo = (data: any) => {
    HappyTankAPISvc.getCompitibilityInfo(data)
      .then((res: any) => {
        setResultInfo(res);
        // alert("Success");
      })
      .catch((e: any) => {
        alert(e?.message || "Error");
      });
  };

  return (
    <div className="relative min-h-screen bg-cover bg-center">
      <DefaultLayout>
        <section className="grid p-8 bg-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="flex justify-center col-span-1 lg:col-span-5 p-8 lg:p-12 bg-white shadow-lg rounded-lg">
              <div className="relative size-40">
                <svg
                  className="size-full"
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    className="stroke-current  text-blue-600 dark:text-blue-500"
                    stroke-width="2"
                  ></circle>

                  <g className="origin-center -rotate-90 transform">
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="none"
                      className="stroke-current  text-gray-200 dark:text-neutral-700"
                      stroke-width="2"
                      stroke-dasharray="100"
                      stroke-dashoffset={resultInfo?.prex}
                    ></circle>
                  </g>
                </svg>
                <div className="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
                  <span className="text-center text-2xl font-bold text-gray-800 dark:text-white">
                    {resultInfo?.prex}%
                  </span>
                </div>
              </div>
              <p className="content-end font-bold text-blue-500">
                {resultInfo?.prexStatus || ""}
              </p>
            </div>

            <div className="col-span-1 lg:col-span-7 p-8 lg:p-12 bg-white shadow-lg rounded-lg flex flex-col justify-center">
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                Results for your selected fish
              </h2>

              <div className="mb-4">
                <strong>Temperament: {resultInfo?.temperament}</strong>
                {}
              </div>
              <div className="mb-4">
                <strong>Size Disparities: {resultInfo?.size + "cm"}</strong>
                {}
              </div>
              <div className="mb-4">
                <strong>
                  Shared Preferences for Water Parameters:{" "}
                  {resultInfo?.ph + "ph"}
                </strong>
                {}
              </div>
            </div>
          </div>

          <div className="mt-5 flex justify-center">
            <div className="grid grid-cols-3 gap-4">
              {adverticements?.map((obj, key) => (
                <div
                  key={key}
                  className="p-0 block max-w-sm bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                >
                  <div className="compatability-card">
                    <AdCard
                      imageSrc={obj?.imageSrc}
                      title={obj?.title}
                      description={obj?.description}
                      rating={obj?.rating}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </DefaultLayout>
    </div>
  );
}

export default FIshCompatibilityResult;
