<script lang="ts">
    export let on:boolean;
    export let hash:string;
    export let selectedUser;
    let selectedHash = 'community';

    const sidebarClick = e =>{
      if(e.target.classList.contains("option")){
        if(e.target.innerHTML === "community"){
          hash = "#community";
          selectedHash = 'community'
        } else if(e.target.innerHTML === "message"){
          hash = "#message";
          selectedHash = 'message'
        } else if(e.target.innerHTML === "menu"){
          hash = "#menu";
          selectedHash = 'menu'
        } else if(e.target.innerHTML === "vote"){
          hash = "#vote"
          selectedHash = 'vote'
        }
        on = false
        selectedUser = null;
      }
    }
  </script>
  <main>
    <div id="sidebar" class={on ? "open" : ""} on:click={sidebarClick}>
      <div class="option {selectedHash === "community" ? "select" : ""}">
        community
      </div>
      <div class="option {selectedHash === "menu" ? "select" : ""}">
        menu
      </div>
      <div class="option {selectedHash === "vote" ? "select" : ""}">
        vote
      </div>
    </div>
  </main>
  <style lang="scss">
    @import url("https://fonts.googleapis.com/css2?family=Gentium+Book+Plus&family=Lato:wght@300&family=Roboto:ital,wght@1,100&display=swap");
    $backgroundColor: rgb(28, 27, 31);
    $color: rgb(208, 188, 255);
    $size: 24px;
    #sidebar {
      width: 200px;
      transition: all 0.3s;
      background-color: $backgroundColor;
      position: fixed;
      top: 80px;
      bottom: 0;
      transform: translateX(-200px);
      z-index: 3;
      .option {
        cursor: pointer;
        box-sizing: border-box;
        z-index: 3;
        color: white;
        font-size: 24px;
        transition: all 0.3s;
        width: calc(100%);
        padding: 30px 10px;
      }
    }
    #sidebar.open{
      transform: translateX(0);
    }
    .select{
      background-color: rgba(40, 40, 40, .5);
      color: $color !important;
    }
    .option:hover{
      opacity: 0.5;
      background-color: rgba(40, 40, 40, .5);
    }
  </style>