# Nicominecith TV – Windows

Electron-Version von NicoTV für Windows 10/11 (x64) mit eigenem Downloader/Installer im Nico-Design.

## Was du am Ende bekommst
| Datei | Zweck |
|---|---|
| `NicominecithTV-Downloader-<v>.exe` | **Kleiner Downloader** (~1 MB). Lädt die App beim Installieren aus dem GitHub-Release und richtet sie ein. |
| `NicominecithTV-Setup-<v>.exe` | Normaler Offline-Installer (alles drin). |
| `NicominecithTV-Portable-<v>.exe` | Ohne Installation, einfach starten. |
| `nicominecith-tv-<v>-x64.nsis.7z` | App-Paket, das der Downloader nachlädt (muss im Release liegen!). |

## EXE bauen (empfohlen: GitHub, kein Windows-PC nötig)
1. Diesen Ordner in dein Repo `Nicominecith/NicominecithTV` legen und pushen.
2. Tag setzen: `git tag v2.16.4 && git push --tags` (oder unter *Actions → Build Windows (EXE) → Run workflow*).
3. Nach ein paar Minuten liegen alle `.exe` im Release bzw. als Artifact.

## Lokal bauen (Windows)
```
npm install
npm run dist
```
Ergebnis in `dist/`. Zum Testen ohne Bauen: `npm start`.

## Bedienung
- `Esc` / Maus-Zurücktaste = Zurück, `F11` = Vollbild, `F5` = Neuladen
- Das Fenster ist frei skalierbar; die 1920px-Oberfläche zoomt automatisch mit.

## Hinweis
Der Downloader lädt das App-Paket von `github.com/Nicominecith/NicominecithTV` (Release-Assets). Ändert sich Repo-Name oder Besitzer, in `package.json` unter `build.publish` anpassen.
Ohne Code-Signatur zeigt Windows SmartScreen beim ersten Start „Weitere Informationen → Trotzdem ausführen“ an.
