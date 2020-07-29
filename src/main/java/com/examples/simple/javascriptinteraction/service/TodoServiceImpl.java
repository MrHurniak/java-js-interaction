package com.examples.simple.javascriptinteraction.service;

import com.examples.simple.javascriptinteraction.domain.Todo;
import com.examples.simple.javascriptinteraction.dto.TodoCreateDto;
import com.examples.simple.javascriptinteraction.dto.TodoDto;
import com.examples.simple.javascriptinteraction.enums.Status;
import com.examples.simple.javascriptinteraction.exception.CustomException;
import com.examples.simple.javascriptinteraction.exception.NotFoundException;
import com.examples.simple.javascriptinteraction.mapper.TodoMapper;
import com.examples.simple.javascriptinteraction.repository.TodoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class TodoServiceImpl implements TodoService {

    private final TodoRepository todoRepository;
    private final TodoMapper todoMapper;

    @Override
    public TodoDto create(TodoCreateDto todoCreate) {
        Todo todo = todoMapper.from(todoCreate);

        Todo savedTodo = todoRepository.save(todo.setId(UUID.randomUUID()));

        return todoMapper.to(savedTodo);
    }

    @Override
    public TodoDto find(UUID id) {
        var todo = todoRepository.findById(id)
                .orElseThrow(() -> createTodoNotFoundException(id));

        return todoMapper.to(todo);
    }

    @Override
    public Page<TodoDto> findPageable(Pageable pageable) {
        Page<Todo> todoPage = todoRepository.findAll(pageable);
        return todoPage.map(todoMapper::to);
    }

    @Override
    public TodoDto update(UUID id, TodoCreateDto todoCreate) {
        todoRepository.findById(id)
                .orElseThrow(() -> createTodoNotFoundException(id));

        Todo todo = todoRepository.save(todoMapper.from(todoCreate).setId(id));

        return todoMapper.to(todo);
    }

    @Override
    public TodoDto updateStatus(UUID id, Status status) {
        var todo = todoRepository.findById(id)
                .orElseThrow(() -> createTodoNotFoundException(id));
        if (todo.getStatus() != status) {
            todo.setStatus(status);
            todoRepository.save(todo);
        }
        return todoMapper.to(todo);
    }

    @Override
    public void delete(UUID id) {
        var todo = todoRepository.findById(id)
                .orElseThrow(() -> createTodoNotFoundException(id));

        todoRepository.delete(todo);
    }

    private CustomException createTodoNotFoundException(UUID id) {
        log.error("Todo item with id '{}' not found", id);
        return new NotFoundException("Todo not found");
    }
}
