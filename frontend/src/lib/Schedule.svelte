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
    import { claim_space } from "svelte/internal";
    import type { Hash } from "./type";
  // export let hash:Hash;
  const dish = ["0", "1", "2", "3", "4", "5"]
  const days = ["0", "1", "2", "3", "4"]
  const week = [
    false,
    false, 
    false, 
    false, 
    false
  ]
  let Mon = false;
  let Tue = false;
  let Wed = false;
  let Thu = false;
  let Fri = false;
  const checkingDay = (e) =>{
    for(let i = 0; i < week.length; i++){
      week[i] = false
      if(e.target.innerHTML === `${configs[i].day}`){
          week[i] = !week[i];
      }
    }
  }
  type Config = {
    day: "월" | "화" | "수" | "목" | "금",
    dishes: string[]
  }
    const configs: Config[] = [
      {
        day: "월",
        dishes: ["잡곡밥", "김치", "돈가스", "돈가스 소스", "콩나물", "된장국"]
      },
      {
        day: "화",
        dishes: ["흰쌀밥", "열무김치", "부대찌게", "볶음밥", "파스타", "햄버거"]
      },
      {
        day: "수",
        dishes: ["짜장면", "짬뽕", "탕수육", "깐풍기", "깐쇼새우", "단무지"]
      },
      {
        day: "목",
        dishes: ["똠얌꿍", "불고기", "초밥", "마라탕", "피시엔칩스", "딸기"]
      },
      {
        day: "금",
        dishes: ["복숭아", "버섯탕수육", "하와이안피자", "민트초코스파게티", "비건버거", "귀뚜라미 볶음"]
      }
    ]
  </script>
  <main>
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
                  <div class="menu">{configs[dishes].dishes[i]}</div>
                {/each}
              </div>
            </td>
          </tr>
        {/each}
      </table>
    </div>
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
    .dishes1{

    }
    .dishes2{

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