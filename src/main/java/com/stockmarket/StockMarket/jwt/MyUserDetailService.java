package com.stockmarket.StockMarket.jwt;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.stockmarket.StockMarket.entity.Users;
import com.stockmarket.StockMarket.repository.UserRepository;

@Service
public class MyUserDetailService implements UserDetailsService {

	@Autowired
	UserRepository userRepo;

	@Override
	public UserDetails loadUserByUsername(String username)
			throws UsernameNotFoundException {

		try {
			Users user = userRepo.findByName(username);
			String name = user.getName();
			String password = user.getPassword();
			String role = user.getRole();

			Collection<GrantedAuthority> grantedAuthorityList = new ArrayList<>();
			GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(
					role);
			grantedAuthorityList.add(grantedAuthority);
			return new User(name, password, grantedAuthorityList);
		} catch (Exception e) {
			throw new UsernameNotFoundException("User not found : " + e);
		}

	}
}
