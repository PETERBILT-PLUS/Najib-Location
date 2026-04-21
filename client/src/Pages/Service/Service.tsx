const services = [
  {
    title: "Location de Voitures",
    description:
      "Nous proposons une large gamme de véhicules pour répondre à tous vos besoins, de la citadine économique au SUV haut de gamme.",
    icon: "🚗",
  },
  {
    title: "Entretien et Réparation",
    description:
      "Nos experts prennent soin de votre véhicule avec des services d'entretien réguliers et de réparations rapides.",
    icon: "🛠️",
  },
  {
    title: "Assistance 24h/24",
    description:
      "Nous vous accompagnons sur la route avec une assistance disponible 24h/24 et 7j/7 en cas de panne ou d'urgence.",
    icon: "📞",
  },
  {
    title: "Nettoyage Professionnel",
    description:
      "Service de nettoyage intérieur et extérieur pour un véhicule toujours impeccable.",
    icon: "🧼",
  },
];

function Service() {
  return (
    <main className="py-12 px-4 max-w-6xl mx-auto">
      <h1 className="text-3xl lg:text-4xl font-bold text-center mb-10 text-gray-800">
        Nos Services
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300"
          >
            <div className="text-4xl mb-4">{service.icon}</div>
            <h2 className="text-xl font-semibold mb-2 text-gray-700">
              {service.title}
            </h2>
            <p className="text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Service;
