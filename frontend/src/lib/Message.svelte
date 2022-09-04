<script lang="ts">
    import { onMount } from 'svelte';
    import type { Hash } from './type';
    import Fa from "svelte-fa/src/fa.svelte";
    import {
      faPlus,
    } from "@fortawesome/free-solid-svg-icons/index.es";
    import troll from "../assets/troll.png"
    import QuestionMark from "../assets/Question_Mark.svg"
    import basic from "../assets/기본프사.jpg"
    export let hash:string;
    export let selectedUser;
    let memory = '';
    let messageInput = '';
    let find = '';
    let findmemory = '';
    const clicked = (e) =>{
      hash = `#message?name=${e}`
      selectedUser = e;
    }
    const changHash = (e) =>{
      for(let i = 0; i < mockData.length; i++){
        if(mockData[i].recipient === e){
          hash = `#message?name=${e}`;
          selectedUser = e;
          console.log(`?name=${e}`)
        }
        console.log(mockData[i].recipient)
      }
      if(selectedUser !== e){
        window.alert('입력하신 사용자를 찾지 못하였습니다')
      }
    }
    const check = (e) =>{
      if(e.key == "Enter"){
        memory = messageInput;
        messageInput = '';
        console.log(memory)
        memory = '';
      }
    }
    const finding = (e) =>{
      if(e.key == "Enter"){
        findmemory = find;
        find = '';
        console.log(findmemory);
        changHash(findmemory);
        findmemory = '';
      }
    }
    //============mock data
    const mockData = [{
      profile: troll,
      recipient: '방준현',
      lastMessage: 'dlwndks',
    },
    {
      profile: QuestionMark,
      recipient: '변동윤',
      lastMessage: '변동윤 대머리',
    },
    {
      QuestionMark: basic,
      recipient: '한결쌤',
      lastMessage: '쌤 이거 모르겠어요',
    }
  ]
  </script>
  
  <main>
    <div id="container">
      <div id="who">
        <div id="myName">
        leejuan20070601
        </div>
        <div>
          <input type="text" placeholder="찾을 사람을 입력하세요" id="findingPeople" bind:value={find} on:keypress= { finding }>
        </div>
        <div id="messageList">
          {#each mockData as data}
          <div class="people" on:click={ () => {clicked(data.recipient)} } id={data.recipient}>
            <span class="profile">
              <img src={data.profile} alt="" class="img">
            </span>
            <div class="nameMessage">
              <span class="name">
                {data.recipient}
              </span>
              <div class="lastMessage" >
                {data.lastMessage}
              </div>
            </div>
          </div>
          {/each}
        </div>
      </div>
      <div id="messageContainer">
        <div id="message"></div>
        <div id="inputContainer">
          <div id="input" >
            <!-- <textarea name="messageInput" id="messageInput" cols="30" rows="10" on:click={click} class={click ? "click" : ""}></textarea> -->
            <!-- <div contenteditable="true" id="messageInput" on:input={ check } ></div> -->
            <input type="text" id="messageInput" on:keypress={ check } bind:value={ messageInput } placeholder="메세지를 입력하세요.">
          </div>
        </div>
      </div>
      <div id="setting"></div>
    </div>
  </main>
  
  
  <style lang="scss">
    $backgroundColor: rgb(28, 27, 31);
    $color: rgb(208, 188, 255);
    $size: 17px;
    .img{
      width: 40px;
      height: 40px;
    }
    #findingPeople{
      width: 100%;
      height: 30px;
      background-color: $backgroundColor;
      border: 0;
      color: white;
    }
    #findingPeople:focus-visible{
      overflow: unset;
      outline: 0;
    }
    #container{
      width: 100vw;
      height: calc(100vh - 80px);
      display: flex;
      overflow: hidden;
    }
    #who{
      width: 18%;
      height: 100%;
      background-color: black;
    }
    .people{
      color: white;
      background-color: $backgroundColor;
      width: 100%;
      display: flex;
      box-sizing: border-box;
      // border: {
      //   top: 1px solid white;
      //   bottom: 1px solid white;
      // } 
      height: 80px;
      border-collapse: collapse;
      padding: {
        top: 10px;
        left: 10px;
      }
      margin: {
        bottom: 20px;
      }
      text-align: start;
    }
    .lastMessage{
      color: gray;
      padding: {
        top: 8px;
        left: 15px;
      }
    }
    #messageContainer{
      width: 82%;
      background-color: $color;
    }
    #inputContainer{
      bottom: 0;
      position: fixed;
      width: calc(82%);
      height: 60px;
      background-color: black;
      padding: {
        top: 8px;
      }
    }
    .profile{
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 60px;
      width:60px;
      border-radius: 100%;
      background-color: $color;
      margin-right: 0px;
    }
    .name{
      padding: {
        top: 5px;
        left: 15px;
      }
      font-size: $size;
    }
    #myName{
      width: 100%;
      height: 60px;
      color: white;
      text-align: center;
      padding: {
        top: 35px;
      }
    }
    #messageList{
      background-color: black;
      height: 80%;
      padding: {
        top: 20px;
      }
      width: 100%;
      margin: auto;
    }
    #input{
      display: flex;
      align-items: center;
      width: calc(100% - 17px);
      height: 40px;
      border-radius: 50px;
      background-color: $color;
      padding: {
        left: 17px
      };
    }
    #messageInput{
      width: 98%;
      background-color: $color;
      border: 0px;
      font-size: $size;
      &:focus-visible{
        outline-width: 0;
      }
    }
  </style>