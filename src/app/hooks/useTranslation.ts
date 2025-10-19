import { useAppSelector } from "./hooks";

const useTranslation = () => {
  const translations = useAppSelector((state) => state.language.translations);

  const getTranslation = (key, defaultText) => {
    // Ensure translations is always an array to avoid null/undefined errors
    if (!Array.isArray(translations) || translations.length === 0) {
      return defaultText;
    }

    // Find the translation object safely
    const translationObj = translations.find(
      (item) =>
        item?.key?.trim()?.toLowerCase() === key?.trim()?.toLowerCase()
    );

    // Check if translation exists and is a valid string
    return translationObj?.Translation?.trim() ? translationObj.Translation : defaultText;
  };

  return { getTranslation };
};

export default useTranslation;
