# Opgave: Ontwikkeling van een RPG-game (Classes & Overerving)

**Vak:** Informatica / Programmeertechnieken  
**Doelgroep:** ICW  
**Onderwerp:** Objectgeoriënteerd programmeren (OOP) in JavaScript

---

## Context

Je werkt mee aan de basisstructuur van een nieuwe RPG-game (Role-Playing Game). In het spel komen verschillende soorten personages voor. Ze delen allemaal een aantal basiseigenschappen (zoals een naam en levenspunten), maar hebben elk ook hun eigen unieke vaardigheden. Om dubbele code te vermijden, pas je **objectgeoriënteerd programmeren (OOP)** toe met classes en overerving in JavaScript.

---

## Deel 1: De superklasse `Personage`

Maak een klasse `Personage` aan met de volgende vereisten:

1. **Constructor:**
   - Aanvaardt `naam` (`string`) en `levenspunten` (`number`) en slaat deze op als eigenschappen van het object.
   - Voeg ook een standaard eigenschap `niveau` toe met de beginwaarde `1`.
2. **Methode `toonStatus()`:**
   - Geeft een string terug in het formaat: `"[naam] (Niveau [niveau]) - HP: [levenspunten]"`.
3. **Methode `ontvangSchade(aantal)`:**
   - Vermindert de `levenspunten` met `aantal`.
   - Zorg ervoor dat de levenspunten **nooit onder 0** kunnen zakken (als het resultaat negatief zou zijn, worden de levenspunten op `0` gezet).
   - Toon daarna in de console hoeveel schade het personage heeft gekregen en hoeveel HP er nog overblijft.
4. **Methode `levelUp()`:**
   - Verhoogt het `niveau` met `1` en geeft het personage 20 extra `levenspunten`.

---

## Deel 2: De subklasse `Krijger`

Maak een klasse `Krijger` aan die overerft van `Personage` (`extends`).

1. **Constructor:**
   - Aanvaardt `naam`, `levenspunten` en `wapen` (`string`, bv. `"Zwaard"`).
   - Vergeet niet de constructor van de superklasse aan te roepen met `super()`.
2. **Methode `valAan(doelwit)`:**
   - Aanvaardt een ander `Personage`-object als parameter (`doelwit`).
   - De krijger deelt 15 schade uit aan het doelwit (gebruik hiervoor de methode `ontvangSchade` van het doelwit) en toont een boodschap in de console, bv.: `"[naam] valt [doelwit.naam] aan met [wapen]!"`.
3. **Overschrijven (Override) van `levelUp()`:**
   - Wanneer een krijger een niveau stijgt, gebeurt hetzelfde als bij een standaard personage, **maar** hij krijgt daarbovenop nog eens 10 extra levenspunten (dus 30 in totaal).
   - Gebruik hiervoor `super.levelUp()`.

---

## Deel 3: De subklasse `Tovenaar`

Maak een tweede subklasse `Tovenaar` aan die eveneens overerft van `Personage`.

1. **Constructor:**
   - Aanvaardt `naam`, `levenspunten` en `mana` (`number`, bv. `50`).
2. **Methode `spreekSpreukUit(doelwit)`:**
   - Controleer of de tovenaar minstens `10` mana heeft.
   - **Indien wel:** Trek `10` mana af en deel `25` schade uit aan het `doelwit`. Toon een boodschap in de console (bv. `"[naam] vuurt een vuurbal af op [doelwit.naam]!"`).
   - **Indien niet:** Toon in de console dat de tovenaar onvoldoende mana heeft om de spreuk uit te spreken.

---

## Deel 4: Testscript

Schrijf onderaan je script de nodige code om je klassen uit te testen:

