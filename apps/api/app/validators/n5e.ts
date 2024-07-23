import vine from '@vinejs/vine'

export const createCharacterValidator = vine.compile(
  vine.object({
    name: vine.string().trim().optional(),
  })
)

const classSchema = vine.object({
  name: vine.string(),
  hitDie: vine.number(),
  chakraDie: vine.number(),
  level: vine.number(),
  subclass: vine.string().optional().nullable(),
})

const abilitySchema = vine.object({
  value: vine.number(),
  customBonus: vine.number().optional(),
})

const abilitiesSchema = vine.record(abilitySchema)

const savingThrowSchema = vine.record(
  vine.object({
    customBonus: vine.number().optional(),
    isProficient: vine.boolean(),
  })
)

const skillSchema = vine.object({
  name: vine.string(),
  isProficient: vine.boolean(),
  customBonus: vine.number().optional(),
  customAbility: vine.string().optional(),
})

const classModSchema = vine.object({
  name: vine.string(),
  level: vine.number(),
})

const jutsuCasting = vine.object({
  ability: vine.string(),
  customDCBonus: vine.number(),
  customAttackBonus: vine.number(),
})

const jutsuCastingRecord = vine.record(jutsuCasting)

const armorClassSchema = vine.object({
  ability: vine.string(),
  armorBonus: vine.number(),
  shieldBonus: vine.number(),
  customBonus: vine.number(),
})

const proficienciesSchema = vine.object({
  armor: vine.array(vine.string()),
  weapons: vine.array(vine.string()),
  tools: vine.array(vine.string()),
  kits: vine.array(vine.string()),
})

const bulkSchema = vine.object({
  customBonus: vine.number(),
  customMultiplier: vine.number(),
})

const infoSchema = vine.object({
  age: vine.number(),
  height: vine.string(),
  weight: vine.string(),
  size: vine.string(),
  gender: vine.string(),
  eyes: vine.string(),
  hair: vine.string(),
  skin: vine.string(),
  background: vine.string(),
  avatar: vine.string(),
  village: vine.string(),
  rank: vine.string(),
  isAnbu: vine.boolean(),
  isNukenin: vine.boolean(),
  titles: vine.array(vine.string()),
})

export const updateCharacterValidator = vine.compile(
  vine.object({
    name: vine.string().trim().optional(),
    clan: vine.string().trim().optional(),
    abilities: abilitiesSchema.clone().optional(),
    classes: vine.array(classSchema).optional().nullable(),
    classMod: classModSchema.optional().nullable(),
    skills: vine.array(skillSchema).optional(),
    savingThrows: savingThrowSchema.clone().optional(),
    background: vine.string().trim().optional(),
    level: vine.number().min(1).optional(),
    alignment: vine.string().trim().optional(),
    ryo: vine.number().min(0).optional(),
    customData: vine.record(vine.any()).optional(),
    customTabs: vine.record(vine.string()).optional(),
    resistances: vine.array(vine.string()).optional(),
    immunities: vine.array(vine.string()).optional(),
    jutsus: vine.array(vine.string()).optional(),
    feats: vine.array(vine.string()).optional(),
    // "fire" | "water" | "earth" | "wind" | "lightning"
    elementalAffinities: vine
      .array(vine.enum(['fire', 'water', 'earth', 'wind', 'lightning']))
      .optional(),
    jutsuCasting: jutsuCastingRecord.optional(),
    armorClass: armorClassSchema.clone().optional(),
    currentHp: vine.number().optional(),
    temporaryHp: vine.number().optional(),
    currentCp: vine.number().optional(),
    temporaryCp: vine.number().optional(),
    proficiencies: proficienciesSchema.optional(),
    bulk: bulkSchema.optional(),
    info: infoSchema.optional(),
  })
)
