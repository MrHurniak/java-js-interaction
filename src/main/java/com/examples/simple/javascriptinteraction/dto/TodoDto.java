package com.examples.simple.javascriptinteraction.dto;

import com.examples.simple.javascriptinteraction.enums.Status;
import lombok.Data;
import lombok.experimental.Accessors;

import java.util.UUID;

@Data
@Accessors(chain = true)
public class TodoDto {

    private UUID id;
    private String task;
    private Status status;
}
