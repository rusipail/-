<script lang="ts">
    //Array.form(머시기) = 머시기를 배열로 쪼게준다 ["머", "시", "기"] 이런 느낌으로
    import {
      faPlus,
      faCircleXmark,
    } from "@fortawesome/free-solid-svg-icons/index.es";
    import Fa from "svelte-fa/src/fa.svelte";
    import { object_without_properties } from "svelte/internal";
    import {useAuth} from '../store'
  
    export let upload: boolean = false;
    export let hash: string;
  
    interface VotedUser {
      name: string
      pick: number
    }
    //VotePost는 예전코드의 postData와 같음
    interface VotePost {
      title: string
      options: string[]
      who: VotedUser[]
    }
  
    const MIN_VOTE_OPTION = 2  
    const MAX_VOTE_OPTION = 5
  
    let voteContainer:HTMLDivElement
    let formTitle:string
    let votePosts:VotePost[] = [] //votePosts는 예전코드의 postDataGroup과 같음
    let voteForm: Partial<VotePost> = resetVoteForm() //upload에서 candidate의 갯수를 정해주는 친구 예전코드의 postDataCopy
    let flag = false
    
    function change(e){
      let pick = e.target.classList[1].at(-1)
      let num = +e.target.parentElement.id.at(-1)
      console.log(votePosts[num].who.some(v => v.name == $useAuth.name))
      if(!votePosts[num].who.some(v => v.name == $useAuth.name)) {
        votePosts[num].who.push({
          name: $useAuth.name,
          pick: pick
        })
      } else if(votePosts[num].who.some(v => v.name === $useAuth.name)){
        console.log(votePosts[num].who)
        for(let i = 0; i < votePosts[num].who.length; i++){
          console.log(i)
          if(votePosts[num].who[i].name == $useAuth.name){
            votePosts[num].who.splice(i, 1)
            console.log('됨')
            votePosts[num].who.push({
              name: $useAuth.name,
              pick: pick
            })
          }
        }
      }
      console.log(votePosts)
      votePosts = votePosts
    }
  
    //예전코드에는 없던 voteForm초기화 해주는 함수
    function resetVoteForm (){
      const _form:Partial<VotePost> = {
        title: '',
        options: ['', '']
      }
      return _form// form은 어디에 쓰이는 함수인가요?
    }
  
    //예전코드의 candidatePlus
    function addFormOption(){
      if(voteForm.options.length >= MAX_VOTE_OPTION){
        alert('최대 5개의 옵션까지 추가할 수 있습니다!!')
        return
      }
      voteForm.options.push('')
      voteForm = voteForm
    }
  
    //예전코드의candidateMinus
    function removeFormOption(){
      if(voteForm.options.length <= MIN_VOTE_OPTION) {
        alert('최소 2개의 옵션은 있어야 합니다!!')
        return
      }
      voteForm.options.pop()
      voteForm = voteForm
    }
  
    //예전코드의 uploadToggle
    function createPost(){
      upload = !upload;
      const title = voteContainer.querySelector<HTMLInputElement>("#vote-title").value;
      const optionEls = voteContainer.querySelectorAll<HTMLInputElement>(".voteCandidateInput");
      console.log(optionEls)
      const options = Array.from(optionEls).map((v) => v.value);
      console.log(options)
      votePosts = [...votePosts, { title, options, who:[]}];// Q.왜 who 오류 안 뜨는지 A. 빈배열 넣었기 때문에
      Array.from(optionEls).forEach((v) => (v.value = ""));//Q. (v) => (v.value = "")가 무슨 뜻인가요 A.v의 값에 ""을 넣어주는거
      voteContainer.querySelector<HTMLInputElement>("#vote-title").value = "";
      
    }
  
    function checkingPost(){
      const optionEls = voteContainer.querySelectorAll<HTMLInputElement>(".voteCandidateInput");
      const options = Array.from(optionEls).map((v) => v.value)
      for(let i = 0; i < options.length; i++){
        console.log(options[i])
        if(options[i] == ''){
          window.alert('빈 후보 입력칸이 있습니다!')
          return
        }
      }
      createPost()
    }
  
    $: votePosts = votePosts //Q.이거 왜 하는거에요? A.반응성을 위해서
  
    $: {
      if (flag) location.hash = hash;
    }
  
    
  </script>
  
  <main>
    <!--upload창 코드-->
    <div id="upload" class={upload ? "" : "hidden"} bind:this={voteContainer}>
      <!--upload창의 header부분-->
      <div id="uploadContainer">
        <div id="uploadHeader">
          투표 올리기
          <span id="uploadClose" on:click={() => {upload = false}}>
            <Fa icon={faCircleXmark} color="white" size="1.5x" />
          </span>
        </div>
      </div>
  
      <!--uploading창의 무슨 투표를 올릴지 제목과 후보들을 적는 곳-->
      <div id="votingSystem">
        <input
          type="string"
          placeholder="투표 제목을 입력해주세요"
          id="vote-title"
          bind:value={formTitle}
          autocomplete="off"
        />
        <div id="candidateContainer">
          {#each voteForm.options as form, i}
            <input
              type="string"
              placeholder="후보{i + 1}을(를) 입력해주세요"
              class="voteCandidateInput"
              autocomplete="off"
            />
          {/each}
        </div>
        <div id="candidatePlusMinusContainer">
          <div id="plusCandidate" on:click={addFormOption}>후보 추가하기</div>
          <div id="minusCandidate" on:click={removeFormOption}>후보 제거하기</div>
        </div>
      </div>
  
      <!--게시하기 버튼 있는 제일 마지막 부분-->
      <div id="uploadingButton" on:click={checkingPost}>게시하기</div>
    </div>
  
    <!--투표생성하는  +버튼 있는 바-->
    <div id="postbar">
      <div id="custombar">
        <div id="uploading" on:click={() => {upload = true}}>
          <Fa icon={faPlus} color="white" size="4x" id="plus" />
        </div>
      </div>
    </div>
  
    <!--투표게시물 코드-->
    <div class="postListContainer">
      {#each votePosts as post, postNum}
        {#if post.title != '' && !post.options.every(option => option === '')}
          <div style="padding:5px;">
            <div class="postContainer">
              <div class="post-title"><strong>{post.title}</strong></div>
              <ul id={`vote-${postNum}`}>
                {#each post.options as opt, i}
                  <li class="candidate c{i}" class:selected={(votePosts[postNum].who.find(v => v.name === $useAuth.name))?.pick == i} on:click={change}>{opt}</li>
                {/each}
              </ul>
            </div>
          </div>
        {/if}
      {/each}
    </div>
  </main>
  
  <style lang="scss">
    $size: 24px;
    $backgroundColor: rgb(27, 26, 26);
    $color: rgb(208, 188, 255);
  
    .selected{
      background-color: $color;
    }
    .howManyVote{
      color: white;
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
      width: calc(100% - 75px);
      text-align: center;
      border: 1px solid white;
      padding: {
        top: 20px;
        bottom: 20px;
      };
      background-color: rgba(gray, 0.5);
      color: white;
      margin: auto;
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
        right: 20px;
      };
      color: white;
      width: calc(100% - 50px);
      border: 1px solid white;
      border-radius: 5px;
      color: white;
    }
    .candidate:hover{
      opacity: 0.3;
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
  
  
  
    .postListContainer{
      width: 720px;
      margin: auto;
      padding: {
        left: 20px;
        right: 20px;
      };
      .postContainer {
        border-radius: 10px;
        border: 2px solid white;
        padding: 5px;
        margin-bottom: 10px;
      }
  
      .post-title{
        color: white;
        font-size: large;
      }
  
    }
  </style>
  