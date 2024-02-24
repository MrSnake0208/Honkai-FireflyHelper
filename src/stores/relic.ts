import {defineStore} from "pinia"
import { calScore } from '@/calculators/scorecalculator'

export const useRelicStore =defineStore("relic",{
    state(){
        return{
            relicList:JSON.parse(localStorage.getItem("relicList") as string) || [],
            selectedSetNames: [],
            selectedMaintagNames: [],
            selectedTab: "head",
            selectedScoreRule: "Herta"
        }
    },
    getters: {
        filteredRelics(state) {
            const tab = state.selectedTab;
            const selectedTabRelics = state.relicList[tab] || [];
          return selectedTabRelics.filter((relic) => {
            const meetsCondition =
              (this.selectedSetNames.length === 0 || this.selectedSetNames.includes(relic.setName)) &&
              (this.selectedMaintagNames.length === 0 || this.selectedMaintagNames.includes(relic.mainTag.name));
            return meetsCondition;
          });
        },
        // caledRelics(){
        //     this.filteredRelics.forEach(element => {
        //         // const sum = 0
        //         element.mainTag.score = calScore(element.mainTag,this.selectedScoreRule)
        //         // sum += element.mainTag.score
        //         element.normalTags.forEach(normaltag =>{
        //             normaltag.score = calScore(normaltag,this.selectedScoreRule)
        //             // sum +=normaltag.score
        //         })
        //         // element.sumScore = sum
        //     });
        //     return filteredRelics

        // }
      }
})