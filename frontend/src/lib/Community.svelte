<script lang="ts">
    import { onMount } from 'svelte';
    import Fa from 'svelte-fa/src/fa.svelte'
    import { faCaretDown, faBars, faHeart, faHeartCircleExclamation, faComment, faShare, faPlus, faCircleXmark} from '@fortawesome/free-solid-svg-icons/index.es'
    import { each } from 'svelte/internal';
    import CSS from "../assets/CSS.svg"
    import HTML from "../assets/HTML.png"
    import test from "../assets/CSS.svg"
    export let hash:string;
    export let upload:boolean;

    let imageUrl = '';
    let imageInput = false;
    let flag = false;
    let wrapper:string = '';
    let subject:string = 'subject';
    let image = '';
    let con = false;
    let commentInput = '';
    let memory = '';
    let likes = 0;
    $:{
      if(flag) location.hash = hash;
      console.log(wrapper)
      if(con) console.log(1)
    }
    
    hash = location.hash;
    onMount(() => flag = true);

    const toggleUpload = () => {
      upload = !upload
      if(upload == false){
        wrapper = '';
        console.log(imageUrl)
        imageUrl = null;
      }
    }

    const uploading = () =>{
      subject = wrapper;
      image = imageUrl;
      toggleUpload()
    }

    const check = (event) =>{
      if(event.key === "Enter"){
        memory = commentInput;
        commentInput = '';
        console.log(memory);
        memory = '';
      }
    }

    const inputImages = (e: Event) =>  {
      const inputTag = e.target as HTMLInputElement
      const files = inputTag.files
      console.log(files)
      if(!files.length) return

      const reader = new FileReader()
      reader.readAsDataURL(files[0])
      reader.onload = (event) => {
        console.log(event.target.result)
        imageUrl = event.target.result as string
        imageInput = !imageInput;
      }
    }
    const LikeCheck = () =>{
      likes += 1
      console.log(likes)
    }

    //==== mock Data
    const mockData = [{
      user: 'leejuan',
      like: 10,
      title: '제목제목',
      image: CSS,
      comment: [
        {
          username: "dlwndks",
          comment: 'HELLO'
        },
        {
          username: "leejuan",
          comment: 'HI'
        },
        {
          username: "이주안",
          comment: 'leejuan'
        },
        {
          username: "2주안",
          comment: 'I like it'
        },
        {
          username: "dlwndks",
          comment: 'CSS'
        },
        {
          username: "leejuan",
          comment: 'HTML'
        },
        {
          username: "이주안",
          comment: '와우'
        },
        {
          username: "2주안",
          comment: 'WOW'
        },
        {
          username: "dlwndks",
          comment: 'OMG'
        },
        {
          username: "leejuan",
          comment: 'comment'
        },
        {
          username: "이주안",
          comment: 'Korea'
        },
        {
          username: "2주안",
          comment: 'spiderman'
        },
        {
          username: "dlwndks",
          comment: 'superman'
        },
        {
          username: "leejuan",
          comment: 'superhero lending~!'
        },
        {
          username: "이주안",
          comment: 'great'
        },
        {
          username: "2주안",
          comment: 'good'
        }
      ]
    }, {
      user: '2주in',
      like: 10,
      title: '제목입니다~',
      image: HTML,
      comment: [
        {
          username: "lee주in",
          comment: "뭐지"
        }, 
        {
          username: "twozooin",
          comment: "뭘까"
        }
      ]
    },{
      user: 'testbot',
      like: 10,
      title: "test입니다",
      image: test,
      comment: [
        {
          username: "testbot",
          comment: "test"
        }
      ]
    }
  ]
    //
  
  </script>
  <main>
  <div id="upload" class={upload ? "" : "hidden"}>
    <div id="uploadContainer">
      <div id="uploadHeader">게시물 올리기
        <span id="uploadClose" on:click={toggleUpload}>
          <Fa
            icon={ faCircleXmark }
            color="white"
            size="1.5x"
          />
        </span>
      </div>
    </div>
    <div id="commentContainer">
      <div id="commentBox">
        <input type="string" placeholder="문구를 입력해주세요" id="comment" bind:value={ wrapper }>
      </div>
      <div id="imgUpload">
        <input type="file" id="file" on:input={inputImages}>
        <label for="file" id="fileUploader" class={imageInput ? "imageInput" : ""}>
          <div id="imgUploadText">사진/동영상 추가하기</div>
          <img src={imageUrl} alt="">
        </label>
      </div>
    </div>
    <div id="uploadingButton" on:click={uploading}>
      게시하기
    </div>
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

    {#each mockData as d}
      <div id="posts" on:dblclick={ LikeCheck }>
        <div class="post">
          <div class="header">
            <div class="profile">
              프사
            </div>
            <div class="text">
              <div class="subject">{d.user}</div>
              
              <div class="subhead">{d.title}</div>
            </div>
          </div>
          <div class="content">
            <img class="img" src={d.image} alt="">
          </div>
          <div class="headline"> 
            <div class="comment">
              <span class="reaction">
                <Fa 
                  class="fa"
                  icon={ faHeart }
                  size="1.8x"
              />
              </span>
              <span class="reaction">
                <Fa
                  class="fa"
                  icon={ faComment }
                  size="1.8x" 
                />
              </span>
              <span class="reaction">
                <Fa
                  class="fa"
                  icon={ faShare }
                  size="1.8x"
                />
              </span>
            </div>
            <div class="likes">
              <strong>
                좋아요 {d.like}개 댓글 {d.comment.length}개
              </strong>
            </div>
          </div>
          <div class="commentBox">
            <div class="commentUploadingBox { d.comment.length >= 4 ? 'scrollYes' : ''}" >
              {#each d.comment as comment}
                <div class="texts"><span><strong>{comment.username}</strong> </span><span>{comment.comment}</span></div>
              {/each}

            </div>
            <div class="commentInputContainer"><input type="text" placeholder="댓글을 입력하세요" class="commentInput" on:keypress={check} bind:value={ commentInput }></div>
          </div>
        </div>
      </div>
    {/each}
    
  
  </main>
    <style lang="scss">
      @import url('https://fonts.googleapis.com/css2?family=Gentium+Book+Plus&family=Lato:wght@300&family=Roboto:ital,wght@1,100&display=swap');
      $size: 24px;
      $backgroundColor:rgb(27, 26, 26);
      $color:rgb(208, 188, 255);
      $font: 'Lato', sans-serif;
      
    // .fa{
    //   border: 5px solid $color;
    //   padding: {
    //     top: 10px;
    //     bottom: 10px;
    //   };
    // }
    .reaction{
      padding: {
        top: 5px;
        left: 5px;
        right: 10px;
      };
    }
    .reaction:hover{
      cursor: pointer;
    }
    .texts{
      padding: {
        top: 10px;
      };
    }
    #postbar{
      height: 100vh;
      max-width: 800px;
      margin: auto;
      // overflow-y: scroll;
    }
    #posts{
      display: block;
      // position: fixed;
      width: 100%;
      max-width: 800px;
      height: 90%;
      border-radius: 15px;
      .post{
        background-color: $color;
        border-radius: 15px;
        margin: {
          top: 30px;
        }
        width: 100%;
        height: 756px;
        .header{
          width: 100%;
          background-color: $backgroundColor;
          border-radius: 15px 15px 0px 0px;
          padding:10px 10px 15px 10px;
          
          box-sizing: border-box;
          align-items: center;
          display: flex;
          gap:10px;
          .profile{
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 40px;
            width:40px;
            border-radius: 100%;
            background-color: $color;
          }
          .text{
            width: 80%;
            .subject{
              color: white;
              font-size: large;
              font: {
                size: large;
              }
              display: flex;
              // justify-content: center;
              align-items: center;
              
            }
            .subhead{
              color: white;
              font-size: small;
              justify-content: center;
              align-items: center;
            }
          }
        }
        .headline{
          background-color: $backgroundColor;
          color: white;
          height: 80px;
          .comment{
            margin: {
              left: 15px;
            }
            padding: {
              top: 10px;
            };
          }
          .likes{
            padding: {
              top: 10px;
              left: 10px;
            };
            margin: {
              left: 10px;
            }
          }
        }
        .content{
          width: calc(100% - 2px);
          border: {
            left: 1px solid $backgroundColor;
            right: 1px solid $backgroundColor;
          }
          height: 500px;
          text-align: center;
          margin: auto;
        }
        .commentBox{
          background-color: $backgroundColor;
          color: white;
          height: 160px;
          border-radius: 0px 0px 15px 15px;
          padding: {
            left: 10px
          };
          & > span{
            margin: {
              left: 20px
            }
          };
        }
      }
    }
  main{
    z-index: 1;
  }
  #custombar{
    width: 100%;
    height: 70px;
    border: 1px solid gray;
    margin-top: 10px;
    border-radius: 15px;
    background-color: $backgroundColor;
  }
  #uploading{
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
  .img{
    width: auto;
    height: auto;
    margin: auto;
    max-width: 800px;
    max-height: 500px;
  }
  #upload{
    width: 600px;
    height: 600px;
    position: fixed;
    z-index: 6;
    margin: auto;
    inset: 0;
    display: inline-block;
    border: 1px solid $backgroundColor;
    background-color: $backgroundColor;
    border-radius: 20px;
  }
  #upload.hidden{
    display: none;
  }
  #uploadContainer{
    width: 100%;
    height: 10%;
    display: flex;
    
    #uploadHeader{
      padding: {
        top: 15px;
      }
      width: 100%;
      color: white;
      text-align: center;
      font-size: 24px;
    }
    #uploadClose{
      cursor: pointer;
      position: relative;
      left: 30%;
    }
  }
  #commentContainer{
    height: 80%;
    border-collapse: collapse;
    #commentBox{
      color: white;
      width: 98%;
      height: 10%;
      border: 1px solid gray;
      margin: auto;
      text-align: center;
    }
    #imgUpload{
      width: 98%;
      height: 80%;
      border: 1px solid gray;
      margin: auto;
      text-align: center;
      #file{
        display: none;
      }
      #fileUploader{
        color: white;
        display: block;
        width: 100%;
        height: 100%;
        cursor: pointer;
      }
    }
    #fileUploader.imageInput{
      width: 100%;
      height: 40%;
    }
    #imgUploadText{
      cursor:pointer;
      height: 10%;
    }
  }
  #uploadingButton{
    cursor: pointer;
    width: 100%;
    color: white;
    text-align: center;
    background-color: $color;
    height: 5%;
    border-radius: 8px;
    padding: {
      top: 4px;
    }
  }
  #comment{
    width: 98%;
    height: 90%;
    background-color: $backgroundColor;
    border: 0;
    color: white;
  }
  #comment:focus-visible{
    outline-offset: 0px;;
    outline: 0;
  }
  #img{
    margin: auto;
    height: 100%;
  }
  .commentInput{
    width: calc(100% - 1px);
    height: 30px;
    background-color: rgb(28, 27, 31);
    position: static;
    left: 0px;
    bottom: 0;
    border: 0;
    color: white;
    border-radius: 20px;
  }
  .commentInput:focus-visible{
    outline-offset: 0px;;
    outline: 0;
  }
  .commentInputContainer{
    margin: {
      top: 10px
    };
    border: 3px solid rgb(28, 27, 31);
    width: calc(98% - 3px);
    border-radius: 20px;
    justify-self: center;

  }
  .commentUploadingBox{
    // overflow-y: scroll;
    height: 60%;
    margin: {
      left: 10px;
    };
  }
  .scrollYes{
    overflow-y: scroll;
  }
  .scrollYes::-webkit-scrollbar {
    width: 10px;
  }
  //스크롤 바 가장 큰 부분


  .scrollYes::-webkit-scrollbar-thumb{
    width: 10px;
    background-color: grey;
    border-radius: 20px;
    margin: {
      right: 3px
    };
  }
  //스크롤 바 움직이는 부분

  .scrollYes::-webkit-scrollbar-track{
    width: 10px;
    margin: {
      right: 3px
    };
    border-radius: 20px;
    background-color: rgba(168, 168, 168, 0.3)  
  }
  //스크롤 바 나머지 부분
  #plus{
    width: 60px;
    height: 60px;
  }
  </style>