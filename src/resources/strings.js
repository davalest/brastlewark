import { getPathArray, createCookie, getCookie } from "./utils";

const strings = {
    es: {
        "search": "Buscar un ciudadano",
        "name": "Nombre",
        "age": "Edad",
        "weight": "Peso",
        "height": "Estatura",
        "hair_color": "Color de pelo",
        "professions": "Profesiones",
        "friends": "Amigos",
        "select_name": "Selecciona el nombre del ciudadano que buscas",

    },
    en: {
        "search": "Search for a citizen",
        "name": "Name",
        "age": "Age",
        "weight": "Weight",
        "height": "Height",
        "hair_color": "Hair color",
        "professions": "Professions",
        "friends": "Friends",
        "select_name": "Select the name of the citizen you are looking for",
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
