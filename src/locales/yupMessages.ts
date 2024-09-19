import i18n from "@/locales/i18n";

const translationsYup = {
  mixed: {
    required: i18n.t('errors.yup.required'),
  },
  string: {
    email: i18n.t('errors.yup.email'),
    min: i18n.t('errors.yup.min'),
    max: i18n.t('errors.yup.max'),
  }
};

export default translationsYup;