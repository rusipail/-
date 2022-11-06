<script lang="ts">
  type OneRow = {
    ATPT_OFCDC_SC_CODE: string;
    ATPT_OFCDC_SC_NM:string;
    CAL_INFO:string;
    DDISH_NM: string;
    MLSV_FGR: string;
    MLSV_FROM_YMD: string;
    MLSV_TO_YMD: string;
    MLSV_YMD:string;
    MMEAL_SC_CODE:string;
    MMEAL_SC_NM:string;
    NTR_INFO: string;
    ORPLC_INFO: string;
    SCHUL_NM:string;
    SD_SCHUL_CODE:string;
  }
  type Item = {
    head?: any;
    row?: OneRow[];
  }
  type MenuType = {
    mealServiceDietInfo: Item[]
  }

  type Seeting = {
    date: string,
    state: boolean
  }

  const date = ["월", "화", "수", "목", "금"]
  const dateSetting:Seeting[] = [
    {
      date: date[0],
      state:false
    },
    {
      date: date[1],
      state:false
    },
    {
      date: date[2],
      state:false
    },
    {
      date: date[3],
      state:false
    },
    {
      date: date[4],
      state:false
    }
  ]

  function checkingDay(e) {
    console.log(e.target.innerHTML.slice(0,1))
    for(let i = 0; i < date.length; i++){
      if(date[i] == e.target.innerHTML.slice(0,1)){
        dateSetting[i].state = !dateSetting[i].state;
        console.log(dateSetting);
      }else{
        dateSetting[i].state = false;
      }
    }
  } 

  let menuData = new Promise<MenuType>(res => {});

  const URL = `https://open.neis.go.kr/hub/mealServiceDietInfo`

  async function getMenuData() {
    const {fri, mon} = getWeekDate(new Date())

    const params = new URLSearchParams()
    params.append('Type', 'json')
    params.append('ATPT_OFCDC_SC_CODE', 'J10')
    params.append('SD_SCHUL_CODE', '7781012')
    params.append('MLSV_FROM_YMD', mon)
    params.append('MLSV_TO_YMD', fri)
    try {
      menuData = await (await fetch(`${URL}?${params.toString()}`)).json()
      console.log(menuData)
    } catch (err) {
      console.error(err)
    }
  }


  function getWeekDate(d:Date){
    const monDate = new Date(d);
    monDate.setDate(monDate.getDate() - monDate.getDay());
    const friDate = new Date(monDate);
    friDate.setDate(friDate.getDate() + 5);
    const mon = monDate.toISOString().substring(0, 10).split('-').join('')
    const fri = friDate.toISOString().substring(0, 10).split('-').join('')
    return {mon, fri}
  }

  getMenuData()
</script>

<main>
  
  {#await menuData}
    <div>메뉴 정보 불러오는 중...</div>
  {:then menuData} 
    <div id="dishesContainer">
      <div id="title">점심 메뉴</div>
      <table>
        <tr id="dayManageContainer">
          {#each date as data, datanum}
            <td class="day" on:click={checkingDay}>{date[datanum]}요일</td>
          {/each}
        </tr>
          {#each menuData.mealServiceDietInfo[1].row as data, datanum}
            <tr class="dishes{datanum} {dateSetting[datanum].state ? '' : 'dishes'}">
              <td colspan="{data.DDISH_NM.length}">
                <div class="weekDishes">
                  {#each data.DDISH_NM.match(/[가-힣]+/g) as dishes, num}
                    <td class="menu">{data.DDISH_NM.match(/[가-힣]+/g)[num]}</td>
                  {/each}
                </div>
              </td>
            </tr>
          {/each}
      </table>
    </div>
  {/await}
  

</main>

<style lang="scss">
  $backgroundColor: rgb(28, 27, 31);
  $color: rgb(208, 188, 255);
  table {
    width: 100%;
    text-align: center;
    border-collapse: collapse;
  }
  .weekDishes {
    display: flex;
    height: 100%;
    border: 1px solid $color;
  }
  .menu {
    width: calc(100% / 6);
    border: 1px solid $color;
    padding: {
      top: 220px;
      bottom: 220px;
    }
    font-size: large;
    font-weight: bold;
  }
  #title {
    font-size: 30px;
    text-align: center;
    padding: {
      top: 45px;
      bottom: 45px;
    }
  }
  .dishes {
    display: none;
  } 
  #dayManageContainer {
    width: 100%;
  }
  .dishes0,
  .dishes1,
  .dishes2,
  .dishes3,
  .dishes4 {
    width: 100%;
    height: 480px;
  }
  .day {
    font-size: 20px;
    background-color: $color;
    width: calc(100% / 5);
    padding: {
      top: 31.5px;
      bottom: 31.5px;
    }
    border: 1px solid black;
  }
  #dishesContainer {
    border-collapse: collapse;
    width: 1400px;
    margin: auto;
    margin-top: 220px;
    background-color: white;
    height: 700px;
    border-radius: 8px;
  }
</style>
