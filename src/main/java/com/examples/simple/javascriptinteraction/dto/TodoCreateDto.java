package com.examples.simple.javascriptinteraction.dto;

import lombok.Data;
import lombok.experimental.Accessors;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@Accessors(chain = true)
public class TodoCreateDto {

    @NotBlank
    @Size(max = 250)
    private String task;
}
