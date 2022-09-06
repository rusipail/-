<script lang="ts">
    import { onMount } from "svelte";
    import type { Hash } from "./type";
    export let on:boolean;
    export let hash:string;
    export let selectedUser;
    const sidebarClick = e =>{
      if(e.target.classList.contains("option")){
        if(e.target.innerHTML === "community"){
          hash = "#community";
          on = false
          selectedUser = null;
        } else if(e.target.innerHTML === "message"){
          hash = "#message";
          on = false
          selectedUser = null;
        } else if(e.target.innerHTML === "schedule"){
          hash = "#schedule";
          on = false
          selectedUser = null;
        }
      }
    }
  </script>
  <main>
    <div id="sidebar" class={on ? "open" : ""} on:click={sidebarClick}>
      <div class="option ">
        community
      </div>
      <div class="option">
        message
      </div>
      <div class="option">
        schedule
      </div>
    </div>
  </main>
  <style lang="scss">
    @import url("https://fonts.googleapis.com/css2?family=Gentium+Book+Plus&family=Lato:wght@300&family=Roboto:ital,wght@1,100&display=swap");
    $backgroundColor: rgb(28, 27, 31);
    $color: rgb(208, 188, 255);
    $size: 24px;
    #sidebar {
      left: 0;
      // transform: translateX(-100%);
      height: 100vh;
      transition: all 0.3s;
      background-color: $backgroundColor;
      position: fixed;
      top: 80px;
      left: -100%;
      display: inline-block;
      z-index: 3;
      .option {
        z-index: 3;
        color: white;
        font-size: 24px;
        transition: all 0.3s;
        width: calc(100% - 40px);
        line-height: calc(380% - 24px);
        text-align: center;
        height: 8%;
        padding: {
          top: 20px;
          left: 20px;
          right: 20px;
          bottom: 20px;
        };
        .select {
          border: 1px solid white;
          z-index: 3;
        }
      }
    }
    #sidebar.open{
      // transform: translateX(0%);
      left: 0;
      transition: all 0.3s;
    }
    .select{
      background-color: rgb(87, 87, 80);
    }
  </style>