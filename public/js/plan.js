
$(document).ready(function() {
	var engine = new Bloodhound({
		datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
		queryTokenizer: Bloodhound.tokenizers.whitespace,
		limit: 5,   
		prefetch: {
			url: '/moduleList.json',
			filter: function(list) {
				//var array = $.makeArray(list);
				//alert(Object.keys(list));
				return $.map(list, function(val, keys) { 
					var concat = keys+" : "+val;
					return { value: concat }; });
			}
		}
	});
	engine.initialize(true);
	engine.clearPrefetchCache();
	$('#test1').typeahead({
	 minLength: 1,
	 highlight: true
 },
 {
	 name: 'modules',
	 displayKey: 'value',
	 source: engine.ttAdapter()
 });

	$('#test1').keydown(function(event){
		var module = $('#test1').val();

		if(event.keyCode==13){
			//enter validation of input
			module = module.substring(0,module.indexOf(' '));
			//alert(module);
			addModules(1, module);
			this.value = "";
		}
	});
});
