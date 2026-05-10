import { useTranslation } from "react-i18next";

const services = [
  {
    titleKey: "service.services.0.title",
    descriptionKey: "service.services.0.description",
    icon: "🚗",
  },
  {
    titleKey: "service.services.1.title",
    descriptionKey: "service.services.1.description",
    icon: "🛠️",
  },
  {
    titleKey: "service.services.2.title",
    descriptionKey: "service.services.2.description",
    icon: "📞",
  },
  {
    titleKey: "service.services.3.title",
    descriptionKey: "service.services.3.description",
    icon: "🧼",
  },
];

function Service() {
  const { t } = useTranslation();
  return (
    <main className="py-12 px-4 max-w-6xl mx-auto xl:min-h-screen">
      <h1 className="text-3xl lg:text-4xl font-bold text-center mb-10 text-gray-800">
        {t("service.title")}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300"
          >
            <div className="text-4xl mb-4">{service.icon}</div>
            <h2 className="text-xl font-semibold mb-2 text-gray-700">
              {t(service.titleKey)}
            </h2>
            <p className="text-gray-600">{t(service.descriptionKey)}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Service;
