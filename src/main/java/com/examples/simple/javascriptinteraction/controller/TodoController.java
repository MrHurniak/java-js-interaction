package com.examples.simple.javascriptinteraction.controller;

import com.examples.simple.javascriptinteraction.dto.StatusDto;
import com.examples.simple.javascriptinteraction.dto.TodoCreateDto;
import com.examples.simple.javascriptinteraction.dto.TodoDto;
import com.examples.simple.javascriptinteraction.service.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Min;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("api")
public class TodoController {

    private final TodoService todoService;

    @GetMapping("todo")
    public Page<TodoDto> getTodoPage(
            @RequestParam(required = false, defaultValue = "0") @Min(0) int page,
            @RequestParam(required = false, defaultValue = "10") @Min(0) int size
    ) {
        return todoService.findPageable(PageRequest.of(page, size));
    }

    @PostMapping("todo")
    public TodoDto createTodo(@RequestBody @Valid TodoCreateDto todoCreate) {
        return todoService.create(todoCreate);
    }

    @GetMapping("todo/{id}")
    public TodoDto findTodo(@PathVariable("id") UUID id) {
        return todoService.find(id);
    }

    @PutMapping("todo/{id}")
    public TodoDto updateTodo(@PathVariable("id") UUID id, @RequestBody @Valid TodoCreateDto todoCreate) {
        return todoService.update(id, todoCreate);
    }

    @DeleteMapping("todo/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable("id") UUID id) {
        todoService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("todo/{id}")
    public TodoDto updateTodoStatus(@PathVariable("id") UUID id, @RequestBody @Valid StatusDto statusDto) {
        return todoService.updateStatus(id, statusDto.getStatus());
    }
}
