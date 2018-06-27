package com.user.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.user.beans.User;
import com.user.repo.UserRepo;

@Service
public class UserService {
	
	@Autowired
	UserRepo db;

	public User login(User u) {
		//pull from db
		Optional<User> u2 = db.findById(u.getName());
		
		//check if user exists in db
		if (!u2.isPresent()) {
			return null;
		}
		
		//check if passwords match
		if (u2.get().getPassword().equals(u.getPassword())) {
			return u2.get();
		}
		return null;
	}

	public User signup(User u) {
		//pull from db and make sure user doesn't already exist
		Optional<User> u2 = db.findById(u.getName());
		if (u2.isPresent()) {
			return null;
		}
		return db.insert(u);
	}

}
