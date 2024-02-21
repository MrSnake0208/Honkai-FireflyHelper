// NameConverter.ts
export const convertToChineseStatName = (statName: string): string => {
    const statNameMappings: Record<string, string> = {
      "hp": "生命值",
      "hp_": "生命值百分比",
      "atk": "攻击力",
      "atk_": "攻击力百分比",
      "def": "防御力",
      "def_": "防御力百分比",
      "spd": "速度",
      "critRate": "暴击率",
      "critDMG": "暴击伤害",
      "break": "击破特攻",
      "eff": "效果命中",
      "effRes": "效果抵抗",
      "heal": "治疗量加成",
      "enerRegen": "能量恢复率",
      "imaginaryDmg": "虚数属性伤害提高",
      "quantumDmg": "量子属性伤害提高",
      "windDmg": "风属性伤害提高",
      "lightningDmg": "雷属性伤害提高",
      "iceDmg": "冰属性伤害提高",
      "fireDmg": "火属性伤害提高",
      "physicalDmg": "物理属性伤害提高",
      // 添加更多属性名与对应的中文名映射
    };
  
    return statNameMappings[statName] || '未知属性';
  };
  