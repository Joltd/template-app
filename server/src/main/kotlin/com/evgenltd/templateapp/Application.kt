package com.evgenltd.templateapp

import com.evgenltd.templateapp.util.RestLoggingInterceptor
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer
import org.springframework.context.annotation.Bean
import org.springframework.http.client.BufferingClientHttpRequestFactory
import org.springframework.http.client.SimpleClientHttpRequestFactory
import org.springframework.web.client.RestTemplate
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

@SpringBootApplication
class Application : SpringBootServletInitializer() {

	@Bean
	fun webMvcConfigurer(): WebMvcConfigurer = object : WebMvcConfigurer {
		override fun addCorsMappings(registry: CorsRegistry) {
			registry.addMapping("/**")
				.allowedMethods("GET", "POST", "PUT", "DELETE")
				.allowedOrigins("http://localhost:4200/")
		}
	}
	@Bean
	fun restTemplate(interceptor: RestLoggingInterceptor) =
		RestTemplate(BufferingClientHttpRequestFactory(SimpleClientHttpRequestFactory()))
			.also { it.interceptors = it.interceptors + listOf(interceptor) }

}

fun main(args: Array<String>) {
	runApplication<Application>(*args)
}
