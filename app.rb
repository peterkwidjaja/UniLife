require 'sinatra'
require 'rubygems'
require 'json'

class Modules
	def initialize(code, title, desc, credit, workload, preclusion, prereq)
		@code = code
		@title = title
		@description = desc
		@credit = credit
		@workload = workload
		@preclusion = preclusion
		@prereq = prereq
	end
end

get '/' do
	@stylepage="css/home-style.css"
	erb :home
end

get '/modules' do
	json = File.read('public/moduleList.json')
	@result = JSON.parse(json)
	@stylepage="css/module-style.css"
	erb :module
	
end