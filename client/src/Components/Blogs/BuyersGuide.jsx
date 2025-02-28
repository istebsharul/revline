import { FaPhone } from "react-icons/fa";

const BuyersGuide = ({ description, details, part }) => {
  if (!description || !details) return null;

  return (
    <div className="md:w-5/5 p-6 bg-gray-100 flex jusitfy-center items-center flex-col">
      <h2 className="w-full text-2xl font-bold text-red-500 mb-2">Buyer's Guide</h2>
      <p className="w-full text-gray-700 mb-3">{description}</p>
      <ul className="list-disc list-inside space-y-2 text-gray-700">
        {details.map(({ heading, description }, index) => (
          <li key={index}>
            <span className="font-black">{heading}:</span> {description}
          </li>
        ))}
      </ul>
      <div className="mt-4 flex justify-center items-center text-red-500 font-semibold">
        <FaPhone className="mr-2" />
        <p className="text-xl text-red-500 font-medium">
          Not sure which <span className="text-black">{part}</span> fits your car? Call us at {" "}
          <a href="tel:+18886320709" className="underline">
            +1 888 632 0709
          </a>
          !
        </p>
      </div>
    </div>
  );
};

export default BuyersGuide;
