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
        'submit': 'בצע',
        'light theme': 'עיצוב בהיר',
        'dark theme': 'עיצוב כהה',
        'language': 'שפה',
        'first name': 'שם פרטי',
        'last name': 'שם משפחה',
        'middle name': 'שם אמצעי',
        'phone': 'מס\' נייד/נייח',
        'street': 'רחוב',
        'house': 'בית',
        'city': 'עיר',
        'state': 'מדינה',
        'postal code': 'מיקוד',
        'country': 'ארץ',
        'business': 'עסק',
        'edit profile': 'עריכת פרופיל',
        'unable to update': 'לא ניתן לעדכן',
        'unable to register': 'לא ניתן להירשם',
        'control panel': 'בקרה',
        'create card': 'יצירת כרטיס',
        'clear': 'נקה',
        'image alt text': 'טקסט חילופי',
        'image url': 'כתובת תמונה',
        'is business': 'עסק',
        'is admin': 'מנהל',
        'title': 'כותרת',
        'subtitle': 'תת-כותרת'
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
        const lcase = s.toLocaleLowerCase()
        const translation =
            currentTranslations[s] ??
            currentTranslations[lcase]
        if (translation) { return translation }
        if (lang != 'en') { console.log(`Missing translation for ${s} in ${lang}`) }
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
