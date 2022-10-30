<script lang="ts">
  type Item = {
    head?: any,
    row?: any
  }
  type MenuType = {
    mealServiceDietInfo: Item[]
  }

  let menuData = Promise.resolve<MenuType>(null)

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
    const day = d.getDay()
    const diff = d.getDate() - day + (day == 0 ? -6 : 1)
    const mon = new Date(d.setDate(diff)).toISOString().substring(0, 10).split('-').join('')
    const fri = new Date(d.setDate(diff + 5)).toISOString().substring(0, 10).split('-').join('')
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
      <div>{(menuData)}</div>
      <table>

      </table>
    </div>
  {/await}
  <!-- {#await a}
    <div>plz wait</div>
  {:then a}
    <div id="dishesContainer">
      <div id="title">점심메뉴</div>
      <table>
        <tr id="dayManageContainer">
          {#each configs as data}
            <td class="day" on:click={checkingDay}>{data.day}</td>
          {/each}
        </tr>
        {#each days as dishes}
          <tr class="dishes{dishes} {week[dishes] ? '' : 'dishes'}">
            <td colspan="5">
              <div class="weekDishes">
                {#each dish as i}
                  <div class="menu">
                    {console.log(configs[dishes].dishes[i])}
                  </div>
                {/each}
                {#each dish as i}
                  <div class="menu">{configs[dishes].dishes[i]}</div>
                {/each}
              </div>
            </td>
          </tr>
        {/each}
      </table>
    </div>
  {/await} -->

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
  main {
    height: calc(100vh - 120px);
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
    margin-top: 120px;
    background-color: white;
    height: 700px;
    border-radius: 8px;
  }
</style>
