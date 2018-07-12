const _ = require('lodash')

var searchPage = (pages,id) =>{
	return _.filter(pages,(item) =>{
		if(item.id){
			if(item.id.indexOf(id) > -1){
				item.isConnect = true
				return item
			}
		}
	})
}
var findIndexPage = (pages,idPage)  =>{
	return _.findIndex(pages,(page) =>{
      return page.id == idPage
 })
}
	var pages = [{"picture":"https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/30261950_430712074039452_4912806046700929024_n.png?_nc_cat=0&_nc_ad=z-m&_nc_cid=0&oh=7a5f7bbac2293c04a0bbef753151e3fe&oe=5BE388CB","name":"KINGA HAI","id":"430712014039458"},{"picture":"https://scontent.xx.fbcdn.net/v/t1.0-1/c15.0.50.50/p50x50/399548_10149999285987789_1102888142_n.png?_nc_cat=0&_nc_ad=z-m&_nc_cid=0&oh=2ef885c8654d8106e0dd9eca249ebf4d&oe=5BD5DB6A","name":"हैलोलोलोलोलोलोलोलोलोलोलोलोलोलोलोलोलोलोलोलो","id":"143980042982450"},{"picture":"https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/26731462_166248517475545_3264946271066436811_n.png?_nc_cat=0&_nc_ad=z-m&_nc_cid=0&oh=df164631a99dc49875320d10bbec1395&oe=5BA13C52","name":"HAI KING ME","id":"166248460808884"},{"picture":"https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/26169825_128375071296293_5421737232359293041_n.png?_nc_cat=0&_nc_ad=z-m&_nc_cid=0&oh=627299690e68802064a09b68e5ebf655&oe=5BDEFF6F","name":"TÌm phim hay","id":"128373771296423"},{"picture":"https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/26169593_1230274760407430_6817823023427251460_n.png?_nc_cat=0&_nc_ad=z-m&_nc_cid=0&oh=e35ef86df474544f557c6b2450465767&oe=5BDAA4F8","name":"Phim Ca nhạc Pỏn","id":"1230274243740815"},{"picture":"https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/24899874_357033394768036_64417270714935839_n.jpg?_nc_cat=0&_nc_ad=z-m&_nc_cid=0&oh=3305e20674cf887e8042b93cf1f32f19&oe=5BA230D3","name":"J0zqwel","id":"357033208101388"}]

module.exports = {
	searchPage,
	findIndexPage
}
