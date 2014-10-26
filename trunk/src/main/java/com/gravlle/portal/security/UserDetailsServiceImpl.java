package com.gravlle.portal.security;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class UserDetailsServiceImpl implements UserDetailsService {

	@Override
	public UserDetails loadUserByUsername(String arg0)
			throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		return null;
	}
	
	/*@Autowired
	private HibernateTemplate hibernateTemplate;

	@Override
	public UserDetails loadUserByUsername(String username)
			throws UsernameNotFoundException, DataAccessException {
		
		AuthUser user = hibernateTemplate.get(AuthUser.class, username);
		
		if(user== null){
			throw new UsernameNotFoundException("User " + username + " not found.");
		}
				
		List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
		String[] authStrings = user.getAuthorities().getAuthority().split(",");
        for(String authString : authStrings) {        
            authorities.add(new SimpleGrantedAuthority(authString));
        }

        UserDetails ud = new User(user.getUsername(), user.getPassword(), true, true, true, true, authorities);
        return ud;
	}*/

}
