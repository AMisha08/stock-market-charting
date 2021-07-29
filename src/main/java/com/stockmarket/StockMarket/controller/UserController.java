package com.stockmarket.StockMarket.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.stockmarket.StockMarket.entity.Users;
import com.stockmarket.StockMarket.repository.UserRepository;
import com.stockmarket.StockMarket.service.UserService;

@RestController
@CrossOrigin
public class UserController {

	@Autowired
	UserRepository userRepo;

	@Autowired
	UserService userService;

	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	@GetMapping("/user/{id}")
	public Users getUser(@PathVariable long id) {
		return userService.getUserById(id);
	}

	@PostMapping("/users/signup")
	public Users newUser(@RequestBody Users req) {
		return userService.saveNewUser(req);
	}

	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	@PatchMapping("/users")
	public Users updateUser(@RequestBody Users req) {
		return userService.saveUpdatedUser(req);
	}

	@GetMapping("/confirm-user/{id}")
	public String confirmUser(@PathVariable long id) {
		return userService.setConfirmUser(id);
	}

}
