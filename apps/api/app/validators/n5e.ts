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
  })
)
