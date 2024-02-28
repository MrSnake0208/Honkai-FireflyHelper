// ValueConverter.ts
export const convertValue = (statName: string, value: number): string => {
    if (statName === 'hp_' || statName === 'atk_'|| statName === 'def_'|| statName === 'critRate'|| statName === 'critDMG' || statName === 'break'|| statName === 'enerRegen'|| statName === 'heal' || statName === 'eff' || statName === 'effRes'|| statName === 'imaginaryDmg'|| statName === 'quantumDmg'|| statName === 'windDmg'|| statName === 'lightningDmg'|| statName === 'iceDmg'|| statName === 'fireDmg'|| statName === 'physicalDmg') {
        // 如果是 'hp_'，返回值乘以 100，并带上 %
        return `${(value * 100).toFixed(1)}%`;
    }

    // 如果不是 'hp_'，直接返回原始值，并带上 %
    return `${value}`;
};
