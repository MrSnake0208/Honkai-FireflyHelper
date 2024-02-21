
export type RelicPosition = "head" | "hands" | "body" | "feet" | "planarSphere" | "linkRope"

export type RelicSetName = string


export type RelicStatName = "hp" | "hp_" | "atk" | "atk_" | "def_value" | "def_" | "spd" | "crit_rate" | "crit_dmg" | "break_" | "eff" | "eff_res" | "heal" | "ener_regen" | "imaginary_dmg" | "quantum_dmg" | "wind_dmg" | "lightning_dmg" | "ice_dmg" | "fire_dmg" | "physical_dmg"
export type RelicNormalStatName = 'hp' | 'hp_' | 'atk' | 'atk_' | 'def_' | 'spd' | 'critRate' | 'critDMG' | 'break' | 'eff' | 'def' | 'effRes'

export interface IRelicTag {
    name: RelicStatName,
    value: number,
    powerup: number,
    score: number,
    entries: number
}

export interface IRelicContentOnly {
    setName: string,
    position: RelicPosition,
    star: number,
    mainTag: IRelicTag,
    normalTags: IRelicTag[],
    level: number,
    omit: boolean,
    equip: null,
}