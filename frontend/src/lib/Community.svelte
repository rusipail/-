<script lang="ts">
  import { onMount } from "svelte";
  import Fa from "svelte-fa/src/fa.svelte";
  import {
    faHeart,
    faComment,
    faPlus,
    faCircleXmark,
  } from "@fortawesome/free-solid-svg-icons/index.es";
  import { community_MockData } from "../store/mock";
  import type {Community} from "../store/mock"
  import type {Comment} from "../store/mock"
  import { get} from "svelte/store";
  // import { mockData } from "src/mock";

  export let hash: string;
  export let upload: boolean;

  type MockData = Community
  let mockData:MockData[]=[];
  console.log(mockData)
  community_MockData.subscribe( v =>{
      console.log(mockData)
    }
  )
  let imageUrl = null;
  let imageInput = false;
  let flag = false;
  let wrapper: string = "";
  let subject: string = "subject";
  let image = "";
  let con = false;
  let commentInput = "";
  let memory = "";
  let likes = 0;
  $: {
    if (flag) location.hash = hash;
    console.log($community_MockData);
    if (con) console.log(1);
  }

  hash = location.hash;
  onMount(() => (flag = true));

  const toggleUpload = () => {
    upload = !upload;
    if (upload == false) {
      wrapper = "";
      imageUrl = null;
    }
  };

  const uploading = () => {
    if(wrapper == '' || imageUrl == null){
      alert('제목,사진을 추가해주세요')
    }else if(wrapper !== '' && imageUrl !== null){
      community_MockData.set(
        [...$community_MockData,
          {
            user: 'leejuan',
            title: wrapper,
            image: imageUrl,
            comment: []
          }
        ]
      )
      console.log($community_MockData)
      toggleUpload();
    }
  };

  const check = (event) => {
    if (event.key === "Enter") {
      memory = commentInput;
      const el = document.querySelector('.el')
      el.scrollTop = el.scrollHeight
      console.log(event.target.parentElement.classList)
      let where = event.target.parentElement.classList[1].at(-1)
      console.log(where)
      console.log($community_MockData[where].comment)
      $community_MockData[where].comment.push(
        {
          username:'leejuan',
          comment: memory
        }
      )
      community_MockData.set(
        $community_MockData
      )
      commentInput = "";
      console.log(memory);
      memory = "";
    }
  };

  const inputImages = (e: Event) => {
    const inputTag = e.target as HTMLInputElement;
    const files = inputTag.files;
    if (!files.length) return;

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (event) => {
      imageUrl = event.target.result as string;
      imageInput = !imageInput;
    };
  };
</script>

