<script lang="ts">
  import { faPlus, faCircleXmark } from '@fortawesome/free-solid-svg-icons/index.es'
  import Fa from 'svelte-fa/src/fa.svelte'

  export let upload:boolean = false;
  export let hash:string
  let title:string = '';
  let wrapper1:string = '';
  let wrapper2:string = '';
  let flag = false;
  

  const toggleUpload = () => {
      upload = !upload
      if(upload == false){
        wrapper1 = '';
        wrapper2 = '';
      }
  }
  const uploading = () => {
    toggleUpload();
  };
  $: {
    if (flag) location.hash = hash;
  }
</script>
<main>
  <div id="upload" class={upload ? "" : "hidden"}>
    <div id="uploadContainer">
      <div id="uploadHeader">
        투표 올리기
        <span id="uploadClose" on:click={toggleUpload}>
          <Fa icon={faCircleXmark} color="white" size="1.5x" />
        </span>
      </div>
    </div>
    <div id="votingSystem">
      <input
          type="string"
          placeholder="투표 제목을 입력해주세요"
          id="vote-title"
          bind:value={title}
          autocomplete="off"
        />
      <div id="candidateContainer">
        <input
          type="string"
          placeholder="후보1을 입력해주세요"
          class="vote-candidate"
          bind:value={wrapper1}
          autocomplete="off"
        />
        <input
          type="string"
          placeholder="후보2를 입력해주세요"
          class="vote-candidate"
          bind:value={wrapper2}
          autocomplete="off"
        />
      </div>
    </div>
    <div id="uploadingButton" on:click={uploading}>게시하기</div>
  </div>

  <div id="postbar">
    <div id="custombar">
      <div id="uploading" on:click={toggleUpload}>
        <Fa
          icon={ faPlus }
          color="white"
          size="4x"
          id="plus"
        />
      </div>
    </div>
  </div>


</main>
<style lang="scss">
  $size: 24px;
  $backgroundColor: rgb(27, 26, 26);
  $color: rgb(208, 188, 255);
  #candidateContainer{
    
  }
  #vote-title{
    width: calc(98% + 1px);
    padding: {
      top: 20px;
      bottom: 20px;
    };
    color: white;
    background-color: $backgroundColor;
    border: {
      top: 1px solid $color;
      left: 0;
      right: 0;
      bottom: 1px solid $color;
    };
    font-size: 20px;
  }
  #vote-title:focus-visible{
    outline-offset: 0px;
    outline: 0;
  }
  #votingSystem{
    height: 470px;
    padding: {
      left: 10px;
    };
  }
  #upload {
    position: fixed;
    width: 600px;
    height: 600px;
    margin: auto;
    z-index: 6;
    inset: 0;
    border: 1px solid $backgroundColor;
    background-color: $backgroundColor;
    border-radius: 20px;
  }
  #upload.hidden {
    display: none;
  }
  #uploadContainer {
    width: 100%;
    height: 10%;
    display: flex;

    #uploadHeader {
      padding: {
        top: 15px;
      }
      width: 100%;
      color: white;
      text-align: center;
      font-size: 24px;
    }
    #uploadClose {
      cursor: pointer;
      position: relative;
      left: 30%;
    }
  }
  #uploading {
      width: 60px;
      height: 60px;
      border: 1px solid $backgroundColor;
      border-radius: 100%;
      justify-content: center;
      cursor: pointer;
      padding: {
        left: 3px;
        bottom: 3px;
      }

      margin: auto;
      background-color: $color;
  }
  #postbar {
    max-width: 800px;
    margin: auto;
  }
  #custombar {
    width: 100%;
    padding: 10px 0;
    border: 1px solid gray;
    margin-top: 100px;
    border-radius: 15px;
    background-color: $backgroundColor;
    transition: all 0.2s;

    &:hover {
      opacity: 0.8;
      cursor: pointer;
    }
  }
  .vote-candidate {
    width: calc(98% + 1px);
    padding: {
      top: 15px;
      bottom: 15px;
    };
    border: {
      top: 0;
      left: 0;
      right: 0;
      bottom: 1px solid $color;
    };
    font-size: 16px;
    background-color: $backgroundColor;
    color: white;
  }
  .vote-candidate:focus-visible {
    outline-offset: 0px;
    outline: 0;
  }
  #uploadingButton {
    cursor: pointer;
    width: 100%;
    padding: 10px 0;
    color: black;
    font-weight: bolder;
    text-align: center;
    background-color: $color;
  }
</style>