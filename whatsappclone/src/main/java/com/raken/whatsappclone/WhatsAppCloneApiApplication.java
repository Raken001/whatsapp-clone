package com.raken.whatsappclone;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class WhatsAppCloneApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(WhatsAppCloneApiApplication.class, args);
		System.out.println("The App is running");
	}
}
