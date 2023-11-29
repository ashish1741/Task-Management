import React, { useEffect, useState } from 'react'

function DarnkMode() {
    const [theme, setTheme] = useState(localStorage.thems);
    const colorTheme = theme ==='dark'?'light' : "dark"

    useEffect(() => {
        const root = window.document.documentElement
        root.classList.remove(colorTheme)
        root.classList.add(theme)
        localStorage.setItem('theme',theme)
    
    }, [theme,colorTheme])
 return [colorTheme, theme]
}

export default DarnkMode