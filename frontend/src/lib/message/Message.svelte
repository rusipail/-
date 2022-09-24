<script lang="ts">
    import { onMount } from 'svelte';
    import type { Hash } from '../type';
    import {messageMockData} from '../../mock'

    import TestSocket from './Test.svelte'

    export let hash:string;
    export let selectedUser;

    let memory = '';
    let messageInput = '';
    let searchUser = '';

    let copiedUserList = JSON.parse(JSON.stringify(messageMockData))

    $: {
      // copiedUserList = copiedUserList.filter(v => v.recipient.includes(searchUser))
      // if(!searchUser) copiedUserList = JSON.parse(JSON.stringify(messageMockData))
    }

    const clicked = (name: string) =>{
      hash = `#message?name=${name}`
      selectedUser = name;
    }
    // const changHash = (e) =>{
    //   for(let i = 0; i < commentMockData.length; i++){
    //     if(commentMockData[i].recipient === e){
    //       hash = `#message?name=${e}`;
    //       selectedUser = e;
    //       console.log(`?name=${e}`)
    //     }
    //     console.log(commentMockData[i].recipient)
    //   }
    //   if(selectedUser !== e){
    //     window.alert('입력하신 사용자를 찾지 못하였습니다')
    //   }
    // }
    const check = (e) =>{
      if(e.key == "Enter"){
        // memory = messageInput;
        // messageInput = '';
        // console.log(memory)
        // memory = '';
      }
    }
    const finding = (e) =>{
      if(e.key == "Enter"){
        searchUser = '';
        // changHash(findmemory);
      }
    }
  </script>
  
  <main>
    <div id="container">
      <div id="who">
        <div id="myName">이주안</div>
        <div>
          <input type="text" autocomplete="off" placeholder="찾을 사람을 입력하세요" maxlength="20" id="findingPeople" bind:value={searchUser} on:keypress= { finding }>
        </div>
        <div id="messageList">
          {#each copiedUserList as data}
            <div class="people { selectedUser === data.recipient ? "select" : ""}" on:click={ () => {clicked(data.recipient)} } id={data.recipient}>
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

      <div id="messageToolContainer">
        <div id="message">
          {#each messageMockData as data}
            {#if data.recipient === data.recipient}
              {#each data.Messages as messages}
                {#if messages.who === "recipient"}
                <div class="receptionData">
                  <span class="receptionMessage">
                    {messages.message}
                  </span>
                  <span class="receptionTime">
                    {messages.time}
                  </span>
                </div>
                {:else if messages.who === "me"}
                <div class="myData">
                  <span class="myTime">
                    {messages.time}
                  </span>
                  <span class="myMessage">
                    {messages.message}
                  </span>
                </div>
                {/if}
              {/each}
            {/if}
          {/each}
        </div>
        <div id="inputContainer">
          <input 
            type="text" 
            id="messageInput" 
            placeholder="메세지를 입력하세요."
            on:keypress={ check } 
            bind:value={ messageInput } 
          /> 
        </div>
      </div>
      <div id="setting"></div>
    </div>

    <div>
      <!-- <TestSocket /> -->
      <h1>HI</h1>
    </div>
  </main>
  
  
  <style lang="scss">
    $backgroundColor: rgb(28, 27, 31);
    $color: rgb(208, 188, 255);
    $color2: rgb(176, 139, 255);
    $size: 17px;
    #messageContainer{
      height: 90%;
    }
    .receptionTime, .myTime{
      display: none;
      color: white;
      font-size: 10px;
      line-height: 3.4;
    }
    .receptionMessage:hover + .receptionTime{
      display: inline;
    }
    .myMessage:hover + .myTime{
      display: inline;
    }
    .receptionData{
      display: flex;
    }
    .myData{
      display: flex;
    }
    .myMessage{
      display: flex;
      margin-left: auto;
      bottom: 10%;
      background-color: $color;
      border-radius: 20px;
      padding: {
        left: 10px;
        top: 5px;
        bottom: 5px;
        right: 10px;
      };
      font-size: 18px;
    }
    .receptionMessage{
      background-color: $color2;
      border-radius: 20px;
      padding: {
        left: 10px;
        top: 5px;
        bottom: 5px;
        right: 10px;
      };
      font-size: 18px;
    }
    .img{
      width: auto;
      height: auto;
      max-width: 45px;
    }
    input#findingPeople{
      width: calc(100% - 5px);
      background-color: rgb(37, 36, 36);
      border: {
        bottom: 2px groove white;
      };
      color: white;
      padding: 20px 5px;
      font-size: 18px;
    }
    input#findingPeople:focus-visible{
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
      width: 240px;
      height: 100%;
      background-color: $backgroundColor;
    }
    .people{
      color: white;
      background-color: rgb(37, 36, 36);
      display: flex;
      align-items: center;
      cursor: pointer;
      height: 80px;
      padding: {
        left: 5px;
        top: 10px;
        bottom: 10px;
      };
      border: {
        bottom: 1px solid white;
      }
      transition: all .2s;
      &:hover {
        background-color: rgb(47, 47, 42);
      }
    }
    .lastMessage{
      color: gray;
      padding: {
        top: 8px;
        left: 15px;
      }
    }
    #messageToolContainer{
      width: calc(100vw - 240px);
      background-color: rgb(40, 40, 40);
      padding: 8px;
    }
    #inputContainer{
      position: fixed;
      left: 244px;
      right: 4px;
      bottom: 0;

      input#messageInput{
        width: 99%;
        padding: 20px 5px;
        background-color: $backgroundColor;
        border: none;
        font-size: $size;
        border-radius: 20px;
        color: white;
        &:focus-visible{
          outline-width: 0;
        }
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
      color: white;
      text-align: center;
      font-size: 24px;
      padding: 20px 0;
    }
    #messageList{
      background-color: $backgroundColor;
      width: 100%;
      max-height: 80%;
    }
    #container > .hidden{
      width: 0%;  
    }
    .select{
      background-color: rgba(0, 0, 0, .5);
    }
  </style>