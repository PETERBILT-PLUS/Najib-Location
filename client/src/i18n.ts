import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import navbarEn from "./locales/en/navbar.json";
import navbarAr from "./locales/ar/navbar.json";
import navbarEs from "./locales/es/navbar.json";
import navbarFr from "./locales/fr/navbar.json";
import commonEn from "./locales/en/common.json";
import commonAr from "./locales/ar/common.json";
import commonEs from "./locales/es/common.json";
import commonFr from "./locales/fr/common.json";
import homeEn from "./locales/en/home.json";
import homeAr from "./locales/ar/home.json";
import homeEs from "./locales/es/home.json";
import homeFr from "./locales/fr/home.json";
import serviceEn from "./locales/en/service.json";
import serviceAr from "./locales/ar/service.json";
import serviceEs from "./locales/es/service.json";
import serviceFr from "./locales/fr/service.json";
import contactEn from "./locales/en/contact.json";
import contactAr from "./locales/ar/contact.json";
import contactEs from "./locales/es/contact.json";
import contactFr from "./locales/fr/contact.json";
import getSingleCarEn from "./locales/en/getSingleCar.json";
import getSingleCarAr from "./locales/ar/getSingleCar.json";
import getSingleCarEs from "./locales/es/getSingleCar.json";
import getSingleCarFr from "./locales/fr/getSingleCar.json";
import footerEn from "./locales/en/footer.json";
import footerAr from "./locales/ar/footer.json";
import footerEs from "./locales/es/footer.json";
import footerFr from "./locales/fr/footer.json";

i18n.use(initReactI18next).use(LanguageDetector).init({
    resources: {
        en: {
            translation: {
                navbar: navbarEn,
                common: commonEn,
                home: homeEn,
                service: serviceEn,
                contact: contactEn,
                getSingleCar: getSingleCarEn,
                footer: footerEn,
            },
        },
        ar: {
            translation: {
                navbar: navbarAr,
                common: commonAr,
                home: homeAr,
                service: serviceAr,
                contact: contactAr,
                getSingleCar: getSingleCarAr,
                footer: footerAr,
            },
        },
        es: {
            translation: {
                navbar: navbarEs,
                common: commonEs,
                home: homeEs,
                service: serviceEs,
                contact: contactEs,
                getSingleCar: getSingleCarEs,
                footer: footerEs,
            },
        },
        fr: {
            translation: {
                navbar: navbarFr,
                common: commonFr,
                home: homeFr,
                service: serviceFr,
                contact: contactFr,
                getSingleCar: getSingleCarFr,
                footer: footerFr,
            },
        },
    },
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: {
        escapeValue: false,
    },
    detection: {
        order: ["cookie", "localStorage", "navigator", "htmlTag", "subdomain"],
        caches: ["localStorage", "cookie"],
    }
});

export default i18n;