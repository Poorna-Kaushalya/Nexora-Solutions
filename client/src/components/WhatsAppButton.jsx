import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/94753933586"
      target="_blank"
      className="fixed bottom-5 right-5 bg-green-500 text-white p-4 rounded-full shadow-lg hover:scale-110 transition"
    >
      <FaWhatsapp size={24} />
    </a>
  );
};

export default WhatsAppButton;