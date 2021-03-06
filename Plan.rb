require 'dm-core'
require 'dm-migrations'
require 'dm-aggregates'
require 'sinatra'

configure :development do
	DataMapper.setup(:default, "sqlite3://#{Dir.pwd}/database.db")
end
configure :production do
	DataMapper.setup(:default, ENV['HEROKU_POSTGRESQL_YELLOW_URL'])
end
class Plan
	include DataMapper::Resource
	property :id, String, :key => true
	property :modules, Text
end
DataMapper.finalize