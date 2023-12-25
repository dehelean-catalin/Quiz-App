package com.example.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenAPIConfig {

    @Bean
    public OpenAPI myOpenAPI() {
        Server devServer = new Server();
        devServer.setUrl("http://localhost:8090");
        devServer.setDescription("Server URL in development environment");

        Contact contact = new Contact();
        contact.setName("Dehelean Catalin");
        contact.setEmail("drcatalin00@gmail.com");

        License license = new License().name("MIT License").url("https" +
                "://choosealicense.com/licenses/mit/");

        Info info = new Info()
                .title("Quiz Management API")
                .version("1.0")
                .contact(contact)
                .description("This API exposes endpoints to manage quizzes.")
                .license(license);

        return new OpenAPI().info(info).servers(List.of(devServer));

    }
}