1. Maak een krijger aan (bv. _"Arthur"_, 100 HP, wapen _"Excalibur"_).
2. Maak een tovenaar aan (bv. _"Merlijn"_, 70 HP, 25 mana).
3. Laat Merlijn twee keer een spreuk uitspreken op Arthur.
4. Laat Arthur één keer aanvallen op Merlijn en laat Arthur daarna een `levelUp()` uitvoeren.
5. Laat Merlijn een derde keer proberen een spreuk uit te spreken (dit moet nu mislukken wegens onvoldoende mana).
6. Toon de eindstatus van beide personages in de console met behulp van `toonStatus()`.

---

## Uitbreidingsopdracht (Differentiatie)

- **Getters & Setters:** Maak van `levenspunten` een privé-eigenschap (`#levenspunten`) in `Personage` en gebruik een `getter` en `setter` om te garanderen dat levenspunten nooit onder 0 ingesteld kunnen worden, zelfs niet wanneer iemand rechtstreeks `arthur.levenspunten = -50` probeert uit te voeren.
- **Klasse `Genezer`:** Voeg een derde subklasse `Genezer` toe met een methode `genees(doelwit)` waarmee hij de levenspunten van een ander personage kan herstellen.

---

## Modeloplossing (Voor de leerkracht)

```javascript
// Deel 1: Superklasse
class Personage {
  constructor(naam, levenspunten) {
    this.naam = naam;
    this.levenspunten = levenspunten;
    this.niveau = 1;
  }

  toonStatus() {
    return `${this.naam} (Niveau ${this.niveau}) - HP: ${this.levenspunten}`;
  }

  ontvangSchade(aantal) {
    this.levenspunten -= aantal;
    if (this.levenspunten < 0) {
      this.levenspunten = 0;
    }
    console.log(
      `${this.naam} krijgt ${aantal} schade en heeft nog ${this.levenspunten} HP over.`,
    );
  }

  levelUp() {
    this.niveau += 1;
    this.levenspunten += 20;
    console.log(`${this.naam} is gestegen naar niveau ${this.niveau}!`);
  }
}

// Deel 2: Subklasse Krijger
class Krijger extends Personage {
  constructor(naam, levenspunten, wapen) {
    super(naam, levenspunten);
    this.wapen = wapen;
  }

  valAan(doelwit) {
    console.log(`${this.naam} valt ${doelwit.naam} aan met ${this.wapen}!`);
    doelwit.ontvangSchade(15);
  }

  levelUp() {
    super.levelUp(); // Voert standaard levelUp uit (+1 niveau, +20 HP)
    this.levenspunten += 10; // Extra bonus voor de krijger
  }
}

// Deel 3: Subklasse Tovenaar
class Tovenaar extends Personage {
  constructor(naam, levenspunten, mana) {
    super(naam, levenspunten);
    this.mana = mana;
  }

  spreekSpreukUit(doelwit) {
    if (this.mana >= 10) {
      this.mana -= 10;
      console.log(
        `${this.naam} vuurt een vuurbal af op ${doelwit.naam}! (Resterende mana: ${this.mana})`,
      );
      doelwit.ontvangSchade(25);
    } else {
      console.log(
        `${this.naam} heeft onvoldoende mana om een spreuk uit te spreken!`,
      );
    }
  }
}

// Deel 4: Testscript
const arthur = new Krijger("Arthur", 100, "Excalibur");
const merlijn = new Tovenaar("Merlijn", 70, 25);

merlijn.spreekSpreukUit(arthur); // Arthur: 75 HP, Merlijn: 15 mana
merlijn.spreekSpreukUit(arthur); // Arthur: 50 HP, Merlijn: 5 mana

arthur.valAan(merlijn); // Merlijn: 55 HP
arthur.levelUp(); // Arthur: Niveau 2, 80 HP (50 + 20 + 10)

merlijn.spreekSpreukUit(arthur); // Mislukt (slechts 5 mana over)

console.log(arthur.toonStatus()); // Arthur (Niveau 2) - HP: 80
console.log(merlijn.toonStatus()); // Merlijn (Niveau 1) - HP: 55
```
