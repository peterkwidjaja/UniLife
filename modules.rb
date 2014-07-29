require 'dm-core'
require 'dm-migrations'

DataMapper.setup(:default, "sqlite3://#{Dir.pwd}/database.db")
class Plan
	include DataMapper::Resource
	property :id, String
	property :sem1, String
	property :sem2, String
	property :sem3, String
	property :sem4, String
	property :sem5, String
	property :sem6, String
	property :sem8, String
end
DataMapper.finalize