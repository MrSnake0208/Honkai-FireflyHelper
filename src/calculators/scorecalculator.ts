import { useScoreRuleStore } from '@/stores/scorerule'
import { storeToRefs } from 'pinia'


const essCoefficient = {
    hp: 0.153 * 0.5,
    hp_: 1.5 * 100,
    atk: 0.3 * 0.5,
    atk_:1.5 * 100,
    def: 0.3 * 0.5,
    def_: 1.19 * 100,
    spd: 2.53,
    critRate: 2*100,
    critDMG: 1*100,
    Dmg: 1*100,
    break: 1*100,
    enerRegen: 1*100,
    heal: 1*100,
    eff: 1.49*100,
    effRes: 1.49*100
}
export const calScore =(stat:any,name:any,position:any,level:any, isMain:boolean) =>{
    const scoreruleStore = useScoreRuleStore()
    const scorerules = storeToRefs(scoreruleStore).scorerule
    // console.log(position)
    if (isMain){
        if (["head", "hands"].includes(position)) {
            return 0
        } else if (["body", "planarSphere"].includes(position)) {
            if(scorerules.value[name][stat.name] === 0 ){
                return 0
            }
            else{
                return Math.round((0.66 * level +5.83*scorerules.value[name][stat.name])*100) / 100
            }

        } else {
            return Math.round((5.83*scorerules.value[name][stat.name])*100) / 100
        }
    }
    // console.log(scorerules.value[name])
    // console.log(Math.round(scorerules.value[name][stat.name]*stat.value))

    return Math.round(scorerules.value[name][stat.name]*stat.value*essCoefficient[stat.name]*100)/100
}