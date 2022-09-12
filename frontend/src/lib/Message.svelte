<script lang="ts">
    import { onMount } from 'svelte';
    import type { Hash } from './type';
    import Fa from "svelte-fa/src/fa.svelte";
    import {
      faPlus, faChevronLeft, faChevronRight
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
    let peoplestate = true;
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
    const peopleToggle = () =>{
      peoplestate = !peoplestate
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
      <div id="who" class={ peoplestate ? "" : "hidden"}>
        <div id="peopleOpenButton" on:click={ peopleToggle } class={ peoplestate ? "" : "open"}>
          <Fa
            icon={ faChevronRight }
            color="white"
            size="2x"
          />
        </div>
        <div id="peopleCloseButton" on:click={ peopleToggle }>
          <Fa
            icon={ faChevronLeft }
            color="white"
            size="2x"
          />
        </div>
        <div id="myName">
        leejuan20070601
        </div>
        <div>
          <input type="text" autocomplete="off" placeholder="찾을 사람을 입력하세요" id="findingPeople" bind:value={find} on:keypress= { finding }>
        </div>
        <div id="messageList">
          {#each mockData as data}
          <div class="people { selectedUser === data ? "select" : ""}" on:click={ () => {clicked(data.recipient)} } id={data.recipient}>
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
      <div id="messageToolContainer" class={ peoplestate ? "" : "open"}>
        <div id="messageContainer">
          
          <span class="myMessage">
            안녕
          </span>
          <span class="receptionMessage">
            안녕!  
          </span>
        </div>
        <div id="message"></div>
        <div id="inputContainer" class={ peoplestate ? "" : "open"}>
          <div id="input" >
            <!-- <textarea name="messageInput" id="messageInput" cols="30" rows="1" on:keypress={ check }></textarea> -->
            <!-- <div contenteditable="true" id="messageInput" on:input={ check } ></div> -->
            <input type="text" id="messageInput" on:keypress={ check } bind:value={ messageInput } placeholder="메세지를 입력하세요." maxlength="98">
          </div>
        </div>
      </div>
      <div id="setting"></div>
    </div>
  </main>
  
  
  <style lang="scss">
    $backgroundColor: rgb(28, 27, 31);
    $color: rgb(208, 188, 255);
    $color2: rgb(176, 139, 255);
    $size: 17px;
    #peopleCloseButton{
      width: 40px;
      height: 50px;
      position: relative;
      left: calc(100% - 25px);
    }
    #peopleOpenButton{
      z-index: -1;
      position: absolute;
      background-color: $backgroundColor;
      width: 50px;
      height: 40px;
      left: 0px;
      text-align: center;
      padding: {
        top: 8px
      };
    }
    #peopleOpenButton.open{
      z-index: 1;
      position: absolute;
      background-color: $backgroundColor;
      width: 50px;
      height: 40px;
      left: 0px;
      text-align: center;
      padding: {
        top: 8px
      };
    }
    .myMessage{
      position: absolute;
      right: 20px;
      bottom: 10%;
      background-color: $color;
      border-radius: 20px;
      padding: {
        left: 10px;
        top: 5px;
        bottom: 5px;
        right: 10px;
      };
    }
    .receptionMessage{
      position: absolute;
      bottom: calc(11%);
      background-color: $color2;
      border-radius: 20px;
      padding: {
        left: 10px;
        top: 5px;
        bottom: 5px;
        right: 10px;
      };
    }
    .img{
      width: 40px;
      height: 40px;
    }
    #findingPeople{
      width: calc(100% - 5px);
      height: 30px;
      background-color: rgb(37, 36, 36);
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
      background-color: $backgroundColor;
    }
    .people{
      color: white;
      background-color: rgb(37, 36, 36);
      width: calc(100% - 1px);
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
    #messageToolContainer{
      width: 82%;
      background-color: rgb(40, 40, 40);
    }
    #messageToolContainer.open{
      width: 100%;
      background-color: rgb(40, 40, 40);
    }
    #inputContainer{
      bottom: 0;
      position: fixed;
      width: calc(82%);
      height: 60px;
      background-color: $backgroundColor;
      padding: {
        top: 8px;
      }
    }
    #inputContainer.open{
      width: 100%;
      bottom: 0;
      position: fixed;
      height: 60px;
      background-color: $backgroundColor;
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
      font-size: 24px;
      padding: {
        top: 35px;
      }
    }
    #messageList{
      background-color: $backgroundColor;
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
      max-width: 98%;
      width: 98%;
      background-color: $color;
      border: 0px;
      font-size: $size;
      &:focus-visible{
        outline-width: 0;
      }
    }
    #container > .hidden{
      width: 0%;
    }
    .select{
      background-color: rgb(87, 87, 80);
    }
    .people:hover{
      border: 1px solid white;
    }
  </style>