import { getPathArray, createCookie, getCookie } from "./utils";

const strings = {
    es: {
        "search": "Buscar",

    },
    en: {
        "search": "Search",
    }
};

const DEFAULT_LANGUAGE = "en";

const lang = ( getPathArray().length > 1 && strings[getPathArray()[1]] ) ? getPathArray()[1] : undefined;

export const currentLanguage = ( lang ) ? lang : (
    ( getCookie("lang") ) ? getCookie("lang") : (
        ( window.navigator.userLanguage ) ? window.navigator.userLanguage.substr(0, 2) : (
            ( window.navigator.language ) ? window.navigator.language.substr(0, 2) : DEFAULT_LANGUAGE
        )
    )
);

document.getElementsByTagName("html")[0].setAttribute("lang", currentLanguage);

export const addLangToPath = (url, newLang = currentLanguage) => {
    if (url.match(/\/es\/|\/en\//gi)) {
        return url.replace(/\/es\/|\/en\//gi, `/${newLang}/`)
    } else {
        return `/${newLang}${url}`
    }
};

export const changeLanguage = (newLang) => {
    createCookie("lang", newLang);
    window.location = addLangToPath(window.location.pathname, newLang)
};

export default function getString(key) {
    const rsrcs = strings[currentLanguage];
    return ( rsrcs ) ? rsrcs[key] : strings[DEFAULT_LANGUAGE][key]
}
