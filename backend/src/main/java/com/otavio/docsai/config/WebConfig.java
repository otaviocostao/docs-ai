package com.otavio.docsai.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**") // Permite CORS para todas as rotas sob /api
                // IMPORTANTE: Troque pela URL do seu frontend local e depois a de produção
                .allowedOrigins("http://localhost:5173", "URL_DO_SEU_FRONTEND_DEPLOYADO")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Métodos permitidos
                .allowedHeaders("*") // Permite todos os cabeçalhos
                .allowCredentials(false); // Mude para true se precisar de credenciais (cookies, auth)
    }
}