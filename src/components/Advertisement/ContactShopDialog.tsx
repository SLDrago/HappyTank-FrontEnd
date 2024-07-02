import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import { PhoneIcon } from "@heroicons/react/24/solid";
import { SocialIcon } from "react-social-icons";
import "react-social-icons/facebook";
import "react-social-icons/twitter";
import "react-social-icons/instagram";

const ContactShopDialog = ({
  isOpen,
  onClose,
  phoneNumber,
  socialMediaLinks,
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose} size="md">
      <DialogHeader>Contact Shop</DialogHeader>
      <DialogBody className="p-8">
        <div className="flex flex-col items-start gap-4">
          {phoneNumber && (
            <div className="flex items-center gap-2">
              <div className=" bg-blue-gray-200 rounded-full p-4">
                <PhoneIcon className="h-5 w-5 text-white text-2xl" />
              </div>
              <Typography>{phoneNumber}</Typography>
            </div>
          )}
          {socialMediaLinks?.facebook && (
            <div className="flex items-center gap-2">
              <SocialIcon
                url={socialMediaLinks.facebook}
                className="h-5 w-5 text-gray-500"
              />
              <Typography>
                <a
                  href={socialMediaLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
              </Typography>
            </div>
          )}
          {socialMediaLinks?.twitter && (
            <div className="flex items-center gap-2">
              <SocialIcon
                url={socialMediaLinks.twitter}
                className="h-5 w-5 text-gray-500"
              />
              <Typography>
                <a
                  href={socialMediaLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
              </Typography>
            </div>
          )}
          {socialMediaLinks?.instagram && (
            <div className="flex items-center gap-2">
              <SocialIcon
                url={socialMediaLinks.instagram}
                className="h-5 w-5 text-gray-500"
              />
              <Typography>
                <a
                  href={socialMediaLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </Typography>
            </div>
          )}
        </div>
      </DialogBody>
      <DialogFooter>
        <Button color="gray" onClick={onClose}>
          Close
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ContactShopDialog;
