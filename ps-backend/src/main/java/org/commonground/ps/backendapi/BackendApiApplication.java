package org.commonground.ps.backendapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class BackendApiApplication {
// extends SpringBootServletInitializer {

	// @Override  
	// protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {  
	// 	System.out.println("Load BackendApiApplication");
	// 	return application.sources(BackendApiApplication.class);  
	// } 

	public static void main(String[] args) {
		System.out.println("Dit id de main classsssss");
		SpringApplication.run(BackendApiApplication.class, args);
	}
}
