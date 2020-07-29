package com.examples.simple.javascriptinteraction.repository;

import com.examples.simple.javascriptinteraction.domain.Todo;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.UUID;

public interface TodoRepository extends MongoRepository<Todo, UUID> {

}
