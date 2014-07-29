require 'dm-core'
require 'dm-migrations'
require 'dm-aggregates'

DataMapper.setup(:default, "sqlite3://#{Dir.pwd}/database.db")
class Plan
	include DataMapper::Resource
	property :id, String, :key => true
	property :modules, String
end
DataMapper.finalize