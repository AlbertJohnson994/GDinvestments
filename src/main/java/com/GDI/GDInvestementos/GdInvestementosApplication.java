package com.GDI.GDInvestementos;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
@ComponentScan(basePackages = "com.GDI.GDInvestementos")
public class GdInvestementosApplication {

	public static void main(String[] args) {
		SpringApplication.run(GdInvestementosApplication.class, args);
	}

}
