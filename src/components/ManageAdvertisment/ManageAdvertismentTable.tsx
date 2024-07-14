import React, { useState, useEffect } from "react";
import {
  IconButton,
  Card,
  CardBody,
  Typography,
  Spinner,
} from "@material-tailwind/react";
import { PencilIcon, TrashIcon, PhotoIcon } from "@heroicons/react/20/solid";
import EditAdds from "../EditAdvertisment/EditAds";
import DeleteAdd from "../DeleteAdvertisment/DeleteAdd";
import ImageManagementDialog from "../EditAdvertisment/ImageManagementDialog";
import { useAuth } from "../../context/AuthContext";
import axios from "axios"; // Import Axios for HTTP requests

const backEndURL = import.meta.env.VITE_LARAVEL_APP_URL;
interface Advertisement {
  id: number;
  title: string;
  smallDescription: string;
  image: string;
}

const ManageAdvertisementTable: React.FC = () => {
  const [ads, setAds] = useState<Advertisement[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentAd, setCurrentAd] = useState<Advertisement | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentDeleteAd, setCurrentDeleteAd] = useState<Advertisement | null>(
    null
  );
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAd, setSelectedAd] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    setLoading(true);
    fetchAdvertisements();
  }, []);

  const fetchAdvertisements = async () => {
    try {
      const response = await axios.post(
        `${backEndURL}/api/advertisement/getUserAdvertisements`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAds(
        response.data.map((ad: any) => ({
          id: ad.id,
          title: ad.title,
          smallDescription: ad.small_description,
          image: `${backEndURL}${ad.image_url}`, // Adjusted to full image URL
        }))
      );
      setLoading(false);
    } catch (error) {
      console.error("Error fetching advertisements:", error);
      setLoading(false);
    }
  };

  const handleEdit = (ad: Advertisement) => {
    setCurrentAd(ad);
    setIsEditModalOpen(true);
  };

  const handleSave = (updatedAd: Advertisement) => {
    fetchAdvertisements();
    setIsEditModalOpen(false);
  };

  const handleDelete = (ad: Advertisement) => {
    setCurrentDeleteAd(ad);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (currentDeleteAd) {
      setAds((prevAds) => prevAds.filter((ad) => ad.id !== currentDeleteAd.id));
      setIsDeleteModalOpen(false);
    }
  };

  const handleImageChange = (adId, newImages) => {
    console.log(`Images updated for ad ${adId}:`, newImages);
    // Update your ad state or send to backend
  };

  const openImageDialog = (ad) => {
    setSelectedAd(ad);
    setOpenDialog(true);
  };

  return (
    <Card>
      <CardBody>
        {loading ? (
          <>
            <table className="w-full text-left table-auto">
              <thead>
                <tr className="border-2">
                  <th className="p-4">Advertisement Image</th>
                  <th className="p-4">Title / Small Description</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
            </table>
            <div className="col-span-3 flex justify-center items-center w-full h-full mt-4">
              <Spinner className="h-12 w-12" />
            </div>
          </>
        ) : (
          <table className="w-full text-left table-auto">
            <thead>
              <tr className="border-2">
                <th className="p-4">Advertisement Image</th>
                <th className="p-4">Title / Small Description</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {ads.length === 0 ? (
                <tr>
                  <td colSpan={3} className="p-4 text-center text-gray-700">
                    "No advertisements to show"
                  </td>
                </tr>
              ) : (
                ads.map((ad, index) => {
                  const isLast = index === ads.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={ad.id}>
                      <td className={classes}>
                        <Card className="rounded-md w-fit">
                          <img
                            src={ad.image}
                            alt={ad.title}
                            className="object-cover w-40 rounded-md h-23"
                          />
                        </Card>
                      </td>
                      <td className={classes}>
                        <div>
                          <Typography variant="h6" className="font-semibold">
                            {ad.title}
                          </Typography>
                          <Typography
                            variant="paragraph"
                            color="gray"
                            className="mt-1 text-wrap"
                          >
                            {ad.smallDescription}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <IconButton
                          color="blue"
                          variant="text"
                          size="sm"
                          onClick={() => handleEdit(ad)}
                        >
                          <PencilIcon className="w-5 h-5" />
                        </IconButton>

                        <IconButton
                          color="red"
                          variant="text"
                          size="sm"
                          onClick={() => handleDelete(ad)}
                        >
                          <TrashIcon className="w-5 h-5" />
                        </IconButton>
                        <IconButton
                          color="green"
                          variant="text"
                          size="sm"
                          onClick={() => openImageDialog(ad)}
                        >
                          <PhotoIcon className="h-5 w-5" />
                        </IconButton>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        )}
      </CardBody>
      {currentAd && (
        <EditAdds
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          ad={currentAd}
          onSave={handleSave}
        />
      )}
      {currentDeleteAd && (
        <DeleteAdd
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onDelete={confirmDelete}
          advertisement_id={currentDeleteAd.id}
        />
      )}
      <ImageManagementDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        ad={selectedAd}
        onImagesChange={handleImageChange}
      />
    </Card>
  );
};

export default ManageAdvertisementTable;
