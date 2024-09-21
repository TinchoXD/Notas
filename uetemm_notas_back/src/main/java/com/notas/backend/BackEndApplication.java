package com.notas.backend;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class BackEndApplication extends SpringBootServletInitializer {
									    

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application){
		return application.sources(BackEndApplication.class);
	}


	public static void main(String[] args) {
		SpringApplication.run(BackEndApplication.class, args);

		System.out.println("BackEnd Application Running");

	/* 	SecureRandom secureRandom = new SecureRandom();

        byte[] secretKeyBytes = new byte[32];
        secureRandom.nextBytes(secretKeyBytes);

        String SECRET_KEY = Base64.getEncoder().encodeToString(secretKeyBytes);

        System.out.println(SECRET_KEY);  */
	}

}
