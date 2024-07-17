import { useState } from "react";
import { Typography, Button, Input } from "@material-tailwind/react";
import { XMarkIcon, ArrowDownTrayIcon } from "@heroicons/react/20/solid";
import DefaultLayout from "../../layout/default_layout";
import axios from "axios";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const backEndURL = import.meta.env.VITE_LARAVEL_APP_URL;

const initialTags = [
  "Fish",
  "Plants",
  "Rocks",
  "Decorations",
  "Lighting",
  "Filter",
  "Heater",
];

const FishTankDesigner = () => {
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [customTag, setCustomTag] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleTagClick = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleRemoveTag = (tag: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  };

  const handleAddCustomTag = () => {
    if (customTag && !selectedTags.includes(customTag)) {
      setSelectedTags([...selectedTags, customTag]);
      setCustomTag("");
    }
  };

  const handleGenerateDesign = async () => {
    setIsGenerating(true);
    try {
      const formData = new FormData();
      formData.append("description", selectedTags.join(", "));

      const response = await axios.post(
        `${backEndURL}/api/ai/generateFishTankImage`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.status === "success") {
        setGeneratedImage(response.data.image_url);
      } else {
        // Handle error
        console.error("Failed to generate image");
      }
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadImage = () => {
    if (generatedImage) {
      const link = document.createElement("a");
      link.href = generatedImage;
      link.download = "FishTankDesign.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <DefaultLayout>
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <Typography variant="h2" className="font-bold text-center mt-8">
          AI Fish Tank Designer
        </Typography>
        <Typography className="mb-16 text-center text-[18px] font-normal text-gray-500">
          Add the tags as the way you need to customize your tank. Try to bring
          your creativity to a next level.
        </Typography>
        <div className="space-y-4">
          <Typography variant="h2" className="text-xl font-semibold">
            Step 1: Customize Your Tank
          </Typography>
          <div className="flex flex-wrap gap-2">
            {initialTags.map((tag) => (
              <Button
                key={tag}
                variant={selectedTags.includes(tag) ? "text" : "outlined"}
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </Button>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              type="text"
              value={customTag}
              onChange={(e) => setCustomTag(e.target.value)}
              placeholder="Add custom tag"
            />
            <Button onClick={handleAddCustomTag}>Add</Button>
          </div>
          {selectedTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {selectedTags.map((tag) => (
                <span
                  key={tag}
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full flex items-center"
                >
                  {tag}
                  <XMarkIcon
                    className="ml-1 cursor-pointer h-4 w-4"
                    onClick={() => handleRemoveTag(tag)}
                  />
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <Typography variant="h2" className="text-xl font-semibold">
            Step 2: Generate Design
          </Typography>
          <Button
            onClick={handleGenerateDesign}
            disabled={isGenerating}
            size="md"
          >
            {isGenerating ? "Generating..." : "Generate Design"}
          </Button>
          {generatedImage && (
            <div className="space-y-4">
              <Zoom>
                <img
                  src={generatedImage}
                  alt="Generated Design"
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </Zoom>
              <div className="flex justify-end">
                <Button
                  onClick={handleDownloadImage}
                  className="flex items-center gap-2"
                  size="sm"
                >
                  <ArrowDownTrayIcon className="h-5 w-5" />
                  Download Image
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default FishTankDesigner;
