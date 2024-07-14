import React, { useState } from "react";
import ManageAdvertisementTable from "../../components/ManageAdvertisment/ManageAdvertismentTable";
import SettingsLayout from "../../layout/settings_layout";
import { Typography, Button, Spinner } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import AddAdvertisementModal from "../../components/AdvertismentModel/AddAdvertismentModal";
import UserAdditionalDetailsModel from "../../components/AdditionalDetailsModel/UserAdditionalDetailsModel";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const backEndURL = import.meta.env.VITE_LARAVEL_APP_URL;

const ManageAdvertisementPage: React.FC = () => {
  const [openAdModal, setOpenAdModal] = useState(false);
  const [openUADModal, setOpenUADModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const handleAddAdvertisement = async () => {
    setLoading(true);
    try {
      if (user?.role === "user") {
        const userInfoResponse = await fetch(
          `${backEndURL}/api/user-info/exists`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const userInfo = await userInfoResponse.json();

        if (!userInfo.has_user_info) {
          setOpenUADModal(true);
          return;
        }
        try {
          const adCountResponse = await fetch(
            `${backEndURL}/api/advertisement/getUsersAdvertisementCount`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const adCount = await adCountResponse.json();
          if (adCount.advertisement_count >= 2) {
            toast.error(
              "You can only add 2 advertisements. Remove one to add another."
            );
            return;
          }
        } catch (error) {
          toast.error("An error occurred. Please try again.");
          return;
        }
        setOpenAdModal(true);
      } else if (user?.role === "shop") {
        try {
          const shopInfoResponse = await fetch(
            `${backEndURL}/api/shop-info/exists`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const shopInfo = await shopInfoResponse.json();

          if (!shopInfo.has_shop_info) {
            navigate("/additionaldetails");
            return;
          }
        } catch (error) {
          toast.error("An error occurred. Please try again.");
          return;
        }
        setOpenAdModal(true);
      }
    } catch (error) {
      console.error("Failed to handle advertisement logic:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <SettingsLayout>
        <Typography
          variant="h3"
          className="mb-8 text-gray-700 mt-10 dark:text-gray-200"
        >
          Manage Advertisements
        </Typography>
        <Button
          className="block px-4 py-2 text-sm w-fit text-left"
          onClick={handleAddAdvertisement}
        >
          {loading ? <Spinner /> : "Add Advertisement"}
        </Button>
        <div className="px-1 pt-6 pb-2.5 shadow-default sm:px-7.5 xl:pb-1">
          <ManageAdvertisementTable />
        </div>
        <UserAdditionalDetailsModel
          handleOpen={() => setOpenUADModal(false)}
          open={openUADModal}
        />
        <AddAdvertisementModal
          open={openAdModal}
          handleClose={() => setOpenAdModal(false)}
        />
      </SettingsLayout>
    </>
  );
};

export default ManageAdvertisementPage;
