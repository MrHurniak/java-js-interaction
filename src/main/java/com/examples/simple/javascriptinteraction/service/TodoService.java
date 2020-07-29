package com.examples.simple.javascriptinteraction.service;

import com.examples.simple.javascriptinteraction.dto.TodoCreateDto;
import com.examples.simple.javascriptinteraction.dto.TodoDto;
import com.examples.simple.javascriptinteraction.enums.Status;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface TodoService {

    Page<TodoDto> findPageable(Pageable pageable);

    TodoDto find(UUID id);

    TodoDto create(TodoCreateDto todoCreate);

    TodoDto update(UUID id, TodoCreateDto todoCreate);

    TodoDto updateStatus(UUID id, Status status);

    void delete(UUID id);
}
