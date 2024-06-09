import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import { UserIcon, BuildingStorefrontIcon } from "@heroicons/react/24/solid";

interface UserShopRadioProps {
  name: string;
}

const UserShopRadio: React.FC<UserShopRadioProps> = ({ name }) => {
  const [selected, setSelected] = useState<"user" | "shop">("user");

  return (
    <div className="flex justify-center items-center">
      <div className="flex space-x-4">
        <Button
          color={selected === "user" ? "black" : "gray"}
          variant={selected === "user" ? "filled" : "outlined"}
          onClick={() => setSelected("user")}
          className="flex items-center space-x-2"
        >
          <UserIcon className="h-5 w-5" />
          <span>User</span>
        </Button>
        <Button
          color={selected === "shop" ? "black" : "gray"}
          variant={selected === "shop" ? "filled" : "outlined"}
          onClick={() => setSelected("shop")}
          className="flex items-center space-x-2"
        >
          <BuildingStorefrontIcon className="h-5 w-5" />
          <span>Shop</span>
        </Button>
      </div>
      <input type="hidden" name={name} value={selected} />
    </div>
  );
};

export default UserShopRadio;
