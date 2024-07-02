import DefaultLayout from "../../layout/default_layout";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Typography, Button } from "@material-tailwind/react";
import AdCard from "../../components/Advertisement/AdCard";
import Progress from "react-circle-progress-bar";
import AdCardSkeltons from "../../components/Advertisement/AdCardSkeltons";
import { TextSkeleton } from "../../components/Compatability/TextSkeleton";
import axios from "axios";

const backEndURL = import.meta.env.VITE_LARAVEL_APP_URL;

export function FishCompatibilityResult() {
  const location = useLocation();
  const { responseData } = location.state || {};
  const navigate = useNavigate();
  const [relatedAdvertisements, setRelatedAdvertisements] = useState([]);
  const [relatedAdvertisementsLoading, setRelatedAdvertisementsLoading] =
    useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [aiResponseLoading, setAiResponseLoading] = useState(true);
  const [aiResponseError, setAiResponseError] = useState("");

  if (!responseData) {
    navigate("/compatibility/compatibility-tool");
  }
  const resultInfo = responseData || {};

  useEffect(() => {
    if (!responseData) {
      navigate("/compatibility/compatibility-tool");
    } else {
      loadRelatedAdvertisements();
      loadAIResponse();
    }
  }, [responseData]);

  const loadRelatedAdvertisements = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${backEndURL}/api/advertisement/searchRelatedFishAdvertisements`,
        {
          fish_names: `${responseData.fish1Name} ${responseData.fish2Name} ${responseData.fish3Name}`,
          page: currentPage,
          per_page: 6,
        }
      );

      const { advertisements, meta } = response.data;
      setRelatedAdvertisements(advertisements);
      setTotalPages(meta.last_page);
      setCurrentPage(meta.current_page);
    } catch (error) {
      console.error("Failed to fetch related advertisements:", error);
    } finally {
      setIsLoading(false);
      setRelatedAdvertisementsLoading(false);
    }
  };

  const loadAIResponse = async () => {
    try {
      setAiResponseLoading(true);
      const response = await axios.post(
        `${backEndURL}/api/chat/getFishTankRecommendations`,
        {
          fish_names: `${responseData.fish1Name ?? ""}, ${
            responseData.fish2Name ?? ""
          }, ${responseData.fish3Name ?? ""}`,
        }
      );
      setAiResponse(response.data.message);
    } catch (error) {
      console.error("Failed to fetch AI response:", error);
      setAiResponseError("Failed to communicate with the OpenAI API");
    } finally {
      setAiResponseLoading(false);
    }
  };

  const handleSeeMore = () => {
    setIsLoading(true);
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <DefaultLayout>
        <section className="py-16 px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="col-span-1 lg:col-span-5 p-8 lg:p-12 bg-white shadow-lg rounded-lg flex flex-col justify-center items-center">
              <Typography variant="h4" className="lg:text-3xl mb-4">
                Overall Compatibility
              </Typography>
              <Progress
                progress={resultInfo.result}
                strokeWidth={10}
                ballStrokeWidth={20}
              />
              <Typography variant="h6" className="mb-1 lg:text-2xl">
                {resultInfo.fish1Name ?? ""}
              </Typography>
              <Typography variant="h6" className="mb-1 lg:text-2xl">
                {resultInfo.fish2Name ?? ""}
              </Typography>
              <Typography variant="h6" className="mb-1 lg:text-2xl">
                {resultInfo.fish3Name ?? ""}
              </Typography>
            </div>

            <div className="col-span-1 lg:col-span-7 p-8 lg:p-12 flex flex-col justify-center">
              <Typography variant="h6" className="mb-4 lg:text-3xl">
                Detailed Compatibility Metrics
              </Typography>
              <div className="flex flex-wrap col-2 justify-around">
                <div className="col-1" style={{ transform: "scale(0.75)" }}>
                  <Progress
                    progress={resultInfo.peacePercentage}
                    subtitle="Peace"
                    strokeWidth={6}
                    ballStrokeWidth={16}
                  />
                </div>
                <div className="col-1" style={{ transform: "scale(0.75)" }}>
                  <Progress
                    progress={resultInfo.tempMatchPercentage}
                    subtitle="Temperature"
                    strokeWidth={6}
                    ballStrokeWidth={16}
                  />
                </div>
                <div className="col-1" style={{ transform: "scale(0.75)" }}>
                  <Progress
                    progress={resultInfo.lengthMatchPercentage}
                    subtitle="Length"
                    strokeWidth={6}
                    ballStrokeWidth={16}
                  />
                </div>
                <div className="col-1" style={{ transform: "scale(0.75)" }}>
                  <Progress
                    progress={resultInfo.phMatchPercentage}
                    subtitle="pH"
                    strokeWidth={6}
                    ballStrokeWidth={16}
                  />
                </div>
              </div>
              <div className="mt-4">
                <Typography variant="paragraph" className="lg:text-2xl">
                  Ideal Temperature Range:{" "}
                  {resultInfo.tempOverlapRange.join("°C - ")}°C
                </Typography>
              </div>
              <div className="mt-4">
                <Typography variant="paragraph" className="lg:text-2xl">
                  Ideal pH Range: {resultInfo.phOverlapRange.join(" - ")}
                  pH
                </Typography>
              </div>
            </div>
          </div>
        </section>
        <section className="py-4 px-8">
          <div className="mx-auto text-center mb-16">
            <Typography variant="h3" className="my-3">
              Tank Environment Suggestions
            </Typography>
            <Typography variant="paragraph" className="my-3 text-xl">
              by AquaPedia
            </Typography>
          </div>
          <div className="lg:px-52">
            <Typography
              variant="paragraph"
              className="my-3 text-lg flex justify-center"
            >
              {aiResponseLoading ? (
                <TextSkeleton />
              ) : (
                aiResponse || aiResponseError
              )}
            </Typography>
          </div>
        </section>
        <section className="py-10 px-8">
          <div className="mx-auto text-center mb-16">
            <Typography variant="h1" className="my-3">
              Related Products
            </Typography>
          </div>
          <div className="container mx-auto">
            {relatedAdvertisementsLoading ? (
              <AdCardSkeltons />
            ) : relatedAdvertisements.length > 0 ? (
              <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
                {relatedAdvertisements.map((ad, index) => (
                  <AdCard
                    key={index}
                    imageSrc={`${backEndURL}${ad.image_url}`}
                    title={ad.title}
                    description={ad.small_description}
                    rating={ad.avg_review}
                    price={ad.price}
                    link={`/advertisements/products/${ad.title}?id=${ad.id}`}
                  />
                ))}
              </div>
            ) : (
              <div className="col-span-3 text-center">
                <Typography variant="h5" color="gray">
                  No related products found.
                </Typography>
              </div>
            )}
          </div>
          {totalPages > currentPage && (
            <Button
              onClick={handleSeeMore}
              className="mx-auto mt-10 flex content-center"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "See More"}
            </Button>
          )}
        </section>
      </DefaultLayout>
    </>
  );
}

export default FishCompatibilityResult;
