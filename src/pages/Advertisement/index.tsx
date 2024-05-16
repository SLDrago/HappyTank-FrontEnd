import DefaultLayout from "../../layout/default_layout";
import BackGround from "../../images/Backgrounds/fish-and-divers-on-blue-sea.svg";

export default function Advertisement() {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${BackGround})` }}
    >
      <DefaultLayout>
        <h1 className="text-7xl font-bold mb-4">Advertisement</h1>
        <p className="text-2xl font-bold mb-4">Advertisement</p>
      </DefaultLayout>
    </div>
  );
}
