<script lang="ts">
  import {
    faPlus,
    faCircleXmark,
  } from "@fortawesome/free-solid-svg-icons/index.es";
  import Fa from "svelte-fa/src/fa.svelte";

  export let upload: boolean = false;
  export let hash: string;
  let incompleteTitle: string = "";
  let completeTitle: string = "";
  let flag = false;
  let candidate = 2;
  const candidateMax = 5;
  const candidateMin = 2;
  const arr = []
  let candidate_arr: candidate[] = [
    {
      content: "",
    },
    {
      content: "",
    },
  ];

  let vote_container:HTMLDivElement
  $: postDataGroup = []

  const postData = {
    title: '',
    options: [],
  }

  const toggleUpload = () => {
    upload = !upload;
    console.log("toggleupload", upload);
    console.log(vote_container)
    const title = vote_container.querySelector<HTMLInputElement>('#vote-title').value
    const optionEls = vote_container.querySelectorAll<HTMLInputElement>('.voteCandidateInput')
    const options = Array.from(optionEls).map(v => v.value)

    postDataGroup = [...postDataGroup, {title, options}]  // 반응성을 위해!!
    // postDataGroup = [...postDataGroup, {title, options}]  // 반응성을 위해!!



    vote_container.querySelector<HTMLInputElement>('#vote-title').value = ''
    Array.from(optionEls).forEach(v => v.value = '')

    // if (upload == false) {
    //   for (let i of candidate_arr) {
    //     console.log(i.content);
    //     arr.push({...i});
    //     console.log([...arr])
    //     i.content = "";
    //   }
    //   completeTitle = incompleteTitle;
    //   incompleteTitle = "";
    //   candidate_arr = arr;
    // }

  };
  const candidatePlus = () => {
    if (candidate < candidateMax) {
      candidate = candidate + 1;
      candidate_arr.push({ content: "" });
      candidate_arr = candidate_arr;
    } else {
      window.alert(`${candidateMax}개 이상의 후보를 추가할 수 없습니다.`);
    }
  };
  const candidateMinus = () => {
    if (candidate > candidateMin) {
      candidate = candidate - 1;
      candidate_arr.pop();
      candidate_arr = candidate_arr;
    } else {
      window.alert(`후보는 최소 ${candidateMin}개 이상 필요합니다.`);
    }
  };
  const uploading = () => {
    toggleUpload();
  };

  interface candidate {
    content: string;
  }

  $: {
    if (flag) location.hash = hash;
    candidate_arr = candidate_arr;
  }
</script>

<main>
  <div id="upload" class={upload ? "" : "hidden"} bind:this={vote_container}>
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
        bind:value={incompleteTitle}
        autocomplete="off"
      />
      <div id="candidateContainer">
        {#each candidate_arr as value}
          <input
            type="string"
            placeholder="후보{candidate_arr.indexOf(value) +
              1}을(를) 입력해주세요"
            class="voteCandidateInput"
            bind:value={value.content}
            autocomplete="off"
          />
        {/each}
      </div>
      <div id="candidatePlusMinusContainer">
        <div id="plusCandidate" on:click={candidatePlus}>후보 추가하기</div>
        <div id="minusCandidate" on:click={candidateMinus}>후보 제거하기</div>
      </div>
    </div>
    <div id="uploadingButton" on:click={uploading}>게시하기</div>
  </div>

  <div id="postbar">
    <div id="custombar">
      <div id="uploading" on:click={toggleUpload}>
        <Fa icon={faPlus} color="white" size="4x" id="plus" />
      </div>
    </div>
  </div>

  <div id="votePost">
    <div id="voteTitle">
      {completeTitle}
    </div>
    <div id="voteCandidateContainer">
      {#each postDataGroup as candidate}
        <div
          id="candidate{candidate_arr.indexOf(candidate) + 1}"
          class="candidate"
        >
        {candidate.title}
        {candidate.options}
        </div>
      {/each}
    </div>
  </div>
</main>

<style lang="scss">
  $size: 24px;
  $backgroundColor: rgb(27, 26, 26);
  $color: rgb(208, 188, 255);
  .candidate{
    width: 100%;
    border: 1px solid white;
    padding: {
      top: 10px;
      bottom: 10px;
    };
    color: white;
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
    width: 800px;
    height: 400px;
    margin: auto;
    margin: {
      top: 20px;
    }
    border: 1px solid white;
  }
  #voteTitle {
    width: 100%;
    color: white;
    border: 1px solid white;
    padding: {
      top: 10px;
      bottom: 10px;
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
