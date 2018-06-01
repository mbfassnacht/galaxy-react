import EnglishTranslations from '../../translations/translations.en';
import DeutschTranslations from '../../translations/translations.de';

export default {

    trans(locale, key) {
        if (locale === "de") {
            return DeutschTranslations[key];
        } else{
            if (locale === "en") {
                return EnglishTranslations[key];
            }
        }
    }
}
