import {defineStore} from "pinia"


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
      }
})



