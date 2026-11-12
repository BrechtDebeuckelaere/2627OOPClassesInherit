_levenspunten = symbol();

class personage {
  constructor(naam, levenspunten) {
    this.naam = naam;
    this[_levenspunten] = levenspunten;
    this.niveau = 1;
  }

  toonStatus() {
    return `naam (${this.naam}) - HP (${this[levenspunten]})`;
  }

  ontvangSchade(aantal) {
    if (this[levenspunten] - aantal < 0) {
      this[levenspunten] = 0;
    } else {
      this[levenspunten] -= aantal;
    }

    console.log(this[levenspunten]);
  }

  levelUp() {
    //levelUp
    this.niveau += 1;
    this[levenspunten] += 20;
  }

  getLevenspunten() {
    //getter
    return this[levenspunten];
  }

  setLevenspunten(value) {
    if (value >= 0) {
      this[levenspunten] = value;
    } else {
      console.log("kan niet de levenspunten negatief maken!");
    }
  }
}

class krijger extends personage {
  constructor(naam, levenspunten, wapen) {
    super(naam, levenspunten);
    super.levelUp();
    this.wapen = wapen;
  }

  valAan(doelwit) {
    doelwit.ontvangSchade(15);
    console.log(`${this.naam} valt ${doelwit.naam} aan met ${this.wapen}.`);
  }

  levelUp() {
    this[levenspunten] += 10;
  }
}

class tovenaar extends personage {
  constructor(naam, levenspunten, mana) {
    super(naam, levenspunten);
    this.mana = mana;
  }
  spreekSpreukUit(doelwit) {
    if (mana >= 10) {
      doelwit.ontvangSchade(25);
      console.log(`${this.naam} vuurt een vuurbal af op ${doelwit.naam}!`);
    }
  }
}

Arthur = krijger("Arthur", 100, "Excalibur");
Merlijn = tovenaar("Merlijn", 70, 25);

Merlijn.spreekSprukUit(Arthur);
Merlijn.spreekSprukUit(Arthur);
Arthur.valAan(Merlijn);
Arthur.levelUP();
Merlijn.spreekSprukUit(Arthur);
console.log(Arthur.toonStatus(), Arthur.toonStatus());
