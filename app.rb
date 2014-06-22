require 'sinatra'
require 'rubygems'

get '/' do
	@stylepage="css/home-style.css"
	erb :home

end