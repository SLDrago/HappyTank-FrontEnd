import {
  Button,
  Rating,
  Typography,
  Spinner,
  IconButton,
  Popover,
  PopoverHandler,
  PopoverContent,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import {
  EllipsisVerticalIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AdCard from "../../components/Advertisement/AdCard";
import CardReview from "../../components/Advertisement/CardReview";
import Breadcrumb from "../../components/Advertisement/BreadCrumb";
import DefaultLayout from "../../layout/default_layout";
import SearchBox from "../../components/SearchBox/SearchBox";
import ProductImage from "../../components/Advertisement/ProductImage";
import MapCard from "../../components/Advertisement/MapCard";
import ReviewModal from "../../components/ReviewModel/ReviewModel";
import SellerCard from "../../components/Advertisement/SellerCard";
import axios from "axios";
import NotFound404 from "../NotFound404/NotFound404";
import ContactShopDialog from "../../components/Advertisement/ContactShopDialog";
import StarRating from "../../components/Advertisement/StarRating";
import AdCardSkeltons from "../../components/Advertisement/AdCardSkeltons";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const backEndURL = import.meta.env.VITE_LARAVEL_APP_URL;

export function ProductPage() {
  const handleSearch = (query: string) => {
    if (query.trim()) {
      navigate(`/advertisements/products?search=${query}`);
    }
  };

  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [advertisement, setAdvertisement] = useState(null);
  const [userInformation, setUserInformation] = useState(null);
  const [advertisementNotFound, setAdvertisementNotFound] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewCount, setReviewCount] = useState(0);
  const [avgRating, setAvgRating] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [relatedAdvertisements, setRelatedAdvertisements] = useState([]);
  const [relatedAdvertisementsLoading, setRelatedAdvertisementsLoading] =
    useState(false);
  const [userRole, setUserRole] = useState(null);

  const { token } = useAuth();
  const [isReporting, setIsReporting] = useState(false);

  // State for related advertisements pagination
  const [relatedCurrentPage, setRelatedCurrentPage] = useState(1);
  const [relatedTotalPages, setRelatedTotalPages] = useState(1);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const id = searchParams.get("id");

  const fetchReviews = async (page = 1) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${backEndURL}/api/review/getReviewByAdvertisementId`,
        {
          advertisement_id: id,
          page,
          per_page: 3,
        }
      );

      setReviews((prev) =>
        page === 1 ? response.data.reviews : [...prev, ...response.data.reviews]
      );
      setReviewCount(response.data.review_count);
      setAvgRating(response.data.avg_rating);
      setCurrentPage(response.data.pagination.current_page);
      setTotalPages(response.data.pagination.last_page);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchAdvertisement = async () => {
      try {
        const response = await axios.post(
          `${backEndURL}/api/advertisement/getAdvertisementById`,
          { id }
        );
        if (response.data.advertisement) {
          setAdvertisement(response.data.advertisement);
          setUserInformation(response.data.user_information);
          setAdvertisementNotFound(false); // Reset to false if found
        } else {
          setAdvertisementNotFound(true); // Set to true if not found
        }
      } catch (error) {
        console.error("Error fetching advertisement data:", error);
        setAdvertisementNotFound(true); // Set to true on error
      }
    };

    if (!id) {
      navigate("/advertisements/products");
    } else {
      fetchAdvertisement();
    }
  }, [id, navigate]);

  useEffect(() => {
    const fetchRelatedAdvertisements = async () => {
      if (advertisement) {
        setRelatedAdvertisementsLoading(true);
        try {
          const response = await axios.post(
            `${backEndURL}/api/advertisement/searchRelatedAdvertisements`,
            {
              tags: advertisement.tags,
              city: userInformation?.city,
              page: 1,
              per_page: 3,
            }
          );
          setRelatedAdvertisements(response.data.advertisements);
          setRelatedTotalPages(response.data.pagination.last_page);
          setRelatedCurrentPage(response.data.pagination.current_page);
        } catch (error) {
          console.error("Error fetching related advertisements:", error);
        } finally {
          setRelatedAdvertisementsLoading(false);
        }
      }
    };

    fetchRelatedAdvertisements();
  }, [advertisement, userInformation]);

  useEffect(() => {
    if (advertisement) {
      const fetchReviews = async (page = 1) => {
        setIsLoading(true);
        try {
          const response = await axios.post(
            `${backEndURL}/api/review/getReviewByAdvertisementId`,
            {
              advertisement_id: id,
              page,
              per_page: 3,
            }
          );

          setReviews((prev) =>
            page === 1
              ? response.data.reviews
              : [...prev, ...response.data.reviews]
          );
          setReviewCount(response.data.review_count);
          setAvgRating(response.data.avg_rating);
          setCurrentPage(response.data.pagination.current_page);
          setTotalPages(response.data.pagination.last_page);
        } catch (error) {
          console.error("Error fetching reviews:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchReviews(1);
    }
  }, [advertisement, id]);

  const handleSeeMore = () => {
    if (currentPage < totalPages) {
      const fetchReviews = async (page = 1) => {
        setIsLoading(true);
        try {
          const response = await axios.post(
            `${backEndURL}/api/review/getReviewByAdvertisementId`,
            {
              advertisement_id: id,
              page,
              per_page: 3,
            }
          );

          setReviews((prev) =>
            page === 1
              ? response.data.reviews
              : [...prev, ...response.data.reviews]
          );
          setReviewCount(response.data.review_count);
          setAvgRating(response.data.avg_rating);
          setCurrentPage(response.data.pagination.current_page);
          setTotalPages(response.data.pagination.last_page);
        } catch (error) {
          console.error("Error fetching reviews:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchReviews(currentPage + 1);
    }
  };

  useEffect(() => {
    if (advertisement) {
      fetchReviews(1);
    }
  }, [advertisement, id]);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const userObject = JSON.parse(userData);
      setUserRole(userObject.role);
    }
  }, []);

  // Function to fetch related advertisements with pagination
  const fetchRelatedAdvertisements = async (page = 1) => {
    if (advertisement) {
      setRelatedAdvertisementsLoading(true);
      try {
        const response = await axios.post(
          `${backEndURL}/api/advertisement/searchRelatedAdvertisements`,
          {
            tags: advertisement.tags,
            city: userInformation?.city,
            page: page,
            per_page: 3,
          }
        );
        setRelatedAdvertisements(response.data.advertisements);
        setRelatedTotalPages(response.data.pagination.last_page);
        setRelatedCurrentPage(response.data.pagination.current_page);
      } catch (error) {
        console.error("Error fetching related advertisements:", error);
      } finally {
        setRelatedAdvertisementsLoading(false);
      }
    }
  };

  // Handle see more related advertisements
  const handleSeeMoreRelated = () => {
    if (relatedCurrentPage < relatedTotalPages) {
      fetchRelatedAdvertisements(relatedCurrentPage + 1);
    }
  };

  if (advertisementNotFound) {
    return <NotFound404 />;
  }

  if (!advertisement || !userInformation) {
    return (
      <div className="flex justify-center items-center h-screen gap-3">
        <Typography type="h3" className="text-2xl">
          Loading Advertisement...
        </Typography>
        <Spinner className="" />
      </div>
    );
  }

  const { title, small_description, description, price, images, user, tags } =
    advertisement;
  const imageUrls = images.map((img) => backEndURL + img.image_url);

  // Ensure gps_coordinates are defined
  const gpsCoordinates = userInformation?.gps_coordinates;

  const { phone_number, socialmedia_links, working_hours } = userInformation;

  const handleReport = (report: string) => {
    let reportReason = "";
    switch (report) {
      case "FalseInfo":
        reportReason = "False Information";
        break;
      case "Fraud":
        reportReason = "Scam/Fraud";
        break;
      case "ViolateTerms":
        reportReason = "Violates Terms of Service";
        break;
      default:
        toast.error("Invalid report reason");
        return;
    }

    const makeReport = async () => {
      setIsReporting(true);
      try {
        const response = await axios.post(
          `${backEndURL}/api/report/addReport`,
          {
            content_type: "Advertisement",
            content_id: id,
            report_reason: reportReason,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Report Made Successfully!");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 409) {
            toast.warning(
              error.response.data.message ||
                "You have already reported this content"
            );
          } else if (error.response?.data?.errors) {
            const errorMessages = Object.values(
              error.response.data.errors
            ).flat();
            toast.error(errorMessages.join(", "));
          } else {
            toast.error(
              error.response?.data?.message || "An unexpected error occurred"
            );
          }
        } else {
          toast.error("An unexpected error occurred. Please try again.");
        }
      } finally {
        setIsReporting(false);
      }
    };

    makeReport();
  };

  const isHTML = /<\/?[a-z][\s\S]*>/i.test(description);

  return (
    <>
      <DefaultLayout>
        <div className="flex flex-col lg:flex-row justify-between p-4 gap-4 lg:gap-0">
          <Breadcrumb />
          <SearchBox onSearch={handleSearch} />
        </div>
        <section className="py-16 px-8">
          <div className="mx-auto container grid grid-cols-1 md:grid-cols-2">
            <ProductImage images={imageUrls} />
            <div className="container mx-auto p-4">
              <Typography className="mb-4" variant="h3">
                {title}
              </Typography>
              {price == 0 && (
                <Typography variant="h5" color="green">
                  Free
                </Typography>
              )}
              {price > 0 && (
                <Typography variant="h5" color="green">
                  Rs. {price}
                </Typography>
              )}
              <Typography variant="h6">
                {advertisement.price_based_on}
              </Typography>
              <Typography className="!mt-4 text-base font-normal leading-[27px] !text-gray-500">
                {small_description}
              </Typography>
              <div className="my-8 flex items-center gap-2">
                {isLoading ? (
                  <div className="animate-pulse">
                    <Rating value={0} className="text-amber-500" />
                  </div>
                ) : (
                  <>
                    <StarRating
                      rating={Math.min(Math.max(avgRating || 0, 0), 5)}
                    />
                    <Typography className="!text-sm font-bold !text-gray-700">
                      {Math.min(Math.max(avgRating || 0, 0), 5).toFixed(1)}/5 (
                      {reviewCount} reviews)
                    </Typography>
                  </>
                )}
              </div>
              <div className="mb-4 flex w-full items-center gap-3">
                <Button
                  color="gray"
                  className="w-52"
                  onClick={() => setIsContactDialogOpen(true)}
                >
                  Contact Shop
                </Button>
                {userRole === "user" && (
                  <Button
                    color="blue-gray"
                    className="w-52"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Add Review
                  </Button>
                )}
                {token && (
                  <Popover placement="top">
                    <PopoverHandler>
                      <IconButton variant="text">
                        <EllipsisVerticalIcon className="h-8 w-8" />
                      </IconButton>
                    </PopoverHandler>
                    <PopoverContent className="">
                      <Typography
                        variant="h5"
                        color="red"
                        className="text-center"
                      >
                        Report Content
                      </Typography>
                      <hr className="my-2" />
                      <List className="p-0">
                        <button onClick={() => handleReport("FalseInfo")}>
                          <ListItem>
                            <ListItemPrefix>
                              {!isReporting && (
                                <ExclamationTriangleIcon className="h-4 w-4" />
                              )}
                              {isReporting && (
                                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                                  <Spinner className="h-12 w-12" color="blue" />
                                </div>
                              )}
                            </ListItemPrefix>
                            False Information
                          </ListItem>
                        </button>
                      </List>
                      <List className="p-0">
                        <button onClick={() => handleReport("Fraud")}>
                          <ListItem>
                            <ListItemPrefix>
                              {!isReporting && (
                                <ExclamationTriangleIcon className="h-4 w-4" />
                              )}
                              {isReporting && (
                                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                                  <Spinner className="h-12 w-12" color="blue" />
                                </div>
                              )}
                            </ListItemPrefix>
                            Scam/Fraud
                          </ListItem>
                        </button>
                      </List>
                      <List className="p-0">
                        <button onClick={() => handleReport("ViolateTerms")}>
                          <ListItem>
                            <ListItemPrefix>
                              {!isReporting && (
                                <ExclamationTriangleIcon className="h-4 w-4" />
                              )}
                              {isReporting && (
                                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                                  <Spinner className="h-12 w-12" color="blue" />
                                </div>
                              )}
                            </ListItemPrefix>
                            Violates Terms of Service
                          </ListItem>
                        </button>
                      </List>
                    </PopoverContent>
                  </Popover>
                )}
              </div>
            </div>
            <ContactShopDialog
              isOpen={isContactDialogOpen}
              onClose={() => setIsContactDialogOpen(false)}
              phoneNumber={phone_number}
              socialMediaLinks={socialmedia_links}
            />
            <ReviewModal
              id={advertisement.id.toString()}
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              reloadReviews={fetchReviews}
            />
            <div className="container mx-auto p-4">
              <div className="mt-6">
                <Typography variant="h5" color="gray" className="mb-3">
                  Product Description
                </Typography>
                {isHTML ? (
                  <div
                    className="text-gray-600"
                    dangerouslySetInnerHTML={{ __html: description }}
                  />
                ) : (
                  <Typography variant="paragraph" color="gray">
                    {description}
                  </Typography>
                )}
              </div>
              <div className="mt-3">
                <Typography variant="h5" color="gray" className="mb3">
                  Working Hours
                </Typography>
                {working_hours ? (
                  Object.entries(working_hours).map(([day, hours], index) => (
                    <div key={index}>
                      <Typography
                        variant="paragraph"
                        color="gray"
                        className="font-bold inline"
                      >
                        {day.charAt(0).toUpperCase() + day.slice(1)}:
                      </Typography>
                      <Typography
                        variant="paragraph"
                        color="gray"
                        className="inline"
                      >
                        {" "}
                        {hours}
                      </Typography>
                    </div>
                  ))
                ) : (
                  <Typography variant="paragraph" color="gray">
                    Working hours not available
                  </Typography>
                )}
              </div>
            </div>
            <div className="container mx-auto p-4 h-96">
              <div className="mb-4">
                {user && <SellerCard id={user.id.toString()} />}
              </div>
              {gpsCoordinates && (
                <MapCard
                  position={{
                    lat: gpsCoordinates.latitude,
                    lng: gpsCoordinates.longitude,
                  }}
                />
              )}
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
            <div className="mt-20 grid lg:grid-cols-3 grid-cols-1 gap-y-6">
              {reviews.length === 0 ? (
                <div className="col-span-3 text-center">
                  <Typography variant="h5" color="gray">
                    " No reviews available for this product yet. "
                  </Typography>
                </div>
              ) : (
                reviews.map(
                  ({ title, user_name, review_text, date, rating }, index) => (
                    <CardReview
                      key={index}
                      title={title}
                      name={user_name}
                      feedback={review_text}
                      date={date}
                      rating={rating}
                    />
                  )
                )
              )}
            </div>
          </div>
          {currentPage < totalPages && reviews.length > 0 && (
            <Button
              onClick={handleSeeMore}
              className="mx-auto mt-10 flex content-center"
              size="lg"
            >
              {isLoading ? "Loading..." : "See More"}
            </Button>
          )}
        </section>
        <section className="py-10 px-8">
          <div className="mx-auto text-center mb-16">
            <Typography className="font-medium text-lg">
              Tailored Product Recommendation
            </Typography>
            <Typography variant="h1" className="my-3">
              Related Products
            </Typography>
          </div>
          <div className="container mx-auto">
            {relatedAdvertisementsLoading ? (
              <AdCardSkeltons />
            ) : (
              <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
                {relatedAdvertisements.length > 0 ? (
                  relatedAdvertisements.map((ad, index) => (
                    <AdCard
                      key={index}
                      imageSrc={backEndURL + ad.image_url}
                      title={ad.title}
                      description={ad.small_description}
                      rating={ad.avg_review}
                      price={ad.price}
                      link={`/advertisements/products/${ad.title}?id=${ad.id}`}
                    />
                  ))
                ) : (
                  <div className="col-span-3 text-center">
                    <Typography variant="h5" color="gray">
                      No related products found.
                    </Typography>
                  </div>
                )}
              </div>
            )}

            {/* Pagination Button */}
            {relatedTotalPages > relatedCurrentPage && (
              <div className="flex justify-center mt-6">
                <Button
                  onClick={handleSeeMoreRelated}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  {relatedAdvertisementsLoading ? "Loading..." : "See More"}
                </Button>
              </div>
            )}
          </div>
        </section>
      </DefaultLayout>
    </>
  );
}

export default ProductPage;
