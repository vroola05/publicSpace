# PS - Frontend
Required:
1) npm

npm install


Eerst bouw je de library:
ng build --project=ps-lib --watch

Vervolgens draai je een van de twee projecten.
ng serve --project=ps-government

for 127.0.0.1
ng serve --host 0.0.0.0 --disable-host-check --project=ps-government

chromium-browser --disable-web-security --user-data-dir="~/ChromiumTemp"
"C:\Program Files\Google\Chrome\Application\chrome.exe" --disable-web-security --disable-gpu --user-data-dir="%HOMEPATH%\Documents\Temp\Chrome"

De statussen in de applicatie zijn dynamisch. Binnen de applicatie zijn er een gelimiteerd aantal acties. Aan deze acties kun je een status hangen. Daarnaast is het mogelijk om er communicatie aan te hangen.

Binnen de database is er een tabel acties.

Opdracht processen
- GEM - Nieuwe opdracht komt binnen     - Status update - Nieuwe opdracht           - func GEM - Annuleren - func AAN - Accepteren, Weigeren
- AAN - Opdracht wijzigt van groep
- AAN - Opdracht wordt geaccepteerd     - Status update - In behandeling            - func GEM -           - func AAN - 
- AAN - Opdracht wordt toegewezen       - Status update - In behandeling            - func GEM -           - func AAN - 
- AAN - Opdracht is uitgevoerd          - Status update
- AAN - Opdracht wordt gereed gemeld    - Status update - Opdracht gereed gemeld
- GEM - Uitvoering niet geaccepteerd    - Status update - In behandeling
- AAN - Opdracht wordt gereed gemeld    - Status update - Opdracht gereed gemeld
- GEM - Uitvoering geaccepteerd         - Status update - Afgesloten

