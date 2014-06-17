require 'sinatra'
require 'rubygems'

set :public_folder, 'views'
get '/' do
	send_file 'views/main.html'
end