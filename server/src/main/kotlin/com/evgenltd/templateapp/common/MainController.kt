package com.evgenltd.templateapp.common

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class MainController {

    @GetMapping("/main")
    fun main(): MainResponse = MainResponse("Hello, world!")

}

class MainResponse(val message: String)