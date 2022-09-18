<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import Message from "./lib/message/Message.svelte";
  import Community from "./lib/Community.svelte";
  import Schedule from "./lib/Schedule.svelte";
  import Menubar from "./lib/common/Menubar.svelte";
  import Sidebar from "./lib/common/Sidebar.svelte";
  import { hashArr } from './lib/type';
  import type { Hash } from "./lib/type";
  let on:boolean = false;
  let hash: string;
  let flag = false;
  let upload = false;
  let selectedUser = null;
  const show = () => {
    on = !on;
  };
  const clicked = () =>{
    upload = false;
  }
  const hashchange = () => {
    if(!hashArr.includes(location.hash as Hash)) {
      location.hash = hash;
      return;
    }
    hash = location.hash as Hash;
  }
  
  onMount(() => (flag = true));
  $: {
    if (flag) location.hash = hash;
    if(hash == undefined) location.hash = "#community"
  }

</script>
<svelte:window on:hashchange={hashchange}></svelte:window>
<main>
  <div id="container">
    <Menubar bind:on bind:hash bind:selectedUser/>
    <div id="body" class="temp">
      <Sidebar bind:on bind:hash bind:selectedUser/>
      {#if hash && hash.includes("#message")}
        <Message bind:hash bind:selectedUser/>
      {:else if hash === "#schedule"}
        <Schedule/>  
      {:else if hash === "#community"}
        <Community bind:hash bind:upload/>
      {/if}
    </div>
  </div>
</main>
<div class="blind{on ? "" : "hidden"}"on:click={show}/>
<div class="blind {upload ? "" : "hidden"}" on:click={clicked}></div>

<style lang="scss">
  @import url("https://fonts.googleapis.com/css2?family=Gentium+Book+Plus&family=Lato:wght@300&family=Roboto:ital,wght@1,100&display=swap");
  $backgroundColor: rgb(28, 27, 31);
  $color: rgb(208, 188, 255);
  $size: 24px;
  
  .blind {
    display: inline-block;
    position: fixed;
    inset: 0;
    background-color: rgba($color: #000000, $alpha: 0.5);
    z-index: 2;
  }
  .blind.hidden {
    display: none;
  }

  .temp {
    margin-top: 80px;
  }
  
  :global(body) {
    margin: 0;
    background-color: rgb(37, 36, 36);
  }
</style>
