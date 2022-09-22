<script>
  import {onMount} from 'svelte'
  import {socket} from '../../store'
  import {EVENTS} from '../../../../shared'
  
  let messages = []

  console.log(socket)

  socket.on(EVENTS.TEST, (data) => {
    console.log('여기!')
    console.log(data)
  })

  onMount(() => {
    console.log('mount!')
    socket.emit('message', message => {
      messages = [...messages, message]
      console.log(message)
    })
  })
</script>

<div>

</div>