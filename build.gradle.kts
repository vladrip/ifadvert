plugins {
    kotlin("jvm") version "1.8.22"
    id("org.springframework.boot") version "3.1.5"
    id("io.spring.dependency-management") version "1.1.3"
    kotlin("plugin.spring") version "1.8.22"
    kotlin("plugin.jpa") version "1.8.22"
    kotlin("kapt") version "1.9.10"
}

kotlin {
    jvmToolchain(17)
}

allprojects {
    group = "com.vladrip"
    version = "0.0.1"

    repositories {
        mavenCentral()
    }
}

val profile by extra(if (project.hasProperty("profile")) project.property("profile") else null)