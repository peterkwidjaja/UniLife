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

	public
	def getCode
		@code
	end

	def getTitle
		@title
	end
end