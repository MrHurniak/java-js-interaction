package com.examples.simple.javascriptinteraction.mapper;

import com.examples.simple.javascriptinteraction.domain.Todo;
import com.examples.simple.javascriptinteraction.dto.TodoCreateDto;
import com.examples.simple.javascriptinteraction.dto.TodoDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface TodoMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "status", constant = "INCOMPLETE")
    @Mapping(target = "modificationTime", ignore = true)
    Todo from(TodoCreateDto source);

    TodoDto to(Todo source);
}
