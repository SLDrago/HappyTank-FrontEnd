import {
  Button,
  Input,
  Textarea,
  Typography,
  Radio,
} from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
import DefaultLayout from "../../layout/default_layout";
import BackGround from "../../images/Backgrounds/fish-and-divers-on-blue-sea.svg";

export default function Home() {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${BackGround})` }}
    >
      <DefaultLayout>
        <main className="flex flex-col items-center mt-32 h-screen">
          <h1 className="text-7xl font-bold mb-4">
            Looking for a Happy Aquarium?
          </h1>
          <h3 className="text-xl mb-8">
            If you are not sure what fishes best for you! Use our tool to check
            the fish combinations you imagine..
          </h3>
          <NavLink to="/compatibility/compatibility-tool">
            <Button
              color="gray"
              size="sm"
              className="text-white w-fit flex items-center text-base px-6"
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
            <div className="bg-white p-10 rounded-lg">
              <div className="grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-2 items-start">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7920.510536481554!2d81.08184390974014!3d6.979177323291845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae4618a1a9fec37%3A0x1dd900702229654b!2sUva%20Wellassa%20University%20of%20Sri%20Lanka!5e0!3m2!1sen!2slk!4v1715778845781!5m2!1sen!2slk"
                  width="600"
                  height="450"
                  loading="lazy"
                  className="w-full h-full lg:max-h-[510px] border-x-blue-gray-900 border-y-blue-gray-900 rounded-lg border-solid border-2"
                ></iframe>
                <form action="#" className="flex flex-col gap-4">
                  <Typography
                    variant="small"
                    className="text-left !font-semibold !text-gray-600"
                  >
                    Select Options for Engagement
                  </Typography>
                  <div className="flex gap-4">
                    <Radio name="type" label="General inquiry" defaultChecked />
                    <Radio name="type" label="Technical Support" />
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
                        name="first-name"
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
                        name="last-name"
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
                      className="focus:border-t-gray-900"
                      containerProps={{
                        className: "!min-w-full",
                      }}
                      labelProps={{
                        className: "hidden",
                      }}
                    />
                  </div>
                  <Button className="w-full" color="gray">
                    Send message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </DefaultLayout>
    </div>
  );
}
