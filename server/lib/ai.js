var isPhone = (text) => {
	var test = text.match(/[0-9]+/)
	if(test){
		if(test[0].length > 9){
			return true
		}
	}
	return false
}

var isUrl = (text) =>{
	var test = text.match(/(fb\.com|facebook\.com|https|http|www\.)/)
	if(test){
		return true
	}
	return false
}

var repInbox = (text,idMessage,accessToken) =>{
	var welcome = {
		  "recipient":{
		    "id": idMessage
		  },
		  "message":{
		    "text": "Xin chào bạn,bạn muốn tư vấn gì?",
		    "quick_replies":[
		      {
		        "content_type":"text",
		        "title":"Mua hàng",
		        "payload":"buy_product"
		      },
		      {
		        "content_type":"text",
		        "title":"Tư vấn",
		        "payload":"test"
		      }
		    ]
		  }
		}
}

module.exports = {
	isPhone,
	isUrl
}