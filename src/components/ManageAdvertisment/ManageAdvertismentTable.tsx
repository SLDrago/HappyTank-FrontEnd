import React, { useState, useEffect } from 'react';
import {
    IconButton,
    Card,
    CardBody,
    Typography,
} from "@material-tailwind/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import EditAdds from '../EditAddVertisment/EditAdds'; // Import  EditAdds component
import DeleteAdd from '../DeleteAdvertisment/DeleteAdd'; // Import  DeleteModal component

interface Advertisement {
    id: string;
    image: string;
    title: string;
    smallDescription: string;
}

const ManageAdvertisementTable: React.FC = () => {
    const [ads, setAds] = useState<Advertisement[]>([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentAd, setCurrentAd] = useState<Advertisement | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [currentDeleteAd, setCurrentDeleteAd] = useState<Advertisement | null>(null);

    useEffect(() => {
        // Fetch advertisements from API and setAds with the response
        // Example data
        setAds([
            {
                id: '1',
                image: 'https://cdn.pixabay.com/photo/2022/07/02/17/35/fish-7297693_960_720.jpg',
                title: 'Sample Ad 1',
                smallDescription: 'This is a small description for ad 1',
            },
            {
                id: '2',
                image: 'https://cdn.pixabay.com/photo/2018/07/10/09/02/astronotus-3528098_960_720.jpg',
                title: 'Sample Ad 2',
                smallDescription: 'This is a small description for ad 2',
            },
            // Add more sample data here
        ]);
    }, []);

    const handleEdit = (ad: Advertisement) => {
        setCurrentAd(ad);
        setIsEditModalOpen(true);
    };

    const handleSave = (updatedAd: Advertisement) => {
        setAds(prevAds => prevAds.map(ad => ad.id === updatedAd.id ? updatedAd : ad));
        setIsEditModalOpen(false);
    };

    const handleDelete = (ad: Advertisement) => {
        setCurrentDeleteAd(ad);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (currentDeleteAd) {
            setAds(prevAds => prevAds.filter(ad => ad.id !== currentDeleteAd.id));
            setIsDeleteModalOpen(false);
            alert('The Item Has Been Deleted');
        }
    };

    return (
        <Card>
            <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-4">
                    Manage Advertisements
                </Typography>
                <table className="w-full text-left table-auto min-w-max">
                    <thead>
                        <tr className='border-2'>
                            <th className="p-4">Advertisement Image</th>
                            <th className="p-4">Title / Small Description</th>
                            <th className="p-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ads.map((ad, index) => {
                            const isLast = index === ads.length - 1;
                            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                            return (
                                <tr key={ad.id}>
                                    <td className={classes}>
                                        <Card className='rounded-md w-fit'>
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
                                            <Typography variant="body2" color="textSecondary" className="mt-1">
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
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
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
                />
            )}
        </Card>
    );
};

export default ManageAdvertisementTable;
