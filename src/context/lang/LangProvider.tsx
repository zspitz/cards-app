import { ReactNode } from 'react'
import { LangContext, LangContextValue } from './useLang'
import { useLocalStorage } from '@mantine/hooks'

type Translation = {
    _isRtl?: 'true'
} & Record<string, string>
type Translations = {
    en: Translation
} & Record<string, Translation | undefined>

type Props = {
    children: ReactNode
}

const translations: Translations = {
    'en': {
    },
    'he': {
        _isRtl: 'true',
        'about': 'אודות',
        'cards': 'כרטיסים',
        'my cards': 'כרטיסים שלי',
        'profile': 'פרופיל',
        'log out': 'ניתוק',
        'favorites': 'נבחרים',
        'log in': 'התחברות',
        'register': 'רישום',
        'email': 'דוא"ל',
        'password': 'סיסמא',
        'invalid email': 'דוא"ל לא תקין',
        'submit': 'בצע'
    }
}
const langs = Object.keys(translations)

const LangProvider = ({ children }: Props) => {
    const [lang, setLang] = useLocalStorage({
        key: 'lang',
        defaultValue: 'en'
    })
    const currentTranslations = translations[lang] ?? translations.en
    const t: LangContextValue['t'] = s => {
        if (!s || typeof s !== 'string') { return s }
        // TODO attempt to match case of source string in object keys
        const key = s.toLocaleLowerCase()
        const translation = currentTranslations[key]
        if (translation) { return translation }
        if (lang != 'en') { console.log(`Missing translation for ${key} in ${lang}`) }
        return s
    }

    const dir = currentTranslations._isRtl ? 'rtl' : 'ltr'
    document.dir = dir

    return (
        <LangContext.Provider value={{ lang, setLang, langs, t, dir }}>
            {children}
        </LangContext.Provider>
    )
}

export default LangProvider
