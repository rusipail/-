<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import Fa from "svelte-fa/src/fa.svelte";
  import {  
    faCaretDown,
    faBars,
    faHeart,
    faComment,
    faShare,
    faPowerOff
  } from "@fortawesome/free-solid-svg-icons/index.es";
  import { claim_space, loop_guard } from "svelte/internal";
  import type { Hash } from "./type";
  // export let hash:Hash;
  type Config = {
    day: "월" | "화" | "수" | "목" | "금",
    state: boolean,
    dishes: string[]
  }
  // let configs: Promise<Config[]> = Promise.resolve([])
  let configs
  let menus = ["","","","",""]
  const dish = ["0", "1", "2", "3", "4", "5"]
  const days = ["0", "1", "2", "3", "4"]
  const date = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let dates = [
    {
      day: 'Sunday',
      state: false ,
      menu: []
    },
    {
      day: 'Monday',
      state: false ,
      menu: []
    },
    {
      day: 'Tuesday',
      state: false ,
      menu: []
    },
    {
      day: 'Wednesday',
      state: false ,
      menu: []
    },{
      day: 'Thursday',
      state: false ,
      menu: []
    },
    {
      day: 'Friday',
      state: false ,
      menu: []
    },{
      day: 'Saturday',
      state: false ,
      menu: []
    }
  ]
  let Mon = ''
  let Tue = ''
  let Wed = ''
  let Thu = ''
  let Fri = ''
  const weeks = [
    false,
    false,
    false, 
    false, 
    false,
    false,
    false
  ]
  const week = [
    false,
    false,
    false, 
    false, 
    false,
  ]
  const checkingDay = (e) =>{
    for(let i = 0; i < week.length; i++){
      week[i] = false
      if(e.target.innerHTML === `${configs[i].day}`){
          week[i] = !week[i];
      }
    }
  }
  // async function menu() {
  //   let date = new Date()
  //   const res = await fetch(`https://open.neis.go.kr/hub/mealServiceDietInfo?Type=json&ATPT_OFCDC_SC_CODE=J10&SD_SCHUL_CODE=7781012&MLSV_FROM_YMD=${date.getFullYear()}${date.getMonth() + 1}${date.getDate() - date.getDay() + 1}&MLSV_TO_YMD=${date.getFullYear()}${date.getMonth() + 1}${date.getDate() - date.getDay() + 5}`);
  //   const data = await res.json();
  //   console.log(data)
  //   console.log(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() - date.getDay() + 1}`)
  //   let dayOfWeek = weeks[new Date(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() - date.getDay() + 1}`).getDay()];
  //   for(let i = 0; i < data.mealServiceDietInfo[1].row.length; i++){
  //     console.log(i)
  //     let date = data.mealServiceDietInfo[1].row[i].MLSV_YMD
  //     console.log(data.mealServiceDietInfo[1].row[i].MLSV_YMD)
  //     weeks[new Date(`${date.substring(0, 4)}-${date.substring(4, 6)}-${date.substring(6)}`).getDay()] = true
  //     if(weeks[i] === true){
  //       dates[i].state = true
  //       dates[i].menu.push(data.mealServiceDietInfo[1].row[i].DDISH_NM.split('<br/>').map(v => v.match(/[\u3131-\uD79D]/ugi).join('')))
  //       dates[i].menu = dates[i].menu
  //       console.log(dates[1].menu)
  //       console.log(data.mealServiceDietInfo[1].row[i].DDISH_NM.split('<br/>').map(v => v.match(/[\u3131-\uD79D]/ugi).join('')))
  //       //console창에 메뉴까지는 나오는데 그걸 다시 배열로 만드는 방법을 모르겠음
  //     }
      
  //   //   configs = [
  //   //   {
  //   //     day: "월",
  //   //     state: dates[1].state,
  //   //     dishes: dates[1].menu
  //   //   },
  //   //   {
  //   //     day: "화",
  //   //     state: dates[2].state,
  //   //     dishes: dates[2].menu
  //   //   },
  //   //   {
  //   //     day: "수",
  //   //     state: dates[3].state,
  //   //     dishes: dates[3].menu
  //   //   },
  //   //   {
  //   //     day: "목",
  //   //     state: dates[4].state,
  //   //     dishes: dates[4].menu
  //   //   },
  //   //   {
  //   //     day: "금",
  //   //     state: dates[5].state,
  //   //     dishes: dates[5].menu
  //   //   }
  //   // ]
  //   configs = [
  //     {
  //       day: "월",
  //       state: false,
  //       dishes: []
  //     },
  //     {
  //       day: "화",
  //       state: true,
  //       dishes: []
  //     },
  //     {
  //       day: "수",
  //       state: false,
  //       dishes: []
  //     },
  //     {
  //       day: "목",
  //       state: true,
  //       dishes: []
  //     },
  //     {
  //       day: "금",
  //       state: false,
  //       dishes: []
  //     }
  //   ]
  //     console.log(weeks)
  //   }
  //   console.log(week)
  //   // console.log(data.mealServiceDietInfo[1].row[4].MLSV_YMD == `${date.getFullYear()}${date.getMonth() + 1}${date.getDate() - date.getDay() + 8}` ? "쉬는 날" : "안 쉬는날")
  //   //쉬는날인지 안 쉬는 날인지 구하는 공식
  //   //그 주 월요일 구하는 공식 = date.getDate() - date.getDay() + 1
  //   //다음주 월요일 구하는 공식 = date.getDate() - date.getDay() + 8
  //   console.log(`${date.getMonth() + 1}월 ${date.getDate()}일`)
  //   console.log("fetch 값 : ", data);
  // }
  let a = new Promise(async(res, rej) => {
    let date = new Date()
    let result = await fetch(`https://open.neis.go.kr/hub/mealServiceDietInfo?Type=json&ATPT_OFCDC_SC_CODE=J10&SD_SCHUL_CODE=7781012&MLSV_FROM_YMD=${date.getFullYear()}${date.getMonth() + 1}${date.getDate() - date.getDay()}&MLSV_TO_YMD=${date.getFullYear()}${date.getMonth() + 1}${date.getDate() - date.getDay() + 5}`);
    const data = await result.json();
    console.log(data)
    console.log(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() - date.getDay() + 1}`)
    let dayOfWeek = weeks[new Date(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() - date.getDay() + 1}`).getDay()];
    for(let i = 0; i < data.mealServiceDietInfo[1].row.length; i++){
      console.log(i)
      let date = data.mealServiceDietInfo[1].row[i].MLSV_YMD
      console.log(data.mealServiceDietInfo[1].row[i].MLSV_YMD)
      weeks[new Date(`${date.substring(0, 4)}-${date.substring(4, 6)}-${date.substring(6)}`).getDay()] = true
      console.log(new Date(`${date.substring(0, 4)}-${date.substring(4, 6)}-${date.substring(6)}`).getDay());
      if(weeks[i] === true){
        dates[i].state = true
        dates[i].menu.push(data.mealServiceDietInfo[1].row[i].DDISH_NM.split('<br/>').map(v => v.match(/[\u3131-\uD79D]/ugi).join('')))
        dates[i].menu = dates[i].menu
        console.log(dates[1].menu)
        console.log(data.mealServiceDietInfo[1].row[i].DDISH_NM.split('<br/>').map(v => v.match(/[\u3131-\uD79D]/ugi).join('')))
      }else{
        console.log("안나옴")
      }
    }
      configs = [
      {
        day: "월",
        state: dates[1].state,
        dishes: dates[1].menu
      },
      {
        day: "화",
        state: dates[2].state,
        dishes: dates[2].menu
      },
      {
        day: "수",
        state: dates[3].state,
        dishes: dates[3].menu
      },
      {
        day: "목",
        state: dates[4].state,
        dishes: dates[4].menu
      },
      {
        day: "금",
        state: dates[5].state,
        dishes: dates[5].menu
      }
    ]

    res(configs)
    })
  // menu()
  </script>
  <main>
    {#await a}
      <div>plz wait</div>
    {:then a} 
      <div id="dishesContainer">
        <div id="title">점심메뉴</div>
        <table>
          <tr id="dayManageContainer">
            {#each configs as data}
              <td class="day" on:click={ checkingDay }>{data.day}</td>
            {/each}
          </tr>
          {#each days as dishes}
            <tr class="dishes{dishes} {week[dishes] ? "" : "dishes"}">
              <td colspan="5">
                <div class="weekDishes">
                  {#each dish as i} 
                    <div class="menu">{console.log(configs[dishes].dishes[i])}</div>
                  {/each}
                  {#each dish as i}
                    <div class="menu">{configs[dishes].dishes[i]}</div>
                  {/each}
                </div>
              </td>
            </tr>
          {/each}
        </table>
      </div>
    {/await}
  </main>
  <style lang="scss">
    $backgroundColor: rgb(28, 27, 31);
    $color: rgb(208, 188, 255);
    table{
      width: 100%;
      text-align: center;
      border-collapse: collapse;
    }
    .weekDishes{
      display: flex;
      height: 100%;
      // padding: { 
      //   top: 200px;
      //   bottom: 220px;
      // };
      border: 1px solid $color;
    }
    .menu{
      width: calc(100% / 6);
      border: 1px solid $color;
      padding: {
        top: 220px;
        bottom: 220px;
      };
    }
    #title{
      font-size: 30px;
      text-align: center;
      padding: {
        top: 45px;
        bottom: 45px;
      };
    }
    .dishes{
      display: none;
    }
    main{
      height: calc(100vh - 120px);
    }
    #dayManageContainer{
      width: 100%;
      // & + tr {
      //   td{

      //   }
      // }
    }
    .dishes0, .dishes1, .dishes2, .dishes3, .dishes4{
      // padding: {
      //   top: 30px;
      //   bottom: 30px;
      // };
      width: 100%;
      height: 480px;
    }
    .day{
      font-size: 20px;
      background-color: $color;
      width: calc(100% / 5);
      padding: {
        top: 31.5px;
        bottom: 31.5px;
      };
      border: 1px solid black;
    }
    #dishesContainer{
      border-collapse: collapse;
      width: 1400px;
      margin: auto;
      margin-top: 120px;
      background-color: white;
      height: 700px;
      border-radius: 8px;
    }
  </style>