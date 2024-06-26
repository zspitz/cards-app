import { type Dispatch, type SetStateAction, createContext, useContext } from 'react'

export type LangContextValue = {
    lang: string,
    setLang: Dispatch<SetStateAction<string>>,
    langs: string[],
    t: (s: string) => string,
    dir: 'ltr' | 'rtl'
}

export const LangContext = createContext<LangContextValue | null>(null)

export const useLang = () => {
    const contextValue = useContext(LangContext)
    if (contextValue === null) {
        throw new Error('Cannot use LangContext outside of provider')
    }
    return contextValue
}