package com.examples.simple.javascriptinteraction.domain;

import com.examples.simple.javascriptinteraction.enums.Status;
import lombok.Data;
import lombok.experimental.Accessors;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.UUID;

@Data
@Accessors(chain = true)
@Document(collection = "todos")
public class Todo {

    @Id
    private UUID id;

    private String task;

    private Status status;

    private Instant modificationTime;
}
