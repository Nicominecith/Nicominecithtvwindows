; Eigene Texte für den Nicominecith-TV-Installer / -Downloader (electron-builder NSIS)
!macro customHeader
  BrandingText "Nicominecith TV · Twitch für Windows"
!macroend

!macro customWelcomePage
  !define MUI_WELCOMEPAGE_TITLE "Willkommen bei Nicominecith TV"
  !define MUI_WELCOMEPAGE_TEXT "Dein Twitch-Client mit 7TV- und BTTV-Emotes, Mod-Menü, Adblock und Chat-Befehlen.$\r$\n$\r$\nDieser Assistent lädt Nicominecith TV herunter und richtet es auf deinem PC ein.$\r$\n$\r$\nKlicke auf Weiter, um zu starten."
  !insertmacro MUI_PAGE_WELCOME
!macroend

!macro customInstall
  DetailPrint "Nicominecith TV wurde installiert. Viel Spaß!"
!macroend

!macro customUnInstall
  DetailPrint "Nicominecith TV wurde entfernt. Bis bald!"
!macroend
