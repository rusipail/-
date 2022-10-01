<script lang="ts">
  import {
    faPlus,
    faCircleXmark,
  } from "@fortawesome/free-solid-svg-icons/index.es";
  import Fa from "svelte-fa/src/fa.svelte";

  interface candidate {
    number: number;
  }

  type WhoVote = {
    idx: number
    name: string
  }

  type PostData = {
    title: string
    options: string[]
    voted: WhoVote[]  
  }

  type PostDataGroup = PostData[] 

  export let upload: boolean = false;
  export let hash: string;
  let incompleteTitle: string = "";
  let flag = false;
  let candidate:candidate[] = [
    {
      number: 0
    },
    {
      number: 1
    }
  ]
  const candidateMax = 5;
  const candidateMin = 2;
  let vote = false;

  const postData:PostData = {
    options: ['', ''],
    title: '',
    voted: []
  }

  let vote_container: HTMLDivElement;
  let postDataGroup: PostData[] = [];
  // const postData: PostData = {
  //   title: "",
  //   options: [],
  //   selectedOptionIdx: -1
  // };
  let postDataCopy:Partial<PostData> = {
    options: [ '', '']
  }
  console.log(postDataCopy)

  
  const createPost = () => {
    upload = !upload;
    const title = vote_container.querySelector<HTMLInputElement>("#vote-title").value;
    const optionEls = vote_container.querySelectorAll<HTMLInputElement>(".voteCandidateInput");
    const options = Array.from(optionEls).map((v) => v.value);
    if (title != "" && optionEls != undefined) {
      postDataGroup = [...postDataGroup, { title, options, voted:[]}]; // 반응성을 위해!!
      Array.from(optionEls).forEach((v) => (v.value = ""));
      vote_container.querySelector<HTMLInputElement>("#vote-title").value = "";
    }
  };

  const votetoggle = () =>{
    vote = !vote
  }

  const checkingCandidate = (e) =>{
    // e.target.classList.add(select)
    console.log(e.target)
    postDataGroup
  }

  const candidatePlus = () => {
    if (postDataCopy.options.length < candidateMax) {
      postDataCopy = [...postDataCopy, {title, options:postDataCopy.options.length, voted}]
      postDataCopy.options.push()
    } else {
      window.alert(`${candidateMax}개 이상의 후보를 추가할 수 없습니다.`);
    }
  }

  const candidateMinus = () => {
    if (postDataCopy.options.length > candidateMin) {
      postDataCopy.options.pop()
    } else {
      window.alert(`후보는 최소 ${candidateMin}개 이상 필요합니다.`);
    }
  }

  // const candidatePlus = () => {
  //   if (candidate.length < candidateMax) {
  //     candidate = [...candidate, candidate.length];
  //   } else {
  //     window.alert(`${candidateMax}개 이상의 후보를 추가할 수 없습니다.`);
  //   }
  // };
  // const candidateMinus = () => {
  //   if (candidate.length > candidateMin) {
  //     candidate.pop();
  //   } else {
  //     window.alert(`후보는 최소 ${candidateMin}개 이상 필요합니다.`);
  //   }
  // };
  $: {
    if (flag) location.hash = hash;
  }
</script>

