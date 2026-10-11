
const Footer = () => {
  return (
    <footer className="mt-8 w-full border-t border-gray-300 bg-white px-3 py-4 text-gray-400 sm:mt-10 sm:px-4 sm:py-5">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 p-2 text-center sm:p-3 md:flex-row md:items-center md:justify-between md:gap-6 md:text-left">
        <p className="text-sm leading-6 sm:text-base">
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>

        <p className="text-sm leading-6 sm:text-base md:text-right">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
};

export default Footer;