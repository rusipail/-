<script lang="ts">
    import assets from '../../assets'
    import Fa from "svelte-fa/src/fa.svelte";
    import {
      faBars,
      faPowerOff
    } from "@fortawesome/free-solid-svg-icons/index.es";
    import type { Hash } from "../type";
    export let on;
    export let hash: string;
    export let selectedUser;
    let profile = false
    let d = ''
    d = hash;
    const blank = '';
    const profileClick = () =>{
      profile = !profile;
    }
  </script>
  <div>
    <div id="menubar" style="
      height: 80px;
      width: 100vw;
      background-color: rgb(28,27,31);
      display: flex;
    ">
      <div id="menu" on:click={() => {on = !on}} style="
      z-index: 3;
      padding: 15px;
      width: 30px;
      cursor: pointer;">
        <Fa icon={faBars} color="white" size="3x" />
      </div>
      <div id="currentPage" style="
        flex: auto;
        color: white;
        font-size: 24px;
        text-align: center;
        padding-top: 18px;">
          {#if hash == '#community'}
            <span><strong>community</strong></span>
          {:else if hash == '#menu'}
            <span><strong>menu</strong></span>
          {:else if hash == '#vote'}
            <span><strong>vote</strong></span>
          {/if}
        </div>
      <div id="profile" on:click={profileClick} class={profile ? "profileOn" : ""} style="
        cursor: pointer;
        width:100px;
        height:80px;"> 
        <svg id="profilePicture"
          aria-label="프로필"
          class="_ab6-" 
          color="#fafafa"
          fill="#fafafa"
          height="30"
          role="img" 
          viewBox="0 0 24 24"
          width="30"
          style="
          padding-top:15px;
          width:100px;"
          >
          <circle
          cx="12.004"
          cy="12.004"
          fill="none"
          r="10.5"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-miterlimit="10"
          stroke-width="2"
          />
          <path
          d="M18.793 20.014a6.08 6.08 0 00-1.778-2.447 3.991 3.991 0 00-2.386-.791H9.38a3.994 3.994 0 00-2.386.791 6.09 6.09 0 00-1.779 2.447"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-miterlimit="10"
          stroke-width="2"
          />
          <circle
          cx="12.006"
          cy="9.718"
          fill="none"
          r="4.109"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-miterlimit="10" 
          stroke-width="2"
          />
      </svg>
        <div id="username" style="color:white; text-align:center;">username</div>
      </div>
    </div>
    <div id="underbar" class={profile ? "profileOn" : ""} style="background-color: rgb(28,27,31);">
      <div id="underOption">
        <Fa 
          icon={ faPowerOff }
          color= red
          size="1x"
        />
        logout
      </div>
    </div>
  </div>
  <style lang="scss">
    $color:rgb(208, 188, 255);
    $backgroundColor: rgb(28, 27, 31);
    $size: 24px;
    #menubar {
      height: 80px;
      z-index: 2;
      background-color: $backgroundColor;
      display: flex;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      #currentPage {
        flex: auto;
        color: white;
        font-size: $size;
        text-align: center;
        padding-top: 18px;
      }
      #menu {
        z-index: 3;
        padding: 15px;
        width: 30px;
        cursor: pointer;
      }
      #profile {
        cursor: pointer;
        #profilePicture{
          width: 100px;
          padding: {
            top: 15px;
          }
        }
      }
    }
    #username{
      color: white;
      text-align: center;
    } 
    #underbar {
      position: fixed;
      top: 80px;
      left: calc(100% - 130px);
      transform: translateY(-100%);
      transition: all 0.5s;
      display: inline-block;
      background-color: $backgroundColor;
      width: 130px;
      height: 50px;
      text-align: center;
      z-index: 1;
    } 
    #underbar.profileOn{
      transform: translateY(0%);
      transition: all 0.3s; 
    }
    #underOption{
      font-size: 20px;
      padding: 7px;
      color: red;
      text-align: center;
      cursor: pointer;
    }
  </style>