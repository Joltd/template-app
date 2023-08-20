package com.evgenltd.templateapp.util

import org.slf4j.Logger
import org.slf4j.LoggerFactory

open class Loggable {
    val log: Logger = LoggerFactory.getLogger(this::class.java)
}