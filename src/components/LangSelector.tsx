import { useLang } from '../context/lang/useLang'

const LangSelector = () => {
    const { lang, setLang, langs } = useLang()
    const handleChage = (e: React.ChangeEvent<HTMLSelectElement>) => setLang(e.target.value)
    return (
        <select value={lang} onChange={handleChage} className="langSelector">
            {langs.map(lang =>
                <option key={lang} value={lang}>{lang.toUpperCase()}</option>
            )}
        </select>
    )
}

export default LangSelector
