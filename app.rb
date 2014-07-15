require 'sinatra'
require 'rubygems'
require 'json'

modList=File.read('public/moduleList.json')
resultModList = JSON.parse(modList)
modDetails = File.read('public/moduleDetails.json')
resultModDetails = JSON.parse(modDetails)

get '/' do
	@stylepage="css/home-style.css"
	erb :home
end

get '/modules' do
	@result = resultModList
	@stylepage="/css/module-style.css"
	erb :module
	
end

get '/mods/:mod' do
	@stylepage = "/css/modDetails-style.css"
	@mod = params[:mod]
	@details = resultModDetails.find do |x| x["ModuleCode"]==@mod end

	erb :mod_detail
end

get '/mod/:mods' do
	mod = params[:mods]
	details = resultModDetails.find do |x| x["ModuleCode"]==mod end
	details.to_json
end

get '/plan' do
	@moduleCodes = resultModList.keys
	@stylepage = "/css/plan-style.css"
	@javascript = '<script src="/js/typeahead.bundle.js"></script>' + "\n" + '<script src="/js/plan.js"></script>'
	erb :plan
end

not_found do
	status 404
	erb :not_found
end

#
#helper do
#	def getDetails(moduleCode)
#		@details = resultModDetails.find do |x|
#			x["ModuleCode"]==moduleCode
#		end
#		return @details
#	end
#end