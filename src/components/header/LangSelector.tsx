import { Tooltip } from '@mantine/core'
import { useLang } from '../../context/lang/useLang'

const LangSelector = () => {
    const { lang, setLang, langs, t } = useLang()
    const handleChage = (e: React.ChangeEvent<HTMLSelectElement>) => setLang(e.target.value)
    return (
        <Tooltip label={t('Language')}>
            <select value={lang} onChange={handleChage} className="langSelector">
                {langs.map(lang =>
                    <option key={lang} value={lang}>{lang.toUpperCase()}</option>
                )}
            </select>
        </Tooltip>
    )
}

export default LangSelector
