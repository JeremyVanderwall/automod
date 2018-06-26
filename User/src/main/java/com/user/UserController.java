package com.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.user.beans.User;
import com.user.service.UserService;

@RestController
public class UserController {
	@Autowired
	UserService service;
	
	@PostMapping("/login")
	public ResponseEntity<User> details (@RequestBody User u) {
		u = service.login(u);
		
		return new ResponseEntity<User>(u, HttpStatus.OK);
	}
	
	@PostMapping("/signup")
	public ResponseEntity<User> review(@RequestBody User u){
		u = service.signup(u);
		return new ResponseEntity<User>(u, HttpStatus.OK);
		
	}

}
