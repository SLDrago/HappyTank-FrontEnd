import {
  Button,
  Input,
  Textarea,
  Typography,
  Radio,
} from "@material-tailwind/react";
import { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DefaultLayout from "../../layout/default_layout";
import BackGround from "../../images/Backgrounds/fish-and-divers-on-blue-sea.svg";
import "../../css/font.css"

const backEndURL = import.meta.env.VITE_LARAVEL_APP_URL;

export default function Home() {
  const [formData, setFormData] = useState({
    type: "General inquiry",
    first_name: "",
    last_name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRadioChange = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      type: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const response = await axios.post(`${backEndURL}/api/contact`, formData);
      toast.success(response.data.message);
      setFormData({
        type: "General inquiry",
        first_name: "",
        last_name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };
  // FOOTER ITEMS 
  const SITEMAP = [
    {
      title: "Company",
      links: ["About Us", "Careers", "Our Team", "Contact Us", "Customer Care"],
    },
    {
      title: "SERVICES",
      links: ["Fish Search", "Chatbot", "Advertising Platform", "Fish Compaibility Tool", "Community Forum"],
    },
    {
      title: "Offers",
      links: ["Blog", "Newsletter", "",],
    },
    {
      title: "Products",
      links: ["Fish", "Aquariaum Tools", "Free Products", "Discounted Products"],
    },
  ];
  const currentYear = new Date().getFullYear();
  // FOOTER ITEMS END
  return (
    <div
      className="relative min-h-screen bg-center bg-cover"
      style={{ backgroundImage: `url(${BackGround})` }}
    >
      <DefaultLayout>
        <main className="flex flex-col items-center h-screen mt-32">
          <h1 className="mb-4 font-bold text-7xl">
            Looking for a Happy Aquarium?
          </h1>
          <h3 className="mb-8 text-xl">
            If you are not sure what fishes best for you! Use our tool to check
            the fish combinations you imagine..
          </h3>
          <NavLink to="/compatibility/compatibility-tool">
            <Button
              color="gray"
              size="sm"
              className="flex items-center px-6 text-base text-white w-fit"
            >
              <span>Go &nbsp;</span>{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fill="evenodd"
                  d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                />
              </svg>
            </Button>
          </NavLink>
        </main>
        <section className="px-8 py-8 lg:py-16 bg">
          <div id="services" className="relative pt-20 pb-8 bg-cyan-50 rounded-xl section md:pt-16 md:pb-0 bg-opacity-5">
            <div className="container px-4 mx-auto xl:max-w-6xl">
              {/* Heading start */}
              <header className="mx-auto mb-12 text-center lg:px-20">
                <h2 className="mb-2 text-6xl font-bold leading-normal text-black Polysans_median">What We Do</h2>
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 100 60"
                  style={{ margin: '0 auto', height: '35px' }}
                  xmlSpace="preserve"
                >
                  <circle
                    cx="50.1"
                    cy="30.4"
                    r="5"
                    className="stroke-primary"
                    style={{ fill: 'transparent', strokeWidth: 2, strokeMiterlimit: 10 }}
                  />
                  <line
                    x1="55.1"
                    y1="30.4"
                    x2="100"
                    y2="30.4"
                    className="stroke-primary"
                    style={{ strokeWidth: 2, strokeMiterlimit: 10 }}
                  />
                  <line
                    x1="45.1"
                    y1="30.4"
                    x2="0"
                    y2="30.4"
                    className="stroke-primary"
                    style={{ strokeWidth: 2, strokeMiterlimit: 10 }}
                  />
                </svg>
                <p className="pb-2 m-0 mx-auto text-xl font-light leading-relaxed text-black Polysans_slim">
                  Explore our  features and see how it can transform your experience.
                </p>
              </header>
              {/* End heading */}

              {/* Row */}
              <div className="flex flex-row flex-wrap -mx-4 text-center ">
                <div
                  className="flex-shrink w-full max-w-full px-4 sm:w-1/2 lg:w-1/3 lg:px-6 wow fadeInUp"
                  data-wow-duration="1s"
                  data-wow-delay="0s"
                  style={{ visibility: 'visible', animationDuration: '1s', animationName: 'fadeInUp' }}
                >
                  {/* Service block */}
                  <div className="px-12 py-8 mb-12 transition duration-300 ease-in-out transform border-b border-gray-100 bg-gray-50 hover:-translate-y-2 rounded-3xl">
                    <div className="inline-block mb-4 text-gray-900">
                      <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
                      </svg>
                    </div>
                    <h3 className="mb-2 text-lg font-semibold leading-normal text-black ">Fish Search</h3>
                    <p className="text-gray-500"> Explore our comprehensive fish search feature to find detailed information,  advertisements suggestions,  for any fish you desire, all in one place.</p>
                  </div>
                  {/* End service block */}
                </div>

                <div
                  className="flex-shrink w-full max-w-full px-4 sm:w-1/2 lg:w-1/3 lg:px-6 wow fadeInUp"
                  data-wow-duration="1s"
                  data-wow-delay="0.1s"
                  style={{ visibility: 'visible', animationDuration: '1s', animationName: 'fadeInUp' }}
                >
                  {/* Service block */}
                  <div className="px-12 py-8 mb-12 transition duration-300 ease-in-out transform border-b border-gray-100 bg-gray-50 hover:-translate-y-2 rounded-3xl">
                    <div className="inline-block mb-4 text-gray-900 ">
                      <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" fill="currentColor" className="bi bi-chat-square-dots" viewBox="0 0 16 16">
                        <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path>
                        <path d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
                      </svg>
                    </div>
                    <h3 className="mb-2 text-lg font-semibold leading-normal text-black">Chatbot</h3>
                    <p className="text-gray-500">Get instant answers and expert advice on all things aquarium with our new chatbot—your go-to resource for detailed information and support.</p>
                  </div>
                  {/* End service block */}
                </div>

                <div
                  className="flex-shrink w-full max-w-full px-4 sm:w-1/2 lg:w-1/3 lg:px-6 wow fadeInUp"
                  data-wow-duration="1s"
                  data-wow-delay="0.2s"
                  style={{ visibility: 'visible', animationDuration: '1s', animationName: 'fadeInUp' }}
                >
                  {/* Service block */}
                  <div className="px-12 py-8 mb-12 transition duration-300 ease-in-out transform border-b border-gray-100 bg-gray-50 hover:-translate-y-2 rounded-3xl">
                    <div className="inline-block mb-4 text-gray-900">

                      <svg width="2rem" height="2rem" fill="currentColor" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 491.52 491.52" xml:space="preserve">
                        <g>
                          <g>
                            <path d="M263.213,465.658c-3.551,0-6.589-2.549-7.202-6.046l-10.522-59.871l-2.699-15.36h7.454c3.157,0,5.718-2.56,5.718-5.719
			v-44.078c0-3.159-2.561-5.719-5.718-5.719h-17.209l-4.518-25.707h-74.723l32.124,182.815c0.564,3.207,3.35,5.547,6.606,5.547
			h22.545h46.549h1.595c7.141,0,12.93-5.789,12.93-12.931C276.143,471.447,270.354,465.658,263.213,465.658z"/>
                          </g>
                        </g>
                        <g>
                          <g>
                            <path d="M125.803,111.855l-32.967,11.39v14.682H61.893c-6.225,0-11.272,5.047-11.272,11.272v6.767H33.547
			c-6.226,0-11.273,5.046-11.273,11.272v65.179c0,6.225,5.047,11.272,11.273,11.272h17.074v6.765
			c0,6.226,5.047,11.273,11.272,11.273h30.943v14.681l32.967,11.391h27.991h74.725h26.097V111.855H125.803z"/>
                          </g>
                        </g>
                        <g>
                          <g>
                            <path d="M450.776,0c-10.201,0-18.472,8.27-18.472,18.472v0.458l-162.329,92.924v175.944l162.329,92.923v0.46
			c0,10.201,8.271,18.471,18.472,18.471c10.2,0,18.471-8.271,18.471-18.471V18.472C469.247,8.27,460.977,0,450.776,0z"/>
                          </g>
                        </g>
                      </svg>
                    </div>
                    <h3 className="mb-2 text-lg font-semibold leading-normal text-black">Advertising Platform</h3>
                    <p className="text-gray-500">Elevate your brand and captivate aquarium enthusiasts with our advertising platform where quality, service, integrity, and aesthetics come together.</p>
                  </div>
                  {/* End service block */}
                </div>

                <div
                  className="flex-shrink w-full max-w-full px-4 sm:w-1/2 lg:w-1/3 lg:px-6 wow fadeInUp"
                  data-wow-duration="1s"
                  data-wow-delay="0.3s"
                  style={{ visibility: 'visible', animationDuration: '1s', animationName: 'fadeInUp' }}
                >
                  {/* Service block */}
                  <div className="px-12 py-8 mb-12 transition duration-300 ease-in-out transform border-b border-gray-100 bg-gray-50 hover:-translate-y-2 rounded-3xl">
                    <div className="inline-block mb-4 text-gray-900">

                      <svg width="2rem" height="2rem" fill="currentColor" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <title>fish</title>
                        <path d="M30.952 16.877c-4.143-7.097-8.193-9.493-12.186-9.023l-1.681-3.747-1.557 4.448-3.143-1.861-0.050 3.934-2.906 0.111 0.782 1.906c-1.092 1.013-2.181 2.146-3.269 3.359l-5.792-2.83 2.8 4.737-2.275 2.438 2.262 0.174-2.525 3.736 6.744-4.051 5.463 2.653-3.105 1.085 2.219 0.86-2.032 1.388 3.256 0.061-0.288 2.921 3.702-4.493c0.132-0.003 0.263-0.006 0.393-0.011 0.018-0.001 0.035-0.001 0.053-0.002 0.128-0.005 0.255-0.010 0.381-0.017 0.012-0.001 0.023-0.001 0.035-0.002 0.123-0.007 0.246-0.014 0.367-0.023 0.008-0.001 0.015-0.001 0.023-0.002 0.124-0.009 0.246-0.019 0.367-0.029 0.017-0.002 0.034-0.003 0.051-0.005 0.244-0.022 0.483-0.047 0.718-0.076 0.014-0.002 0.028-0.003 0.042-0.005 0.116-0.015 0.23-0.030 0.344-0.046 0.012-0.002 0.024-0.003 0.036-0.005 0.114-0.017 0.228-0.034 0.34-0.052 0.001-0 0.002-0 0.003-0.001 0.113-0.018 0.224-0.038 0.335-0.057 0.014-0.003 0.028-0.005 0.043-0.008 0.11-0.020 0.22-0.041 0.328-0.063 0.001-0 0.001-0 0.002-0 0.109-0.022 0.216-0.045 0.323-0.068 0.009-0.002 0.018-0.004 0.027-0.006 0.105-0.023 0.209-0.047 0.312-0.072 0.010-0.002 0.020-0.005 0.030-0.007 0.208-0.050 0.411-0.104 0.61-0.159 0.010-0.003 0.020-0.006 0.030-0.008 0.1-0.028 0.199-0.057 0.296-0.087 0.001-0 0.002-0.001 0.003-0.001 0.1-0.030 0.198-0.061 0.296-0.093 0.003-0.001 0.005-0.002 0.008-0.003 0.096-0.031 0.191-0.063 0.285-0.096 0.007-0.002 0.014-0.005 0.020-0.007 0.188-0.065 0.372-0.133 0.552-0.203 0.005-0.002 0.010-0.004 0.014-0.006 0.275-0.108 0.54-0.221 0.794-0.339 0.003-0.001 0.005-0.002 0.008-0.004 4.929-2.28 6.113-6.246 6.113-6.246h-0v-0zM22.521 14.602c0.285-1.065 1.38-1.698 2.446-1.412 0.191 0.051 0.368 0.129 0.528 0.227-0.009-0-0.018-0.001-0.028-0.001-0.619 0-1.121 0.486-1.121 1.085s0.502 1.085 1.121 1.085c0.421 0 0.786-0.225 0.978-0.556 0.009 0.199-0.012 0.403-0.066 0.605-0.285 1.065-1.381 1.698-2.446 1.412s-1.698-1.38-1.412-2.446z"></path>
                      </svg>

                    </div>
                    <h3 className="mb-2 text-lg font-semibold leading-normal text-black">  Fish Compaibility Tool</h3>
                    <p className="text-gray-500">Discover harmonious aquatic living with our Fish Compatibility Tool, where you can effortlessly evaluate and match the perfect pair or trio of fish for a thriving community</p>
                  </div>
                  {/* End service block */}
                </div>

                <div
                  className="flex-shrink w-full max-w-full px-4 sm:w-1/2 lg:w-1/3 lg:px-6 wow fadeInUp"
                  data-wow-duration="1s"
                  data-wow-delay="0.4s"
                  style={{ visibility: 'visible', animationDuration: '1s', animationName: 'fadeInUp' }}
                >
                  {/* Service block */}
                  <div className="px-12 py-8 mb-12 transition duration-300 ease-in-out transform border-b border-gray-100 bg-gray-50 hover:-translate-y-2 rounded-3xl">
                    <div className="inline-block mb-4 text-gray-900">

                      <svg width="2rem" height="2rem" fill="currentColor" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 263.976 263.976" xml:space="preserve">
                        <g>
                          <path d="M149.763,36.21c3.01-3.811,4.871-8.616,4.871-13.837C154.634,10.036,144.628,0,132.291,0s-22.358,10.036-22.358,22.373
		c0,5.222,1.597,10.026,4.605,13.837c-9.211,5.839-15.55,16.117-15.55,27.807v27.22c0,4.143,3.785,7.739,7.928,7.739h50.811
		c4.143,0,7.262-3.597,7.262-7.739v-27.22C164.988,52.327,158.976,42.048,149.763,36.21z"/>
                          <path d="M81.988,124.539v-27.22c0-11.689-5.754-21.969-14.967-27.807c3.01-3.811,5-8.616,5-13.837
		c0-12.337-9.942-22.373-22.279-22.373S27.416,43.339,27.416,55.676c0,5.222,1.855,10.026,4.863,13.837
		c-9.212,5.839-15.292,16.117-15.292,27.807v27.22c0,4.143,3.301,7.437,7.443,7.437h50.811
		C79.384,131.976,81.988,128.682,81.988,124.539z"/>
                          <path d="M232.034,69.513c3.008-3.811,5.006-8.616,5.006-13.837c0-12.337-9.939-22.373-22.276-22.373
		c-12.337,0-22.325,10.036-22.325,22.373c0,5.222,1.843,10.026,4.852,13.837c-9.212,5.839-15.304,16.117-15.304,27.807v27.22
		c0,4.143,3.326,7.437,7.469,7.437h50.811c4.143,0,6.721-3.294,6.721-7.437v-27.22C246.988,85.63,241.245,75.351,232.034,69.513z"/>
                          <path d="M149.763,201.464c3.01-3.811,4.871-8.615,4.871-13.836c0-12.337-10.006-22.373-22.343-22.373s-22.358,10.036-22.358,22.373
		c0,5.221,1.597,10.026,4.605,13.837c-9.211,5.839-15.55,16.117-15.55,27.807v27.22c0,4.143,3.785,7.484,7.928,7.484h50.811
		c4.143,0,7.262-3.342,7.262-7.484v-27.22C164.988,217.581,158.976,207.304,149.763,201.464z M132.321,180.255
		c4.065,0,7.373,3.308,7.373,7.373c0,4.066-3.308,7.373-7.373,7.373s-7.373-3.308-7.373-7.373
		C124.948,183.563,128.255,180.255,132.321,180.255z M149.988,248.976h-36v-19.704c0-9.874,8.127-17.906,18.001-17.906
		c9.872,0,17.999,8.032,17.999,17.906V248.976z"/>
                          <path d="M138.988,138.555v-24.854c0-4.143-3.357-7.5-7.5-7.5c-4.143,0-7.5,3.357-7.5,7.5v24.854c0,4.143,3.357,7.5,7.5,7.5
		C135.63,146.055,138.988,142.697,138.988,138.555z"/>
                          <path d="M59.331,140.177c-3.009-2.847-7.753-2.718-10.604,0.289c-2.848,3.008-2.718,7.755,0.289,10.604l37.709,35.707
		c1.451,1.373,3.305,2.054,5.156,2.054c1.987,0,3.972-0.786,5.447-2.343c2.848-3.008,2.718-7.755-0.289-10.604L59.331,140.177z"/>
                          <path d="M205.241,140.071l-37.606,35.789c-3.001,2.855-3.118,7.603-0.263,10.603c1.474,1.55,3.452,2.33,5.434,2.33
		c1.857,0,3.718-0.686,5.169-2.067l37.606-35.789c3.001-2.855,3.118-7.602,0.263-10.602
		C212.989,137.332,208.241,137.217,205.241,140.071z"/>
                        </g>
                      </svg>
                    </div>
                    <h3 className="mb-2 text-lg font-semibold leading-normal text-black"> Community Forum</h3>
                    <p className="text-gray-500">Connect and engage with fellow enthusiasts through our Community Forum—post updates, comment, like, and share insights, fostering a vibrant and interactive aquarium community.</p>
                  </div>
                  {/* End service block */}
                </div>
                <div
                  className="flex-shrink w-full max-w-full px-4 sm:w-1/2 lg:w-1/3 lg:px-6 wow fadeInUp"
                  data-wow-duration="1s"
                  data-wow-delay="0.4s"
                  style={{ visibility: 'visible', animationDuration: '1s', animationName: 'fadeInUp' }}
                >
                  {/* Service block */}
                  <div className="px-12 py-8 mb-12 transition duration-300 ease-in-out transform border-b border-gray-100 bg-gray-50 hover:-translate-y-2 rounded-3xl">
                    <div className="inline-block mb-4 text-gray-900">

                      <svg width="2rem" height="2rem" fill="currentColor" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 30.771 30.771"
                        xml:space="preserve">
                        <g>
                          <g>
                            <path d="M9.743,22.4c-0.477-0.201-1.675-3.75-1.807-4.158c0.381,0.229,1.287,0.591,1.729,0.402
			c-0.527-0.281-2.262-3.995-2.425-4.521c0.324,0.322,1.073,0.081,1.073,0.081s-1.618-1.778-2.436-5.428
			c-0.599,3.185-2.284,5.606-2.284,5.606s0.882,0.179,1.148-0.286c-0.056,0.513-1.955,4.372-2.414,4.668
			c0.413,0.16,1.534-0.362,1.777-0.43c-0.066,0.42-2.092,4.063-2.092,4.063l3.435-0.885l-0.43,9.255h1.718l-0.43-9.235L9.743,22.4z"
                            />
                            <path d="M28.759,20.259c-1.074-0.453-3.77-6.365-4.066-7.281c0.857,0.515,2.896,1.331,3.893,0.907
			c-1.189-0.634-5.09-4.828-5.459-6.012c0.73,0.726,2.416,0.184,2.416,0.184S21.899,8.216,20.06,0
			c-1.35,7.169-5.14,8.458-5.14,8.458s1.984,0.403,2.583-0.646c-0.125,1.152-4.4,5.679-5.435,6.343c0.931,0.363,3.454-0.815,4-0.966
			c-0.147,0.943-4.709,7.068-4.71,7.068l7.732-1.993l-0.965,12.506h3.867l-0.967-12.465L28.759,20.259z"/>
                            <path d="M15.963,23.527c-0.068-0.193,0.068-0.377-0.023-0.548c-0.091-0.172-0.387-0.694-0.794-0.694
			c-0.071-0.342-0.413-0.695-0.652-1.061c-0.125,0.16-0.193,0.57-0.193,0.57s-0.638-0.649-0.889-0.719
			c-0.285,1.162,0.854,1.617,0.854,1.617s-0.062,0.758-0.455,1.071c-0.393,0.313-0.939,0.198-1.834-0.034
			c-0.894-0.234-1.025-0.595-1.891-0.492c-0.866,0.102-1.478,0.47-1.356,1.518c0.123,1.048,0.22,0.875,0.501,1.368
			c0.282,0.491-0.099,1.559-0.11,1.735c-0.012,0.178,0.854,1.469,0.888,1.795c0.034,0.323-0.042,0.742,0.137,0.811
			c0.18,0.068,0.577,0.113,0.658,0.052c0.116-0.088-0.939-1.485-0.837-2.537c0.179,0.138,0.686,1.201,0.82,1.538
			c0.135,0.336,0.06,0.77,0.06,0.77s0.701,0.15,0.736,0.049c0.036-0.104-0.855-1.535-0.847-1.928
			c0.009-0.395,0.299-1.563,0.457-1.569c0.157-0.005,0.62,0.313,1.284,0.017c0.032,0.207,0.015,0.996,0.071,1.244
			c0.222,1.001,0.149,2.264,0.153,2.333s0.129,0.009,0.163,0.077s0,0.188,0.068,0.239c0.068,0.051,0.615,0,0.7,0
			c0.086,0-0.274-0.382-0.393-0.513c-0.118-0.129-0.137-1.658-0.082-2.094c0.029-0.229,0.026-1.044,0.119-1.107
			c0.117,0.459,0.066,0.699,0.091,0.895c0.026,0.198,0.12,0.415,0.137,0.624c0.067,0.837,0,1.632,0.042,1.657
			c0.043,0.025,0.111,0,0.146,0.076c0.034,0.076,0.026,0.238,0.026,0.238s0.717,0.12,0.666-0.009
			c-0.051-0.128-0.258-0.401-0.351-0.546c-0.091-0.145-0.233-1.979-0.075-2.583c0.158-0.603,0.56-0.935,0.594-1.743
			c0.307-0.363,0.358-1.391,0.581-1.424s0.555,0.225,0.74,0.318c0.186,0.096,0.647-0.129,0.548-0.307
			C16.319,24.054,16.032,23.721,15.963,23.527z"/>
                          </g>
                        </g>
                      </svg>
                    </div>
                    <h3 className="mb-2 text-lg font-semibold leading-normal text-black"> Environmental Reccomendations</h3>
                    <p className="text-gray-500">Create the perfect aquatic habitat with our Environment Recommendation feature—receive tailored advice on setting up your tank to suit all your fish’s needs</p>
                  </div>
                  {/* End service block */}
                </div>
              </div>
              {/* End row */}
            </div>
          </div>
        </section>
        {/* new  Section Start */}
        <section className="flex flex-col items-center p-8 px-8 py-8 bg-gray-100 md:flex-row rounded-xl lg:py-16 bg-opacity-5" style={{ minHeight: '600px' }}>
          <div className="mb-8 text-center md:w-1/2 md:text-left md:mb-0">
            <h2 className="mb-4 text-5xl font-bold text-white Polysans_median">
              Integrate only<br />
              the features<br />
              <span className="mb-4 text-4xl font-bold cirka">You need</span>

            </h2>
            <p className="mb-4 text-lg text-white Polysans_slim" >
              Pick the extensions you need to create the user experience your users want.
            </p>
            <a href="#" className="flex items-center text-2xl text-blue-500">
              Show docs <span className="ml-2">&rarr;</span>
            </a>
          </div>
          <div className="md:w-1/2">
            <img src="../../../public/discuss (1).gif" alt="Illustration" className="w-full transition duration-500 ease-in-out transform shadow-lg rounded-xl hover:scale-105 fade-in" />


          </div>
        </section>
        {/* new  Section End */}
        <section className="px-8 py-8 lg:py-16">
          <div className="container mx-auto text-center">
            <Typography
              variant="h5"
              color="blue-gray"
              className="mb-4 !text-base lg:!text-2xl text-white"
            >
              Customer Care
            </Typography>
            <Typography
              variant="h1"
              color="blue-gray"
              className="mb-4 !text-3xl lg:!text-5xl text-white"
            >
              We&apos;re Here to Help
            </Typography>
            <Typography className="mb-10 font-normal !text-lg lg:mb-20 mx-auto text-white">
              Whether it&apos;s a question about our services, a request for
              technical assistance, or suggestions for improvement, our team is
              eager to hear from you.
            </Typography>
            <div className="p-10 bg-white rounded-lg">
              <div className="grid items-start grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-2">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7920.510536481554!2d81.08184390974014!3d6.979177323291845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae4618a1a9fec37%3A0x1dd900702229654b!2sUva%20Wellassa%20University%20of%20Sri%20Lanka!5e0!3m2!1sen!2slk!4v1715778845781!5m2!1sen!2slk"
                  width="600"
                  height="450"
                  loading="lazy"
                  className="w-full h-full lg:max-h-[510px] border-x-blue-gray-900 border-y-blue-gray-900 rounded-lg border-solid border-2"
                ></iframe>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <Typography
                    variant="small"
                    className="text-left !font-semibold !text-gray-600"
                  >
                    Select Options for Engagement
                  </Typography>
                  <div className="flex gap-4">
                    <Radio
                      name="type"
                      label="General inquiry"
                      checked={formData.type === "General inquiry"}
                      onChange={() => handleRadioChange("General inquiry")}
                    />
                    <Radio
                      name="type"
                      label="Technical Support"
                      checked={formData.type === "Technical Support"}
                      onChange={() => handleRadioChange("Technical Support")}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Typography
                        variant="small"
                        className="mb-2 text-left font-medium !text-gray-900"
                      >
                        First Name
                      </Typography>
                      <Input
                        color="gray"
                        size="lg"
                        placeholder="First Name"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        className="focus:border-t-gray-900"
                        containerProps={{
                          className: "min-w-full",
                        }}
                        labelProps={{
                          className: "hidden",
                        }}
                      />
                    </div>
                    <div>
                      <Typography
                        variant="small"
                        className="mb-2 text-left font-medium !text-gray-900"
                      >
                        Last Name
                      </Typography>
                      <Input
                        color="gray"
                        size="lg"
                        placeholder="Last Name"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        className="focus:border-t-gray-900"
                        containerProps={{
                          className: "!min-w-full",
                        }}
                        labelProps={{
                          className: "hidden",
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <Typography
                      variant="small"
                      className="mb-2 text-left font-medium !text-gray-900"
                    >
                      Your Email
                    </Typography>
                    <Input
                      color="gray"
                      size="lg"
                      placeholder="name@email.com"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="focus:border-t-gray-900"
                      containerProps={{
                        className: "!min-w-full",
                      }}
                      labelProps={{
                        className: "hidden",
                      }}
                    />
                  </div>
                  <div>
                    <Typography
                      variant="small"
                      className="mb-2 text-left font-medium !text-gray-900"
                    >
                      Your Message
                    </Typography>
                    <Textarea
                      rows={6}
                      color="gray"
                      placeholder="Message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="focus:border-t-gray-900"
                      containerProps={{
                        className: "!min-w-full",
                      }}
                      labelProps={{
                        className: "hidden",
                      }}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    color="gray"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send message"}
                  </Button>
                  {submitMessage && (
                    <Typography
                      variant="small"
                      className="mt-2 text-center"
                      color={submitMessage.includes("error") ? "red" : "green"}
                    >
                      {submitMessage}
                    </Typography>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>
        {/* Footer Section Start */}
        <section className="ml-4">
          <footer className="relative w-full ">
            <div className="w-full px-8 mx-auto max-w-7xl">
              <div className="grid w-full grid-cols-1 gap-8 py-12 mx-auto md:grid-cols-2 lg:grid-cols-4">
                {SITEMAP.map(({ title, links }, key) => (
                  <div key={key} className="w-full">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-4 text-xl font-bold text-white uppercase opacity-50"
                    >
                      {title}
                    </Typography>
                    <ul className="space-y-1">
                      {links.map((link, key) => (
                        <Typography key={key} as="li" color="blue-gray" className="font-normal">
                          <a
                            href="#"
                            className="inline-block py-1 pr-2 text-white transition-transform hover:scale-105"
                          >
                            {link}
                          </a>
                        </Typography>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-center justify-center w-full py-4 border-t border-blue-gray-50 md:flex-row md:justify-between">
                <Typography
                  variant="small"
                  className="mb-4 font-normal text-center text-white md:mb-0"
                >
                  &copy; {currentYear} <a href="https://material-tailwind.com/">Happy Tank</a>. All
                  Rights Reserved.
                </Typography>
                <div className="flex gap-4 text-white sm:justify-center">
                  <Typography as="a" href="#" className="transition-opacity opacity-80 hover:opacity-100">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fill-rule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </Typography>
                  <Typography as="a" href="#" className="transition-opacity opacity-80 hover:opacity-100">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fill-rule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </Typography>
                  <Typography as="a" href="#" className="transition-opacity opacity-80 hover:opacity-100">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </Typography>
                  <Typography as="a" href="#" className="transition-opacity opacity-80 hover:opacity-100">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fill-rule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </Typography>
                  <Typography as="a" href="#" className="transition-opacity opacity-80 hover:opacity-100">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fill-rule="evenodd"
                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </Typography>
                </div>
              </div>
            </div>
          </footer>
        </section>
        {/* Footer Section End */}


      </DefaultLayout>
    </div>
  );
}
