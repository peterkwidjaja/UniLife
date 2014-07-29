function logoutModal(){
	emptyModal();
	$('#login-title').append("<center>Sign Out</center>");
	$('#login-body').append('<center><a href="javascript:logout()" role="button" id="logout-button" class="btn btn-primary">Sign out</a></center>');
	$('#login-dialog').modal('show');
}
function logout(){
	$.post('/logout', function(){
		window.location.replace("/");
	});
}
function login(){
	emptyModal();
	$('#login-title').append("<center>Sign in</center>");
	$('#login-body').append('<center><a href="/auth/nus" role="button" id="login-button" class="btn btn-primary">Sign in with NUSNET ID</a></center>');
	$('#login-dialog').modal('show');
}
function emptyModal(){
	$('#login-title').empty();
	$('#login-body').empty();
}