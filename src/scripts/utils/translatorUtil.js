import EnglishTranslations from '../../translations/translations.en';
import DeutschTranslations from '../../translations/translations.de';

export default {

    trans(locale, key) {
        if (locale === "de") {
            return DeutschTranslations[key] || key;
        } else{
            if (locale === "en") {
                return EnglishTranslations[key] || key;
            }
        }
    },

    existKey(locale, key) {
        if (locale === "de") {
            return (typeof DeutschTranslations[key] !== 'undefined');
        } else{
            if (locale === "en") {
                return (typeof EnglishTranslations[key] !== 'undefined');
            }
        }
    }
}
