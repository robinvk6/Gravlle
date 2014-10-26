package org.icanj.app.security;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.GrantedAuthorityImpl;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

public class UserDetailsServiceImpl implements UserDetailsService {
	
	@Autowired
	private HibernateTemplate hibernateTemplate;

	@Override
	public UserDetails loadUserByUsername(String username)
			throws UsernameNotFoundException, DataAccessException {
		
		Users user = hibernateTemplate.get(Users.class, username);
		
		if(user== null){
			throw new UsernameNotFoundException("User " + username + " not found.");
		}
				
		List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
        String[] authStrings = user.getAuthorities().getAuthority().split(",");
        for(String authString : authStrings) {        
            authorities.add(new GrantedAuthorityImpl(authString));
        }

        UserDetails ud = new User(user.getUsername(), user.getPassword(), true, true, true, true, authorities);
        return ud;
	}

}
