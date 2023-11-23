package com.vladrip.ifadvert.exception

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus


@ResponseStatus(value = HttpStatus.NOT_FOUND)
class ItemNotFoundException: RuntimeException {
    constructor() : super(DEFAULT_MESSAGE)
    constructor(message: String?) : super(message)

    constructor(entityClass: Class<*>, propertyName: String?, propertyValue: Any) :
            super(String.format("%s: {%s, %s=%s}", DEFAULT_MESSAGE, entityClass.simpleName, propertyName, propertyValue))

    constructor(entityClass: Class<*>, id: Long) : this(entityClass, "id", id)

    companion object {
        const val DEFAULT_MESSAGE = "Entity not found"
    }
}
