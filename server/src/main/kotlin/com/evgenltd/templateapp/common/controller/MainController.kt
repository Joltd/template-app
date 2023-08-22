package com.evgenltd.templateapp.common.controller

import org.springframework.beans.factory.annotation.Value
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class MainController(
    @Value("\${VERSION}")
    private val version: String
) {

    @GetMapping("/main")
    fun main(): MainResponse = MainResponse(version)

}

class MainResponse(val message: String)
