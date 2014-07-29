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

	def getDesc
		@description
	end

	def getCredit
		@credit
	end

	def getWorkload
		@workload
	end

	def getPreclusion
		@preclusion
	end

	def getPrereq
		@prereq
	end
	
end