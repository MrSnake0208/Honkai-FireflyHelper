import {defineStore} from "pinia"

export const useScoreRuleStore =defineStore("scorerule",{
    state(){
        return{
            scorerule:JSON.parse(localStorage.getItem("scorerule") as string) || []
        }
    }
})