import PageList from "./PageList";


const searchGame = () => {
  let search = document.getElementById("findgame").value;
  if (search == "") {
    search = PageList();
  } else {
    search = "&search=" + search;
    PageList(search);
  }
};

// const allLogos = (platform)=>{
//   let list = [];
//   platform.forEach(platform => {
//     if(platform.platform.slug =='pc'){
//       list.push(`<a name='pc' href='#pagelist/&parent_platforms=${platform.platform.id}'><img class='logo-platform' src='./src/img/pc.svg'></a>`)
//     }else if (platform.platform.slug =='playstation'){
//       list.push(`<a name='playstation' href='#pagelist/&parent_platforms=${platform.platform.id}'><img class='logo-platform' src='./src/img/playstation.svg'></a>`)
//     }else if (platform.platform.slug =='xbox'){
//       list.push(`<a name='xbox' href='#pagelist/&parent_platforms=${platform.platform.id}'><img class='logo-platform' src='./src/img/xbox.svg'></a>`)
//     }else if (platform.platform.slug =='ios'){
//       list.push(`<a name='mobile' href='#pagelist/&parent_platforms=${platform.platform.id}'><img class='logo-platform' src='./src/img/mobile.svg'></a>`)
//     }else if (platform.platform.slug =='mac'){
//       list.push(`<a name='mac' href='#pagelist/&parent_platforms=${platform.platform.id}'><img class='logo-platform' src='./src/img/mac.svg'></a>`)
//     }else if (platform.platform.slug =='linux'){
//       list.push(`<a name='linux' href='#pagelist/&parent_platforms=${platform.platform.id}'><img class='logo-platform' src='./src/img/linux.svg'></a>`)
//     }else if (platform.platform.slug =='nintendo'){
//       list.push(`<a name='nintendo' href='#pagelist/&parent_platforms=${platform.platform.id}'><img class='logo-platform' src='./src/img/switch.svg'></a>`)
//     }
//   })
//   return list.join(' ');
// };

export { searchGame };