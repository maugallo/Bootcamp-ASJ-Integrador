package com.bootcamp.todolist;

import java.util.Arrays;
import java.util.TimeZone;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@SpringBootApplication
public class IntegradorSpringbootApplication {

	public static void main(String[] args) {
		SpringApplication.run(IntegradorSpringbootApplication.class, args);
		System.out.println("Server started!");
		
		TimeZone.setDefault(TimeZone.getTimeZone("UTC")); //Set the timezone to UTC (Coordinated Universal Time) and adapt it in the front.
	}
	
	@Bean
	CorsFilter corsFilter() {
	    CorsConfiguration corsConfiguration = new CorsConfiguration();
	    corsConfiguration.setAllowCredentials(true);
	    corsConfiguration.setAllowedOrigins(Arrays.asList("http://localhost:4200"));
	    corsConfiguration.setAllowedHeaders(Arrays.asList("Origin", "Access-Control-Allow-Origin", "Content-Type",
	            "Accept", "Authorization", "Origin, Accept", "X-Requested-With", "Access-Control-Request-Method",
	            "Access-Control-Request-Headers"));
	    corsConfiguration.setExposedHeaders(Arrays.asList("Origin", "Content-Type", "Accept", "Authorization",
	            "Access-Control-Allow-Origin", "Access-Control-Allow-Credentials"));
	    corsConfiguration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
	    UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
	    urlBasedCorsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration);
	    return new CorsFilter(urlBasedCorsConfigurationSource);
	}

}
