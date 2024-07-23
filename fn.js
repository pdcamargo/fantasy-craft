const fs = require("fs");

const json = fs.readFileSync("./class-feature.json", "utf8");

const data = JSON.parse(json);

/*
current structure
{
    "clan": "Aburame Clan",
    "title": "Ability Score Increase (Aburame)",
    "details": "+2 Intelligence, +1 Wisdom"
}

want:
{
  "Aburame Clan": [{
    "title": "Ability Score Increase",
    "details": "+2 Intelligence, +1 Wisdom"
  }, ... any other features for this clan, the same for other clans]
}
*/

const result = data.reduce((acc, item) => {
  if (!acc[item.clan]) {
    acc[item.clan] = {
      abilityBonus: {
        Strength: 0,
        Dexterity: 0,
        Constitution: 0,
        Intelligence: 0,
        Wisdom: 0,
        Charisma: 0,
      },
      features: [],
    };
  }

  acc[item.clan].features.push({
    title: item.title,
    details: item.details,
  });

  return acc;
}, {});

fs.writeFileSync(
  "./class-feature-organized.json",
  JSON.stringify(result, null, 2),
);
