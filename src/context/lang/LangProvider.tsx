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
        'translatable todo manager': 'Translatable Todo Manager',
        'please add todo items using the input fields.': 'Please add todo items using the input fields.',
        'home': 'Home',
        'work': 'Work',
        'important': 'Important',
        'morning': 'Morning',
        'add todo...': 'Add todo...',
        'me': 'Me',
        'yaakov': 'Yaakov',
        'anat': 'Anat',
        'guy': 'Guy',
        'rivka': 'Rivka',
        'submit': 'Submit',
        'completed items': 'Completed items',
        'uncompleted items': 'Uncompleted items',
        'delete': 'Delete',
        'assigned to:': 'Assigned to:'
    },
    'he': {
        _isRtl: 'true',
        'translatable todo manager': 'מנהל משימות עם אפשרות תרגום',
        'please add todo items using the input fields.': 'נא להוסיף משימות באמצעות השדות.',
        'home': 'בית',
        'work': 'עבודה',
        'important': 'חשוב',
        'morning': 'בקר',
        'add todo...': 'הוספת משימה...',
        'me': 'אני',
        'yaakov': 'יעקב',
        'anat': 'ענת',
        'guy': 'גיא',
        'rivka': 'רבקה',
        'submit': 'שמור',
        'completed items': 'משימות שבוצעו',
        'uncompleted items': 'משימות לביצוע',
        'delete': 'מחיקה',
        'assigned to:': 'הועבר ל:'
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
        const key = s.toLocaleLowerCase()
        const translation = currentTranslations[key]
        if (translation) { return translation }
        console.log(`Missing translation for ${key}`)
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