<main>
  <div id="upload" class={upload ? "" : "hidden"} bind:this={vote_container}>
    <div id="uploadContainer">
      <div id="uploadHeader">
        투표 올리기
        <span id="uploadClose" on:click={() => {upload = false}}>
          <Fa icon={faCircleXmark} color="white" size="1.5x" />
        </span>
      </div>
    </div>
    <div id="votingSystem">
      <input
        type="string"
        placeholder="투표 제목을 입력해주세요"
        id="vote-title"
        bind:value={incompleteTitle}
        autocomplete="off"
      />
      <div id="candidateContainer">
        {#each postDataCopy.options as option}
          <input
            type="string"
            placeholder="후보{option.length}을(를) 입력해주세요"
            class="voteCandidateInput"
            autocomplete="off"
          />
        {/each}
      </div>
      <div id="candidatePlusMinusContainer">
        <div id="plusCandidate" on:click={candidatePlus}>후보 추가하기</div>
        <div id="minusCandidate" on:click={candidateMinus}>후보 제거하기</div>
      </div>
    </div>
    <div id="uploadingButton" on:click={createPost}>게시하기</div>
  </div>

  <div id="postbar">
    <div id="custombar">
      <div id="uploading" on:click={() => {upload = true}}>
        <Fa icon={faPlus} color="white" size="4x" id="plus" />
      </div>
    </div>
  </div>

  {#each candidate as candidates}
    {#if postDataGroup[candidates.number]?.title != undefined}
      <div id="votePost">
        <div id="voteTitle">
          {postDataGroup[candidates.number]?.title}
        </div>
        <div id="voteCandidateContainer">
          {#if postDataGroup[candidates.number]?.options.length <= 5}
            {#each candidate as options}
              {#if postDataGroup[candidates.number].options[options.number] != undefined}
                <div id="candidate{options.number + 1}" class="candidate {options.number == postDataGroup[candidates.number]?.voted[0].idx ? "selected" : ""}" on:click={checkingCandidate}>
                  {postDataGroup[candidates.number].options[options.number]}
                </div>
              {/if}
            {/each}
          {/if}
          <!--이거 메뉴창에서 후보수 줄이거나 늘리면 원래 올라갔던 애들도 올라감 해결하기-->
        </div>
        <div id="voteAndRevoteContainer">
          <div id="{vote ? "revote" : "vote"}" class="button" on:click={votetoggle}>
            <!-- {#if postDataGroup[candidates]?.voted != []} -->
              <!-- {vote ? "다시 투표하기" : "투표하기"} -->
            <!-- {:else} -->
              투표하기
            <!-- {/if} -->
          </div>
        </div>
      </div>
    {/if}
  {/each}
</main>

<style lang="scss">
  $size: 24px;
  $backgroundColor: rgb(27, 26, 26);
  $color: rgb(208, 188, 255);
  .select{

  }
  #voteAndRevoteContainer{
    width: 100%;
    padding: {
      left: 20px;
      right: 20px;
    };
  }
  .button{
    cursor: pointer;
    width: calc(100% - 40px);
    text-align: center;
    border: 1px solid white;
    padding: {
      top: 20px;
      bottom: 20px;
    };
    background-color: rgba(gray, 0.5);
    color: white;
    margin: {
      top: 10px;
      bottom: 10px;
    };
    border-radius: 8px;
  }
  #voteCandidateContainer {
    height: auto;
    padding: {
      left: 20px;
      right: 20px;
    };
  }
  .candidate {
    cursor: pointer;
    padding: {
      top: 15px;
      bottom: 15px;
      left: 10px;
    };
    margin: {
      top: 8px;
      bottom: 8px;
    };
    color: white;
    width: calc(100% - 10px);
    border: 1px solid white;
    border-radius: 5px;
    color: white;
  }
  .candidate:hover{
    background-color: rgba(gray, 0.3);
  }
  #candidatePlusMinusContainer {
    background-color: $color;
    width: 300px;
    display: flex;
    margin: auto;
    border-radius: 20px;
    margin: {
      top: 50px;
    }
    div {
      flex-grow: 1;

      &:nth-child(1) {
        border-right: 2px solid rgb(176, 139, 255, 0.5);
      }
    }
  }
  #plusCandidate,
  #minusCandidate {
    background-color: $color;
    text-align: center;
    padding: {
      top: 15px;
      bottom: 15px;
    }
    cursor: pointer;
  }
  #plusCandidate {
    border-radius: 20px 0px 0px 20px;
  }
  #minusCandidate {
    border-radius: 0px 20px 20px 0px;
  }
  #minusCandidate:hover {
    background-color: rgba(black, 0.3);
  }
  #plusCandidate:hover {
    background-color: rgba(black, 0.3);
  }
  #candidateContainer {
    padding: {
      top: 100px;
      left: 10px;
    }
  }

  #votePost {
    width: 700px;
    height: auto;
    margin: auto;
    border-radius: 20px;
    margin: {
      top: 20px;
      bottom: 10px;
    }
    border: 1px solid white;
  }
  #voteTitle {
    border-radius: 20px 20px 0 0;
    width: calc(100% - 10px);
    // text-align: center;
    color: white;
    // border: 1px solid white;
    padding: {
      top: 20px;
      bottom: 20px;
      left: 10px;
    }
    font-size: 20px;
  }
  #vote-title {
    width: calc(98% + 1px);
    padding: {
      top: 20px;
      bottom: 20px;
    }
    color: white;
    background-color: $backgroundColor;
    border: {
      top: 1px solid $color;
      left: 0;
      right: 0;
      bottom: 1px solid $color;
    }
    font-size: 20px;
  }
  #vote-title:focus-visible {
    outline-offset: 0px;
    outline: 0;
    border: {
      top: 1px solid $color;
      left: 0;
      right: 0;
      bottom: 1px solid $color;
    }
  }
  #votingSystem {
    height: 570px;
    padding: {
      left: 10px;
    }
  }
  #upload {
    position: fixed;
    width: 600px;
    height: 700px;
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
    max-width: 720px;
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
  .voteCandidateInput {
    width: calc(98% + 1px);
    padding: {
      top: 15px;
      bottom: 15px;
    }
    border: {
      top: 0;
      left: 0;
      right: 0;
      bottom: 1px solid $color;
    }
    font-size: 16px;
    background-color: $backgroundColor;
    color: white;
  }
  .voteCandidateInput:focus-visible {
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
