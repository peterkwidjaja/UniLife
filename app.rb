require 'sinatra'
require 'rubygems'

get '/' do
	"Hello world, it's #{Time.now} at the server!"
end