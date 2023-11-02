import com.github.gradle.node.npm.task.NpxTask

plugins {
  id("java")
  id("com.github.node-gradle.node") version "3.5.1"
}

node {
  version.set("18.16.0")
  download.set(false)
  npmInstallCommand.set("install")
  nodeProjectDir.set(file("${project.projectDir}"))
  workDir.set(file("${project.projectDir}/.cache/nodejs"))
  npmWorkDir.set(file("${project.projectDir}/.cache/npm"))
}

val bundle = tasks.register<NpxTask>("bundle") {
  dependsOn(tasks.npmInstall)
  command.set("npm")
  val profile: String? by rootProject.extra
  args.set(listOf("run", "build${if (profile != null) ":" else ""}"))
  inputs.dir("src")
  inputs.dir(fileTree("node_modules").exclude(".cache"))
  outputs.dir("dist")
}

tasks.withType<ProcessResources> {
  from(bundle) {
    into("static")
  }
}
