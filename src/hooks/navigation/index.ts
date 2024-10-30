import { usePathname } from "next/navigation"
import { useState } from "react"

export const useNavigation = () => {
    const patName = usePathname()
    const [section, setSection] = useState<string>(patName)
    const onSetSection = (page: string) => setSection(page)
    return {
        section,
        onSetSection,
    }
}
