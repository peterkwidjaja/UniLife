require 'sinatra'
require 'rubygems'
require 'json'
require 'omniauth-openid'
require 'openid/store/filesystem'
require 'openid/fetchers'
require './Plan'

configure do
	enable :sessions
	set :session_secret, ENV['SESSION_SECRET'] ||= 'super secret'
	use OmniAuth::Strategies::OpenID, :store => OpenID::Store::Filesystem.new('/tmp'), :name => 'nus', :identifier => 'https://openid.nus.edu.sg/'
end

modList=File.read('public/moduleList.json')
resultModList = JSON.parse(modList)
modDetails = File.read('ModuleInformation.json')
resultModDetails = JSON.parse(modDetails)

get '/' do
	@stylepage="css/home-style.css"
	erb :home
end

get '/modules' do
	@stylepage="/css/module-style.css"
	@modules = params[:module]
	#puts @result
	if(@modules)
		puts @modules
		@result = resultModList.select do |obj|
			obj["ModuleCode"].downcase.include?@modules.downcase or obj["ModuleTitle"].downcase.include?@modules.downcase
		end
		erb :module
	else
		erb :module
	end
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
	@stylepage = "/css/plan-style.css"
	if(session[:uid])
		@javascript = '<script src="/js/typeahead.bundle.min.js"></script>' + "\n" + '<script src="/js/plan.js"></script>' + "\n"+ '<script src="/js/mod-plan.js"></script>'
		erb :plan
	else
		erb :plan
	end
end
get '/plan/mods' do
	if(session[:uid])
		plan = Plan.get(session[:uid])
		if(plan)
			plan.modules
		end
	end
end

post '/plan' do
	counter = Plan.count(:id => session[:uid])
	if counter==0
		mods = Plan.create(:id => session[:uid], :modules => params[:mods])
	else
		mods = Plan.get(session[:uid])
		mods.update(:modules => params[:mods])
	end
end

post '/auth/:name/callback' do
	auth = request.env['omniauth.auth']
	session[:uid] = auth.uid
	session[:matric] = auth.info.nickname
	session[:name] = auth.info.name
	session[:email] = auth.info.email
	redirect to('/plan')
end

post '/logout' do
	session.clear
end

not_found do
	status 404
	erb :not_found
end