function Contact() {
    return (
      <main className="min-h-screen py-12 px-4 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Contactez-nous
        </h1>
  
        <p className="text-center text-lg text-gray-600 mb-6">
          Nous serions ravis de répondre à toutes vos questions ou préoccupations. N'hésitez pas à nous contacter.
        </p>
  
        <section className="text-center text-lg text-gray-700 mb-6">
          <h2 className="font-semibold text-xl mb-4">Adresse</h2>
          <p>123 Rue de l'Entreprise,</p>
          <p>75000 Paris, France</p>
        </section>
  
        <section className="text-center text-lg text-gray-700 mb-6">
          <h2 className="font-semibold text-xl mb-4">Téléphone</h2>
          <p>+33 1 23 45 67 89</p>
        </section>
  
        <section className="text-center text-lg text-gray-700 mb-6">
          <h2 className="font-semibold text-xl mb-4">Email</h2>
          <p>contact@monsite.com</p>
        </section>
  
        <section className="text-center text-lg text-gray-700">
          <h2 className="font-semibold text-xl mb-4">Horaires d'ouverture</h2>
          <p>Lundi - Vendredi: 9h00 - 18h00</p>
          <p>Samedi: 10h00 - 16h00</p>
          <p>Dimanche: Fermé</p>
        </section>
  
        <div className="mt-12 text-center text-sm text-gray-500">
          Nous sommes impatients de vous aider. À bientôt !
        </div>
      </main>
    );
  }
  
  export default Contact;
  