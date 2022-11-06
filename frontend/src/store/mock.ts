import {writable} from 'svelte/store'
import assets from '../assets'

export interface Comment{
  username:string,
  comment:string
} 

export interface Community{
  user:string,
  title:string,
  image:string,
  comment:Comment[]
}

export let community_MockData = writable<Community[]>(
  [
//     {
//       user: 'leejuan',
//       // like: 10,
//       title: '제목제목',
//       // picture: '',
//       image: assets.css,
//       comment: [
//         {
//           username: "dlwndks",
//           comment: 'HELLO'
//         },
//         {
//           username: "leejuan",
//           comment: 'HI'
//         },
//         {
//           username: "이주안",
//           comment: 'leejuan'
//         },
//         {
//           username: "2주안",
//           comment: 'I like it'
//         },
//         {
//           username: "dlwndks",
//           comment: 'CSS'
//         },
//         {
//           username: "leejuan",
//           comment: 'HTML'
//         },
//         {
//           username: "이주안",
//           comment: '와우'
//         },
//         {
//           username: "2주안",
//           comment: 'WOW'
//         },
//         {
//           username: "dlwndks",
//           comment: 'OMG'
//         },
//         {
//           username: "leejuan",
//           comment: 'comment'
//         },
//         {
//           username: "이주안",
//           comment: 'Korea'
//         },
//         {
//           username: "2주안",
//           comment: 'spiderman'
//         },
//       ]
//     }, 
//     {
//       user: '2주in',
//       // picture: '',
//       // like: 10,
//       title: '제목입니다~',
//       image: assets.html,
//       comment: [
//         {
//           username: "lee주in",
//           comment: "뭐지"
//         }, 
//         {
//           username: "twozooin",
//           comment: "뭘까"
//         }
//       ]
//     },
//     {
//       user: 'testbot',
//       // picture: '',
//       // like: 10,
//       title: "test입니다",
//       image: assets.css,
//       comment: [
//         {
//           username: "testbot",
//           comment: "test"
//         }
//       ]
//     }
  ]
);
export let vote_MockData = writable(
  [
//     {
//       title: '',
//       options: [
//         '후보1',
//         '후보2',
//         '후보3',
//         '후보4',
//         '후보5',
//       ],
//       who:[
//         {
//           name:'이주안',
//           pick: 1,
//         },
//         {
//           name:'변동윤',
//           pick: 2,
//         }
//       ]
//     },
//     {
//       title: '가장 좋아하는 과목',
//       options: [
//         '수학',
//         '과학',
//         '국어',
//         '사회',
//         '영어',
//       ],
//       who:[
//         {
//           name:'이주안',
//           pick: 1,
//         },
//         {
//           name:'변동윤',
//           pick: 2,
//         }
//       ]
//     }
  ]
)