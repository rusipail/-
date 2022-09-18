<script lang="ts">
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";
    import Fa from "svelte-fa/src/fa.svelte";
    import {
      faCaretDown,
      faSolid,
      faBars,
      faHeart,
      faComment,
      faShare,
      faPowerOff
    } from "@fortawesome/free-solid-svg-icons/index.es";
  import { claim_space } from "svelte/internal";
  import type { Hash } from "./type";
  // export let hash:Hash;
  const classes = ["0", "1", "2", "3", "4", "5", "6"]
  const days = ["0", "1", "2", "3", "4"]
  type Config = {
    day: "월" | "화" | "수" | "목" | "금",
    class: string[]
  }
    const configs: Config[] = [
      {
        day: "월",
        class: ["국어", "수학", "과학", "사회", "중국어", "기가", ""]
      },
      {
        day: "화",
        class: ["수학", "체육", "기가", "과학", "국어", "영어", "역사"]
      },
      {
        day: "수",
        class: ["과학", "역사", "국어", "중국어", "수학", "영어", "",]
      },
      {
        day: "목",
        class: ["영어", "기가", "과학", "체육", "수학", "국어", "스클"]
      },
      {
        day: "금",
        class: ["자율", "미술", "미술", "스클", "영어", "사회", ""]
      }
    ]
  </script>
  <main>
    <!-- <div id="scheduleContainer"> -->
      <table id="scheduleContainer">
        <tr>
          <th class="days c0"></th>
          {#each days as day}
            <th class="days c{Number(day) + 1} title">{configs[day].day}요일</th>
          {/each}
        </tr>
        {#each classes as classes}
          <tr class="">
            <th class="days classes {classes !== "6" ? "underBorder" : ""} title">
              {Number(classes) + 1}교시
            </th>
            {#each days as day}
              <td class="days {classes !== "6" ? "underBorder" : ""} subject">
                {configs[day].class[classes]}
              </td>
            {/each}
          </tr>
        {/each}
      </table>
      <!-- <div id="classContainer">
        <div id="none"></div>
        {#each classes as c}
          <div id="c{Number(c) + 1}">{(Number(c) + 1)}교시</div>
        {/each}
      </div>
      <div id="dateContainer">
        {#each configs as config}
          <div class="configContainer">
            <div class="date">{ config.day }</div>
            {#each config.class as _class}
              <div class={`${_class === '' ? '' : 'classes'}`}>
                {
                  _class
                }
              </div>
            {/each}
          </div>
        {/each}
      </div> -->
    <!-- </div> -->
    
  </main>
  <style lang="scss">
    $backgroundColor: rgb(28, 27, 31);
    $color: rgb(208, 188, 255);
    .subject{
      font-size: 18px;
    }
    .underBorder{
      border-bottom: 1px dotted black;
    }
    .title{
      font-size: 22px;
    }
    .days{
      text-align: center;
      width: calc(100% / 6);
      // border-collapse: collapse;
      box-sizing: border-box;
    }
    .classes{
      // border-top: 1px solid black;
      border-right: 1px solid black;
    }
    #월7, #수7, #금7{
      background-color: transparent;
    }
    .configContainer{
      width: calc(100% / 5 - 2px);
      text-align: center;
      line-height: calc(500% - 16px);
      margin: {
        left: 3%;
        right: 3%;
      };
      // border: 1px solid black;
    }
    main{
      height: calc(100vh - 60px);
      margin: {
        top: 60px;
      }
      
    }
    #scheduleContainer{
      border-collapse: collapse;
      width: 70%;
      margin: auto;
      background-color: white;
      height: 80%;
      margin-top: 5%;
      // display: flex;
    }
    #dateContainer{
      width: 100%;
      // min-width: 500px;
      height: calc(100%);
      // border: 1px solid black; 
      display: flex;
      // margin: {
      //   top: 5px;
      // }
    }
    .date{
      height: calc(100% / 8 - 25px);
      background-color: rgb(176, 139, 255);
      margin: {
        top: 10%;
        bottom: 10%;
      };
      border-radius: 10px;
    }
    .c0{
      color: transparent;
      // background-color: $color;
      margin: auto;
      margin: {
        top: 10%;
        bottom: 10%;
      };
    }
    #classContainer{
      width: 20%;
      height: 100%;
      // border: 1px solid black;
      // display: flex;
    }
    .c0, .c1, .c2, .c3, .c4, .c5{
      border-bottom: 1px solid black;
    }
    
  </style>