import { combineReducers } from 'redux'

import userMessage from './userMessage'
import pathRoute from './pathRoute'
import textMessage from './textMessage'
import infoProfile from './infoProfile'

export default combineReducers({
	userMessage,
	pathRoute,
	textMessage,
	infoProfile
})