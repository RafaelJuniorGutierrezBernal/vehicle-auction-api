package com.auction.vehicleauctionapi.security;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
public class KeycloakRoleConverte implements Converter<Jwt, Collection<GrantedAuthority>>{

    private static final String ROLE_PREFIX = "ROLE_";

    @Override
    public Collection<GrantedAuthority> convert(Jwt jwt) {
        Map<String, Object> realmAccess = 
        jwt.getClaimAsMap("realm_access");
            if (realmAccess == null || 
                !realmAccess.containsKey("roles")) {
                    return List.of();
            }

            @SuppressWarnings("unchecked")
            List<String> roles = (List<String>)
        realmAccess.get("roles");

        return roles.stream()
                .map(role -> ROLE_PREFIX + role)
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toSet());
    }
    
}