<main>
  <div id="upload" class={upload ? "" : "hidden"}>
    <div id="uploadContainer">
      <div id="uploadHeader">
        게시물 올리기
        <span id="uploadClose" on:click={toggleUpload}>
          <Fa icon={faCircleXmark} color="white" size="1.5x" />
        </span>
      </div>
    </div>

    <!-- modal 창 -->
    <div id="commentContainer">
      <div id="commentBox">
        <input
          type="string"
          placeholder="게시글 제목를 입력해주세요"
          id="post-title"
          bind:value={wrapper}
          autocomplete="off"
        />
      </div>
      <div id="imgUpload">
        <input type="file" id="file" on:input={inputImages} />
        <label
          for="file"
          id="fileUploader"
          class={imageInput ? "imageInput" : ""}
        >
          <div id="imgUploadText">사진/동영상 추가하기</div>
          <img src={imageUrl} alt="" id="img"/>
        </label>
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

    <!-- posts -->
    <div class="posts">
      {#each $community_MockData as d, dNum}
        <div class="post">
          <div class="header">
            <div
              class="profile"
              style="background-size: contains;"
            />
            <div class="text">
              <div class="subject">{d.user}</div>
              <div class="subhead">{d.title}</div>
            </div>
          </div>
          <div class="content">
            <img class="img" src={d.image} alt="" width="100%" height="100%" />
          </div>
          <div class="headline">
            <div class="comment">
              <span class="reaction">
                <Fa class="fa" icon={faComment} size="1.8x" />
              </span>
            </div>
            <div class="likes">
              <strong>
                댓글 {d.comment.length}개
              </strong>
            </div>
          </div>
          <div class="commentBox">
            <div class="commentUploadingBox el">
              {#each d.comment as comment}
                <div class="texts">
                  <span><strong>{comment.username}</strong> </span><span
                    >{comment.comment}</span
                  >
                </div>
              {/each}
            </div>
            <div class={`commentInputContainer commentInput${dNum}`}>
              <input
                type="text"
                placeholder="댓글을 입력하세요"
                class="commentInput"
                on:keypress={check}
                bind:value={commentInput}
              />
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</main>

<style lang="scss">
  @import url("https://fonts.googleapis.com/css2?family=Gentium+Book+Plus&family=Lato:wght@300&family=Roboto:ital,wght@1,100&display=swap");
  $size: 24px;
  $backgroundColor: rgb(27, 26, 26);
  $color: rgb(208, 188, 255);
  $font: "Lato", sans-serif;
  .reaction {
    padding: {
      top: 5px;
      left: 5px;
      right: 10px;
    }
  }
  .reaction:hover {
    cursor: pointer;
  }
  .texts {
    padding: {
      top: 10px;
    }
  }
  #postbar {
    max-width: 800px;
    margin: auto;
  }
  .posts {
    .post {
      border-radius: 15px 15px 0 0;
      margin-top: 30px;
      .header {
        background-color: $backgroundColor;
        border-radius: 15px 15px 0px 0px;
        padding: 10px 10px 15px 10px;

        box-sizing: border-box;
        align-items: center;
        display: flex;
        gap: 10px;
        .profile {
          box-sizing: border-box;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 40px;
          width: 40px;
          border-radius: 100%;
          background-color: $color;
        }
        .text {
          width: 80%;
          .subject {
            color: white;
            font-size: large;
            font: {
              size: large;
            }
            display: flex;
            align-items: center;
          }
          .subhead {
            color: white;
            font-size: small;
            justify-content: center;
            align-items: center;
          }
        }
      }
      .headline {
        background-color: rgb(32, 31, 32);;
        color: white;
        padding: 10px 0;
        .comment {
          padding: 10px 5px;
        }
        .likes {
          padding-left: 10px;
        }
      }
      .content {
        background-color: white;
        border: {
          left: 1px solid $backgroundColor;
          right: 1px solid $backgroundColor;
        }
        height: 500px;
        text-align: center;
      }
      .commentBox {
        max-height: 400px;
        background-color: $backgroundColor;
        color: white;
        border-radius: 0px 0px 15px 15px;
        padding: {
          left: 10px;
        }
      }
    }
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
  .img {
    width: auto;
    height: auto;
    margin: auto;
    max-width: 800px;
    max-height: 500px;
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
  #commentContainer {
    height: 80%;
    border-collapse: collapse;
    #commentBox {
      color: white;
      width: 98%;
      height: 10%;
      border: 1px solid gray;
      margin: auto;
      text-align: center;
    }
    #imgUpload {
      width: 98%;
      height: 80%;
      border: 1px solid gray;
      margin: auto;
      text-align: center;
      #file {
        display: none;
      }
      #fileUploader {
        color: white;
        display: block;
        width: 100%;
        height: 100%;
        cursor: pointer;
      }
    }
    #fileUploader.imageInput {
      width: 100%;
      height: 50%;
    }
    #imgUploadText {
      cursor: pointer;
      margin-top: 20px;
    }
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
  #post-title {
    width: 98%;
    height: 90%;
    background-color: $backgroundColor;
    border: 0;
    color: white;
  }
  #post-title:focus-visible {
    outline-offset: 0px;
    outline: 0;
  }
  #img {
    margin: auto;
    height: calc(100% - 41px);
  }
  .commentInput:focus-visible {
    outline-offset: 0px;
    outline: 0;
  }
  .commentInputContainer {
    padding: 10px 0;
    width: 100%;

    input.commentInput {
      width: calc(100% - 10px);
      padding: 10px 0;
      font-size: 16px;
      border: none;
      color: white;
      background-color: rgb(32, 31, 32);
    }
  }
  .commentUploadingBox {
    width: 100%;
    max-height: 200px;
    overflow: auto;

    &::-webkit-scrollbar {
      width: 8px; 
    }

    &::-webkit-scrollbar-thumb {
      height: 30%;
      background-color: rgb(208, 188, 255);; 
      border-radius: 10px;
    }

    &::-webkit-scrollbar-track {
      background: rgba(110, 114, 118, 0.1);
    }
  }
</style>
