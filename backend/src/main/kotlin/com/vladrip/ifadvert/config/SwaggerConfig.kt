package com.vladrip.ifadvert.config

import io.swagger.v3.oas.models.OpenAPI
import io.swagger.v3.oas.models.info.Info
import org.springframework.boot.info.BuildProperties
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class SwaggerConfig (
    private val buildProperties: BuildProperties
) {

    fun apiInfo(): Info {
        return Info().title("IFAdvert")
            .description("IFAdvert API docs")
            .version(buildProperties.version)
    }

    @Bean
    fun openApiConfig(): OpenAPI {
        return OpenAPI().info(apiInfo())
    }
}