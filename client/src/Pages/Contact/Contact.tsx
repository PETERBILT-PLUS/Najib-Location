import { useTranslation } from "react-i18next";

function Contact() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {t("contact.title")}
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">
            {t("contact.description")}
          </p>
        </div>
      </div>

      {/* Contact Information Cards */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 -mt-16 relative z-10">
          {/* Address Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition duration-300">
            <div className="text-4xl mb-4 text-center">📍</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">
              {t("contact.address")}
            </h3>
            <div className="text-gray-600 text-center">
              <p>{t("contact.addressLine1")}</p>
              <p>{t("contact.addressLine2")}</p>
            </div>
          </div>

          {/* Phone Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition duration-300">
            <div className="text-4xl mb-4 text-center">📞</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">
              {t("contact.phone")}
            </h3>
            <div className="text-gray-600 text-center">
              <p className="text-lg font-medium">{t("contact.phoneNumber")}</p>
            </div>
          </div>

          {/* Email Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition duration-300">
            <div className="text-4xl mb-4 text-center">✉️</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">
              {t("contact.email")}
            </h3>
            <div className="text-gray-600 text-center">
              <p className="text-lg font-medium">{t("contact.emailAddress")}</p>
            </div>
          </div>

          {/* Opening Hours Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition duration-300">
            <div className="text-4xl mb-4 text-center">🕒</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">
              {t("contact.openingHours")}
            </h3>
            <div className="text-gray-600 text-center space-y-1">
              <p>{t("contact.mondayFriday")}</p>
              <p>{t("contact.saturday")}</p>
              <p className="text-red-500 font-medium">{t("contact.sunday")}</p>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {t("contact.getInTouch")}
            </h2>
            <p className="text-gray-600 mb-6">
              {t("contact.ctaDescription")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:${t("contact.phoneNumber")}`}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition duration-300 inline-flex items-center justify-center"
              >
                📞 {t("contact.callUs")}
              </a>
              <a
                href={`mailto:${t("contact.emailAddress")}`}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition duration-300 inline-flex items-center justify-center"
              >
                ✉️ {t("contact.emailUs")}
              </a>
            </div>
          </div>
        </div>

        {/* Footer Message */}
        <div className="mt-12 text-center">
          <p className="text-lg text-gray-700 font-medium">
            {t("contact.footer")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
  