# PS - Frontend
Required:
1) npm

npm install


Eerst bouw je de library:
ng build --project=ps-lib --watch

Vervolgens draai je een van de twee projecten.
ng serve --project=ps-government

De statussen in de applicatie zijn dynamisch. Binnen de applicatie zijn er een gelimiteerd aantal acties. Aan deze acties kun je een status hangen. Daarnaast is het mogelijk om er communicatie aan te hangen.

Binnen de database is er een tabel acties.


Acties:

# Toewijzen
 - Persoon
 - Groep

# Melding
 - Afsluiten
 - Afbreken

# Opdracht
 - Aanmaken
 - Accepteren
 - Weigeren
 - Gereedmelden
 - Goedkeuren
 - Afkeuren
 - Annuleren

Communicatie types:
 - Aannemer
 - Beheerder
 - Toezichthouder
 - Melder
