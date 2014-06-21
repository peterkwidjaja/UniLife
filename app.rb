require 'sinatra'
require 'rubygems'

#set :public_folder, 'views'
get '/' do
	erb :home
	#send_file 'views/main.html'
end